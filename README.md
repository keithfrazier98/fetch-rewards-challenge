# fetch-rewards-challenge

> This is a simple implementation of the directions defined in "Fetch Rewards Coding Exercise - Backend Software Engineering"
> > **The directions are in this directory for easy reference.**

> These directions assume you have node.js and npm installed, if you dont:
> > open your terminal and run the following command "npm install -g npm" or follow these directions https://docs.npmjs.com/downloading-and-installing-node-js-and-npm


## technology (packages/dependencies) directly used

    - Express.js
    - knex.js
    - cors
    - path
    - dotenv
    - pg
    - heroku

## access and overview

  - code (public repository) : https://github.com/keithfrazier98/fetch-rewards-challenge
  - deployed API: https://fetch-rewards-challenge.herokuapp.com/

I created a local server and a live server both connected to a live postgreSQL database (through elephant sql) to test the functionality of the code. This way you can either view the code online and use the live API to make requests, or you can download the code to view it then run a local server to handle the requests.

> **The database is currently empty.**


> **The API strictly adheres to the directions, so the request bodies need to be made the exact way the data in the directions was presented.**

> **All requests can be made to the direct url, whether it be the live URL or a local URL (which will default to localhost:5000)**

### Downloading and viewing the code

    This implementation can be viewed through the GitHub link above, or follow the instructions below to download a clone to your local machine and start a local server:

    1. open your terminal and navigate to the directory you desire to store the clone
    2. run the following command in your terminal to clone the repository

`git clone https://github.com/keithfrazier98/fetch-rewards-challenge.git`

    3. open the cloned directory in your code editor to view the code
    4. through your code editor terminal or regular terminal, navigate to the clone directory created above
    5. run 'npm i' to download the necessary dependencies
    6. run 'npm run start' to start a local server
    7. you may now use a http request simulator to make requests to the database

## To test the API:

    1. You will need a http request simulator to handle your requests. Here are some suggestions
        -    postman (native application)
        -    https://reqbin.com/ (online simulator)

    2a. If you are using the live API, enter the url from above in the simulator and make your requests
    2b. If you are using a local server, follow the directions under the "Downloading and viewing the code" section above to get a local server running, then make your requests to 'http://localhost:5000/' in your simulator

![simulator](/postman.png)

## to make requests:

_Add Data_

    - perform a post request with one piece of data at a time to post the data to the database:
      -  method: post, body: { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }

_Spend Points_

    - perform a put request with a price to spend points as described in the directions:
      - method: put, body: {"points":5000}

_See Balance_

    - perform a get request to retrieve the points balance
      - because all requests are made to the direct url, if you access the live API through your browser it will simply perform the above-mentioned get request

## current routes/middleware explination:


_addTransaction_ 

- the addTransaction function responds to the base route upon sending a post method request with a body containing an object with a timestamp, point value, and payer name
- the function will take the data and call a function from the points.service file that will use the knex database connection (defined in the connection.js file) to send data to the database url, effectively posting it to the database
- the function will return a status with a response containing the the payer and points information 

_spendPoints_

- the spendPoints function will respond to the base route upon sending a put method request with a body containing an amount of points to be spent
- while there are points to be spent, the function will query the database for the oldest records of points that is not equal to zero. Then it will deduct these points from the points to be spent, and repeat this process until there are no more points to be spent
- finally the function will respond with a status code and a body containing the amount of points spent and from which payer 

_pointBalance_

- the pointBalance function will respond to the base route upon sending a get method 
- the function will query the database for all data then use a helper function to format the data
- the function will respond with a status code and object displaying each payer and remaining points

_pointArrayFromObject_
- the pointArrayFromObject function is a helper function for the spendPoints and pointBalance functions
- it takes a pointObject (being an object the keys as payers and values as points) 
- it returns a point array containing a list of objects ({payer:"payerName", points:"pointValue"})

_editPointObject_

- the editPointObject function is a helper function for the spendPoints and pointBalance functions
- it takes a payer, pointValue, pointObject (in that order)
- it supplements an existing payers pointValue or creates a new [key,value] pair being a payer and pointValue 
- it then returns the updated object


## scripts

     I have included scripts in the package.json file to seed the database with the same data as the example in the directions to this challenge, as well as wipe the database.

_wipe database_

    1. open your terminal in the cloned directory
   
    2. run "npm run wipe"

_seed database_

    1. open your terminal in the cloned directory
    
    2. run "npm run seed"

## comments:

_This is a simple and unstable implementation of the coding challenge, in a production situation
I would implement more error handling and validation for requests._

- asynchErrorBoundary
  - a file that would export a function that returns a promise which would take a function to delegate the request to and catch any errors before the function handles them
- notFound
  - a file that would export a function that responds with an error message if a route is not found
- errorHandler
  - a file that would export a function that responds with an error message if something extraneous occurs
- methodNotAllowed

  - a file that would export a function that responds with an error message explaining that a particular method on a route is not allowed

- further validation middleware
  - middleware functions in the points.controller file that checks if the body of a request adheres to the necessary format and content of the data expected by the following query functions as per the directions


- asymptotic analysis
  - analyze the middleware, how the data is being collected, how it is being parsed or sorted, what is the growth rate of the functions, can anything be more efficient?