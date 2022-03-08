import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { engine } from 'express-handlebars'
import { faker } from '@faker-js/faker'
import session from 'express-session'
import multer from 'multer'

const app = express()
const upload = multer({ dest: 'uploads/' })
const __dirname = dirname(fileURLToPath(import.meta.url))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.urlencoded({
  extended: false
}))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 86400000
  }
}))

//Routeris


app.get('/login', function (req, res) {
  let info = req.query.info
  if (req.session.loggedIn === true) {
    res.redirect('http://localhost:3005/people')
    return
  }
  res.render('login', { info })

})


app.get('/login', function (req, res) {

  let info = "Įveskite prisijungimo duomenis";

  if (Object.keys(req.body).length > 0) {

    if (req.body.login != '' &&
      req.body.password != '' &&
      req.body.login === "admin@inv.lt" &&
      req.body.password === "1234") {

      req.session.loggedIn = true;
      req.session.userName = "admin@inv.lt";

      res.redirect('http://localhost:3005/people')
      return
    } else {
      info = "Neteisingas el. pašto adresas arba slaptažodis"

    }
  }
  res.redirect('http://localhost:3005/login/?info=' + info)

})

// app.post('/login', function (req, res) {
//   console.log(req.body);
//   res.send('OK')
// })

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



app.post('/post-upload', upload.single('photo'), function (req, res) {
  console.log(req.file)
  if (req.body.post_title != '' &&
    req.body.post_content != '' &&
    req.body.date != '') {
    res.send(req.body)
    return
  } else {
    res.send('Užpildyti ne visi laukeliai')
    return
  }
})

// Atsijungimo nuoroda

app.get('/logout', function (req, res) {
  req.session.loggedIn = null
  req.session.userName = null
  res.redirect('/login')
})


app.listen(3005) //Nurodomas portas ir inicijuojamas serveris
