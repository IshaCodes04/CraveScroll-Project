const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../models/user.model');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL || "https://cravescroll-76hd.onrender.com"}/api/auth/google/callback`,
    scope: ['profile', 'email']
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log("Google Strategy Callback hit for profile:", profile.emails[0].value);

            // Check if user already exists
            let user = await userModel.findOne({ googleId: profile.id });

            if (user) {
                console.log("User found by googleId:", user.email);
                return done(null, user);
            }

            // If not, check if a user with same email exists
            user = await userModel.findOne({ email: profile.emails[0].value });

            if (user) {
                console.log("User found by email, updating googleId:", user.email);
                // Update user with googleId
                user.googleId = profile.id;
                await user.save();
                return done(null, user);
            }

            console.log("Creating new user from Google profile...");
            // Create new user
            user = new userModel({
                fullName: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id
            });

            await user.save();
            console.log("New user created successfully:", user.email);
            done(null, user);
        } catch (error) {
            console.error("Error in Google Strategy:", error);
            done(error, null);
        }
    }
));

passport.serializeUser((user, done) => {
    console.log("Serializing user:", user.id);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        console.log("Deserializing user ID:", id);
        const user = await userModel.findById(id);
        if (!user) console.log("User not found during deserialization");
        done(null, user);
    } catch (error) {
        console.error("Error during deserialization:", error);
        done(error, null);
    }
});
