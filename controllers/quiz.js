const Quiz = require("../models/Quiz");
async function createQuiz(req, res) {
  const { title, questions } = req.body;
  try {
    await Quiz.create({ title, questions });
    res.status(201).send("Quiz created successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to create quiz" });
  }
}
async function addQuestion(req, res) {
  const { quizId } = req.params;
  const { text, options, questionType, correctTextAnswer } = req.body;

  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    return res.status(404).send("Quiz not found");
  }

  if (!text || text.trim() === "") {
    return res.status(400).send("Question text is required");
  }

  if (!questionType) {
    return res.status(400).send("Question type is required");
  }

  // Validate based on question type
  if (questionType === "text-based") {
    if (!correctTextAnswer || correctTextAnswer.trim() === "") {
      return res
        .status(400)
        .send("Text-based questions require a correct answer");
    }
    if (correctTextAnswer.length > 300) {
      return res.status(400).send("Text answer cannot exceed 300 characters");
    }
    // For text-based questions, save with correctTextAnswer
    quiz.questions.push({
      text: text.trim(),
      questionType,
      correctTextAnswer: correctTextAnswer.trim(),
    });
  } else {
    if (!options || !Array.isArray(options))
      return res.status(400).send("Options must be provided as an array");
    if (options.length < 2) {
      return res
        .status(400)
        .send("At least 2 options are required for a quiz question");
    }
    const validOptions = options.every(
      (option) => option && option.text && option.text.trim() !== ""
    );

    if (!validOptions) {
      return res.status(400).send("All options must have valid text");
    }
    const correctOptions = options.filter(
      (option) => option.isCorrect === true
    );
    if (correctOptions.length === 0) {
      return res
        .status(400)
        .send("At least one option must be marked as correct");
    }

    quiz.questions.push({ text: text.trim(), questionType, options });
  }

  await quiz.save();
  res.status(200).send("Question added successfully");
}

async function getQuiz(req, res) {
  const { quizId } = req.params;
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    return res.status(404).send("Quiz not found");
  }
  const questions = quiz.questions.map((q) => ({
    text: q.text,
    type: q.questionType,
    ...(q.questionType === "text-based"
      ? { correctTextAnswer: "enter your ans here" }
      : { options: q.options.map((o) => ({ text: o.text })) }),
  }));
  res.status(200).json({ title: quiz.title, questions });
}

async function submitQuiz(req, res) {
  const { quizId } = req.params;
  const { answers } = req.body;
  let result = 0;
  const quiz = await Quiz.findById(quizId);
  const totalScore = quiz.questions.length;
  if (!quiz) {
    return res.status(404).send("Quiz not found");
  }
  for (let ans of answers) {
    const question = quiz.questions.id(ans.questionId);
    if (question && question.questionType === "text-based") {
      if (question.correctTextAnswer === ans.textAnswer) result++;
    } else {
      const correctOptions = question.options
        .filter((o) => o.isCorrect)
        .map((o) => o._id.toString());
      const userOptions = ans.selectedOptionIds.map((id) => id.toString());
      if (
        correctOptions.length === userOptions.length &&
        correctOptions.every((co) => userOptions.includes(co))
      ) {
        result++;
      }
    }
  }
  res.status(200).json({ score: result, totalScore });
}

async function getAllQuizzes(req, res) {
    const quizzes = await Quiz.find({}, { title: 1 }); 
    res.status(200).json(quizzes);
}

module.exports = { createQuiz, addQuestion, getQuiz, submitQuiz, getAllQuizzes };
