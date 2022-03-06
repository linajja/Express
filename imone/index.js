import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

//Routeris
app.get('/', function (req, res) {
  //Req - Request Gaunama uzklausa
  //Res - Response, tai ka graziname atgal
  res.sendFile(__dirname + '/templates/index.html') //Nurodome grazinama turini atgal i narsykle
})

app.get('/:vardas', function (req, res) {
  let vardas = req.params.vardas
  res.send('<h1>' + vardas + '</h1>') //Nurodome grazinama turini atgal i narsykle
})

app.get('/:vardas/:pavarde/:adresas/:telefonas/:elpastas', function (req, res) {
  let vardas = req.params.vardas
  let pavarde = req.params.pavarde
  let adresas = req.params.adresas
  let telefonas = req.params.telefonas
  let elpastas = req.params.elpastas
  res.send('<h1>' + vardas + pavarde + adresas + telefonas + elpastas + '</h1>') //Nurodome grazinama turini atgal i narsykle
})

app.listen(3000) //Nurodomas portas ir inicijuojamas serveris
