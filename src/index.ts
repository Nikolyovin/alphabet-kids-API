import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import { LetterCreateModel } from './models/CreateLetterModel'
import { LetterViewModel } from './models/LetterViewModel'
import { QueryLetterModel } from './models/QueryLetterModel'
import { LetterUpdateModel } from './models/UpdateLetterModel'
import { URIParamsLetterIdModel } from './models/URIParamsLetterIdModel'
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from './types'

const app = express()

const PORT = 3000

const DB_URL = 'mongodb://localhost:27017/alphabet'


export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,
  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404
}

//подключаем josn парсер, нужен чтобы преобразовывать body, без него посты работать не будут
// !!!!Важно, после установки этого middleware в postman content-type : application/json
const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

type LetterType = {
  id: number
  voice: string
  name: string
  words: string
}

const db: {letters: LetterType[]}  = {
  letters :[
    {id: 1, name: 'A', voice: 'voice-A', words: 'words-A'},
    {id: 2, name: 'B', voice: 'voice-B', words: 'words-B'},
    {id: 3, name: 'C', voice: 'voice-C', words: 'words-C'},
    {id: 4, name: 'D', voice: 'voice-D', words: 'words-D'},
    {id: 5, name: 'E', voice: 'voice-E', words: 'words-E'},
]}

//примечание в типе Request, первый {uri параметры}, второй {response}, третий {request.body}, четвертый {query params}

//получаем все либо фильтруем по query параметрам
app.get('/letters', (req: RequestWithQuery<QueryLetterModel>, res: Response<LetterViewModel[]>) => {
  let foundLetters = db.letters
  if (req.query.name) {
    // для фильтрации с ui предусматриваем query параметр. indexOf возвращает индекс совпадения строки, если нет то -1
    foundLetters=foundLetters.filter(c => c.name.indexOf(req.query.name as string) > -1) //пока что не нужна на бэке фильтрация по имени
  }
  
  res.json(foundLetters)
})
//получаем по id из uri параметров
app.get('/letters/:id', (req: RequestWithParams<URIParamsLetterIdModel>, res: Response<LetterViewModel>) => {                  //id: string, потому что query param 
    const foundLetter = db.letters.find(item => item.id === +req.params.id)

    if (!foundLetter){
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
      return
    }

    res.json(foundLetter)
})

app.post('/letters', (req: RequestWithBody<LetterCreateModel>, res: Response<LetterCreateModel>) => {
    
  if (!req.body.name || !req.body.voice || !req.body.words) {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
      return
}
    
  const createdLetter = {
    id: +(new Date()),
    name: req.body.name,
    voice: req.body.voice,
    words: req.body.words,
  }

  db.letters.push(createdLetter)

  res.status(HTTP_STATUSES.CREATED_201).json(createdLetter)
})

app.delete('/letters/:id', (req: RequestWithParams<URIParamsLetterIdModel>, res) => {
  db.letters = db.letters.filter(item => item.id !== +req.params.id)

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

app.put('/letters/:id', (req: RequestWithParamsAndBody<URIParamsLetterIdModel, LetterCreateModel>, res: Response<LetterUpdateModel>) => {
  // if (!req.body.name || !req.body.voice || !req.body.words) {
  //   res.sendStatus(400)
  //   return
  // }

  const foundLetter = db.letters.find(item => item.id === +req.params.id)

  if (!foundLetter){
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
  }

  if (req.body.name) foundLetter.name = req.body.name
  if (req.body.voice) foundLetter.voice = req.body.voice
  if (req.body.words) foundLetter.words = req.body.words

  res.json(foundLetter)
})


// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

async function startApp(){
  try{
      mongoose.connect(DB_URL)
      app.listen(PORT, () => console.log('SERVER STARTED ON PORT' + PORT))
  }catch(e){
      console.log(e);
  }
}

startApp()  