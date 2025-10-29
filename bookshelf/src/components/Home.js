import React, { useState } from "react";
import { getMainItems, postMainItem,postSubItem } from "./api";
import './home.css'
function Home(){
    
    const [mainItems,setMainItems]=useState("");
    const [subItems,setSubItems] = useState("");

    const handleSubmit = async(e)=>{

        e.preventDefault();

        if(!mainItems.trim()){
            alert("Please enter a main item name.");
            return;
        }

        if(!subItems.trim()){
            alert("Please enter atleast one subitem under the main item name.");
            return;
        }

        try{   
            
            let newRes;
            const allMainItems = await getMainItems(); // GET /api/list
            const existingItem = allMainItems.data.find(item => item.name === mainItems);
            if(existingItem){
                newRes = existingItem;
            }
            else{
                const mainRes = await postMainItem({ name: mainItems });
                newRes = mainRes.data.newItem;
            }
            

            if(subItems.trim()){
                const subArray = subItems.split(",").map((item)=>item.trim());
                for(const sub of subArray){
                    await postSubItem(newRes.id,{name:sub})
                }
            }

            alert("✅ Data added successfully!");
            setMainItems("");
            setSubItems("");

        }catch(err){
            console.error(err);
            alert("❌ Failed to add data. Check console for details.");
        }
    }

    return(
        <div className="home-container">
            <div className ="card">
                <form onSubmit={handleSubmit}>
                    <div className="inputG">
                        <label>MainItems</label>
                        <input
                        type="text"
                        placeholder="e.g., Book"
                        value={mainItems}
                        onChange={(e) => setMainItems(e.target.value)}
                        ></input>

                    </div>
                    <div className="inputG">
                        <label>SubItems</label>
                        <input
                        type="text"
                        placeholder="Comma separated, e.g., Alice in Wonderland, Good Girls Guide"
                        value={subItems}
                        onChange={(e) => setSubItems(e.target.value)}
                        ></input>

                    </div>
                    <button className="submit-btn">Submit</button>
                    
                </form>
            </div>
            
        </div>
    )
}

export default Home;