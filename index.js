const express = require("express");
const cors = require('cors')

require("./db")


const app = express();

//Body Parser middleware

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

const eventRoutes = require('./routes/events.routes')
app.use(eventRoutes)

const articleRoutes = require('./routes/articles.routes')
app.use(articleRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

require("./error-handling")(app)

module.exports = app;
