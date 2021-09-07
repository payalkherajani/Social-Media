const jwt = require('jsonwebtoken')
const User = require('../models/users.model')

const auth = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token, authorization denied' })
        }

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedToken.id;
        const id = req.user;

        const verifiedUser = await User.findOne({ _id: id });

        if (verifiedUser) {
            next();
        }
        else {
            return res.status(401).json({ message: 'Bad token, authorization denied' })
        }

    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

module.exports = auth