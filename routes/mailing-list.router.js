const router = require('express').Router();
const db = require('../models/mailing-list.model')

router.get('/',(req,res) => {
    db.getList()
    .then(list => {
        if(list){
        return res.status(200).json({data:list})
        }
        return res.status(404).json({message:'Sorry no mailing_lists found'})
    })
    .catch(error => {res.status(500).json({message:error.message})})
})

router.post('/',(req,res) => {
    const list = req.body
    db.postList(list)
    .then(newList => {
        if(newList){
            return res.status(201).json({data:newlist})
        }
        return res.status(400).json({message:'Please check information sent'})
    })
    .catch(error => {res.status(500).json({message:error.message})})
})

router.put('/:id',(req,res) =>{
      const id = req.params.id
      const changes = req.body
      db.updateList(id,changes)
      .then(updates => {
          if(updates){
              return res.status(200).json({data:updates})
          }
        return res.status(404).json({message:`Sorry no record found for id# ${id}`})
      })
      .catch(error => {res.status(500).json({message:error.message})})
    })

    router.delete('/:id',(req,res) => {
        const id = req.params.id
        db.deleteList(id)
        .then(deletedList =>{
            if(deletedList){
                return res.status(204)
            }
           return res.status(404).json({message:`Sorry no record found for id# ${id}`})
        })
        .catch(error => {res.status(500).json({message:error.message})})

    })

    module.exports = router