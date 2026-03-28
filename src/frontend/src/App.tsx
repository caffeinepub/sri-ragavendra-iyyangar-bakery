import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ===== SPARKLE PARTICLES =====
const SPARKLES = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 3 + 1.5,
  delay: Math.random() * 4,
  isStar: Math.random() > 0.6,
}));

const INTRO_SPARKLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 2 + 1,
  delay: Math.random() * 2,
  isStar: Math.random() > 0.5,
}));

const JOURNEY_SPARKLES = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 3 + 1.5,
  delay: Math.random() * 4,
  isStar: Math.random() > 0.5,
}));

const REBORN_PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: 40 + Math.random() * 20,
  y: 40 + Math.random() * 30,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 2.5 + 1.5,
  delay: Math.random() * 3,
  drift: (Math.random() - 0.5) * 120,
  rise: -(Math.random() * 180 + 60),
}));

const REBORN_STARS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: 10 + Math.random() * 80,
  top: 10 + Math.random() * 80,
  size: Math.random() * 12 + 8,
  duration: Math.random() * 2 + 1.5,
  delay: Math.random() * 3 + 0.5,
}));
const MAPS_URL =
  "https://maps.google.com/?q=419+Kongu+Main+Rd+MS+Nagar+Tiruppur+Tamil+Nadu+641607";

function SparkleParticles({
  sparkles = SPARKLES,
}: { sparkles?: typeof SPARKLES }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {sparkles.map((s) =>
        s.isStar ? (
          <span
            key={s.id}
            className="sparkle-star"
            style={
              {
                left: `${s.x}%`,
                top: `${s.y}%`,
                "--duration": `${s.duration}s`,
                "--delay": `${s.delay}s`,
              } as React.CSSProperties
            }
          >
            ✦
          </span>
        ) : (
          <div
            key={s.id}
            className="sparkle"
            style={
              {
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                "--duration": `${s.duration}s`,
                "--delay": `${s.delay}s`,
              } as React.CSSProperties
            }
          />
        ),
      )}
    </div>
  );
}

// ===== ANIMATED BORDER SVG =====
function AnimatedBorder({
  width,
  height,
  className = "",
}: {
  width: number;
  height: number;
  className?: string;
}) {
  const perimeter = 2 * (width + height);
  return (
    <svg
      className={`absolute inset-0 pointer-events-none ${className}`}
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect
        x="2"
        y="2"
        width={width - 4}
        height={height - 4}
        rx="2"
        ry="2"
        fill="none"
        stroke="oklch(0.68 0.12 75)"
        strokeWidth="1.5"
        className="border-draw"
        style={{ "--perimeter": perimeter } as React.CSSProperties}
      />
    </svg>
  );
}

