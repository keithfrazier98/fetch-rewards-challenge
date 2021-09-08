# fetch-rewards-challenge

> This is a simple implementation of the basic directions defined in "Fetch Rewards Coding Exercise - Backend Software Engineering"

## technology (packages/dependencies) directly used

    - Express.js
    - knex.js
    - cors
    - path
    - dotenv
    - pg

## access

    - code (public repository) : https://github.com/keithfrazier98/fetch-rewards-challenge
    - deployed API: https://fetch-rewards-challenge.herokuapp.com/

I created a local server and a live server both connected to a live postgreSQL database (through elephant sql) to test the functionality of the code. This way you can either view the code online and use the live API to make requests, or you can download the code to view it then run a local server to handle the requests.

> **The API is designed strictly against the directions, so the request bodies need to be made the exact way the data in the directions was presented.**

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
