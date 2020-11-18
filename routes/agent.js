var express = require('express');
var router = express.Router();
const mongoose = require("mongoose")
const TradePost = require('../models/tradepost');
const Product = require('../models/products');
const Agent = require('../models/agents');

/* GET agent list. */
router.get('/', async (req, res) => {
    try{
        const agents = await Agent.find();

        res.send(agents);
    }
    catch{
        res.send({ error: "Error connecting to DB!" })
    }
});

router.post('/create', async (req, res) => {
    var agent = new Agent({
        name: req.body.name,
        balance: req.body.balance,
        tradepost: req.body.tradeosts,
        products: req.body.products,
        date: new Date()
    });

    await agent.save();
    res.send(agent);
});

/* GET tradepost listing. */
router.get('/:id', async (req, res) => {
    try{
        const agent = await Agent.findById(req.params.id);

        res.send(agent);
    }
    catch{
        res.send({ error: "Agent not found!" })
    }
});

/* GET tradepost listing. */
router.delete('/delete/:id', async (req, res) => {
    try{
        const agent = await Agent.deleteOne(req.params.id);
        
        res.send(agent);
    }
    catch{
        res.send({ error: "Agent not found!" })
    }
});

/* Buy products. */
router.put('/buy/:id/product/', async (req, res) => {
    try{
        const agent = await Agent.findOne('_id',req.params.id);
        var product;

        if(req.body.prodid)
        {
            product = await Product.findOne('_id',req.params.prodid);

            if(agent.products[req.body.prodid])
            {
                product = agent.products.find(prod => {
                    return prod.productid === req.body.prodid;
                });

                product.units = product.units + req.body.units;
                agent.products.splice(product.id, 1, product)
            }
            else
            {
                agent.products.put({
                    productid : product.id,
                    units : req.body.units,
                    price: req.body.price, //debited from agent
                    date: new Date()
                })
            }
        }

        agent.balance = agent.balance - (req.body.price * req.body.units);
        res.send(agent);
    }
    catch{
        res.send({ error: "Trade post not found!" })
    }
});

/* Sell products. */
router.put('/sell/:id/product/', async (req, res) => {
    try{
        const agent = await Agent.findOne('_id',req.params.id);
        var product;

        if(req.body.prodid)
        {
            product = await Product.findOne('_id',req.params.prodid);

            if(agent.products[req.body.prodid])
            {
                product = agent.products.find(prod => {
                    return prod.productid === req.body.prodid;
                });

                product.units = product.units - req.body.units;
                agent.products.splice(product.id, 1, product)
            }
            else
            {
                agent.products.put({
                    productid : product.id,
                    units : req.body.units,
                    price: req.body.price, //credited to agent
                    date: new Date()
                })
            }
        }

        agent.balance = agent.balance + (req.body.price * req.body.units);
        res.send(agent);
    }
    catch{
        res.send({ error: "Trade post not found!" })
    }
});

module.exports = router;
