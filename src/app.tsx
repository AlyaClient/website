import { ShaderCanvas } from "./components/ShaderCanvas.tsx";
import { NoiseButton } from "./components/NoiseButton.tsx";
import { Header } from "./components/Header.tsx";
import { ScreenshotGallery } from "./components/ScreenshotGallery.tsx";

const modules: { category: string; name: string; desc: string }[] = [
  // combat
  { category: "Combat", name: "Killaura", desc: "Automatically attacks nearby entities within range. Has legit rotation modes to mimic natural mouse movement." },
  { category: "Combat", name: "Velocity", desc: "Reduces or cancels knockback received from hits, letting you hold your position in fights." },
  { category: "Combat", name: "Criticals", desc: "Ensures every hit registers as a critical hit by mimicking a small hop at the moment of attack." },
  { category: "Combat", name: "Autoclicker", desc: "Automates left clicks at a configurable CPS range to maintain consistent attack speed." },
  { category: "Combat", name: "Click Assist", desc: "Boosts your natural clicks to a higher effective CPS without fully automating input." },
  { category: "Combat", name: "Target Strafe", desc: "Automatically circles around your current target to make you harder to hit." },
  // movement
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
  // player
  { category: "Player", name: "Sprint", desc: "Forces your character to sprint at all times, with modes for strafing or going backwards." },
  { category: "Player", name: "No Jump Delay", desc: "Removes the client-side delay between consecutive jumps for faster jumping." },
  { category: "Player", name: "No Right Click Delay", desc: "Eliminates the cooldown on right-click actions such as placing blocks or using items." },
  { category: "Player", name: "NoFall", desc: "Prevents fall damage." },
  { category: "Player", name: "Legit Scaffold", desc: "Auto-sneak on edge of block while building a bridge." },
  // world
  { category: "World", name: "Timer", desc: "Speeds up or slows down the game's internal tick rate, affecting movement and attack speed." },
  // misc
  { category: "Misc", name: "Disabler", desc: "Sends specific packets to confuse or disable anti-cheat detection when supported." },
];

const stats = [
  { value: "1.8.9", label: "Minecraft" },
  { value: "30+", label: "Modules" },
  { value: "Open", label: "Source" },
];

export function App() {
  return (
    <div class="page">
      <ShaderCanvas />
      <Header />

      <div class="page-content">

        <div class="hero">
          <div class="island hero-island">
            <div class="hero-logo-row">
              <img src="/image/logo.png" alt="Alya logo" class="hero-logo" />
              <h1 class="hero-title">Alya</h1>
            </div>

            <p class="hero-subtitle">
              A minimal, performance-focused utility mod for Minecraft 1.8.9.
              Built for precision. Designed to stay out of your way.
            </p>

            <div class="hero-buttons">
              <NoiseButton href="https://github.com/AlyaClient/alya/releases/" variant="primary">
                Download
              </NoiseButton>
              <NoiseButton href="https://github.com/AlyaClient/alya" variant="secondary">
                View on GitHub
              </NoiseButton>
            </div>
          </div>
        </div>

        <div class="island-wrapper">
          <div class="island stats-grid">
            {stats.map(({ value, label }) => (
              <div key={label} class="stat-item">
                <p class="stat-value">{value}</p>
                <p class="stat-label">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div class="island-wrapper">
          <div class="island section-island">
            <p class="section-heading">Screenshots</p>
            <ScreenshotGallery />
          </div>
        </div>

        <div class="island-wrapper">
          <div class="island section-island">
            <p class="section-heading">Modules</p>
            <div class="modules-grid">
              {modules.map(({ category, name, desc }) => (
                <div key={name} class="module-card">
                  <p class="module-category">{category}</p>
                  <p class="module-name">{name}</p>
                  <p class="module-description">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
