const server = require("./server")

const port = process.env.PORT || 5000 ;

server.use('/',(req,res) =>{
    res.status(200).send(`<h1>Welcome!!! I Work</h1>`)
})

server.listen(port,() =>{
    console.log(`\n 🚦🚦🚦 backend 🚦🚦🚦 \n >>> ${port} <<<`)
})