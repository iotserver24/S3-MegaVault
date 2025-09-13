import { Alert, TableOfContents, Card, CodeBlock, StepGuide } from '../../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'Contributing Overview' },
  { id: 'getting-started', title: 'Getting Started' },
  { id: 'development-workflow', title: 'Development Workflow' },
  { id: 'coding-standards', title: 'Coding Standards' },
  { id: 'pull-requests', title: 'Pull Request Process' },
  { id: 'issue-reporting', title: 'Issue Reporting' },
  { id: 'documentation', title: 'Documentation' },
  { id: 'community', title: 'Community Guidelines' },
];

const contributionSteps = [
  {
    title: 'Fork and Clone',
    description: 'Fork the repository and clone it to your local machine.',
    code: `# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/megavault-open-source.git
cd megavault-open-source

# Add the original repository as upstream
git remote add upstream https://github.com/iotserver24/megavault-open-source.git`,
    language: 'bash',
  },
  {
    title: 'Create Feature Branch',
    description: 'Create a new branch for your contribution.',
    code: `# Update your local main branch
git checkout main
git pull upstream main

# Create and switch to a new feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/issue-description`,
    language: 'bash',
  },
  {
    title: 'Make Changes',
    description: 'Implement your changes following the coding standards.',
    code: `# Make your changes
# Run tests to ensure everything works
npm run test

# Run linting to check code quality
npm run lint

# Format code
npm run format`,
    language: 'bash',
  },
  {
    title: 'Commit and Push',
    description: 'Commit your changes with a descriptive message.',
    code: `# Stage your changes
git add .

# Commit with descriptive message
git commit -m "feat: add user profile management feature"

# Push to your fork
git push origin feature/your-feature-name`,
    language: 'bash',
  },
];

