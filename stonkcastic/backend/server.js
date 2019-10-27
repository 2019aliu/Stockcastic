const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./user.model');
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/users', {
    useNewUrlParser: true
});
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

const userRoutes = express.Router();

app.use('/users', userRoutes);

userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

userRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(todo => {
            res.status(200).json({'user': 'user added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
});

userRoutes.route('/addStock').post(function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send("data is not found");
        else
            user.stock = req.body.stock;

            user.save().then(user => {
                res.json('User Stock added!');
            })
            .catch(err => {
                res.status(400).send("Stock addition not possible");
            })
    });
});

userRoutes.route('/remove/:id').post(function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send("data is not found");
        else
            user.remove().then(user =>  {
                res.json('User removed!');
            })
            .catch(err => {
                res.status(400).send("Remove not possible");
            });
    });
});

userRoutes.route('/update/:id').post(function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send("data is not found");
        else
            user.username = req.body.username;
            user.password = req.body.password;

            user.save().then(user => {
                res.json('User updated!');                
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
