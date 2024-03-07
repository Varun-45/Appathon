const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const port = 3000;
app.use(cors())

mongoose.connect('mongodb+srv://varunmalpanivm01:RRDlp5VtFNAqmrSo@cluster0.mmhfpfw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.get("/", (req, res) => {
    res.send("Express on Vercel");
    console.log("hi")
});

const userSchema = new mongoose.Schema({
    username: String,
    otp: String,
    phoneNo: String,
    address: String
});
const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());


app.post('/signup', async (req, res) => {
    const { username, otp, phoneNo, address } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Create a new user
        const newUser = new User({ username, otp, phoneNo, address });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.post('/login', async (req, res) => {
    const { username, otp } = req.body;

    try {
        // Find the user in the database
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Successful login
        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
