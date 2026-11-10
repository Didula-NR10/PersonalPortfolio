# Portfolio performance audit

## Baseline and scope

- Baseline production build: 2,604 modules; main JavaScript 1,539.32 kB (452.94 kB gzip); CSS 159.14 kB (29.88 kB gzip).
- The home page mounts the services Three.js canvas even when the services section is below the viewport. The canvas used a continuous frame loop.
- The services travel animation passed GSAP progress into React state on each animation update. This rerendered the services component tree during a 3.25-second transition.
- The 2D travel overlay calculated sine and cosine values four times per particle per frame for 350 particles, and recalculated the viewport diagonal every frame.
- The Earth scene created three identical sphere geometries, producing separate CPU and GPU geometry resources.
- The navigation performed section-position reads on every scroll event.
- Galaxy scenes and the reference sculpture already had viewport or visibility controls. The reference sculpture is currently not mounted on any route because `ReferencesSection` is unused.

## Changes

| Area | Change | Expected effect | Visual behavior |
| --- | --- | --- | --- |
| Services travel | Store GSAP progress in a ref read by the overlay drawing loop | Avoids React updates and subtree renders for progress-only changes | Same progress value drives the same 350-particle overlay |
| Services canvas | Switch between continuous and demand rendering based on section and tab visibility | Stops unnecessary WebGL frames when the section is offscreen or tab is hidden | Scene remains mounted; rendering resumes when visible |
| Travel overlay | Cache particle sine/cosine values and viewport diagonal; set line cap once per frame | Removes repeated calculations and canvas state writes in the hot loop | Same coordinates, stroke widths, colors, and timing |
| Earth scene | Share one identical sphere geometry across surface, clouds, and atmosphere | Removes two geometry allocations and GPU uploads | Same geometry dimensions, materials, lights, and rotations |
| Earth hidden tab | Cancel the pending animation frame while hidden and restart on visibility | Avoids hidden-tab callbacks | Existing elapsed-time clamp prevents a rotation jump |
| Navigation | Coalesce scroll and resize work into one animation frame | Reduces repeated layout reads during bursts of scroll events | Active navigation updates on the next paint |
| Services cleanup | Clear a pending reduced-motion arrival timer on navigation and unmount | Prevents a stale state update | Same 50 ms arrival behavior |

## Validation

- Final production build: 2,604 modules; main JavaScript 1,540.19 kB (453.25 kB gzip); CSS 159.14 kB (29.88 kB gzip). The main bundle grew by 0.87 kB; this work does not claim a loading-time improvement.
- Build succeeds. No visual assets, particle counts, materials, geometry detail, animation durations, or rendering resolution were changed.
- Comparable 1280 × 800 home screenshots are saved in `.performance/before/first-home-1280.png` and `.performance/after/first-home-1280.png`. The layout and artwork match on inspection; animated details are at different moments.
- The available headless Edge browser crashed or captured incorrect viewport positions on deeper hash sections. Its DevTools connection closed before returning FPS, frame-time, long-task, draw-call, heap, or React commit metrics. Those metrics are **not measured** here.
- Full desktop, tablet, and mobile visual regression coverage is **not complete**. The References section is not reachable in the current application, so it cannot be verified as a page.

## Remaining work

Run a stable interactive-browser profile for home, services travel, Earth, and route navigation at desktop, tablet, and mobile sizes. Collect frame times, React commits, GPU draw calls, heap growth, and matching screenshots before claiming a measured runtime improvement. Route splitting and asset re-encoding were left unchanged because this environment could not verify the resulting loading and visual behavior.
