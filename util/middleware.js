const Product = require("../models/product");
const UserComment = require("../models/userComment");
const Order = require("../models/order");

let middleware = {};

middleware.checkProductOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        Product.findByPk(req.params.pid)
            .then(prod => {
                if (prod.userId === req.user.id) {
                    next();
                }
                else {
                    console.log("You do not have permission.");
                }
            })
            .catch(err => console.log(err));
    }
    else {
        console.log("You need to login to do that.");
        res.redirect("/login");
    }
};

middleware.checkCommentOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        UserComment.findByPk(req.params.cid)
            .then(userComment => {
                if (userComment.userId === req.user.id) {
                    next();
                }
                else {
                    console.log("You do not have permission.");
                }
            })
            .catch(err => console.log(err));
    }
    else {
        console.log("You have to login to do that.");
        res.redirect("/login");
    }
};

middleware.checkOrderOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        Order.findByPk(req.params.oid)
            .then(order => {
                if (order.userId === req.user.id) {
                    next();
                }
                else {
                    console.log("You do not have permission.");
                }
            })
            .catch(err => console.log(err));
    }
    else {
        console.log("You have to login to do that.");
        res.redirect("/login");
    }
};

middleware.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log("Login.");
        return next();
    }
    console.log("You have to login.");
    res.redirect("/login");
};

module.exports = middleware;