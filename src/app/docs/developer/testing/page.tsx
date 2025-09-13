import { Alert, TableOfContents, Card, CodeBlock, StepGuide } from '../../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'Testing Overview' },
  { id: 'unit-testing', title: 'Unit Testing' },
  { id: 'integration-testing', title: 'Integration Testing' },
  { id: 'e2e-testing', title: 'End-to-End Testing' },
  { id: 'mobile-testing', title: 'Mobile Testing' },
  { id: 'ci-cd', title: 'CI/CD Integration' },
];

export default function TestingPage() {
  return (
    <div className="prose prose-slate max-w-none">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Building & Testing</h1>
        <p className="text-xl text-slate-600">
          Comprehensive testing strategies and best practices for ensuring code quality and reliability in MegaVault.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Testing Overview</h2>
        <p>
          MegaVault employs a multi-layered testing approach covering unit tests, integration tests, 
          end-to-end tests, and mobile testing to ensure reliability and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="Testing Stack" description="Modern testing tools">
            <ul className="text-sm space-y-1">
              <li>✅ Jest for unit testing</li>
              <li>✅ React Testing Library</li>
              <li>✅ Playwright for E2E</li>
              <li>✅ Flutter testing framework</li>
            </ul>
          </Card>
          
          <Card title="Coverage Goals" description="Quality metrics">
            <ul className="text-sm space-y-1">
              <li>✅ 80%+ code coverage</li>
              <li>✅ All critical paths tested</li>
              <li>✅ Performance monitoring</li>
              <li>✅ Automated CI/CD testing</li>
            </ul>
          </Card>

          <Card title="Test Types" description="Comprehensive coverage">
            <ul className="text-sm space-y-1">
              <li>✅ Unit tests (70%)</li>
              <li>✅ Integration tests (20%)</li>
              <li>✅ E2E tests (10%)</li>
              <li>✅ Mobile tests</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="Testing Philosophy">
          Our testing approach prioritizes fast feedback loops, user-focused scenarios, 
          and comprehensive coverage of critical functionality.
        </Alert>
      </section>

      <section id="unit-testing">
        <h2>Unit Testing</h2>
        <p>
          Unit tests provide fast feedback and ensure individual components work correctly.
        </p>

        <h3>Component Testing</h3>
        <CodeBlock language="typescript" title="Button.test.tsx">
{`import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/Button';

describe('Button Component', () => {
  it('renders and handles clicks', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});`}
        </CodeBlock>

        <h3>Hook Testing</h3>
        <CodeBlock language="typescript" title="useAuth.test.ts">
{`import { renderHook, act } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';

describe('useAuth Hook', () => {
  it('handles login flow', async () => {
    const { result } = renderHook(() => useAuth());
    
    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });
    
    expect(result.current.isAuthenticated).toBe(true);
  });
});`}
        </CodeBlock>

        <h3>Running Tests</h3>
        <CodeBlock language="bash" title="Test Commands">
{`# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch

# Run specific test
npm run test Button.test.tsx`}
        </CodeBlock>
      </section>

      <section id="integration-testing">
        <h2>Integration Testing</h2>
        <p>
          Integration tests verify API endpoints and service interactions work correctly.
        </p>

        <CodeBlock language="typescript" title="API Testing">
{`import { createMocks } from 'node-mocks-http';
import handler from '@/app/api/auth/signin/route';

describe('/api/auth/signin', () => {
  it('authenticates valid user', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { email: 'test@example.com', password: 'password' },
    });

    await handler(req, res);
    expect(res._getStatusCode()).toBe(200);
  });
});`}
        </CodeBlock>
      </section>

      <section id="e2e-testing">
        <h2>End-to-End Testing</h2>
        <p>
          E2E tests validate complete user workflows using Playwright.
        </p>

        <CodeBlock language="typescript" title="User Flow Test">
{`import { test, expect } from '@playwright/test';

test('file upload workflow', async ({ page }) => {
  // Login
  await page.goto('/auth/signin');
  await page.fill('[data-testid=email]', 'test@example.com');
  await page.fill('[data-testid=password]', 'password123');
  await page.click('[data-testid=signin-button]');

  // Upload file
  await page.goto('/dashboard/files');
  const fileChooser = page.waitForEvent('filechooser');
  await page.click('[data-testid=upload-button]');
  const chooser = await fileChooser;
  await chooser.setFiles('test-file.pdf');

  // Verify upload
  await expect(page.locator('[data-testid=file-list]')).toContainText('test-file.pdf');
});`}
        </CodeBlock>

        <h3>Running E2E Tests</h3>
        <CodeBlock language="bash" title="Playwright Commands">
{`# Run E2E tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui

# Run specific browser
npx playwright test --project=chromium`}
        </CodeBlock>
      </section>

      <section id="mobile-testing">
        <h2>Mobile Testing</h2>
        <p>
          Flutter mobile app testing includes widget tests and integration tests.
        </p>

        <CodeBlock language="dart" title="Widget Test">
{`import 'package:flutter_test/flutter_test.dart';
import 'package:megavault/widgets/file_list.dart';

void main() {
  testWidgets('FileList displays files', (WidgetTester tester) async {
    await tester.pumpWidget(FileList(files: mockFiles));
    expect(find.text('document.pdf'), findsOneWidget);
  });
}`}
        </CodeBlock>

        <CodeBlock language="bash" title="Flutter Test Commands">
{`# Run mobile tests
cd megavault_mobile
flutter test

# Run with coverage
flutter test --coverage

# Integration tests
flutter test integration_test/`}
        </CodeBlock>
      </section>

      <section id="ci-cd">
        <h2>CI/CD Integration</h2>
        <p>
          Automated testing pipeline ensures code quality before deployment.
        </p>

        <CodeBlock language="yaml" title="GitHub Actions">
{`name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - run: npm ci
    - run: npm run lint
    - run: npm run test:ci
    - run: npm run test:e2e
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3`}
        </CodeBlock>

        <Alert type="success" title="Quality Gates">
          All tests must pass, coverage above 80%, and no linting errors before merge.
        </Alert>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Next Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/developer/setup" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">Development Setup →</h4>
              <p className="text-blue-800 text-sm">Set up your testing environment</p>
            </Link>
            <Link href="/docs/developer/deployment" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">Deployment →</h4>
              <p className="text-green-800 text-sm">Deploy your tested changes</p>
            </Link>
            <Link href="/docs/api" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <h4 className="font-semibold text-purple-900 mb-2">API Reference →</h4>
              <p className="text-purple-800 text-sm">API testing documentation</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}