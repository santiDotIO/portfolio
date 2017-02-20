let Middleware = {};

Middleware.redirectToTop = function(req, res, next) {
	if (req.url.length > 1) {
		console.log(new Date(), 'redirect', req.url)
		return res.status(301).redirect('/');
	}
	return next();
}

Middleware.prefixWWW = function(req, res, next) {
	const hasWWW = /^www/.test(req.headers.host)
	
	if (req.app.locals.isProd && hasWWW) {
		console.log(new Date(), 'prefix www')
		const properHost = `${req.protocol}://www.${req.hostname}${req.url}`;
		return res.redirect(properHost);
	}
	return next();
}

module.exports = Middleware