const {Router} = require('express')
const config = require('config')
const shortid = require('shortid') // generate short id
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async(req,res) =>{
    try{
        const baseUrl = config.get('baseUrl')
        const {from} = req.body
        const code = shortid.generate()

        const existing = await  Link.findOne({from})

        if(existing){
            res.json({link:existing})
        }
        else{
            const to = baseUrl + '/t/' + code
            const link = new Link({
                code,to,from,owner:req.user.userId
            })
    
            await link.save()
    
            res.status(201).json({link})
        }

      
     
    }catch(e){
        res.status(500).json({message: "Вы точно не right"})
    }
})




router.get('/',auth,async(req,res)=>{
    try{
        const links = await Link.find({ owner: req.user.userId})
        res.json(links)
     
      }catch(e){
          res.status(500).json({message: "Вы точно не right"})
      }
})

router.get('/:id',auth,async(req,res)=>{
    try{
        const link = await Link.findById(req.params.id)
        console.log(link)
        res.json(link)
        
     
    }catch(e){
        res.status(500).json({message: "Вы точно не right"})
    }
})

module.exports = router;