const express = require("express");
const {
  createQuiz,
  addQuestion,
  getQuiz,
  submitQuiz,
  getAllQuizzes,
} = require("../controllers/quiz");
const router = express.Router();

router.post("/createQuiz", createQuiz);
router.post("/addQuestion/:quizId", addQuestion);
router.get("/:quizId/getQuiz", getQuiz);
router.post("/:quizId/submit", submitQuiz);
router.get("/getAllQuizzes", getAllQuizzes);

module.exports = router;
