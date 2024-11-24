import express from "express"

const views=express.Router()

views.get('/',(req:any,res:any)=>{
    res.render('index')
});

export default views