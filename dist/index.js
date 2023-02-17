"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUSES = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Letter_1 = __importDefault(require("./models/Letter"));
const app = (0, express_1.default)();
const PORT = 3000;
const DB_URL = 'mongodb://localhost:27017/alphabet';
exports.HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
//подключаем josn парсер, нужен чтобы преобразовывать body, без него посты работать не будут
// !!!!Важно, после установки этого middleware в postman content-type : application/json
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
const db = {
    letters: [
        { id: 1, name: 'A', voice: 'voice-A', words: 'words-A' },
        { id: 2, name: 'B', voice: 'voice-B', words: 'words-B' },
        { id: 3, name: 'C', voice: 'voice-C', words: 'words-C' },
        { id: 4, name: 'D', voice: 'voice-D', words: 'words-D' },
        { id: 5, name: 'E', voice: 'voice-E', words: 'words-E' }
    ]
};
//примечание в типе Request, первый {uri параметры}, второй {response}, третий {request.body}, четвертый {query params}
//получаем все либо фильтруем по query параметрам
app.get('/letters', (req, res) => {
    let foundLetters = db.letters;
    if (req.query.name) {
        // для фильтрации с ui предусматриваем query параметр. indexOf возвращает индекс совпадения строки, если нет то -1
        foundLetters = foundLetters.filter(c => c.name.indexOf(req.query.name) > -1); //пока что не нужна на бэке фильтрация по имени
    }
    res.json(foundLetters);
});
//получаем по id из uri параметров
app.get('/letters/:id', (req, res) => {
    //id: string, потому что query param
    const foundLetter = db.letters.find(item => item.id === +req.params.id);
    if (!foundLetter) {
        res.sendStatus(exports.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.json(foundLetter);
});
app.post('/letters', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, voice, image, words } = req.body;
        if (!name || !voice || !words || !image) {
            console.log('error');
            res.sendStatus(exports.HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }
        const letter = yield Letter_1.default.create({ name, voice, image, words });
        res.status(exports.HTTP_STATUSES.CREATED_201).json(letter);
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
    // const createdLetter = {
    //   id: +(new Date()),
    //   name: req.body.name,
    //   voice: req.body.voice,
    //   words: req.body.words,
    // }
    // db.letters.push(createdLetter)
}));
app.delete('/letters/:id', (req, res) => {
    db.letters = db.letters.filter(item => item.id !== +req.params.id);
    res.sendStatus(exports.HTTP_STATUSES.NO_CONTENT_204);
});
app.put('/letters/:id', (req, res) => {
    // if (!req.body.name || !req.body.voice || !req.body.words) {
    //   res.sendStatus(400)
    //   return
    // }
    const foundLetter = db.letters.find(item => item.id === +req.params.id);
    if (!foundLetter) {
        res.sendStatus(exports.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    if (req.body.name)
        foundLetter.name = req.body.name;
    if (req.body.voice)
        foundLetter.voice = req.body.voice;
    if (req.body.words)
        foundLetter.words = req.body.words;
    res.json(foundLetter);
});
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
function startApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            mongoose_1.default.connect(DB_URL);
            app.listen(PORT, () => console.log('SERVER STARTED ON PORT' + PORT));
        }
        catch (e) {
            console.log(e);
        }
    });
}
startApp();
