# Server-Side-Javascript

This is a working example of a Basic CRUD application developed in Node.js

### System Setup

Make sure to have **NodeJS** and **MongoDB** installed on your machine.

_Additionally install **nodemon** and **bunyan** globally._

```
npm install -g nodemon
npm install -g bunyan
```

_**Nodemon** automatically reload your application on file change_
_**Bunyan** correctly format the logger output_

### Utility

**PostMan** Chrome Extension to test REST Services

### 01 - Environment

In this branch you can find an empty enviroment ready for you to develop a NodeJS application.

Here is defined a base scheleton for an application.
You can check it out in `server.js` file.

There are some npm modules that are everytime usefull, check the list in `package.json`, they are:

- express - the Node framework
- mongoose - the ORM we will use to communicate with our MongoDB database
- body-parser - let us pull POST content from our HTTP request
- bunyan - a simple and fast JSON logging library for node.js services

Run this example with: `nodemon server.js | bunyan`

### 02 - Database Connection and Model Definition

Check out `server.js` to connect to MongoDB and listen for DB related Events.

Open `model/ninja.js` to view how to define a Mongoose Model.

### 03 - Routes and Middleware

Define a custom middleware for all routes to capture the request.

### 04 - Create a Ninja

Define a controller to handle request.
Define a route to save a Ninja.
Define a function to create and save a Ninja.

### 05 - Query Ninjas

Define a route to query all Ninjas.
Define a function to query all Ninjas.

### 06 - Get Ninja

Create a route to get information about a specific Ninja
Add a parameter to the route

### 07 - Update Ninja

Create a route to delete a specific Ninja