# Blur Reveal Component

A self-contained, scroll-based blur reveal effect that creates a smooth transition from blurred to sharp imagery.

## 🚀 Quick Start

### 1. Include the JavaScript
```html
<script src="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/blur-reveal-component@main/blur-reveal.js"></script>
```

### 2. Add the HTML Structure
```html
<div class="blur-reveal-container" data-blur-reveal>
    <style>
        /* CSS styles here - see full example below */
    </style>
    
    <section class="reveal-scroll">
        <div class="reveal-spacer"></div>
        
        <div class="reveal-viewport">
            <div class="base-layer">
                <img class="scene sharp-base" src="your-image.jpg" alt="Description">
                <div class="hero-title">Your Title Here</div>
            </div>
            
            <img class="scene blur-overlay-curtain" src="your-image.jpg" alt="">
            <img class="scene blur-overlay-residual" src="your-image.jpg" alt="">
            
            <div class="reveal-progress">
                <div class="bar"></div>
            </div>
        </div>
        
        <div class="reveal-spacer"></div>
        <div class="reveal-bottom"></div>
    </section>
</div>
```

## 📋 Full Example

```html
<!-- SELF-CONTAINED BLUR REVEAL EMBED -->
<div class="blur-reveal-container" data-blur-reveal>
    <style>
        .blur-reveal-container {
            --pos: 100%;
            --feather: 14%;
            --blur-strength: 12px;
            --min-curtain-opacity: 0.1;
            --residual-target: 0;
            position: relative;
            isolation: isolate;
        }

        .blur-reveal-container * {
            box-sizing: border-box;
        }

        .blur-reveal-container .reveal-scroll {
            position: relative;
            font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
            color: #fff;
        }
        
        .blur-reveal-container .reveal-spacer {
            height: 100vh;
        }
        
        .blur-reveal-container .reveal-bottom {
            height: 100vh;
        }

        .blur-reveal-container .reveal-viewport {
            position: sticky;
            top: 0;
            height: 100vh;
            width: 100%;
            overflow: hidden;
            isolation: isolate;
            background: #000;
        }

        .blur-reveal-container .base-layer {
            position: absolute;
            inset: 0;
            z-index: 1;
        }
        
        .blur-reveal-container .scene {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            user-select: none;
            -webkit-user-drag: none;
        }
        
        .blur-reveal-container .hero-title {
            position: absolute;
            inset: auto 0 12vh 0;
            display: grid;
            place-items: center;
            text-align: center;
            padding: 0 6vw;
            color: #fff;
            font-weight: 700;
            letter-spacing: 0.04em;
            line-height: 1.1;
            text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
            font-size: clamp(22px, 5vw, 44px);
            pointer-events: none;
        }

        .blur-reveal-container .blur-overlay-curtain {
            z-index: 2;
            filter: blur(var(--blur-strength));
            transform: scale(1.03);
            pointer-events: none;

            -webkit-mask-image: linear-gradient(
                to right,
                rgba(0, 0, 0, 1) 0%,
                rgba(0, 0, 0, 1) calc(var(--pos) - var(--feather)),
                rgba(0, 0, 0, var(--min-curtain-opacity)) var(--pos),
                rgba(0, 0, 0, var(--min-curtain-opacity)) 100%
            );
            mask-image: linear-gradient(
                to right,
                rgba(0, 0, 0, 1) 0%,
                rgba(0, 0, 0, 1) calc(var(--pos) - var(--feather)),
                rgba(0, 0, 0, var(--min-curtain-opacity)) var(--pos),
                rgba(0, 0, 0, var(--min-curtain-opacity)) 100%
            );
            -webkit-mask-size: 100% 100%;
            mask-size: 100% 100%;
            -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
        }

        .blur-reveal-container .blur-overlay-residual {
            z-index: 3;
            filter: blur(var(--blur-strength));
            transform: scale(1.03);
            opacity: 0;
            pointer-events: none;
            transition: opacity 120ms linear;
        }

        .blur-reveal-container .reveal-progress {
            position: absolute;
            left: 50%;
            bottom: 24px;
            transform: translateX(-50%);
            width: min(60vw, 480px);
            height: 6px;
            background: rgba(255, 255, 255, 0.25);
            border-radius: 999px;
            overflow: hidden;
            z-index: 5;
        }
        
        .blur-reveal-container .reveal-progress .bar {
            width: 0%;
            height: 100%;
            background: #fff;
        }

        .blur-reveal-container.no-mask .blur-overlay-curtain {
            -webkit-mask-image: none;
            mask-image: none;
            clip-path: inset(0 0 0 100%);
        }
        
        .blur-reveal-container.no-mask .blur-overlay-residual {
            opacity: var(--min-curtain-opacity) !important;
        }

        @media (prefers-reduced-motion: reduce) {
            .blur-reveal-container {
                --pos: 50%;
            }
            .blur-reveal-container .reveal-progress {
                display: none;
            }
        }
    </style>

    <section class="reveal-scroll">
        <div class="reveal-spacer"></div>

        <div class="reveal-viewport" role="region" aria-label="Scroll reveal with blur">
            <div class="base-layer">
                <img class="scene sharp-base" src="https://edge.sitecorecloud.io/dlapiperukl2c48-dlapiper7aff-prodb8eb-83a9/media/project/dlapiper-tenant/dlapiper/insights/publications/horizons-newsletter-mockup/oresund-bridge-2560x975.jpg" alt="Scenic bridge landscape">
                <div class="hero-title">Thought leadership from law firm</div>
            </div>

            <img class="scene blur-overlay-curtain" src="https://edge.sitecorecloud.io/dlapiperukl2c48-dlapiper7aff-prodb8eb-83a9/media/project/dlapiper-tenant/dlapiper/insights/publications/horizons-newsletter-mockup/oresund-bridge-2560x975.jpg" alt="" aria-hidden="true">

            <img class="scene blur-overlay-residual" src="https://edge.sitecorecloud.io/dlapiperukl2c48-dlapiper7aff-prodb8eb-83a9/media/project/dlapiper-tenant/dlapiper/insights/publications/horizons-newsletter-mockup/oresund-bridge-2560x975.jpg" alt="" aria-hidden="true">

            <div class="reveal-progress" aria-hidden="true">
                <div class="bar"></div>
            </div>
        </div>

        <div class="reveal-spacer"></div>
        <div class="reveal-bottom"></div>
    </section>
</div>

<!-- Include the JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/blur-reveal-component@main/blur-reveal.js"></script>
```

## ⚙️ Customization

### CSS Variables
- `--blur-strength`: Amount of blur (default: 12px)
- `--feather`: Width of the transition edge (default: 14%)
- `--min-curtain-opacity`: Minimum blur opacity (default: 0.1)

### HTML Structure
- Replace image `src` attributes with your images
- Update the `hero-title` text content
- Modify colors and fonts in the CSS

## 🌐 Browser Support
- All modern browsers
- Fallback support for browsers without CSS mask
- Respects `prefers-reduced-motion`

## 📄 License
MIT License - feel free to use in commercial projects.

## 🤝 Contributing
Issues and pull requests welcome!
