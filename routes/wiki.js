const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage')
const main = require('../views/main');

/* router.use(express.urlencoded({ extended: false }))
router.use(express.json()) */

router.get('/add', (req, res) => {
  res.send(addPage())
})

router.get('/:post', (req, res) => {
  res.send(main(''))
})

router.post('/add', (req, res) => {
  res.json(req.body)
})

module.exports = router;
