const db = require('../config/db.config')

module.exports = {
    get,
    getBy,
    getById,
    add,
    updateEmail,
    updatePassword,
    deleteUser
},

function getBy(filter) {
    return db('admin')
    .where({filter})
}

function get() {
    return db('admin')
    .then(admin => admin)
}
function getById(id){
    return db('admin')
    .select('id','name','email')
    .where({ id })
    .first()
    .then(admin =>{return admin})
}

function add(adminData){
    return db('admin')
    .insert(adminData,"id")
    .then(adminIdArr => getById(adminIdArr[0]))
}

function updateEmail(id,email){
    return db('admin')
    .where({ id })
    .update({'email':email})
}

function updatePassword(id,password) {
    return db('admin')
      .where({ id })
      .update({'password':password})

}
function deleteUser(id){
    return db('admin') 
        .where({ id })
        .delete()
    }
