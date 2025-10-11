import React, { useState } from 'react';
import './Shelf.css';
import { useDraggable } from "@dnd-kit/core";
import {CSS} from '@dnd-kit/utilities';

function DraggableItem({id,name}){
const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

return(
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className='sub-item'>
        {name}
    </div>
)
}


function Shelf(){

    // which item is currently being selected
    const [items,setItems]=useState(null)

    const handleClick=(itemId)=>{
        setItems(items === itemId ? null :itemId)
    }

    
    const mainItem=[
        {id: "1", name:"Book"},
        {id: "2", name:"Author"},
        {id: "3", name:"Genre"}
    ]

    const subItems={
        1: ["Alice in Wonderland","Good Girls Guide to murder"],
        2: ["Holly Jakson","J.K Rowling"],
        3: ["Horror"]
    }
    return(
        <div className="container-grid" >
            {mainItem.map((item)=>(
                <div key={item.id} className='grid-item' 
                onClick={()=>{handleClick(item.id)}}>{item.name}
                {items === item.id && 
                <div className="sub-items">
                    
                    {subItems[item.id].map((sub)=>(
                    <DraggableItem key={sub} id={sub} name={sub}>
                     {/* <div className="sub-item">
                            {sub}
                        </div> */}
                    </DraggableItem>
                       
                    ))}
                </div>
                }
                </div>
                
            ))}
        </div>
    )
}

export default Shelf;