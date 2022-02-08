const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req,res,next) =>{
    if(req.method === 'OPTIONS'){ //OPTIONS проверяет доступность сервера
        return next() // next продолжает выполнять запрос
    }
     try{
         const token = req.headers.authorization.split(' ')[1] //"Bearer TOKEN"
     
            if(!token){
                res.status(401).json({message: 'Нет авторизации'})
            }

            const decoded = jwt.verify(token,config.get('jwtSecret')) //Раскодируем токен
            req.user = decoded
            next()
     }catch(e){
        res.status(401).json({message: 'Нет авторизации'})
     }
}