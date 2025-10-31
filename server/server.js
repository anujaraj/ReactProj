require("dotenv").config();
const sequelize = require("./db");
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { create } = require("domain");
const MainItems = require('./models/MainItems');
const SubItems = require('./models/SubItems');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;


//CRUD for Main Item list

app.get('/api/debug', async (req, res) => {
  const data = await MainItems.findAll({
    include: SubItems
  });
  res.json(data);
});


app.get('/api/list',async (req,res)=>{
    try{
    const getData = await MainItems.findAll();
    res.json(getData)
    } catch(err){
        res.status(500).json({error:err.message})
    }
});

app.get("/api/list/:id",async (req,res)=>{
    try{
    const item = await MainItems.findByPk(req.params.id);
    if(!item){
        return res.status(404).json("item not found")

    }
    res.json(item);
}catch(err){
    res.status(500).json({error:err.message})
}

});


app.post("/api/list", async(req,res)=>{
    try{
        const {name} = req.body;
         if (!name) {
        return res.status(400).json({ error: "Name is required" });
        }
        const data = await MainItems.findOne({where :{name}});
        if(data){
            return res.status(409).json({ error: "Item already present" });
        }
        
        const newItem = await MainItems.create({name});
        res.status(201).json({ message: "Item added", newItem });

    }catch(err){
        res.status(500).json({error:err.message})
    }
})

app.put("/api/list/:id",async (req,res)=>{
    try{
    const id=req.params.id;
    const updatedData = req.body;
    const data = await MainItems.findByPk(id);
   
    if (!data) {
        return res.status(404).json({ message: "Not found" });
    }
    await data.update(updatedData);
    res.json({ message: "Item updated", data });
    } catch(error){
        console.error("Error updating item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.delete("/api/list/:id",async (req,res)=>{
    try{
    const id=req.params.id;
    const delData = await MainItems.destroy({
        where:{id:id}
    });

    if (delData==0) {
        return res.status(404).json({ message: "Not found" });
    }

    res.json({message:"Item Deleted"},delData)

    }catch(err){
        res.status(500).json({error:err.message}); 
    }
})

//CRUD for subitems

app.get('/api/sublist',async (req,res)=>{
    try{
    const getData = await SubItems.findAll();
    const groupedData = getData.reduce((accumulator,item)=>{
        if(!accumulator[item.mainItemId]) {
            accumulator[item.mainItemId]=[];
        }
        accumulator[item.mainItemId].push(item.name);
        return accumulator;
    },
    {})
    res.json(groupedData);
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

app.get("/api/sublist/:id",async (req,res)=>{
    try{
    const subId = req.params.id;    
    const item = await SubItems.findByPk(subId);
    res.json(item);
    }catch(err){
        res.status(500).json({error:err.message});
    }

});

app.post("/api/sublist/:mainItemId", async (req, res) => {
  try {
    const { mainItemId } = req.params;
    const { name } = req.body;

    console.log("📩 Incoming subitem request:", { mainItemId, name });

    if (!name) {
      return res.status(400).json({ error: "Subitem name required" });
    }

    const mainItemIdInt = parseInt(mainItemId, 10);
    if (isNaN(mainItemIdInt)) {
      return res.status(400).json({ error: "Invalid mainItemId" });
    }

    // 🔍 Check parent exists (to avoid FK error)
    const mainItem = await MainItems.findByPk(mainItemIdInt);
    if (!mainItem) {
      console.log("⚠️ No main item found for ID:", mainItemIdInt);
      return res.status(404).json({ error: "Main item not found" });
    }

    // 🔍 Check for duplicates
    const existing = await SubItems.findOne({
      where: { name, mainItemId: mainItemIdInt },
    });

    if (existing) {
      console.log("⚠️ Subitem already exists:", existing.toJSON());
      return res.status(409).json({ error: "Subitem already present" });
    }

    console.log("🛠 Creating subitem with data:", { name, mainItemId: mainItemIdInt });

    const newItem = await SubItems.create({
      name,
      mainItemId: mainItemIdInt,
    });

    console.log("✅ Successfully created subitem:", newItem.toJSON());
    res.status(201).json({ message: "Subitem added", newItem });

  } catch (err) {
    console.error("❌ Sequelize/Server Error while creating subitem:");
    console.error(err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});


app.delete("/api/sublist/:mainId/:subName", async (req, res) => {
  try {
    const { mainId, subName } = req.params;

    const deleted = await SubItems.destroy({
      where: { mainItemId: mainId, name: subName },
    });

    if (!deleted) {
      return res.status(404).json({ error: "Subitem not found" });
    }

    res.json({ message: "Subitem deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.listen(PORT,()=>{
    console.log("listening to port 5000");
});