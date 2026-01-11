# Doomscroll Flash Cards

A TikTok-style flash card quiz app with a React frontend and FastAPI backend.

## Prerequisites

- **Python 3.7+**
- **Node.js** and **npm**

## Getting Started

You will need to run the backend and frontend in separate terminal windows.

### 1. Backend Setup

1. Navigate to the directory containing `main.py` and `requirements.txt`.
2. (Optional) Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # Windows
   .\venv\Scripts\activate
   # Mac/Linux
   source venv/bin/activate
   ```
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend API will be available at `http://localhost:8000`.

### 2. Frontend Setup

1. Navigate to the React project directory (containing `package.json`).
2. Install JavaScript dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The application will open in your browser at `http://localhost:3000`.