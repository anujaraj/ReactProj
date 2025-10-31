import { DndContext,MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import {useState} from 'react';
import './App.css';
import Shelf from './components/BookShelf.js';
import Board from './components/MainBoard.js';
import './components/Mainboard.css';
import Home from './components/Home.js';




function App() {
  const [boardItems,setBoardItems]=useState([]);
  const [currentPage,setCurrentPage] = useState("home");

  const handleDragEnd=(event)=>{
    const {over,active}=event;

    if(over && over.id === "board"){
      if(!boardItems.includes(active.id)){
        setBoardItems([...boardItems,active.id])
      }
    }
  }

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 100, // 200ms hold before drag starts
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor);




  return (
    <div className="main-container">

      <nav className="navbar">
        <button
          className={`nav-btn ${currentPage === "shelf" ? "active" : ""}`}
          onClick={() => setCurrentPage("shelf")}
        >
          📚 Bookshelf
        </button>
        <button
          className={`nav-btn ${currentPage === "home" ? "active" : ""}`}
          onClick={() => setCurrentPage("home")}
        >
          ➕ Add Data
        </button>
      </nav>

      <div className='pageContainer'>
      {currentPage ==="home" && <Home/>}
      {currentPage === "shelf" && (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="App">
            <Board list={boardItems} setList={setBoardItems}/>
            <div className="sidepanel">
                <Shelf/>
            </div>
          </div>
        </DndContext>
      )} 
      </div>
      
    </div>
    
  );
}

export default App;
