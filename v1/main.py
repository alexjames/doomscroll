from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Enable CORS for the React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Card(BaseModel):
    id: int
    question: str
    answer: str

# Mock Database
cards_db = [
    Card(id=1, question="What is React?", answer="A JavaScript library for building user interfaces."),
    Card(id=2, question="What is a Component?", answer="Independent and reusable bits of code."),
    Card(id=3, question="What is State?", answer="A built-in React object that is used to contain data or information about the component."),
    Card(id=4, question="What is a Hook?", answer="Functions that let you use state and other React features without writing a class."),
    Card(id=5, question="What is JSX?", answer="A syntax extension to JavaScript."),
    Card(id=6, question="What is the Virtual DOM?", answer="A lightweight copy of the actual DOM in memory."),
    Card(id=7, question="What is Props?", answer="Inputs to a React component. They are data passed down from a parent component."),
]

@app.get("/api/cards", response_model=List[Card])
def get_cards():
    return cards_db