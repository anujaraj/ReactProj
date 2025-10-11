import { DndContext } from '@dnd-kit/core';
import {useState} from 'react';
import './App.css';
import Shelf from './components/BookShelf.js';
import Board from './components/MainBoard.js';
import './components/Mainboard.css';



function App() {
  const [boardItems,setBoardItems]=useState([]);

  const handleDragEnd=(event)=>{
    const {over,active}=event;

    if(over && over.id === "board"){
      if(!boardItems.includes(active.id)){
        setBoardItems([...boardItems,active.id])
      }
    }

  }
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="App">
        <Board list={boardItems} setList={setBoardItems}/>
        <div className="sidepanel">
            <Shelf/>
        </div>
      </div>
    </DndContext>
    
  );
}

export default App;
