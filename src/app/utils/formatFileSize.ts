export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  
  // Find the appropriate unit
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  // Convert to the unit and round to 2 decimal places
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
  
  return `${size} ${sizes[i]}`;
} 