import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Strokes.css";

function Strokes() {
  const [selectedStroke, setSelectedStroke] = useState(null);

  const strokes = [
    {
      id: "freestyle",
      name: "Freestyle (Front Crawl)",
      emoji: "🏊‍♀️",
      difficulty: "Beginner",
      description:
        "The fastest and most popular swimming stroke. Great for beginners!",
      steps: [
        "Body Position: Stay horizontal, face down in the water",
        "Arms: Alternate arm movements - one pulls while the other recovers above water",
        "Legs: Flutter kick - small, quick kicks from the hips",
        "Breathing: Turn your head to the side (not up!) every 2-3 strokes",
        "Rhythm: Kick 6 times for every arm cycle",
      ],
      tips: [
        "Keep your body streamlined like an arrow",
        "Don't lift your head up - it creates drag",
        "Breathe out underwater through your nose",
        "Rotate your hips with each stroke",
      ],
    },
    {
      id: "backstroke",
      name: "Backstroke",
      emoji: "🤽‍♀️",
      difficulty: "Beginner",
      description:
        "Swimming on your back - great for breathing since your face is always above water!",
      steps: [
        "Body Position: Float on your back, ears in water, hips up",
        "Arms: Alternate windmill motion - one pulls while other recovers",
        "Legs: Flutter kick like freestyle but on your back",
        "Head: Look straight up, keep your chin slightly tucked",
        "Entry: Pinky finger enters water first, arm straight",
      ],
      tips: [
        "Keep your hips near the surface",
        "Don't sit in the water - stay horizontal",
        "Breathe naturally - your face is out of water!",
        "Use your hips to help power each stroke",
      ],
    },
    {
      id: "breaststroke",
      name: "Breaststroke",
      emoji: "🐸",
      difficulty: "Intermediate",
      description:
        "The frog stroke! Slower but very efficient and you can keep your head up.",
      steps: [
        "Arms: Pull apart in a heart shape, then bring hands together",
        "Legs: Bend knees, bring heels to butt, then kick out and snap together",
        "Timing: Pull, breathe, kick, glide - in that order!",
        "Glide: Stretch out after each kick for momentum",
        "Breathing: Lift head forward (not up) during arm pull",
      ],
      tips: [
        "Think: Pull, Breathe, Kick, Glide",
        "Don't rush - the glide is important",
        "Kick like a frog, not like freestyle",
        "Keep your kicks narrow and powerful",
      ],
    },
    {
      id: "butterfly",
      name: "Butterfly",
      emoji: "🦋",
      difficulty: "Advanced",
      description:
        "The most challenging stroke - save this for when you're confident!",
      steps: [
        "Body: Dolphin-like wave motion through your entire body",
        "Arms: Both arms pull together underwater, then swing over together",
        "Legs: Dolphin kick - both legs together, kick from the hips",
        "Breathing: Lift head forward during arm pull, chin stays low",
        "Rhythm: 2 kicks per arm stroke - one small, one big",
      ],
      tips: [
        "Master freestyle first before attempting this!",
        "The power comes from your core, not just arms",
        "Stay relaxed - tension kills the rhythm",
        "This takes serious practice - don't get discouraged!",
      ],
    },
  ];

  return (
    <div className="strokes">
      <Link to="/" className="back-button">
        ← Back Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="strokes-header"
      >
        <h1>💪 Swimming Strokes Masterclass</h1>
        <p className="subtitle">
          Time to learn how to actually move through water!
          <br />
          <span className="roast">
            (Instead of just splashing around like usual 😏)
          </span>
        </p>
      </motion.div>

      <div className="strokes-grid">
        {strokes.map((stroke, index) => (
          <motion.div
            key={stroke.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`stroke-card ${
              selectedStroke === stroke.id ? "expanded" : ""
            }`}
            onClick={() =>
              setSelectedStroke(selectedStroke === stroke.id ? null : stroke.id)
            }
          >
            <div className="stroke-preview">
              <div className="stroke-emoji">{stroke.emoji}</div>
              <h2>{stroke.name}</h2>
              <span className={`difficulty ${stroke.difficulty.toLowerCase()}`}>
                {stroke.difficulty}
              </span>
              <p className="stroke-description">{stroke.description}</p>
              <button className="expand-button">
                {selectedStroke === stroke.id
                  ? "Show Less ▲"
                  : "Learn This Stroke ▼"}
              </button>
            </div>

            {selectedStroke === stroke.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="stroke-details"
              >
                <div className="steps-section">
                  <h3>📝 Step-by-Step Guide:</h3>
                  <ol>
                    {stroke.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="tips-section">
                  <h3>💡 Pro Tips:</h3>
                  <ul>
                    {stroke.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>

                {stroke.id === "freestyle" && (
                  <div className="note beginner-friendly">
                    ⭐ Start here! This is the easiest stroke to learn and
                    master.
                  </div>
                )}
                {stroke.id === "butterfly" && (
                  <div className="note advanced-warning">
                    ⚠️ This is genuinely difficult. Don't attempt until you're
                    comfortable with the other three strokes!
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="practice-section"
      >
        <h2>🎯 Practice Tips for All Strokes:</h2>
        <div className="practice-grid">
          <div className="practice-card">
            <h3>🎬 Start Slow</h3>
            <p>
              Learn the movements on land first. Practice the arm and leg
              motions before getting in the water.
            </p>
          </div>
          <div className="practice-card">
            <h3>⏱️ Consistent Practice</h3>
            <p>
              15 minutes of focused practice beats 1 hour of random splashing.
              Quality over quantity!
            </p>
          </div>
          <div className="practice-card">
            <h3>📹 Record Yourself</h3>
            <p>
              Have someone record you swimming. Seeing yourself helps spot
              mistakes.
            </p>
          </div>
          <div className="practice-card">
            <h3>🏊‍♂️ Get Feedback</h3>
            <p>
              Consider a lesson or two. A coach can correct bad habits early.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="motivation-box">
        <h3>🌟 You've Got This!</h3>
        <p>
          Every Olympic swimmer started exactly where you are now. Pick one
          stroke, practice it until you're comfortable, then move to the next!
        </p>
        <p className="final-note">
          (And yes, we'll be checking your progress... no more excuses! 😎)
        </p>
      </div>
    </div>
  );
}

export default Strokes;
