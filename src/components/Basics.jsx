import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Basics.css";

function Basics() {
  const [completedSteps, setCompletedSteps] = useState(
    JSON.parse(localStorage.getItem("completedBasics") || "[]")
  );

  const toggleStep = (stepId) => {
    const newCompleted = completedSteps.includes(stepId)
      ? completedSteps.filter((id) => id !== stepId)
      : [...completedSteps, stepId];

    setCompletedSteps(newCompleted);
    localStorage.setItem("completedBasics", JSON.stringify(newCompleted));
  };

  const steps = [
    {
      id: 1,
      title: "Getting Comfortable in Water",
      content:
        "Start in shallow water where you can stand. Walk around, splash water on your face, and get used to being wet. Yes, this is step 1 - baby steps! 👶",
      tips: [
        "Start in waist-deep water",
        "Practice getting your face wet",
        "Stay calm and breathe normally",
      ],
    },
    {
      id: 2,
      title: "Learning to Float",
      content:
        "Floating is your safety net. Lie back in the water, relax your body, and let the water support you. Your body naturally floats!",
      tips: [
        "Take a deep breath before floating",
        "Keep your arms and legs spread out",
        "Look up at the sky, not at your feet",
        "RELAX - tension makes you sink!",
      ],
    },
    {
      id: 3,
      title: "Submersion & Breath Control",
      content:
        "Time to put your face in the water! Take a deep breath, hold it, and dunk your face underwater. Count to 3, then come up.",
      tips: [
        "Close your mouth underwater",
        "Don't breathe out through your nose too fast",
        "Practice in shallow water first",
        "Gradually increase the time underwater",
      ],
    },
    {
      id: 4,
      title: "Kicking Technique",
      content:
        "Hold onto the pool edge and practice kicking. Keep your legs straight, toes pointed, and kick from your hips - not your knees!",
      tips: [
        "Small, quick kicks are better than big splashes",
        "Keep your legs close together",
        "Point your toes like a ballerina",
        "Feel the water resistance",
      ],
    },
    {
      id: 5,
      title: "Arm Movements (Basic Paddle)",
      content:
        "While floating or standing, practice moving your arms in big circles. Scoop the water from front to back. This is the foundation of swimming strokes!",
      tips: [
        "Make big, smooth movements",
        "Cup your hands slightly",
        "Pull the water past your body",
        "Keep your elbows slightly bent",
      ],
    },
    {
      id: 6,
      title: "Putting It All Together",
      content:
        "Now combine everything! Push off from the wall, float, kick, and move your arms. Even a few feet counts as swimming! 🎉",
      tips: [
        "Start with short distances",
        "Focus on one thing at a time",
        "Don't rush - slow and steady wins",
        "Celebrate every small victory!",
      ],
    },
  ];

  return (
    <div className="basics">
      <Link to="/" className="back-button">
        ← Back Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="basics-header"
      >
        <h1>🏊 Swimming Basics 101</h1>
        <p className="roast-text">
          Welcome to square one. No judgment... okay, maybe a little judgment.
          😏
        </p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${(completedSteps.length / steps.length) * 100}%`,
            }}
          />
        </div>
        <p className="progress-text">
          {completedSteps.length} of {steps.length} steps completed
        </p>
      </motion.div>

      <div className="steps-container">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`step-card ${
              completedSteps.includes(step.id) ? "completed" : ""
            }`}
          >
            <div className="step-header">
              <h2>
                <span className="step-number">Step {step.id}</span>
                {step.title}
              </h2>
              <button
                onClick={() => toggleStep(step.id)}
                className="complete-button"
              >
                {completedSteps.includes(step.id) ? "✓" : "○"}
              </button>
            </div>

            <p className="step-content">{step.content}</p>

            <div className="tips-section">
              <h3>💡 Pro Tips:</h3>
              <ul>
                {step.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>

            {step.id === 1 && (
              <div className="encouragement">
                <p>🎈 Everyone starts here! You've got this!</p>
              </div>
            )}
            {step.id === 6 && (
              <div className="encouragement celebration">
                <p>🎊 Once you master this, you're officially a swimmer!</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="motivation-box"
      >
        <h3>🌟 Remember:</h3>
        <p>
          Swimming is a life skill that everyone can learn at any age. Take your
          time, practice regularly, and soon you'll be swimming like a fish! 🐠
        </p>
        <p className="final-roast">
          (And then you'll have no more excuses for avoiding pool parties! 😎)
        </p>
      </motion.div>
    </div>
  );
}

export default Basics;
