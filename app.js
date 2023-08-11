import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

// import movies from './movies.json' with { type: 'json' } todavía no se soporta

// como leer un json en ESModules
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

// como leer un json en ESModules recomendado por ahora
// import { createRequire} from 'node:module'
// const require = createRequire(import.meta.url)
// const movies = require('./movies.json')

const app = express()

app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')
app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
