# Instabooth Photo — GitHub Pages version

A static rebuild of the Instabooth Photo homepage, based on the supplied Airo React/TypeScript project. It keeps the original section order, copy, pink-and-charcoal styling, three pricing packages, gallery link, contact details, and booking section while removing Airo runtime dependencies.

## Project files

- `index.html` — site content and metadata
- `assets/styles.css` — responsive styling
- `assets/script.js` — mobile navigation, package selection, and form submission
- `assets/favicon.svg` — simple local favicon

## Before publishing: connect the booking form

GitHub Pages serves static files; it cannot run the original `/api/contact/contact` server endpoint. This version is prepared for Formspree:

1. Create a form at [Formspree](https://formspree.io/) and verify the destination email address.
2. Copy the form endpoint, which looks like `https://formspree.io/f/abcdefgh`.
3. Open `index.html` and find `https://formspree.io/f/YOUR_FORMSPREE_ID`.
4. Replace `YOUR_FORMSPREE_ID` with the ID Formspree assigned to your form. Keep the full `https://formspree.io/f/` prefix.
5. Submit a test inquiry after deployment and confirm it arrives. Check Formspree's dashboard for any verification or spam settings that need attention.

Until the endpoint is configured, the form deliberately shows a message directing visitors to the published phone and email contacts rather than pretending the inquiry was sent.

## Publish with GitHub Pages

1. Create a GitHub repository (for example `instabooth-photo`).
2. Upload the contents of this folder to the repository root: `index.html`, `README.md`, and `assets/`.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/(root)` folder, then save.
6. Wait for GitHub Pages to finish deploying; it will show the public URL in the Pages settings.

This is a root-relative-path-free static site, so it works at a project URL such as `https://USERNAME.github.io/instabooth-photo/` without changing Vite base settings.

## Notes on imagery

The ZIP included references to Airo-hosted image/video assets, but those binary assets were not included in the archive. The rebuild uses remote image URLs already listed in the project's `public/airo-media.json` where available, plus CSS treatments for the feature cards. Those image URLs require internet access and may be replaced with owned/local images at any time. To make the site fully self-contained, download images you have rights to use into `assets/images/` and update the corresponding CSS URLs.

## Business details retained from the supplied source

- Phone: 786.205.3985
- Email: info@instaboothphoto.com
- Address: 8865 SW 131 Street, Miami, FL 33176
- Wedding Package: $700 (4-hour minimum)
- Event Package: $560 (3-hour minimum)
- 360 Video Booth: $950 (4-hour minimum)

Please confirm pricing, contact details, and claims such as “500+ Events Captured” before going live.

## Supplied media assets (October 2026 update)

The supplied `ibp web assets.zip` media has now been included locally in `assets/media/`:
- Instabooth horizontal logo in header and footer; supplied favicon.
- `section-1-background.jpg` as hero image.
- All six `gallery-slide-*.jpg` photos in the gallery strip.
- Photo assets for feature and section backgrounds.
- Animated GIF demonstration video in the Animated GIFs feature card.
- 360 booth demonstration video in the 360 Video feature card.
- Additional supplied `primary.png`, `vertical.png`, and `features-corporate.png` are retained in the media folder for later use.

Both videos autoplay muted and loop when browser settings permit; the 360 video is large (~48 MB), so optimize it if bandwidth or load speed is a concern. No remote image host is required for these sections. The Formspree ID still needs configuring.
