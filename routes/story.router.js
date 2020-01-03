const router = require('express').Router()
const db = require('../models/story.model')

/**getStories
 * 
 *returns all stories
 @public 
 @param {req}
 @param {res}
 @returns {get} GET - All stories from your_story table
 * 
 
 */
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

/**putStory
 * @private
 * @route /your_story:id
 * @param {String} Id req.params.id
 * @param {String} Changes 
 *  
 */
 router.put('/:id',(req,res) =>{
     const { id } = req.params
     const changes = req.body

     db.getStoryById(id)
     .then(story => {
         if (story) {
            db.updateStory(changes,id)
            .then(updatedStory => {
                res.json(updatedStory)
            })
         } else {
            res.status(404).json({ message: 'Could not find story with given id' });
         }
     })
     .catch (err => {
        res.status(500).json({ message: 'Failed to update story' });
      });
 })

 /**delStory
  * @private
  * @route DELETE /your_story:id
  * @param {Integer} Id req.params.id

  */,
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.delStory(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find story with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete story' });
    });
  });

    module.exports = router