# Event Log Ingest And Query Backend System.
Developed a RESTful service that manages and queries event data based on a user's geographical location and a specified date. This service will ingest data from a provided CSV dataset and then offer an API to find events for user

## Tech Stack choice
Language/Environment - JavaScript, Node.JS
Framework - Express.JS
Database - MongoDB <br>
<br>
I wanted to take a moment to explain why I chose JavaScript, Express.js, and MongoDB. <br>
JavaScript was chosen for its versatility, and asynchronous nature, making it well-suited for rapid development and handling concurrent operations.<br>
Express.js, a minimalist web framework for Node.js, was selected for its simplicity, flexibility, and robust middleware support. <br>
MongoDB was opted for as our database solution due to its flexibility, scalability, and ease of use. As a NoSQL database, it accommodates unstructured data, making it suitable for applications with evolving data schemas. <br>

### Design Pattern And Performance Enhancement
MVC(model-view-controller) design pattern is followed for this backend system. <br>
For optimize query performance mongoDB database indexing has been done on 'date' attribute with sorting order set to ascending as in this assignment queries are related to 'date' only. <br>
This '/event/find' API endpoint reuire data from given external weather and distance APIs. Hence concurrent programming has been implementesd to concurrently fetch responces from external APIs for all the events occurring within the next 14 days from the specified date. Here javascript Promises are used for concurrency with robust error handling. (see controller.js file) <br>
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

