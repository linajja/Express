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


app.get('/admin', function (req, res) {
  res.redirect('/templates/admin.html')
  return
})


app.get('/login', function (req, res) {

  let info = "";
  if (Object.keys(req.query).length > 0) {

    if (req.query.login != '' &&
      req.query.password != '' &&
      req.query.login === "admin@inv.lt" &&
      req.query.password === "1234") {
      req.session.loggedIn = true;
      req.session.userName = "admin@inv.lt";

      res.redirect('http://localhost:3005/people')
      return
    } else {
      info = "Neteisingas el. pašto adresas arba slaptažodis"

    }
  }
  res.render('login', { info })
})

let zmones = []
app.get('/people', function (req, res) {

  // req.session.destroy()

  if (req.session.loggedIn) {

    for (let i = 0; i < 100; i++) {
      let adress = faker.address.streetAddress() + ', ' +
        faker.address.city() + ', ' +
        faker.address.country()
      zmones.push(
        {
          name: faker.name.firstName(),
          surname: faker.name.lastName(),
          adress: adress,
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
