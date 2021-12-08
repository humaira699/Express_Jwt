var express = require('express');
var router = express.Router();
var Admin = require('../models/admin');
var Class = require('../models/class');
var Teacher = require('../models/teacher');
var Student = require('../models/student');
var authenticate = require('../authenticate');
const cors = require('./cors');


/* GET Operations */
router.get('/', function(req, res, next) {
    res.send('respond with a Dashboard');

});
router.get('/classes',cors.cors, authenticate.verifyUser, function(req, res, next) {
    Class.find({}).populate('teacher').populate('students.sid').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});
router.get('/students',cors.cors, authenticate.verifyUser, function(req, res, next) {
    Student.find().sort('name').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});
router.get('/teachers',cors.cors, authenticate.verifyUser, function(req, res, next) {
    Teacher.find().sort('name').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});
router.get('/classes/:id',cors.cors, authenticate.verifyUser, function(req, res, next) {
    Class.find({ _id: req.params.id }).populate('teacher').populate('students.sid').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});
router.get('/students/:id',cors.cors, authenticate.verifyUser, function(req, res, next) {
    Student.findById(req.params.id)
        .then((student) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(student);
        }, (err) => next(err))
        .catch((err) => next(err));

});
router.get('/teachers/:id',cors.cors, authenticate.verifyUser, function(req, res, next) {
    Teacher.findById(req.params.id)
        .then((teacher) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(teacher);
        }, (err) => next(err))
        .catch((err) => next(err));

});
//POST Operations
router.post('/addteacher',cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, function(req, res, next) {
    console.log(req.body.name);
    console.log(req.body.designation);
    Teacher.create(req.body)
        .then((teacher) => {
            console.log('Teacher has been Added ', teacher);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(teacher);
        }, (err) => next(err))
        .catch((err) => next(err));
});
router.post('/addclass',cors.cors, authenticate.verifyUser,authenticate.verifyAdmin, function(req, res, next) {
    Class.create(req.body)
        .then((result) => {
            console.log('Class has been Added ', result);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(result);
        }, (err) => next(err))
        .catch((err) => next(err));
});
router.post('/addstudent',cors.cors, authenticate.verifyUser,authenticate.verifyAdmin, function(req, res, next) {
    Student.create(req.body)
        .then((student) => {
            console.log('Student has been Added ', student);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(student);
        }, (err) => next(err))
        .catch((err) => next(err));
});
//PUT Operations
router.put('/assign/:cid/Student/:sid',cors.cors, authenticate.verifyUser,authenticate.verifyAdmin, function(req, res, next) {
    Class.findOneAndUpdate({ _id: req.params.cid }, {
            "$push": {
                "students": {
                    "sid": req.params.sid
                }
            }
        }, { new: true, upsert: false },
        function(error, results) {
            if (error) {
                return next(error);
            }
            // Respond with valid data
            res.json(results);
        });
});

router.put('/class/:cid/teacher/:tid',cors.cors, authenticate.verifyUser,authenticate.verifyAdmin, function(req, res, next) {
    Class.findOneAndUpdate({ _id: req.params.cid }, { teacher: req.params.tid }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});
router.put('/class/:cid',cors.cors, authenticate.verifyUser,authenticate.verifyAdmin, function(req, res, next) {
    res.send('respond with a resource');
});

//Delete Operations
router.delete('/delteacher/:id',cors.cors, authenticate.verifyUser,authenticate.verifyAdmin, function(req, res, next) {
    Teacher.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});
router.delete('/delclass/:id',cors.cors, authenticate.verifyUser,authenticate.verifyAdmin, function(req, res, next) {
    Class.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});
router.delete('/delstudent/:id',cors.cors, authenticate.verifyUser,authenticate.verifyAdmin, function(req, res, next) {
    Student.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});
module.exports = router;