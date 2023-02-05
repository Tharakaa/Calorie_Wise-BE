const {Router} = require('express');
const router = Router();
const {Category} = require("../model/category");
const {Item} = require("../model/item");
const {User} = require("../model/user");
const mongoose = require("mongoose");

router.get('/getCategories', async (req, res) => {
    try {
        const categoryList = await Category.find();
        res.status(200).send(categoryList);
    } catch (e) {
        res.status(500);
    }
});

router.post('/getItemsForCategory', async (req, res) => {
    try {
        const categoryList = await Item.find({"calorie": { $gt: req.body.minCal, $lt: req.body.maxCal }});
        const filtered = [];
        if (req.body.username && req.body.username.trim() !== "") {
            const user = await User.findById(req.body.username);
            const bookmarks = user.bookmarks
            for (let x = 0; x < categoryList.length; x++) {
                let item = categoryList[x].toObject();
                for (let i = 0; i < bookmarks.length; i++) {
                    let favId = bookmarks[i].toString();
                    if (item._id.toString() === favId) {
                        item.isBookMarked = true
                        console.error(item)
                        break;
                    }
                }
                filtered.push(item);
            }
            for (let x = 0; x < filtered.length; x++) {
                if (!filtered[x].isBookMarked) {
                    filtered[x].isBookMarked = false
                }
            }
        } else {
            for (let x = 0; x < categoryList.length; x++) {
                let item = categoryList[x].toObject();
                item.isBookMarked = false
                filtered.push(item);
            }
        }
        res.status(200).send(filtered);
    } catch (e) {
        res.status(500);
    }
});

router.post('/searchItems', async (req, res) => {
    try {
        const categoryList = await Item.find({"name": {"$regex": req.body.searchParam, "$options": "i"}});
        const filtered = [];
        if (req.body.username && req.body.username.trim() !== "") {
            const user = await User.findById(req.body.username);
            const bookmarks = user.bookmarks
            for (let x = 0; x < categoryList.length; x++) {
                let item = categoryList[x].toObject();
                for (let i = 0; i < bookmarks.length; i++) {
                    let favId = bookmarks[i].toString();
                    if (item._id.toString() === favId) {
                        item.isBookMarked = true
                        console.error(item)
                        break;
                    }
                }
                filtered.push(item);
            }
            for (let x = 0; x < filtered.length; x++) {
                if (!filtered[x].isBookMarked) {
                    filtered[x].isBookMarked = false
                }
            }
        } else {
            for (let x = 0; x < categoryList.length; x++) {
                let item = categoryList[x].toObject();
                item.isBookMarked = false
                filtered.push(item);
            }
        }
        res.status(200).send(filtered);
    } catch (e) {
        res.status(500);
    }
});

router.post('/register', async (req, res) => {
    try {
        const oldUser = await User.findOne({"username": req.body.username});
        if (!oldUser) {
            let user = new User({
                name: req.body.name,
                password: req.body.password,
                username: req.body.username,
                bookmarks: [],
            })
            user = await user.save();
            res.status(200).send({code: 0});
        } else {
            res.status(400).send({code: 1});
        }
    } catch (e) {
        res.status(500);
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({"username": req.body.username, "password": req.body.password});
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(401).send({"_id": "0",});
        }
    } catch (e) {
        res.status(500);
    }
});

router.get('/getBookmarksForUser/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate("bookmarks");
        let filtered = [];
        for (let x = 0; x < user.bookmarks.length; x++) {
            let item = user.bookmarks[x].toObject();
            item.isBookMarked = true
            filtered.push(item);
        }
        res.status(200).send(filtered);
    } catch (e) {
        res.status(500);
    }
});

router.post('/saveBookmark', async (req, res) => {
    try {
        let itemID = mongoose.Types.ObjectId(req.body.item);
        await User.findOneAndUpdate(
            {"_id": req.body.username},
            {$push: {bookmarks: itemID}}
        );
        res.status(200).send({code: 0});
    } catch (e) {
        res.status(500);
    }
});

router.post('/removeBookmark', async (req, res) => {
    try {
        await User.findOneAndUpdate(
            {"_id": req.body.username},
            {
                $pull: {
                    bookmarks: req.body.item,
                }
            }
        );
        res.status(200).send({code: 0});
    } catch (e) {
        res.status(500);
    }
});

module.exports = router;
