gsap.registerPlugin(ScrollTrigger);

/* SECTION IN/OUT ANIMATION & STORYTELLING */
const sections = gsap.utils.toArray(".station");

sections.forEach((sec, index, arr) => {
    ScrollTrigger.create({
        trigger: sec,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
            sec.classList.add("active");
            sec.classList.remove("out");
            if (arr[index - 1]) arr[index - 1].classList.add("out");
        },
        onLeave: () => {
            sec.classList.add("out");
        },
        onEnterBack: () => {
            sec.classList.add("active");
            sec.classList.remove("out");
            if (arr[index + 1]) arr[index + 1].classList.add("out");
        },
        onLeaveBack: () => {
            sec.classList.add("out");
        }
    });
});

/* NEBULA BACKGROUND */
const nebula = document.getElementById("nebula");
const nctx = nebula.getContext("2d");

function resizeNebula() {
    nebula.width = window.innerWidth;
    nebula.height = window.innerHeight;
}
resizeNebula();
window.addEventListener("resize", resizeNebula);

function drawNebula() {
    let g = nctx.createRadialGradient(
        nebula.width * 0.3, nebula.height * 0.4, 40,
        nebula.width * 0.5, nebula.height * 0.5, nebula.height
    );

    g.addColorStop(0, "rgba(0,180,255,0.25)");
    g.addColorStop(0.4, "rgba(0,80,160,0.2)");
    g.addColorStop(1, "rgba(0,0,0,1)");

    nctx.fillStyle = g;
    nctx.fillRect(0, 0, nebula.width, nebula.height);

    requestAnimationFrame(drawNebula);
}
drawNebula();

/* PARTICLE PHOTONS */
const photons = document.getElementById("photons");
const pctx = photons.getContext("2d");

function resizePhotons() {
    photons.width = window.innerWidth;
    photons.height = window.innerHeight;
}
resizePhotons();
window.addEventListener("resize", resizePhotons);

let particles = [];
for (let i = 0; i < 120; i++) {
    particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        s: Math.random() * 2 + 1,
        v: Math.random() * 0.4 + 0.2
    });
}

function drawParticles() {
    pctx.clearRect(0, 0, photons.width, photons.height);

    particles.forEach(p => {
        pctx.fillStyle = "rgba(0,255,255,0.35)";
        pctx.beginPath();
        pctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        pctx.fill();

        p.y -= p.v;
        if (p.y < -10) {
            p.y = photons.height + 10;
            p.x = Math.random() * photons.width;
        }
    });

    requestAnimationFrame(drawParticles);
}
drawParticles();

/* Scroll-Down Button – ein Screen weiter */
document.querySelector(".scroll-down").onclick = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
};
