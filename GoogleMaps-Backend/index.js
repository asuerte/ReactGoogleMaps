const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const googlePlace = require('place-search-sdk')

const app = express()
const client = new googlePlace('AIzaSyCMvYtSxM7u76SEYbtTYTjdIiNYrDNv9wQ')

const restaurantDetails = {
    name: "",
    rating: "",
    address: "",
    phoneNumber: "",
    website: "",
    photos: "",
    opening_hours: "",
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

app.get("/detail", (req, res) => {
    const lat = req.query.lat
    const lng = req.query.lng
    async function searchForDetails() {
        try {
            const nearByResult = await client.nearBySearch({ geoCode: { lat: lat, lng: lng }, searchType: 'restaurant' })
            restaurantDetails.name = nearByResult[0].name
            restaurantDetails.rating = nearByResult[0].rating
            restaurantDetails.address = nearByResult[0].address

            const photoResult = await client.getPlaceImage(nearByResult[0].photo_reference)
            restaurantDetails.photos = photoResult

            const placeDetailsResult = await client.getPlaceDetails(nearByResult[0].placeId)
            restaurantDetails.phoneNumber = placeDetailsResult.phoneNumber
            restaurantDetails.website = placeDetailsResult.website
            restaurantDetails.opening_hours = placeDetailsResult.opening_hours

            res.send(restaurantDetails)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    searchForDetails()
})

app.listen(8080, () => {
    console.log("Server started on port 8080!")
})