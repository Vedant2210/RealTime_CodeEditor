// import express from "express"
// import {createServer} from "http"

// import { Server } from "socket.io"
// import {YSocketIO} from "y-socket.io/dist/server"

// const app=express()


// app.use(express.static("public"))
// const httpServer=createServer(app)
// const io=new Server(httpServer,{
//     cors:{
//         origin:"*",
//         methods:["GET","POST"]
//     }
// })

// const ySocketIO=new YSocketIO(io)   
// ySocketIO.initialize()
// //healthcheck routes
// app.get("/",(req,res)=>{
//     res.status(200).json({message:"Hello World",
//         success:true
//     })
// })

// app.get("/health",(req,res)=>{
//     res.status(200).json({message:"Server is healthy",
//         success:true
//     })
// })
// httpServer.listen(3000,()=>{
//     console.log("Server is running on port 3000")
// })
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { YSocketIO } from "y-socket.io/dist/server";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Fix __dirname (since you're using ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend build
app.use(express.static(path.join(__dirname, "public")));

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const ySocketIO = new YSocketIO(io);
ySocketIO.initialize();


// ✅ API routes (keep them ABOVE the wildcard)
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Server is healthy",
    success: true,
  });
});


// ❗ REMOVE this (it breaks frontend)
// app.get("/", ...)


// ✅ SPA fallback (VERY IMPORTANT)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});