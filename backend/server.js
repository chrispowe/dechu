const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

//DATABASE CONNECT
mongoose.connect(process.env.DB_CONN, {
    useNewURLParser: true,
    useUnifiedTopology: true
})

const app = express();

//CORS
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

//EXPRESS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

//SESSIONS
app.use(session({
    secret: 'ange',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

//ROUTES
const authRoute = require('./routes/auth.js')
app.use('/auth', authRoute);

const artistRoute = require('./routes/artist.js');
app.use('/artist', artistRoute);

const discogRoute = require('./routes/discog.js');
app.use('/discog', discogRoute);

const reviewRoute = require('./routes/reviews.js');
app.use('/review', reviewRoute);

app.get('/', (req, res) => {
    res.send('<h1>DECHU</h1>')
});

app.get('/userNow', (req, res) => {
    console.log(req.session.user)
})


//SERVER START
const PORT = 4000;

app.listen(PORT, ()=> {
    console.log(`vibing in port: ${PORT}`)
})