/* style.css */

:root {
    --bg-main: #07080a;
    --bg-card: rgba(255, 255, 255, 0.03);
    --border-color: rgba(255, 255, 255, 0.07);
    --accent-gold: #c99b66;
    --text-white: #ffffff;
    --text-muted: #8e929a;
    --glow-effect: cubic-bezier(0.4, 0, 0.2, 1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Vazirmatn', sans-serif;
    -webkit-tap-highlight-color: transparent;
}

body {
    background-color: var(--bg-main);
    color: var(--text-white);
    line-height: 1.6;
    overflow-x: hidden;
    background-image: radial-gradient(circle at 50% -20%, rgba(201, 155, 102, 0.15) 0%, transparent 50%);
}

/* --- Navbar --- */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 6%;
    border-bottom: 1px solid var(--border-color);
    background-color: rgba(7, 8, 10, 0.8);
    backdrop-filter: blur(12px);
    position: sticky;
    top: 0;
    z-index: 100;
}
.logo h1 { font-size: 1.15rem; letter-spacing: 1.5px; font-family: sans-serif; font-weight: 700; }
.logo span { display: block; font-size: 0.55rem; color: var(--text-muted); letter-spacing: 1px; font-family: sans-serif; }

.nav-links { display: flex; list-style: none; gap: 30px; }
.nav-links a { font-size: 0.9rem; color: var(--text-muted); transition: color 0.3s; }
.nav-links a:hover, .nav-links a.active { color: var(--accent-gold); }

.btn-outline {
    background: transparent; border: 1px solid var(--accent-gold); color: var(--accent-gold);
    padding: 8px 20px; border-radius: 8px; font-size: 0.85rem; transition: all 0.3s;
}
.btn-outline:hover { background: var(--accent-gold); color: #000; box-shadow: 0 0 15px rgba(201, 155, 102, 0.3); }

/* --- Main Layout --- */
main { max-width: 1300px; margin: 0 auto; padding: 40px 6%; }

/* --- Hero Section --- */
.hero-container {
    display: flex;
    background: linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%);
    border: 1px solid var(--border-color);
    border-radius: 24px;
    overflow: hidden;
    margin-bottom: 30px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}

.hero-content {
    flex: 1;
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-left: 1px solid var(--border-color);
}
.hero-content h2 { font-size: 2.2rem; font-weight: 700; line-height: 1.4; margin-bottom: 20px; }
.hero-content p { color: var(--text-muted); font-size: 1rem; margin-bottom: 35px; text-align: justify; }

/* آپدیت بخش متریال و ویژگی‌ها */
.materials-wrapper { margin-bottom: 30px; }
.materials { display: flex; gap: 15px; }
.color-btn {
    width: 38px; height: 38px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.2);
    cursor: pointer; transition: all 0.3s var(--glow-effect); position: relative;
}
.color-btn.active { border-color: var(--accent-gold); transform: scale(1.1); box-shadow: 0 0 12px var(--accent-gold); }

.tech-features { display: flex; gap: 25px; margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 25px; }
.feature-item { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--text-muted); }
.feature-item .icon { font-size: 1.1rem; }

/* باکس سه بعدی */
.hero-3d {
    flex: 1.2;
    height: 520px;
    position: relative;
    background: radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%);
}
model-viewer { width: 100%; height: 100%; --poster-color: transparent; }

.ar-button {
    background-color: var(--accent-gold); color: #07080a; border: none; border-radius: 10px;
    padding: 14px 28px; font-size: 0.95rem; font-weight: bold;
    position: absolute; bottom: 25px; left: 50%; transform: translateX(-50%);
    cursor: pointer; display: none; box-shadow: 0 8px 25px rgba(201, 155, 102, 0.4);
    transition: 0.3s;
}

/* --- Thumbnails Slider --- */
.thumbnails-slider { display: flex; align-items: center; gap: 15px; margin-bottom: 60px; position: relative; }
.thumbnails-track {
    display: flex; gap: 16px; overflow-x: auto; width: 100%; padding: 5px;
    scrollbar-width: none; /* مخفی کردن اسکرول‌بار دسکتاپ */
}
.thumbnails-track::-webkit-scrollbar { display: none; } /* مخفی کردن اسکرول‌بار کروم */

.thumb {
    width: 110px; height: 110px; border-radius: 16px; border: 1px solid var(--border-color);
    background: var(--bg-card); display: flex; align-items: center; justify-content: center;
    cursor: pointer; flex-shrink: 0; overflow: hidden; transition: all 0.3s; position: relative;
}
.thumb img { width: 100%; height: 100%; object-fit: cover; transition: 0.3s; }
.thumb:hover img { transform: scale(1.05); }
.thumb.active { border-color: var(--accent-gold); box-shadow: 0 0 15px rgba(201, 155, 102, 0.2); background: rgba(201, 155, 102, 0.03); }
.thumb-fallback { font-size: 0.8rem; color: var(--text-muted); font-weight: 500; }
.slider-arrow {
    width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--border-color);
    display: flex; align-items: center; justify-content: center; cursor: pointer;
    background: var(--bg-main); font-size: 1.5rem; color: var(--text-muted); user-select: none; transition: 0.3s;
}
.slider-arrow:hover { border-color: var(--accent-gold); color: var(--accent-gold); }

