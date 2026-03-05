# Bloggy

A modern, full-stack blogging platform with a Flutter mobile/desktop client and a Node.js/TypeScript REST API backend.

[![GitHub Repository](https://img.shields.io/badge/GitHub-MortadhaHouch%2Fbloggy-blue?logo=github)](https://github.com/MortadhaHouch/bloggy)

## 🌟 Features

- **Multi-platform Support**: Native applications for iOS, Android, Web, Windows, Linux, and macOS
- **User Authentication**: Secure user authentication and authorization
- **Blog Posts**: Create, read, update, and delete blog posts
- **Comments**: Interactive commenting system on blog posts
- **User Management**: User profiles and account management
- **REST API**: Well-documented REST API with Swagger/OpenAPI support
- **Database Migrations**: Version-controlled database schema with Drizzle ORM

## 📦 Tech Stack

### Frontend

- **Flutter** - Cross-platform UI framework
- **Dart** - Programming language for Flutter
- **Null Safety** - Type-safe Dart implementation

### Backend

- **Node.js** - JavaScript runtime
- **TypeScript** - Type-safe JavaScript superset
- **Drizzle ORM** - Lightweight SQL ORM
- **Swagger/OpenAPI** - API documentation

### Database

- **SQL Database** - Managed via Drizzle migrations

## 🏗️ Project Structure

```
bloggy/
├── client/                      # Flutter client application
│   ├── lib/                     # Dart source code
│   ├── android/                 # Android native code
│   ├── ios/                     # iOS native code
│   ├── web/                     # Web platform files
│   ├── windows/                 # Windows platform files
│   ├── linux/                   # Linux platform files
│   ├── macos/                   # macOS platform files
│   ├── test/                    # Unit and widget tests
│   └── pubspec.yaml             # Flutter dependencies
│
└── server/                      # Node.js/TypeScript backend
    ├── main.ts                  # Application entry point
    ├── package.json             # Node.js dependencies
    ├── tsconfig.json            # TypeScript configuration
    ├── drizzle.config.ts        # Drizzle ORM configuration
    ├── controllers/             # Route controllers
    │   ├── userController.ts
    │   ├── postController.ts
    │   └── commentController.ts
    ├── middlewares/             # Express middlewares
    │   └── authMiddleware.ts
    ├── database/                # Database layer
    │   ├── models/              # Database schemas
    │   ├── config/              # Database configuration
    │   └── migrations/          # Database migrations
    ├── utils/                   # Utility functions
    │   ├── constants.ts
    │   └── types.ts
    ├── config/                  # Configuration files
    │   └── swagger.ts
    └── Dockerfile               # Docker configuration
```

## 🚀 Getting Started

### Prerequisites

#### For Server Development

- **Node.js** (v16.0.0 or higher)
- **npm** or **yarn** (for package management)
- **Docker** (optional, for containerization)
- **Database**: PostgreSQL with Drizzle ORM

#### For Client Development

- **Flutter SDK** (3.0.0 or higher)
- **Dart SDK** (included with Flutter)
- **IDE**: Android Studio, Xcode (for iOS/macOS), or Visual Studio Code
- **Platform Requirements**:
  - **iOS**: Xcode 12.0+, iOS 11.0+
  - **Android**: Android SDK 21+, Android Studio
  - **Web**: Modern web browser with Flutter web support

### Installation

#### Server Setup

1. Navigate to the server directory:

   ```bash
   cd server
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Configure environment variables:

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your database connection string and other configuration.
4. Run database migrations:

   ```bash
   npm run db:migrate
   ```
5. Start the development server:

   ```bash
   npm run dev
   ```
6. The API will be available at `http://localhost:3000` (or your configured port)

#### Client Setup

1. Navigate to the client directory:

   ```bash
   cd client
   ```
2. Install dependencies:

   ```bash
   flutter pub get
   ```
3. Configure API endpoint in your environment or configuration file
4. Run on specific platform:

   ```bash
   # iOS
   flutter run -d ios

   # Android
   flutter run -d android

   # Web
   flutter run -d web

   # Windows
   flutter run -d windows

   # macOS
   flutter run -d macos

   # Linux
   flutter run -d linux
   ```

## 📚 API Documentation

The REST API is documented using Swagger/OpenAPI. Once the server is running, access the API documentation at:

```
http://localhost:3000/api-docs
```

### Main Endpoints

- **Users**: `/api/users` - User management endpoints
- **Posts**: `/api/posts` - Blog post CRUD operations
- **Comments**: `/api/comments` - Comment management

## 🔐 Authentication

The application uses middleware-based authentication. Protected routes require valid authentication tokens.

### Auth Middleware

- Located at: `server/middlewares/authMiddleware.ts`
- Validates tokens and user sessions
- Protects sensitive endpoints

## 📊 Database

### Migrations

Run migrations:

```bash
npm run db:migrate
```

Generate new migration:

```bash
npm run db:generate
```

### ORM

Uses **Drizzle ORM** for type-safe database queries. Models are defined in `server/database/models/`

## 🧪 Testing

### Server Tests

```bash
cd server
npm run test
```

### Client Tests

```bash
cd client
flutter test
```

## 🐳 Docker

Build and run the server using Docker:

```bash
docker build -t bloggy-server .
docker run -p 3000:3000 bloggy-server
```

## 📱 Build for Production

### Server

```bash
npm run build
npm start
```

### Client

```bash
# iOS
flutter build ios

# Android
flutter build apk    # or: flutter build appbundle

# Web
flutter build web

# Windows
flutter build windows

# macOS
flutter build macos

# Linux
flutter build linux
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- **Backend**: Follow TypeScript/Node.js conventions
- **Frontend**: Follow Dart style guide and Flutter best practices

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**[Mortadha Houch](https://github.com/MortadhaHouch)**

GitHub Repository: [https://github.com/MortadhaHouch/bloggy](https://github.com/MortadhaHouch/bloggy)

## 🙏 Acknowledgments

- [Flutter](https://flutter.dev) - UI framework
- [Node.js](https://nodejs.org) - JavaScript runtime
- [TypeScript](https://www.typescriptlang.org) - Type safety for JavaScript
- [Drizzle ORM](https://orm.drizzle.team) - SQL ORM
- [Express.js](https://expressjs.com) - Web framework

## 📞 Support

For issues, questions, or suggestions, please [open an issue on GitHub](https://github.com/MortadhaHouch/bloggy/issues).

---

**Last Updated**: March 5, 2026
