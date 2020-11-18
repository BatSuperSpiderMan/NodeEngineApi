var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const market = require('../models/market');
const TradePost = require('../models/tradepost');

/* GET tradepost list. */
router.get('/', async (req, res) => {
    try{
        const tradeposts = await TradePost.find();

        res.send(tradeposts);
    }
    catch{
        res.send({ error: "Error connecting to DB!" })
    }
});

router.post('/create', async (req, res) => {
    var tradepost = new TradePost({
        market: req.body.market,
        name: req.body.name,
        products: [
            req.body.products
        ],
        date: new Date()
    });

    await tradepost.save();
    res.send(tradepost);
});

/* GET tradepost listing. */
router.get('/:id', async (req, res) => {
    try{
        const tradepost = await TradePost.findById(req.params.id);

        res.send(tradepost);
    }
    catch{
        res.send({ error: "Trade post not found!" })
    }
});

/* GET tradepost listing. */
router.delete('/delete/:id', async (req, res) => {
    try{
        const tradepost = await TradePost.deleteOne(req.params.id);
        
        res.send(tradepost);
    }
    catch{
        res.send({ error: "Trade post not found!" })
    }
});

/* GET tradepost listing. */
router.post('/assign/:id/market/:marketid', async (req, res) => {
    try{
        var markets
        const tradepost = await TradePost.findOne('_id',req.params.id);
        
        if(tradepost)
        {
            markets.put({
                marketid : req.params.marketid
            })
        }

        TradePost.update({ market : markets });
        res.send(tradepost);
    }
    catch{
        res.send({ error: "Trade post not found!" })
    }
});

module.exports = router;
