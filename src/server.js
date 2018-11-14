import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser';

import config from './config'
import openDatabase from './util/openDatabase'
import routes from './routes'

const props = {
  ip: config.get('ip'),
  port: config.get('port'),
  dbUrl: config.get('db.url')
}
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'))

const startApp = confg =>
  app.listen(confg.port, confg.ip, () => console.log(`Express Running ${confg.ip}:${confg.port}`))

openDatabase(props.dbUrl)
  .then(() => {
    app.use('/', routes)
    startApp(props)
  })
  .catch(console.log)