// ===== ORNATE CORNER SVG =====
function CornerFiligree({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const transforms = {
    tl: "",
    tr: "scale(-1,1)",
    bl: "scale(1,-1)",
    br: "scale(-1,-1)",
  };
  const positions = {
    tl: "top-0 left-0",
    tr: "top-0 right-0",
    bl: "bottom-0 left-0",
    br: "bottom-0 right-0",
  };
  return (
    <div
      className={`absolute ${positions[position]} w-20 h-20 pointer-events-none`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 80 80"
        width="80"
        height="80"
        aria-hidden="true"
        style={{ transform: transforms[position], transformOrigin: "center" }}
      >
        <path
          d="M4,4 L4,36"
          stroke="oklch(0.68 0.12 75)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M4,4 L36,4"
          stroke="oklch(0.68 0.12 75)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M4,4 L16,16"
          stroke="oklch(0.68 0.12 75)"
          strokeWidth="0.8"
          fill="none"
          opacity="0.6"
        />
        <circle cx="4" cy="4" r="2" fill="oklch(0.68 0.12 75)" />
        <circle
          cx="36"
          cy="4"
          r="1.5"
          fill="oklch(0.68 0.12 75)"
          opacity="0.7"
        />
        <circle
          cx="4"
          cy="36"
          r="1.5"
          fill="oklch(0.68 0.12 75)"
          opacity="0.7"
        />
        <path
          d="M10,4 Q18,4 18,12 Q18,20 10,20 Q6,20 6,16 Q6,12 10,12 Q12,12 12,14"
          stroke="oklch(0.68 0.12 75)"
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M4,10 Q4,18 12,18 Q20,18 20,10 Q20,6 16,6 Q12,6 12,10 Q12,12 14,12"
          stroke="oklch(0.68 0.12 75)"
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M28,4 L32,8 L28,12 L24,8 Z"
          stroke="oklch(0.68 0.12 75)"
          strokeWidth="0.8"
          fill="oklch(0.68 0.12 75 / 0.3)"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

// ===== ORNAMENTAL FILIGREE BAR =====
function FiligreeDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 20"
        width="200"
        height="20"
        className="opacity-80"
        aria-hidden="true"
      >
        <path
          d="M0,10 Q20,2 40,10 Q60,18 80,10 Q100,2 120,10 Q140,18 160,10 Q180,2 200,10"
          stroke="oklch(0.68 0.12 75)"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="100" cy="10" r="3" fill="oklch(0.68 0.12 75)" />
        <circle
          cx="60"
          cy="10"
          r="1.5"
          fill="oklch(0.68 0.12 75)"
          opacity="0.7"
        />
        <circle
          cx="140"
          cy="10"
          r="1.5"
          fill="oklch(0.68 0.12 75)"
          opacity="0.7"
        />
        <path
          d="M92,10 L96,6 L100,10 L96,14 Z"
          stroke="oklch(0.68 0.12 75)"
          strokeWidth="0.5"
          fill="oklch(0.68 0.12 75 / 0.5)"
        />
        <path
          d="M100,10 L104,6 L108,10 L104,14 Z"
          stroke="oklch(0.68 0.12 75)"
          strokeWidth="0.5"
          fill="oklch(0.68 0.12 75 / 0.5)"
        />
      </svg>
    </div>
  );
}

// ===== TOP FILIGREE BAR =====
function TopFiligreeLine() {
  return (
    <div className="w-full flex justify-center mb-6" aria-hidden="true">
      <svg
        viewBox="0 0 600 30"
        width="100%"
        height="30"
        className="max-w-xl opacity-80"
        aria-hidden="true"
      >
        <line
          x1="0"
          y1="15"
          x2="230"
          y2="15"
          stroke="oklch(0.68 0.12 75)"
          strokeWidth="0.8"
        />
        <line
          x1="370"
          y1="15"
          x2="600"
          y2="15"
          stroke="oklch(0.68 0.12 75)"
          strokeWidth="0.8"
        />
        <path
          d="M230,15 Q260,5 300,15 Q340,25 370,15"
          stroke="oklch(0.68 0.12 75)"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="300" cy="15" r="4" fill="oklch(0.68 0.12 75)" />
        <circle
          cx="260"
          cy="12"
          r="2"
          fill="oklch(0.68 0.12 75)"
          opacity="0.6"
        />
        <circle
          cx="340"
          cy="18"
          r="2"
          fill="oklch(0.68 0.12 75)"
          opacity="0.6"
        />
        <path
          d="M292,15 L296,10 L300,15 L296,20 Z"
          fill="none"
          stroke="oklch(0.76 0.12 75)"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
}

// ===== REBORN OPENING SCREEN =====
function RebornScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 5200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "oklch(0.04 0.01 240)" }}
    >
      {/* Background brightening radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3.5, ease: "easeInOut", delay: 0.5 }}
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 60%, oklch(0.55 0.15 75 / 0.18) 0%, oklch(0.30 0.10 75 / 0.08) 45%, transparent 75%)",
        }}
      />

      {/* Deep rising flame core */}
      <motion.div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          bottom: "25%",
          left: "50%",
          translateX: "-50%",
          width: "160px",
          height: "220px",
          borderRadius: "50% 50% 40% 40% / 60% 60% 40% 40%",
          background:
            "radial-gradient(ellipse at 50% 80%, oklch(0.88 0.18 75) 0%, oklch(0.72 0.20 65) 30%, oklch(0.55 0.18 55 / 0.6) 60%, transparent 80%)",
          filter: "blur(18px)",
        }}
        initial={{ scaleY: 0, scaleX: 0.3, opacity: 0, y: 60 }}
        animate={{ scaleY: 1, scaleX: 1, opacity: [0, 0.6, 1, 0.85, 1], y: 0 }}
        transition={{ duration: 2.2, ease: "easeOut", delay: 0.3 }}
      />

      {/* Outer flame halo */}
      <motion.div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          bottom: "20%",
          left: "50%",
          translateX: "-50%",
          width: "340px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 50% 70%, oklch(0.75 0.15 70 / 0.35) 0%, oklch(0.55 0.12 65 / 0.15) 50%, transparent 75%)",
          filter: "blur(30px)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], opacity: [0, 0.7, 0.5] }}
        transition={{ duration: 2.8, ease: "easeOut", delay: 0.6 }}
      />

      {/* Floating golden particles rising from center */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {REBORN_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              bottom: "30%",
              width: `${p.size}px`,
              height: `${p.size}px`,
              background:
                p.id % 3 === 0
                  ? "oklch(0.88 0.18 75)"
                  : p.id % 3 === 1
                    ? "oklch(0.76 0.14 70)"
                    : "oklch(0.95 0.10 80)",
              boxShadow: `0 0 ${p.size * 3}px oklch(0.80 0.15 75 / 0.8)`,
            }}
            initial={{ opacity: 0, y: 0, x: 0 }}
            animate={{
              opacity: [0, 0.9, 0.7, 0],
              y: [0, p.rise],
              x: [0, p.drift],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Sparkle stars scattered */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
      >
        {REBORN_STARS.map((star) => (
          <motion.span
            key={star.id}
            className="absolute text-sm"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              color: "oklch(0.80 0.14 75)",
              fontSize: `${star.size}px`,
              textShadow: "0 0 8px oklch(0.76 0.16 75)",
            }}
            animate={{
              opacity: [0, 1, 0.4, 1, 0],
              scale: [0.5, 1.2, 0.8, 1.1, 0.5],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            ✦
          </motion.span>
        ))}
      </motion.div>

      {/* Main text content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Initial sparkle symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: [0, 1, 0.7], scale: [0.4, 1.6, 1.2] }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
          style={{
            color: "oklch(0.88 0.18 75)",
            fontSize: "2.5rem",
            textShadow:
              "0 0 20px oklch(0.80 0.18 75), 0 0 60px oklch(0.68 0.14 70 / 0.6)",
            marginBottom: "1.5rem",
          }}
        >
          ✦
        </motion.div>

        {/* Bakery name emerging from light */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(16px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.6, ease: "easeOut", delay: 1.2 }}
          className="font-playfair font-bold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-widest"
          style={{
            color: "oklch(0.88 0.16 75)",
            textShadow:
              "0 0 40px oklch(0.75 0.18 75 / 0.8), 0 0 80px oklch(0.65 0.14 70 / 0.4)",
            letterSpacing: "0.12em",
          }}
        >
          SRI RAGAVENDRA
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(16px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.6, ease: "easeOut", delay: 1.7 }}
          className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl leading-tight tracking-widest"
          style={{
            color: "oklch(0.76 0.14 75)",
            textShadow:
              "0 0 30px oklch(0.68 0.14 75 / 0.7), 0 0 60px oklch(0.55 0.12 70 / 0.3)",
            letterSpacing: "0.10em",
          }}
        >
          IYYANGAR BAKERY
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 2.5 }}
          className="font-playfair italic text-base sm:text-lg mt-5"
          style={{
            color: "oklch(0.72 0.08 80 / 0.9)",
            letterSpacing: "0.06em",
          }}
        >
          — A New Light Rises —
        </motion.p>
      </div>

      {/* Full-screen fade out overlay at the end */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20"
        aria-hidden="true"
        style={{ background: "oklch(0.04 0.01 240)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, ease: "easeIn", delay: 4.2 }}
      />
    </div>
  );
}

// ===== INTRO ANIMATION SCREEN =====
function IntroScreen({ onEnter }: { onEnter: () => void }) {
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.08 0.03 240) 0%, oklch(0.11 0.03 245) 40%, oklch(0.07 0.025 235) 100%)",
      }}
    >
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {INTRO_SPARKLES.map((s) =>
          s.isStar ? (
            <span
              key={s.id}
              className="sparkle-star"
              style={
                {
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  "--duration": `${s.duration}s`,
                  "--delay": `${s.delay}s`,
                } as React.CSSProperties
              }
            >
              ✦
            </span>
          ) : (
            <div
              key={s.id}
              className="sparkle"
              style={
                {
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  "--duration": `${s.duration}s`,
                  "--delay": `${s.delay}s`,
                } as React.CSSProperties
              }
            />
          ),
        )}
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.68 0.12 75 / 0.1) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="mb-3">
          <span
            className="font-inter text-xs tracking-[0.3em] uppercase"
            style={{ color: "oklch(0.68 0.12 75 / 0.8)" }}
          >
            ✦ &nbsp; Grand Opening &nbsp; ✦
          </span>
        </motion.div>

        <motion.div variants={item}>
          <FiligreeDivider className="mb-5" />
        </motion.div>

        <motion.h1
          variants={item}
          className="font-playfair font-bold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-wide mb-1"
          style={{ color: "oklch(0.76 0.13 75)" }}
        >
          SRI RAGAVENDRA
        </motion.h1>
        <motion.h1
          variants={item}
          className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl leading-tight tracking-wide mb-2"
          style={{ color: "oklch(0.68 0.12 75)" }}
        >
          IYYANGAR BAKERY
        </motion.h1>

        <motion.div variants={item} className="mt-2 mb-4">
          <FiligreeDivider />
        </motion.div>

        <motion.p
          variants={item}
          className="font-playfair italic text-lg sm:text-xl mb-1"
          style={{ color: "oklch(0.82 0.015 80)" }}
        >
          Where Every Bite Carries the Warmth of Tradition
        </motion.p>
        <motion.p
          variants={item}
          className="font-inter text-xs tracking-widest uppercase mb-10"
          style={{ color: "oklch(0.52 0.01 80)" }}
        >
          MS Nagar · Tiruppur · Tamil Nadu
        </motion.p>

        <motion.button
          variants={item}
          type="button"
          data-ocid="intro.primary_button"
          className="btn-shimmer font-inter font-semibold text-xs tracking-[0.2em] uppercase px-10 py-3.5 rounded-sm"
          style={{ color: "oklch(0.10 0.025 240)", letterSpacing: "0.14em" }}
          onClick={onEnter}
        >
          ✦ Enter ✦
        </motion.button>
      </motion.div>
    </div>
  );
}

