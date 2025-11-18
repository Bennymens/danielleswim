import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Safety.css";

function Safety() {
  const safetyRules = [
    {
      emoji: "🏊‍♀️",
      title: "Never Swim Alone",
      description:
        "Always have a buddy or swim where lifeguards are present. This is rule #1 for a reason!",
      importance: "critical",
    },
    {
      emoji: "🛟",
      title: "Know Your Limits",
      description:
        "Don't venture into deep water until you're confident. There's no shame in staying in the shallow end!",
      importance: "high",
    },
    {
      emoji: "🚫",
      title: "No Running Near Pool",
      description:
        "Wet surfaces are slippery! Walk around the pool area to avoid accidents.",
      importance: "high",
    },
    {
      emoji: "🌊",
      title: "Respect the Water",
      description:
        "Ocean, lake, or pool - water deserves respect. Check conditions before swimming.",
      importance: "critical",
    },
    {
      emoji: "⛑️",
      title: "Learn CPR",
      description:
        "Knowing CPR can save a life. Take a basic first aid course.",
      importance: "medium",
    },
    {
      emoji: "🍺",
      title: "Never Swim Under Influence",
      description:
        "Alcohol and swimming don't mix. Stay sober in and around water.",
      importance: "critical",
    },
    {
      emoji: "⚡",
      title: "Weather Awareness",
      description:
        "Get out of water during storms. Lightning and water are a deadly combination.",
      importance: "critical",
    },
    {
      emoji: "👶",
      title: "Watch Children Closely",
      description:
        "Kids can drown in seconds. Never take your eyes off them near water.",
      importance: "critical",
    },
  ];

  const emergencySteps = [
    {
      step: 1,
      title: "Stay Calm",
      action:
        "If you're in trouble, don't panic. Panic uses energy and makes it worse.",
    },
    {
      step: 2,
      title: "Float on Your Back",
      action:
        "Roll onto your back and float. This conserves energy and keeps your head above water.",
    },
    {
      step: 3,
      title: "Signal for Help",
      action:
        "Wave one arm while floating. Don't wave both - you need one to stay afloat!",
    },
    {
      step: 4,
      title: "Call for Help",
      action:
        "Yell 'Help!' loudly. Don't be embarrassed - your life is more important.",
    },
  ];

  return (
    <div className="safety">
      <Link to="/" className="back-button">
        ← Back Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="safety-header"
      >
        <h1>🛟 Water Safety</h1>
        <p className="subtitle">
          The most important lesson - staying safe!
          <br />
          <span className="roast">
            (Because we actually want you to survive this... 😏)
          </span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="intro-box"
      >
        <h2>⚠️ Why Safety Matters</h2>
        <p>
          Swimming is fun, but water can be dangerous if you're not careful.
          These rules aren't meant to scare you - they're meant to keep you safe
          so you can enjoy swimming for years to come!
        </p>
      </motion.div>

      <div className="rules-section">
        <h2>📋 Essential Safety Rules</h2>
        <div className="rules-grid">
          {safetyRules.map((rule, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`rule-card ${rule.importance}`}
            >
              <div className="rule-emoji">{rule.emoji}</div>
              <h3>{rule.title}</h3>
              <p>{rule.description}</p>
              {rule.importance === "critical" && (
                <span className="critical-badge">Critical</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="emergency-section"
      >
        <h2>🆘 What to Do in an Emergency</h2>
        <p className="emergency-intro">
          If you find yourself in trouble in the water:
        </p>
        <div className="emergency-steps">
          {emergencySteps.map((item) => (
            <div key={item.step} className="emergency-step">
              <div className="step-number">{item.step}</div>
              <div className="step-content">
                <h3>{item.title}</h3>
                <p>{item.action}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="emergency-note">
          <strong>Remember:</strong> The best emergency is the one that never
          happens. Follow safety rules and know your limits!
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="tips-section"
      >
        <h2>💡 Additional Safety Tips</h2>
        <div className="tips-grid">
          <div className="tip-box">
            <h3>🏖️ Open Water Swimming</h3>
            <ul>
              <li>Check for riptides and currents</li>
              <li>Swim parallel to shore</li>
              <li>Wear bright-colored cap for visibility</li>
              <li>Be aware of boats and jet skis</li>
            </ul>
          </div>
          <div className="tip-box">
            <h3>🏊 Pool Safety</h3>
            <ul>
              <li>Know where the deep end starts</li>
              <li>Don't dive in shallow water</li>
              <li>Stay away from drains and suction outlets</li>
              <li>Follow all posted rules</li>
            </ul>
          </div>
          <div className="tip-box">
            <h3>🌅 Before Swimming</h3>
            <ul>
              <li>Do a proper warm-up</li>
              <li>Don't swim on a full stomach</li>
              <li>Check water temperature</li>
              <li>Know the location of safety equipment</li>
            </ul>
          </div>
          <div className="tip-box">
            <h3>🩹 After Swimming</h3>
            <ul>
              <li>Shower to remove chlorine/salt</li>
              <li>Dry ears properly to prevent infection</li>
              <li>Hydrate with water</li>
              <li>Report any injuries or hazards</li>
            </ul>
          </div>
        </div>
      </motion.div>

      <div className="motivation-box">
        <h3>🌟 Stay Safe, Have Fun!</h3>
        <p>
          Following these safety rules doesn't make you a wimp - it makes you
          smart! The goal is to enjoy swimming safely for a lifetime.
        </p>
        <p className="final-note">
          (Now you have no excuses - you know how to swim AND how to stay safe!
          😎)
        </p>
      </div>
    </div>
  );
}

export default Safety;
