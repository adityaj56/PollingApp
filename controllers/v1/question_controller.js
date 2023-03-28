const Question = require('../../models/question')

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
