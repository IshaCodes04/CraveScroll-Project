const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
require('./config/passport'); // Load passport config

const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');
const adminRoutes = require('./routes/admin.routes');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000", "http://127.0.0.1:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

const { MongoStore } = require('connect-mongo');

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions' // Optional, this stores sessions in 'sessions' collection
    }),
    cookie: {
        secure: process.env.NODE_ENV === "production", // Render par https use hota hai, set to true on production
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;