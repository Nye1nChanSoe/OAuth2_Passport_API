## Getting Started
# Option 1: Backend PHP (Laravel) Server
You can run the project by starting the backend PHP server as a REST API service using the following command: `php artisan serve`

This command will initiate the server, allowing you to test the API endpoints using Postman or other API testing tools.

# Option 2: Combined PHP Backend and React Frontend
Alternatively, you can choose to run both the PHP backend server and the React frontend server. In this configuration, the React frontend will consume the API provided by the PHP backend and appropriately render the views.

 `php artisan serve`
 `cd react`
 `npm run dev`

# Reproduction Steps
1. **Prerequisites:** Ensure you have **PHP**, **Composer**, **Node.js**, and **MySQL** installed on your system.
2. **Clone Repository:**
3. **Install Backend Dependencies:** ```composer install```.
4. **Generate Application Key:** ```php artisan key:generate```.
5. **Navigate to React Directory:** ```cd react```.
6. **Install Frontend Dependencies:** ```npm install```.
7. **Configure Environment for Vite:**
Copy **.env.example** to **.env** in the react directory.
8. **Update Database Credentials:**
Rename and update **.env** with your database credentials at the Laravel root directory.
9. **Migrate Database:** ```php artisan migrate```.
10. **Generate OAuth Keys:** ```php artisan passport:install```
11. **Add OAuth Keys to .env:**
 Add the generated keys from the storage directory to **.env** as **PASSPORT_PRIVATE_KEY** and **PASSPORT_PUBLIC_KEY**.
12. **Build Frontend Assets:** ```npm run build```
13. **Preview Compiled Assets:** ```npm run preview```
14. **Start Laravel Server:** ```php artisan serve```

## Technologies Used

This project is built using the following technologies and frameworks:

- Backend: Laravel, Passport(Auth)
- Frontend: React (TS)
- Database: MySQL