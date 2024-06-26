const express = require('express')
const apiRoutes = require('./routes/api')
const path = require ('path')

const app = express()

app.use(express.json())

const staticFilePath = path.join(__dirname, 'client', 'dist')
const staticFiles = express.static(staticFilePath)
app.use('/', staticFiles)// home page
app.use('/api', apiRoutes)

app.use(function(req, res, next ){
    res.status(404).send('Sorry, not found')
    //can't find matching route

})

app.use(function(err, req, res, next){
    console.log(err.stack)
    res.status(500).send('Server error')
})

// server running 
const server = app.listen(process.env.PORT || 3000, function (){
    console.log('Express server running on port', server.address().port)
})