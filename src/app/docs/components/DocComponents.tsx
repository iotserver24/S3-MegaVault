'use client';

import { ReactNode, useState } from 'react';
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';

interface CodeBlockProps {
  children: string;
  language?: string;
  title?: string;
  copyable?: boolean;
}

export function CodeBlock({ children, language = 'bash', title, copyable = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="my-6">
      {title && (
        <div className="bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 rounded-t-lg border-b border-slate-700">
          {title}
        </div>
      )}
      <div className="relative">
        <pre className={`bg-slate-900 text-slate-100 p-4 overflow-x-auto text-sm ${title ? 'rounded-t-none' : ''} rounded-lg`}>
          <code className={`language-${language}`}>{children}</code>
        </pre>
        {copyable && (
          <button
            onClick={copyToClipboard}
            className="absolute top-2 right-2 p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
            title={copied ? 'Copied!' : 'Copy to clipboard'}
          >
            {copied ? (
              <CheckIcon className="w-4 h-4 text-green-400" />
            ) : (
              <ClipboardDocumentIcon className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

interface APIEndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description?: string;
  children?: ReactNode;
}

export function APIEndpoint({ method, path, description, children }: APIEndpointProps) {
  const methodColors = {
    GET: 'bg-green-100 text-green-800',
    POST: 'bg-blue-100 text-blue-800',
    PUT: 'bg-yellow-100 text-yellow-800',
    DELETE: 'bg-red-100 text-red-800',
    PATCH: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="border border-slate-200 rounded-lg my-6">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <span className={`px-2 py-1 text-xs font-semibold rounded ${methodColors[method]}`}>
            {method}
          </span>
          <code className="text-sm font-mono text-slate-700">{path}</code>
        </div>
        {description && (
          <p className="mt-2 text-sm text-slate-600">{description}</p>
        )}
      </div>
      {children && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  );
}

interface ParameterTableProps {
  parameters: Array<{
    name: string;
    type: string;
    required?: boolean;
    description: string;
    example?: string;
  }>;
}

export function ParameterTable({ parameters }: ParameterTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Parameter
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Required
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {parameters.map((param) => (
            <tr key={param.name}>
              <td className="px-6 py-4 whitespace-nowrap">
                <code className="text-sm font-mono text-slate-900">{param.name}</code>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-slate-600">{param.type}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  param.required 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {param.required ? 'Required' : 'Optional'}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {param.description}
                {param.example && (
                  <div className="mt-1">
                    <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">
                      {param.example}
                    </code>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface AlertProps {
  type?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  children: ReactNode;
}

export function Alert({ type = 'info', title, children }: AlertProps) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
  };

  const icons = {
    info: '💡',
    warning: '⚠️',
    error: '❌',
    success: '✅',
  };

  return (
    <div className={`border-l-4 p-4 my-4 ${styles[type]}`}>
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          <span className="text-lg">{icons[type]}</span>
        </div>
        <div>
          {title && (
            <h3 className="text-sm font-medium mb-1">{title}</h3>
          )}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function Card({ title, description, children, className = '' }: CardProps) {
  return (
    <div className={`bg-white border border-slate-200 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      {description && (
        <p className="text-slate-600 mb-4">{description}</p>
      )}
      {children}
    </div>
  );
}

interface StepGuideProps {
  steps: Array<{
    title: string;
    description: string;
    code?: string;
    language?: string;
  }>;
}

export function StepGuide({ steps }: StepGuideProps) {
  return (
    <div className="space-y-8">
      {steps.map((step, index) => (
        <div key={index} className="flex space-x-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              {index + 1}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
            <p className="text-slate-600 mb-3">{step.description}</p>
            {step.code && (
              <CodeBlock language={step.language}>
                {step.code}
              </CodeBlock>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

interface TableOfContentsProps {
  sections: Array<{
    id: string;
    title: string;
    children?: Array<{ id: string; title: string }>;
  }>;
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-8">
      <h3 className="text-sm font-semibold text-slate-900 mb-3">Table of Contents</h3>
      <ul className="space-y-2 text-sm">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="text-slate-600 hover:text-slate-900 hover:underline"
            >
              {section.title}
            </a>
            {section.children && (
              <ul className="ml-4 mt-1 space-y-1">
                {section.children.map((child) => (
                  <li key={child.id}>
                    <a
                      href={`#${child.id}`}
                      className="text-slate-500 hover:text-slate-700 hover:underline"
                    >
                      {child.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}