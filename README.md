# Population Model Calculator
A web-based interactive tool for performing key calculations related to population models.  
Developed as a CS495 Software Engineering Capstone Project.

**Client:** Dr. Suzanne Keilson, Associate Professor, Loyola University Maryland  
**Developers:** Oselunoesn Ehi‑Douglas & Justin Dorsey

---

## 📘 Project Overview

The Population Model Calculator is designed to help students, instructors, and researchers compute and visualize population dynamics. The tool supports exponential and logistic growth models, differential equations, carrying capacity, predator–prey systems, and more.

The platform emphasizes accessibility, ease of use, and interactive learning through real-time graphing and model comparison.

---

## ✨ Key Features

### 🔹 Structured Data Input
- Clean, guided forms for entering model parameters  
- Built-in validation and tooltips  
- Error prevention to reduce user mistakes  

### 🔹 Automatic Graph Generation
- High-quality charts using modern visualization libraries  
- Zooming, panning, and axis switching (linear/log)  
- Real-time updates as parameters change  

### 🔹 Interactive Controls
- Sliders for parameter adjustment  
- Animation playback for time-dependent models

### 🔹 Multiple Model Types
- Exponential growth  
- Logistic growth  
- Differential equation models  
- Carrying capacity  
- Lotka–Volterra predator–prey  
- Additional population models as needed  

### 🔹 Instructor Mode
- Create example models  
- Share model links with students  
- Embed graphs in course materials  

### 🔹 User Accounts & Persistence
- Create accounts to save models  
- View calculation history  
- Re-run or re-graph previous models  
- Store graph images or parameters  

### 🔹 Dataset Upload & Curve Fitting
- Upload CSV datasets  
- Automatic exponential/logistic curve fitting  
- Error metrics for model accuracy

---

## 🛠️ Setup Guide

To setup yours, you need to clone the repository first if you don't have it on your laptop already. If you already do just git pull. 
The next thing is to install npm and dev dependencies: 

This is because we have a gitignore so not everything was git added to our repository 

cd into the backend folder first 
First: npm init -y 
2nd: npm install math.js 
3rd: npm install --save-dev jest [I think this can be done outside, but do it inside jaut to be safe ] 

In your package.json file 
Check the part on scripts and change it to 
"scripts": {
  "test": "jest --coverage"
}

### 🔹NEXT FRONTEND
cd to the frontend 
First: npx create-react-app. [Make sure to add the .]
Back to the backend: 
NODEMON : 
Do npm install -g nodemon
This is so that when there is a change to the backend, it updates automatically 
Check the scripts part of the package.json file in the backend 
Add  
  "start": "node index.js",
  "dev": "nodemon index.js"
If it is not there for the gitattributes file, run 
git add --renormalize.
git commit -m "Normalize line endings."
This ensures that git applies line ending rules to our files in case we are running on a different OS
The you can git push -u 

### 🔹To run the frontend 
npm start 

### 🔹To run the backend 
node index.js (this is because the index file in the backend is where our port is ) 
npm run dev (nodemon) 

### 🔹To run our test
npm test [this will fail for now since we don't have test ]
