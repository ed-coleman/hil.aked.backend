const express = require("express");
const router = express.Router();
const Event = require('../models/Event.model')


// fetch all events

router.get('/events', async (req, res, next) => {
  try {
    const allEvents = await Event.find()
    res.status(200).json(allEvents)
    console.log('events fetched successfully: ', allEvents)
  } catch (error) {
    res.json(error.status)
    console.log(error.status)
  }
})

// fetch all events by date

router.get('/events/date/:date', async (req, res) => {
  try {
    const allEvents = await Event.find({date: req.params.date})
    res.status(200).json(allEvents)
  } catch (error) {
    console.log(error)
  }
})

// fetch all events in a city 

router.get('/events/city/:city', async (req, res) => {
  try {
    const allEvents = await Event.find({city: req.params.city})
    res.status(200).json(allEvents)
  } catch (error) {
    console.log(error)
  }
})

// fetch one event by ID

router.get('/events/:id', async (req, res) => {
  try {
      const selectedEvent = await Event.findById(req.params.id)
      res.status(200).json(selectedEvent)
  } catch (error) {
      console.log(error)
  }
})

// add a new event

router.post('/events', async (req, res, next) => {
  const body = req.body
  console.log(req.body)
  try {
    const event = await Event.create({...body})
    console.log(event)
    res.json(event)
  } catch (error) {
    console.log(error)
  }
})

// update an event 

router.put('/events/update/:id', async (req, res) => {
  const body = req.body
  const selectedEvent = req.params.id
  try{
    const updatedEvent = await Event.findByIdAndUpdate(selectedEvent, body, {new: true})
    res.json(updatedEvent)
  } catch (error) {
    console.log(error)
  }
})

// delete an event 

router.delete('/events/delete/:id', async (req,res) => {
  try {
  const deletedEvent = await Event.findByIdAndDelete(req.params.id)
  res.status(200).json("Event has been deleted")
  } catch (error) {
    console.log(error)
  }
})





module.exports = router;
