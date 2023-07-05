const { verifyToken } = require('../helper/jwt-generator')
const { User } = require('../models/index')

async function authentication(req, res, next) {
    console.log('authentication');
    try {
        const { access_token } = req.headers;

        if (!access_token) {
            throw {name: 'UnaunthenticatedToken',}
        }

        const payload = verifyToken(access_token)

        let user = {}
        user = await User.findOne({where: {id: payload.id} });

        if (!user) {
            throw {name: 'UnaunthenticatedToken',}
        }

        req.addtionalData = {
            UserId: user.id,
        }

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authentication