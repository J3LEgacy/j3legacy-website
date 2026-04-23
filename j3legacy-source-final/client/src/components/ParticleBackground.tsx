/*
 * ParticleBackground — tsParticles interactive network for hero section
 * Design: "Tactical Glass" — connected dots forming a network topology
 * Colors: Navy dots with gold/white connecting lines
 */
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: false,
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        particles: {
          number: { value: 70, density: { enable: true } },
          color: { value: ["#C9952A", "#0B2545"] },
          shape: { type: "circle" },
          opacity: { value: { min: 0.3, max: 0.7 } },
          size: { value: { min: 1, max: 3 } },
          links: {
            enable: true,
            distance: 150,
            color: "#C9952A",
            opacity: 0.12,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "bounce" },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
          },
          modes: {
            grab: { distance: 140, links: { opacity: 0.3 } },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
