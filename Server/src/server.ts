import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'

import { appRoutes } from './routes'
import { notificationRoutes } from './notifications-routes'

const app = fastify()

app.register(cors)
app.register(appRoutes)
app.register(notificationRoutes)

app
  .listen({
    port: Number(process.env.PORT) || 3333,
    host: process.env.HOST || '0.0.0.0',
  })
  .then(() => {
    console.log('Server Running 🚀')
  })
