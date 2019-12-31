const db = require('../config/db.config')

module.exports = {
    getList,
    updateList,
    postList,
    deleteList
}

function getList(){
    return db('mailing_list')
}
function updateList(id,changes){
    return db('mailing_list')
    .where({id})
    .insert(changes)
}
function postList(list){
    return db('mailing_list')
    .insert(list,"id")
}

function deleteList(id){
    return db('mailing_list')
    .where({id})
    .delete()
}