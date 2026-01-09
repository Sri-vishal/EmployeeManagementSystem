# 🧑‍💼 Employee Management System

## 📌 Project Overview

The **Employee Management System** is a full-stack web application built using **Vue.js 2** for the frontend and **Node.js (Express.js)** for the backend.

It allows organizations to manage employees efficiently with features such as:

- Employee creation and editing
- Soft deletion
- Search, filtering, and pagination
- Frontend and backend validations

The application follows **clean architecture principles** with proper separation of concerns and meaningful error handling.

---

## 🛠️ Tech Stack

### Frontend
- Vue.js 2
- Vue Router
- Axios
- BootstrapVue

### Backend
- Node.js
- Express.js

### Database
- MySQL

---

## ✅ Features Implemented

### 🏢 Organization Management
- Create organizations
- View organizations with pagination
- Auto-generated creation date

### 👨‍💼 Employee Management
- Add employee
- Edit employee
- Soft delete employee
- View deleted employees

### 🔍 Search, Filter & Pagination
- Pagination support
- Search by:
  - Name
  - Email
  - Position
  - Department
- Filter by:
  - Organization
  - Department
  - Status
- Multiple filters working together

### ✔️ Validations & Error Handling
- Frontend & backend validations
- Unique email enforcement
- Meaningful error messages
- Proper HTTP status codes

---

## 📋 Prerequisites

Make sure the following are installed on your system:

- Visual Studio Code
- Node.js (v16+ recommended)
- npm
- MySQL
- Vue CLI

Install Vue CLI globally:

npm install -g @vue/cli


⚙️ Setup & Run Instructions
1️⃣ Clone the Repository

git clone <your-github-repo-url>
cd employee-management-system

2️⃣ Backend Setup

cd backend
npm install

Configure Database
Update database credentials in:

backend/src/config/db.js
Example:

module.exports = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'employee_management'
});
Run Backend

npm run dev
Backend runs on:
http://localhost:5000

3️⃣ Frontend Setup

cd frontend
npm install
npm run serve
Frontend runs on:

http://localhost:8080
🔐 Environment Variables
Currently, the application uses hardcoded database configuration inside:


backend/src/config/db.js
Example:


module.exports = mysql.createConnection({
  host: 'localhost',
  user: 'your_db_user',
  password: 'your_db_password',
  database: 'ems_db'
});
ℹ️ Note: Environment variables are not used in this project.
For production deployment, it is recommended to move credentials to a .env file.

📡 API Documentation
Base URL

http://localhost:5000
🏢 Organization APIs
Method	Endpoint	Description
GET	/api/organizations	Get all organizations
POST	/api/organizations	Create a new organization

👨‍💼 Employee APIs
Method	Endpoint	Description
GET	/api/employees	Get all active employees
GET	/api/employees/deleted	Get deleted employees
POST	/api/employees	Add a new employee
PUT	/api/employees/:id	Update employee details
DELETE	/api/employees/:id	Soft delete employee
GET	/api/employees/search?query={value}	Search employees
GET	/api/employees/filter?org={org}&dept={dept}&status={status}	Filter employees

⚠️ HTTP Status Codes Used
Code	Meaning
200	Success
400	Validation error
404	Resource not found
500	Server error

🗄️ Database Schema
Organizations Table

organizations
------------
id (PK)
name
industry
description
created_at
Employees Table
scss
Copy code
employees
---------
id (PK)
full_name
email (UNIQUE)
phone
position
department
organization_id (FK)
joining_date
salary
status
is_deleted
🔗 Relationships
One Organization → Many Employees

employees.organization_id → organizations.id

Database seed data:

1- Create organizations Table :
CREATE TABLE organizations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    description TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

