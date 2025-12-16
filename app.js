const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const {connectMongodb} = require('./services/dbService');
const clinicalRoutes = require('./routes/clinicalRoute');

const app = express();

app.use(cors({ origin: 'https://clinicial-trails-client.vercel.app', credentials: true}));
app.use(bodyParser.json());

app.use(express.json());
app.use('/api', clinicalRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
    try {
        await connectMongodb()
        console.log(`Server is Running Successfully in the Port  ${PORT}`);
        
    } catch (error) {
        console.error('Error while connecting to MongoDB:', error.message);
        process.exit(1); // Exit if MongoDB connection fails   
    }
})