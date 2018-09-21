const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage')
const main = require('../views/main');
const wikiPage = require('../views/wikipage')
const indexOutput = require("../models");

router.get('/add', (req, res) => {
  res.send(addPage())
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
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }
})

/* router.get('/:post', (req, res) => {
  res.send(main(''))
})
 */
router.get('/:slug', async (req, res, next) => {
  try {
    const page = await indexOutput.Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    //res.json(page)
    res.send(wikiPage(page, 'Lily'))
  } catch (err) {
    next(err)
  }
});



module.exports = router;
