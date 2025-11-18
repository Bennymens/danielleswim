import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Quiz.css";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);

  const questions = [
    {
      question:
        "What's the first thing you should learn when starting to swim?",
      options: [
        "Butterfly stroke",
        "Getting comfortable in water and floating",
        "Diving off the high board",
        "Racing your friends",
      ],
      correct: 1,
      explanation:
        "Always start with basics! Getting comfortable and learning to float builds confidence.",
    },
    {
      question: "When swimming freestyle, how should you breathe?",
      options: [
        "Lift your head straight up",
        "Hold your breath the entire time",
        "Turn your head to the side",
        "Breathe underwater",
      ],
      correct: 2,
      explanation:
        "Turn your head to the side, keeping one eye in the water. Lifting straight up creates drag!",
    },
    {
      question: "What should you do when exhaling while swimming?",
      options: [
        "Hold your breath completely",
        "Exhale quickly all at once",
        "Exhale slowly through your nose underwater",
        "Exhale only above water",
      ],
      correct: 2,
      explanation:
        "Exhale slowly through your nose while your face is underwater. This prevents water from entering your nose!",
    },
    {
      question: "Which stroke is easiest for beginners?",
      options: [
        "Butterfly",
        "Freestyle (Front Crawl)",
        "Olympic backstroke",
        "Synchronized swimming",
      ],
      correct: 1,
      explanation:
        "Freestyle is the most natural and easiest stroke to learn for beginners.",
    },
    {
      question: "In breaststroke, what's the correct sequence?",
      options: [
        "Kick, Pull, Breathe, Glide",
        "Pull, Breathe, Kick, Glide",
        "Glide, Kick, Pull, Breathe",
        "Just splash around randomly",
      ],
      correct: 1,
      explanation:
        "Remember: Pull, Breathe, Kick, Glide! This timing is crucial for efficient breaststroke.",
    },
    {
      question: "What's the most important safety rule in swimming?",
      options: [
        "Always swim alone",
        "Never learn to float",
        "Never swim in areas without lifeguards if you're not confident",
        "Ignore pool rules",
      ],
      correct: 2,
      explanation:
        "Safety first! Always swim where there are lifeguards, especially when you're still learning.",
    },
    {
      question: "How should your body position be when floating?",
      options: [
        "Tense and rigid",
        "Relaxed and horizontal",
        "Standing straight up",
        "Curled in a ball",
      ],
      correct: 1,
      explanation:
        "Relax and stay horizontal! Tension makes you sink. Your body naturally wants to float.",
    },
    {
      question: "When should you attempt butterfly stroke?",
      options: [
        "On your first day of swimming",
        "After mastering freestyle, backstroke, and breaststroke",
        "Before learning to float",
        "Never practice, just wing it",
      ],
      correct: 1,
      explanation:
        "Butterfly is the most difficult stroke. Master the basics first!",
    },
  ];

  const handleAnswerClick = (selectedIndex) => {
    if (answered) return;

    setSelectedAnswer(selectedIndex);
    setAnswered(true);

    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) {
      return {
        emoji: "🏆",
        title: "PERFECT SCORE!",
        message:
          "Okay, I'm impressed! You actually paid attention! Time to hit the pool! 🎉",
      };
    } else if (percentage >= 75) {
      return {
        emoji: "🌟",
        title: "Great Job!",
        message:
          "You're ready to swim! Just need a little more practice. Get in that pool! 💪",
      };
    } else if (percentage >= 50) {
      return {
        emoji: "📚",
        title: "Not Bad!",
        message:
          "You know some basics, but maybe review the lessons again? No excuses! 😏",
      };
    } else {
      return {
        emoji: "🤦",
        title: "Uh Oh...",
        message:
          "Did you even read the lessons?! Back to basics for you! No more avoiding this! 😅",
      };
    }
  };

  if (showScore) {
    const scoreData = getScoreMessage();
    return (
      <div className="quiz">
        <Link to="/" className="back-button">
          ← Back Home
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="score-section"
        >
          <div className="score-emoji">{scoreData.emoji}</div>
          <h1>{scoreData.title}</h1>
          <div className="score-display">
            <span className="score-number">{score}</span>
            <span className="score-total">/ {questions.length}</span>
          </div>
          <p className="score-message">{scoreData.message}</p>

          <div className="score-actions">
            <button onClick={restartQuiz} className="retry-button">
              Try Again
            </button>
            <Link to="/" className="home-link">
              Back to Lessons
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="quiz">
      <Link to="/" className="back-button">
        ← Back Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="quiz-header"
      >
        <h1>🎯 Swimming Knowledge Quiz</h1>
        <p className="subtitle">
          Let's see if you actually learned anything...
          <br />
          <span className="roast">
            (Spoiler: We'll find out if you were paying attention! 😏)
          </span>
        </p>
        <div className="progress-indicator">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </motion.div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="question-section"
      >
        <h2 className="question">{questions[currentQuestion].question}</h2>

        <div className="options">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              disabled={answered}
              className={`option ${
                answered
                  ? index === questions[currentQuestion].correct
                    ? "correct"
                    : index === selectedAnswer
                    ? "incorrect"
                    : ""
                  : ""
              } ${selectedAnswer === index ? "selected" : ""}`}
            >
              {option}
            </button>
          ))}
        </div>

        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="explanation"
          >
            <div
              className={`result-indicator ${
                selectedAnswer === questions[currentQuestion].correct
                  ? "correct"
                  : "incorrect"
              }`}
            >
              {selectedAnswer === questions[currentQuestion].correct ? (
                <>
                  <span className="result-emoji">✓</span>
                  <span>Correct!</span>
                </>
              ) : (
                <>
                  <span className="result-emoji">✗</span>
                  <span>Not quite!</span>
                </>
              )}
            </div>
            <p className="explanation-text">
              {questions[currentQuestion].explanation}
            </p>
            <button onClick={handleNextQuestion} className="next-button">
              {currentQuestion + 1 === questions.length
                ? "See Results"
                : "Next Question"}{" "}
              →
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Quiz;
