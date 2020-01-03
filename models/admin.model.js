const db = require('../config/db.config')

module.exports = {
    get,

    getByEmail,
    addAdmin,
    updateEmail,
    updatePassword,
    deleteUser,
    getById
}

// function getByFilter(filter) {
//     return db('admin')
//     .where({filter})
// }

function getById(id){
      return db('admin')   
           .where('id','=',id)
}

function get() {
    return db('admin')
    .then(admin => admin)
}
function getByEmail(email){
    return db('admin')
    .select('*')
    .where({ email })
    .first()
    .then((admin =>{admin}))
}

function addAdmin(adminData){
    return db('admin').insert(adminData,"id")
      .then(adminIdArr =>{adminIdArr})
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
