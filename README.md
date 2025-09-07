Patient Contact Manager

A full-stack web application to manage patient contact records with complete CRUD (Create, Read, Update, Delete) functionality.
This project was built from scratch as part of a technical assessment to demonstrate skills in React.js, FastAPI (Python), and TailwindCSS.

🚀 Features

Add New Patients – Capture patient details including phone number, email, and address.

Update Patient Information – Edit patient records seamlessly.

Delete Patients – Remove outdated or duplicate records.

View All Patients – Display patient data in a clean and responsive table view.

Responsive Design – Mobile-friendly UI built with TailwindCSS.

FastAPI Backend – RESTful API for handling all database operations.

🛠️ Tech Stack
Frontend:

React.js

Tailwind CSS

Backend:

Python (FastAPI)

SQLite (Default database)

📂 Project Structure
patient-contact-manager/
│
├── backend/                # FastAPI backend
│   ├── main.py             # Entry point for API
│   ├── models.py           # Database models
│   ├── crud.py             # CRUD operations
│   └── database.py         # Database connection
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── App.jsx         # Main React app
│   │   ├── api.js          # API integration
│   │   └── components/     
│   │       ├── PatientForm.jsx
│   │       └── PatientTable.jsx
│   └── index.css           # Global styles
│
└── README.md

⚙️ Installation and Setup
1️⃣ Clone the repository
git clone https://github.com/<your-username>/patient-contact-manager.git
cd patient-contact-manager

2️⃣ Backend Setup

Navigate to backend folder:

cd backend


Create a virtual environment:

python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows


Install dependencies:

pip install fastapi uvicorn sqlalchemy


Run the backend server:

uvicorn main:app --reload


Backend will run on http://127.0.0.1:8000

3️⃣ Frontend Setup

Navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Run the frontend:

npm run dev


Frontend will run on http://localhost:5173

🖥️ Usage

Open http://localhost:5173
 in your browser.

Add patient details using the form on the left.

View all added patients in the table on the right.

Use Edit and Delete buttons to modify or remove records.

🤝 Collaboration

This project is open for collaboration. To contribute:

Fork the repository.

Create a new branch:

git checkout -b feature-name


Make your changes and commit:

git commit -m "Added new feature"


Push to your branch:

git push origin feature-name


Open a Pull Request.

📧 Contact

Developer: Anchal 

GitHub: https://github.com/aanchalsingh26/

Email: anchalkumari6490@gmail.com.com
