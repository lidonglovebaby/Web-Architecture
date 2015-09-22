/*jslint nomen: true */
/*jslint unparam: true*/
/*jslint node: true */
"use strict";
var orm = require('orm');

//get all questions
exports.getAllQuestions = function (req, res) {
    req.models.question.find(function (err, questions) {
        if (err) {
            res.status(404).send("Can not find questions");
        } else {
            res.format({
                'application/json': function () {
                    res.status(200).send(questions);
                },
                'text/html': function () {
                    res.render('index', {
                        title: "Homepage",
                        questions: questions
                    });
                },
                'default': function () {
                    res.status(406).send("Not Acceptable");
                }
            });
            console.log("get all questions successfully!");
        }
    });
};
//get a question
exports.getQuestion = function (req, res) {
    req.models.question.get(req.params.question_id, function (err, question) {
        if (err) {
            res.status(404).send('Not found the question');
        } else {
            res.format({
                'application/json': function () {
                    res.status(200).send(question);
                },
                'text/html': function () {
                    res.render('AnswerPage',
                                   {
                            title: 'QuestionDetal',
                            Question: question
                        });
                },
                'default': function () {
                    res.status(406).send("Not Acceptable");
                }
            });
           // res.status(200).send("The question: " + JSON.stringify(question));
            console.log("get a question successfully!");
        }
    });
};
//create a question
exports.createQuestion = function (req, res) {
    req.models.question.create({
        title: req.body.title,
        contents: req.body.contents,
        createTime: Date.now
    }, function (err, question) {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.format({
                'application/json': function () {
                    res.status(200).send(question);
                },
                'text/html': function () {
                    res.redirect('/questions/' + question.id);
                },
                'default': function () {
                    res.status(406).send("Not Acceptable");
                }
            });
            console.log('created a question successfully');
        }
    });
}
//update a question
exports.updateQuestion = function (req,res) {
    req.models.question.get(req.params.question_id,function(err, question){
        if (err) {
            res.status(404).send("Can not find the question");
        }else{
            if(!req.body.title || !req.body.contents){
                res.status(400).send('Bad request');
            }else{
                question.title=req.body.title;
                question.contents=req.body.contents;
                question.save(function(err){
                    if(err) {
                        res.status(500).send("Can not update the question");
                    }else{
                        res.format({
                            'application/json': function () {
                                res.status(200).send(question);
                            },
                             'text/html': function () {
                                res.redirect('/questions/' + question.id);
                            },
                            'default': function () {
                                res.status(406).send("Not Acceptable");
                            }
                        });
                        console.log('update question '+req.params.question_id+' successfully!');
                    }
                });
            };
        }
    })
}
//delete a question
exports.delQuestion = function(req,res){
    req.models.question.get(req.params.question_id,function(err,question){
        if(err){
			res.status(404).send("The question is not found");
        }else{
            question.remove(function (err) {
                if(err){ 
                    res.status(500).send("Can not delete the question");
                }else{
                    res.format({
                        'application/json': function () {
                            res.status(202).send("delete question successfully");
                        },
                        'text/html': function () {
                            res.redirect('/questions/');
                        },
                        'default': function () {
                            res.status(406).send("Not Acceptable");
                        }
                    });
                    console.log('delete question successfully!');
                }
            });
        }   
    })
}
