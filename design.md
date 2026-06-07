# Google Stitch Design Brief: SUBJECT 14

## Project Summary

Design a polished responsive website for **SUBJECT 14**, a first-person psychological horror game set inside a decaying experimental facility. The site should feel cinematic, oppressive, realistic, and game-focused. It should promote the game, show its atmosphere, explain the story and gameplay, display screenshots, present a trailer, and drive users toward playing the demo or wishlisting on Steam.

The first screen should be the actual game website experience, not a marketing explanation about the website. The brand name **SUBJECT 14** must be the dominant first-viewport signal.

## Product Context

- Title: SUBJECT 14
- Genre: first-person psychological horror
- Setting: abandoned experimental facility, sterile rooms, decaying corridors, failed experiments
- Engine claim: Unreal Engine 5 visuals
- Main promise: survive an AI-driven entity, solve puzzles, restore power, unlock doors, uncover the truth
- Primary platform: Windows PC
- Primary CTA: Play Now / Download Demo
- Secondary CTA: Watch Trailer / Wishlist on Steam
- Developer credit: Developed by Ahmad Uwaida

## Design Goals

- Create a horror-game website that feels premium, dark, cinematic, and playable.
- Use real game imagery as the visual anchor on every major section.
- Make navigation simple and direct: Home, About, Story, Gallery, Trailer, Features, Download, Contact.
- Prioritize atmosphere without hurting readability.
- Design for repeated browsing on desktop, tablet, and mobile.
- Avoid generic SaaS, startup, or clean corporate styling.

## Visual Direction

Use a realistic psychological horror art direction:

- Deep black and charcoal backgrounds.
- Desaturated whites and gray text.
- Blood-red accent color for CTAs, active navigation, glows, warning states, and section markers.
- Subtle cold blue-gray shadows may appear in backgrounds, but red should be the main accent.
- Add film grain/noise, faint scanline or surveillance texture, soft vignette, and restrained red glow.
- Keep the page dark and immersive; avoid bright surfaces.
- Imagery should show corridors, observation rooms, experiment chambers, doors, blood-stained surfaces, abandoned equipment, and atmospheric facility interiors.
- Avoid cartoon horror, cute monsters, fantasy castles, neon cyberpunk, or colorful arcade style.

## Typography

Use a strong condensed horror/game title style:

- Main title: very large uppercase condensed display font, similar to Anton.
- Section headings: uppercase display font, wide letter spacing.
- Kicker labels and metadata: condensed monospace or technical uppercase style, similar to Barlow Condensed.
- Body copy: clean readable sans serif, similar to Inter.
- Keep text sharp and high contrast against dark backgrounds.

## Color Tokens

- Background: near black, #07080c or #090909
- Surface: dark charcoal, #151515 to #1d1d1d
- Primary red: #b32020 or similar deep horror red
- Muted text: rgba(255,255,255,0.60)
- Strong text: rgba(255,255,255,0.95)
- Borders: rgba(255,255,255,0.10)
- Red border glow: rgba(179,32,32,0.25)

## Layout Requirements

Use a single-page site with hash-style sections or a visually equivalent scrolling structure.

### Global Navigation

Design a fixed top navigation bar:

- Black translucent background with backdrop blur.
- Left or center brand wordmark: SUBJECT 14.
- Desktop nav links: Home, About, Story, Gallery, Trailer, Features, Download, Contact.
- Active nav item uses the red accent.
- Right side actions: language switcher if space allows, plus Play Now button.
- Mobile: compact header with brand, menu icon, and full-screen or modal dark navigation drawer.

### Home / Hero

Hero should fill the first viewport:

- Full-bleed horror background image.
- Heavy dark overlay, red radial glow, grain/noise.
- Centered content.
- Huge stacked title:
  - SUBJECT in white
  - 14 in red
- Tagline: "The darkness remembers what you forgot."
- Description: "A first-person psychological horror experience set in a decaying experimental facility. Survive the entity that hunts you and uncover the truth behind the failed experiments."
- Primary CTA: Watch Trailer
- Secondary CTA: Play Now
- Small tertiary text/button: Wishlist on Steam
- Add subtle flicker or red text glow to the title.

