# 📚 Bookstore REST API

A secure and simple RESTful API for managing a bookstore using **Node.js**, **Express**, **file-based storage**, and **JWT authentication**.

---

## 🚀 Features

- 🔐 User Registration and Login using **JWT**
- 📘 Book Management (CRUD)
- ✅ Protected routes with role-based access (only book owners can edit/delete)
- 💾 File-based data persistence using `users.json` and `books.json`
- 🔍 Filter books by genre
- 📄 Pagination support
- 🧪 Fully testable with Jest + Supertest

---

## 🏗️ Project Structure

```

bookstore-api/
├── controllers/        # Route handlers
├── data/               # JSON files (users & books)
├── middlewares/        # Logger, JWT auth
├── models/             # File operations
├── routes/             # Express routes
├── tests/              # Jest test cases
├── .env                # Environment variables
├── server.js           # Entry point
└── README.md

````

---

## ⚙️ Setup Instructions

1. **Clone the repo**
```bash
git clone https://github.com/your-username/bookstore-api.git
cd bookstore-api
````

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment**
   Create a `.env` file in the root:

```env
PORT=3000
JWT_SECRET=supersecret123
```

4. **Start the server**

```bash
npm run dev
```

Now visit:
📍 `http://localhost:3000/api`

---

## 🔑 Authentication Flow

1. **Register**

```http
POST /api/register
Body: {
  "email": "user@example.com",
  "password": "123456"
}
```

2. **Login**

```http
POST /api/login
Body: {
  "email": "user@example.com",
  "password": "123456"
}
```

📥 Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

3. **Use Token**
   Include the token in `Authorization` header:

```
Authorization: Bearer <your-token>
```

---

## 📘 Book API Endpoints (Protected)

| Method | Endpoint                    | Description                |
| ------ | --------------------------- | -------------------------- |
| GET    | `/api/books`                | Get all books              |
| GET    | `/api/books/:id`            | Get book by ID             |
| POST   | `/api/books`                | Create a new book          |
| PUT    | `/api/books/:id`            | Update a book (owner only) |
| DELETE | `/api/books/:id`            | Delete a book (owner only) |
| GET    | `/api/books?genre=fiction`  | Filter by genre            |
| GET    | `/api/books?page=1&limit=5` | Paginated results          |

---

## 🧪 Running Tests

This project includes **Jest + Supertest** tests.

### 👉 Important before testing:

Since the app uses file-based JSON storage:

* ✅ Make sure to **clear `data/users.json` and `data/books.json`** manually before running tests.
* Test files automatically register a user and create data in the JSON files.

### Run all tests:

```bash
npm test
```

---

## 📂 Data Files

Stored inside the `/data` folder:

* `users.json`: Registered users
* `books.json`: All book entries

These files are **updated on each request**, so always verify their content during manual or test runs.

---

## 📝 Notes

* ⚠️ This app uses simple file-based storage — not suited for production use.
* Can be easily upgraded to MongoDB or PostgreSQL.

---

## ✅ Example Postman Usage

1. Login to get token
2. Use token in Authorization header
3. Send `POST /api/books` with:

```json
{
  "title": "Node.js Guide",
  "author": "John Doe",
  "genre": "Tech",
  "publishedYear": 2024
}
```

---

## 📤 Deployment Ready

You can easily deploy to:

* [Render](https://render.com/)
* [Railway](https://railway.app/)
* [Vercel (Backend)](https://vercel.com/) (via `api/` routing)

---

## 📄 License

This project is built for assessment/demo purposes only.
Feel free to fork, extend, and make it yours!

---

```

---

✅ Let me know if you want this converted to a downloadable `README.md` file or if you're ready to deploy, export a Postman collection, or write Swagger docs!
```
