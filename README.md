# 📘 Online Course Registration System -- Spring Boot REST + UI

This project is a **complete Course Registration System** built using
**Spring Boot REST APIs** with a **simple HTML, CSS, and JavaScript
frontend**.

It allows managing: - Courses - Students - Enrollments (Student ↔
Course)

The project is designed to be **easy to understand for
beginners/juniors**.

------------------------------------------------------------------------

## 🛠 Tech Stack

### Backend

-   Java 17
-   Spring Boot
-   Spring Data JPA
-   H2 In-Memory Database/MySQL
-   REST APIs

### Frontend

-   HTML
-   CSS
-   JavaScript (Fetch API)

------------------------------------------------------------------------

## 📁 Project Structure

    src/main/resources/
    │
    ├── static/
    │   ├── index.html        → Home Page
    │   ├── course.html       → Course UI
    │   ├── students.html     → Student UI
    │   ├── enrollments.html  → Enrollment UI
    │   │
    │   ├── course.js
    │   ├── student.js
    │   ├── enrollment.js
    │   └── style.css
    │
    └── application.yml / application.properties

------------------------------------------------------------------------

## ▶️ How to Run the Project

1.  Extract the ZIP file\
2.  Open the project in **IntelliJ IDEA / Eclipse**
3.  Make sure **Java 17** is selected
4.  Run the main class:

```{=html}
<!-- -->
```
    CourseRegistrationRestApplication

5.  Application will start at:

```{=html}
<!-- -->
```
    http://localhost:8080

------------------------------------------------------------------------

## 🏠 UI Pages (Open in Browser)

Feature       URL
  ------------- ----------------------------------------
Home          http://localhost:8080/index.html
Courses       http://localhost:8080/course.html
Students      http://localhost:8080/students.html
Enrollments   http://localhost:8080/enrollments.html

✔ Navigation available from all pages\
✔ Home button available on top-right corner

------------------------------------------------------------------------

## 🗄 H2 Database Console

-   URL: http://localhost:8080/h2-console
-   JDBC URL: `jdbc:h2:mem:testdb`
-   Username: `sa`
-   Password: *(empty)*
- ------------------------------------------------------------------------

## 🗄 MySQL Database 

-   spring.datasource.url=jdbc:mysql://localhost:3306/coursedb
-   spring.datasource.username=root
-  spring.datasource.password=Mandal@1998
-  spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

------------------------------------------------------------------------

## 🔗 REST API Endpoints

### 🧑 Create Student

**POST** `/api/students`

``` json
{
  "name": "Kunal",
  "email": "kunal@gmail.com"
}
```

------------------------------------------------------------------------

### 📘 Create Course

**POST** `/api/courses`

``` json
{
  "title": "Java",
  "description": "Spring Boot"
}
```

------------------------------------------------------------------------

### 🔁 Enroll Student to Course

**POST**

    /api/enrollments?studentId=1&courseId=1

------------------------------------------------------------------------

### 📋 View Data

Purpose            Endpoint
  ------------------ ------------------------
View Students      GET `/api/students`
View Courses       GET `/api/courses`
View Enrollments   GET `/api/enrollments`

------------------------------------------------------------------------

## ❌ Delete Operations (With Validation)

### Delete Course

**DELETE** `/api/courses/{id}`

### Delete Student

**DELETE** `/api/students/{id}`

### ⚠ Important Rule

-   If a **course or student is already enrolled**, deletion is **not
    allowed**
-   A user-friendly popup message is shown in UI:

```{=html}
<!-- -->
```
    Cannot delete course. It is already enrolled by students.

This is implemented using: - Database foreign-key constraints - Custom
business exception - Global exception handler - UI popup alert

------------------------------------------------------------------------

## ✅ Features Implemented

✔ REST-based backend\
✔ UI using HTML, CSS, JavaScript\
✔ CRUD operations\
✔ Enrollment mapping\
✔ Navigation between pages\
✔ Delete with confirmation popup\
✔ Business-rule validation\
✔ Clean exception handling\
✔ Beginner-friendly code

------------------------------------------------------------------------

## 🧠 Learning Outcome (For Juniors)

This project helps understand: - Spring Boot REST APIs - JPA entity
relationships - Frontend--backend integration - Handling database
constraints - Writing clean and maintainable code - Real-world delete
validation logic

------------------------------------------------------------------------

## 📸 Screenshots

Check the `screenshots/` folder for: - UI pages - API responses - H2
console view

------------------------------------------------------------------------

## 👨‍💻 Author Notes

This project is intentionally kept **simple and readable** so that
freshers/juniors can: - Run it easily - Modify it confidently - Use it
for learning or interview preparation
