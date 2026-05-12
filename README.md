# Indocoding Test API

Backend REST API built with NestJS, Prisma, and SQLite for the Indocoding internship entrance test.

## 🎯 Kriteria Penilaian Posisi BE (Backend)

Repositori ini telah memenuhi seluruh spesifikasi test masuk untuk posisi Backend Engineer:

1. ✅ **Buatlah API User Auth, dan CRUD tabel User**
   - **Auth:** Endpoint Register & Login (JWT Authentication, password di-hash dengan `bcrypt`).
   - **User CRUD:** Endpoint GET, PUT, DELETE (dilindungi Guard, pengguna hanya bisa memodifikasi datanya sendiri).

2. ✅ **Buatlah CRUD untuk Post, Comment, dan Like**
   - **Post:** Create, Read (all & by id), Update, dan Delete post.
   - **Comment:** Relasi dengan post dan user, fitur Create, Read, Update, dan Delete comment.
   - **Like:** Fitur like dan unlike pada sebuah post (mencegah duplikat like).

3. ✅ **Buat Swagger API**
   - Dokumentasi interaktif Swagger otomatis dapat diakses di endpoint `/api/docs` saat server berjalan.

4. ✅ **Task Module (Sesuai Spesifikasi Khusus)**
   - Resource `Task` lengkap dengan module, controller, dan service.
   - Endpoint: `POST /tasks`, `GET /tasks`, `GET /tasks/:id`, `PUT /tasks/:id`, `DELETE /tasks/:id`.
   - **Validasi DTO & Pipes:** `title` (required string), `description` (optional), `isCompleted` (otomatis *false* jika kosong).

## Tech Stack

| Technology | Purpose |
|---|---|
| NestJS 11 | Backend framework |
| Prisma 7 | ORM / Database toolkit |
| SQLite | Database |
| Passport + JWT | Authentication |
| bcrypt | Password hashing |
| class-validator | Request validation |
| Swagger | API documentation |

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd task-api

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Start in development mode
npm run start:dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-here"
```

## API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/auth/register` | Register a new user | ❌ |
| POST | `/auth/login` | Login and get JWT token | ❌ |

### Users
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/users` | Get all users | ✅ |
| GET | `/users/:id` | Get user by ID | ✅ |
| PUT | `/users/:id` | Update own account | ✅ |
| DELETE | `/users/:id` | Delete own account | ✅ |

### Posts
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/posts` | Create a new post | ✅ |
| GET | `/posts` | Get all posts | ✅ |
| GET | `/posts/:id` | Get post by ID | ✅ |
| PUT | `/posts/:id` | Update own post | ✅ |
| DELETE | `/posts/:id` | Delete own post | ✅ |

### Comments
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/comments` | Create a comment | ✅ |
| GET | `/comments/post/:postId` | Get comments for a post | ✅ |
| GET | `/comments/:id` | Get comment by ID | ✅ |
| PUT | `/comments/:id` | Update own comment | ✅ |
| DELETE | `/comments/:id` | Delete own comment | ✅ |

### Likes
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/likes` | Like a post | ✅ |
| DELETE | `/likes/:postId` | Unlike a post | ✅ |

### Tasks
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/tasks` | Create a new task | ❌ |
| GET | `/tasks` | Get all tasks | ❌ |
| GET | `/tasks/:id` | Get task by ID | ❌ |
| PUT | `/tasks/:id` | Update task by ID | ❌ |
| DELETE | `/tasks/:id` | Delete task by ID | ❌ |

## Swagger Documentation

Once the server is running, access the interactive API documentation at:

```
http://localhost:3000/api/docs
```

## Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── dto/              # Auth DTOs (Register, Login)
│   ├── guards/           # JWT Auth Guard
│   ├── interfaces/       # Authenticated request interface
│   └── strategies/       # JWT Passport strategy
├── comments/             # Comments module (CRUD)
│   └── dto/              # Comment DTOs
├── likes/                # Likes module (Like/Unlike)
│   └── dto/              # Like DTOs
├── posts/                # Posts module (CRUD)
│   └── dto/              # Post DTOs
├── prisma/               # Prisma database service
├── tasks/                # Tasks module (CRUD, in-memory)
│   └── dto/              # Task DTOs with validation
├── users/                # Users module (CRUD)
│   └── dto/              # User DTOs
├── app.module.ts         # Root module
└── main.ts               # Application entry point
```

## Scripts

```bash
npm run start:dev    # Development (watch mode)
npm run start        # Production
npm run build        # Build
npm run test         # Unit tests
npm run test:e2e     # End-to-end tests
npm run lint         # Lint
```

## Author

Faris — Indocoding Backend Internship Test
