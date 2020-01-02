const db = require('../config/db.config');

module.exports = {
    getDonations,
    postDonation,
    deleteDonation,
    updateDonations,
    getDonationsById,
    getDonationsByFilter
}

function getDonations(){
    return db('donations')
    
}
function postDonation(donation){
  return db('donations')
        .insert(donation,"id")
}

function deleteDonation(id){
    return db('donations')
    .where({id})
    .truncate()
    .delete()
    
}

function updateDonations(id,changes){
    return db('donations')
        .where({id})
        .update(changes,"id")
}

function  getDonationsByFilter(filter){
    return db('donations')
          .where({filter})
          .orderBy({filter})
}

function getDonationsById(id){
    return db('donations')
          .where({id})
          
}