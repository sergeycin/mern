const express = require('express')
const config = require('config')
const mongose = require('mongoose')
const app = express()

const PORT = config.get('port') || 5000

 app.use('/api/auth', require('./routes/auth.routes'))

async function start(){
    try{
       await mongose.connect(config.get('mongoUrl'),{
        useNewUrlParser: true, useUnifiedTopology: true
       })
       app.listen(5000, () => console.log(`Started ${PORT}`))
    }catch(e){
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()