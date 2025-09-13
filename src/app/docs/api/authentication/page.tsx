import { Alert, TableOfContents, Card, CodeBlock } from '../../components/DocComponents';
import Link from 'next/link';

const tableOfContents = [
  { id: 'overview', title: 'Authentication Overview' },
  { id: 'signin', title: 'Sign In' },
  { id: 'signup', title: 'Sign Up' },
  { id: 'signout', title: 'Sign Out' },
  { id: 'session', title: 'Session Management' },
  { id: 'jwt-tokens', title: 'JWT Tokens' },
  { id: 'examples', title: 'Code Examples' },
];

export default function AuthenticationAPIPage() {
  return (
    <div className="prose prose-slate max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Authentication API</h1>
        <p className="text-xl text-slate-600">
          Complete reference for user authentication, session management, and token handling in MegaVault.
        </p>
      </div>

      <TableOfContents sections={tableOfContents} />

      <section id="overview">
        <h2>Authentication Overview</h2>
        <p>
          MegaVault uses JWT-based authentication with secure session management. 
          The authentication system supports both web and mobile applications.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
          <Card title="JWT Tokens" description="Secure token-based auth">
            <ul className="text-sm space-y-1">
              <li>✅ Stateless authentication</li>
              <li>✅ Configurable expiration</li>
              <li>✅ Secure token signing</li>
              <li>✅ Auto-refresh capability</li>
            </ul>
          </Card>
          
          <Card title="Session Management" description="Persistent sessions">
            <ul className="text-sm space-y-1">
              <li>✅ Redis-based storage</li>
              <li>✅ Cross-device sessions</li>
              <li>✅ Session invalidation</li>
              <li>✅ Security monitoring</li>
            </ul>
          </Card>

          <Card title="Security Features" description="Enterprise-grade security">
            <ul className="text-sm space-y-1">
              <li>✅ Password hashing (bcrypt)</li>
              <li>✅ Rate limiting</li>
              <li>✅ CSRF protection</li>
              <li>✅ Secure cookies</li>
            </ul>
          </Card>
        </div>

        <Alert type="info" title="Base URL">
          All authentication endpoints are prefixed with: <code>/api/auth</code>
        </Alert>
      </section>

      <section id="signin">
        <h2>Sign In</h2>
        <p>Authenticate a user with email and password to receive an access token.</p>

        <CodeBlock language="http" title="Request">
{`POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}`}
        </CodeBlock>

        <h3>Response</h3>
        <CodeBlock language="json" title="Success Response (200)">
{`{
  "success": true,
  "user": {
    "id": "user_123456789",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": "https://example.com/avatar.jpg",
    "createdAt": "2024-01-15T10:30:00Z",
    "lastLoginAt": "2024-01-20T14:25:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "24h",
  "refreshToken": "rt_abc123def456..."
}`}
        </CodeBlock>

        <CodeBlock language="json" title="Error Response (401)">
{`{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password",
    "field": "credentials"
  }
}`}
        </CodeBlock>

        <h3>Validation Rules</h3>
        <ul>
          <li><strong>email:</strong> Valid email format, required</li>
          <li><strong>password:</strong> Minimum 8 characters, required</li>
        </ul>
      </section>

      <section id="signup">
        <h2>Sign Up</h2>
        <p>Register a new user account with email, password, and optional profile information.</p>

        <CodeBlock language="http" title="Request">
{`POST /api/auth/signup
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "securepassword123",
  "name": "Jane Smith",
  "confirmPassword": "securepassword123"
}`}
        </CodeBlock>

        <h3>Response</h3>
        <CodeBlock language="json" title="Success Response (201)">
{`{
  "success": true,
  "user": {
    "id": "user_987654321",
    "email": "newuser@example.com",
    "name": "Jane Smith",
    "avatar": null,
    "createdAt": "2024-01-20T15:45:00Z",
    "emailVerified": false
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Account created successfully. Please check your email for verification."
}`}
        </CodeBlock>

        <CodeBlock language="json" title="Error Response (400)">
{`{
  "success": false,
  "error": {
    "code": "EMAIL_ALREADY_EXISTS",
    "message": "An account with this email already exists",
    "field": "email"
  }
}`}
        </CodeBlock>

        <h3>Validation Rules</h3>
        <ul>
          <li><strong>email:</strong> Valid email format, unique, required</li>
          <li><strong>password:</strong> Minimum 8 characters, required</li>
          <li><strong>confirmPassword:</strong> Must match password, required</li>
          <li><strong>name:</strong> 2-50 characters, optional</li>
        </ul>
      </section>

      <section id="signout">
        <h2>Sign Out</h2>
        <p>Invalidate the current session and sign out the user.</p>

        <CodeBlock language="http" title="Request">
{`POST /api/auth/signout
Authorization: Bearer YOUR_JWT_TOKEN`}
        </CodeBlock>

        <h3>Response</h3>
        <CodeBlock language="json" title="Success Response (200)">
{`{
  "success": true,
  "message": "Successfully signed out"
}`}
        </CodeBlock>
      </section>

      <section id="session">
        <h2>Session Management</h2>
        <p>Retrieve current session information and verify token validity.</p>

        <h3>Get Current Session</h3>
        <CodeBlock language="http" title="Request">
{`GET /api/auth/session
Authorization: Bearer YOUR_JWT_TOKEN`}
        </CodeBlock>

        <CodeBlock language="json" title="Success Response (200)">
{`{
  "success": true,
  "user": {
    "id": "user_123456789",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": "https://example.com/avatar.jpg"
  },
  "session": {
    "id": "session_abc123",
    "createdAt": "2024-01-20T10:00:00Z",
    "expiresAt": "2024-01-21T10:00:00Z",
    "ipAddress": "192.168.1.1",
    "userAgent": "Mozilla/5.0..."
  }
}`}
        </CodeBlock>

        <h3>Refresh Token</h3>
        <CodeBlock language="http" title="Request">
{`POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "rt_abc123def456..."
}`}
        </CodeBlock>

        <CodeBlock language="json" title="Success Response (200)">
{`{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "24h",
  "refreshToken": "rt_new123token456..."
}`}
        </CodeBlock>
      </section>

      <section id="jwt-tokens">
        <h2>JWT Tokens</h2>
        <p>Understanding JWT token structure and usage in MegaVault API.</p>

        <h3>Token Structure</h3>
        <CodeBlock language="json" title="JWT Payload">
{`{
  "sub": "user_123456789",
  "email": "user@example.com",
  "name": "John Doe",
  "iat": 1640995200,
  "exp": 1641081600,
  "scope": ["read", "write"]
}`}
        </CodeBlock>

        <h3>Token Usage</h3>
        <ul>
          <li><strong>Header Format:</strong> <code>Authorization: Bearer TOKEN</code></li>
          <li><strong>Expiration:</strong> Tokens expire after 24 hours by default</li>
          <li><strong>Refresh:</strong> Use refresh token to get new access token</li>
          <li><strong>Storage:</strong> Store securely (localStorage for web, Keychain for mobile)</li>
        </ul>

        <h3>Security Best Practices</h3>
        <ul>
          <li><strong>HTTPS Only:</strong> Always use HTTPS in production</li>
          <li><strong>Secure Storage:</strong> Store tokens securely on client side</li>
          <li><strong>Short Expiration:</strong> Keep access token expiration short</li>
          <li><strong>Rotate Refresh Tokens:</strong> Refresh tokens should be rotated</li>
        </ul>
      </section>

      <section id="examples">
        <h2>Code Examples</h2>
        <p>Implementation examples for common authentication flows.</p>

        <h3>JavaScript/Node.js</h3>
        <CodeBlock language="javascript" title="Authentication Service">
{`class AuthService {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('authToken');
  }

  async signIn(email, password) {
    const response = await fetch(\`\${this.baseURL}/api/auth/signin\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (data.success) {
      this.token = data.token;
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    } else {
      throw new Error(data.error.message);
    }
  }

  async signOut() {
    if (this.token) {
      await fetch(\`\${this.baseURL}/api/auth/signout\`, {
        method: 'POST',
        headers: {
          'Authorization': \`Bearer \${this.token}\`,
        },
      });
    }
    
    this.token = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }

  async getSession() {
    if (!this.token) return null;

    const response = await fetch(\`\${this.baseURL}/api/auth/session\`, {
      headers: {
        'Authorization': \`Bearer \${this.token}\`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.user;
    }
    return null;
  }
}`}
        </CodeBlock>

        <h3>Python</h3>
        <CodeBlock language="python" title="Python Authentication">
{`import requests
import json

class MegaVaultAuth:
    def __init__(self, base_url):
        self.base_url = base_url
        self.token = None
    
    def sign_in(self, email, password):
        url = f"{self.base_url}/api/auth/signin"
        data = {"email": email, "password": password}
        
        response = requests.post(url, json=data)
        result = response.json()
        
        if result.get('success'):
            self.token = result['token']
            return result['user']
        else:
            raise Exception(result['error']['message'])
    
    def get_headers(self):
        if not self.token:
            raise Exception("Not authenticated")
        return {"Authorization": f"Bearer {self.token}"}
    
    def sign_out(self):
        if self.token:
            url = f"{self.base_url}/api/auth/signout"
            requests.post(url, headers=self.get_headers())
        self.token = None`}
        </CodeBlock>

        <Alert type="warning" title="Security Note">
          Never hardcode credentials or tokens in your source code. Use environment variables 
          or secure configuration management for production applications.
        </Alert>

        <div className="not-prose mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/api/files" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <h4 className="font-semibold text-blue-900 mb-2">File Management API →</h4>
              <p className="text-blue-800 text-sm">Use authenticated requests for file operations</p>
            </Link>
            <Link href="/docs/api/users" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <h4 className="font-semibold text-green-900 mb-2">User Management API →</h4>
              <p className="text-green-800 text-sm">Manage user profiles and settings</p>
            </Link>
            <Link href="/docs/api/errors" className="block p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
              <h4 className="font-semibold text-red-900 mb-2">Error Handling →</h4>
              <p className="text-red-800 text-sm">Handle authentication errors</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}