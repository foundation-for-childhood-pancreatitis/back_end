/**
 * Endpoint documentation for 
 *
 * https://pancreatitis-be.herokuapp.com
 * @module Endpoints
 * 
 */
'use strict'
const router = require('express').Router();

const db = require('../models/donations.model')

/**
 *  Get All Donations
 * @name Donations
 * @path {GET} /donations
 * @auth Will require auth when moving into production
 * @code {200}
 * @response {Array} Donations returns an array of donations
 */
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

/** Get Donations By Id
 * @name Donations
 * @path {GET} /donations/:id
 * @params {Integer} :id is the unique identifier for the donation record
 * @code{200}
 * @response {Object} Donation record
 *
 */
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
        return res.status(201).json({mesage:`Donation created`,id:id})
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
    db.getDonationsById(id)
     .then(donation =>{
         if(donation[0].id == id){
        return  db.deleteDonation(id)
         .then(deletedDonation =>{
             res.status(204).json(deletedDonation)
         })
     }  return res.status(404).json({message: `Sorry no donation found for id# ${id} `})
         
     })
    .catch(error =>{res.status(500).json({message:error.message})})
})

module.exports = router