import express from 'express'
import mongoose from 'mongoose'
import graphqlHTTP from 'express-graphql'

import PlaceSchema from './graphql/schema/placeSchema'
import PlaceModel from './model/placeModel'

mongoose.Promise = global.Promise

const router = express.Router()

router.get('/places', graphqlHTTP(() => ({
  schema: PlaceSchema
})))

router.post('/places', (req, res) => {
  const { places } = req.body
  const promises = places.map(Place => new PlaceModel(Place).save())
  Promise.all(promises)
    .then(results => {
      res.send({
        status: true,
        data: results.length
      })
    })
    .catch(error => {
      res.send({
        status: false,
        error: error.message
      })
    })
})

export default router
