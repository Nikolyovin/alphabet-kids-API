import express from 'express'

const app = express()
const port = 3000

const letters = [
  {id: 1, name: 'A', voice: 'voice-A', words: 'words-A'},
  {id: 2, name: 'B', voice: 'voice-B', words: 'words-B'},
  {id: 3, name: 'C', voice: 'voice-C', words: 'words-C'},
  {id: 4, name: 'D', voice: 'voice-D', words: 'words-D'},
  {id: 5, name: 'E', voice: 'voice-E', words: 'words-E'},
]

app.get('/letters', (req, res) => {
  res.json(letters)
})

app.get('/letters/:id', (req, res) => {
    res.json(letters.find(item => item.id === +req.params.id))
  })

  app.post('/samurais', (req, res) => {
    res.send('we create samurai')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})