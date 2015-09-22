/*jslint nomen: true */
/*jslint unparam: true*/
/*jslint node: true */
"use strict";

var orm = require('orm');

//get all comments of a question
exports.getAllQuestionComments = function (req, res) {

    req.models.q_comment.find(
        {
            'question_id': req.params.question_id
        },
        function (err, qcomments) {
            if (err) {
                res.status(404).send("Can not find comments of this question");
            } else {
                res.format({
                    'application/json': function () {
                        res.status(200).send(qcomments);
                    },
                    'text/html': function () {
                       // res.redirect('/questions/');
                        res.status(200).send("All question comments: " + JSON.stringify(qcomments));
                    },
                    'default': function () {
                        res.status(406).send("Not Acceptable");
                    }
                });
                console.log("get all comments of this question successfully!");
            }
        }
    );
};

//get a comment of a question
exports.getQuestionComment = function (req, res) {

    req.models.q_comment.get(req.params.qcomment_id, function (err, qcomment) {
        if (err) {
            res.status(404).send('Not found the question comment');
        } else {
            if (qcomment.question_id !== req.params.question_id) {
                res.send('the comment does not belong to this question');
            } else {
                res.format({
                    'application/json': function () {
                        res.status(200).send(qcomment);
                    },
                    'text/html': function () {
                      // res.redirect('/questions/' + req.params.question_id);
                        res.status(200).send("the question comment is " + JSON.stringify(qcomment));
                    },
                    'default': function () {
                        res.status(406).send("Not Acceptable");
                    }
                });
                console.log('get a question comment  successfully');
            }
        }
    });
};
//create a question comment of a question
exports.createQuestionComment = function (req, res) {
    var question_id = req.params.question_id;

    req.models.q_comment.create({
        contents: req.body.contents,
        createTime: Date.now,
        question_id: question_id
    }, function (err, qcomment) {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.format({
                'application/json': function () {
                    res.status(200).send(qcomment);
                },
                'text/html': function () {
                    res.redirect('/questions/' + req.params.question_id);
                },
                'default': function () {
                    res.status(406).send("Not Acceptable");
                }
            });
            console.log('created a question comment successfully');
        }
    });
}
//update a question comment via question comment id
exports.updateQuestionComment = function (req,res) {
    req.models.q_comment.get(req.params.qcomment_id,function (err, qcomment) {
        if (err) { 
            res.status(404).send("Can not find the question comment");
        } else {
            if (!req.body.contents) {
                res.status(400).send('Bad request');
            } else {
                qcomment.contents=req.body.contents;
            };

            qcomment.save(function(err){
                if(err) { 
                    res.status(500).send("Internal Server Error");
                }else{
                    res.format({
                            'application/json': function(){
                                res.status(200).send(qcomment);
                            },
                            'text/html': function(){
                                res.redirect('/questions/');
                            },
                            'default': function(){
                                res.status(406).send("Not Acceptable");
                            }
                        });
                    console.log('update a question comment successfully!');
                }
            });
        }
    })
}
//delete a question comment via its id
exports.delQuestionComment = function(req,res){
    req.models.q_comment.get(req.params.qcomment_id,function(err,qcomment){
        if(err){
            res.status(404).send("Can not find the question comment");
        }else{
            qcomment.remove(function(err){
                if(err){
                    res.status(500).send("Internal Server Error");
                }else{
                    console.log('delete a question comment successfully');

                    res.format({
                        'application/json': function(){
                           res.status(202).send("delete question comment successfully");
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
