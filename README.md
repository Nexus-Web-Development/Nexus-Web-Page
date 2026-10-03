<div align="center">

<a href="https://nexus-official-site.vercel.app">
  <img src=".github/assets/hero.png" alt="Nexus — Where curiosity meets orbit" width="100%" />
</a>

<br />

<a href="https://nexus-official-site.vercel.app">
  <img src="https://readme-typing-svg.demolab.com?font=Michroma&size=20&duration=2600&pause=900&color=4DA3F0&center=true&vCenter=true&width=760&height=50&lines=WHERE+CURIOSITY+MEETS+ORBIT;RESEARCH+%E2%80%A2+SPACE+%E2%80%A2+TECHNOLOGY;MANIPAL+UNIVERSITY+JAIPUR;BUILT+BY+NEXUS+WEB+DEVELOPMENT" alt="Where curiosity meets orbit" />
</a>

<p>
  <b>The official website of Nexus, the Research, Space &amp; Technology Club at Manipal University Jaipur.</b><br />
  <sub>A real-time WebGL journey from low orbit to a ground station and back, built by the Nexus Web Development wing.</sub>
</p>

<p>
  <a href="https://nexus-official-site.vercel.app"><img src="https://img.shields.io/badge/%E2%86%97_Launch_site-nexus--official--site.vercel.app-4DA3F0?style=for-the-badge&logo=vercel&logoColor=white&labelColor=000000" alt="Live site" /></a>
</p>

<p>
  <img src="https://img.shields.io/badge/Three.js-r186-F0F0FA?style=flat-square&logo=three.js&logoColor=white&labelColor=000000" alt="Three.js" />
  <img src="https://img.shields.io/badge/GSAP-3.15-F0F0FA?style=flat-square&logo=greensock&logoColor=white&labelColor=000000" alt="GSAP" />
  <img src="https://img.shields.io/badge/Lenis-smooth_scroll-F0F0FA?style=flat-square&labelColor=000000" alt="Lenis" />
  <img src="https://img.shields.io/badge/Vite-8-F0F0FA?style=flat-square&logo=vite&logoColor=white&labelColor=000000" alt="Vite" />
  <img src="https://img.shields.io/badge/Hosted_on-Vercel-F0F0FA?style=flat-square&logo=vercel&logoColor=white&labelColor=000000" alt="Vercel" />
  <img src="https://img.shields.io/badge/Framework-none_·_vanilla_JS-F0F0FA?style=flat-square&logo=javascript&logoColor=white&labelColor=000000" alt="Vanilla JS" />
</p>

<p>
  <a href="#-the-experience"><b>Experience</b></a> ·
  <a href="#-quick-start"><b>Quick start</b></a> ·
  <a href="#-updating-content"><b>Update content</b></a> ·
  <a href="#-under-the-hood"><b>Under the hood</b></a> ·
  <a href="#-design-system"><b>Design system</b></a> ·
  <a href="#-core-builders"><b>Builders</b></a> ·
  <a href="#-contributing"><b>Contribute</b></a>
</p>

<img src=".github/assets/divider.svg" width="100%" alt="" />

</div>

## 🛰️ About Nexus

**Nexus** (formally the *Nexus Research, Space & Technology Club*) is a student-led technical and research organisation at **Manipal University Jaipur**, under the **Directorate of Student Welfare**. It gives students curious about space science, aerospace engineering, computational physics and modern software a place to build things together, with their hands.

| | Pillar | What we do |
| :---: | :--- | :--- |
| 🔭 | **Deep Space & Astrophysics** | Celestial mechanics, orbital dynamics, telescope observation nights and a deep-sky astrophotography archive. |
| 📡 | **Ground Stations & Telemetry** *(PNR)* | Atmospheric sensor payloads (altitude, pressure, thermal), software-defined radio, satellite downlinks and data pipelines. |
| 🌐 | **Spatial Web & Creative Computing** | Interactive 3D WebGL & Three.js platforms, data visualisation and creative digital experiences. |

<div align="center"><img src=".github/assets/divider.svg" width="100%" alt="" /></div>

