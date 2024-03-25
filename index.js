import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'
const app = express();
const port = 3000;
import routes from './routes/index.js'
app.use(cors())


app.get("/", (req, res) => {
    res.send("Express on Vercel");
    console.log("hi")
});
app.use(bodyParser.json());
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

app.use('/', routes)


