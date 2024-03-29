const express = require('express')
const {dataIngestHandler, dataQueryHandler, dataDeleteHandler} = require('./controller')
const multer = require('multer');


const router = express.Router()

// Set up multer to handle file uploads
//Multer is a node.js middleware for handling 'multipart/form-data' payload of POST request, which is primarily used for uploading files.
const upload = multer({ dest: 'uploads/' });


router.get('/', (req, res)=>{
    res.status(200).json({message: "Welcome to Event-log-ingest-and-query-system"})
})

// Define a POST endpoint to receive the CSV file
//Now, you can send a POST request to http://localhost:3000/upload with a 'multipart/form-data' payload containing a field named csvFile that holds the CSV file
//First, assuming you have a CSV file named data.csv, you can use curl bash command to send a POST request like this
//curl -X POST -F "csvFile=@data.csv" http://localhost:3000/upload
router.post('/upload', upload.single('csvFile'), dataIngestHandler)


//curl bash command to send a GET request like this
//curl -X GET "http://localhost:3000/event/find?date=<YYYY-MM-DD>&latitude=<value>&longitude=<value>"
router.get('/event/find', dataQueryHandler)


//curl bash command to send a DELETE request like this
//curl -X DELETE http://localhost:3000/event/deleteAll
router.delete('/event/deleteAll', dataDeleteHandler)


module.exports = {
    router
}