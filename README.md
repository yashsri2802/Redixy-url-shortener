# URL Shortener 🔗

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/)  
[![Express](https://img.shields.io/badge/Express.js-4.x-black?logo=express)](https://expressjs.com/)  
[![EJS](https://img.shields.io/badge/EJS-Templating-yellow)](https://ejs.co/)  
[![MVC](https://img.shields.io/badge/Pattern-MVC-blue)](#)  
[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](LICENSE)  
[![Mongoose](https://img.shields.io/badge/ODM-Mongoose-orange)](https://mongoosejs.com/)

A URL Shortener web application built using Node.js, Express, EJS, MySQL, and Prisma ORM, following the MVC design pattern. It allows users to shorten long URLs into compact links, store them in a database, manage them efficiently, and redirect seamlessly.

---

## 🚀 Features
- Shorten long URLs into unique short links  
- Redirect to original URLs instantly  
- Option to add **custom short URLs**  
- If no custom alias is provided, a **random hex string** is auto-generated using Node’s **crypto** module
- Persistent storage with **MySQL** (managed via **Prisma ORM**)
- Organized structure using **MVC pattern**  
- Server-side rendering with **EJS templates**  
- Environment-based configuration using `.env` / `.env.example ` 
- Auto-reload during development with `--watch`  

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js  
- **Frontend:** EJS (Embedded JavaScript Templates)
- **Database:** MySQL (with Prisma ORM) 
- **Architecture:** MVC (Model–View–Controller)  
- **Environment Management:** dotenv  
- **Utilities:** Node `crypto` module  
- **Version Control:** Git & GitHub  

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yashsri2802/URL-Shortener.git
   cd URL_Shortener

2. **Install dependancies**
   ```bash
   npm install

3. **Install Prisma**
   ```bash
   npm install prisma --save-dev
   npm install @prisma/client

4. **Initialize Prisma
   ```bash
   npx prisma init
This will create a prisma/schema.prisma file and a .env file.

5. **Create a .env file**
   Add your environment variables (example):
   ```bash
   DATABASE_URL="mysql://user:password@localhost:3306/url_shortener"
   PORT=3000

6. **Migrate the Database**
   ```bash
   npx prisma migrate dev --name init

8. **Run the Project**
   ```bash
   npm run dev

## 🔍 Viewing Data

To open Prisma Studio and explore data in the browser:
  
      ```npx prisma studio
Then visit 👉 http://localhost:5555 in your browser.

(Run this in a separate PowerShell/terminal so your app can keep running.)

## 📷 Screenshot
![App Screenshot](./Screenshot.png)

## 🌍 Live Demo

Check out the live version of the project here:  

👉 [URL Shortener on Render](https://url-shortener-32e9.onrender.com/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open an issue or create a pull request.

## 📜 License

This project is licensed under the MIT License.
You are free to use, modify, and distribute this project.
