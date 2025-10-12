const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors")

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

const file_path = path.join(__dirname,'data.json');
const readData = ()=>{
    if (!fs.existsSync(file_path)){
        return [];
    }
    const parsedData = fs.readFileSync(file_path,"utf-8");
    return parsedData ? JSON.parse(parsedData) : [];
}

const writedata = (data)=>{
    fs.writeFileSync(file_path,JSON.stringify(data,null,2));
}

app.get('/api/list',(req,res)=>{
    const getData = readData();
    res.json(getData);
});

app.get("/api/list/:id",(req,res)=>{
    const allData = readData();
    const item = allData.find(i => i.id === req.params.id);
    if(!item){
        return res.status(404).json("item not found")

    }
    res.json(item);

});

app.post("/api/list/",(req,res)=>{
    const createdData = req.body;
    const data = readData();
    if(data.find(i=>i.id===createdData.id)){
        return res.status(409).json("data already present");
    }

    data.push(createdData);
    writedata(data);
    res.status(201).json({ message: "Item added", data });

});

app.put("/api/list/:id",(req,res)=>{
    const id=req.params.id;
    const updatedData = req.body;
    const data = readData();
    const index = data.findIndex(i => i.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Not found" });
    }

    data[index] = { ...data[index], ...updatedData };
    writedata(data);
    res.json({ message: "Item updated", data });

});

app.delete("/api/list/:id",(req,res)=>{
    const data=readData();
    const id=req.params.id;
    const index = data.findIndex(i => i.id === id);
    
    if (index === -1) {
        return res.status(404).json({ message: "Not found" });
    }
    const updatedData = data.filter(i => i.id !== id);
    writedata(updatedData);
    res.json({message:"Item Deleted"},updatedData)


})


app.listen(PORT,()=>{
    console.log("listening to port 3000");
});