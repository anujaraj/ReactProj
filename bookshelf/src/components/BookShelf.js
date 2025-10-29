import React, { useEffect, useState } from 'react';
import './Shelf.css';
import { useDraggable } from "@dnd-kit/core";
import {CSS} from '@dnd-kit/utilities';

import { getMainItems } from './api';
import { getSubItems } from './api';
import { delMainItem } from './api';
import { delSubItem } from './api';

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
    const [selectedId, setSelectedId] = useState(null);
    const [mainItem,setMainItems] = useState([]);

    useEffect(()=>{
        const fetchMainItems=async()=>{
            try{
                const res = await getMainItems();
                setMainItems(res.data);
            }
            catch(error){
                console.error("Error fetching main items:", error);
            }
        }
        fetchMainItems();
    },[])

    const [subItems,setSubItems] = useState({});

    useEffect(()=>{
        const fetchSubItems=async()=>{
            
            try{
                const res = await getSubItems();
                console.log("Fetched subItems:", subItems);
                setSubItems(res.data);
            }
            catch(error){
                console.log("Error finding subitem",error);
            }
        }
        fetchSubItems();
    },[])

    const handleClick=(itemId)=>{
        setSelectedId(selectedId === itemId ? null :itemId)
    }

    const handleDeleteMain=async(mainId)=>{
        if (window.confirm("Delete this main item and its subitems?")) {
        try {
            await delMainItem(mainId);
            setMainItems(mainItem.filter(item=>item.id!==mainId));
            const updatedSubItems = {...subItems};
            delete updatedSubItems[mainId];
            setSubItems(updatedSubItems);
            }catch (err) {
            console.error(err);
            }
        }
    };


    return(
        <div className="container-grid" >
            {mainItem.map((item)=>(
                <div key={item.id} className='grid-item' 
                onClick={()=>{handleClick(item.id)}}>{item.name}

                <button
                className="delete-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteMain(item.id);
                }}
                >
                ❌
                </button>

                {selectedId === item.id && 
                <div className="sub-items">
                    
                    {/* //?. to ensure that item.id is converted to number  */}
                    {subItems?.[item.id]?.map((sub,i)=>(
                    <DraggableItem key={i} id={`${item.id}-${sub}`} name={sub}>
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

