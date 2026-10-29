# MultiShift — Cevero design direction

React + Vite. Run `npm run dev`; check with `npm test`, `npm run lint`, and `npm run build`.

## Active design

The Cevero-inspired direction is applied to all six routes: `/`, `/services`, `/portfolio`, `/methodology`, `/savoir-faire`, `/contact`. Production hosting must serve `index.html` for these routes.

The active visual theme is `src/v2/Cevero.css`, loaded after the earlier structural styles. Tokens use warm cream `#fffcf7`, charcoal `#454545`, Poppins, soft gray surfaces, restrained olive/lime accents, rounded imagery and pill controls. Navigation remains visible on desktop; mobile uses the existing accessible menu, which closes when resizing to desktop.

`CeveroHero.jsx` uses a shaped shop-interior image with a CSS/SVG cutout and a separate statistics inset. Its three images have previous/next and pause controls, keyboard navigation, visibility handling and reduced-motion support. Mobile uses a rounded image panel with the statistics below it. `CeveroFooter.jsx` is shared across all pages, with a larger contact invitation on Home.

Home contains four compact project previews, the continuous moving portfolio with titles and descriptions, four compact service rows, an asymmetric material/editorial composition, benefits, an image banner and FAQ. The duplicate service mosaic was removed. The previously removed manifesto and methodology teaser remain absent. The portfolio ribbon continues during hover and can be paused explicitly; reduced motion produces a static, readable gallery.

Inner pages use light editorial layouts, rounded image panels, dark gray typography and consistent controls. All service descriptions, features and deliverables are retained. Portfolio filters, featured-project selection, image thumbnails, expandable details and the model/reality slider remain functional. Methodology retains four illustrated steps. Savoir-faire retains the four technical disciplines and the source site's artisan/material content in a disclosure. Contact retains validation, real business details, the map and an explicitly described email-draft flow.

## Content and images

Business content is based on https://multishift.ma/ and the user's supplied content/reference figures. The five original render/reality projects remain available alongside three explicitly labelled concept studies. Generated imagery is illustrative and does not imply completed client commissions. Generation provenance files remain beside the image assets.

Fourteen approved PNG images referenced by the current site were encoded as WebP, reducing those served assets from 38,061,451 bytes to 4,729,648 bytes (about 88% smaller). Source PNGs are preserved. No new image generation was required for this redesign.

The Cevero folder contains the supplied static preview and editable design formats; it is not an executable React theme. The implementation adapts its design direction to MultiShift's services, navigation and architecture imagery. Shopping controls, product prices and furniture ratings were not introduced.

## Verification and limitations

Tests cover all six rendered routes, service features/deliverables, local links and image availability, portfolio filtering, comparison controls and encoded contact requests, plus prior regressions. Build and lint validate the production source. Desktop/tablet/mobile rules, keyboard focus, motion preferences and touch-friendly controls are implemented. Normal muted text was checked against the cream palette.

Actual browser rendering remains unverified because local browser access was blocked earlier; no alternative route was used. The supplied Cevero preview and its layers were inspected. The live multishift.ma website has not been deployed or modified. Contact prepares a reviewable draft in the visitor's mail application and does not claim backend delivery.
