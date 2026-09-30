# Data-Driven Predictive Control of Linear Processes

A full-stack web application for water quality prediction using Machine Learning.

## Technologies Used

- React.js
- Java
- Spring Boot
- Python
- Random Forest
- MySQL

## Features

- User Login
- Water Quality Prediction
- Machine Learning Prediction
- Prediction History
- Analytics
- Admin Panel

## Machine Learning

The project uses **Random Forest Regression** to predict water quality based on selected water quality parameters.

## Project Flow

```text
React.js
   ↓
Spring Boot
   ↓
Python ML API
   ↓
Random Forest Model
   ↓
Prediction
   ↓
MySQL
```
How to Run

Backend

Run the Spring Boot application from IntelliJ IDEA.
```
http://localhost:8080
```
Python ML API

Inside the ml-model folder:
```
python predict_api.py
```
Frontend

Inside the frontend folder:
```
npm install
npm run dev
```
Then open the URL shown in the terminal.

Database
```
MySQL database:
```
predictive_control

Author

Akshay M
