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