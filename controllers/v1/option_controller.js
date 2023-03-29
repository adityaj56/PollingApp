const Option = require('../../models/option');
const Question = require('../../models/question');

module.exports.createOption = async function(req, res){
    try {
        let question = await Question.findById(req.body.questionId);
        if(question){
            let newOption = await Option.create({
                text: req.body.optionBody,
                question: req.body.questionId
            });
            await question.options.push(newOption._id);
            await question.save();
            return res.status(200).json({
                message: 'Option created',
                option: newOption
            });
        }
        else{
            return res.status(404).json({
                message: 'Question does not exists'
            })
        }
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({
            message: 'internal server error'
        });
    }
}

module.exports.delete = async function(req, res){
    try {
        let option = await Option.findById(req.query.id);
        if(option && option.votes == 0){
            await Option.findByIdAndDelete(req.query.id);
            return res.status(200).json({
                message: 'option successfully deleted'
            });
        }
        else{
            return res.status(405).json({
                message: 'Cannot delete this option as this have some votes'
            });
        }
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

module.exports.vote = async function(req, res){
    try {
        let option = await Option.findById(req.query.id);
        if(option){
            option.votes = option.votes + 1;
            await option.save();
            return res.status(200).json({
                message: 'voted successfully'
            });
        }
        else{
            return res.status(405).json({
                message: 'No such option exists'
            });
        }
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}