import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="cloud"></div>
      <div className="cloud"></div>
      <div className="cloud"></div>
      <div className="cloud"></div>
      <div className="animal">🐠</div>
      <div className="animal">🐬</div>
      <div className="animal">🐢</div>
      <div className="animal">🐋</div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero"
      >
        <h1 className="title">🏊‍♀️ Danielle's Swimming Academy</h1>
        <p className="subtitle">Because someone still hasn't learned... 😏</p>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="wave-emoji"
        >
          🌊
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="intro-section"
      >
        <h2>Welcome to Your Personal Swimming Journey!</h2>
        <p>
          No more excuses! It's time to finally learn how to swim. We've got
          everything from basics to advanced techniques.
        </p>
        <p className="roast">
          (Yes, we know you've been avoiding the pool... we see you! 👀)
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="featured-game"
      >
        <h2>🎮 NEW: Swim Challenge Game!</h2>
        <p>Practice your swimming skills in an actual game!</p>
        <Link to="/game" className="play-game-button">
          Play Now! 🏊‍♀️
        </Link>
      </motion.div>

      <div className="lesson-grid">
        <LessonCard
          to="/basics"
          emoji="🏊"
          title="Swimming Basics"
          description="Start here if you're a complete beginner (we know you are)"
          delay={0.7}
        />
        <LessonCard
          to="/strokes"
          emoji="💪"
          title="Swimming Strokes"
          description="Learn freestyle, backstroke, breaststroke & butterfly"
          delay={0.9}
        />
        <LessonCard
          to="/breathing"
          emoji="😮‍💨"
          title="Breathing Techniques"
          description="Master the art of not drowning while swimming"
          delay={1.1}
        />
        <LessonCard
          to="/safety"
          emoji="🛟"
          title="Water Safety"
          description="Important tips to stay safe in the water"
          delay={1.3}
        />
        <LessonCard
          to="/quiz"
          emoji="🎯"
          title="Test Your Knowledge"
          description="Think you've learned enough? Prove it!"
          delay={1.5}
        />
        <LessonCard
          to="/progress"
          emoji="🏆"
          title="Your Progress"
          description="Track your journey from landlubber to swimmer"
          delay={1.7}
        />
      </div>
    </div>
  );
}

function LessonCard({ to, emoji, title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to={to} className="lesson-card">
        <div className="card-emoji">{emoji}</div>
        <h3>{title}</h3>
        <p>{description}</p>
      </Link>
    </motion.div>
  );
}

export default Home;
