import React from "react";
import './Mainboard.css'
import { useDroppable } from "@dnd-kit/core";



function Board({list=[],setList}){

    const handleRemove=(itemRem)=>{
        setList(list.filter(item=>item!==itemRem))
    }

    const {setNodeRef,isOver} = useDroppable({
        id: "board"
    })

    
    return(
        <div ref={setNodeRef} className="board" >
            {list.length==0 && <h4>No item</h4>}
            {list && list.map((item,index)=>(
                <div key={index} className="addedList">
                    {item}
                    <button className="button" onClick={()=>{handleRemove(item)}}>Remove</button>
                </div>
            ))}
         
        </div>
    )
}

export default Board;