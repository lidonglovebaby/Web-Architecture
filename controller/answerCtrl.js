/*jslint nomen: true */
/*jslint unparam: true*/
/*jslint node: true */
"use strict";
var orm = require('orm');

//get all answers
exports.getAllAnswers = function (req, res) {

    req.models.answer.find(
        {
            'question_id': req.params.question_id
        },
        function (err, answers) {
            if (err) {
                res.status(404).send("Can not find answers");
            } else {
                var items = answers.map(function (a) {
                        return a.serialize();
                    });

                res.format({
                    'application/json': function () {
                        res.status(200).send(answers);
                    },
                    'text/html': function () {
                        res.status(200).send("All answers: " + JSON.stringify(answers));
                    },
                    'default': function () {
                        res.status(406).send("Not Acceptable");
                    }
                });
           // res.status(200).send("All answers: " + JSON.stringify(answers));
                console.log("get all answers successfully!");
            }
        }
    );
};

//get a answer
exports.getAnswer = function (req, res) {
    req.models.answer.get(req.params.answer_id, function (err, answer) {
        if (err) {
            res.status(404).send('Not found the answer');
        } else {
            if (answer.question_id !== req.params.question_id) {
                res.send('the answer does not belong to this question');
            } else {
                res.format({
                    'application/json': function () {
                        res.status(200).send(answer);
                    },
                    'text/html': function () {
                        res.status(200).send("answer is: " + JSON.stringify(answer));
                    },
                    'default': function () {
                        res.status(406).send("Not Acceptable");
                    }
                });
                console.log('get a answer successfully');
            }
        }
    });
};
//create a answer to a question
exports.createAnswer = function (req, res) {
    var question_id = req.params.question_id;

    req.models.answer.create({
        title: req.body.title,
        contents: req.body.contents,
        createTime: Date.now,
        question_id: question_id
    }, function (err, answer) {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.format({
                'application/json': function () {
                    res.status(200).send(answer);
                },
                'text/html': function () {
                    res.redirect('/questions/' + question_id);
                },
                'default': function () {
                    res.status(406).send("Not Acceptable");
                }
            });
            console.log('created a question successfully');
        }
    });
}
//updata a answer via answer id 
exports.updateAnswer = function(req,res){
    req.models.answer.get(req.params.answer_id,function(err,answer){
        if(err) { 
            res.status(404).send("Can not find the answer");
        }else{
            if(!req.body.contents){
                res.status(400).send('Bad request');
            }else{
                //answer.title=req.body.title;
                answer.contents=req.body.contents;
            };

            answer.save(function(err){
                if(err) { 
                    res.status(500).send("Internal Server Error");
                }else{
                    res.format({
                            'application/json': function(){
                                res.status(200).send(answer);
                            },
                            'text/html': function(){
                                res.redirect('/questions/');
                            },
                            'default': function(){
                                res.status(406).send("Not Acceptable");
                            }
                        });
                    console.log('update answer '+req.params.answer_id+' successfully!');
                }
            });
        }
    })
}
//delete a answer via answer id
exports.delAnswer = function(req,res){
    req.models.answer.get(req.params.answer_id,function(err,answer){
        if(err){
            res.status(404).send("Can not find the answer");
        }else{
            answer.remove(function(err){
                if(err){
                    res.status(500).send("Internal Server Error");
                }else{
                    console.log('delete a answer successfully');

                    res.format({
                        'application/json': function(){
                           res.status(202).send("delete answer successfully");
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