### About Section

Title: The Facility Awaits

Structure:

- Two-column desktop layout.
- Text on one side, tall image on the other.
- Include a technical log treatment for the first paragraph:
  - "[LOG_ENTRY_014]: You wake up in a cold, sterile room with no memory of how you arrived. The air is thick with the smell of ozone and decay. Something went wrong here-terribly wrong."
- Supporting copy should explain that the game is story-driven, realistic, built in Unreal Engine 5, and includes exploration, rooms, connected sections, puzzles, and a stalking AI villain.
- Image should be a grim corridor/facility shot with grayscale hover or dark overlay.

### Story Section

Title: A Legacy of Pain

Structure:

- Image and copy layout, alternating from About.
- Use "Case File" as a small uppercase kicker.
- Copy should suggest failed experiments, blood-stained walls, abandoned evidence, confusion, fear, and escape.
- Include a subtle red glow behind the image and a dark film panel feel.

### Gallery Section

Title: Visual Nightmares

Subtitle: Captured from the abyss

Design:

- Responsive grid: 1 column mobile, 2 columns tablet, 3 columns desktop.
- Six screenshot cards with 16:9 aspect ratio.
- Dark rounded panels with thin borders.
- Images begin slightly desaturated or grayscale, then restore color on hover.
- Hover overlay displays the image title:
  - The Observation Room
  - Failed Prototype
  - The Long Corridor
  - Experimental Chamber
  - Signs of Struggle
  - The Final Door
- Clicking a screenshot should imply a full-screen lightbox/modal.

### Trailer Section

Title: Official Trailer

Subtitle: Experience the terror in motion

Design:

- Centered 16:9 trailer panel.
- Dark thumbnail with low opacity.
- Large circular red play button in the center.
- Add subtle inner black frame/border to feel like surveillance footage.
- If designing a static mockup, show a realistic trailer thumbnail from the game world.

### Features Section

Title: Engineered for Terror

Subtitle: Unparalleled immersion in a world of shadows

Use a 6-card grid with horror-tech icons:

1. Intense First-Person Horror
   - Experience the terror through the eyes of a survivor in a hyper-realistic setting.
2. Stalking AI Villain
   - A major threat that can chase and catch you. It learns your patterns and hunts you relentlessly.
3. Puzzle-Solving & Exploration
   - Restore power, manage generators, and unlock the secrets of the facility to progress.
4. Environmental Storytelling
   - The world itself tells the story. Hidden clues and disturbing evidence are everywhere.
5. Immersive Sound Design
   - Binaural audio and whisper-based fear that makes you question every sound behind you.
6. Unreal Engine 5 Visuals
   - Cutting-edge graphics that bring the oppressive atmosphere of the facility to life.

Card style:

- Dark film-panel background.
- Thin border and red hover state.
- Red icon block.
- Slight lift on hover.
- Descriptions can reveal on hover for desktop, but must remain accessible on mobile.

### Download Section

Title: Face the Unknown

Subtitle: The facility is waiting. Experience the first 60 minutes of the nightmare that everyone is talking about.

Design:

- Large centered dark call-to-action panel.
- Primary red button: Play Now
- Secondary outline button: Wishlist on Steam
- Below CTA, show two system requirement columns.

Minimum requirements:

- OS: Windows 10 64-bit
- Processor: Intel Core i5-8400 / AMD Ryzen 5 2600
- Memory: 8 GB RAM
- Graphics: NVIDIA GeForce GTX 1060 6 GB / AMD Radeon RX 580
- DirectX: Version 12
- Storage: 15 GB available space

Recommended requirements:

- OS: Windows 10/11 64-bit
- Processor: Intel Core i5-12400 / AMD Ryzen 5 5600
- Memory: 16 GB RAM
- Graphics: NVIDIA GeForce RTX 3060 / AMD Radeon RX 6700 XT
- DirectX: Version 12
- Storage: 15 GB available space

### Contact Section

Title: Contact Command

Design:

