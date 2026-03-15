# WeAutomationAgency - Complete Project Documentation

## Project Overview

**WeAutomationAgency** is a professional website showcasing AI automation services built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. The site features advanced scroll-based animations, custom service pages, and a bold black/white/red design system.

**Live URL:** https://weautomationagency.com
**Repository:** https://github.com/Le-Yoy/WeAutomationAgency
**Dev Server:** localhost:3001
**Deployment:** Vercel (auto-deploy from main branch)

---

## Tech Stack

### Core Technologies
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Fonts:** Montserrat (Google Fonts) + Satoshi (Fontshare CDN)
- **Images:** next/image with WebP/AVIF optimization
- **Deployment:** Vercel
- **DNS:** Namecheap → Vercel

### Why These Choices?

| Technology | Why We Use It | What We DON'T Use (and why) |
|------------|---------------|------------------------------|
| **Next.js 14** | SSR/SSG for SEO, Image optimization, API routes, file-based routing | Create React App (no SSR), Gatsby (overcomplicated) |
| **Framer Motion** | React-native animations, useScroll/useTransform for scroll effects, AnimatePresence for transitions | GSAP (28KB, licensing), AOS (heavy), react-spring (complex API) |
| **Tailwind CSS** | Utility-first = fast iteration, no CSS bloat, responsive prefixes, design tokens via config | Styled-components (runtime cost), CSS Modules (verbose), Sass (unnecessary preprocessing) |
| **TypeScript** | Catch bugs early, better DX, self-documenting code | Plain JavaScript (error-prone at scale) |
| **CSS @keyframes** | Infinite loops (marquee) are more performant than JS | JavaScript animations for infinite loops (causes re-renders) |

---

## Design Philosophy

### Anti-AI-Generic Rules (CRITICAL)

These rules apply to **EVERY component** and **EVERY page**:

