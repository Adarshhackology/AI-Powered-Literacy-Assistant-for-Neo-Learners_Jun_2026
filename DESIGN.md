# NeoLit DESIGN.md — Design System & Visual Architecture Guidelines
> **VoltAgent / Google Stitch DESIGN.md Standard**

---

## 1. Visual Theme & Atmosphere

NeoLit's design language radiates warmth, playful energy, and premium clarity. The application uses a soft, organic pastel fluid wave background (`.neolit-fluid-bg`, `#F8F9FE`) paired with crisp white card surfaces (`#FFFFFF`), vibrant purple/indigo primary branding (`#6C4CFF`), and rich 3D gamified accents (`#5AD66F` green, `#FFD54A` gold, `#FF4FA3` pink).

Every interface component follows an 8pt spatial grid, high-contrast typography (using Google Fonts `Nunito` for body copy and `Poppins` for display titles), smooth 3D tactile button effects (`.btn-3d`), and soft ambient shadows (`0 8px 24px rgba(0,0,0,0.03)`).

---

## 2. Design Tokens & Color Roles

### Primary Palette
- **Brand Violet (`#6C4CFF`)**: Primary CTAs, active navigation states, progress indicators.
- **Vibrant Magenta (`#FF4FA3`)**: Accent badges, notification dots, streak rewards.
- **Sunshine Gold (`#FFD54A`)**: XP gems, coins, star ratings, streak flames (`#FF9F43`).
- **Emerald Green (`#5AD66F` / `#10B981`)**: Success buttons, level completion checkmarks.
- **Ocean Blue (`#4D9DFF` / `#3B82F6`)**: Reading & audio practice actions.

### Surface & Canvas Tones
- **Canvas Background (`#F8F9FE`)**: Soft, eye-friendly light background.
- **Card Surface (`#FFFFFF`)**: Pure crisp white surfaces with `1.5px solid #EAECF5` borders.
- **Soft Tint Fill (`#EFECFF` / `#F0F4FF`)**: Active menu fills, subtle badge backgrounds.
- **Dark Text (`#1E1040`)**: High-contrast primary headings and text readability.
- **Muted Text (`#64748B`)**: Subtitles, metadata, and helper text.

---

## 3. Typography System

- **Display & Headings**: `Poppins`, sans-serif (Weights: 800, 900)
- **Body & Controls**: `Nunito`, sans-serif (Weights: 600, 700, 800, 900)
- **Special Accent**: `Baloo 2`, cursive (For celebration titles & mascot dialogues)

| Role | Font | Size | Weight | Line Height | Case |
|------|------|------|--------|-------------|------|
| Hero Title | Poppins | 28px - 36px | 900 | 1.2 | Sentence |
| Section Title | Poppins | 20px - 24px | 900 | 1.25 | Title Case |
| Card Title | Poppins | 16px - 18px | 800 / 900 | 1.3 | Title Case |
| Body Text | Nunito | 14px - 15px | 700 / 800 | 1.5 | Normal |
| Badge / Button | Poppins | 12px - 14px | 900 | 1.0 | UPPERCASE / Title |

---

## 4. Component Patterns & Micro-Interactions

### A. 3D Tactile Buttons (`.btn-3d`)
```css
.btn-3d {
  background: linear-gradient(135deg, #6C4CFF 0%, #8A5CFF 100%);
  color: white;
  border: none;
  border-bottom: 4px solid #4D2ECF;
  border-radius: 16px;
  padding: 12px 24px;
  font-family: 'Poppins', sans-serif;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.15s ease;
}
.btn-3d:hover { transform: translateY(-2px); filter: brightness(1.05); }
.btn-3d:active { transform: translateY(2px); border-bottom-width: 2px; }
```

### B. Interactive Cards (`.hover-lift`)
```css
.hover-lift {
  transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.22s ease;
  cursor: pointer;
}
.hover-lift:hover { transform: translateY(-4px) scale(1.02); }
```

### C. Glassmorphic Navbars
- `background: rgba(255, 255, 255, 0.95)`
- `backdrop-filter: blur(20px)`
- `border: 1.5px solid rgba(255, 255, 255, 0.6)`
- `box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03)`

---

## 5. Responsive Grid & Layout Rules

1. **Sidebar Navigation**: Fixed 220px on desktop (`#FFFFFF` crisp white background, `#EFECFF` active selection pill). Collapses gracefully to top horizontal scroll bar on mobile viewports (`< 1180px`).
2. **Main Dashboard Grid**: Max-width `1600px`, centered with 16px spatial padding.
3. **Card Grids**: 3-column / 4-column responsive grid on desktop, scaling to 2-column on tablet, 1-column on mobile.
4. **Theme Consistency**: Zero pitch-black or muddy dark-purple container fills. All cards sit on crisp white surfaces with organic pastel fluid backdrop matrix.
