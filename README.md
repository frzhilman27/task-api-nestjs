# 🚀 Task Management API

RESTful API sederhana untuk manajemen task yang dibangun menggunakan **NestJS** dan **TypeScript**.

Project ini dibuat sebagai bagian dari technical test Backend Developer untuk mendemonstrasikan pemahaman tentang REST API, arsitektur modular, validasi request, dan dokumentasi API menggunakan Swagger.

---

## 📌 Tech Stack

- Node.js
- NestJS
- TypeScript
- class-validator
- Swagger (OpenAPI)

---

## 🎯 Features

✔ Create Task  
✔ Get All Tasks  
✔ Get Task by ID  
✔ Update Task  
✔ Delete Task  
✔ Request Body Validation  
✔ Swagger API Documentation  

---

## 📂 Project Structure

src/
├── tasks/
│ ├── dto/
│ │ ├── create-task.dto.ts
│ │ └── update-task.dto.ts
│ ├── tasks.controller.ts
│ ├── tasks.service.ts
│ └── tasks.module.ts
├── app.module.ts
└── main.ts


### Explanation

- **Controller** → Mengatur request & response
- **Service** → Menangani business logic
- **DTO** → Validasi dan struktur data request
- **Module** → Mengelompokkan fitur

---

## ⚙️ Installation

Clone repository:

```bash
git clone https://github.com/frzhilman27/task-api-nestjs.git
