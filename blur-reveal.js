(function() {
    'use strict';
    
    // Initialize all blur reveal components on the page
    function initBlurReveal() {
        const containers = document.querySelectorAll('[data-blur-reveal]');
        
        containers.forEach(container => {
            const section = container.querySelector(".reveal-scroll");
            const viewport = container.querySelector(".reveal-viewport");
            const curtain = container.querySelector(".blur-overlay-curtain");
            const residual = container.querySelector(".blur-overlay-residual");
            const progressBar = container.querySelector(".reveal-progress .bar");

            if (!section || !viewport || !curtain || !residual) return;

            // Disable CSS animations when JS takes over
            curtain.style.animation = 'none';
            if (progressBar) progressBar.style.animation = 'none';

            // Mask support detection
            const hasMask =
                CSS &&
                (CSS.supports("mask-image", "linear-gradient(#000, #000)") ||
                    CSS.supports("-webkit-mask-image", "linear-gradient(#000, #000)"));
            if (!hasMask) {
                container.classList.add("no-mask");
            }

            const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
            const easeOut = (t) => 1 - Math.pow(1 - t, 3);

            let start = 0, end = 0;

            function recalc() {
                const rect = section.getBoundingClientRect();
                const scrollY = window.scrollY || window.pageYOffset;
                const sectionTop = rect.top + scrollY;
                start = sectionTop;
                end = sectionTop + window.innerHeight * 2; // effect spans ~200vh
                update();
            }

            function update() {
                const y = window.scrollY || window.pageYOffset;
                const t = clamp((y - start) / (end - start), 0, 1);
                const pos = 100 - t * 100;

                if (hasMask) {
                    container.style.setProperty("--pos", pos + "%");
                } else {
                    curtain.style.clipPath = `inset(0 0 0 ${100 - pos}%)`;
                }

                // Residual blur fades in during last 15% of scroll
                const target =
                    parseFloat(
                        getComputedStyle(container).getPropertyValue(
                            "--residual-target"
                        )
                    ) || 0.1;
                const tail = t <= 0.85 ? 0 : (t - 0.85) / 0.15;
                residual.style.opacity = easeOut(clamp(tail, 0, 1)) * target;

                if (progressBar) progressBar.style.width = Math.round(t * 100) + "%";
            }

            // Event listeners
            window.addEventListener("load", recalc, { once: true });
            window.addEventListener("resize", recalc);

            let ticking = false;
            window.addEventListener("scroll", () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        update();
                        ticking = false;
                    });
                    ticking = true;
                }
            });

            // Intersection observer for performance
            const io = new IntersectionObserver(
                (entries) => {
                    if (entries.some((e) => e.isIntersecting)) {
                        recalc();
                    }
                },
                { threshold: [0, 1] }
            );
            io.observe(viewport);
        });
    }

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBlurReveal);
    } else {
        initBlurReveal();
    }

    // Also expose for manual initialization
    window.BlurReveal = { init: initBlurReveal };
})();
