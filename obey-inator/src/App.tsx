import { ChordProgressionGenerator } from "./components/ChordProgressionGenerator";
import "./index.css";

const marqueePhrases = [
  "LICENSED INNOVATION",
  "EXPRESS YOURSELF RESPONSIBLY",
  "FREEDOM VERSION",
  "SOUND SAFELY OPTIMIZED",
  "ART WITH GUARDRAILS",
  "YOUR VOICE CALIBRATED",
  "DISRUPTION PRE APPROVED",
  "FEEL MORE DEVIATE LESS",
  "CREATIVITY STANDARDIZED",
  "BREAK RULES SELECTIVELY",
  "RATE LIMITED INSPIRATION",
  "ORIGINALITY WITHIN TOLERANCE",
  "MAKE NOISE STAY COMPLIANT",
  "NEW SOUNDS SAME STRUCTURE",
  "EXPRESSION SANDBOXED",
  "BOLD IDEAS CLEAR BOUNDARIES",
  "IMAGINATION MONITORED",
  "RISK ADJUSTED CREATIVITY",
  "EXPLORE BUT DONT WANDER",
  "INNOVATION YOU CAN TRUST",
  "MANAGED CHAOS",
  "CREATE SAFELY",
  "ART ALIGNED",
  "FORMATTED FUTURE",
  "SOUND WITHIN LIMITS",
  "PUSH FORWARD NOT SIDEWAYS",
  "CREATIVITY UNDER CONTROL",
  "NEW IS ACCEPTABLE",
  "INSPIRED NOT UNPREDICTABLE",
  "EXPRESS LESS NOISE",
  "VISION WITHIN SCOPE",
  "MUSIC OPTIMIZED FOR HARMONY",
  "EXPERIMENT RESPONSIBLY",
  "DESIGNED TO INSPIRE",
  "TERMS ENFORCED",
  "ORIGINAL NOT DIVERGENT",
  "FREEDOM DEFINED",
  "CREATIVE BOUNDARIES"
];

const headerStyle = {
  marginBottom: '0px',
  paddingBottom: '0px',
  display: 'block'
};

export function App() {
  return (
    <>
      <div>
        <header className="text-center" style={headerStyle}>
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

        <footer className="cyberpunk-footer">
          <div className="marquee-container">
            <div className="marquee-text glitch-effect" data-text={marqueePhrases.join(" • ") + " • • • " + marqueePhrases.join(" • ")}>
              {marqueePhrases.join(" • ")} • • • {marqueePhrases.join(" • ")}
            </div>
          </div>
        </footer>

        <main>
          <ChordProgressionGenerator />
        </main>
        

      </div>
    </>
  );
}

export default App;
