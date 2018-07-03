// Dependencies
var fs = require('fs')
var request = require('request')
var express = require('express')
const download = require('image-downloader')

// Server Init
var app = express()
var serverPort = 6029
var bodyParser = require('body-parser')
// var server = require('http').Server()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set router
var express = require('express')

var router = express.Router()

router.post('/save-instagram-pic', (req, res) => {
    console.log(req.body)
    download.image({
            url: req.body.url,
            dest: __dirname + '/storage/image.jpeg'
        }).then(({ filename, image }) => {
            console.log('File saved to', filename)
            uploadInstagram(filename, req.body.caption, req.body.user, req.body.password).then(() => {
                res.json({ message: 'posted', success: true })
            }).catch(err => {
                res.json({ message: 'error', success: false })
            })
        })
        .catch((err) => {
            console.error(err)
            res.json({ message: 'error' , success: false})
        })

})

var uploadInstagram = function(filename, caption, user, password) {
    return new Promise((resolve, reject) => {
        var Client = require('instagram-private-api').V1
        var device = new Client.Device(user)
        var storage = new Client.CookieFileStorage(__dirname + '/cookies/'+user+'.json')

        Client.Session.create(device, storage, user, password).then(function(session) {
            Client.Upload.photo(session, filename)
            	.then(function(upload) {
            		return Client.Media.configurePhoto(session, upload.params.uploadId, caption);
            	})
            	.then(function(medium) {
            		console.log(medium.params)
                    if (medium.params.id) {
                        resolve()
                    } else {
                        reject()
                    }
            	})
        })
    })
}

// Set CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', router);

app.listen(serverPort)
console.log('Magic happens on port ' + serverPort);