- Add a usable contact page/section that can be reached from the nav and from the footer Links area.
- Place a "Contact Command" link directly under the footer Links list, below Privacy Policy and Terms of Service.
- Keep the form centered horizontally and positioned lower in the viewport rather than tight to the top.
- Use the secure terminal treatment from the Stitch form: dark command panel, red corner accents, technical labels, thin red borders, and subtle surveillance atmosphere.
- Include fields for Survivor Name, Comm ID (email), Sector, and Situation Report.
- Include metadata such as Encryption: AES-256 and Uplink Strength.
- Submit CTA: Initiate Transmission.
- The form must be usable by visitors, with clear success/error feedback after submission.

### Footer

- Minimal dark footer.
- Include: Developed by Ahmad Uwaida.
- Include: All rights reserved.
- Keep it restrained and atmospheric.

## Assets

Use these existing asset roles when implementing in this project:

- `/site-images/01-hero.jpg`: hero background
- `/site-images/02-about.jpg`: about section image
- `/site-images/03-story.jpg`: story section image
- `/site-images/05-gallery-1.jpg`: gallery image 1
- `/site-images/06-gallery-2.jpg`: gallery image 2
- `/site-images/07-gallery-3.jpg`: gallery image 3
- `/site-images/08-gallery-4.jpg`: gallery image 4
- `/site-images/09-gallery-5.jpg`: gallery image 5
- `/site-images/10-gallery-6.jpg`: gallery image 6
- `/subject14-icon.svg`: favicon/app icon

If Stitch generates image placeholders, they should match the exact mood and composition of realistic Unreal Engine horror screenshots.

## Interaction Notes

- Navigation should update the active section.
- Primary buttons should have clear hover/focus states.
- Gallery cards should support click-to-expand.
- Trailer play button should feel interactive.
- Download button should visibly support a Windows PC demo flow.
- Mobile menu should be easy to tap and should not cover content awkwardly.
- Use smooth transitions, subtle fades, and restrained flicker. Do not over-animate.

## Responsive Behavior

- Desktop: full cinematic layouts with two-column story/about sections and 3-column cards.
- Tablet: reduce spacing, use 2-column gallery/features where comfortable.
- Mobile: single-column sections, compact nav, large but not overflowing title, full-width CTA buttons.
- Ensure all text stays inside its containers on small screens.
- Avoid overlapping CTAs, headings, or imagery.
- Keep the hero title readable on mobile without horizontal scrolling.

## Accessibility

- Maintain strong contrast between text and background.
- Buttons and cards need visible focus states.
- Interactive icons should have labels or visible accompanying text.
- Image overlays must not be the only way to access important content.
- Motion should be subtle enough to avoid distraction.

## Design Constraints

- Do not create a generic landing page with unrelated illustrations.
- Do not use pastel, beige, bright neon, cartoon, fantasy, or clean corporate aesthetics.
- Do not place the main hero content inside a card.
- Do not rely on decorative gradient blobs.
- Do not make the UI feel like a dashboard or SaaS product.
- Do not hide the game title in small navigation text only.
- Avoid fake social proof unless real reviews are provided.

## Suggested Stitch Prompt

Create a responsive one-page game website for SUBJECT 14, a first-person psychological horror game set in a decaying experimental facility. The design should be cinematic, dark, realistic, and premium, using full-bleed horror imagery, black charcoal panels, blood-red accents, film grain, subtle red glow, and uppercase condensed typography. The first viewport must show the brand SUBJECT 14 as a huge stacked title over a full-screen facility background, with the tagline "The darkness remembers what you forgot.", descriptive copy, and CTAs for Watch Trailer, Play Now, and Wishlist on Steam. Include sections for The Facility Awaits, A Legacy of Pain, Visual Nightmares gallery, Official Trailer, Engineered for Terror feature cards, Face the Unknown download/system requirements, and Contact Command. Add a Contact Command link under the footer Links area and build a centered, lower-positioned terminal-style contact form that users can submit. Use realistic Unreal Engine-style horror screenshots, thin red-tinted borders, grayscale image hover states, and a fixed translucent black navigation bar. Make the layout polished on desktop and mobile, with no bright corporate styling and no generic illustrations.