export default function ContributingPage() {
  return (
    <div className="prose prose-slate max-w-none">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Contributing Guide</h1>
        <p className="text-xl text-slate-600">
          Learn how to contribute to MegaVault, from reporting issues to submitting pull requests and improving documentation.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Contributing Overview</h2>
        <p>
          MegaVault is an open-source project that welcomes contributions from developers of all skill levels. 
          Whether you're fixing bugs, adding features, improving documentation, or helping with translations, 
          your contributions are valuable and appreciated.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Code Contributions" description="Improve the codebase">
            <ul className="text-sm space-y-1">
              <li>✅ Bug fixes and improvements</li>
              <li>✅ New features and enhancements</li>
              <li>✅ Performance optimizations</li>
              <li>✅ Test coverage improvements</li>
            </ul>
          </Card>
          
          <Card title="Documentation" description="Help others understand MegaVault">
            <ul className="text-sm space-y-1">
              <li>✅ API documentation</li>
              <li>✅ User guides and tutorials</li>
              <li>✅ Code comments and examples</li>
              <li>✅ Translation improvements</li>
            </ul>
          </Card>

          <Card title="Community Support" description="Help other users">
            <ul className="text-sm space-y-1">
              <li>✅ Answer questions in discussions</li>
              <li>✅ Review pull requests</li>
              <li>✅ Report and triage issues</li>
              <li>✅ Share usage examples</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="First Time Contributors">
          New to open source? Look for issues labeled "good first issue" or "help wanted" 
          to get started. Don't hesitate to ask questions in discussions or issues.
        </Alert>
      </section>

      <section id="getting-started">
        <h2>Getting Started</h2>
        <p>
          Before making your first contribution, familiarize yourself with the codebase, 
          development environment, and contribution process.
        </p>

        <h3>Prerequisites</h3>
        <ul>
          <li><strong>GitHub Account:</strong> Required for forking and submitting pull requests</li>
          <li><strong>Development Environment:</strong> Follow the <a href="/docs/developer/setup">development setup guide</a></li>
          <li><strong>Understanding of Git:</strong> Basic knowledge of Git workflows</li>
          <li><strong>Familiarity with Tech Stack:</strong> Next.js, React, TypeScript, Tailwind CSS</li>
        </ul>

        <h3>Contribution Workflow</h3>
        <StepGuide steps={contributionSteps} />

        <h3>Types of Contributions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Feature Requests">
            <ul className="text-sm space-y-1">
              <li><strong>New Features:</strong> Propose and implement new functionality</li>
              <li><strong>Enhancements:</strong> Improve existing features</li>
              <li><strong>Integrations:</strong> Add third-party service integrations</li>
              <li><strong>Mobile Features:</strong> Enhance the Flutter mobile app</li>
            </ul>
          </Card>
          
          <Card title="Bug Fixes">
            <ul className="text-sm space-y-1">
              <li><strong>Critical Bugs:</strong> Fix security or data loss issues</li>
              <li><strong>Performance Issues:</strong> Optimize slow operations</li>
              <li><strong>UI/UX Bugs:</strong> Fix interface and usability issues</li>
              <li><strong>Compatibility:</strong> Fix browser or device compatibility</li>
            </ul>
          </Card>
        </div>
      </section>

      <section id="development-workflow">
        <h2>Development Workflow</h2>
        <p>
          Follow this workflow to ensure smooth collaboration and maintain code quality.
        </p>

        <h3>Branch Naming</h3>
        <ul>
          <li><strong>Features:</strong> <code>feature/descriptive-name</code></li>
          <li><strong>Bug fixes:</strong> <code>fix/issue-description</code></li>
          <li><strong>Documentation:</strong> <code>docs/section-name</code></li>
          <li><strong>Refactoring:</strong> <code>refactor/component-name</code></li>
          <li><strong>Tests:</strong> <code>test/feature-name</code></li>
        </ul>

        <h3>Commit Messages</h3>
        <p>Use conventional commits format for clear and consistent commit history:</p>

        <CodeBlock language="bash" title="Commit Message Format">
{`# Format
<type>(<scope>): <description>

# Types
feat: new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semicolons, etc.
refactor: code refactoring
test: adding or updating tests
chore: maintenance tasks

# Examples
feat(auth): add two-factor authentication
fix(upload): resolve file corruption issue
docs(api): update authentication endpoints
style(dashboard): improve responsive layout
refactor(storage): optimize file retrieval logic
test(auth): add unit tests for login flow
chore(deps): update dependencies to latest versions`}
        </CodeBlock>

        <h3>Development Process</h3>
        <ol>
          <li><strong>Create Issue:</strong> Create or find an existing issue for your contribution</li>
          <li><strong>Discussion:</strong> Discuss the approach and implementation details</li>
          <li><strong>Development:</strong> Implement changes following coding standards</li>
          <li><strong>Testing:</strong> Write tests and ensure all tests pass</li>
          <li><strong>Documentation:</strong> Update documentation as needed</li>
          <li><strong>Review:</strong> Submit pull request for code review</li>
        </ol>
      </section>

      <section id="coding-standards">
        <h2>Coding Standards</h2>
        <p>
          Maintain consistent code quality and style across the project by following these standards.
        </p>

        <h3>TypeScript Guidelines</h3>
        <ul>
          <li><strong>Strict Mode:</strong> Always use strict TypeScript configuration</li>
          <li><strong>Type Definitions:</strong> Provide explicit types for function parameters and return values</li>
          <li><strong>Interfaces:</strong> Use interfaces for object structures</li>
          <li><strong>Generics:</strong> Use generics for reusable components and functions</li>
          <li><strong>No Any:</strong> Avoid using 'any' type; use specific types or unions</li>
        </ul>

        <CodeBlock language="typescript" title="TypeScript Best Practices">
{`// Good: Explicit types and interfaces
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

async function getUser(id: string): Promise<User | null> {
  try {
    const response = await api.get(\`/users/\${id}\`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

// Good: Generic components
interface ButtonProps<T = HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  onClick: (event: React.MouseEvent<T>) => void;
  children: React.ReactNode;
}

// Avoid: Using any
// function handleData(data: any): any { ... }`}
        </CodeBlock>

        <h3>React Component Guidelines</h3>
        <ul>
          <li><strong>Functional Components:</strong> Use functional components with hooks</li>
          <li><strong>Props Interface:</strong> Define props interface for each component</li>
          <li><strong>Default Props:</strong> Use default parameters instead of defaultProps</li>
          <li><strong>Error Boundaries:</strong> Implement error boundaries for error handling</li>
          <li><strong>Accessibility:</strong> Include proper ARIA attributes and semantic HTML</li>
        </ul>

        <h3>Code Formatting</h3>
        <ul>
          <li><strong>Prettier:</strong> Use Prettier for consistent code formatting</li>
          <li><strong>ESLint:</strong> Follow ESLint rules for code quality</li>
          <li><strong>Import Order:</strong> Group imports logically (external, internal, relative)</li>
          <li><strong>Naming Conventions:</strong> Follow established naming patterns</li>
        </ul>

        <CodeBlock language="typescript" title="Import Order Example">
{`// 1. React and external libraries
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { z } from 'zod';

// 2. Internal utilities and hooks
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

// 3. Components
import { Button } from '@/components/ui/Button';
import { FileList } from '@/components/features/files/FileList';

// 4. Types
import type { User, FileMetadata } from '@/types';

// 5. Relative imports
import './ComponentName.css';`}
        </CodeBlock>
      </section>

      <section id="pull-requests">
        <h2>Pull Request Process</h2>
        <p>
          Follow this process to ensure your pull requests are reviewed and merged efficiently.
        </p>

        <h3>Before Submitting</h3>
        <ul>
          <li><strong>Test Locally:</strong> Ensure all tests pass and the application works correctly</li>
          <li><strong>Check Linting:</strong> Fix any linting errors or warnings</li>
          <li><strong>Update Documentation:</strong> Add or update relevant documentation</li>
          <li><strong>Rebase:</strong> Rebase your branch on the latest main branch</li>
          <li><strong>Clean History:</strong> Squash or clean up commit history if needed</li>
        </ul>

        <h3>Pull Request Template</h3>
        <CodeBlock language="markdown" title="PR Description Template">
{`## Description
Brief description of changes and motivation.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] All existing tests pass

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings`}
        </CodeBlock>

        <h3>Review Process</h3>
        <ol>
          <li><strong>Automated Checks:</strong> CI/CD pipeline runs tests and linting</li>
          <li><strong>Code Review:</strong> Maintainers review code quality and functionality</li>
          <li><strong>Feedback:</strong> Address any review comments or suggestions</li>
          <li><strong>Approval:</strong> Get approval from required reviewers</li>
          <li><strong>Merge:</strong> Maintainer merges the pull request</li>
        </ol>

        <Alert type="info" title="Review Timeline">
          Pull requests are typically reviewed within 48-72 hours. Complex changes may take longer. 
          Feel free to ping reviewers if your PR hasn't been reviewed after a week.
        </Alert>
      </section>

      <section id="issue-reporting">
        <h2>Issue Reporting</h2>
        <p>
          Help improve MegaVault by reporting bugs, requesting features, or asking questions.
        </p>

        <h3>Bug Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="Before Reporting">
            <ul className="text-sm space-y-1">
              <li><strong>Search Existing:</strong> Check if the issue already exists</li>
              <li><strong>Latest Version:</strong> Verify the bug exists in the latest version</li>
              <li><strong>Reproduce:</strong> Confirm you can reproduce the issue</li>
              <li><strong>Minimal Example:</strong> Create a minimal reproduction case</li>
            </ul>
          </Card>
          
          <Card title="Report Details">
            <ul className="text-sm space-y-1">
              <li><strong>Environment:</strong> OS, browser, Node.js version</li>
              <li><strong>Steps:</strong> Clear steps to reproduce the issue</li>
              <li><strong>Expected:</strong> What you expected to happen</li>
              <li><strong>Actual:</strong> What actually happened</li>
            </ul>
          </Card>
        </div>

        <h3>Feature Requests</h3>
        <ul>
          <li><strong>Use Case:</strong> Explain the problem you're trying to solve</li>
          <li><strong>Proposed Solution:</strong> Describe your ideal solution</li>
          <li><strong>Alternatives:</strong> Consider alternative approaches</li>
          <li><strong>Implementation:</strong> Are you willing to implement the feature?</li>
        </ul>

        <h3>Security Issues</h3>
        <Alert type="error" title="Security Vulnerabilities">
          DO NOT report security vulnerabilities in public issues. 
          Instead, email security concerns to the maintainers privately.
        </Alert>
      </section>

      <section id="documentation">
        <h2>Documentation</h2>
        <p>
          Good documentation is crucial for project success. Contribute by improving existing docs or adding new ones.
        </p>

        <h3>Documentation Types</h3>
        <ul>
          <li><strong>User Documentation:</strong> Installation, usage, and troubleshooting guides</li>
          <li><strong>Developer Documentation:</strong> API references, architecture, and contributing guides</li>
          <li><strong>Code Comments:</strong> Inline documentation for complex code</li>
          <li><strong>README Files:</strong> Project overview and quick start information</li>
        </ul>

        <h3>Writing Guidelines</h3>
        <ul>
          <li><strong>Clear and Concise:</strong> Use simple language and short sentences</li>
          <li><strong>Examples:</strong> Include practical examples and code snippets</li>
          <li><strong>Structure:</strong> Use headings, lists, and tables for organization</li>
          <li><strong>Accuracy:</strong> Ensure all information is current and correct</li>
          <li><strong>Accessibility:</strong> Write for users of all skill levels</li>
        </ul>

        <h3>Documentation Standards</h3>
        <ul>
          <li><strong>Markdown:</strong> Use Markdown for all documentation files</li>
          <li><strong>Code Blocks:</strong> Use syntax highlighting for code examples</li>
          <li><strong>Links:</strong> Use relative links for internal documentation</li>
          <li><strong>Images:</strong> Optimize images and provide alt text</li>
          <li><strong>Table of Contents:</strong> Include TOC for longer documents</li>
        </ul>
      </section>

      <section id="community">
        <h2>Community Guidelines</h2>
        <p>
          MegaVault is committed to providing a welcoming and inclusive environment for all contributors.
        </p>

        <h3>Code of Conduct</h3>
        <ul>
          <li><strong>Be Respectful:</strong> Treat all community members with respect and kindness</li>
          <li><strong>Be Inclusive:</strong> Welcome people of all backgrounds and skill levels</li>
          <li><strong>Be Constructive:</strong> Provide helpful feedback and suggestions</li>
          <li><strong>Be Patient:</strong> Remember that everyone is learning and improving</li>
          <li><strong>Be Professional:</strong> Keep discussions focused and productive</li>
        </ul>

        <h3>Communication Channels</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <Card title="GitHub">
            <ul className="text-sm space-y-1">
              <li><strong>Issues:</strong> Bug reports and feature requests</li>
              <li><strong>Discussions:</strong> General questions and ideas</li>
              <li><strong>Pull Requests:</strong> Code review and collaboration</li>
              <li><strong>Projects:</strong> Development roadmap and planning</li>
            </ul>
          </Card>
          
          <Card title="Community">
            <ul className="text-sm space-y-1">
              <li><strong>Discord:</strong> Real-time chat and support</li>
              <li><strong>Forum:</strong> Long-form discussions and tutorials</li>
              <li><strong>Blog:</strong> Updates and technical articles</li>
              <li><strong>Social Media:</strong> Project announcements</li>
            </ul>
          </Card>
        </div>

        <h3>Getting Help</h3>
        <ul>
          <li><strong>Documentation:</strong> Check existing documentation first</li>
          <li><strong>Search Issues:</strong> Look for similar questions or problems</li>
          <li><strong>Ask Questions:</strong> Use GitHub Discussions for questions</li>
          <li><strong>Provide Context:</strong> Include relevant details when asking for help</li>
          <li><strong>Be Patient:</strong> Allow time for community members to respond</li>
        </ul>

        <Alert type="success" title="Thank You!">
          Thank you for your interest in contributing to MegaVault! Every contribution, 
          no matter how small, helps make the project better for everyone.
        </Alert>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Next Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/developer/setup" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">Development Setup →</h4>
              <p className="text-blue-800 text-sm">Set up your development environment</p>
            </Link>
            <Link href="/docs/developer/testing" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">Testing Guide →</h4>
              <p className="text-green-800 text-sm">Learn about testing strategies</p>
            </Link>
            <Link href="/docs/developer/deployment" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <h4 className="font-semibold text-purple-900 mb-2">Deployment →</h4>
              <p className="text-purple-800 text-sm">Deploy your changes to production</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}