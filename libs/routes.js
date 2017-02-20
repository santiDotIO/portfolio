let Routes = {};

Routes.main = function (req, res) {
	console.log(new Date(), req.url)
	return res.render('index');
}

module.exports = Routes;