import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api",
})

export const getMainItems = ()=>API.get("/list");
export const getMainItem = (id)=>API.get(`/list${id}`);
export const getSubItems = ()=>API.get("/sublist/");
export const getSubItem = (id)=>{API.get(`/sublist/${id}`)};

export const postMainItem = (data)=>{API.post("/list/",data)};
export const postSubItem = (id,data)=>{API.post(`/sublist/${id}`,data)};

export const delMainItem = ()=>{API.delete("/list/:id")};
export const delSubItem = (id,subName)=>{API.delete(`/sublist/${id}/${encodeURIComponent(subName)}`)};

export const putMainItem =(id,data)=>{API.put(`/list${id}`, data)};