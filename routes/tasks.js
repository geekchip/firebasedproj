var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://root:mynotes1@ds129541.mlab.com:29541/mynotes', ['notes']);


//Get All Notes
router.get('/tasks', function (req,res,next){
    db.notes.find(function (err,notes){
        if(err){
            res.send(err);
        }
        res.json(notes);
    });
});

//Get Individual Notes
router.get('/task/:id', function (req,res,next){
    db.notes.findOne({_id:mongojs.ObjectId(req.params.id)},function (err,note){
        if(err){
            res.send(err);
        }
        res.json(note);
    });
});

//Save Notes

router.post('/task', function(req,res,next){
    var task = req.body;
    if(!(task.notes_title + '') || !(task.notes_desc + '' )|| !(task.notes_views + '')){
        res.status(400);
        res.json({
            "error" : "Bad Data"
        });
    }
    else {
         db.notes.save(task, function(err,task){
            if(err){
                res.send(err);
            }
            res.json(task);

         });
    }
});

//Delete a Task

router.delete('/task/:id', function (req,res,next){
    db.notes.remove({_id:mongojs.ObjectId(req.params.id)},function (err,note){
        if(err){
            res.send(err);
        }
        res.json(note);
    });
});

//update Task

router.put('/task/:id', function (req,res,next){

            var task = req.body;
            var updTask = {};

            if(task.notes_title){
                updTask.notes_title = task.notes_title;
            }
            if(task.notes_desc){
                updTask.notes_desc = task.notes_desc;
            }
            if(task.notes_views){
                updTask.notes_views = task.notes_views;
            }

            if(!updTask){
                res.status(400);
                res.json({
                    "error" : "Bad Data"
                });

            } else {
                db.notes.update({_id:mongojs.ObjectId(req.params.id)},updTask,{},function (err,note){
                    if(err){
                        res.send(err);
                    }
                    res.json(note);
                });

            }
     });







module.exports = router;