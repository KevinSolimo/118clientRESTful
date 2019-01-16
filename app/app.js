/*
 * client: accetta le richieste dai vari utenti,
 * le invia al server REST sottoforma di richieste REST, aspetta le 
 * risposte dal server e le restituisce agli utenti
 * 
 * E' un server web che accetta le richieste dagli utenti e le inoltra
 * ad un altro server web e, una volta ricevute le risposte in formato JSON,
 * le invia agli utenti in formato html
 * 
 * utilizza il modulo node-rest-client da installare con
 * npm install node-rest-client --save
 * 
 */

var express = require('express');
var app = express();

app.set('views', './views');
app.set('view engine', 'pug');

var Client = require('node-rest-client').Client;
var client = new Client();

app.get('/', function (req, res) {
    res.render('operazioni', {message: 'web Service RESTful - seleziona l\'operazione da effettuare e inserisci le informazioni corrispondenti', title:'CRUD'});  
});

app.get('/execOp', function (req, res) {
    var operazione = req.query.operazione;
    switch (operazione) {
        case "create": // metodo POST
            var args = {
                data: {
                    anno: parseInt(req.query.cAnno), 
                    tipo: req.query.cTipo, 
                    codRosso: req.query.cRosso,
                    codGiallo: req.query.cGiallo,
                    codBianco: req.query.cBianco,
                    codVerde: req.query.cVerde,
                    },
                headers: { "Content-Type": "application/json" }
            };
            // Attenzione: usando codenvy, controllare sempre l'indirizzo:porta del server REST
            // perché cambia ad ogni sessione
            client.post("http://node27.codenvy.io:37105/insertInfo", args, function (data, response) {
                // data contiene le informazioni recuperate dal server REST
                // response contiene le informazioni riguardanti il protocollo HTTP
                if (data.n == 1)
                    res.render('risposta', {message: 'E\' stata inserita una nuova informazione'});
                else
                    res.render('risposta', {message: 'Problemi nell\'inserimento'});
            });
        break;
        case "read": // metodo GET
            var args = {};
            client.get("http://node27.codenvy.io:37105/infoAnno/"+ req.query.rAnno, args, function (data, response) { 
                res.render('elenco', {list: data});
            });
        break;
        case "update": // metodo PUT
            // inserire qui il codice
        break;
        case "delete": // metodo DELETE
            // inserire qui il codice
        break;
    }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
