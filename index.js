
const express = require('express');
const cors = require('cors');
const app = express();
const xml = require('xml');

// const os = require('os');
const bodyParser = require('body-parser');
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//import json file
const fs = require('fs');
const rawProducts = fs.readFileSync('products.json')
const rawUsers = fs.readFileSync('users.json')
const rawCart = fs.readFileSync('cart.json')
const rawInventory = fs.readFileSync('inventory.json')

const products = JSON.parse(rawProducts)
const users = JSON.parse(rawUsers)
const cart = JSON.parse(rawCart)
const inventory = JSON.parse(rawInventory)

app.get('/', (req, res) => {
    res.send("demo days")
})

app.get('/products', (req, res) => {
    res.send(products)
})
app.get('/marketing-promos', (req, res) => {
    res.json({ "promo-name": "3.3", "start": "2024-03-03T00:00:01.511Z", "end": "2024-03-04T00:00:01.511Z", "discount": 50 })
})
app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId
    const objWithIdIndex = users.findIndex(x => x.uid === parseInt(userId))
    if (objWithIdIndex > -1) {
        res.send(users[objWithIdIndex])
    }
    else {
        res.send('userId not found')
    }
})
app.get('/shoping-cart/:userId', (req, res) => {
    const userId = req.params.userId
    const objWithIdIndex = cart.findIndex(x => x.uid === parseInt(userId))
    if (objWithIdIndex > -1) {
        res.send(cart[objWithIdIndex])
    }
    else {
        res.send('cart not found')
    }
})
app.get('/products/:productId', (req, res) => {
    const productId = req.params.productId
    const objWithIdIndex = products.findIndex(x => x.id === productId)
    if (objWithIdIndex > -1) {
        res.send(products[objWithIdIndex])
    }
    else {
        res.send('cart not found')
    }
})
app.get('/inventory/:productId', (req, res) => {
    const productId = req.params.productId
    const objWithIdIndex = inventory.findIndex(x => x.id === productId)
    if (objWithIdIndex > -1) {
        res.send(inventory[objWithIdIndex])
    }
    else {
        res.send('cart not found')
    }
})
app.get('/xml', (req, res) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
                <inventory>
                    <id>123</id>
                    <quantity>20</quantity>
                </inventory>`

    res.header('Content-Type', 'text/xml');
    res.send(xml);
})

app.get('/headers', (req, res) => {
    const headers = req.headers
    res.send(headers);
})
app.post('/body', (req, res) => {
    const body = req.body
    res.send(body);
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});