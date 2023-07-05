const { Category } = require('../models');

class ControllerCategory {

    static async addCategory(req, res, next) {
        try {
            const created = await Category.create(req.body)
            if(created) {
                res.status(201).json({
                    statusCode: 201,
                    message: created,
                })
            }

        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async getCategory(req, res, next) {
        console.log('masuk category');
    }
}

module.exports = ControllerCategory;