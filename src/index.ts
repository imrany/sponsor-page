import express from "express"
import cors from "cors"
import { config } from "dotenv"
import router from "./routes"
import views from "./routes/views"
import axios from "axios"
config()

const corsOptions={
    // origin:["http://localhost:3000","https://tracking-energy-usage.web.app"],
    origin:"*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PATCH", "PUT"]
}

const app=express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'));

//setting view engines
app.set('view engine','ejs');
//ejs routes
app.use(views);

// API Routes
app.use('/api', router);

const PORT = process.env.PORT||8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

setInterval(async()=>{
  await axios.get(`${process.env.BASE_URL}`)
},14* 60 * 1000)