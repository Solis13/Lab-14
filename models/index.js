const { Sequelize, DataTypes } = require('sequelize')
const configJson = require('../config.json')
const createStudentModel = require ('./student.js')

// env = enviroment 
// we create a env variable call NODE_ENV 
const env = process.env.NODE_ENV || "development"

const config = configJson[env] // read the configuration object 

const sequelize = new Sequelize(config)

const database = {
    sequelize:sequelize, // sequelize obejct 
    Sequelize:Sequelize // sequelize libraty
}

const studentModel = createStudentModel(sequelize,DataTypes)
const studentModelName = studentModel.name // 'Student'
database[studentModelName] = studentModel

module.exports = database