const db = require('../config/db.config')
module.exports = {
    getStory,
    getStoryById,
    updateStory,
    addStory,
    deleteStory,
    getByID
}
function getStory(){
    return db('your_story')
      .select("*")
}
  function getByID(id){
      return db("your_story")
           .where({id})

  }

function getStoryById(id) {
    return db('your_story').where({ id }).first()
}

function updateStory(changes, id){
    return db('your_story')
           .where( {id} )
           .update(...changes)
}

function updateStory(changes, id) {
    return db('your_story').where({ id }).update(changes)
}

function addStory(story){
    return db('your_story')
       .insert(story,'id')

} 



       
            
function delStory(id) {
    return db('your_story').where({ id }).del()



}