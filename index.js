const express = require("express");
const cors = require('cors')

require("./db")

require('dotenv').config()

const app = express();

//Body Parser middleware

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use(cors({
    origin: 'http://localhost:5173' || 'http://hilaked.com/'
}))


const eventRoutes = require('./routes/events.routes')
app.use(eventRoutes)

const articleRoutes = require('./routes/articles.routes')
app.use(articleRoutes)

const mediaRoutes = require('./routes/media.routes')
app.use(mediaRoutes)

const authRoutes = require('./routes/auth.routes')
app.use(authRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

require("./error-handling")(app)

module.exports = app;
