const Question = require('../../models/question');
const Option = require('../../models/option');

module.exports.createQuestion = async function(req, res){
    try {
        let newQuestion = await Question.create({
            title: req.body.title
        });
        return res.status(200).json({
            message: 'Question created',
            question: newQuestion
        });
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({
            message: 'internal server error'
        });
    }
}

module.exports.delete = async function(req, res){
    try {
        let question = await Question.findById(req.query.id)
        .populate('options');
    if(question){
        let temp = 0;
        for(let option of question.options){
            if(option.votes > 0){
                temp = temp + 1;
            }
        }
        if(temp > 0){
            for(let option of question.options){
                await Option.findByIdAndDelete(option._id);
            }
            await Question.findByIdAndDelete(req.query.id);
        }
        return res.status(200).json({
            message: 'Question successfully deleted'
        });
    }
    else{
        return res.status(405).json({
            message: 'No such question exists'
        })
    }
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}
