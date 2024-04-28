const express = require('express')
const database = require('../models/index')// require the index.js file from directory
const Student = database.Student // student model

const router = express.Router()

router.get('/students', function(req,res,next){

    Student.findAll({ order: ['name'] } ).then(students => {
        return res.json(students)
    })
})

router.post('/students', function(req,res,next){
    const newStudent = req.body
    console.log(newStudent)
    Student.create(newStudent).then( result =>{
        return res.status(201).send('New student created!')
    }).catch( err=>{
        // 400 = bad request 
     if (err instanceof database.Sequelize.ValidationError){
        const messages = err.errors.map( e => e.message)
        return res.status(400).json(messages)
     } else {
        // another error?
        next (err)
     }
    })
})
// this is to match ID student the way when is(true) or not (false) in class.
router.patch('/students/:id', function(req,res,next){


    // this codes is for the body request
    const studentID = req.params.id
    const updatedStudent = req.body 
    console.log(updatedStudent)
    Student.update( updatedStudent, {where:{ id: studentID} }).then( (result) =>{

        const rowsModified = result[0]
        // this is to tell us about the data we have 
        // example if 1 row is update we founde the student
        if( rowsModified===1){

        // student ID no exist
        return res.send('ok')

    } else {
        // if 0 rows no update, no students found
        return res.status(404).send('Student not found')
    }
    }).catch( err => { // this is for database error
        // invalid data updateStudent- example no name 
         // 400 = bad request 
     if (err instanceof database.Sequelize.ValidationError){
        const messages = err.errors.map( e => e.message)
        return res.status(400).json(messages)
     } else {
        // another error?
        next (err)
     }
    })

})


router.delete('/students/:id',function(req,res,next){
    const studentID = req.params.id
    Student.destroy( {where:{ id:studentID }}).then( (rowsDeleted) =>{

        if (rowsDeleted ===1){
            return res.send('Student deleted')
        } else {
            return res.status(404).send('Student not found ')
        }
    }).catch (err => {
        return next (err)
    })
})

module.exports = router