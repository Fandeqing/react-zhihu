const whiteList = ['http://localhost:3000']

module.exports = (req, res, next) => {
    const origin = req.get('Origin');
    if (origin) {
        const allowOrigin = whiteList.find(url => origin.indexOf(url) !== -1)
        if (allowOrigin) {
            res.header("Access-Control-Allow-Origin", origin);
            res.header("Access-Control-Allow-Headers", "Content-Type");
            res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT");
        }
    }
    next();
}