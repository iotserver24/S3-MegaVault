# MegaVault Open Source

<div align="center">
  <img src="https://raw.githubusercontent.com/iotserver24/S3-MegaVault/refs/heads/main/public/icon.png" alt="MegaVault Logo" width="150" height="150">
</div>

A modern, self-hosted cloud storage platform built with Next.js, React, and Flutter. MegaVault provides a Google Drive-like experience with complete control over your data.

[![GitHub issues](https://img.shields.io/github/issues/iotserver24/S3-MegaVault)](https://github.com/iotserver24/S3-MegaVault/issues)
[![GitHub license](https://img.shields.io/github/license/iotserver24/S3-MegaVault)](https://github.com/iotserver24/S3-MegaVault/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/iotserver24/S3-MegaVault)](https://github.com/iotserver24/S3-MegaVault/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/iotserver24/S3-MegaVault)](https://github.com/iotserver24/S3-MegaVault/network)

## 🔒 Security Notice

⚠️ **IMPORTANT**: This is a single-user cloud storage system designed for personal use. Before deploying:

- Change ALL default passwords and secrets in `.env.local`
- Use HTTPS in production environments
- Secure your Redis and storage services
- Regular security updates are required
- Review the [Security Documentation](docs/security/overview.md) before deployment

## 🌟 Features

- **Self-Hosted**: Full control over your data and infrastructure
- **Single-User System**: Designed for personal cloud storage with environment-based authentication
- **Modern UI**: Clean, responsive web interface built with React and Tailwind CSS
- **Mobile App**: Native Flutter mobile application for iOS and Android (in development)
- **File Management**: Upload, download, organize, and preview files
- **File Sharing**: Public and private file sharing capabilities
- **Security First**: Environment-based authentication, secure file access, and production-ready security
- **S3 Compatible**: Works with any S3-compatible storage (Cloudflare R2, AWS S3, MinIO, DigitalOcean Spaces)
- **Redis Backend**: Fast, reliable data storage with Redis/Upstash
- **Docker Ready**: Easy deployment with Docker and Docker Compose
- **Open Source**: MIT licensed, transparent, and community-driven

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/iotserver24/S3-MegaVault.git
   cd S3-MegaVault
   ```

2. **Configure environment**
   ```bash
   cp .env.docker .env
   # Edit .env with your configuration
   ```

3. **Start the application**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Web: http://localhost:3001
   - Admin: Login with your configured admin credentials

### Manual Installation

1. **Prerequisites**
   - Node.js 18+ 
   - Redis server
   - S3-compatible storage

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🚀 One-Click Deployment

### Deploy to Render (Recommended)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/iotserver24/S3-MegaVault)

**Render Setup Instructions:**
1. Click the "Deploy to Render" button above
2. Connect your GitHub account and select this repository
3. Configure the following environment variables in Render dashboard:
   - `USER_EMAIL`: Your admin email address
   - `USER_PASSWORD`: Your secure password (minimum 20 characters)
   - `NEXTAUTH_SECRET`: Generate a secure 64-character random string
   - `UPSTASH_REDIS_REST_URL`: Your Upstash Redis URL
   - `UPSTASH_REDIS_REST_TOKEN`: Your Upstash Redis token
   - `S3_ENDPOINT`: Your S3-compatible storage endpoint
   - `S3_ACCESS_KEY_ID`: Your storage access key
   - `S3_SECRET_ACCESS_KEY`: Your storage secret key
   - `S3_BUCKET`: Your storage bucket name
4. Deploy! Your MegaVault instance will be available at your Render URL

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/iotserver24/S3-MegaVault&env=USER_EMAIL,USER_PASSWORD,NEXTAUTH_SECRET,UPSTASH_REDIS_REST_URL,UPSTASH_REDIS_REST_TOKEN,S3_ENDPOINT,S3_ACCESS_KEY_ID,S3_SECRET_ACCESS_KEY,S3_BUCKET,S3_REGION,STORAGE_ACCESS_MODE,USER_STORAGE_FOLDER,ENABLE_FILE_SHARING,ENABLE_3D_VISUALIZATION,ENABLE_PUBLIC_REGISTRATION,APP_NAME,APP_DESCRIPTION)

**Vercel Setup Instructions:**
1. Click the "Deploy with Vercel" button above
2. Import your GitHub repository to Vercel
3. Configure the environment variables in Vercel dashboard:
   - `USER_EMAIL`: Your admin email address
   - `USER_PASSWORD`: Your secure password (minimum 20 characters)
   - `NEXTAUTH_SECRET`: Generate a secure 64-character random string
   - `UPSTASH_REDIS_REST_URL`: Your Upstash Redis URL
   - `UPSTASH_REDIS_REST_TOKEN`: Your Upstash Redis token
   - `S3_ENDPOINT`: Your S3-compatible storage endpoint
   - `S3_ACCESS_KEY_ID`: Your storage access key
   - `S3_SECRET_ACCESS_KEY`: Your storage secret key
   - `S3_BUCKET`: Your storage bucket name
4. Deploy! Your MegaVault instance will be available at your Vercel URL

### Prerequisites for Deployment

Before deploying, you'll need to set up:

1. **Redis Database** (Required):
   - Sign up at [Upstash](https://upstash.com/) (recommended)
   - Create a new Redis database
   - Copy the REST URL and token

2. **S3-Compatible Storage** (Required):
   - [Cloudflare R2](https://developers.cloudflare.com/r2/) (recommended)
   - [AWS S3](https://aws.amazon.com/s3/)
   - [DigitalOcean Spaces](https://www.digitalocean.com/products/spaces)
   - [MinIO](https://min.io/) (self-hosted)
   - [Backblaze B2](https://www.backblaze.com/b2/)
   - [Wasabi](https://wasabi.com/)

3. **Generate Secure Secrets**:
   ```bash
   # Generate NEXTAUTH_SECRET (64 characters)
   openssl rand -hex 32
   
   # Or use online generator
   # https://generate-secret.vercel.app/64
   ```

## ⚙️ Configuration

### Required Environment Variables

```bash
# Database
UPSTASH_REDIS_REST_URL=redis://localhost:6379
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# Storage Access Configuration
STORAGE_ACCESS_MODE=bucket              # Options: bucket | folder
USER_STORAGE_FOLDER=single-user-folder  # Only needed for folder mode

# Storage (S3 Compatible)
S3_ENDPOINT=https://your-account.r2.cloudflarestorage.com
S3_ACCESS_KEY_ID=your_access_key
S3_SECRET_ACCESS_KEY=your_secret_key
S3_BUCKET=megavault-storage

# Authentication
NEXTAUTH_SECRET=your_secure_secret_here

# User Account
USER_EMAIL=user@yourdomain.com
USER_PASSWORD=your_secure_password
```

### Storage Access Modes

**Bucket Mode** (Recommended for personal use):
- Complete access to the entire storage bucket
- Files stored directly at bucket root
- Maximum flexibility for file organization
- Set `STORAGE_ACCESS_MODE=bucket`

**Folder Mode** (Recommended for shared buckets):
- Files isolated within a specific folder
- Better organization and security
- Ideal for shared storage environments
- Set `STORAGE_ACCESS_MODE=folder` and `USER_STORAGE_FOLDER=your-folder-name`

### Optional Settings

```bash
# Application Settings
DEFAULT_STORAGE_LIMIT_GB=50
MAX_FILE_SIZE_MB=100
ENABLE_PUBLIC_REGISTRATION=true
ENABLE_FILE_SHARING=true
ENABLE_3D_VISUALIZATION=false

# Custom Branding
APP_NAME=MegaVault
APP_DESCRIPTION=Open Source Cloud Storage
```

## 📱 Mobile App

> **⚠️ Work in Progress**: The Flutter mobile app is currently under development and not yet ready for production use. We're actively working on completing the mobile application.

The Flutter mobile app is located in the `megavault_mobile/` directory.

### Current Status

- 🚧 **In Development**: Basic structure implemented but needs completion
- 🎯 **Target Features**: File management, upload/download, authentication
- 🤝 **Help Needed**: Flutter developers welcome to contribute!

### Setup (For Contributors)

1. **Install Flutter** (https://flutter.dev/docs/get-started/install)

2. **Configure API endpoint**
   ```dart
   // lib/utils/api_config.dart
   static const String baseUrl = 'http://your-server:3001';
   ```

3. **Run the app**
   ```bash
   cd megavault_mobile
   flutter pub get
   flutter run
   ```

### Contributing to Mobile App

We especially welcome contributions to the Flutter mobile app! Areas where help is needed:
- UI/UX improvements
- File upload/download functionality
- Authentication integration
- Background sync features
- Testing and bug fixes

See [Contributing Guidelines](CONTRIBUTING.md) for more details.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   Web Client    │    │  Mobile App     │
│   (Next.js)     │    │   (Flutter)     │
└─────────────────┘    └─────────────────┘
         │                       │
         └───────────────────────┼─────────────────┐
                                 │                 │
                    ┌─────────────────┐            │
                    │   API Routes    │            │
                    │   (Next.js)     │            │
                    └─────────────────┘            │
                                 │                 │
                    ┌─────────────────┐    ┌─────────────────┐
                    │     Redis       │    │  S3 Storage     │
                    │   (User Data)   │    │ (File Storage)  │
                    └─────────────────┘    └─────────────────┘
```

## 🔧 Development

### Project Structure

```
S3-MegaVault/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── lib/             # Utility libraries
│   └── types/           # TypeScript definitions
├── megavault_mobile/    # Flutter mobile app
├── scripts/            # Deployment scripts
└── docker-compose.yml  # Docker configuration
```

### API Endpoints

- **Authentication**: `/api/auth/*`
- **File Management**: `/api/files/*`
- **User Management**: `/api/users/*`
- **Admin**: `/api/admin/*`
- **Mobile**: `/api/mobile/*`
- **Health Check**: `/api/health`

### Running Tests

```bash
# Web application
npm run test

# Mobile application
cd megavault_mobile
flutter test
```

## 🚀 Deployment

### Docker Deployment

```bash
# Production deployment
docker-compose up -d

# With Nginx reverse proxy
docker-compose --profile with-nginx up -d
```

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Environment Setup

1. **Redis**: Set up Redis server or use a managed service
2. **Storage**: Configure S3-compatible storage (Cloudflare R2 recommended)
3. **Domain**: Point your domain to the server
4. **SSL**: Set up SSL certificates (Let's Encrypt recommended)

## 🔒 Security

- **Environment Variables**: Store secrets securely
- **Admin Access**: Environment-based admin authentication
- **File Security**: Signed URLs for secure file access
- **Rate Limiting**: Implement rate limiting for production
- **SSL/TLS**: Use HTTPS in production
- **Regular Updates**: Keep dependencies updated

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Areas Where Help is Especially Needed

- **📱 Flutter Mobile App**: The mobile application needs significant development work
- **🔍 Testing**: Both unit and integration tests
- **📝 Documentation**: Improvements and translations
- **🎨 UI/UX**: Design improvements and accessibility
- **🔒 Security**: Security reviews and improvements

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Full documentation](docs/)
- **Issues**: [GitHub Issues](https://github.com/iotserver24/S3-MegaVault/issues)
- **Discussions**: [GitHub Discussions](https://github.com/iotserver24/S3-MegaVault/discussions)
- **Community**: Join our community chat

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Mobile app powered by [Flutter](https://flutter.dev/)
- UI components from [Tailwind CSS](https://tailwindcss.com/)
- File storage via S3-compatible services
- Data persistence with [Redis](https://redis.io/)

## 🗺️ Roadmap

### High Priority
- [ ] **Complete Flutter mobile app** (🔴 Help needed!)
- [ ] Advanced file versioning
- [ ] API rate limiting
- [ ] File encryption at rest

### Medium Priority
- [ ] Team collaboration features
- [ ] Advanced admin dashboard
- [ ] Integration with external services
- [ ] Advanced analytics
- [ ] Backup and restore functionality

---

**MegaVault Open Source** - Take control of your cloud storage! 🚀