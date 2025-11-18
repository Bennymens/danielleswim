import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Progress.css";

function Progress() {
  const [progress, setProgress] = useState({
    basics: 0,
    quizScore: null,
  });

  useEffect(() => {
    // Load progress from localStorage
    const completedBasics = JSON.parse(
      localStorage.getItem("completedBasics") || "[]"
    );
    const totalBasics = 6; // Total number of basic steps

    setProgress({
      basics: Math.round((completedBasics.length / totalBasics) * 100),
      quizScore: localStorage.getItem("quizScore") || null,
    });
  }, []);

  const achievements = [
    {
      id: "started",
      emoji: "🎯",
      title: "Getting Started",
      description: "Opened the swimming tutorial",
      unlocked: true,
    },
    {
      id: "basics",
      emoji: "📚",
      title: "Student",
      description: "Completed all basic swimming steps",
      unlocked: progress.basics === 100,
    },
    {
      id: "quiz_pass",
      emoji: "🎓",
      title: "Knowledge Master",
      description: "Passed the swimming quiz",
      unlocked: progress.quizScore >= 50,
    },
    {
      id: "quiz_perfect",
      emoji: "🏆",
      title: "Perfect Score",
      description: "Got 100% on the quiz",
      unlocked: progress.quizScore === 100,
    },
    {
      id: "committed",
      emoji: "💪",
      title: "Committed Learner",
      description: "Visited all lesson sections",
      unlocked: false, // You can track this if you want
    },
    {
      id: "ready",
      emoji: "🏊‍♀️",
      title: "Pool Ready",
      description: "Completed basics and passed quiz - ready to swim!",
      unlocked: progress.basics === 100 && progress.quizScore >= 75,
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalAchievements = achievements.length;

  const getMotivationalMessage = () => {
    if (progress.basics === 0) {
      return {
        title: "Just Getting Started!",
        message: "No progress yet? Come on, you can do better than this! 😏",
        color: "#ef4444",
      };
    } else if (progress.basics < 50) {
      return {
        title: "Making Some Progress!",
        message:
          "You've started, but there's still a long way to go. Keep it up! 💪",
        color: "#f59e0b",
      };
    } else if (progress.basics < 100) {
      return {
        title: "Almost There!",
        message: "You're so close! Finish those last few steps! 🔥",
        color: "#3b82f6",
      };
    } else {
      return {
        title: "Basics Complete!",
        message: "Look at you! Ready to actually swim now? 🎉",
        color: "#10b981",
      };
    }
  };

  const motivational = getMotivationalMessage();

  return (
    <div className="progress">
      <Link to="/" className="back-button">
        ← Back Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="progress-header"
      >
        <h1>🏆 Your Swimming Journey</h1>
        <p className="subtitle">
          Let's see how far you've come...
          <br />
          <span className="roast">(Or haven't come... we're watching! 👀)</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="stats-card"
        style={{ borderColor: motivational.color }}
      >
        <h2 style={{ color: motivational.color }}>{motivational.title}</h2>
        <p className="motivational-message">{motivational.message}</p>

        <div className="progress-visual">
          <div className="progress-circle-container">
            <svg className="progress-circle" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="15"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke={motivational.color}
                strokeWidth="15"
                strokeDasharray={`${2 * Math.PI * 90}`}
                strokeDashoffset={`${
                  2 * Math.PI * 90 * (1 - progress.basics / 100)
                }`}
                transform="rotate(-90 100 100)"
                strokeLinecap="round"
              />
            </svg>
            <div className="progress-percentage">
              <span className="percentage-number">{progress.basics}%</span>
              <span className="percentage-label">Complete</span>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-number">{progress.basics}%</div>
            <div className="stat-label">Basic Steps</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">
              {progress.quizScore !== null ? `${progress.quizScore}%` : "-"}
            </div>
            <div className="stat-label">Quiz Score</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">
              {unlockedCount}/{totalAchievements}
            </div>
            <div className="stat-label">Achievements</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="achievements-section"
      >
        <h2>🎖️ Achievements</h2>
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`achievement-card ${
                achievement.unlocked ? "unlocked" : "locked"
              }`}
            >
              <div className="achievement-emoji">{achievement.emoji}</div>
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
              {achievement.unlocked ? (
                <span className="unlocked-badge">✓ Unlocked</span>
              ) : (
                <span className="locked-badge">🔒 Locked</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="next-steps"
      >
        <h2>🎯 What's Next?</h2>
        <div className="steps-list">
          {progress.basics < 100 && (
            <Link to="/basics" className="next-step-card">
              <span className="step-icon">📚</span>
              <div>
                <h3>Complete the Basics</h3>
                <p>
                  You still have {6 - Math.round((progress.basics / 100) * 6)}{" "}
                  steps to go!
                </p>
              </div>
            </Link>
          )}
          {!progress.quizScore && (
            <Link to="/quiz" className="next-step-card">
              <span className="step-icon">🎯</span>
              <div>
                <h3>Take the Quiz</h3>
                <p>Test your knowledge and see what you've learned!</p>
              </div>
            </Link>
          )}
          {progress.basics === 100 && progress.quizScore >= 75 && (
            <div className="next-step-card success">
              <span className="step-icon">🎉</span>
              <div>
                <h3>You're Ready!</h3>
                <p>
                  Time to hit the pool and put your knowledge into practice!
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <div className="final-message">
        <h3>Keep Going! 💪</h3>
        <p>
          Every swimmer started exactly where you are. The difference between
          knowing how to swim and not knowing is simply taking action!
        </p>
        <p className="roast-message">
          (So no more excuses, Danielle! We believe in you! 😎)
        </p>
      </div>
    </div>
  );
}

export default Progress;
