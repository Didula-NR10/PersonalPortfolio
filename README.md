# Galaxy

A React portfolio with a full-screen Galaxy home, the supplied GooeyNav, and a cinematic About page.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local URL printed by Vite. Build with `npm.cmd run build`.

The supplied WebGL shader lives in `src/components/Galaxy/Galaxy.jsx`. `GalaxyBackground.jsx` configures it and provides reduced-motion, mobile-quality, and WebGL fallback behavior. The supplied GooeyNav source lives in `src/components/GooeyNav/`. The other navigation destinations show a coming-soon message until their pages are built.

Use **About** in the navigation or open `/#about` to view the observatory page. The holographic identity projection opens a keyboard-accessible profile dialog. The observatory uses the original Earth artwork as its background. Its Journey action leads to a short gateway because the Flight Path page is not present in this checkout.

The About card uses `public/assets/didula-portrait.png` as its portrait above the neutral `public/assets/projector-cup.png` holder. Change `profileImageUrl` in `src/config.js` to replace the portrait.

The observatory background is `public/assets/observatory-earth.png`. The earlier Earth-free compositing plate and Earth textures remain in `public/assets/` but are not used by the current page.

Earth textures: `public/assets/earth-day.png` is [NASA Goddard SVS Blue Marble](https://svs.gsfc.nasa.gov/2915/); `public/assets/earth-clouds.jpg` is [NASA Visible Earth Blue Marble: Clouds](https://visibleearth.nasa.gov/images/57747/blue-marble-clouds/77558l). Credit: NASA/GSFC, Reto Stöckli.
