const router = require('express').Router()
const db = require('../models/story.model')

/**getStories
 * 
 *returns all stories
 @public 
 @param {req}
 @param {res}
 @returns {get} GET - All stories from your_story table
 *  */
router.get('/',(req,res) =>{
     db.getStory()
     .then(stories =>{
        
        res.status(200).json({data:stories})
     })
     .catch(err => {res.status(500).json({message:err.message})})
})

/**add story  
 @public 
 @route /your_story
 @body
 @param {String} Email
 @param {String}  name
 @param {String}  phone_number
 @param {String}  street_address
 @param {String}  city
 @param {String}   state
 @param {Integer}   zip_code
 @param {String}   child_name
 @param {String}   child_age   
 @param {Enu} ["PRSS1 Mutation or variant","SPINK1 Mutation or variant","CFTR (Cystic Fibrosis) Mutation"'Sphincter of Oddi Dysfunction']
*/

router.post('/',(req,res) =>{
    const story = req.body 
    db.addStory(story)
    .then(newStort =>{
        res.status(200).json({data:newStort})
    })
     .catch(err =>{message:err.message})
})
    function getById(id){
        return db('your_story')
               .where({id})
    }
/**putStory
 * @private
 * @route /your_story/:id
 * @param {String} Id req.params.id
 * @param {String} Changes 
 *  
 */
 router.put('/',(req,res) =>{
      db.updateStory(changes,id)
      .then(newStory => {
          return res.status(200).json({data:newStory})
      })
 })

 /**delStory
  * @private
  * @route DELETE /your_story:id
  * @param {Integer} Id req.params.id

  */,
 router.delete('/:id',(req,res) =>{

        let u_id = req.params.id


      db.deleteStory(u_id)
 
     .then(resp,error =>{
    if(!error)
         res.status(204)
         console.log(resp.data)
     })
     .catch(err => {res.status(500).json(err)})
    })

    module.exports = router