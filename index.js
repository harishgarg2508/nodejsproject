const express = require("express");
const path = require("path");
const collection = require("./config");
const bcrypt = require('bcrypt');

const app = express();
// convert data into json format
app.use(express.json());
// Static file
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
//use EJS as the view engine
app.set("view engine", "ejs");  

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});
app.get("/login", (req, res) => {
    res.render("login");
});

// Register User
// Register User
app.post("/signup", async (req, res) => {
    try {
        const data = {
            name: req.body.username,
            password: req.body.password
        }

        // Check if the username already exists in the database
        const existingUser = await collection.findOne({ name: data.name });

        if (existingUser) {
            // alert("user already exists")
            
            return res.send('User already exists. Please choose a different username.');
        }

        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Replace the original password with the hashed one

        // Insert the user data into the database
        await collection.insertMany(data);

        console.log('User registered successfully:', data); // Log success

        res.send('User registered successfully!'); // Send confirmation message
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error"); // Handle server error
    }
});


// Login user 
// Login user 
// Login user 
// Login user
app.post("/login", async (req, res) => {
    try {
        console.log("Login Request:", req.body); // Log the entire request body
        const username = req.body.username;
        console.log("Username:", username); // Log the username separately
        const user = await collection.findOne({ name: username });
        console.log("User found in DB:", user); // Log the user found in the database

        if (!user) {
            return res.send("User not found");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        console.log("Password Match:", isPasswordMatch);

        if (!isPasswordMatch) {
            return res.send("Wrong password");
        }


        
        res.sendFile(path.resolve(__dirname, "../index.html")); // Send the index.html file located outside the current directory
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to handle contact form submission
// app.post('/contact', async (req, res) => {
//     try {
//       const { name, email, mobile, address } = req.body;
//       const contact = new Contact({
//         name,
//         email,
//         mobile,
//         address
//       });   
//       await contact.save();
//       res.status(200).json({ message: 'Contact saved successfully' });
//     } catch (error) {
//       console.error('Error saving contact:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });


// Define Port for Application
const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
}); 