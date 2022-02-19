const express = require('express')
const config = require('config')
const mongose = require('mongoose')
const path = require('path')
const app = express()

const PORT = config.get('port') || 5000

app.use(express.json({extended: true}))
 app.use('/api/auth', require('./routes/auth.routes'))
 app.use('/api/link',require('./routes/link.routes'))
 app.use('/t', require('./routes/redirect.routes'))   

// Настройки для delpoy
if(process.env.NODE_ENV === 'production'){
    app.use('/',express.static(path.join(__dirname,'client', 'build')))

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    } )
}

//End settings deploy
 
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