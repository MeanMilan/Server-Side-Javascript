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
