const { Wishlist, Event } = require('../models');

class ControllerEvent {

    static async getWishlist(req, res, next) {
        try {
            const event = await Wishlist.findAll({
                where : req.addtionalData,
                include: [
                    {model: Event},
                ],
            });

            res.status(200).json({
                statusCode: 200,
                message: event,
            })
        } catch (err) {
            console.log('mas');
            next(err);
        }
    }

    static async createdWishlist(req, res, next) {
        try {
            const {UserId} = req.addtionalData
            const {id} = req.params
            const created = await Wishlist.create({UserId, EventId:id})

            if(created) {
                res.status(201).json({
                    statusCode: 201,
                    message: created,
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteWishlist (req, res, next) {
        try {
            const wishlist = await Wishlist.findByPk(req.params.id);
            
            if(!wishlist) throw {name:'Datanotfound'};

            if (wishlist) {
                await wishlist.destroy();
                res.status(200).json({
                    statusCode: 200,
                    message: wishlist.name + ' success to delete',
                })
            }
        } catch (err) {
            next(err)
        }
    }


}

module.exports = ControllerEvent;