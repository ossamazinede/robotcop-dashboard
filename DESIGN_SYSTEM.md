# RobotCop SOC Dashboard — Design System

## Design Philosophy: "Cognitive Autonomy in the Shadows"

The RobotCop dashboard embodies a **command center aesthetic** where human operators delegate security operations to AI-driven automation. The design reflects **trust through transparency**—every action is visible, every metric is actionable, and the interface recedes to let the data speak.

---

## Color Palette

### Primary Colors (OKLCH Format)
- **Neon Blue (AI Insights)**: `oklch(0.65 0.25 250)` — Represents cognitive intelligence, predictive analysis, and AI-driven decisions.
- **Neon Red (Critical Alerts)**: `oklch(0.58 0.28 15)` — Signals immediate threats, critical vulnerabilities, and urgent action required.
- **Neon Green (Safe/Remediated)**: `oklch(0.65 0.20 140)` — Indicates secure state, successful remediation, and compliance achievement.

### Neutral Palette
- **Dark Charcoal (Primary Background)**: `oklch(0.12 0.01 280)` — Deep, immersive background that reduces eye strain during extended monitoring.
- **Dark Gray (Secondary Background)**: `oklch(0.18 0.01 280)` — Elevated surfaces for cards, panels, and modular content.
- **Light Gray (Text)**: `oklch(0.88 0.01 280)` — Primary text color with high contrast against dark backgrounds.
- **Muted Gray (Secondary Text)**: `oklch(0.65 0.02 280)` — For labels, metadata, and less critical information.

### Accent Colors
- **Cyan (Data Visualization)**: `oklch(0.70 0.22 200)` — For charts, graphs, and trend lines.
- **Orange (Warnings)**: `oklch(0.65 0.22 50)` — For medium-severity alerts and cautionary states.
- **Purple (Cognitive Processing)**: `oklch(0.60 0.20 280)` — For AI-generated insights and machine learning outputs.

---

## Typography System

### Font Pairing
- **Display/Headlines**: **IBM Plex Mono** (Bold, 700) — Monospace font conveys precision, technical authority, and command-center aesthetics.
- **Body/UI**: **Inter** (Regular 400, Medium 500) — Clean, modern sans-serif for readability and accessibility.
- **Data/Metrics**: **IBM Plex Mono** (Regular 400) — Monospace for numerical data, timestamps, and technical values.

### Hierarchy
- **H1 (Page Title)**: IBM Plex Mono, 32px, Bold, Neon Blue
- **H2 (Section Title)**: IBM Plex Mono, 24px, Bold, Light Gray
- **H3 (Card Title)**: IBM Plex Mono, 18px, Bold, Light Gray
- **Body Text**: Inter, 14px, Regular, Light Gray
- **Label/Metadata**: Inter, 12px, Regular, Muted Gray
- **Metric Value**: IBM Plex Mono, 16px, Bold, Neon Green/Blue/Red (context-dependent)

---

## Layout & Spacing

### Grid System
- **Base Unit**: 4px
- **Spacing Scale**: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
- **Container Max-Width**: 1400px (for dashboard content)
- **Sidebar Width**: 280px (collapsible to 80px)

### Depth & Layers
- **Background**: `oklch(0.12 0.01 280)` — Immersive base
- **Elevated Surface (Cards)**: `oklch(0.18 0.01 280)` with subtle border `oklch(0.25 0.02 280)`
- **Interactive Element**: `oklch(0.22 0.01 280)` with hover state brightening to `oklch(0.28 0.01 280)`

### Shadows
- **Soft Glow** (for AI insights): `0 0 20px rgba(102, 204, 255, 0.15)` — Subtle blue glow
- **Danger Glow** (for alerts): `0 0 20px rgba(255, 51, 102, 0.15)` — Subtle red glow
- **Depth Shadow** (for cards): `0 8px 24px rgba(0, 0, 0, 0.4)` — Subtle elevation

---

## Component Design Patterns

### Cards
- **Background**: Dark Gray (`oklch(0.18 0.01 280)`)
- **Border**: 1px solid `oklch(0.25 0.02 280)`
- **Padding**: 24px
- **Border Radius**: 8px
- **Hover State**: Subtle glow, slight elevation

