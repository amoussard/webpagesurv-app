var express = require('express');
var router = express.Router();

var Watch = require('../models/watch');

/* GET home page. */
router.get('/', function(req, res, next) {
  Watch.find({}, (err, results) => {
    if (err) {
        return res.status(500).json({
            title: 'An error occurred',
            error: err
        });
    }
    res.render('index', { watchs: results });
  });
});

router.post('/watch', function(req, res, next) {
    const watch = new Watch({
        url: req.body.url,
        cron: req.body.cron,
        text: req.body.text
    });
    watch.save((err, result) => {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved watch',
            obj: result
        });
    });
});

router.get('/:id', function (req, res, next) {
    Watch.findById(req.params.id, function (err, watch) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!watch) {
            return res.status(500).json({
                title: 'No watch found',
                error: {
                    message: 'watch not found'
                }
            });
        }
        watch.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted watch',
                obj: result
            });
        });
    })
});

module.exports = router;
