"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const db = {
    letters: [
        { id: 1, name: 'A', voice: 'voice-A', words: 'words-A' },
        { id: 2, name: 'B', voice: 'voice-B', words: 'words-B' },
        { id: 3, name: 'C', voice: 'voice-C', words: 'words-C' },
        { id: 4, name: 'D', voice: 'voice-D', words: 'words-D' },
        { id: 5, name: 'E', voice: 'voice-E', words: 'words-E' },
    ]
};
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
    const foundLetter = db.letters.find(item => item.id === +req.params.id);
    if (!foundLetter) {
        res.sendStatus(404);
        return;
    }
    res.json(foundLetter);
});
app.post('/samurais', (req, res) => {
    res.send('we create samurai');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