2- CREATE TABLE employees :
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20),
    position VARCHAR(100),
    department VARCHAR(100),
    organization_id INT NOT NULL,
    joining_date DATE NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    is_deleted TINYINT(1) NOT NULL DEFAULT 0,

    CONSTRAINT fk_employee_organization
        FOREIGN KEY (organization_id)
        REFERENCES organizations(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

Inserting Data:

INSERT INTO organizations (name, industry, description, created_at) VALUES
('TechNova Solutions', 'IT Services', 'Software development and IT consulting', NOW()),
('HealthPlus Care', 'Healthcare', 'Healthcare services and diagnostics', NOW()),
('FinEdge Corp', 'Finance', 'Financial advisory and investment services', NOW()),
('EduSpark Academy', 'Education', 'Online and classroom education platform', NOW()),
('RetailHub Pvt Ltd', 'Retail', 'Retail and e-commerce solutions', NOW()),
('LogiTrack Systems', 'Logistics', 'Supply chain and logistics management', NOW()),
('GreenEnergy Co', 'Energy', 'Renewable energy solutions', NOW()),
('BuildRight Constructions', 'Construction', 'Commercial and residential construction', NOW()),
('Foodies United', 'Food & Beverage', 'Restaurant chain and food delivery', NOW()),
('MediaWave Studios', 'Media', 'Digital media and content creation', NOW());

INSERT INTO employees
(full_name, email, phone, position, department, organization_id, joining_date, salary, status, is_deleted)
VALUES
-- Organization 1
('Amit Sharma', 'amit@org1.com', '9000000001', 'Software Engineer', 'IT', 1, '2023-01-15', 65000, 'Active', 0),
('Neha Verma', 'neha@org1.com', '9000000002', 'QA Engineer', 'QA', 1, '2023-02-10', 55000, 'Active', 0),
('Ramesh Kumar', 'ramesh@org1.com', '9000000003', 'DevOps Engineer', 'IT', 1, '2023-03-01', 78000, 'Active', 0),

-- Organization 2
('Rahul Mehta', 'rahul@org2.com', '9000000004', 'Doctor', 'Medical', 2, '2022-11-01', 90000, 'Active', 0),
('Pooja Singh', 'pooja@org2.com', '9000000005', 'Nurse', 'Medical', 2, '2023-03-05', 45000, 'Active', 0),

-- Organization 3
('Suresh Iyer', 'suresh@org3.com', '9000000006', 'Financial Analyst', 'Finance', 3, '2022-08-20', 75000, 'Active', 0),
('Kavya Nair', 'kavya@org3.com', '9000000007', 'Accountant', 'Finance', 3, '2023-04-12', 60000, 'Active', 0),
('Swati Mishra', 'swati@org3.com', '9000000008', 'Risk Analyst', 'Finance', 3, '2023-08-01', 72000, 'Active', 0),

-- Organization 4
('Arjun Patel', 'arjun@org4.com', '9000000009', 'Trainer', 'Education', 4, '2023-06-01', 50000, 'Active', 0),
('Meena Joshi', 'meena@org4.com', '9000000010', 'Content Lead', 'Education', 4, '2023-02-18', 58000, 'Active', 0),
('Priya Choudhary', 'priya@org4.com', '9000000011', 'Academic Coordinator', 'Education', 4, '2023-10-05', 52000, 'Active', 0),

-- Organization 5
('Rohit Kapoor', 'rohit@org5.com', '9000000012', 'Store Manager', 'Retail', 5, '2022-09-10', 62000, 'Active', 0),
('Anjali Gupta', 'anjali@org5.com', '9000000013', 'Sales Executive', 'Sales', 5, '2023-05-08', 42000, 'Active', 0),
('Ankit Jain', 'ankit@org5.com', '9000000014', 'Merchandiser', 'Retail', 5, '2023-09-10', 48000, 'Active', 0),

-- Organization 6
('Vikas Rao', 'vikas@org6.com', '9000000015', 'Logistics Manager', 'Operations', 6, '2021-12-01', 80000, 'Active', 0),
('Sneha Kulkarni', 'sneha@org6.com', '9000000016', 'Supply Analyst', 'Operations', 6, '2023-01-22', 60000, 'Active', 0),
('Harish Menon', 'harish@org6.com', '9000000017', 'Warehouse Lead', 'Operations', 6, '2022-05-18', 67000, 'Active', 0),

-- Organization 7
('Kiran Malhotra', 'kiran@org7.com', '9000000018', 'Energy Consultant', 'Energy', 7, '2022-06-15', 85000, 'Active', 0),
('Divya Reddy', 'divya@org7.com', '9000000019', 'Project Engineer', 'Engineering', 7, '2023-03-19', 72000, 'Active', 0),

-- Organization 8
('Manoj Das', 'manoj@org8.com', '9000000020', 'Site Engineer', 'Construction', 8, '2022-10-05', 70000, 'Active', 0),
('Rekha Banerjee', 'rekha@org8.com', '9000000021', 'Architect', 'Design', 8, '2023-04-01', 90000, 'Active', 0),

-- Organization 9
('Sanjay Khanna', 'sanjay@org9.com', '9000000022', 'Restaurant Manager', 'Operations', 9, '2022-07-12', 65000, 'Active', 0),
('Nisha Arora', 'nisha@org9.com', '9000000023', 'Chef', 'Kitchen', 9, '2023-01-30', 55000, 'Active', 0),

-- Organization 10
('Aditya Bose', 'aditya@org10.com', '9000000024', 'Video Editor', 'Media', 10, '2023-02-14', 60000, 'Active', 0),
('Pallavi Sen', 'pallavi@org10.com', '9000000025', 'Content Strategist', 'Media', 10, '2023-06-20', 68000, 'Active', 0);


Technology choosen reason:  

This project uses Vue.js 2 for the frontend and Node.js with Express for the backend to create a clean and scalable employee management system. Vue.js 2 was chosen because of its simplicity, component-based architecture, and reactive data binding, which made it easy to build reusable UI components such as employee tables, forms, and filters. Its lightweight nature and clear separation of concerns helped maintain a smooth user experience. Node.js was selected for the backend due to its non-blocking, event-driven architecture, which is well suited for building RESTful APIs and handling multiple client requests efficiently. Express further simplified routing and API structure.

Challenges:

During development, key challenges included designing a clean frontend–backend communication flow, managing state across multiple Vue components, and handling API error responses consistently. Ensuring proper data validation and implementing soft delete functionality for employees also required careful planning.

Future Improvements:

With more development time, several enhancements could be implemented, such as user authentication with role-based access control. Adding unit and integration tests, introducing CI/CD pipelines, and deploying the application using containerization tools like Docker for better scalability and maintainability.

The application implements a soft delete mechanism for employees instead of permanently removing records from the database. When an employee is deleted, the record is marked as inactive using a status flag (is_deleted), allowing the data to be preserved for auditing and recovery purposes. Deleted employees are displayed in a separate Deleted Employees view, where users can review previously removed records.

An enhancement to this functionality allows users to restore deleted employees back to the active employees list. Upon restoration, the is_deleted flag is updated, and the employee immediately reappears in the main Employees view without data loss. This approach improves data safety, reduces the risk of accidental deletions, and aligns with real-world enterprise data management practices.

## 📸 Screenshots

### Organizations
![Organizations](screenshots/Organizations.png)

### Employees
![Employees](screenshots/Employees.png)

### Add Employee
![Add Employee](screenshots/AddEmployee.png)

### Edit Employee
![Edit Employee](screenshots/EditEmployee.png)

### Deleted Employees
![Deleted Employees](screenshots/DeletedEmployees.png)