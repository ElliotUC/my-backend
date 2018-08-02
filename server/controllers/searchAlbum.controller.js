const searchAlbumController = {};

searchAlbumController.getAlbumBySearch = (req, res) => {
    res.json({
        status: 'Api Works in controller'
    });
}

module.exports = searchAlbumController;