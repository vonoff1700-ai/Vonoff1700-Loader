import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";

export default function Vonoff1700Loader() {
  const [showUI, setShowUI] = useState(true);
  const [aimSpeed, setAimSpeed] = useState(50);
  const [selectedBone, setSelectedBone] = useState("Head");
  const [fov, setFov] = useState(90);
  const [menuTab, setMenuTab] = useState("Aimbot");
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [theme, setTheme] = useState("Dark");

  useEffect(() => {
    const toggleUI = (e) => {
      if (e.code === "Insert") {
        setShowUI((prev) => !prev);
        if (soundEnabled) new Audio("/click.mp3").play();
      }
    };
    window.addEventListener("keydown", toggleUI);
    return () => window.removeEventListener("keydown", toggleUI);
  }, [soundEnabled]);

  const logAction = (msg) => {
    setConsoleLogs((prev) => [...prev.slice(-19), msg]);
  };

  const themeClasses = {
    Dark: "bg-[#1e1e1e]/80 text-white",
    Light: "bg-[#f4f4f4]/80 text-black",
    Neon: "bg-black/80 text-[#39ff14]",
  };

  if (!showUI) return null;

  const tabs = ["Aimbot", "Visuals", "Misc", "Movement", "Settings"];

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
      style={{ backgroundImage: "url('/mnt/data/IMG_0008.png')" }}
    >
      <Rnd
        default={{ x: 100, y: 100, width: 600, height: "auto" }}
        minWidth={300}
        bounds="window"
      >
        <div className={`${themeClasses[theme]} font-sans w-full p-4 rounded-2xl shadow-2xl backdrop-blur-md`}>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-[#00ff88]">vonoff1700 Loader</h1>
            <div className="flex gap-2">
              <button className="bg-[#333] px-2 py-1 rounded text-white">_</button>
              <button className="bg-[#333] px-2 py-1 rounded text-white">X</button>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setMenuTab(tab)}
                className={`px-3 py-1 rounded ${
                  menuTab === tab ? "bg-[#00ff88] text-black" : "bg-[#2d2d2d] text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Aimbot Tab */}
          {menuTab === "Aimbot" && (
            <div>
              <label className="block mb-1">Enable Aimbot <input type="checkbox" className="ml-2" /></label>
              <label className="block mb-1">Silent Aim <input type="checkbox" className="ml-2" /></label>
              <label className="block mb-1">Auto Aim <input type="checkbox" className="ml-2" /></label>
              <label className="block mt-2">Aim Speed: {aimSpeed}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={aimSpeed}
                onChange={(e) => setAimSpeed(e.target.value)}
                className="w-full"
              />
              <label className="block mt-2">Field of View: {fov}°</label>
              <input
                type="range"
                min="10"
                max="180"
                value={fov}
                onChange={(e) => setFov(e.target.value)}
                className="w-full"
              />
              <label className="block mt-2">Target Bone:</label>
              <select
                className="bg-[#2d2d2d] text-white p-2 rounded mt-1 w-full"
                value={selectedBone}
                onChange={(e) => setSelectedBone(e.target.value)}
              >
                <option value="Head">Head</option>
                <option value="Chest">Chest</option>
                <option value="Legs">Legs</option>
              </select>
              <label className="block mt-2">Aim Key:</label>
              <select className="bg-[#2d2d2d] text-white p-2 rounded mt-1 w-full">
                <option>Right Mouse</option>
                <option>Left Shift</option>
                <option>Caps Lock</option>
              </select>
              <label className="block mt-2">Preset:</label>
              <select className="bg-[#2d2d2d] text-white p-2 rounded w-full mt-1">
                <option>Legit</option>
                <option>Rage</option>
                <option>Custom</option>
              </select>
            </div>
          )}

          {/* Other tabs remain unchanged */}

          <div className="mt-4 max-h-32 overflow-y-auto bg-[#111] text-xs p-2 rounded border border-[#333]">
            <p className="text-[#00ff88] mb-1">Console Log:</p>
            {consoleLogs.length === 0 ? (
              <p className="text-gray-500 italic">No activity yet.</p>
            ) : (
              consoleLogs.map((log, idx) => <p key={idx}>[{idx + 1}] {log}</p>)
            )}
          </div>

          <p className="text-sm text-gray-400 mt-4">This is a mockup UI. Nothing actually works.</p>
        </div>
      </Rnd>
    </div>
  );
}
