const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

// Middleware to check JWT Token
function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login');  // Redirect to login if no token
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.redirect('/login');
        }
        req.user = decoded;
        next();
    });
}

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Dummy user authentication (Replace with database check)
    if (username === "user" && password === "password") {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
        return res.redirect('/index');
    } else {
        return res.render('login', { error: "Invalid Username or Password!" });
    }
});

app.get('/index', verifyToken, (req, res) => {
    res.render('index');
});

// Logout Route
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
