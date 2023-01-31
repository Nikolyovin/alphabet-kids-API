import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Niko!')
})

app.get('/samurais', (req, res) => {
    res.send('Hello samurais!')
  })

  app.post('/samurais', (req, res) => {
    res.send('we create samurai')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})