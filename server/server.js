// ----- serwer odbierający dane i zapisujący je w bazie -----

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// baza danych 

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('emails.json')
const db = low(adapter)

// domyślna zawartość bazy

db.defaults({ emails: [], name: 'email-list', count: 0 })
    .write()


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
}
app.use(allowCrossDomain);

// ----- odebranie danych -----

app.post('', function (request, response) {
    var name = request.body.body.name;
    var email = request.body.body.email;

    // ----- wstawienie do bazy -----
    db.get('emails')
        .push({ name: name, email: email })
        .write()

    db.update('count', n => n + 1)
        .write()

    response.json('User added to database');
});

app.listen(3000, () => {
    console.log("Started on PORT 3000");
})
