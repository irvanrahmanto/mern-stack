const express = require('express');
const User = require('../models/index');

const router = express.Router();

router.get('/', (req, res) => {
    User.find({}, (err, data) => {
        res.json(data);
    });
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, data) => {
        res.json(data);
    });
});

router.delete('/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ 'Message': 'Deleted!' })
});

router.post('/', async (req, res) => {
    // user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });

    // user.save(() => {
    //     res.json(user);
    // });
    try {
        const { name, email, password } = req.body;
        const saved = await User.create({
            name, email, password
        })
        if (!saved) {
            throw new Error("error cuk")
        }

        res.json({ ...saved._doc })
    } catch (error) {
        res.json({ "message": "error" })
    }

});

router.patch('/:id', async (req, res) => {
    // try {
    //     await User.findByIdAndUpdate(req.params.id, req.body);
    //     res.json({ 'Message': 'Updated!' })
    // }

    try {
        // const { name, email, password } = req.body;
        const saved = await User.updateOne({ _id: req.params.id }, req.body)
        if (!saved) {
            throw new Error("error cuk")
        }
        console.log(saved)

        res.json({ 'message': 'updated!' })
    } catch (error) {
        res.status(500).json({ "message": "error" })
    }
});

module.exports = router;

