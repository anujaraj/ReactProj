import { DndContext } from '@dnd-kit/core';
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
        <DndContext onDragEnd={handleDragEnd}>
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
