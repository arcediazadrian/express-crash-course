const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');

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
        res.status(400).json({ msg: `Member with id ${req.params.id} not found` });
    }
});

// Post Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include a name and email' });
    }

    members.push(newMember);
    res.json(members);
    // res.redirect('/');
});

// Update member
router.put('/:id', (req, res) => {
    const found = members.some(m => m.id === parseInt(req.params.id));

    if (found) {
        const updateMember = req.body;
        members.forEach(m => {
            if (m.id === parseInt(req.params.id)) {
                m.name = updateMember.name ? updateMember.name : m.name;
                m.email = updateMember.email ? updateMember.email : m.email;

                res.json({ msg: 'Member was updated', member: m });
            }
        });
    } else {
        res.status(400).json({ msg: `Member with id ${req.params.id} not found` });
    }
});

// Delete member
router.delete('/:id', (req, res) => {
    const found = members.some(m => m.id === parseInt(req.params.id));

    if (found) {
        res.json({ msg: 'Member deleted', members: members.filter(m => m.id !== parseInt(req.params.id)) });
    } else {
        res.status(400).json({ msg: `Member with id ${req.params.id} not found` });
    }
});

module.exports = router;