## ✨ The Experience

The whole page is one continuous, scroll-driven 3D scene. A single WebGL canvas sits behind the content, and as you scroll, a **9,216-particle system** reshapes itself into each part of the Nexus story.

<table>
  <tr>
    <td width="50%"><img src=".github/assets/pillar-orbits.png" alt="Deep Space pillar — atom orbits around a planet" /><br /><sub><b>01 · Deep Space</b>: particles form the Nexus atom orbits around a procedural planet.</sub></td>
    <td width="50%"><img src=".github/assets/pillar-dish.png" alt="Ground Stations pillar — radio dish with telemetry beam" /><br /><sub><b>02 · Ground Stations</b>: they rebuild into a radio dish, sending a pulsing telemetry beam.</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src=".github/assets/pillar-terrain.png" alt="Spatial Web pillar — animated data terrain" /><br /><sub><b>03 · Spatial Web</b>: they ripple into a living data terrain driven by noise.</sub></td>
    <td width="50%"><img src=".github/assets/contact.png" alt="Join the mission — sunrise over the planet's limb" /><br /><sub><b>06 · Join the mission</b>: the planet returns for a sunrise over its limb.</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src=".github/assets/divisions.png" alt="Divisions wheel" /><br /><sub><b>Divisions</b>: a curved, scroll-driven wheel of the five wings, linked to the roster.</sub></td>
    <td width="50%"><img src=".github/assets/crew.png" alt="Crew manifest" /><br /><sub><b>Crew manifest</b>: the 2026–27 executive committee plus a filterable roster of 108 members.</sub></td>
  </tr>
</table>

```mermaid
flowchart LR
    A["🌍 Launch<br/><sub>planet horizon</sub>"] --> B["✦ Mission<br/><sub>words light up</sub>"]
    B --> C["⚛️ Orbits<br/><sub>Deep Space</sub>"]
    C --> D["📡 Dish<br/><sub>Ground Stations</sub>"]
    D --> E["🌐 Terrain<br/><sub>Spatial Web</sub>"]
    E --> F["🌌 Nebula<br/><sub>Divisions · Events · Crew</sub>"]
    F --> G["🌅 Sunrise<br/><sub>Join the mission</sub>"]
```

<details>
<summary><b>🎬 Every motion detail, section by section</b></summary>
<br />

| Section | Motion |
| :--- | :--- |
| **Loader** | Uplink count from 000 to 100, a scrambled status readout, then a curtain reveal |
| **Hero** | Headline characters rise in, the planet ascends, and the readouts include a live UTC clock and an altitude figure that climbs as you scroll |
| **Mission** | The statement brightens word by word as you scroll, then counters tick up |
| **Pillars** | A pinned three-chapter sequence with an index, an outlined numeral and a progress line. The particles morph between shapes |
| **Domains** | A spec sheet with thin dividers above a data-terrain floor |
| **Divisions** | A pinned wheel that rotates the five wings along an arc |
| **Events** | A pinned horizontal track of event formats, each with generated line art |
| **Marquee** | Speeds up with your scroll and reverses with scroll direction |
| **Crew** | Division filters, plus names that scramble on hover |
| **Everywhere** | Lenis smooth scroll, a crosshair cursor, labels that decode as they appear, a sector rail and a full-screen menu |

</details>

<div align="center"><img src=".github/assets/divider.svg" width="100%" alt="" /></div>

## 🚀 Quick Start

> **Requires** Node.js 20+

```bash
git clone https://github.com/Nexus-Web-Development/Nexus-Web-Page.git
cd Nexus-Web-Page
npm install
npm run dev        # → http://localhost:5173
```

| Command | What it does |
| :--- | :--- |
| `npm run dev` | Starts the Vite dev server with hot reload |
| `npm run build` | Builds the production bundle into `dist/` |
| `npm run preview` | Serves the production build locally |

<div align="center"><img src=".github/assets/divider.svg" width="100%" alt="" /></div>

## 📝 Updating Content

**You don't need to touch any layout code.** Every word, person and link on the site comes from one file: [`src/data.js`](src/data.js).

