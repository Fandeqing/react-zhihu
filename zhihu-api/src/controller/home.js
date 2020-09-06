
class HomeController {

    homeShow(req, res, next) {
        res.render('index', { title: 'Express' })
    }
}

module.exports = new HomeController();