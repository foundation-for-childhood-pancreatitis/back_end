const db = require('../config/db.config')

module.exports = {
    getStory,
    updateStory,
    addStory,
    delStory
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
       .instert(story,'id')

} 

function delStory(id){
    return db('you_story')
    .where({id})
    .delete()
}