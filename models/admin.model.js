const db = require('../config/db.config')

module.exports = {
    get,
    getByFilter,
    getByEmail,
    addAdmin,
    updateEmail,
    updatePassword,
    deleteUser
}

function getByFilter(filter) {
    return db('admin')
    .where({filter})
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
    .then(admin =>{return admin})
}

function addAdmin(adminData){
    return db('admin').insert(adminData,"id")
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
