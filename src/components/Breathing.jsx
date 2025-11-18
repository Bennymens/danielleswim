import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Breathing.css";

function Breathing() {
  const [practiceActive, setPracticeActive] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [phase, setPhase] = useState("");

  const startPractice = () => {
    setPracticeActive(true);
    breathingCycle();
  };

  const breathingCycle = () => {
    // Inhale
    setPhase("Inhale deeply");
    setCountdown(3);
    const inhaleInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(inhaleInterval);
          holdBreath();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const holdBreath = () => {
    setPhase("Hold your breath");
    setCountdown(5);
    const holdInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(holdInterval);
          exhale();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const exhale = () => {
    setPhase("Exhale slowly");
    setCountdown(4);
    const exhaleInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(exhaleInterval);
          setPracticeActive(false);
          setPhase("Complete! Great job! 🎉");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="breathing">
      <Link to="/" className="back-button">
        ← Back Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="breathing-header"
      >
        <h1>😮‍💨 Breathing Techniques</h1>
        <p className="subtitle">
          The secret to not drowning: proper breathing!
          <br />
          <span className="roast">(Revolutionary concept, I know 😏)</span>
        </p>
      </motion.div>

      <div className="content-grid">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="info-section"
        >
          <h2>🫁 Why Breathing Matters</h2>
          <p>
            Proper breathing is the difference between swimming gracefully and
            gasping for air. It's the #1 thing that separates confident swimmers
            from... well, you know. 😅
          </p>
          <div className="key-points">
            <div className="point">
              <span className="point-emoji">💨</span>
              <div>
                <h3>Exhale Underwater</h3>
                <p>
                  Don't hold your breath! Breathe out slowly through your nose
                  while underwater.
                </p>
              </div>
            </div>
            <div className="point">
              <span className="point-emoji">👃</span>
              <div>
                <h3>Nose vs. Mouth</h3>
                <p>
                  Exhale through nose underwater, inhale through mouth above
                  water.
                </p>
              </div>
            </div>
            <div className="point">
              <span className="point-emoji">🎵</span>
              <div>
                <h3>Find Your Rhythm</h3>
                <p>
                  Develop a consistent breathing pattern. Every 2-3 strokes for
                  freestyle.
                </p>
              </div>
            </div>
            <div className="point">
              <span className="point-emoji">😌</span>
              <div>
                <h3>Stay Relaxed</h3>
                <p>
                  Tension makes breathing harder. Stay calm and the breathing
                  flows naturally.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="practice-box"
        >
          <h2>🧘‍♀️ Breathing Practice</h2>
          <p>Let's practice breathing control on land first!</p>

          <div
            className={`breathing-visualizer ${practiceActive ? "active" : ""}`}
          >
            {!practiceActive && !phase && (
              <div className="start-prompt">
                <p>Ready to practice breathing?</p>
                <button onClick={startPractice} className="start-button">
                  Start Practice
                </button>
              </div>
            )}

            {(practiceActive || phase) && (
              <div className="breathing-guide">
                <div
                  className={`breathing-circle ${
                    phase.toLowerCase().includes("inhale")
                      ? "inhale"
                      : phase.toLowerCase().includes("hold")
                      ? "hold"
                      : "exhale"
                  }`}
                >
                  {countdown > 0 && (
                    <span className="countdown">{countdown}</span>
                  )}
                </div>
                <p className="phase-text">{phase}</p>
                {!practiceActive && phase.includes("Complete") && (
                  <button onClick={startPractice} className="retry-button">
                    Practice Again
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="techniques-section"
      >
        <h2>🏊 Breathing for Each Stroke</h2>

        <div className="techniques-grid">
          <div className="technique-card">
            <h3>🏊‍♀️ Freestyle</h3>
            <ul>
              <li>Turn head to the side, not up</li>
              <li>One eye stays in water, one out</li>
              <li>Quick inhale, then face back down</li>
              <li>Exhale slowly through nose underwater</li>
              <li>Breathe every 2-3 strokes</li>
            </ul>
            <div className="tip">
              💡 Practice bilateral breathing (both sides) for balance!
            </div>
          </div>

          <div className="technique-card">
            <h3>🤽‍♀️ Backstroke</h3>
            <ul>
              <li>Face is always above water - easy breathing!</li>
              <li>Breathe naturally with each stroke</li>
              <li>Inhale when one arm enters water</li>
              <li>Exhale during the opposite arm's stroke</li>
              <li>Keep a steady rhythm</li>
            </ul>
            <div className="tip">
              💡 This is the easiest stroke for breathing!
            </div>
          </div>

          <div className="technique-card">
            <h3>🐸 Breaststroke</h3>
            <ul>
              <li>Lift head forward (not up!) during arm pull</li>
              <li>Quick inhale above water</li>
              <li>Face returns underwater during kick</li>
              <li>Exhale slowly during glide phase</li>
              <li>One breath per stroke cycle</li>
            </ul>
            <div className="tip">
              💡 Timing is key: Pull, Breathe, Kick, Glide!
            </div>
          </div>

          <div className="technique-card">
            <h3>🦋 Butterfly</h3>
            <ul>
              <li>Lift head forward during arm pull</li>
              <li>Keep chin close to water surface</li>
              <li>Quick inhale through mouth</li>
              <li>Face back down immediately</li>
              <li>Breathe every 2-3 strokes</li>
            </ul>
            <div className="tip advanced">
              ⚠️ Most difficult - practice others first!
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="drills-section"
      >
        <h2>🎯 Breathing Drills to Practice</h2>
        <div className="drills-grid">
          <div className="drill-card">
            <h3>1. Bobbing</h3>
            <p>
              Stand in shallow water. Take a breath, dunk your head under,
              exhale through nose, come up, repeat. Do 10-20 reps.
            </p>
          </div>
          <div className="drill-card">
            <h3>2. Wall Breathing</h3>
            <p>
              Hold the pool wall. Put face in water, exhale, turn head to side,
              inhale, face back down. Practice the motion.
            </p>
          </div>
          <div className="drill-card">
            <h3>3. Push & Glide with Breathing</h3>
            <p>
              Push off wall, glide, take one breath mid-glide. Focus on head
              rotation, not lifting.
            </p>
          </div>
          <div className="drill-card">
            <h3>4. Kick with Breathing</h3>
            <p>
              Hold kickboard, kick while practicing freestyle breathing every
              3-4 kicks.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="motivation-box">
        <h3>🌟 Master Your Breathing!</h3>
        <p>
          Once you nail the breathing, everything else falls into place. It's
          literally the difference between swimming and struggling!
        </p>
        <p className="final-roast">
          (So no more excuses about "can't breathe" okay? 😎)
        </p>
      </div>
    </div>
  );
}

export default Breathing;
