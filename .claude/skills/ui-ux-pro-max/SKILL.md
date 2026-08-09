---
name: ui-ux-pro-max
description: AI-powered UI/UX design intelligence skill for generating claymorphic, accessible, high-contrast, and micro-animated web interfaces.
---

# UI/UX Pro Max Design Skill

## Overview
UI/UX Pro Max is an AI design intelligence framework that provides searchable design system guidelines, color palettes, typography scales, animation presets, and UX best practices.

## Core Rules for NeoLit Literacy Assistant

### 1. Visual Aesthetics & Style
- **Style Archetype**: Claymorphic + Micro-interactions + Block-based gamified design.
- **Canvas Background**: Light organic fluid wave overlay (`.neolit-fluid-bg`, `#F8F9FE`).
- **Surface Elevation**: Pure white card surfaces (`#FFFFFF`) with 1.5px subtle borders (`#EAECF5`) and ambient soft shadows (`0 8px 24px rgba(0,0,0,0.03)`).
- **Tactile 3D Buttons**: All primary action buttons use 3D bevels (`.btn-3d`, `border-bottom: 4px solid ...`) with hover lift (`.hover-lift`).

### 2. Color Palette Roles
- **Primary Violet**: `#6C4CFF` (CTAs, active selection tabs)
- **Reward Gold**: `#FFD54A` / `#FF9F43` (Coins, XP gems, streaks, badges)
- **Success Green**: `#10B981` / `#5AD66F` (Correct answers, lesson completion)
- **Playful Pink**: `#FF4FA3` (AI mascot accents, special badges)
- **Dark Text**: `#1E1040` (Primary headings & body copy)
- **Muted Text**: `#64748B` (Secondary descriptions)

### 3. Typography Scale
- **Headings**: `Poppins`, sans-serif (Weights: 800, 900)
- **Body & Controls**: `Nunito`, sans-serif (Weights: 600, 700, 800, 900)
- **Mascot Dialogues**: `Baloo 2`, cursive

### 4. Search CLI Tool
To search the UI UX Pro Max dataset, run:
```bash
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "<query>" --domain <domain>
```
Domains: `product`, `style`, `color`, `typography`, `icons`, `landing`, `chart`, `react`.
