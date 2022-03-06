import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const app = express()
const _dirname = dirname(fileURLToPath(import.meta.url))

//Routeris
app.get('/', function (req, res) {
    //Req - Request Gaunama uzklausa
    //Res - Response, tai ka graziname atgal
    res.sendFile(__dirname + '/templates/index.html') //Nurodome grazinama turini atgal i narsykle
})

app.get('/:skaicius', function (req, res) {
    let skaicius = req.params.skaicius
    res.send('<h1>' + skaicius + '</h1>') //Nurodome grazinama turini atgal i narsykle
})

app.get('/:skaicius/:tekstas', function (req, res) {
    let skaicius = req.params.skaicius
    let tekstas = req.params.tekstas
    res.send('<h1>' + skaicius + tekstas + '</h1>') //Nurodome grazinama turini atgal i narsykle
})


app.listen(3000) //Nurodomas portas ir inicijuojamas serveris