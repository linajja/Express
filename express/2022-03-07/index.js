import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { engine } from 'express-handlebars'
import { faker } from '@faker-js/faker'
import session from 'express-session'
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 86400000
  }
}))

//Routeris

app.get('/', function (req, res) {
  if (Object.keys(req.query).length > 0) {
    res.render('login', {
      pirma: req.query.vardas,
      antra: req.query.pavarde,
      trecia: req.query.adresas,
      ketvirta: req.query.telefonas,
      penkta: req.query.email
    })
    return
  }
  res.sendFile(__dirname + '/templates/index.html')
})

app.get('/login', function (req, res) {
  if (req.query.login != '' &&
    req.query.password != '' &&
    req.query.login === "admin@inv.lt" &&
    req.query.password === "1234") {
    req.session.loggedIn = true;
    req.session.userName = "admin@inv.lt";
    res.redirect('http://localhost:3000/people')
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


let zmones = []
app.get('/people', function (req, res) {

  // req.session.destroy()

  if (req.session.loggedIn) {

    for (let i = 0; i < 100; i++) {
      zmones.push(
        {
          name: faker.name.firstName(),
          surname: faker.name.lastName(),
          adress: faker.address.cityName(),
          phone: faker.phone.phoneNumber(),
          email: faker.internet.email()

        }
      )
      res.render('people', { zmones, user: req.session.userName })
    }
  } else {
    res.redirect('/login')
  }
})


app.listen(3005) //Nurodomas portas ir inicijuojamas serveris
