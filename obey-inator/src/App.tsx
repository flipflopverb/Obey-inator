import { ChordProgressionGenerator } from "./components/ChordProgressionGenerator";
import { useEffect, useRef } from "react";
import "./index.css";

const marqueePhrases = [
  "TERMS ENFORCED",
  "EXPERIMENT RESPONSIBLY"
];

const headerStyle = {
  marginBottom: '0px',
  paddingBottom: '0px',
  display: 'block'
};

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Characters to use
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Calculate columns (every 40 pixels)
    const columnWidth = 40;
    const columns = Math.floor(canvas.width / columnWidth);
    
    // Track position and state for each column
    const drops: Array<{ y: number; active: boolean; speed: number; chars: string[] }> = [];
    
    // Initialize columns
    for (let i = 0; i < columns; i++) {
      drops.push({
        y: Math.random() * -canvas.height,
        active: Math.random() > 0.7, // Start with some inactive columns
        speed: 0.5 + Math.random() * 1.5, // Slow drift speed
        chars: []
      });
    }

    // Track red streams (horizontal and vertical)
    const redLines: Array<{ x: number; y: number; text: string; speed: number; endTime: number; direction: 'left' | 'right' | 'up' }> = [];
    
    const createRedLine = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
      let text = '';
      for (let i = 0; i < 40; i++) { // Increased length to 40 characters
        text += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      
      const direction = Math.random() < 0.33 ? 'up' : (Math.random() < 0.5 ? 'left' : 'right');
      let startData = { x: 0, y: 0, speed: 0 };
      
      if (direction === 'left') {
        startData = {
          x: -300,
          y: Math.random() * canvas.height,
          speed: 8 + Math.random() * 4
        };
      } else if (direction === 'right') {
        startData = {
          x: canvas.width + 300,
          y: Math.random() * canvas.height,
          speed: -(8 + Math.random() * 4)
        };
      } else { // up
        startData = {
          x: Math.random() * canvas.width,
          y: canvas.height + 50,
          speed: 6 + Math.random() * 3
        };
      }
      
      redLines.push({
        x: startData.x,
        y: startData.y,
        text: text,
        speed: startData.speed,
        direction: direction,
        endTime: Date.now() + 7000
      });
    };

    // Start the red line schedule
    let lastRedLineTime = 0;
    
    // Animation function
    const animate = () => {
      // Clear canvas completely (no trail effect)
      ctx.fillStyle = 'rgba(10, 10, 10, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text style
      ctx.font = '16px "Share Tech Mono", monospace';

      // Create new red line every 7 seconds
      if (Date.now() - lastRedLineTime > 7000) {
        createRedLine();
        lastRedLineTime = Date.now();
      }

      // Update and draw red lines
      for (let i = redLines.length - 1; i >= 0; i--) {
        const line = redLines[i];
        
        // Update position based on direction
        if (line.direction === 'up') {
          line.y += line.speed; // Moving up (negative speed)
        } else {
          line.x += line.speed; // Moving left or right
        }
        
        // Draw red line
        ctx.fillStyle = 'rgba(255, 0, 0, 0.9)'; // Brighter red
        
        if (line.direction === 'up') {
          // Rotate text for vertical movement
          ctx.save();
          ctx.translate(line.x, line.y);
          ctx.rotate(-Math.PI / 2); // 90 degrees counter-clockwise
          ctx.fillText(line.text, 0, 0);
          ctx.restore();
        } else {
          ctx.fillText(line.text, line.x, line.y);
        }
        
        // Remove line if off screen or expired
        let offScreen = false;
        if (line.direction === 'left' && line.x > canvas.width + 300) offScreen = true;
        if (line.direction === 'right' && line.x < -300) offScreen = true;
        if (line.direction === 'up' && line.y < -100) offScreen = true;
        
        if (offScreen || Date.now() > line.endTime) {
          redLines.splice(i, 1);
        }
      }

      // Draw normal matrix rain (always grayscale now)
      for (let i = 0; i < columns; i++) {
        const column = drops[i];
        const x = i * columnWidth + columnWidth / 2;

        // Always grayscale
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'; // 60% transparent white

        // Randomly activate/deactivate columns for gaps
        if (!column.active) {
          if (Math.random() > 0.98) { // Rarely activate
            column.active = true;
            column.y = -20;
            column.chars = [];
          }
          continue;
        }

        // Add new character at the top with gaps
        if (Math.random() > 0.95 && column.chars.length < 15) {
          const char = characters.charAt(Math.floor(Math.random() * characters.length));
          column.chars.push({ char, y: -20 });
        }

        // Update and draw characters
        column.chars = column.chars.filter((charObj: any) => {
          charObj.y += column.speed;
          
          // Draw character
          ctx.fillText(charObj.char, x, charObj.y);
          
          // Remove if off screen
          return charObj.y < canvas.height + 20;
        });

        // Deactivate column if empty and random chance
        if (column.chars.length === 0 && Math.random() > 0.99) {
          column.active = false;
        }
      }

      requestAnimationFrame(animate);
    };

    // Handle window resize
    window.addEventListener('resize', resizeCanvas);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="matrix-rain-background" />
      <div>
        <header className="text-center sticky-header" style={headerStyle}>
          <h1 className="cyberpunk-title glitch-effect" data-text="OBEYINATOR" style={{fontSize: '4.5rem', fontWeight: '900', textAlign: 'center', display: 'block', width: '100%', marginBottom: '0px'}}>
            OBEYINATOR
          </h1>
          <div className="text-center" style={{marginTop: '-20px', marginBottom: '0px', paddingTop: '0px', paddingBottom: '0px'}}>
            <p className="cyberpunk-subtitle mb-0 glitch-effect" data-text="Developed by" style={{fontSize: '0.8rem', textAlign: 'center', display: 'block', width: '100%', padding: '0', margin: '0 0 2px 0'}}>
              Developed by
            </p>
            <p className="cyberpunk-subtitle glitch-effect" data-text="MYDYTECH" style={{fontSize: '1.1rem', textAlign: 'center', display: 'block', width: '100%', marginTop: '0', padding: '0', margin: '0'}}>
              MYDYTECH
            </p>
          </div>
        </header>

        <div style={{minHeight: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column'}}>
          <main style={{flex: 1, paddingBottom: '120px'}}>
            <ChordProgressionGenerator />
          </main>
          
          <footer className="cyberpunk-footer">
            <div className="footer-text-container">
              <div className="footer-text glitch-effect" data-text="TERMS ENFORCED • EXPERIMENT RESPONSIBLY">
                TERMS ENFORCED • EXPERIMENT RESPONSIBLY
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
