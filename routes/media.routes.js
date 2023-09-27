const express = require("express");
const router = express.Router();
const Media = require('../models/Media.model')

// get all media items

router.get('/media', async (req, res) => {
    try {
        const allMedia = await Media.find()
        res.status(200).json(allMedia)
        console.log('all media fetched successfully: ', allMedia)
    } catch (error) {
        console.log(error)
    }
})

// fetch one media item by ID

router.get('/media/:id', async (req, res) => {
    try {
        const selectedMedia = await Media.findById(req.params.id)
        res.status(200).json(selectedMedia)
    } catch (error) {
        console.log(error)
    }
  })

  // add a media article

  router.post('/media', async (req, res, next) => {
    const body = req.body
    console.log(req.body)
    try {
      const media = await Media.create({...body})
      console.log(media)
      res.json(media)
    } catch (error) {
      console.log(error)
    }
  })
  
  // update media article 
 
  router.put('/media/update/:id', async (req, res) => {
    const body = req.body;
    const selectedMedia = req.params.id;
    try {
      const updatedMedia = await Media.findByIdAndUpdate(selectedMedia, body, { new: true });
      if (!updatedMedia) return res.status(404).send('Media not found');
      res.json(updatedMedia);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
  });
  
  // delete a media article
  
  router.delete('/media/delete/:id', async (req,res) => {
    try {
    const deletedMedia = await Media.findByIdAndDelete(req.params.id)
    res.status(200).json("Media has been deleted")
    } catch (error) {
      console.log(error)
    }
  })

  module.exports = router;