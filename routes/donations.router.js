const router = require('express').Router();

const db = require('../models/donations.model')

router.get('/',(req,res) => {
    db.getDonations()
      .then(donations =>{
          if(donations){
            return   res.status(200).json({data:donations})
          }
          res.status(404).json({message:"Sorry no donations found"})
      })
      .catch(error =>{res.status(500).json({message:error.message})})
})

router.get('/:id',(req,res) =>{
    const id = req.params.id
    db.getDonationsById(id)
    .then(donations =>{
        if(donations){
          return  res.status(200).json({data:donations})
        }
        res.status(404).json({message:`Sorry no donations found for id # ${id}`})}
        )
    .catch(error =>{res.status(500).json({message:error.message})})
})

router.get('/byfilter/:filter',(req,res) => {
    const filter = req.params.filter
    db.getDonationsByFilter(filter)
    .then(donations =>{
        if(donations){
          return  res.status(200).json({data:donations})
        }
        return res.status(404).json({message:'Sorry no donations found for those params'})
    })
    .catch(error => {res.status(500).json({message:error.message})})
})

router.post('/',(req,res)=>{
    const donation = req.body
    db.postDonation(donation)
    .then(id =>{
        if(id){
        return res.status(201).json({mesage:`Donation added created`,id:id})
        }
      return res.status(409).json({message:'Please make sure all information is entered'})
    })
    .catch(error => {res.status(500).json({message:error.message})})
})

router.put('/:id',(req,res) =>{
    const id = req.params.id
    const changes = req.body
    db.updateDonations(id,changes)
    .then(updates =>{
        if(updates){
            return res.status(200).json({data:updates})
        }
        return res.status(404).json({message:`Sorry no donations found for id# ${id}`})
    })
    .catch(error =>{res.status(500).json({message:error.message})})
})

router.delete('/:id',(req,res) => {
    const id = req.params.id
    db.deleteDonation(id)
    .then(deleted =>{
        if(deleted){
            return res.status(204)
        }
     return res.status(404).json({message: `Sorry no donation found for id# ${id} `})
    })
    .catch(error =>{res.status(500).json({message:error.message})})
})

module.exports = router