<h1 align="center">
    university MANAGEMENT SYSTEM
</h1>

<h3 align="center">
Streamline university management, class organization, and add students and faculty.<br>
Seamlessly track attendance, assess performance, and provide feedback. <br>
Access records, view marks, and communicate effortlessly.
</h3>

<br>



# About

The university Management System is a web-based application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It aims to streamline university management, class organization, and facilitate communication between students, lecturers, and administrators.

## Features

- **User Roles:** The system supports three user roles: Admin, lecturer, and Student. Each role has specific functionalities and access levels.

- **Admin Dashboard:** Administrators can add new students and lecturers, create classes and subjects, manage user accounts, and oversee system settings.

- **Attendance Tracking:** lecturers can easily take attendance for their classes, mark students as present or absent, and generate attendance reports.

- **Performance Assessment:** lecturers can assess students' performance by providing marks and feedback. Students can view their marks and track their progress over time.

- **Data Visualization:** Students can visualize their performance data through interactive charts and tables, helping them understand their academic performance at a glance.

- **Communication:** Users can communicate effortlessly through the system. lecturers can send messages to students and vice versa, promoting effective communication and collaboration.

## Technologies Used

- Frontend: React.js, Material UI, Redux
- Backend: Node.js, Express.js
- Database: MongoDB

<br>

# Installation

Open 2 terminals in separate windows/tabs.

Terminal 1: Setting Up Backend 
```sh
cd backend
npm install
npm start
```

Create a file called .env in the backend folder.
Inside it write this :

MONGO_URL = mongodb://127.0.0.1/university

Instead of this link write your database link.

Terminal 2: Setting Up Frontend
```sh
cd frontend
npm install
npm start
```
Now, navigate to `localhost:3000` in your browser. 
The Backend API will be running at `localhost:5000`.

const REACT_APP_BASE_URL = "http://localhost:5000"

Now replace all process.env.REACT_APP_BASE_URL with REACT_APP_BASE_URL.


