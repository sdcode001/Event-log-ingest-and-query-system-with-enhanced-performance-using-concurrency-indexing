const csvParser = require('csv-parser');
const fs = require('fs');
const {connectDB} = require('./config/DBConnect')
const {Event} = require('./models/EventModel');
const { log } = require('console');



async function dataIngestHandler(req, res){
  await connectDB().catch(error=>res.status(500).json({error:'connection falied with mongoDB...'}))

   // Check if file exists
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Read the CSV file and process its contents
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', async() => {
      
        try{
          const result = await Event.insertMany(results)

          return res.status(201).json({result: `${result.length} events inserted into database....`})
          
        }catch(err){
            return res.status(404).json({error: 'Insertion failed!'})
        }
      
    });
}


async function dataQueryHandler(req, res){
    await connectDB().catch(error=>res.status(500).json({error:'connection falied with mongoDB...'}))
    
    const user_longitude = req.query.longitude.toString()
    const user_latitude = req.query.latitude.toString()
    const search_date = req.query.date.toString()

    try{
       const end_date = incrementDate(search_date, 15)
       //this will return events occurring within the next 14 days from the search_date
       const result = await Event.find({date:{$gte:search_date, $lt:end_date}})
       
       //using Promise.all() we making concurrent API calls to the external Weather and Distance Calculation APIs to minimize response times
        try{
            const events = await Promise.all(
                result.map((event) => executeDistanceAndWeatherAPICallTask(event, user_latitude, user_longitude))
            )
            
            //process the responce with 10 events each page.
            const pages = []
            const pageSize = 10;
            const totalPages = Math.ceil(events.length / pageSize);

            // Generate responses for each page
            for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
                const pageResponse = generateResponcePage(pageNumber, pageSize, events);
                pages.push(pageResponse)
            }

            return res.status(200).json(pages)
    
       }catch(err){
            console.log(err)
            return res.status(200).json({error: 'Promises to external APIs failed!'})
       }
       
    }catch(err){
        console.log(err)
        return res.status(404).json({error: 'Searching of events failed!'})
    }
}

async function dataDeleteHandler(req, res){
    await connectDB().catch(error=>res.status(500).json({error:'connection falied with mongoDB...'}))

    try{
       const result = await Event.deleteMany({})
       return res.status(404).json(result)
    }catch(err){
        return res.status(404).json({error: 'Insertion failed!'})
    }
}


const executeDistanceAndWeatherAPICallTask = async(event, user_latitude, user_longitude) => {
    let city_name = event.city_name.replaceAll(' ', '%20')
    const distance_api_url = `https://gg-backend-assignment.azurewebsites.net/api/Distance?code=IAKvV2EvJa6Z6dEIUqqd7yGAu7IZ8gaH-a0QO6btjRc1AzFu8Y3IcQ==&latitude1=${user_latitude}&longitude1=${user_longitude}&latitude2=${event.latitude}&longitude2=${event.longitude}`
    const weather_api_url = `https://gg-backend-assignment.azurewebsites.net/api/Weather?code=KfQnTWHJbg1giyB_Q9Ih3Xu3L9QOBDTuU5zwqVikZepCAzFut3rqsg==&city=${city_name}&date=${event.date}`

    try{
       const distance_res = await fetch(distance_api_url)
       const distance_res_json = await distance_res.json()
       try{
            const weather_res = await fetch(weather_api_url)
            const weather_res_json = await weather_res.json()

            return {
                event_name: event.event_name,
                city_name: event.city_name,
                date: event.date,
                distance: distance_res_json.distance, 
                weather: weather_res_json.weather
            }

       }catch(err){
          throw err
       }

    }catch(err){
        throw err
    }
}

function incrementDate(date_str, incrementor) {
    var parts = date_str.split("-");
    var dt = new Date(
        parseInt(parts[0], 10),      // year
        parseInt(parts[1], 10) - 1,  // month (starts with 0)
        parseInt(parts[2], 10)       // date
    );
    dt.setTime(dt.getTime() + incrementor * 86400000);
    parts[0] = "" + dt.getFullYear();
    parts[1] = "" + (dt.getMonth() + 1);
    if (parts[1].length < 2) {
        parts[1] = "0" + parts[1];
    }
    parts[2] = "" + dt.getDate();
    if (parts[2].length < 2) {
        parts[2] = "0" + parts[2];
    }
    return parts.join("-");
}


function generateResponcePage(pageNumber, pageSize, events) {
    // Calculate the start index and end index based on page number and page size
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, events.length);

    // Get the events for the current page
    const eventsForPage = events.slice(startIndex, endIndex);

    // Total events and pages
    const totalEvents = events.length;
    const totalPages = Math.ceil(totalEvents / pageSize);

    // Create the page object
    const page = {
        events: eventsForPage,
        page: pageNumber,
        pageSize: pageSize,
        totalEvents: totalEvents,
        totalPages: totalPages
    };
    return page
}



module.exports = {
    dataIngestHandler,
    dataQueryHandler,
    dataDeleteHandler,
}