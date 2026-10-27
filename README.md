# Galaxy

A React portfolio with a full-screen Galaxy home and the supplied GooeyNav.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local URL printed by Vite. Build with `npm.cmd run build`.

The supplied WebGL shader lives in `src/components/Galaxy/Galaxy.jsx`. `GalaxyBackground.jsx` configures it and provides reduced-motion, mobile-quality, and WebGL fallback behavior. The supplied GooeyNav source lives in `src/components/GooeyNav/`. The other navigation destinations show a coming-soon message until their pages are built.

The About page has a navy-and-lavender portrait layout with editable contact and language placeholders. The Education section contains a responsive, scroll-driven SVG journey with editable academic placeholders. The Projects section uses Aceternity UI's container scroll animation around a scrollable, clickable project archive. The About route retains site navigation and the footer.

Earth textures: `public/assets/earth-day.png` is [NASA Goddard SVS Blue Marble](https://svs.gsfc.nasa.gov/2915/); `public/assets/earth-clouds.jpg` is [NASA Visible Earth Blue Marble: Clouds](https://visibleearth.nasa.gov/images/57747/blue-marble-clouds/77558l). Credit: NASA/GSFC, Reto Stöckli.