// ===== PRODUCTS DATA =====
const PRODUCTS = [
  {
    emoji: "🎂",
    name: "Heritage Cakes",
    desc: "Handcrafted layered cakes with premium ingredients and elegant decorations for every celebration.",
    image: "/assets/generated/cake-premium.dim_400x400.jpg",
  },
  {
    emoji: "🍞",
    name: "Heritage Breads",
    desc: "Stone-oven baked sourdough, multigrain and specialty breads made with time-honoured traditions.",
    image: "/assets/generated/bread-premium.dim_400x400.jpg",
  },
  {
    emoji: "🥐",
    name: "Savoury Snacks",
    desc: "Crispy puffs, savoury pastries and bite-sized delicacies perfect for any occasion.",
    image: "/assets/generated/snacks-premium.dim_400x400.jpg",
  },
  {
    emoji: "🍫",
    name: "Fine Chocolates",
    desc: "Handcrafted heritage chocolates made with single-origin cacao, adorned with gold leaf finishes.",
    image: "/assets/generated/chocolate-premium.dim_400x400.jpg",
  },
  {
    emoji: "🍨",
    name: "Frozen Delights",
    desc: "Luxurious gelato and premium ice creams in seasonal flavours, crafted fresh daily.",
    image: "/assets/generated/icecream-premium.dim_400x400.jpg",
  },
  {
    emoji: "🍪",
    name: "Premium Cookies",
    desc: "Butter cookies, macarons and decorated biscuits with royal icing — impossible to have just one.",
    image: "/assets/generated/cookies-premium.dim_400x400.jpg",
  },
];

