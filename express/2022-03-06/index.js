import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { engine } from 'express-handlebars'
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


//Routeris

app.get('/admin', function (req, res) {
  res.redirect('/templates/admin.html')
  return
})

app.get('/', function (req, res) {
  if (req.query.login === "admin@inv.lt" &&
    req.query.password === "1234") {
    console.log(req.query.login)
    res.redirect('http://localhost:3000/administratorius')
    return
  }
  if (Object.keys(req.query).length > 0) {
    console.log(req.query)
    res.redirect('http://localhost:3000')
    return
  }

  res.sendFile(__dirname + '/templates/index.html')

  // app.get('/:vardas/:pavarde/:adresas/:telefonas/:elpastas', function (req, res) {
  //   res.render('persons', {
  //     vardas: req.query.vardas,
  //     pavarde: req.query.pavarde,
  //     adresas: req.query.adresas,
  //     telefonas: req.query.telefonas,
  //     elpastas: req.query.elpastas
  //   })
  // })

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
})

app.listen(3000) //Nurodomas portas ir inicijuojamas serveris
