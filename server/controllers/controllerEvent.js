const { Event } = require('../models');
const { generateToken } = require('../helper/jwt-generator');
const bcrypt = require('bcryptjs');


class ControllerEvent {

    static async addEvents (req, res, next) {
        try {
            const {name, description, imageUrl, location, CategoryId, price, date, time} = req.body;
            const created = await Event.create({name, description, imageUrl, location, CategoryId, price, date, time})
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

    static async getEvents(req, res, next) {
        try {
            const event = await Event.findAll({
            //     include: [
            //         {model: User},
            //         {model: Type} 
            // ]
            });

            res.status(200).json({
                statusCode: 200,
                message: event,
            })
        } catch (err) {
            next(err);
        }
    }

    static async getEventId(req, res, next) {
        try {
            console.log(req.params);
            const event = await Event.findByPk(req.params.id);

            res.status(200).json({
                statusCode: 200,
                message: event,
            })
        } catch (err) {
            next(err);
        }
    }
    

}

module.exports = ControllerEvent;