```js
// src/data.js — add a crew member: [name, role, division]
const roster = [
  ['Aaroh Sinha', 'President', 'Executive Committee'],
  // ...
  ['New Member', 'JC', 'Web Development'],
];
```

Counts, filters, division totals and the "crew members" stat all **update automatically**.

| To change… | Edit in `src/data.js` |
| :--- | :--- |
| Executive committee, core committee, team heads, JCs | `roster` |
| The three mission pillars | `pillars` |
| Specialised domains (DOM-01 to DOM-04) | `domains` |
| The five divisions on the wheel | `divisions` |
| Event formats in the flight schedule | `formats` |
| Social and contact channels | `channels` |
| Crew filter buttons | `crewFilters` |

> [!TIP]
> Starting a new epoch? Duplicate the roster, update `site.epoch`, and push. Vercel deploys it in about 15 seconds.

<div align="center"><img src=".github/assets/divider.svg" width="100%" alt="" /></div>

## 🔧 Under the Hood

```
Nexus-Web-Page/
├── index.html          # Page structure, SEO & social meta
├── public/
│   ├── nexus-logo.png  # Official logo (social previews)
│   └── favicon.svg
├── src/
│   ├── data.js         # ✏️  All content: roster, pillars, divisions, channels
│   ├── scene.js        # 🪐 WebGL: shader planet, atmosphere, sunrise flare, stars, morphing particles
│   ├── main.js         # 🎬 Loader, smooth scroll, scroll→scene keyframes, pinned sections, crew, menu
│   └── style.css       # 🎨 Design tokens & responsive layout
└── vite.config.js
```

<details>
<summary><b>🪐 How the WebGL scene works</b></summary>
<br />

- **Planet:** a 160×160 sphere with a custom GLSL shader. Simplex-noise fBm generates continents, ice caps and drifting clouds. It has ocean specular, warm city lights on the night side, and a Fresnel rim, wrapped in an additive atmosphere shell that fades out from the limb.
- **Particles:** one `BufferGeometry` holds five target shapes as separate attributes (scatter, orbits, dish, terrain, nebula). The vertex shader blends between them with a per-particle stagger and adds noise turbulence while they move. Orbit and terrain positions are computed live on the GPU, so the rings spin and the terrain ripples at no CPU cost.
- **Scroll choreography:** `measureFrames()` in `main.js` pins scene states (planet position, sun direction, morph stage, opacity) to scroll positions measured from the DOM. Each frame interpolates between keyframes, and the scene eases toward the target using frame-rate-independent damping.
- **Performance:** a single renderer and draw-call-light scene, with the pixel ratio capped at 1.75. It renders frames only while the tab is visible and degrades gracefully if WebGL is unavailable.

</details>

<details>
<summary><b>♿ Accessibility & resilience</b></summary>
<br />

- Respects `prefers-reduced-motion`: native scrolling and near-instant transitions.
- Semantic landmarks, `aria` state on the menu and filters, visible focus outlines and keyboard-closable menu (<kbd>Esc</kbd>).
- The custom cursor is disabled on touch devices. The layout is fully responsive down to 375px with no horizontal scroll.
- The content is still there if the 3D scene fails; only the backdrop disappears.

</details>

<div align="center"><img src=".github/assets/divider.svg" width="100%" alt="" /></div>

## 🎨 Design System

A mission-control look in the style of SpaceX: **cinematic darkness, industrial type, and colour that arrives only as light.**

