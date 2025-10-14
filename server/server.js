const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { create } = require("domain");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

const subItem = path.join(__dirname,'subItem.json');
const mainList = path.join(__dirname,'mainItem.json');

const readData = (file_path)=>{
    if (!fs.existsSync(file_path)){
        return [];
    }
    const parsedData = fs.readFileSync(file_path,"utf-8");
    return parsedData ? JSON.parse(parsedData) : [];
}

const writedata = (file_path,data)=>{
    fs.writeFileSync(file_path,JSON.stringify(data,null,2));
}

//CRUD for Main Item list

app.get('/api/list',(req,res)=>{
    const getData = readData(mainList);
    res.json(getData);
});

app.get("/api/list/:id",(req,res)=>{
    const allData = readData(mainList);
    const item = allData.find(i => i.id === req.params.id);
    if(!item){
        return res.status(404).json("item not found")

    }
    res.json(item);

});

app.post("/api/list/",(req,res)=>{
    const createdData = req.body;
    const data = readData(mainList);
    if(data.find(i=>i.id===createdData.id)){
        return res.status(409).json("data already present");
    }

    data.push(createdData);
    writedata(mainList,data);
    res.status(201).json({ message: "Item added", data });

});

app.put("/api/list/:id",(req,res)=>{
    const id=req.params.id;
    const updatedData = req.body;
    const data = readData(mainList);
    const index = data.findIndex(i => i.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Not found" });
    }

    data[index] = { ...data[index], ...updatedData };
    writedata(mainList,data);
    res.json({ message: "Item updated", data });

});

app.delete("/api/list/:id",(req,res)=>{
    const data=readData(mainList);
    const id=req.params.id;
    const index = data.findIndex(i => i.id === id);
    
    if (index === -1) {
        return res.status(404).json({ message: "Not found" });
    }
    const updatedData = data.filter(i => i.id !== id);
    writedata(mainList,updatedData);
    res.json({message:"Item Deleted"},updatedData)


})

//CRUD for subitems

app.get('/api/sublist',(req,res)=>{
    const getData = readData(subItem);
    res.json(getData);
});

app.get("/api/sublist/:id",(req,res)=>{
    const allData = readData(subItem);
    const subId = req.params.id;    
    const item =  allData[subId];
    res.json(item);

});

app.post("/api/sublist/:id",(req,res)=>{
    const id= req.params.id;
    const createdData = req.body.name;
    const data = readData(subItem);
    if(!data[id]) data[id] = [];

    data[id].push(createdData);
    writedata(subItem,data);
    res.status(201).json({ message: "Item added", data });

});

app.put("/api/sublist/:id",(req,res)=>{
    const id=req.params.id;
    const updatedData = req.body;
    const data = readData(subItem);
    const index = data.findIndex(i => i.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Not found" });
    }

    data[index] = { ...data[index], ...updatedData };
    writedata(subItem,data);
    res.json({ message: "Item updated", data });

});

app.delete("/api/sublist/:id/:subName",(req,res)=>{
    const data=readData(subItem);
    const {id,subName}=req.params;

    console.log("ID:", id, "Name:", subName);
    console.log("Before delete:", data[id]);

    if (!data[id]) return res.status(404).json({ error: "Not found" });
    data[id]= data[id].filter(item => item !== subName);

    // Save changes
    writedata(subItem, data);
    console.log("After delete:", data[id]);
    res.json({ message: "Item Deleted", subItems: data[id] });


})


app.listen(PORT,()=>{
    console.log("listening to port 3000");
});