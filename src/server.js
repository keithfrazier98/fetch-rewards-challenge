const {PORT = 5000} = process.env

const app = require('./app')
const knex = require('./db/connection')

knex.migrate
.latest()
.then((migrations) => {
    console.log("migrations", migrations)
    app.listen(PORT, listener)
})
.catch((error) => {
    console.log(error)
    knex.destroy()
})

function listener() {
    console.log(`Listening on Port ${PORT}`)
}