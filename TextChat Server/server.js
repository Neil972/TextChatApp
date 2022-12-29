const express= require('express')
const app = express()
const server=require('http').createServer(app)
const cors=require('cors')

const socketIO=require('socket.io')
const io =  socketIO(server,{
        cors:{
        origin:'*',
        methods:['GET','POST']
             }
            })
app.use(cors())

const PORT=5000

app.get('/',(req,res)=>{
    res.send(`server in running on ${PORT}`)
})

server.listen(PORT,()=>{
    console.log(`listening to ${PORT}`)
})

io.on('connection',(socket)=>{
 socket.emit('me',socket.id)
 console.log(`socketID`,socket.id)

 socket.on('sent',(sentMessage,roomID)=>{
 console.log(`sentMessage`,sentMessage)
 console.log('roomID',roomID)
 if(roomID===''){
 socket.broadcast.emit('recieved',sentMessage)
 }
 else{
    socket.to(roomID).emit('recieved',sentMessage)
  }
 })

 socket.on('join-room',(roomID)=>{   
 socket.join(roomID)
 console.log(`connected to ${roomID}`)
 })
})
