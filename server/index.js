require('dotenv').config();
const massive = require('massive');
const express = require('express');
const session = require('express-session');
const { login, logout, register, userSession} = require('./controller/authController');
const app = express();
const { CONNECTION_STRING, SESSION_SECRET ,SERVER_PORT } = process.env

app.use(express.json());

massive(CONNECTION_STRING).then(db => {
    console.log('connected to db')
    app.set('db', db)
})

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14 // two weeks
    }
}))


app.post('/api/login', login);
app.post('/api/register', register);
app.get('/api/user_session', userSession);


app.get('/api/logout', logout);
app.get('/api/users')
app.delete('/api/obliterate')
app.put('/api/distance')
app.put('/api/kill_user')















app.listen(SERVER_PORT, () => console.log(`listening on server port ${SERVER_PORT}`))
