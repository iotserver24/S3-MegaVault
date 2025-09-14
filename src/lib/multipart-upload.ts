/**
 * Multipart upload utility functions
 */

export interface UploadPart {
  ETag: string;
  PartNumber: number;
}

export interface MultipartUploadConfig {
  fileName: string;
  fileSize: number;
  fileType: string;
  folder?: string;
  relativePath?: string;
}

export interface MultipartUploadProgress {
  fileName: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
  uploadedParts: number;
  totalParts: number;
}

/**
 * Calculate the optimal part size for multipart upload
 * Minimum part size is 5MB, maximum is 5GB
 * We use 10MB parts for optimal performance
 */
export function calculatePartSize(fileSize: number): number {
  const MIN_PART_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_PART_SIZE = 10 * 1024 * 1024 * 1024; // 5GB
  const DEFAULT_PART_SIZE = 10 * 1024 * 1024; // 10MB

  if (fileSize <= MIN_PART_SIZE) {
    return fileSize;
  }

  return Math.min(Math.max(DEFAULT_PART_SIZE, MIN_PART_SIZE), MAX_PART_SIZE);
}

/**
 * Calculate the number of parts needed for a file
 */
export function calculatePartCount(fileSize: number, partSize: number): number {
  return Math.ceil(fileSize / partSize);
}

/**
 * Split file into parts for multipart upload
 */
export function splitFileIntoParts(file: File, partSize: number): Blob[] {
  const parts: Blob[] = [];
  let start = 0;

  while (start < file.size) {
    const end = Math.min(start + partSize, file.size);
    parts.push(file.slice(start, end));
    start = end;
  }

  return parts;
}

/**
 * Upload a single part using presigned URL
 */
export async function uploadPart(
  presignedUrl: string, 
  partData: Blob, 
  partNumber: number
): Promise<UploadPart> {
  try {
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      body: partData,
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to upload part ${partNumber}: ${response.statusText}`);
    }

    const etag = response.headers.get('ETag');
    if (!etag) {
      throw new Error(`No ETag received for part ${partNumber}`);
    }

    return {
      ETag: etag.replace(/"/g, ''), // Remove quotes from ETag
      PartNumber: partNumber,
    };
  } catch (error) {
    console.error(`Error uploading part ${partNumber}:`, error);
    throw error;
  }
}

/**
 * Initiate multipart upload on server
 */
export async function initiateMultipartUpload(config: MultipartUploadConfig): Promise<{
  uploadId: string;
  key: string;
}> {
  const response = await fetch('/api/files/multipart/initiate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to initiate multipart upload');
  }

  return await response.json();
}

/**
 * Get presigned URLs for upload parts
 */
export async function getPresignedUrls(
  uploadId: string,
  key: string,
  partNumbers: number[]
): Promise<Array<{ partNumber: number; url: string }>> {
  const response = await fetch('/api/files/multipart/presigned-urls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uploadId,
      key,
      partNumbers,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get presigned URLs');
  }

  const data = await response.json();
  return data.presignedUrls;
}

/**
 * Complete multipart upload on server
 */
export async function completeMultipartUpload(
  uploadId: string,
  key: string,
  parts: UploadPart[]
): Promise<{ message: string; key: string; location: string; etag: string }> {
  const response = await fetch('/api/files/multipart/complete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uploadId,
      key,
      parts,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to complete multipart upload');
  }

  return await response.json();
}

/**
 * Abort multipart upload on server
 */
export async function abortMultipartUpload(
  uploadId: string,
  key: string
): Promise<{ message: string }> {
  const response = await fetch('/api/files/multipart/abort', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uploadId,
      key,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to abort multipart upload');
  }

  return await response.json();
}

/**
 * Main multipart upload function
 */
export async function uploadFileMultipart(
  file: File,
  config: MultipartUploadConfig,
  onProgress?: (progress: MultipartUploadProgress) => void
): Promise<{ key: string; location: string; etag: string }> {
  const partSize = calculatePartSize(file.size);
  const partCount = calculatePartCount(file.size, partSize);
  const fileParts = splitFileIntoParts(file, partSize);

  let uploadId: string = '';
  let key: string = '';
  const uploadedParts: UploadPart[] = [];

  try {
    // Initiate multipart upload
    const initiateResult = await initiateMultipartUpload(config);
    uploadId = initiateResult.uploadId;
    key = initiateResult.key;

    // Generate presigned URLs for all parts
    const partNumbers = Array.from({ length: partCount }, (_, i) => i + 1);
    const presignedUrls = await getPresignedUrls(uploadId, key, partNumbers);

    // Upload parts in parallel (but with concurrency limit)
    const CONCURRENT_UPLOADS = 5;
    const uploadPromises: Promise<UploadPart>[] = [];

    for (let i = 0; i < partCount; i++) {
      const partNumber = i + 1;
      const partData = fileParts[i];
      const presignedUrl = presignedUrls.find(p => p.partNumber === partNumber)?.url;

      if (!presignedUrl) {
        throw new Error(`No presigned URL found for part ${partNumber}`);
      }

      const uploadPromise = uploadPart(presignedUrl, partData, partNumber);
      uploadPromises.push(uploadPromise);

      // Process uploads in batches to avoid overwhelming the server
      if (uploadPromises.length >= CONCURRENT_UPLOADS || i === partCount - 1) {
        const results = await Promise.all(uploadPromises);
        uploadedParts.push(...results);

        // Update progress
        if (onProgress) {
          onProgress({
            fileName: config.fileName,
            progress: (uploadedParts.length / partCount) * 100,
            status: 'uploading',
            uploadedParts: uploadedParts.length,
            totalParts: partCount,
          });
        }

        uploadPromises.length = 0; // Clear the array
      }
    }

    // Complete multipart upload
    const result = await completeMultipartUpload(uploadId, key, uploadedParts);

    if (onProgress) {
      onProgress({
        fileName: config.fileName,
        progress: 100,
        status: 'completed',
        uploadedParts: partCount,
        totalParts: partCount,
      });
    }

    return result;
  } catch (error) {
    // Abort upload on error
    if (uploadId && key) {
      try {
        await abortMultipartUpload(uploadId, key);
      } catch (abortError) {
        console.error('Failed to abort multipart upload:', abortError);
      }
    }

    if (onProgress) {
      onProgress({
        fileName: config.fileName,
        progress: 0,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        uploadedParts: uploadedParts.length,
        totalParts: partCount,
      });
    }

    throw error;
  }
}
