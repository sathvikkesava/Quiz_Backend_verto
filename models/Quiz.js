const {Schema, model} = require('mongoose');

const QuestionSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  questionType:{
    type: String,
    enum: ['single-choice', 'multiple-choice', 'text-based'],
    required: true
  },
  options: {
    type: [{
      text: {
        type: String,
        required: true,
        trim: true
      },
      isCorrect: {
        type: Boolean,
        default: false
      }
    }],
    required: function() {
      return this.questionType !== 'text-based';
    }
  },
  correctTextAnswer: {
    type: String,
    required: function() {
      return this.questionType === 'text-based';
    },
    trim: true,
    maxlength: 300
  }
},{ timestamps: true });

const QuizSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  questions: [QuestionSchema],
},{ timestamps: true});

const Quiz = model('Quiz', QuizSchema);

module.exports = Quiz;