1. ❌ **NO generic gradient backgrounds** (no `linear-gradient(135deg, blue, purple)`)
2. ❌ **NO rounded-full badge chips** with gradient text (AI company cliche)
3. ❌ **NO generic tech emojis** (🚀 ⚡ ✨) anywhere in the UI
4. ❌ **NO glassmorphism cards** with colored borders (overdone)
5. ❌ **NO floating 3D shapes** in hero sections
6. ❌ **NO Lottie animations** or animated illustrations
7. ❌ **NO rainbow gradients** or multi-color schemes
8. ✅ **Icons are custom SVG only** - minimalist, brand-aligned
9. ✅ **Typography IS the design** - oversized type, dramatic spacing, weight contrast
10. ✅ **Color is minimal** - black (#000000), white (#FFFFFF), red (#F94239). That's it.
11. ✅ **Motion is purposeful** - scroll-linked, not decorative
12. ✅ **Only use emojis if user explicitly requests** - default is NO emojis

### Brand Colors

```typescript
// tailwind.config.ts
colors: {
  primary: '#000000',        // Black background
  secondary: '#FFFFFF',      // White text
  accent: '#F94239',         // Red (main brand color)
  'darker-orange': '#D93730', // Red hover state
  grey: '#C0C0C0',           // Medium grey
  'darker-grey': '#1A1A1A',  // Dark grey (cards)
}
```

### Typography Scale

- **Hero headings:** `clamp(3rem, 8vw, 7rem)` - massive, bold
- **Section headings:** `clamp(2.5rem, 5vw, 4rem)`
- **Body text:** `clamp(1rem, 1.5vw, 1.25rem)`
- **Font weights:** 100-800 (Montserrat variable)
- **Satoshi font:** Only for ScrollingText component (large word-by-word reveal)

---

## Project Structure

```
weautomationagency/
├── app/
│   ├── layout.tsx                    # Root layout (fonts, metadata, SEO)
│   ├── page.tsx                      # Homepage (imports all sections)
│   ├── globals.css                   # Tailwind + CSS animations
│   ├── api/
│   │   └── contact/route.ts          # Form submission endpoint
│   ├── services/
│   │   ├── ai-chatbot/page.tsx       # AI Chatbot service page
│   │   ├── lead-generation/page.tsx  # Lead Gen service page
│   │   ├── call-center/page.tsx      # Call Center service page
│   │   └── email-automation/page.tsx # Email Automation service page
│   ├── portfolio/page.tsx            # Portfolio showcase
│   ├── privacy/page.tsx              # Privacy policy
│   ├── terms/page.tsx                # Terms of service
│   ├── cookies/page.tsx              # Cookie policy
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── opengraph-image.png
│   └── site.webmanifest
├── components/
│   ├── Navbar.tsx                    # Fixed header + hamburger menu
│   ├── Hero.tsx                      # Two-column hero with scrolling images
│   ├── ResultsStats.tsx              # Animated counter stats
│   ├── CTASection.tsx                # Full-width CTA banner
│   ├── ServicesShowcase.tsx          # Giant "Services." title + floating image
│   ├── ScrollingText.tsx             # Word-by-word opacity reveal (Satoshi font)
│   ├── ScrollingCards.tsx            # Stacked card fly-off animation (signature feature)
│   ├── ImageSlides.tsx               # CSS marquee portfolio showcase
│   ├── Newsletter.tsx                # Email signup CTA
│   ├── PopupModal.tsx                # Contact form modal
│   ├── Footer.tsx                    # 4-column footer
│   └── hooks/
│       └── useCountUp.ts             # Counter animation hook
├── lib/
│   ├── design-system.ts              # Design tokens
│   └── animations.ts                 # Shared Framer Motion variants
├── public/
│   └── images/
│       ├── logos/                    # Brand logos
│       ├── ai-generated/             # AI-generated service images
│       └── portfolio/                # Website screenshots (AAA1-12.webp)
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json
├── package.json
└── CLAUDE.md                         # THIS FILE
```

---

## Homepage Components (app/page.tsx)

### Component Assembly

```tsx
'use client';
import { useState } from 'react';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Navbar onOpenModal={openModal} />
      <main>
        <Hero onOpenModal={openModal} />
        <ResultsStats />
        <CTASection onOpenModal={openModal} />
        <ServicesShowcase />
        <ScrollingText />
        <ScrollingCards />          {/* Signature scroll animation */}
        <ImageSlides onOpenModal={openModal} />
        <Newsletter />
      </main>
      <Footer />
      <PopupModal isOpen={modalOpen} onClose={closeModal} />
    </>
  );
}
```

### 1. Navbar.tsx
**Purpose:** Fixed header with logo, "Get Demo" CTA, and hamburger menu

**Key Features:**
- Full-screen red overlay menu (starts below header, not covering it)
- Two-column nav layout inside menu (Services | Get Started)
- Animated hamburger icon (3 lines → X)
- Locks body scroll when menu open

**Responsive:**
- Mobile: Hamburger always visible
- Desktop: Same (no visible nav links - all in menu)

**Code Snippet:**
```tsx
// Menu overlay positioning
<motion.div
  className="fixed top-20 bottom-0 left-0 right-0 z-40 bg-accent"
>
  {/* Menu content */}
</motion.div>
```

---

### 2. Hero.tsx
**Purpose:** Two-column hero with rotating text + auto-scrolling images

**Layout:**
- Left (60%): Heading, rotating subtitle (4 colors), description, CTA
- Right (40%): Two image columns scrolling in opposite directions

**Rotating Text Animation:**
```tsx
// 4 rotating states with unique colors
const rotatingText = [
  { text: 'Automation Solutions', color: '#F94239' },  // Red
  { text: 'Leads Generation', color: '#3b35ac' },      // Blue-purple
  { text: 'Chat Bot', color: '#da0f85' },              // Magenta
  { text: 'Call Center', color: '#856075' },           // Mauve
];
```

**Image Scrolling:**
- CSS `@keyframes` for infinite scroll (20s linear)
- Left column scrolls DOWN, right column scrolls UP
- Images duplicated in DOM for seamless loop
- Heights increased 20% from original (480/600/720px)

**Responsive:**
- Desktop: Side-by-side
- Mobile: Stack vertically, text on top

---

### 3. ResultsStats.tsx
**Purpose:** Stats section with animated counters

**Features:**
- Custom `useCountUp` hook using `requestAnimationFrame`
- IntersectionObserver triggers animation on scroll into view
- 3 stat cards: 95% satisfaction, 500+ projects, $10M+ revenue

**Animation:**
```tsx
// Custom counter hook
const count = useCountUp(targetValue, duration);
```

---

### 4. CTASection.tsx
**Purpose:** Full-width banner with background image + dark overlay

**Features:**
- Parallax background using `useTransform`
- Dark gradient overlay for text readability
- Dual CTAs: "Start Now" + "Learn More"

---

### 5. ServicesShowcase.tsx
**Purpose:** Giant "Services." title with floating cross-shaped image

**Key Features:**
- Massive red "Services." heading (responsive clamp)
- Cross-shaped image using CSS `clip-path`
- Floating animation: `animate={{ y: [0, -15, 0] }}` (4s infinite loop)
- 4 service cards (dark grey bg, accent borders on hover)

**Card Updates:**
- Changed from `bg-primary` to `bg-darker-grey` for better contrast
- Added borders: `border border-grey/20 rounded-xl`
- Hover effect: `hover:border-accent/40`

**Responsive:**
- Desktop: Title + image side-by-side
- Mobile: Stack, smaller font

---

### 6. ScrollingText.tsx
**Purpose:** Word-by-word scroll opacity reveal (SIGNATURE FEATURE)

**Font:** Satoshi (loaded via CDN, only used here for uniqueness)

**Animation Approach:**
```tsx
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ['start 0.8', 'end 0.2'],
});

// Each word gets its own opacity transform
const opacity = useTransform(
  scrollYProgress,
  [startProgress, endProgress],
  [0.15, 1]  // Dim → Full opacity
);
```

**Current Settings (after multiple iterations):**
- **Mobile:** `min-h-[80dvh]`, font `clamp(2.5rem, 8vw, ...)`, `font-semibold`, `text-justify`
- **Desktop:** Max font `4.7rem` (reduced 30% from original 6.69rem), `font-medium`
- User quote: "The text is perfect now"

**Text Content:**
> "We create custom AI chatbots for ecommerce and banking, enhance lead generation through marketing automation, and deliver intelligent call center solutions for seamless customer service."

---

### 7. ScrollingCards.tsx (MOST COMPLEX COMPONENT)

**Purpose:** Stacked service cards that fly off screen as you scroll (SIGNATURE ANIMATION)

**⚠️ CRITICAL - This component was rewritten multiple times. Final version is CLEAN.**

**Final Working Implementation:**

```tsx
const totalScreens = cards.length + 1; // 5 screens = 500vh

function Card({ card, index, totalCards, scrollYProgress }) {
  const segment = 1 / totalCards;
  const segStart = index * segment;
  const holdEnd = segStart + segment * 0.5;   // First 50% = card stays still
  const flyEnd = segStart + segment;           // Last 50% = card flies away

  // During hold: nothing moves. During fly: card exits.
  const x = useTransform(scrollYProgress, [segStart, holdEnd, flyEnd], [0, 0, -500]);
  const yFly = useTransform(scrollYProgress, [segStart, holdEnd, flyEnd], [0, 0, -300]);
  const rot = useTransform(scrollYProgress, [segStart, holdEnd, flyEnd], [0, 0, -12]);
  const op = useTransform(scrollYProgress, [segStart, holdEnd, flyEnd - segment * 0.05, flyEnd], [1, 1, 0.6, 0]);

  // Stack: cards behind active one sit slightly lower & rotated
  const stackY = useTransform(scrollYProgress, [0, segStart], [index * 6, 0]);
  const stackRot = useTransform(scrollYProgress, [0, segStart], [index * 1, 0]);

  const isFirst = index === 0;

  return (
    <motion.div
      style={{
        x,
        y: isFirst ? yFly : stackY,
        rotate: isFirst ? rot : stackRot,
        opacity: op,
        zIndex: totalCards - index,
      }}
      className="absolute inset-0 bg-accent rounded-2xl p-5 sm:p-7 flex flex-col overflow-hidden"
    >
      {/* Card content */}
    </motion.div>
  );
}
```

**Section Height:** `(cards.length + 1) * 100vh` = **500vh** (reduced from 900vh for better mobile UX)

**Scroll Offset:** `['start start', 'end end']` (clean and simple)

**Card Container Heights:** `340px / 380px / 420px` (responsive)

**Layout:**
- Left: "Get Smart Automation" heading + description
- Right: Stacked cards with fly-off animation

**Cards Content (4 total):**
1. **Enterprise-Grade AI Chatbot Solutions**
   - Tags: Ecommerce, Multilingual, WhatsApp, Lead Gen, Banking
   - Description: Custom conversational AI for support, leads, sales 24/7

2. **Automated Lead Generation**
   - Tags: Marketing Automation, Sales, Email, Funnel, Custom Dev
   - Description: AI systems that find, qualify, nurture ideal customers

3. **Intelligent Call Center**
   - Tags: AI Call Center, Voice Analytics, Customer Service, Support
   - Description: Voice AI with human-like quality, analytics, reports

4. **Advanced Multimedia Solutions**
   - Tags: Product Videos, Voice Gen, Brand Videos, Training, Visual AI
   - Description: AI-generated videos, voice synthesis, content at scale

**Tag Styling (FIXED):**
- Previously: Orange tags on orange background (invisible)
- Current: `bg-primary/80 text-secondary border border-secondary/20`
- Result: White text on semi-transparent black with borders (visible!)

**User Feedback Journey:**
- "Cards fly before user can read" → Added hold duration (50%)
- "Cards at very bottom of screen" → Changed to `items-center` positioning
- "Scroll too much on mobile" → Reduced from 900vh to 500vh
- "Still broken" → Complete Opus rewrite with clean segment-based logic
- **Final result:** WORKS PERFECTLY ✅

---

### 8. ImageSlides.tsx
**Purpose:** Portfolio showcase with dual-row CSS marquee

**Features:**
- White background section (only white bg on entire site)
- 2 rows of scrolling website screenshots
- Row 1 scrolls LEFT, Row 2 scrolls RIGHT
- Pure CSS animation (more performant than JS)

**CSS Animation:**
```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* Row 2 reverses */
animation-direction: reverse;
```

**Images:** `Website AAA1.webp` through `AAA12.webp` from `/public/images/portfolio/`

---

### 9. Newsletter.tsx
**Purpose:** Email signup + "Book A Call" CTA

**Features:**
- Email input + button inline
- Submit state handling (idle → sending → sent)
- Links to /terms and /privacy
- Simple, clean design

---

### 10. PopupModal.tsx
**Purpose:** Contact form modal

**Features:**
- Backdrop overlay (black 75% + blur)
- Form: Email (required), Phone (optional), Message (textarea)
- AnimatePresence for smooth enter/exit
- Close: ESC key, click overlay, click X button

**State Management:**
```tsx
// Passed via props from page.tsx
const [modalOpen, setModalOpen] = useState(false);
```

---

### 11. Footer.tsx
**Purpose:** 4-column footer with company info

**Sections:**
1. Logo + Newsletter
2. Services (links to /services/* pages)
3. Legal (Privacy, Terms, Cookies)
4. Contact (Email, Phone, Hours, Address)

**Company Info:**
- **Company:** BOUTALEB LLC
- **Address:** 30 N GOULD ST STE N, SHERIDAN, WY 82801
- **Email:** ceo@weautomationagency.com
- **Phone:** +1 (646) 980-2446
- **Hours:** Mon-Fri 9:00AM - 5:00PM EST
- **Copyright:** © 2026 Boutaleb LLC

**Service Links (UPDATED):**
```tsx
const quickLinks = [
  { name: 'AI Chatbot', href: '/services/ai-chatbot' },
  { name: 'Lead Generation', href: '/services/lead-generation' },
  { name: 'Call Center', href: '/services/call-center' },
  { name: 'Email Automation', href: '/services/email-automation' },
  { name: 'Portfolio', href: '/portfolio' },
];
```

**Social Links:**
- Instagram, LinkedIn, Twitter (generic URLs, can be updated)

---

## Service Pages (5 Total)

### Page Structure (All Pages Follow This Pattern)

1. **Hero Section**
   - Back to Home link (animated arrow)
   - Large heading with accent color
   - Descriptive subtitle
   - Primary CTA button
   - Animated background elements (unique per page)

2. **Stats/Metrics Section**
   - 4 key metrics with large numbers
   - Grid layout, responsive
   - Scroll-triggered animations

3. **Features Section**
   - 4 feature cards in grid
   - Hover effects
   - Stats/metrics per feature
   - Stagger animations

4. **Unique Visualization Section**
   - Different per page (funnel, timeline, flow, etc.)
   - Animated on scroll
   - Demonstrates the service visually

5. **Use Cases / Case Studies**
   - Industry-specific examples
   - Real results and metrics
   - Problem → Solution → Results format

6. **Final CTA Section**
   - Large heading with question
   - Descriptive text
   - Primary CTA button
   - Links to /#contact

---

### 1. /services/ai-chatbot

**Unique Animations:**
- **Floating chat bubbles** in hero (parallax, blur effects)
- **Animated conversation demo** - Messages slide in sequentially
- Chat bubbles from left (user) and right (bot)

**Content Highlights:**
- **Features:** Natural Conversations (98% satisfaction), Instant Deployment (24/7), Smart Learning (10x faster), Multilingual (95+ languages)
- **Conversation Demo:** 4-message exchange showing product inquiry, shipping options
- **Use Cases:** Ecommerce (+32% conversion), Banking (85% instant resolution), Healthcare (-70% admin time), Real Estate (+45% qualified leads)

**Signature Element:** Chat bubble backgrounds with blur + opacity

---

### 2. /services/lead-generation

**Unique Animations:**
- **Expanding circle** background (scale transform on scroll)
- **Animated funnel visualization** - Each stage slides in, width decreases
- **Progress bars** for each channel (animate width on scroll)

**Content Highlights:**
- **Funnel:** 10,000 visitors → 3,500 engaged → 850 qualified → 170 customers (1.7% conversion)
- **Strategies:** Automated Outreach (3x leads), Smart Qualification (70% higher quality), Nurture Sequences (5x conversion), Data Enrichment (90% accuracy)
- **Channels:** Email (85%), LinkedIn (78%), Landing Pages (92%), Content (73%), Paid Ads (68%), Webinars (88%)

**Signature Element:** Funnel visualization with decreasing widths + vibrant accent colors

---

### 3. /services/call-center

**Unique Animations:**
- **Voice wave animation** - 7 vertical bars bouncing up/down infinitely (SIGNATURE!)
- **Call flow diagram** with connecting lines between steps
- Smooth step-by-step progression

**Content Highlights:**
- **Stats:** 24/7 availability, <3s response time, 95% first-contact resolution, $0.08 cost per call (vs $6 human)
- **Capabilities:** Inbound Call Handling (-75% wait times), Appointment Scheduling (+60% bookings), Order Status (-80% inquiries), Voice Analytics (100% analysis)
- **Call Flow:** Call Received → Intent Recognition → Automated Resolution (85%) → Smart Escalation → Analytics & Learning
- **Industries:** Healthcare (appointments, insurance), Ecommerce (orders, returns), Real Estate (showings, qualification), Professional Services (consultations, billing)

**Signature Element:** Voice wave bars animation (simple, fluid, recognizable)

---

### 4. /services/email-automation

**Unique Animations:**
- **Floating email icon** with rotation transform
- **Progress bars** for metrics (animated width on scroll)
- **Timeline visualization** with connecting lines between email stages

**Content Highlights:**
- **Metrics:** 42% open rate (vs 18% avg), 8.5% CTR (vs 2.6% avg), $2.14 revenue/email (vs $0.38 avg), +12% list growth
- **Features:** Behavioral Triggers (4.2x engagement), Dynamic Personalization (6x conversion), A/B Testing (+35% opens), Sequence Optimization (92% deliverability)
- **Sequences:** Welcome Series (5 emails, 28% conversion), Cart Abandonment (3 emails, 15%), Re-engagement (4 emails, 12%), Lead Nurture (8 emails, 22%)
- **Timeline Example:** Welcome series with 5 emails over 14 days, showing open rates (68% → 35%)

**Signature Element:** Email timeline with connecting lines + open rate progression

---

### 5. /portfolio

**Unique Animations:**
- **Sliding horizontal line** at hero bottom
- **Scale-up animations** on project cards
- **Image zoom on hover** for website gallery

**Content Highlights:**
- **Stats:** 150+ projects delivered, $50M+ revenue generated, 98% client satisfaction, 45 industries served
- **Case Studies (6 total):**
  1. E-commerce AI Chatbot: +32% conversion, -60% support tickets, $2.1M additional revenue
  2. Banking Lead Qualification: +85% lead quality, -72% processing time, $140k annual savings
  3. Healthcare Appointment System: 0% missed calls, -65% no-shows, +50% appointments booked
  4. Real Estate Lead Gen: +45% qualified leads, <2min response time, 3.2x pipeline growth
  5. SaaS Product Launch: 847 beta signups, 28% conversion, $0.82 cost per signup
  6. Hospitality Guest Experience: 4.9/5 satisfaction, +40% positive reviews, -80% front desk load

- **Website Gallery:** 12 portfolio screenshots (Website AAA1-12.webp) in responsive grid

**Signature Element:** Detailed case studies with Challenge → Solution → Results format + tech stack badges

---

## Policy Pages (3 Total)

### Design Pattern (All 3 Pages)

1. **Hero Section**
   - Back to Home link
   - Large page title with accent period
   - Intro text
   - Last updated date

2. **Content Sections**
   - Card-based layout
   - Icon + heading + colored divider per section
   - Dark grey cards with hover effects
   - Proper spacing and typography

3. **Contact CTA**
   - Heading + description
   - Email button with icon
   - Links to ceo@weautomationagency.com

---

### 1. /privacy - Privacy Policy

**Sections:**
1. Information We Collect (contact, company, technical data)
2. How We Use Your Information (provide services, respond, communicate)
3. Information Sharing & Disclosure (emphasizes "We never sell your data")
4. Data Security & Protection (encryption, secure servers, audits)
5. Your Rights & Control (Access, Correction, Deletion, Opt-out, Portability)
6. Cookies & Tracking (links to Cookie Policy)

**Design:** Each section has icon (document, lightning, lock, shield, user, lightbulb)

---

### 2. /terms - Terms of Service

**Sections:**
1. Acceptance of Terms
2. Service Description (lists all AI services)
3. User Responsibilities (provide accurate info, maintain security, lawful use)
4. Intellectual Property (ownership, licenses, deliverables)
5. Payment Terms (pricing, schedule, late payments, refunds)
6. Warranties & Disclaimers (service warranty, NO WARRANTY notice, AI limitations)
7. Limitation of Liability (caps liability at 12 months of payments)
8. Termination (conditions for ending services)

**Additional Section:** Governing Law (Wyoming, Sheridan County)

---

### 3. /cookies - Cookie Policy

**Sections:**
1. What Are Cookies? (explanation with large icon)
2. Types of Cookies We Use (4 detailed cards):
   - **Essential Cookies** (Required badge) - Session management, security
   - **Analytics Cookies** (Optional badge) - Page views, behavior patterns
   - **Functional Cookies** (Optional badge) - Preferences, settings
   - **Marketing Cookies** (Optional badge) - Ad personalization, retargeting
3. How to Control Cookies (browser-specific instructions: Chrome, Firefox, Safari, Edge)
4. Third-Party Cookies (Google Analytics, privacy-respecting partners)
5. Updates to This Policy

**Signature Element:** Detailed cookie cards with "Required/Optional" badges + duration + examples

---

## Animations Library (lib/animations.ts)

### Shared Framer Motion Variants

```typescript
// Viewport settings
export const viewportOnce = {
  once: true,
  margin: '0px 0px -100px 0px',
};

// Common animations
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};
```

### Custom Hooks

**useCountUp.ts** - Animated counter hook
```typescript
export function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    const startTime = Date.now();
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const currentCount = Math.floor(progress * end);

      if (countRef.current !== currentCount) {
        setCount(currentCount);
        countRef.current = currentCount;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return count;
}
```

---

## SEO & Metadata

### Root Layout (app/layout.tsx)

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://weautomationagency.com'),
  title: 'WeAutomationAgency — AI Automation for Business Growth',
  description: 'We build AI chatbots, automated lead generation, intelligent call centers, and multimedia solutions that drive revenue for your business.',
  keywords: ['AI automation', 'chatbot', 'lead generation', 'call center', 'business automation'],
  openGraph: {
    title: 'WeAutomationAgency',
    description: 'Transform your business with AI automation',
    url: 'https://weautomationagency.com',
    siteName: 'WeAutomationAgency',
    type: 'website',
    images: ['/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WeAutomationAgency',
    description: 'AI automation solutions for business growth',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};
```

### Favicons Generated

All favicons generated from `/public/images/logos/Mini-Logo-Orangee.webp`:
- `favicon.ico` (multi-size)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180x180)
- `icon-192.png` (Android)
- `icon-512.png` (Android)
- `opengraph-image.png` (1200x630)
- `site.webmanifest` (PWA config)

**Generation Commands:**
```bash
rsvg-convert Mini-Logo-Orangee.webp -w 180 -h 180 -o apple-touch-icon.png
magick apple-touch-icon.png -resize 32x32 favicon-32x32.png
# ... (full commands in deployment history)
```

---

## Git & Deployment

### Repository Setup

```bash
# Initialize git
git init
git remote add origin https://github.com/Le-Yoy/WeAutomationAgency.git

# First push
git add -A
git commit -m "Initial commit"
git push -u origin main
```

### Vercel Deployment

**Setup:**
1. Import GitHub repo to Vercel
2. Root directory: `weautomationagency`
3. Framework preset: Next.js
4. Auto-deploy on push to main

**Domain Configuration:**
1. Add domain in Vercel: weautomationagency.com
2. Update Namecheap DNS:
   - A record: `@` → `76.76.21.21` (Vercel IP)
   - CNAME: `www` → `cname.vercel-dns.com`
3. Set up 308 Permanent Redirect: www → weautomationagency.com

**Deployment URLs:**
- Production: https://weautomationagency.com
- Vercel preview: https://we-automation-agency-*.vercel.app

### Git Workflow

```bash
# Make changes
git add -A
git commit -m "Description of changes

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
git push origin main

# Vercel auto-deploys in ~1-2 minutes
```

---

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Run dev server (localhost:3001)
npm run dev

# Build for production
npm run build

# Run production server
npm run start

# Lint
npm run lint
```

### Port Configuration

- **Dev server:** localhost:3001 (configured in package.json)
- **Why 3001?** Port 3000 may be in use by other projects

```json
// package.json
{
  "scripts": {
    "dev": "next dev -p 3001"
  }
}
```

### Common Development Tasks

**Adding a new component:**
1. Create `/components/NewComponent.tsx`
2. Export as default function
3. Use TypeScript interfaces for props
4. Import in `page.tsx` or other components
5. Test responsiveness (375px, 768px, 1440px)

**Adding a new page:**
1. Create `/app/new-page/page.tsx`
2. Add metadata export
3. Update navigation/footer links
4. Test build: `npm run build`

**Fixing ESLint errors:**
- Common: Unescaped quotes/apostrophes
- Fix: Use `&apos;`, `&ldquo;`, `&rdquo;` or rewrite without contractions
- Example: `don't` → `do not` or `don&apos;t`

---

## Troubleshooting

### Issue: "Cannot find module './948.js'" Error

**Cause:** Stale `.next` cache from running production build while dev server is running

**Solution:**
```bash
# Stop dev server (Ctrl+C)
rm -rf .next
npm run dev
```

**Prevention:** Never run `npm run build` while dev server is running

---

### Issue: Favicon Not Showing on Vercel

**Cause:** Browser/CDN caching

**Solution:**
- Hard refresh (Cmd+Shift+R / Ctrl+Shift+F5)
- Wait 5-10 minutes for CDN propagation
- Check in incognito mode
- Clear browser cache

---

### Issue: ScrollingCards Animation Broken

**History:** This component was rewritten 3+ times

**Final Solution:** Clean segment-based animation logic
- Each card owns 1/4 of scroll progress
- 50% hold, 50% fly
- Section height: 500vh (reduced from 900vh)
- Proper `items-center` positioning

**If broken again:**
1. Check section height calculation
2. Verify scroll offset: `['start start', 'end end']`
3. Ensure card container has `absolute inset-0`
4. Check z-index stacking order
5. Verify transform ranges don't overlap

---

### Issue: Images Not Loading (404)

**Common Causes:**
1. Incorrect path (Next.js requires leading slash)
2. Image doesn't exist in `/public/images/`
3. Case-sensitive filename mismatch

**Solution:**
```tsx
// ✅ Correct
<Image src="/images/logos/logo.webp" />

// ❌ Wrong
<Image src="images/logos/logo.webp" />  // Missing leading slash
<Image src="/images/logos/Logo.webp" />  // Case mismatch
```

---

### Issue: Build Fails with Type Errors

**Common Causes:**
1. Missing TypeScript interfaces
2. Incorrect prop types
3. Missing imports

**Solution:**
```bash
# Check types without building
npx tsc --noEmit

# Fix errors shown
# Then rebuild
npm run build
```

---

## Performance Optimization

### Image Optimization

**All images use next/image:**
- Auto WebP/AVIF conversion
- Lazy loading below fold
- Responsive srcSet generated
- Blur placeholder on slow connections

**Best Practices:**
```tsx
// Above the fold (hero)
<Image src="/hero.webp" priority />

// Below the fold
<Image src="/feature.webp" loading="lazy" />

// Always specify sizes for responsive images
<Image
  src="/card.webp"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

---

### Bundle Size Optimization

**Current bundle sizes:**
- Homepage: 62.3 kB (First Load: 158 kB)
- Service pages: ~3 kB each (First Load: ~143 kB)
- Policy pages: 181 B each (First Load: 96.2 kB)

**Why so small:**
- No heavy libraries (no GSAP, no Lenis, no icon libraries)
- Tailwind purges unused CSS
- Framer Motion tree-shakes unused features
- Custom SVG icons (no font library)
- Code splitting via Next.js App Router

---

### Scroll Performance

**CSS animations over JS where possible:**
- Marquee scrolling: Pure CSS `@keyframes`
- Infinite loops: CSS (GPU-accelerated, no re-renders)

**Framer Motion optimized:**
- `useScroll` tied to specific refs (not window)
- `useTransform` for value mapping (no state updates)
- `layoutId` for shared element transitions
- GPU-accelerated properties: `transform`, `opacity`

---

## Key Learnings & Best Practices

### 1. Scroll Animations

**✅ DO:**
- Use `useScroll` with specific `target` refs
- Map scroll progress with `useTransform`
- Keep animations smooth (60fps target)
- Test on mobile devices (scroll behavior differs)

**❌ DON'T:**
- Animate on window scroll events (causes jank)
- Use heavy calculations in scroll handlers
- Animate layout properties (causes reflow)
- Over-animate (less is more)

---

### 2. Responsive Design

**✅ DO:**
- Use `clamp()` for fluid typography
- Test at 375px (iPhone SE), 768px (iPad), 1440px (Desktop)
- Mobile-first approach with `sm:`, `md:`, `lg:` prefixes
- Reduce animations on mobile if performance suffers

**❌ DON'T:**
- Use fixed pixel sizes for fonts
- Assume desktop-first layout
- Over-complicate mobile layouts
- Ignore touch target sizes (min 44px)

---

### 3. Animation Performance

**✅ DO:**
- Animate `transform` and `opacity` (GPU-accelerated)
- Use `will-change` sparingly
- Use `IntersectionObserver` for scroll triggers
- Pause animations when off-screen

**❌ DON'T:**
- Animate `width`, `height`, `top`, `left` (causes reflow)
- Run animations on every scroll tick
- Use too many simultaneous animations
- Forget to clean up animation listeners

---

### 4. Content Strategy

**✅ DO:**
- Use real metrics and case studies
- Write for humans, not search engines
- Be specific (no vague marketing speak)
- Show actual results with numbers

**❌ DON'T:**
- Use AI-generic phrases ("leveraging cutting-edge")
- Add emojis unless explicitly requested
- Use stock photos (we use custom AI-generated images)
- Write without measuring impact

---

### 5. Git Commit Messages

**✅ DO:**
```
Create 5 stunning service pages with fluid animations

Built dedicated pages for each service with unique animations,
scroll-based reveals, and responsive design. Updated Footer to
link to new pages.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**❌ DON'T:**
```
updates
fix stuff
changes
wip
```

---

## Future Enhancements

### Potential Improvements

1. **Analytics Integration**
   - Google Analytics 4 or Plausible
   - Track page views, conversions, form submissions
   - Heatmaps for user behavior

2. **CMS Integration**
   - Sanity.io or Contentful for case studies
   - Easy client updates without code changes
   - Image optimization pipeline

3. **A/B Testing**
   - Test different hero CTAs
   - Experiment with service page layouts
   - Optimize conversion funnels

4. **Enhanced Animations**
   - 3D transforms (CSS `perspective`)
   - WebGL backgrounds (Three.js)
   - Scroll-triggered SVG path animations
   - Parallax depth layers

5. **Accessibility**
   - Full keyboard navigation
   - Screen reader optimization
   - Reduced motion preferences
   - ARIA labels on all interactive elements

6. **Internationalization**
   - Multi-language support (Spanish, French)
   - Locale-based routing
   - Currency/date formatting

---

## Contact & Support

**For questions about this project:**
- Email: ceo@weautomationagency.com
- GitHub Issues: https://github.com/Le-Yoy/WeAutomationAgency/issues

**For Claude Code help:**
- Run `/help` in terminal
- Documentation: https://claude.com/claude-code

---

## Document Changelog

- **2026-02-13:** Initial documentation created
- **2026-02-13:** Added service pages documentation
- **2026-02-13:** Added policy pages documentation
- **2026-02-13:** Added troubleshooting guide
- **2026-02-13:** Added performance optimization notes

---

**Last Updated:** February 13, 2026
**Maintained By:** Claude Code + Sam (almostaphasmart)
**Project Status:** ✅ Production (Live at weautomationagency.com)
