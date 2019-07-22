const express = require('express');
const router = express.Router();

router.get('/', (req, resp) => {
    resp.render( 'home' );
});

router.get('/station.htm', (req, resp) => {
    resp.render('station');
});

router.get('/player', (req, resp) => {
    resp.render('player');
})

router.get("/music_player", (res, resp) => {
    resp.render("music_player");
})
module.exports = router;