### Buttons
- **Primary (Action)**: Neon Blue background, Dark Charcoal text, 8px padding, 6px border-radius
- **Secondary (Info)**: Transparent background, Neon Blue border, Neon Blue text
- **Danger (Remediate)**: Neon Red background, White text
- **Hover State**: Brightness increase, glow effect

### Metrics/KPIs
- **Large Value**: IBM Plex Mono, 48px, Bold, Neon Green/Blue/Red
- **Label**: Inter, 12px, Muted Gray
- **Trend Indicator**: ↑ Green or ↓ Red with percentage

### Alerts & Status Badges
- **Critical**: Neon Red background, White text, pulsing animation
- **Warning**: Orange background, Dark text
- **Success**: Neon Green background, Dark text
- **Info**: Neon Blue background, Dark text

---

## Animation & Micro-interactions

### Entrance Animations
- **Page Load**: Fade-in + slight scale-up (200ms, ease-out)
- **Card Reveal**: Staggered fade-in from top (300ms, ease-out)
- **Metric Update**: Pulse effect on value change (400ms)

### Hover States
- **Card Hover**: Subtle glow + 2px elevation increase
- **Button Hover**: Brightness +10%, glow effect
- **Interactive Element**: Cursor change, color shift

### Status Indicators
- **Critical Alert**: Pulsing red glow (1s cycle)
- **Processing**: Rotating spinner with Neon Blue
- **Success**: Checkmark with scale animation (300ms)

### Transitions
- **Color Change**: 200ms ease-in-out
- **Position Change**: 300ms ease-out
- **Opacity Change**: 200ms ease-in-out

---

## Interaction Philosophy

### "Zero Touch" Principle
- Minimize user interaction required; let AI automation handle routine tasks.
- Display action buttons only when human intervention is necessary.
- Use visual feedback (glows, pulses) to draw attention to critical states.

### "Zero Trust" Principle
- Every action is logged and visible in the audit trail.
- All data flows are transparent; no hidden operations.
- Status indicators always show current state (no ambiguity).

### Responsive Design
- **Desktop**: Full sidebar + content (1400px+)
- **Tablet**: Collapsible sidebar + content (768px - 1399px)
- **Mobile**: Hidden sidebar + hamburger menu (< 768px)

---

## Data Visualization

### Chart Styling
- **Background**: Transparent (inherit from card)
- **Grid Lines**: `oklch(0.25 0.02 280)` at 20% opacity
- **Axis Labels**: Muted Gray, Inter 12px
- **Data Lines**: Neon Blue (primary), Neon Green (success), Neon Red (critical)
- **Tooltips**: Dark Gray background, Light Gray text, 8px padding, rounded corners

### Circular Progress (NIST Score)
- **Outer Ring**: Neon Blue
- **Inner Ring**: Dark Gray (unfilled portion)
- **Center Text**: IBM Plex Mono, Bold, Neon Blue
- **Label**: Inter, Muted Gray

### Timeline Visualization
- **Vertical Line**: Neon Blue
- **Event Nodes**: Alternating Neon Green (success) and Neon Red (critical)
- **Event Labels**: Inter, Light Gray
- **Timestamps**: IBM Plex Mono, Muted Gray

---

## Accessibility

- **Color Contrast**: All text meets WCAG AA standards (4.5:1 minimum).
- **Focus States**: Visible focus rings (2px Neon Blue border).
- **Keyboard Navigation**: All interactive elements are keyboard accessible.
- **Screen Reader**: Semantic HTML, ARIA labels, and descriptive alt text.

---

## Implementation Notes

1. **CSS Variables**: All colors defined in `client/src/index.css` using OKLCH format.
2. **Tailwind Customization**: Extend Tailwind config with custom colors and spacing.
3. **Component Library**: Use shadcn/ui as base, customize with design tokens.
4. **Dark Mode Only**: No light mode toggle; dashboard is optimized for dark environments.
5. **Performance**: Use CSS animations for micro-interactions; avoid heavy JavaScript animations.
