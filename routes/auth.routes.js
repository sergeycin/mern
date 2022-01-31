const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const User = require('../models/Users')
const {check, validationResult} = require('express-validator')
const router = Router()


// /api/auth/register
router.post(
  '/register', 
[
  check('email', 'Некорректный email').isEmail(),
  check('password', 'Минимальная длина пароля 6 символов')
  .isLength({min:6})
],
async (req,res) =>{ 

 try{
   const errors = validationResult(req)

   if(!errors.isEmpty()){
     return res.status(400).json({
       errors: errors.array(),
       message: "Некорректные данные при регистрации"
     })
   }
    const {email,password} = req.body
    
    const candidate = await User.findOne({email})
     
    if (candidate){
      return  res.status(400).json({message: "Такой пользователь уже существует"})
    }
    const hashedPassword = await bcrypt.hash(password,12)
    const user = new User({email, password: hashedPassword})

    await user.save()

  

    res.status(201).json({message:"Пользователь создан"})

 }catch(e){
     res.status(500).json({message: "Вы точно не right"})
 }
})

// /api/auth/login
router.post(
  '/login', 
  [
    check('email', 'Введите кооректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists() //Проверка существует ли пароль
  ],
async (req,res) =>{

  try{
    const errors = validationResult(req)
 
    if(!errors.isEmpty()){
      return res.status(400).json({
        errors: errors.array(),
        message: "Некорректные данные при входе"
      })
    }
    const {email,password} = req.body
   const user = await User.findOne({email}) //Ищем 1 человека по email

   if(!user){
     return res.status(400).json({message:'Пользователь не найден'})
   }

   const isMatch = await bcrypt.compare(password,user.password)

   if(!isMatch){
     return res.status(400).json({message: 'Неверный пароль попробуйте еще раз'})
   }

   const token = jwt.sign( // Выдается пользователю во время сесии нужно для безопасности
     {userId: user.id},
     config.get('jwtSecret'),
     {expiresIn: '1h'}

   )
   
   res.json({token,userId:user.id})

  }catch(e){
      res.status(500).json({message: "Вы точно не right"})
  }
})


module.exports = router