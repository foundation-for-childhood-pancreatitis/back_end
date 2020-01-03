const db = require('../config/db.config')
module.exports = {
    getStory,
    updateStory,
    addStory,
    deleteStory
}
function getStory(){
    return db('your_story')
      .select("*")
}

function updateStory(id,changes){
    return db('your_story')
           .where({id})
           .insert(...changes)
}

function addStory(story){
    return db('your_story')
       .insert(story,'id')

} 

function deleteStory(uid){
    return db('your_story')
            .orderBy('id')
            .where("id","=",uid)
           .delete()
}