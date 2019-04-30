const aboutPage = (req, res) => res.render('about', { csrfToken: req.csrfToken() });

const subPage = (req, res) => res.render('subscription', { csrfToken: req.csrfToken() });

const tipsPage = (req, res) => res.render('tips', { csrfToken: req.csrfToken() });

module.exports.aboutPage = aboutPage;
module.exports.subPage = subPage;
module.exports.tipsPage = tipsPage;
