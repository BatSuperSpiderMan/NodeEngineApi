var express = require('express');
var router = express.Router();
const mongoose = require("mongoose")
const Market = require('../models/market');

router.get('/', async (req, res) => {
    try{
        const markets = await Market.find();

        res.send(markets);
    }
    catch{
        res.send({ error: "Error connecting to DB!" })
    }
});

router.get('/:id', async (req, res) => {
    try{
        const market = await Market.findOne('_id',req.params.id);

        res.send(market);
    }
    catch{
        res.send({ error: "Error connecting to DB!" })
    }
});

router.post('/create', async (req, res) => {
    var market = new Market({
        name: req.body.name,
        defaultproductpricing:req.body.defaultpricing,
        date: new Date()
    });

    await market.save();
    res.send(market);
});

router.post('/:id/addproducts', async(req, res) => {
    const market = await Market.findOne('_id',req.params.id);
    if(req.body.products)
    {
        market.defaultproductpricing = req.body.products;
        await market.save();
    }

    res.send(market)
});

/* GET market listing. */
router.delete('/delete/:id', async (req, res) => {
    try{
        const market = await Market.deleteOne(req.params.id);

        market.tradeposts.forEach(async element => {
            await element.deleteOne(element.id);
        });

        res.send(market);
    }
    catch{
        res.send({ error: "Market not found!" })
    }
});

module.exports = router;
