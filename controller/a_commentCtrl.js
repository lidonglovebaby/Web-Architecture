/*jslint nomen: true */
/*jslint unparam: true*/
/*jslint node: true */
"use strict";
var orm = require('orm');

//get all answer comments
exports.getAllAnswersComments = function (req, res) {

    req.models.a_comment.find(
        {
            'answer_id': req.params.answer_id
        },
        function (err, acomments) {
            if (err) {
                res.status(404).send("Can not find answer comments");
            } else {
                res.format({
                    'application/json': function () {
                        res.status(200).send(acomments);
                    },
                    'text/html': function () {
                       // res.redirect('/questions/');
                        res.status(200).send("All answer comments: " + JSON.stringify(acomments));
                    },
                    'default': function () {
                        res.status(406).send("Not Acceptable");
                    }
                });
                console.log("get all answer comments successfully!");
            }
        }
    );
};

//get a answer comment
exports.getAnswerComment = function (req, res) {
    req.models.a_comment.get(req.params.acomment_id, function (err, acomment) {
        if (err) {
            res.status(404).send('Not found the answer comment');
        } else {
            if (acomment.answer_id !== req.params.answer_id) {
                res.send('the answer does not belong to this answer');
            } else {
                res.format({
                    'application/json': function () {
                        res.status(200).send(acomment);
                    },
                    'text/html': function () {
                      // res.redirect('/questions/' + req.params.question_id);
                        res.status(200).send("the answer comment is : " + JSON.stringify(acomment));
                    },
                    'default': function () {
                        res.status(406).send("Not Acceptable");
                    }
                });
                console.log('get a answer comment successfully');
            }
        }
    });
};
//create a answer comment 
exports.createAnswerComment = function (req, res) {
    var answer_id = req.params.answer_id;

    req.models.a_comment.create({
     //   title: req.body.title,
        contents: req.body.contents,
        createTime: Date.now,
        answer_id: answer_id
    }, function (err, acomment) {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.format({
                'application/json': function () {
                    res.status(200).send(acomment);
                },
                'text/html': function () {
                    res.redirect('/questions/');
                },
                'default': function () {
                    res.status(406).send("Not Acceptable");
                }
            });
            console.log('created a answer comment successfully');
        }
    });
}
//update a answer comment
exports.updateAnswerComment = function (req, res) {
    req.models.a_comment.get(req.params.acomment_id,function(err,acomment){
        if(err) { 
            res.status(404).send("Can not find the answer comment");
        }else{
            if(!req.body.contents){
                res.status(400).send('Bad request');
            }else{
               // answer.title=req.body.title;
                acomment.contents=req.body.contents;
            };

            acomment.save(function(err){
                if(err) { 
                    res.status(500).send("Internal Server Error");
                }else{
                    res.format({
                            'application/json': function(){
                                res.status(200).send(acomment);
                            },
                            'text/html': function(){
                                res.redirect('/questions/');
                            },
                            'default': function(){
                                res.status(406).send("Not Acceptable");
                            }
                        });
                    console.log('update answer comment successfully!');
                }
            });
        }
    })
}
//delete a answer comment
exports.delAnswerComment = function(req,res){
    req.models.a_comment.get(req.params.acomment_id,function(err,acomment){
        if(err){
            res.status(404).send("Can not find the answer comment");
        }else{
            acomment.remove(function(err){
                if(err){
                    res.status(500).send("Internal Server Error");
                }else{
                    console.log('delete a answer successfully');

                    res.format({
                        'application/json': function(){
                           res.status(202).send("delete answer comment successfully");
                        },
                        'text/html': function(){
                            res.redirect('/questions/');
                        },
                        'default': function(){
                            res.status(406).send("Not Acceptable");
                        }
                    });
                }
            });
        }
    })
}
