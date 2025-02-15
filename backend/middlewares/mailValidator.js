module.exports = (req, res, next) => {
    const email = req.body.email
    const emailRegex = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$');
    let emailValid = emailRegex.test(email)
    emailValid ? next() : res.status(400).json({ message: 'Champs email non valide' });
};