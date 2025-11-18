import { useEffect, useRef, useState } from "react";
import "./SwimGame.css";
import UnderwaterScene from "./UnderwaterScene";

function SwimGame() {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState("menu");
  const [oxygen, setOxygen] = useState(100); // Oxygen level 0-100
  const [distance, setDistance] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("swimHighScore") || "0")
  );
  const [is3DMode, setIs3DMode] = useState(false);

  const gameDataRef = useRef({
    player: {
      x: 100,
      y: 200,
      width: 60,
      height: 40,
      velocityY: 0,
      armAngle: 0,
      swimming: false,
      drowningTimer: 0,
      surfaceSwimming: false,
    },
    obstacles: [],
    collectibles: [],
    bubbles: [],
    speed: 2,
    frame: 0,
    isRunning: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const resizeCanvas = () => {
      canvas.width = Math.min(window.innerWidth - 40, 1400);
      canvas.height = Math.min(window.innerHeight * 0.75, 700);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" || e.key === "ArrowUp") {
        e.preventDefault();
        handleSwim();
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === "Space" || e.key === "ArrowUp") {
        e.preventDefault();
        handleSwimEnd();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState]);

  const startGame = () => {
    // Reset game state
    gameDataRef.current = {
      player: {
        x: 100,
        y: 200, // Default height, will be updated when canvas is ready
        width: 60,
        height: 40,
        velocityY: 0,
        armAngle: 0,
        swimming: false,
        drowningTimer: 0,
        surfaceSwimming: false,
      },
      obstacles: [],
      collectibles: [],
      bubbles: [],
      speed: 2,
      frame: 0,
      isRunning: true,
    };

    console.log("Game data reset, isRunning:", gameDataRef.current.isRunning);

    setOxygen(100);
    setDistance(0);
    setGameState("playing");

    // Wait for state update and canvas to be rendered
    setTimeout(() => {
      const canvas = canvasRef.current;
      console.log("Canvas element after timeout:", canvas);
      if (!canvas) {
        console.error("Canvas not found after timeout!");
        return;
      }

      const ctx = canvas.getContext("2d");
      console.log("Canvas context:", ctx);

      // Update player position with actual canvas height
      gameDataRef.current.player.y = canvas.height / 2;

      console.log("Game state set to playing, calling gameLoop");
      // Start game loop
      gameLoop();
    }, 100);
  };

  const gameLoop = () => {
    console.log("Game loop running, isRunning:", gameDataRef.current.isRunning);
    if (!gameDataRef.current.isRunning) {
      console.log("Game loop stopped because isRunning is false");
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    update();
    draw(ctx, canvas);

    requestAnimationFrame(gameLoop);
  };

  const update = () => {
    const canvas = canvasRef.current;
    const game = gameDataRef.current;
    const player = game.player;

    game.frame++;

    // Update distance
    setDistance((prev) => prev + 0.1);

    // Player physics - natural sinking with swimming control
    if (player.surfaceSwimming) {
      // Swim toward surface but don't go above water
      const surfaceLevel = 50;
      if (player.y > surfaceLevel) {
        // Strong upward force when below surface
        player.velocityY -= 0.8;
        player.velocityY = Math.max(player.velocityY, -6); // Cap upward speed
      } else {
        // At or above surface, maintain position
        player.velocityY = Math.max(player.velocityY, 0); // Don't go up further
        if (player.y < surfaceLevel) {
          player.y = surfaceLevel; // Keep at surface level
          player.velocityY = 0;
        }
      }
    } else {
      // Natural sinking when not swimming
      player.velocityY += 0.2; // Slower gravity for more controlled descent
      player.velocityY = Math.min(player.velocityY, 6); // Cap downward speed
    }
    player.y += player.velocityY;

    // Swimming animation
    if (player.swimming) {
      player.armAngle = (player.armAngle + 0.3) % (Math.PI * 2);

      // Spawn bubbles when swimming
      if (game.frame % 5 === 0) {
        game.bubbles.push({
          x: player.x + player.width / 2 + (Math.random() - 0.5) * 20,
          y: player.y + player.height,
          radius: Math.random() * 3 + 2,
          velocityX: (Math.random() - 0.5) * 2,
          velocityY: -Math.random() * 2 - 1,
        });
      }
    } else {
      player.armAngle *= 0.9; // Slow down animation when not swimming
    }

    // Boundaries - allow diving but encourage surface swimming
    if (player.y < 10) {
      player.y = 10;
      player.velocityY = 0;
    }
    if (player.y > canvas.height - player.height - 10) {
      player.y = canvas.height - player.height - 10;
      player.velocityY = 0;
    }

    // Spawn obstacles - removed jellyfish, keeping only collectibles
    // No obstacles to avoid, focus on surface swimming

    // Spawn collectibles
    if (game.frame % 80 === 0) {
      game.collectibles.push({
        x: canvas.width,
        y: Math.random() * (canvas.height - 30) + 20,
        width: 25,
        height: 25,
      });
    }

    // Update collectibles - give oxygen boost instead of score
    game.collectibles.forEach((col, index) => {
      col.x -= game.speed;

      // Check collection
      if (checkCollision(player, col)) {
        setOxygen((prev) => Math.min(100, prev + 20)); // Oxygen boost
        game.collectibles.splice(index, 1);
      }

      // Remove off-screen collectibles
      if (col.x + col.width < 0) {
        game.collectibles.splice(index, 1);
      }
    });

    // Oxygen system
    const surfaceLevel = 50; // Top 50 pixels is the "surface"
    if (player.y > surfaceLevel) {
      // Underwater - oxygen decreases
      setOxygen((prev) => Math.max(0, prev - 0.5));
    } else {
      // At surface - oxygen increases
      setOxygen((prev) => Math.min(100, prev + 1));
    }

    // Die when oxygen runs out
    if (oxygen <= 0) {
      endGame();
    }

    // Update bubbles
    game.bubbles.forEach((bubble, index) => {
      bubble.x += bubble.velocityX;
      bubble.y += bubble.velocityY;
      bubble.velocityY += 0.1; // Buoyancy

      // Remove bubbles that float to the top or go off-screen
      if (bubble.y < -10 || bubble.x < -10 || bubble.x > canvas.width + 10) {
        game.bubbles.splice(index, 1);
      }
    });
  };

  const draw = (ctx, canvas) => {
    const game = gameDataRef.current;
    const player = game.player;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw animated water background with waves
    drawWaterBackground(ctx, canvas, game.frame);

    // Draw bubbles
    drawBubbles(ctx, game.bubbles);

    // Draw collectibles (stars)
    drawCollectibles(ctx, game.collectibles);

    // Draw swimmer
    drawSwimmer(ctx, player);

    // Draw UI
    drawUI(ctx, oxygen, distance);

    // Draw oxygen warning if low
    if (oxygen < 30) {
      ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
      ctx.font = "bold 20px Arial";
      ctx.fillText(
        "LOW OXYGEN! Get to surface!",
        canvas.width / 2 - 120,
        canvas.height / 2
      );
    }
  };

  const drawWaterBackground = (ctx, canvas, frame) => {
    // Sky background (top half)
    const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height / 2);
    skyGradient.addColorStop(0, "#87CEEB"); // Sky blue
    skyGradient.addColorStop(1, "#E0F6FF"); // Light blue
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height / 2);

    // Draw clouds
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    for (let i = 0; i < 3; i++) {
      const cloudX = ((frame * 0.5 + i * 200) % (canvas.width + 100)) - 50;
      const cloudY = 50 + i * 30;

      // Cloud puffs
      ctx.beginPath();
      ctx.arc(cloudX, cloudY, 20, 0, Math.PI * 2);
      ctx.arc(cloudX + 25, cloudY, 25, 0, Math.PI * 2);
      ctx.arc(cloudX + 50, cloudY, 20, 0, Math.PI * 2);
      ctx.arc(cloudX + 25, cloudY - 15, 18, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw trees on the horizon
    ctx.fillStyle = "#228B22"; // Forest green
    for (let i = 0; i < 8; i++) {
      const treeX = ((i * 150 + frame * 0.2) % (canvas.width + 50)) - 25;
      const treeY = canvas.height / 2 - 20;

      // Tree trunk
      ctx.fillStyle = "#8B4513"; // Brown
      ctx.fillRect(treeX - 3, treeY, 6, 30);

      // Tree foliage
      ctx.fillStyle = "#228B22"; // Green
      ctx.beginPath();
      ctx.moveTo(treeX, treeY);
      ctx.lineTo(treeX - 15, treeY + 10);
      ctx.lineTo(treeX + 15, treeY + 10);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(treeX, treeY - 10);
      ctx.lineTo(treeX - 12, treeY + 5);
      ctx.lineTo(treeX + 12, treeY + 5);
      ctx.closePath();
      ctx.fill();
    }

    // Water surface line
    ctx.strokeStyle = "#4682B4";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    // Water background (bottom half)
    const waterGradient = ctx.createLinearGradient(
      0,
      canvas.height / 2,
      0,
      canvas.height
    );
    waterGradient.addColorStop(0, "#0ea5e9");
    waterGradient.addColorStop(0.5, "#0284c7");
    waterGradient.addColorStop(1, "#1e40af");
    ctx.fillStyle = waterGradient;
    ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

    // Add wave effect on surface
    ctx.save();
    ctx.globalAlpha = 0.4;
    for (let x = 0; x < canvas.width; x += 100) {
      const waveOffset = Math.sin(frame * 0.03 + x * 0.02) * 5;
      ctx.beginPath();
      ctx.moveTo(x, canvas.height / 2 + waveOffset);
      ctx.lineTo(x + 50, canvas.height / 2 + waveOffset);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
      ctx.lineWidth = 4;
      ctx.stroke();
    }
    ctx.restore();

    // Add light rays underwater
    ctx.save();
    ctx.globalAlpha = 0.1;
    for (let i = 0; i < 5; i++) {
      const x = (canvas.width / 5) * i + Math.sin(frame * 0.01 + i) * 30;
      ctx.beginPath();
      ctx.moveTo(x, canvas.height / 2);
      ctx.lineTo(x + 20, canvas.height);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    ctx.restore();
  };

  const drawBubbles = (ctx, bubbles) => {
    bubbles.forEach((bubble) => {
      ctx.save();
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    });
  };

  const drawCollectibles = (ctx, collectibles) => {
    collectibles.forEach((col) => {
      ctx.save();
      ctx.translate(col.x + col.width / 2, col.y + col.height / 2);
      ctx.rotate(Date.now() * 0.005);

      // Draw glowing star
      ctx.shadowColor = "#fbbf24";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const x = Math.cos(angle) * 15;
        const y = Math.sin(angle) * 15;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();

      // Inner star
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const x = Math.cos(angle) * 8;
        const y = Math.sin(angle) * 8;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });
  };

  const drawObstacles = (ctx, obstacles, frame) => {
    obstacles.forEach((obs) => {
      if (obs.type === "jellyfish") {
        // Draw realistic jellyfish
        ctx.save();
        ctx.translate(obs.x + obs.width / 2, obs.y + 20);

        // Bell (body)
        const wobble = Math.sin(frame * 0.05) * 3;
        ctx.beginPath();
        ctx.ellipse(0, 0, 18 + wobble, 15, 0, 0, Math.PI);
        ctx.fillStyle = "rgba(236, 72, 153, 0.8)";
        ctx.fill();
        ctx.strokeStyle = "rgba(219, 39, 119, 0.6)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Tentacles
        ctx.strokeStyle = "rgba(236, 72, 153, 0.9)";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        for (let i = 0; i < 6; i++) {
          const tentacleWave = Math.sin(frame * 0.1 + i) * 8;
          ctx.beginPath();
          ctx.moveTo(-12 + i * 4, 15);
          ctx.quadraticCurveTo(
            -12 + i * 4 + tentacleWave,
            25,
            -12 + i * 4 + tentacleWave * 0.5,
            40
          );
          ctx.stroke();
        }

        ctx.restore();
      }
    });
  };

  const drawSwimmer = (ctx, player) => {
    ctx.save();
    ctx.translate(player.x + player.width / 2, player.y + player.height / 2);

    // Side view stick man design (swimming horizontally)
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    // Head (circle) - positioned to the right for side view
    ctx.beginPath();
    ctx.arc(12, 0, 8, 0, Math.PI * 2);
    ctx.stroke();

    // Body (horizontal line for side view)
    ctx.beginPath();
    ctx.moveTo(4, 0);
    ctx.lineTo(-8, 0);
    ctx.stroke();

    // Arms (animated swimming motion) - positioned for side view
    const armAngle = player.armAngle;
    const armLength = 10;

    // Front arm (right side from our view)
    ctx.beginPath();
    ctx.moveTo(2, -2);
    ctx.lineTo(
      2 + Math.cos(armAngle) * armLength,
      -2 + Math.sin(armAngle) * armLength
    );
    ctx.stroke();

    // Back arm (left side from our view)
    ctx.beginPath();
    ctx.moveTo(2, 2);
    ctx.lineTo(
      2 + Math.cos(armAngle + Math.PI) * armLength,
      2 + Math.sin(armAngle + Math.PI) * armLength
    );
    ctx.stroke();

    // Legs (simple kick motion) - positioned for side view
    const legAngle = Math.sin(player.armAngle * 2) * 0.5;
    const legLength = 8;

    // Front leg
    ctx.beginPath();
    ctx.moveTo(-6, -2);
    ctx.lineTo(
      -6 + Math.cos(legAngle) * legLength,
      -2 + Math.sin(legAngle) * legLength
    );
    ctx.stroke();

    // Back leg
    ctx.beginPath();
    ctx.moveTo(-6, 2);
    ctx.lineTo(
      -6 + Math.cos(legAngle + Math.PI) * legLength,
      2 + Math.sin(legAngle + Math.PI) * legLength
    );
    ctx.stroke();

    // Swimming cap (triangle) - positioned for side view
    ctx.fillStyle = "#ec4899";
    ctx.beginPath();
    ctx.moveTo(8, -10);
    ctx.lineTo(16, -10);
    ctx.lineTo(12, -5);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  };

  const drawUI = (ctx, oxygen, distance) => {
    // Check if mobile (smaller screen)
    const isMobile = window.innerWidth < 768;

    // UI background - smaller container
    const uiWidth = isMobile ? 140 : 160;
    const uiHeight = isMobile ? 55 : 65;
    const fontSize = isMobile ? 14 : 16;

    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(10, 10, uiWidth, uiHeight);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, uiWidth, uiHeight);

    // Oxygen bar background
    const barWidth = uiWidth - 20;
    const barHeight = 10;
    const barY = 30;
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.fillRect(15, barY, barWidth, barHeight);

    // Oxygen bar fill
    const oxygenPercent = oxygen / 100;
    const fillColor =
      oxygen > 50 ? "#00ff00" : oxygen > 25 ? "#ffff00" : "#ff0000";
    ctx.fillStyle = fillColor;
    ctx.fillRect(15, barY, barWidth * oxygenPercent, barHeight);

    // Oxygen bar border
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.strokeRect(15, barY, barWidth, barHeight);

    // UI text - smaller on mobile
    ctx.fillStyle = "white";
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.fillText(`Oxygen: ${Math.round(oxygen)}%`, 15, 22);
    ctx.fillText(`Distance: ${distance.toFixed(0)}m`, 15, isMobile ? 50 : 55);
  };

  const checkCollision = (rect1, rect2) => {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  };

  const endGame = () => {
    gameDataRef.current.isRunning = false;
    setGameState("gameover");

    if (distance > highScore) {
      setHighScore(distance);
      localStorage.setItem("swimHighScore", distance.toString());
    }
  };

  const handleSwim = () => {
    if (gameState === "playing") {
      gameDataRef.current.player.swimming = true;
      gameDataRef.current.player.surfaceSwimming = true;
      // No velocity impulse - let physics handle gradual swimming
    }
  };

  const handleSwimEnd = () => {
    if (gameState === "playing") {
      gameDataRef.current.player.surfaceSwimming = false;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        gameState === "playing" &&
        (e.code === "Space" || e.code === "ArrowUp")
      ) {
        e.preventDefault();
        handleSwim();
      }
    };

    const handleKeyUp = (e) => {
      if (
        gameState === "playing" &&
        (e.code === "Space" || e.code === "ArrowUp")
      ) {
        e.preventDefault();
        handleSwimEnd();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState]);

  return (
    <div className="swim-game">
      <div className="game-header">
        <h1>🏊‍♀️ Danielle's Swimming Game</h1>
        <p>Help Danielle learn to swim!</p>
      </div>

      <div className="game-container">
        {gameState === "menu" && (
          <div className="game-menu">
            <div className="clouds">
              <div className="cloud">☁️</div>
              <div className="cloud">☁️</div>
              <div className="cloud">☁️</div>
            </div>
            <div className="animated-animals">
              <div className="animal">🐰</div>
              <div className="animal">🐦</div>
              <div className="animal">🐱</div>
              <div className="animal">🐰</div>
              <div className="animal">🐦</div>
              <div className="animal">🐱</div>
            </div>
            <h2>Ready to Swim? 🌊</h2>
            <div className="instructions">
              <p>
                <strong>Controls:</strong>
              </p>
              <p>🖱️ Hold mouse or tap to swim to surface</p>
              <p>⌨️ Hold SPACE or ↑ to swim to surface</p>
              <p>🌊 Stay near the surface to breathe!</p>
              <p>⚠️ Don't dive too deep or you'll drown!</p>
              <p>⭐ Collect stars for points!</p>
            </div>
            <div className="mode-toggle">
              <button
                onClick={() => setIs3DMode(!is3DMode)}
                className={`mode-button ${is3DMode ? "active" : ""}`}
              >
                {is3DMode ? "🎮 3D Mode" : "🎨 2D Mode"}
              </button>
            </div>
            <button onClick={startGame} className="start-button">
              Start Swimming! 🏊‍♀️
            </button>
            {highScore > 0 && (
              <div className="high-score">Best Distance: {highScore}m 🏆</div>
            )}
          </div>
        )}

        {gameState === "playing" && (
          <div className="game-play">
            {is3DMode ? (
              <UnderwaterScene
                score={score}
                distance={distance}
                player={gameDataRef.current.player}
                swimming={gameDataRef.current.player.swimming}
                armAngle={gameDataRef.current.player.armAngle}
              />
            ) : (
              <canvas
                ref={canvasRef}
                onMouseDown={handleSwim}
                onMouseUp={handleSwimEnd}
                onMouseLeave={handleSwimEnd}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleSwim();
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handleSwimEnd();
                }}
              />
            )}
            <div className="controls-hint">
              Hold mouse/tap or press SPACE to swim to surface! ⬆️
            </div>
          </div>
        )}

        {gameState === "gameover" && (
          <div className="game-over">
            <h2>Game Over! 💦</h2>
            <div className="final-stats">
              <div className="stat">
                <span className="stat-label">Distance Swum</span>
                <span className="stat-value">{distance.toFixed(0)}m</span>
              </div>
              <div className="stat">
                <span className="stat-label">Oxygen Left</span>
                <span className="stat-value">{Math.round(oxygen)}%</span>
              </div>
              {distance === highScore && distance > 0 && (
                <div className="new-record">🎉 NEW HIGH SCORE! 🎉</div>
              )}
            </div>
            <div className="game-over-message">
              {distance < 100 &&
                "Keep practicing! Even fish start somewhere! 🐟"}
              {distance >= 100 &&
                distance < 250 &&
                "Not bad! You're getting the hang of it! 💪"}
              {distance >= 250 &&
                distance < 500 &&
                "Great job! You're swimming like a pro! 🌟"}
              {distance >= 500 &&
                "WOW! Are you sure you can't swim in real life?! 🏆"}
            </div>
            <div className="game-over-buttons">
              <button onClick={startGame} className="play-again-button">
                Play Again 🔄
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SwimGame;
