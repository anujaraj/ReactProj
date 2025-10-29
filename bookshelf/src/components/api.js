import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
})

export const getMainItems = ()=>API.get("/list");
export const getMainItem = (id)=>API.get(`/list${id}`);
export const getSubItems = ()=>API.get("/sublist/");
export const getSubItem = (id)=>{API.get(`/sublist/${id}`)};

export const postMainItem = (data)=>API.post("/list",data);
export const postSubItem = (mainItemId,data)=>API.post(`/sublist/${mainItemId}`,data);



export const delMainItem = (id)=>API.delete(`/list/${id}`);
export const delSubItem = (id)=>API.delete(`/sublist/${id}/`);

export const putMainItem =(id,data)=>API.put(`/list${id}`, data);