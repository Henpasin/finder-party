const { Ticket, User, Event } = require('../models');
const midtransClient = require('midtrans-client');

class ControllerTicket {


    static async getAllTickets (req, res, next) {
        try {
            const ticket = await Ticket.findAll({
                where: {UserId: req.addtionalData.UserId},
                include: {model : Event}
            })

            if(ticket) {
                res.status(201).json({
                    statusCode: 201,
                    message: ticket,
                })
            }
        } catch (err) {
            console.log(err);
        }
    }


    static async buyTicket (req, res, next) {
        try {
            const {UserId} = req.addtionalData
            const {id} = req.params
            const created = await Ticket.create({UserId, EventId:id})

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

    static async confirmTicket (req, res, next) {
        try {
            const created = await Ticket.findByPk(req.params.id)

            if(created) {
                await created.update({status: 'true'});
                res.status(200).json({
                    statusCode: 200,
                    message: 'success to buy a ticket',
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async genearate_token_midtrans (req, res, next) {

        const findUser = await Ticket.findAll({
            where : {
                id : req.params.id, 
            },
            include: [
                {model: User},
                {model: Event} 
            ]
        }); 

        try {

            if(!findUser) { throw {name : "SUDAH LUNAS"} }

            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction : false,
                serverKey : 'SB-Mid-server-UT6Bt9pdMVw-fMs3Q6JJK4MN'
            });

            let parameter = {
                "transaction_details": {
                    "order_id": "PARTY-FINDER_" + Math.floor(Math.random() * 23051998),
                    "gross_amount": findUser[0].Event.price
                },
                "credit_card":{
                    "secure" : true
                },
                "customer_details": {
                    "first_name": findUser[0].User.username,
                    // "last_name": "",
                    "email": findUser[0].User.email,
                    "phone": findUser[0].User.phoneNumber
                }
            };

            const midtransToken = await snap.createTransaction(parameter);

            res.status(201).json(midtransToken)

        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = ControllerTicket