// ===== PRODUCT CARD =====
function ProductCard({
  product,
  index,
}: { product: (typeof PRODUCTS)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.article
      ref={ref}
      data-ocid={`products.item.${index + 1}`}
      className="product-card rounded-sm overflow-hidden cursor-pointer"
      style={{
        background: "oklch(0.98 0.015 80)",
        border: "1px solid oklch(0.68 0.12 75 / 0.35)",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.12, ease: "easeOut" }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, oklch(0.14 0.025 240 / 0.5) 0%, transparent 60%)",
          }}
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl" aria-hidden="true">
            {product.emoji}
          </span>
          <h3
            className="font-playfair font-semibold text-lg"
            style={{ color: "oklch(0.18 0.01 240)" }}
          >
            {product.name}
          </h3>
        </div>
        <div
          className="w-10 h-px mb-3"
          style={{ background: "oklch(0.68 0.12 75)" }}
        />
        <p
          className="text-sm leading-relaxed"
          style={{ color: "oklch(0.38 0.01 240)" }}
        >
          {product.desc}
        </p>
      </div>
    </motion.article>
  );
}

// ===== NAVBAR =====
function Navbar({ isScrolled }: { isScrolled: boolean }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: isScrolled
          ? "oklch(0.10 0.025 240 / 0.97)"
          : "oklch(0.10 0.025 240 / 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: isScrolled
          ? "1px solid oklch(0.68 0.12 75 / 0.25)"
          : "1px solid transparent",
        boxShadow: isScrolled
          ? "0 4px 32px oklch(0.05 0.02 240 / 0.7)"
          : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button
          type="button"
          data-ocid="nav.link"
          className="font-playfair font-bold text-sm sm:text-base tracking-wide text-left"
          style={{ color: "oklch(0.68 0.12 75)" }}
          onClick={() => scrollTo("hero")}
        >
          <span className="hidden sm:inline">✦ SRI RAGAVENDRA IYYANGAR</span>
          <span className="sm:hidden">✦ SRI RAGAVENDRA</span>
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {[
            { label: "Home", id: "hero" },
            { label: "Our Creations", id: "creations" },
            { label: "Our Journey", id: "journey" },
            { label: "Location", id: "location" },
          ].map((link) => (
            <button
              key={link.label}
              type="button"
              data-ocid="nav.link"
              className="font-inter text-xs font-medium tracking-wider uppercase transition-colors duration-200 hover:text-gold"
              style={{ color: "oklch(0.80 0.015 80)" }}
              onClick={() => scrollTo(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div
          data-ocid="nav.primary_button"
          className="text-xs font-inter font-semibold tracking-widest uppercase px-3 sm:px-4 py-1.5 rounded-sm"
          style={{
            border: "1px solid oklch(0.68 0.12 75)",
            color: "oklch(0.68 0.12 75)",
            background: "oklch(0.68 0.12 75 / 0.08)",
          }}
        >
          Grand Opening
        </div>
      </div>
    </header>
  );
}

// ===== HERO SECTION =====
function HeroSection() {
  const scrollToCreations = () => {
    document
      .getElementById("creations")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2, delayChildren: 0.6 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.10 0.03 240) 0%, oklch(0.12 0.03 245) 40%, oklch(0.08 0.025 235) 100%)",
      }}
    >
      <SparkleParticles />

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, oklch(0.68 0.12 75 / 0.06) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative w-full max-w-2xl mx-auto"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <AnimatedBorder width={640} height={680} />
        <CornerFiligree position="tl" />
        <CornerFiligree position="tr" />
        <CornerFiligree position="bl" />
        <CornerFiligree position="br" />

        <motion.div
          className="relative px-8 sm:px-14 py-12 sm:py-16 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <TopFiligreeLine />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-3">
            <p
              className="font-inter text-xs tracking-widest uppercase"
              style={{ color: "oklch(0.52 0.01 240)" }}
            >
              Proprietor
            </p>
            <p
              className="font-playfair font-bold text-lg sm:text-xl tracking-wider"
              style={{ color: "oklch(0.76 0.12 75)" }}
            >
              SURENDRAN C C
            </p>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="font-playfair italic text-base sm:text-lg mb-3 tracking-widest"
            style={{ color: "oklch(0.80 0.015 80)" }}
          >
            — A Warm Welcome Awaits You —
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-2 tracking-wide"
            style={{ color: "oklch(0.68 0.12 75)" }}
          >
            SRI RAGAVENDRA
          </motion.h1>
          <motion.h1
            variants={itemVariants}
            className="font-playfair font-bold text-2xl sm:text-3xl md:text-4xl leading-tight mb-6 tracking-wide"
            style={{ color: "oklch(0.76 0.12 75)" }}
          >
            IYYANGAR BAKERY
          </motion.h1>

          <motion.div variants={itemVariants}>
            <FiligreeDivider className="mb-6" />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-4">
            <div className="ornament-divider">
              <span
                className="font-playfair italic font-medium text-lg sm:text-xl tracking-wider"
                style={{ color: "oklch(0.94 0.015 80)" }}
              >
                Grand Opening Celebration
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-5">
            <p
              className="font-playfair font-bold text-xl sm:text-2xl tracking-wider"
              style={{ color: "oklch(0.76 0.13 75)" }}
            >
              Monday, 6th April 2026
            </p>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="font-inter text-sm sm:text-base leading-relaxed mb-3 px-2"
            style={{ color: "oklch(0.72 0.015 80)" }}
          >
            Step into a world where recipes are inherited, every loaf is a
            labour of love, and every cake is a celebration of life.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="font-inter text-xs tracking-widest uppercase mb-1"
            style={{ color: "oklch(0.55 0.01 80)" }}
          >
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="hero.map_marker"
              className="transition-all duration-200 hover:opacity-70 hover:underline underline-offset-2 decoration-dotted"
              style={{ color: "inherit" }}
            >
              📍 419, Kongu Main Rd · MS Nagar · Tiruppur
            </a>
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="font-playfair italic text-sm mb-4"
            style={{ color: "oklch(0.65 0.09 75 / 0.85)" }}
          >
            Baked with soul. Served with pride.
          </motion.p>

          {/* Owner details */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-1 mb-8"
          >
            <p
              className="font-inter text-xs tracking-wider uppercase"
              style={{ color: "oklch(0.52 0.01 240)" }}
            >
              For enquiries, contact the owner
            </p>
            <p
              className="font-playfair font-bold text-base"
              style={{ color: "oklch(0.76 0.12 75)" }}
            >
              SURENDRAN C C
            </p>
            <a
              href="tel:8921091065"
              className="font-inter text-sm font-medium tracking-wider inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
              style={{ color: "oklch(0.80 0.015 80)" }}
            >
              📞 8921091065
            </a>
          </motion.div>

          <motion.div variants={itemVariants}>
            <FiligreeDivider className="mb-8" />
          </motion.div>

          <motion.div variants={itemVariants}>
            <button
              type="button"
              data-ocid="hero.primary_button"
              className="btn-shimmer font-inter font-semibold text-sm tracking-widest uppercase px-10 py-4 rounded-sm"
              style={{
                color: "oklch(0.10 0.025 240)",
                letterSpacing: "0.12em",
              }}
              onClick={scrollToCreations}
            >
              ✦ Explore Our Bakery ✦
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator flex flex-col items-center gap-1">
        <span
          className="font-inter text-xs tracking-widest uppercase"
          style={{ color: "oklch(0.50 0.01 80)" }}
        >
          Scroll
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 8l5 5 5-5"
            stroke="oklch(0.68 0.12 75)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}

// ===== CREATIONS SECTION =====
function CreationsSection() {
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section
      id="creations"
      className="py-20 sm:py-28 px-4"
      style={{ background: "oklch(0.96 0.02 85)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={headingRef}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p
            className="font-playfair italic text-sm mb-2 tracking-widest"
            style={{ color: "oklch(0.68 0.12 75)" }}
          >
            — Born from Generations of Passion —
          </p>
          <h2
            className="font-playfair font-bold text-4xl sm:text-5xl mb-3"
            style={{ color: "oklch(0.18 0.01 240)" }}
          >
            Our Exquisite Creations
          </h2>
          <p
            className="font-playfair italic text-sm mb-4"
            style={{ color: "oklch(0.45 0.01 240)" }}
          >
            Every creation tells a story. Every flavour is a memory waiting to
            be made.
          </p>
          <FiligreeDivider />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== JOURNEY STEP DATA =====
const JOURNEY_STEPS = [
  {
    emoji: "🌾",
    title: "Finest Ingredients",
    desc: "We source only the purest flour, freshest eggs, and the finest dairy — because great baking starts with great ingredients.",
  },
  {
    emoji: "🥣",
    title: "Mixed with Passion",
    desc: "Each recipe is a blend of tradition and heart. Our bakers knead every dough with patience and pride.",
  },
  {
    emoji: "🔥",
    title: "Baked to Perfection",
    desc: "Our ovens transform simple ingredients into golden masterpieces — the aroma alone will make you smile.",
  },
  {
    emoji: "❄️",
    title: "Cooled with Care",
    desc: "We let time do its magic. Every creation rests until it reaches that perfect, melt-in-your-mouth moment.",
  },
  {
    emoji: "🎀",
    title: "Wrapped with Love",
    desc: "Before it reaches you, every item is handled with the same care as a precious gift — because to us, it is.",
  },
  {
    emoji: "😊",
    title: "Served to You with Joy",
    desc: "The final step — watching your face light up. That smile is why we bake every single day.",
  },
];

// ===== JOURNEY ARROW =====
function JourneyArrowDown() {
  return (
    <div className="flex justify-center my-2" aria-hidden="true">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="journey-arrow-down"
      >
        <path
          d="M16 6 L16 22 M10 16 L16 22 L22 16"
          stroke="oklch(0.68 0.12 75)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function JourneyArrowRight() {
  return (
    <div className="flex items-center justify-center mx-2" aria-hidden="true">
      <svg
        width="48"
        height="32"
        viewBox="0 0 48 32"
        fill="none"
        aria-hidden="true"
        className="journey-arrow-right"
      >
        <path
          d="M4 16 L40 16 M32 10 L40 16 L32 22"
          stroke="oklch(0.68 0.12 75)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ===== JOURNEY STEP CARD =====
function JourneyStepCard({
  step,
  index,
  fromLeft,
}: {
  step: (typeof JOURNEY_STEPS)[0];
  index: number;
  fromLeft: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center text-center p-6 sm:p-8 rounded-sm journey-step-card"
      style={{
        background: "oklch(0.13 0.028 240)",
        border: "1px solid oklch(0.68 0.12 75 / 0.3)",
        boxShadow: "0 4px 32px oklch(0.05 0.02 240 / 0.6)",
      }}
      initial={{ opacity: 0, x: fromLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 * (index % 2), ease: "easeOut" }}
    >
      {/* Step number badge */}
      <div
        className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center font-inter text-xs font-bold"
        style={{
          background: "oklch(0.68 0.12 75)",
          color: "oklch(0.10 0.025 240)",
          boxShadow: "0 0 12px oklch(0.68 0.12 75 / 0.6)",
        }}
      >
        {index + 1}
      </div>

      <div className="text-5xl mb-4 mt-2" aria-hidden="true">
        {step.emoji}
      </div>

      <h3
        className="font-playfair font-bold text-xl mb-3"
        style={{ color: "oklch(0.76 0.12 75)" }}
      >
        {step.title}
      </h3>

      <div
        className="w-10 h-px mb-3 mx-auto"
        style={{ background: "oklch(0.68 0.12 75 / 0.6)" }}
      />

      <p
        className="font-inter text-sm leading-relaxed"
        style={{ color: "oklch(0.72 0.012 80)" }}
      >
        {step.desc}
      </p>
    </motion.div>
  );
}

// ===== BAKING JOURNEY SECTION =====
function BakingJourneySection() {
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: "-100px" });
  const ornamentRef = useRef(null);
  const ornamentInView = useInView(ornamentRef, {
    once: true,
    margin: "-60px",
  });

  return (
    <section
      id="journey"
      className="relative py-20 sm:py-28 px-4 overflow-hidden"
      style={{ background: "oklch(0.10 0.025 240)" }}
    >
      <SparkleParticles sparkles={JOURNEY_SPARKLES} />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.68 0.12 75 / 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p
            className="font-playfair italic text-sm mb-2 tracking-widest"
            style={{ color: "oklch(0.68 0.12 75)" }}
          >
            — The Story Behind Every Bite —
          </p>
          <h2
            className="font-playfair font-bold text-4xl sm:text-5xl mb-3"
            style={{ color: "oklch(0.76 0.13 75)" }}
          >
            Crafted with Soul
          </h2>
          <p
            className="font-playfair italic text-base sm:text-lg mb-4"
            style={{ color: "oklch(0.72 0.015 80)" }}
          >
            — From Our Kitchen to Your Heart —
          </p>
          <FiligreeDivider />
        </motion.div>

        {/* Mobile layout: single column */}
        <div className="flex flex-col gap-4 lg:hidden">
          {JOURNEY_STEPS.map((step, i) => (
            <div key={step.title}>
              <JourneyStepCard step={step} index={i} fromLeft={true} />
              {i < JOURNEY_STEPS.length - 1 && <JourneyArrowDown />}
            </div>
          ))}
        </div>

        {/* Desktop layout: 2-column alternating zigzag */}
        <div className="hidden lg:block">
          {JOURNEY_STEPS.map((step, i) => {
            const isLeft = i % 2 === 0;
            const isLast = i === JOURNEY_STEPS.length - 1;
            return (
              <div key={step.title}>
                <div className="flex items-center">
                  {isLeft ? (
                    <>
                      <div className="flex-1">
                        <JourneyStepCard
                          step={step}
                          index={i}
                          fromLeft={true}
                        />
                      </div>
                      <JourneyArrowRight />
                      <div className="flex-1 opacity-0 pointer-events-none">
                        <JourneyStepCard
                          step={step}
                          index={i}
                          fromLeft={false}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 opacity-0 pointer-events-none">
                        <JourneyStepCard
                          step={step}
                          index={i}
                          fromLeft={true}
                        />
                      </div>
                      <JourneyArrowRight />
                      <div className="flex-1">
                        <JourneyStepCard
                          step={step}
                          index={i}
                          fromLeft={false}
                        />
                      </div>
                    </>
                  )}
                </div>
                {!isLast && (
                  <div
                    className={`flex ${isLeft ? "justify-end pr-16" : "justify-start pl-16"} my-2`}
                  >
                    <JourneyArrowDown />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom ornament */}
        <motion.div
          ref={ornamentRef}
          className="text-center mt-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={ornamentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div
            className="inline-block rounded-sm px-8 py-6 journey-ornament"
            style={{
              background: "oklch(0.13 0.028 240)",
              border: "1px solid oklch(0.68 0.12 75 / 0.4)",
              boxShadow:
                "0 0 40px oklch(0.68 0.12 75 / 0.12), inset 0 0 30px oklch(0.68 0.12 75 / 0.04)",
            }}
          >
            <FiligreeDivider className="mb-4" />
            <p
              className="font-playfair italic text-base sm:text-lg"
              style={{ color: "oklch(0.80 0.015 80)" }}
            >
              With every creation, we promise: made fresh, made with love, made
              for you. <span style={{ color: "oklch(0.76 0.13 75)" }}>✦</span>
            </p>
            <FiligreeDivider className="mt-4" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ===== LOCATION SECTION =====
function LocationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const embedUrl =
    "https://maps.google.com/maps?q=419+Kongu+Main+Rd+MS+Nagar+Tiruppur+Tamil+Nadu+641607&output=embed";

  return (
    <section
      id="location"
      className="py-20 sm:py-28 px-4"
      style={{ background: "oklch(0.93 0.02 82)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p
            className="font-playfair italic text-sm mb-2 tracking-widest"
            style={{ color: "oklch(0.68 0.12 75)" }}
          >
            — Our Doors Are Always Open —
          </p>
          <h2
            className="font-playfair font-bold text-4xl sm:text-5xl mb-2"
            style={{ color: "oklch(0.18 0.01 240)" }}
          >
            Visit Us
          </h2>
          <p
            className="font-playfair italic text-sm mb-4"
            style={{ color: "oklch(0.45 0.01 240)" }}
          >
            Come as guests, leave as family.
          </p>
          <FiligreeDivider />
        </motion.div>

        <motion.div
          className="rounded-sm overflow-hidden"
          style={{
            background: "oklch(0.97 0.015 82)",
            border: "1px solid oklch(0.68 0.12 75 / 0.3)",
            boxShadow: "0 8px 48px oklch(0.14 0.025 240 / 0.12)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="flex flex-col lg:flex-row">
            {/* Address side */}
            <div className="lg:w-2/5 p-8 sm:p-12 flex flex-col justify-center">
              <div
                className="w-10 h-px mb-6"
                style={{ background: "oklch(0.68 0.12 75)" }}
              />
              <p
                className="font-playfair italic text-sm mb-3"
                style={{ color: "oklch(0.68 0.12 75)" }}
              >
                Our Location
              </p>
              <h3
                className="font-playfair font-bold text-2xl sm:text-3xl mb-4"
                style={{ color: "oklch(0.18 0.01 240)" }}
              >
                SRI RAGAVENDRA IYYANGAR BAKERY
              </h3>
              <address
                className="font-inter not-italic text-sm leading-relaxed mb-6"
                style={{ color: "oklch(0.38 0.01 240)" }}
              >
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="location.map_marker"
                  className="transition-all duration-200 hover:opacity-70 inline-flex items-start gap-1 group"
                  style={{ color: "inherit" }}
                >
                  <span
                    className="mt-0.5 text-base leading-none group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  >
                    📍
                  </span>
                  <span className="group-hover:underline underline-offset-2 decoration-dotted">
                    419, Kongu Main Rd,
                    <br />
                    near ESI Dispensary, Appachi Nagar,
                    <br />
                    Kongu Nagar, MS Nagar,
                    <br />
                    Tiruppur, Tamil Nadu 641607
                  </span>
                </a>
              </address>

              <div
                className="w-full h-px mb-5"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.68 0.12 75 / 0.5), transparent)",
                }}
              />
              <p
                className="font-inter text-xs tracking-wider uppercase mb-2"
                style={{ color: "oklch(0.52 0.01 240)" }}
              >
                For any doubts, contact the owner
              </p>
              <p
                className="font-playfair font-bold text-lg mb-1"
                style={{ color: "oklch(0.68 0.12 75)" }}
              >
                SURENDRAN C C
              </p>
              <a
                data-ocid="location.primary_button"
                href="tel:8921091065"
                className="font-inter text-sm font-medium tracking-wider mb-6 inline-flex items-center gap-1.5 transition-colors hover:opacity-80"
                style={{ color: "oklch(0.38 0.01 240)" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  style={{ color: "oklch(0.68 0.12 75)" }}
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                8921091065
              </a>

              <a
                data-ocid="location.secondary_button"
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer inline-flex items-center justify-center gap-2 font-inter font-semibold text-xs tracking-widest uppercase px-7 py-3.5 rounded-sm w-fit transition-all"
                style={{ color: "oklch(0.10 0.025 240)" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                View on Google Maps
              </a>
            </div>

            {/* Map side */}
            <div
              className="lg:w-3/5 h-72 lg:h-auto min-h-72 relative"
              style={{ borderLeft: "1px solid oklch(0.68 0.12 75 / 0.2)" }}
            >
              <iframe
                title="Sri Ragavendra Iyyangar Bakery Location"
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "320px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full h-full"
              />
              <div
                className="absolute top-3 right-3 px-2.5 py-1.5 text-xs font-inter font-semibold tracking-wider rounded-sm"
                style={{
                  background: "oklch(0.10 0.025 240 / 0.85)",
                  color: "oklch(0.68 0.12 75)",
                  border: "1px solid oklch(0.68 0.12 75 / 0.5)",
                }}
              >
                ✦ TIRUPPUR
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ===== FOOTER =====
function Footer() {
  const year = new Date().getFullYear();
  const _hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      className="py-12 px-4"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.10 0.025 240) 0%, oklch(0.08 0.025 235) 100%)",
        borderTop: "1px solid oklch(0.68 0.12 75 / 0.2)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="text-center md:text-left">
            <div
              className="font-playfair font-bold text-xl mb-1"
              style={{ color: "oklch(0.68 0.12 75)" }}
            >
              ✦ SRI RAGAVENDRA IYYANGAR BAKERY
            </div>
            <p
              className="font-playfair italic text-sm mb-2"
              style={{ color: "oklch(0.55 0.01 80)" }}
            >
              Where Tradition Meets Every Taste
            </p>
            <p
              className="font-inter text-xs"
              style={{ color: "oklch(0.52 0.01 80)" }}
            >
              Owner:{" "}
              <span style={{ color: "oklch(0.68 0.12 75)" }}>
                SURENDRAN C C
              </span>
              {" · "}
              <a
                href="tel:8921091065"
                className="hover:opacity-80 transition-opacity"
                style={{ color: "oklch(0.68 0.12 75)" }}
              >
                📞 8921091065
              </a>
            </p>
          </div>
          <div className="flex items-center gap-6">
            {[
              { label: "Home", id: "hero" },
              { label: "Creations", id: "creations" },
              { label: "Journey", id: "journey" },
              { label: "Location", id: "location" },
            ].map((link) => (
              <button
                key={link.label}
                type="button"
                className="font-inter text-xs tracking-widest uppercase transition-colors hover:text-gold"
                style={{ color: "oklch(0.55 0.01 80)" }}
                onClick={() =>
                  document
                    .getElementById(link.id)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className="w-full h-px mb-6"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.68 0.12 75 / 0.4), transparent)",
          }}
        />

        <div className="text-center">
          <p
            className="font-inter text-xs"
            style={{ color: "oklch(0.45 0.01 80)" }}
          >
            © {year} Sri Ragavendra Iyyangar Bakery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ===== APP =====
export default function App() {
  const [phase, setPhase] = useState<"reborn" | "intro" | "main">("reborn");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {phase === "reborn" && (
          <motion.div
            key="reborn"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <RebornScreen onDone={() => setPhase("intro")} />
          </motion.div>
        )}

        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <IntroScreen onEnter={() => setPhase("main")} />
          </motion.div>
        )}
      </AnimatePresence>

      {phase === "main" && (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Navbar isScrolled={isScrolled} />
          <main>
            <HeroSection />
            <CreationsSection />
            <BakingJourneySection />
            <LocationSection />
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
