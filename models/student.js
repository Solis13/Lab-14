const { UniqueConstraintError } = require("sequelize")

module.exports = (sequelize,DataTypes) => {

    // DEFINE THE MODEL 
    const Student =sequelize.define('Student',{

        // we start to put the database in columns and given the name and type
        name:{
            type:DataTypes.STRING,
            allowNull : false,
            validate: {
                notEmpty: false
            }
        },
        startID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,

            validate:{
                notEmpty: false
            }
            
        },
        present: {
            type:DataTypes.BOOLEAN,
            allowNull: false,
            default: false

        }
    })
// we create a table or update the table
    Student.sync({ force: false }).then (()=>{
        console.log('Synced student table')
    })

    return Student
}