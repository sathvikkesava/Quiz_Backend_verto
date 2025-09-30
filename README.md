# Quiz_Backend_verto
A backend application for quiz management that lets users create quizzes with single-choice, multiple-choice, and text-based questions. Users can add questions, view all quizzes with their questions, submit answers, and get scores calculated automatically for evaluation.
<h3><u>Implementation</u></h3><br>
<p>1. The database schema for the above problem statement is located at<b><a href="models/Quiz.js"> models/Quiz.js</a></b> file</p>
<p>2. There are five different REST api's for performing various operations</p>
<ul>
<li> <b>localhost:8000/quiz/createQuiz</b>   -->  creating a quiz </li>
<li> <b>localhost:8000/quiz/addQuestion/:quizId </b> --> Add questions to a quiz as needed, supporting single-choice, multiple-choice, or text-based answers.</li>
<li> <b>localhost:8000/quiz/:quizId/getQuiz </b> --> This endpoint helps to fetch all questions for a specific quiz based on id provided by us. The correct answer are not included in this response.</li>
<li> <b>localhost:8000/quiz/:quizId/submit </b> --> This endpoint helps to submit the specific quiz based on id provided by us and calculate the score based on aswers that we submitted</li>
<li><b>localhost:8000/quiz/getAllQuizzes </b> --> This endpoint helps to see list of available quizzes </li>
</ul>
<p>3. The implementation of these end points can be found in <b><a href="routes/quizRouter.js">routes/quiz.js</a></b> file.</p>
<h3><u>Deployment steps</u></h3><br>
<ul>
<li>Clone the entire repository to a new folder on desktop</li>
<li>Open the command prompt from the same folder and type <b>npm install</b>. This will download all the required dependencies which are present in package.json file</li>
<li>Now open the mongodb terminal and create a new database named quiz. All the quizes and questions will be stored here.</li>
<li>To start the server enter the command <b>npm start</b></li>
</ul>
<h3>Instructions on how to run your test cases.</h3>
<ul>
  <li>{
    "title":"OS"
}</li>
  <p>data to create a quiz</p>
  <li>{
  "text": "Which memory management technique divides memory into fixed-size blocks?",
  "questionType": "single-choice",
  "options": [
    {
      "text": "Segmentation",
      "isCorrect": false
    },
    {
      "text": "Paging",
      "isCorrect": true
    },
    {
      "text": "Virtual Memory",
      "isCorrect": false
    },
    {
      "text": "Swapping",
      "isCorrect": false
    }
  ]
}</li>
  <p>data to add question</p>
  <li>{
  "answers": [
    {
      "questionId": "68da78d4413d6655549274b9",
      "textAnswer": "Deadlock is a situation where two or more processes are blocked forever, waiting for each other to release resources."
    }
  ]
}</li>
  <p>data to submit ans for text-type answers</p>
</ul>
