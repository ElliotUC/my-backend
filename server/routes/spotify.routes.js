const express = require('express');
const router = express.Router();

const searchAlbumController = require('../controllers/searchAlbum.controller');

router.get('/', searchAlbumController.getAlbumBySearch);

module.exports = router;