# Event Log Ingest And Query Backend System.
Developed a RESTful service that manages and queries event data based on a user's geographical location and a specified date. This service will ingest data from a provided CSV dataset and then offer an API to find events for user

## Tech Stack choice
* Language/Environment - JavaScript, Node.JS
* Framework - Express.JS
* Database - MongoDB 
#### I wanted to take a moment to explain why I chose JavaScript, Express.js, and MongoDB. 
JavaScript was chosen for its versatility, and asynchronous nature, making it well-suited for rapid development and handling concurrent operations.<br/>
<br/>
Express.js, a minimalist web framework for Node.js, was selected for its simplicity, flexibility, and robust middleware support. <br/>
<br/>
MongoDB was opted for as our database solution due to its flexibility, scalability, and ease of use. As a NoSQL database, it accommodates unstructured data, making it suitable for applications with evolving data schemas. <br/>

### Design Pattern And Performance Enhancement
MVC(model-view-controller) design pattern is followed for this backend system. <br/>
<br/>
For optimize query performance mongoDB database indexing has been done on 'date' attribute with sorting order set to ascending as in this assignment queries are related to 'date' only. <br/>
<br/>
This '/event/find' API endpoint reuire data from given external weather and distance APIs. Hence concurrent programming has been implementesd to concurrently fetch responces from external APIs for all the events occurring within the next 14 days from the specified date. Here javascript Promises are used for concurrency with robust error handling. (see controller.js file) <br/>
<br/>
All the API endpoints has robust error/exception handling.

## Getting Started
#### To run this backend system locally, your system needs have node and npm installed.
### 1. Clone the repository
```
git clone https://github.com/sdcode001/Event-log-ingest-and-query-system-with-enhanced-performance-using-concurrency-indexing.git
```
### 2. Change directory
```
cd Event-log-ingest-and-query-system-with-enhanced-performance-using-concurrency-indexing
```
### 3. Install packages
```
npm install
```
### 4. Start server
```
npm run start
```
#### Now server will run on localhost:3000. Make sure your system is not running other application on port 3000

## API Endpoints
### POST-  /upload/
Send a POST request to http://localhost:3000/upload with a 'multipart/form-data' payload containing a field named csvFile that holds the CSV file <br/>
Assuming you have a CSV file named data.csv, you can use curl bash command to send a POST request like this.
```
curl -X POST -F "csvFile=@data.csv" http://localhost:3000/upload
```
Replace data.csv with your CSV file name
##### Demo responce
```
{
"result": "200 events inserted into database...."
}
```
### GET-  #### /event/find?date=YYYY-MM-DD&latitude=value&longitude=value
Send a GET request to fetch events data sorted by the earliest event after the specified date, with a page size of 10. Each event includes event name, city, date, weather, and the distance from the user's location <br/>
Curl bash command to send a GET request like this.
```
curl -X GET "http://localhost:3000/event/find?date=2024-03-15&latitude=40.7128&longitude=-74.0060"
```
##### Demo responce
```
{
    "events": [
      {
        "event_name": "Structure support choice",
        "city_name": "Fryland",
        "date": "2024-03-15",
        "distance": "8910.23984646717",
        "weather": "Rainy 25C"
      },
      {
        "event_name": "Party development available",
        "city_name": "Port Alexander",
        "date": "2024-03-15",
        "distance": "12710.135679990923",
        "weather": "Windy 27C"
      },
      {
        "event_name": "Of ask open",
        "city_name": "New Andrew",
        "date": "2024-03-16",
        "distance": "15346.67040558074",
        "weather": "Rainy 3C"
      },
      {
        "event_name": "Air quickly home",
        "city_name": "Lawrenceview",
        "date": "2024-03-16",
        "distance": "12674.554607967308",
        "weather": "Sunny 12C"
      },
      {
        "event_name": "Phone city",
        "city_name": "Riveraberg",
        "date": "2024-03-16",
        "distance": "16078.58918887799",
        "weather": "Rainy 16C"
      },
      {
        "event_name": "Create success",
        "city_name": "New Susanmouth",
        "date": "2024-03-16",
        "distance": "8301.79106018215",
        "weather": "Sunny 5C"
      },
      {
        "event_name": "Political check five",
        "city_name": "Lake Timothymouth",
        "date": "2024-03-17",
        "distance": "14210.540682363635",
        "weather": "Snowy 12C"
      },
      {
        "event_name": "Glass although",
        "city_name": "Kathleenfort",
        "date": "2024-03-17",
        "distance": "10573.065392070204",
        "weather": "Windy 1C"
      },
      {
        "event_name": "Assume by",
        "city_name": "East Brandyfort",
        "date": "2024-03-18",
        "distance": "16561.73323780224",
        "weather": "Rainy -1C"
      },
      {
        "event_name": "Democrat seat nor",
        "city_name": "South Mark",
        "date": "2024-03-18",
        "distance": "13743.417820685165",
        "weather": "Rainy 32C"
      }
    ],
    "page": 1,
    "pageSize": 10,
    "totalEvents": 44,
    "totalPages": 5
  },
  {
    "events": [
      {
        "event_name": "Player",
        "city_name": "Lewischester",
        "date": "2024-03-19",
        "distance": "15232.42376978484",
        "weather": "Cloudy 16C"
      },
      {
        "event_name": "May",
        "city_name": "New Brittany",
        "date": "2024-03-19",
        "distance": "12064.028098110557",
        "weather": "Windy 10C"
      },
      {
        "event_name": "Involve describe",
        "city_name": "Port Jessica",
        "date": "2024-03-19",
        "distance": "12599.10244010528",
        "weather": "Sunny 6C"
      },
      {
        "event_name": "Parent recognize",
        "city_name": "East Teresa",
        "date": "2024-03-19",
        "distance": "14527.669322114876",
        "weather": "Rainy 27C"
      },
      {
        "event_name": "Discover environmental left",
        "city_name": "Jennifertown",
        "date": "2024-03-20",
        "distance": "16949.357175041358",
        "weather": "Windy 26C"
      },
      {
        "event_name": "Build successful democratic article",
        "city_name": "South Misty",
        "date": "2024-03-20",
        "distance": "10666.823058586891",
        "weather": "Cloudy 9C"
      },
      {
        "event_name": "Unit step remember",
        "city_name": "Scottfort",
        "date": "2024-03-21",
        "distance": "11510.979200878548",
        "weather": "Rainy 0C"
      },
      {
        "event_name": "Support least recent",
        "city_name": "Carlville",
        "date": "2024-03-22",
        "distance": "14788.096540228473",
        "weather": "Snowy 14C"
      },
      {
        "event_name": "School tax source",
        "city_name": "New Kelly",
        "date": "2024-03-22",
        "distance": "14682.262928650607",
        "weather": "Sunny 6C"
      },
      {
        "event_name": "Take bill travel nearly",
        "city_name": "Melissaborough",
        "date": "2024-03-22",
        "distance": "12108.74168258985",
        "weather": "Rainy 26C"
      }
    ],
    "page": 2,
    "pageSize": 10,
    "totalEvents": 44,
    "totalPages": 5
  }
```




