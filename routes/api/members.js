const express = require('express');
const router = express.Router();
const members = require('../../Members');

// Gets All Members
router.get('/', (req, res) => {
    res.json(members);
});

// Get Member
router.get('/:id', (req, res) => {
    const found = members.some(m => m.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(m => m.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `Member with id ${req.params.id} not found`});
    }
});

// Post Member
router.post('/', (req, res) => {
    
});

module.exports = router;