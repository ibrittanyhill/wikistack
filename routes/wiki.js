const express = require('express');
const router = express.Router();
const  addPage = require('../views/addPage')
const main = require('../views/main');
const indexOutput = require("../models");

router.get('/add', (req, res) => {
  res.send(addPage())
})

router.get('/:post', (req, res) => {
  res.send(main(''))
})

router.post('/add', async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const page = new indexOutput.Page({
    title: title,
    content: content
  });
  console.log(page);

  try {
    await page.save();
    res.redirect(main(''));
  } catch (error) { next(error) }
})

module.exports = router;
