var express = require('express')

var router = express.Router()
router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' })
})

router.get('/save-instagram-pic', (req, res) => {
    res.json({ message: 'saveeee' })
})

router.get('/init-instagram', (res, req) => {
    var Client = require('instagram-private-api').V1
    var device = new Client.Device(login.user)
    var storage = new Client.CookieFileStorage(__dirname + '/cookies/'+login.user+'.json')

    Client.Session.create(device, storage, login.user, login.password).then(function(session) {
        // Now you have a session, we can follow / unfollow, anything...
        // And we want to follow Instagram official profile
        return [
            session,
            Client.Account.searchForUser(session, 'instagram')
        ]
    }).spread(function(session, account) {
        return Client.Relationship.create(session, account.id)
    }).then(function(relationship) {
        console.log(relationship.params)
        // {followedBy: ... , following: ... }
        // Yey, you just followed @instagram
    })
    console.log(storage)
})

export default router
