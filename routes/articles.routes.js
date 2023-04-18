const express = require("express");
const router = express.Router();
const Article = require('../models/Article.model')


// fetch all articles

router.get('/work', async (req, res) => {
    try {
        const allArticles = await Article.find()
        res.status(200).json(allArticles)
        console.log('all articles fetched successfully: ', allArticles)
    } catch (error) {
        console.log(error)
    }
})

// fetch all articles by year

router.get('/work/year/:year', async (req, res) => {
    try {
      const allArticles = await Article.find({year: req.params.year})
      res.status(200).json(allArticles)
    } catch (error) {
      console.log(error)
    }
  })

  // fetch all articles by publisher

  router.get('/work/published/:published', async (req, res) => {
    try {
      const allArticles = await Article.find({published: req.params.published})
      res.status(200).json(allArticles)
    } catch (error) {
      console.log(error)
    }
  })

// fetch one article by ID 

router.get('/work/:id', async (req, res) => {
    try {
        const selectedArticle = await Article.findById(req.params.id)
        res.status(200).json(selectedArticle)
    } catch (error) {
        console.log(error)
    }
})


// add article 

router.post('/work', async (req, res) => {
const body = req.body
console.log(req.body)
try {
    const article = await Article.create({...body})
    console.log(article)
    res.json(article)
} catch (error) {
    console.log(error)
}
})

// update an article 

router.put('/work/update/:id', async (req, res) => {
    const body = req.body
    const selectedArticle = req.params.id
    try{
      const updatedArticle = await Event.findByIdAndUpdate(selectedArticle, body, {new: true})
      res.json(updatedArticle)
    } catch (error) {
      console.log(error)
    }
  })
  
  // delete an article 
  
  router.delete('/work/delete/:id', async (req,res) => {
    try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id)
    res.status(200).json("Article has been deleted")
    } catch (error) {
      console.log(error)
    }
  })

  
  

module.exports = router




