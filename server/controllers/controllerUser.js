const { User } = require('../models');
const { generateToken } = require('../helper/jwt-generator');
const bcrypt = require('bcryptjs');

class ControllerUser {

    static async userRegister(req, res, next) {
        try {
            const {username, phoneNumber, email, password} = req.body;
            const created = await User.create({username, phoneNumber, email, password})
            
            if(created) {
                res.status(201).json({
                    statusCode: 201,
                    message: `${created.id}, ${created.email}`,
                })
            }
            
        } catch (err) {
            next(err); 
        }
    }

    static async userLogin(req, res, next) {
        try {
            
            const {email, password} = req.body;

            const user = await User.findOne({where: {email}})

            if (!user) throw {name:'errorLogin'};

            if(user) {
                const access_token = generateToken({
                    id: user.id,
                    email: user.email,
                    password: user.password,
                    username: user.username
                })

                if(bcrypt.compareSync(password, user.password)) {
                    res.status(200).json({
                        statusCode: 200,
                        access_token: access_token
                    })
                } else throw {name:'errorLogin'};
            } 
            
        } catch (err) {
            next(err)
        }
    }

}

module.exports = ControllerUser