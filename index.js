// Installation of express and mongoose
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

// Initialization
const app=express();
const port=3000;

// Connection to database and assinging to a connection variable db
mongoose.connect('mongodb+srv://anitatomy72:anita@cluster0.5qqdikq.mongodb.net/GourmetGrove?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Checks whether the connection to db has made successfully
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => {
    console.log('MongoDB Connected Successfully');
});

// Enable CORS
const corsOptions = {
    origin: '*',
    credentials: true,
  };
  app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
// Route for login and signup
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Route for modifying user details
const userRoute=require('./routes/modify_user');
app.use('/api/user',userRoute);

// Route for recipe 
const recipeRoute=require('./routes/recipe');
app.use('/api/recipe',recipeRoute);

// Route for search based on either category or course or both
const searchRoute=require('./routes/search');
app.use('/api/search',searchRoute);

// Route for retrieving all recipes uploaded by a particular user
const userrecipeRoute=require('./routes/user_recipe');
app.use('/api/userrecipe',userrecipeRoute);


// Serve the react app as build
app.use(express.static('build'));

// Handle the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.js')); 
  });

// Starting the server
app.listen(port,()=>{
    console.log(`Sever is up and it is running on port ${port}`);
});