## 🚀 E-Commerce API  
A fully functional E-Commerce REST API built with Node.js, Express.js, MongoDB, and JWT authentication. This API powers an online store, handling user authentication, product management, reviews, and image uploads.

### 📌 Features
- 🔐 User Authentication & Authorization (JWT-based)  
- 🛒 Product Management (CRUD operations, filtering, pagination)  
- 📝 Review System (Users can add, update, and delete reviews)  
- 🖼️ Image Uploads (Cloudinary integration for product images)  
- 🔎 Search & Sorting (Dynamic query filtering)  
- 📦 Order Management (Cart & checkout system - if applicable)  
- 📊 Admin Role (Manage products, users, and orders)

---

### 🛠️ Tech Stack
✅ Backend:Node.js, Express.js  
✅ Database: MongoDB, Mongoose  
✅ Authentication:JSON Web Token (JWT)  
✅ File Uploads Multer + Cloudinary  
✅ API Testing: Postman  

---

### 📂 Project Structure
```
📦 E-Commerce-API
 ┣ 📂 controllers       # Business logic for products, users, auth, reviews
 ┣ 📂 models            # Mongoose Schemas
 ┣ 📂 routes            # API endpoints
 ┣ 📂 middleware        # Authentication & error handling
 ┣ 📂 utils             # Helper functions
 ┣ 📜 server.js         # Entry point of the application
 ┣ 📜 .env.example      # Sample environment variables
 ┗ 📜 README.md
```

---

### 🚀 How to Run Locally
#### 1️⃣ Clone the Repository
```sh
git clone https://github.com/AbdirashidAbdullahiAhmed/E-Commerce-API.git
cd E-Commerce-API
```
#### 2️⃣ Install Dependencies
```sh
npm install
```
#### 3️⃣ Set Up Environment Variables
Rename `.env.example` to `.env` and add your credentials:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```
#### 4️⃣ Start the Server
```sh
npm start  # Runs the server on PORT 5000
```

---

### 📌 API Endpoints
#### 🔐 Authentication
- `POST /api/v1/auth/register` - Register a new user  
- `POST /api/v1/auth/login` - Login user & get token  

#### 🛒 Products
- `GET /api/v1/products` - Get all products  
- `POST /api/v1/products` - Add new product (Admin only)  
- `PATCH /api/v1/products/:id` - Update a product (Admin only)  
- `DELETE /api/v1/products/:id` - Delete a product (Admin only)  

#### 📝 Reviews
- `POST /api/v1/reviews` - Create a review  
- `PATCH /api/v1/reviews/:id` - Update a review  
- `DELETE /api/v1/reviews/:id` - Delete a review  

#### 🖼️ Image Uploads
- `POST /api/v1/products/uploadImage` - Upload product images to Cloudinary  

---

### 📌 Testing
- API was tested using Postman to ensure smooth functionality.  
- Includes validation for requests and secure role-based access.

---

### 📜 License
This project is MIT Licensed – feel free to use and contribute!  

---

### 📌 Contribute
👨‍💻 Want to contribute?
Fork the repo, create a new branch, and submit a pull request. Feedback is always welcome! 🚀  

---

### 📢 Connect With Me!
📌 LinkedIn: [Your Profile Link]  
📌 GitHub:[Your GitHub Profile]  
📌 Instagram:[Your Profile Link]  

---

### 🌟 If you like this project, don’t forget to give it a star ⭐! 