/* --- Services Section --- */
.services-section { margin-bottom: 60px; }
.section-title-center { text-align: center; font-size: 1.7rem; margin-bottom: 35px; color: var(--text-white); position: relative; }
.section-title-center::after { content: ''; display: block; width: 50px; height: 2px; background: var(--accent-gold); margin: 8px auto 0 auto; }

.services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.service-card {
    background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px;
    padding: 30px 25px; transition: all 0.3s;
}
.service-card:hover { border-color: rgba(201, 155, 102, 0.3); transform: translateY(-5px); background: rgba(255,255,255,0.04); }
.service-icon { font-size: 2rem; margin-bottom: 15px; }
.service-card h4 { font-size: 1.05rem; margin-bottom: 12px; font-weight: 700; }
.service-card p { color: var(--text-muted); font-size: 0.88rem; line-height: 1.7; text-align: justify; }

/* --- Footer Grid (About & Contact) --- */
.footer-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 25px; margin-bottom: 30px; }
.about-card, .contact-card {
    background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 24px; padding: 40px;
}
.section-title { font-size: 1.4rem; color: var(--text-white); margin-bottom: 20px; }
.about-card p, .contact-card p { color: var(--text-muted); font-size: 0.95rem; line-height: 1.8; text-align: justify; margin-bottom: 30px; }

.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 30px; }
.stat-item { text-align: center; }
.stat-num { display: block; font-size: 1.7rem; font-weight: 700; color: var(--accent-gold); font-family: sans-serif; }
.stat-label { font-size: 0.75rem; color: var(--text-muted); }

/* باکس تماس حرفه‌ای اختصاصی حامد قنبرزاده */
.contact-profile {
    background: rgba(0, 0, 0, 0.2); border: 1px solid var(--border-color);
    border-radius: 16px; padding: 20px; text-align: center; margin-bottom: 25px;
}
.profile-name { display: block; font-size: 1.2rem; font-weight: 700; margin-bottom: 5px; color: var(--text-white); }
.profile-phone { font-size: 1.5rem; color: var(--accent-gold); font-weight: bold; letter-spacing: 1px; display: inline-block; }

.action-buttons { display: flex; flex-direction: column; gap: 12px; }
.social-btn {
    display: flex; align-items: center; justify-content: center; padding: 14px;
    border-radius: 12px; font-weight: 700; font-size: 0.95rem; transition: all 0.3s; border: 1px solid transparent;
}
.tg-btn { background: rgba(41, 169, 234, 0.1); color: #29a9ea; border-color: rgba(41, 169, 234, 0.2); }
.tg-btn:hover { background: #29a9ea; color: #fff; box-shadow: 0 5px 15px rgba(41, 169, 234, 0.3); }

.rb-btn { background: rgba(255, 115, 0, 0.1); color: #ff7300; border-color: rgba(255, 115, 0, 0.2); }
.rb-btn:hover { background: #ff7300; color: #fff; box-shadow: 0 5px 15px rgba(255, 115, 0, 0.3); }


/* =========================================================
   ریسپانسیو فوق‌العاده دقیق و تست شده برای موبایل (Mobile Core)
   ========================================================= */
@media (max-width: 992px) {
    .services-grid { grid-template-columns: repeat(2, 1fr); }
    .footer-grid { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
    /* منو در موبایل فشرده و تمیز می‌شود */
    .nav-links { display: none; }
    .navbar { padding: 15px 5%; }
    .logo h1 { font-size: 1rem; }
    .btn-outline { padding: 6px 14px; font-size: 0.8rem; }

    main { padding: 20px 4%; }

    /* کانتینر اصلی به صورت عمودی چیده می‌شود */
    .hero-container { flex-direction: column-reverse !important; border-radius: 20px; }
    .hero-content { padding: 30px 20px; border-left: none; border-top: 1px solid var(--border-color); text-align: center; }
    .hero-content h2 { font-size: 1.5rem; margin-bottom: 12px; }
    .hero-content p { font-size: 0.9rem; text-align: center; margin-bottom: 25px; }
    
    .materials { justify-content: center; }
    .tech-features { justify-content: center; gap: 15px; }

    /* ابعاد ثابت و طلایی برای نمایشگر سه بعدی روی گوشی برای جلوگیری از فروپاشی تگ */
    .hero-3d {
        width: 100%;
        height: 360px !important; /* قفل شدن ارتفاع مش روی گوشی */
    }
    .ar-button { display: block; } /* فعال شدن دکمه AR فقط روی گوشی */

    /* اسلایدر زیر مدل */
    .slider-arrow { display: none; } /* حذف فلش‌ها در موبایل (خود کاربر سوایپ میکند) */
    .thumb { width: 85px; height: 85px; border-radius: 12px; }

    /* شبکه‌ها و کارت‌ها */
    .services-grid { grid-template-columns: 1fr; gap: 15px; }
    .service-card { padding: 25px 20px; text-align: center; }
    .service-card p { text-align: center; }

    .about-card, .contact-card { padding: 30px 20px; border-radius: 20px; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
}
