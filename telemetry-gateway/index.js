const express = require('express')
const dotenv = require('dotenv');

dotenv.config();

const asyncHandler = require('./async-handler')
const {connectToDB, Transport} = require('./mongo')



const app = express()
const port = 3010

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Telemetry Gateway is working')
})

app.post('/handle', asyncHandler(async (req, res) => {
    const { lat, lon, carId } = req.body;

    const transport = await Transport.findById(carId);
    if (!transport) {
        console.log(`Transport not found, ${{id: carId}}`)
        res.send({
            success: false,
            carId
        })
        return;
    }
    
    transport.coordinates = {
        lat, lon
    }
    
    await transport.save()
    res.send({
        success: true,
        carId
    })
}))

app.listen(port, () => {
  connectToDB()
  console.log(`Example app listening on port ${port}`)
})