const db = require('../config/db.config')
module.exports = {
    getStory,
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

function updateStory(id,changes){
    return db('your_story')
           .where({id})
           .insert(...changes)
}

function addStory(story){
    return db('your_story')
       .insert(story,'id')

} 



function deleteStory(u_id){
    return db('your_story')
       
            .where('your_story.id','=',u_id)
           .delete()
}