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

// app.get('/', function (req, res) {
//   if (Object.keys(req.query).length > 0) {
//     res.render('login', {
//       pirma: req.query.vardas,
//       antra: req.query.pavarde,
//       trecia: req.query.adresas,
//       ketvirta: req.query.telefonas,
//       penkta: req.query.email
//     })
//     return
//   }
//   res.sendFile(__dirname + '/templates/index.html')
// })

app.get('/', function (req, res) {
  if (req.query.login != '' &&
    req.query.password != '' &&
    req.query.login === "admin@inv.lt" &&
    req.query.password === "1234") {
    res.redirect('http://localhost:3000/administratorius')
    return
  } else if (req.query.login != '' &&
    req.query.password != '' &&
    req.query.login != "admin@inv.lt" &&
    req.query.password != "1234") {
    let info = "Neteisingas el. pašto adresas arba slaptažodis"
    res.render('person', { info })
    return
  } else {
    res.redirect('http://localhost:3000')
    return
  }
})

app.get('/:vardas', function (req, res) {
  let pirma = req.params.vardas
  res.send('<h1>' + pirma + '</h1>') //Nurodome grazinama turini atgal i narsykle
})

app.get('/:pirma/:antra/:trecia/:ketvirta/:penkta', function (req, res) {
  let pirma = req.params.pirma
  let antra = req.params.antra
  let trecia = req.params.trecia
  let ketvirta = req.params.ketvirta
  let penkta = req.params.penkta
  res.render('login', { pirma, antra, trecia, ketvirta, penkta }) //Nurodome grazinama turini atgal i narsykle
})

app.listen(3000) //Nurodomas portas ir inicijuojamas serveris
