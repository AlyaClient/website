import { ShaderCanvas } from "./components/ShaderCanvas.tsx";
import { NoiseButton } from "./components/NoiseButton.tsx";
import { Header } from "./components/Header.tsx";
import { ScreenshotGallery } from "./components/ScreenshotGallery.tsx";

const island = {
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.07)",
  background: "rgba(255,255,255,0.045)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
};

const modules: { category: string; name: string; desc: string }[] = [
  // Combat
  { category: "Combat", name: "Killaura", desc: "Automatically attacks nearby entities within range. Has legit rotation modes to mimic natural mouse movement." },
  { category: "Combat", name: "Velocity", desc: "Reduces or cancels knockback received from hits, letting you hold your position in fights." },
  { category: "Combat", name: "Criticals", desc: "Ensures every hit registers as a critical hit by mimicking a small hop at the moment of attack." },
  { category: "Combat", name: "Autoclicker", desc: "Automates left clicks at a configurable CPS range to maintain consistent attack speed." },
  { category: "Combat", name: "Click Assist", desc: "Boosts your natural clicks to a higher effective CPS without fully automating input." },
  { category: "Combat", name: "Target Strafe", desc: "Automatically circles around your current target to make you harder to hit." },
  // Movement
  { category: "Movement", name: "Flight", desc: "Let's you fly. Supports Vanilla and bypass modes." },
  { category: "Movement", name: "Speed", desc: "Increases your horizontal movement speed beyond the normal sprint cap." },
  { category: "Movement", name: "Longjump", desc: "Boosts the distance covered on a single jump, useful for crossing gaps." },
  { category: "Movement", name: "Highjump", desc: "Increases jump height to reach elevated positions without a ladder or block." },
  { category: "Movement", name: "Wee", desc: "Don't ask." },
  { category: "Render", name: "ClickGUI", desc: "The interface for toggling and configuring all modules. Press a keybind to open." },
  { category: "Render", name: "HUD", desc: "Displays a customisable overlay including coordinates (soon™), FPS, server info (soon™), and more (soon™)." },
  { category: "Render", name: "Keystrokes", desc: "Shows your W/A/S/D/Jump and click inputs on screen in real time." },
  { category: "Render", name: "Fullbright", desc: "Removes all darkness from the game world, making caves and dark areas fully visible." },
  { category: "Render", name: "Arraylist", desc: "Lists all currently active modules on screen so you always know what's enabled." },
  { category: "Render", name: "Ambience", desc: "Change the time of day client-side to your liking." },
  { category: "Render", name: "ESP", desc: "Draws boxes or outlines around players and entities through walls." },
  // Player
  { category: "Player", name: "Sprint", desc: "Forces your character to sprint at all times, with modes for strafing or going backwards." },
  { category: "Player", name: "No Jump Delay", desc: "Removes the client-side delay between consecutive jumps for faster jumping." },
  { category: "Player", name: "No Right Click Delay", desc: "Eliminates the cooldown on right-click actions such as placing blocks or using items." },
  { category: "Player", name: "NoFall", desc: "Prevents fall damage." },
  { category: "Player", name: "Legit Scaffold", desc: "Auto-sneak on edge of block while building a bridge." },
  // World
  { category: "World", name: "Timer", desc: "Speeds up or slows down the game's internal tick rate, affecting movement and attack speed." },
  // Misc
  { category: "Misc", name: "Disabler", desc: "Sends specific packets to confuse or disable anti-cheat detection when supported." },
];

const stats = [
  { value: "1.8.9", label: "Minecraft" },
  { value: "30+", label: "Modules" },
  { value: "Open", label: "Source" },
];

export function App() {
  return (
    <div style="min-height: 100vh; background: #060310; color: #fff; position: relative;">
      <ShaderCanvas />
      <Header />

      <div style="position: relative; z-index: 10; padding-top: 72px; display: flex; flex-direction: column; gap: 2rem; padding-bottom: 6rem;">

        <div style="padding: 2rem 2rem 0;">
          <div style={{ ...island, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 72px - 4rem)", padding: "4rem 2rem", textAlign: "center" }}>
            <div style="display: inline-flex; align-items: center; gap: 0.5rem; border-radius: 9999px; border: 1px solid rgba(168,85,247,0.3); background: rgba(168,85,247,0.08); padding: 0.375rem 1rem; margin-bottom: 2rem;">
              <span style="font-size: 0.7rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(216,180,254,0.8);">
                Minecraft 1.8.9
              </span>
            </div>

            <div style="display: flex; align-items: center; justify-content: center; gap: 1.5rem; margin-bottom: 1.25rem;">
              <img src="/image/logo.png" alt="Alya logo" style="height: clamp(4rem, 13vw, 8rem); width: auto;" />
              <h1 style="font-family: 'Geist', sans-serif; font-size: clamp(5rem, 16vw, 10rem); font-weight: 700; letter-spacing: -0.02em; line-height: 1.05; color: #fff; margin: 0;">
                Alya
              </h1>
            </div>

            <p style="font-size: 1rem; font-weight: 400; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 1.25rem;">
              Utility Mod
            </p>

            <p style="max-width: 380px; font-size: 0.9rem; line-height: 1.75; color: rgba(255,255,255,0.32); margin-bottom: 3rem;">
              A minimal, performance-focused utility mod for Minecraft 1.8.9.
              Built for precision. Designed to stay out of your way.
            </p>

            <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
              <NoiseButton href="https://github.com/AlyaClient/alya/releases/download/" variant="primary">
                Download
              </NoiseButton>
              <NoiseButton href="https://github.com/AlyaClient/alya" variant="secondary">
                View on GitHub
              </NoiseButton>
            </div>
          </div>
        </div>

        <div style="padding: 0 2rem; max-width: 1400px; margin: 0 auto; width: 100%; box-sizing: border-box;">
          <div style={{ ...island, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", padding: "2rem" }}>
            {stats.map(({ value, label }) => (
              <div key={label} style="text-align: center; padding: 1rem;">
                <p style="font-family: 'Geist', sans-serif; font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 0.25rem;">{value}</p>
                <p style="font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.3);">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div style="padding: 0 2rem; max-width: 1400px; margin: 0 auto; width: 100%; box-sizing: border-box;">
          <div style={{ ...island, padding: "2.5rem" }}>
            <p style="font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.25); margin-bottom: 2rem; text-align: center;">
              Screenshots
            </p>
            <ScreenshotGallery />
          </div>
        </div>

        <div style="padding: 0 2rem; max-width: 1400px; margin: 0 auto; width: 100%; box-sizing: border-box;">
          <div style={{ ...island, padding: "2.5rem" }}>
            <p style="font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.25); margin-bottom: 2rem; text-align: center;">
              Modules
            </p>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.06); border-radius: 10px; overflow: hidden;">
              {modules.map(({ category, name, desc }) => (
                <div key={name} style="padding: 1.75rem; background: rgba(255,255,255,0.02);">
                  <p style="font-size: 0.65rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(168,85,247,0.7); margin-bottom: 0.375rem;">{category}</p>
                  <p style="font-family: 'Geist', sans-serif; font-size: 0.95rem; font-weight: 600; color: rgba(255,255,255,0.9); margin-bottom: 0.5rem;">{name}</p>
                  <p style="font-size: 0.8rem; line-height: 1.6; color: rgba(255,255,255,0.35);">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
