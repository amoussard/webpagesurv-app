var cron = require('node-cron');
var rp = require('request-promise');
var stringManipulation = require('string');

var Watch = require('./models/watch');

class cronManager {
    constructor() {
        this.cronJobsList = {};

        this.init();
    }

    init() {
        Watch.find({}, (err, results) => {
            if (err) {
                console.log('erreur fetching');
            }
            results.forEach(this.addCronJob.bind(this));
        });
    }

    add(cronJob) {
        this.addCronJob(cronJob);
    }
    
    delete(cronJob) {
        this.cronJobsList[cronJob._id].destroy();
    }

    addCronJob(cronJob) {
        this.cronJobsList[cronJob._id] = cron.schedule(cronJob.cron, function() {
            console.log('search "' + cronJob.text + '" on "' + cronJob.url + '"');

            rp(cronJob.url)
                .then(function (htmlString) {
                    if (stringManipulation(htmlString).stripTags().collapseWhitespace().contains(cronJob.text)) {
                        console.log('present');
                    } else {
                        console.log('changed');
                    }
                })
                .catch(function (err) {
                    console.log('crawl error', err);
                });
        });
    }
}

/* ************************************************************************
 SINGLETON CLASS DEFINITION
 ************************************************************************ */
cronManager.instance = null;

/**
 * Singleton getInstance definition
 * @return singleton class
 */
cronManager.getInstance = function(){
    if(this.instance === null){
        this.instance = new cronManager();
    }
    return this.instance;
};

module.exports = cronManager.getInstance();