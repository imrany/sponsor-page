import express from "express"
import geo from "geoip-lite"
import ipaddr from "ipaddr.js"

const views=express.Router()

views.get('/',(req:any,res:any)=>{
    const clientIp = req.ip;
    const ipv4Address = ipaddr.process(clientIp).toString();
    const location = geo.lookup(ipv4Address);
    console.log(clientIp,location,ipv4Address)
    res.render('index')
});

export default views