# ✒️ InkWell — Kinetic Minimalism Attendance System

![InkWell Banner](https://inkwell.himdeunn.my.id/logo.jpg)

**InkWell** is a state-of-the-art, high-end attendance platform designed with a **Kinetic Minimalism** aesthetic. It redefines how organizations manage presence by combining cinematic typography, liquid transitions, and military-grade security.

## ✨ Key Features

- **🛡️ Military-Grade Security**: Integrated Cloudflare Turnstile CAPTCHA and automated account locking to prevent brute-force attacks.
- **📸 Selfie Verification**: Real-time camera capture for authentic attendance logs.
- **📍 Geolocation Tracking**: Precise location verification using high-accuracy GPS coordinates.
- **🌍 Global i18n Support**: Full localization in **Indonesian, English, Chinese, and Japanese**.
- **📊 Admin Insights**: Comprehensive dashboard with real-time analytics, member summaries, and functional CSV exports.
- **📱 Ultra-Responsive**: "Floating Island" navigation system optimized for mobile, tablet, and desktop.
- **🔔 Kinetic Notifications**: Real-time status updates using the `sonner` toast system.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Prisma ORM](https://www.prisma.io/))
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Security**: [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/)

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Himdeunn/absence-app.git
cd absence-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add the following:
```env
DATABASE_URL="your_postgresql_url"
AUTH_SECRET="your_nextauth_secret"
NEXT_PUBLIC_TURNSTILE_SITE_KEY="your_cloudflare_site_key"
TURNSTILE_SECRET_KEY="your_cloudflare_secret_key"
```

### 4. Database Sync
```bash
npx prisma db push
```

### 5. Run Development Server
```bash
npm run dev
```

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with precision by **InkWell Team**.