| Token | Value | Use |
| :--- | :--- | :--- |
| ![](https://img.shields.io/badge/-%20%20%20%20-000000?style=flat-square) **Void** | `#000000` | Every surface |
| ![](https://img.shields.io/badge/-%20%20%20%20-F0F0FA?style=flat-square) **Star White** | `#F0F0FA` | All text, icons and hairline borders |
| ![](https://img.shields.io/badge/-%20%20%20%20-545457?style=flat-square) **Dim Steel** | `#545457` | Muted labels and dividers |
| ![](https://img.shields.io/badge/-%20%20%20%20-4DA3F0?style=flat-square) **Nexus Blue** | `#4DA3F0` | **Logo only**: orbit mark, the *X* in the wordmark, footer mark |

- **Type:** *Barlow* (a D-DIN-style industrial sans) for everything. Labels are uppercase with 0.10–0.12em tracking. The wordmark is set in *Michroma*.
- **Buttons:** 1px hairline outlines with a 4px radius, never filled. The 32px pill shape is reserved for filter toggles.
- **No UI accent colour:** colour only appears as light in the 3D scene, like the planet's blue atmosphere and the warm sunrise.

<div align="center"><img src=".github/assets/divider.svg" width="100%" alt="" /></div>

## 👥 Core Builders

<p align="center"><i>Designed, architected and engineered by the Nexus Web Development wing: 13 builders.</i></p>

<div align="center">
<table>
  <tr>
    <td align="center" width="150">
      <a href="https://github.com/Vedant275">
        <img src="https://github.com/Vedant275.png?size=100" width="80" height="80" alt="Vedant Sharma" /><br />
        <sub><b>Vedant Sharma</b></sub>
      </a><br />
      <img src="https://img.shields.io/badge/Vice_President-F0F0FA&labelColor=000000?style=flat-square" alt="Vice President" />
    </td>
    <td align="center" width="150">
      <a href="https://github.com/Tejas-Narula">
        <img src="https://github.com/Tejas-Narula.png?size=100" width="80" height="80" alt="Tejas Narula" /><br />
        <sub><b>Tejas Narula</b></sub>
      </a><br />
      <img src="https://img.shields.io/badge/TechOps_Lead-F0F0FA&labelColor=000000?style=flat-square" alt="TechOps Lead" />
    </td>
    <td align="center" width="150">
      <a href="https://github.com/Kaustav5505g">
        <img src="https://github.com/Kaustav5505g.png?size=100" width="80" height="80" alt="Kaustav Paul" /><br />
        <sub><b>Kaustav Paul</b></sub>
      </a><br />
      <img src="https://img.shields.io/badge/Team_Head-F0F0FA&labelColor=000000?style=flat-square" alt="Team Head" />
    </td>
    <td align="center" width="150">
      <a href="https://github.com/shaazadil">
        <img src="https://github.com/shaazadil.png?size=100" width="80" height="80" alt="Shaaz Adil" /><br />
        <sub><b>Shaaz Adil</b></sub>
      </a><br />
      <img src="https://img.shields.io/badge/Team_Head-F0F0FA&labelColor=000000?style=flat-square" alt="Team Head" />
    </td>
  </tr>
  <tr>
    <td align="center" width="150">
      <a href="https://github.com/satiricalguru">
        <img src="https://github.com/satiricalguru.png?size=100" width="80" height="80" alt="Jatin Pandey" /><br />
        <sub><b>Jatin Pandey</b></sub>
      </a><br />
      <img src="https://img.shields.io/badge/Core_Team-4DA3F0?style=flat-square" alt="Core Team" />
    </td>
    <td align="center" width="150">
      <a href="https://github.com/SynthReaper">
        <img src="https://github.com/SynthReaper.png?size=100" width="80" height="80" alt="Aditya Goyal" /><br />
        <sub><b>Aditya Goyal</b></sub>
      </a><br />
      <img src="https://img.shields.io/badge/Core_Team-4DA3F0?style=flat-square" alt="Core Team" />
    </td>
    <td align="center" width="150">
      <a href="https://github.com/lakshya-agrawal254">
        <img src="https://github.com/lakshya-agrawal254.png?size=100" width="80" height="80" alt="Lakshya" /><br />
        <sub><b>Lakshya</b></sub>
      </a><br />
      <img src="https://img.shields.io/badge/Core_Team-4DA3F0?style=flat-square" alt="Core Team" />
    </td>
    <td align="center" width="150">
      <a href="https://github.com/vs2030codes-ops">
        <img src="https://github.com/vs2030codes-ops.png?size=100" width="80" height="80" alt="Vansh Sood" /><br />
        <sub><b>Vansh Sood</b></sub>
      </a><br />
      <img src="https://img.shields.io/badge/Core_Team-4DA3F0?style=flat-square" alt="Core Team" />
    </td>
  </tr>
  <tr>
    <td align="center" width="150">
      <a href="https://github.com/Aaravcodesss">
        <img src="https://github.com/Aaravcodesss.png?size=100" width="80" height="80" alt="Aarav Srivastava" /><br />
        <sub><b>Aarav Srivastava</b></sub>
      </a><br />
      <img src="https://img.shields.io/badge/Core_Team-4DA3F0?style=flat-square" alt="Core Team" />
    </td>
    <td align="center" width="150">
      <a href="https://github.com/Priyanshuf7">
        <img src="https://github.com/Priyanshuf7.png?size=100" width="80" height="80" alt="Priyanshu" /><br />
        <sub><b>Priyanshu</b></sub>
      </a><br />
      <img src="https://img.shields.io/badge/Core_Team-4DA3F0?style=flat-square" alt="Core Team" />
    </td>
    <td align="center" width="150">
      <a href="https://github.com/saadseraj130-arch">
        <img src="https://github.com/saadseraj130-arch.png?size=100" width="80" height="80" alt="Saad Seraj" /><br />
        <sub><b>Saad Seraj</b></sub>
      </a><br />
      <img src="https://img.shields.io/badge/Core_Team-4DA3F0?style=flat-square" alt="Core Team" />
    </td>
    <td align="center" width="150">
      <a href="https://github.com/Arnav2008">
        <img src="https://github.com/Arnav2008.png?size=100" width="80" height="80" alt="Arnav Singh" /><br />
        <sub><b>Arnav Singh</b></sub>
      </a><br />
      <img src="https://img.shields.io/badge/Core_Team-4DA3F0?style=flat-square" alt="Core Team" />
    </td>
  </tr>
  <tr>
    <td align="center" width="150">
      <a href="https://github.com/Rashmi-builds">
        <img src="https://github.com/Rashmi-builds.png?size=100" width="80" height="80" alt="Rashmi" /><br />
        <sub><b>Rashmi</b></sub>
      </a><br />
      <img src="https://img.shields.io/badge/Core_Team-4DA3F0?style=flat-square" alt="Core Team" />
    </td>
  </tr>
</table>

</div>

<div align="center"><img src=".github/assets/divider.svg" width="100%" alt="" /></div>

## 🤝 Contributing

We welcome developers, designers and space enthusiasts from across MUJ and the open-source community.

```bash
git checkout -b feat/your-idea           # 1. branch off main
npm run dev                              # 2. build & preview locally
npm run build                            # 3. make sure production builds
git commit -m "feat: add your idea"      # 4. use Conventional Commits
git push origin feat/your-idea           # 5. open a Pull Request
```

- Content changes go in `src/data.js`. Please keep personal details (phone numbers, registration numbers, emails) **out of the repo**.
- Follow the design system: no filled buttons, and no new accent colours.
- Check both desktop and mobile (375px) before opening a PR.

<div align="center"><img src=".github/assets/divider.svg" width="100%" alt="" /></div>

## 📬 Connect

<div align="center">

<a href="https://www.instagram.com/nexus_muj/"><img src="https://img.shields.io/badge/Instagram-@nexus__muj-000000?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>
<a href="https://www.linkedin.com/company/nexus-manipal-jaipur/"><img src="https://img.shields.io/badge/LinkedIn-Nexus_Manipal_Jaipur-000000?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<a href="mailto:nexus@jaipur.manipal.edu"><img src="https://img.shields.io/badge/Email-nexus@jaipur.manipal.edu-000000?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
<a href="https://github.com/Nexus-Web-Development"><img src="https://img.shields.io/badge/GitHub-Nexus--Web--Development-000000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>

<br /><br />

<img src=".github/assets/logo.png" width="120" alt="Nexus logo" />

<sub><b>Nexus · Research, Space &amp; Technology Club</b><br />
Academic Block 1 · Manipal University Jaipur, RJ 303007 · 26.8439° N, 75.5652° E<br />
© 2026 Nexus MUJ · Directorate of Student Welfare</sub>

</div>
