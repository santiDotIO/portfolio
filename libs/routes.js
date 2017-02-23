let Routes = {};

Routes.main = function (req, res) {
	console.log(new Date(), '/index')
	return res.render('index');
}

module.exports = Routes;