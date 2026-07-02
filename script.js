:root {
    --bg-color: #07080a;
    --card-bg: rgba(255, 255, 255, 0.03);
    --border-color: rgba(255, 255, 255, 0.08);
    --accent-color: #c99b66; 
    --text-main: #ffffff;
    --text-muted: #8e929a;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Vazirmatn', sans-serif;
}

body {
    background-color: var(--bg-color);
    color: var(--text-main);
    line-height: 1.6;
    overflow-x: hidden; /* جلوگیری از اسکرول ناخواسته افقی در موبایل */
}

a { text-decoration: none; color: inherit; }

/* --- Navbar --- */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 5%;
    border-bottom: 1px solid var(--border-color);
    background: #07080a;
}
.logo h1 { font-size: 1.1rem; letter-spacing: 2px; font-family: sans-serif; color: #fff; }
.logo span { display: block; font-size: 0.55rem; color: var(--text-muted); letter-spacing: 1px; font-family: sans-serif; }

.nav-links { display: flex; list-style: none; gap: 25px; }
.nav-links a { font-size: 0.9rem; color: var(--text-muted); transition: 0.3s; }
.nav-links a:hover, .nav-links a.active { color: var(--accent-color); }

.btn-outline {
    background: transparent; border: 1px solid var(--border-color); color: var(--text-main);
    padding: 8px 18px; border-radius: 8px; font-size: 0.85rem; transition: 0.3s; white-space: nowrap;
}
.btn-outline:hover { border-color: var(--accent-color); color: var(--accent-color); }

/* --- Main Layout --- */
main { max-width: 1200px; margin: 0 auto; padding: 25px 4%; }

/* --- Hero Section --- */
.hero-container {
    display: flex;
    flex-direction: row-reverse;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 25px;
}

.hero-3d {
    flex: 1.3;
    height: 480px; /* ارتفاع ثابت برای دسکتاپ */
    position: relative;
    background: radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%);
}

model-viewer {
    width: 100%;
    height: 100%;
    --poster-color: transparent;
}

.ar-button {
    background-color: var(--accent-color); color: #000; border: none; border-radius: 8px;
    padding: 12px 24px; font-size: 0.9rem; font-weight: bold;
    position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
    cursor: pointer; display: none; box-shadow: 0 4px 15px rgba(201, 155, 102, 0.4);
    white-space: nowrap;
}

.hero-content {
    flex: 1;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.hero-content h2 { font-size: 1.6rem; margin-bottom: 15px; line-height: 1.4; }
.hero-content p { color: var(--text-muted); margin-bottom: 25px; font-size: 0.9rem; }

.materials { display: flex; gap: 12px; }
.color-btn {
    width: 34px; height: 34px; border-radius: 50%; border: 2px solid transparent;
    cursor: pointer; transition: 0.3s;
}
.color-btn.active { border-color: var(--accent-color); transform: scale(1.1); }

/* --- Thumbnails Slider --- */
.thumbnails-slider { margin-bottom: 40px; }
.thumbnails-track {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding-bottom: 10px;
    scrollbar-width: thin;
    scrollbar-color: var(--accent-color) transparent;
}
.thumb {
    width: 85px; height: 85px; border-radius: 12px; border: 2px solid var(--border-color);
    background: var(--card-bg); display: flex; align-items: center; justify-content: center;
    cursor: pointer; flex-shrink: 0; overflow: hidden; color: var(--text-muted); font-size: 0.8rem;
}
.thumb img { width: 100%; height: 100%; object-fit: cover; }
.thumb.active { border-color: var(--accent-color); }

/* --- About & Contact --- */
.about-visual-section {
    display: grid; grid-template-columns: 1fr 1fr; gap: 25px;
    background: var(--card-bg); border: 1px solid var(--border-color);
    border-radius: 20px; padding: 35px; margin-bottom: 30px; align-items: center;
}
.section-title { font-size: 1.2rem; margin-bottom: 15px; color: var(--accent-color); }
.about-text-box p { color: var(--text-muted); font-size: 0.9rem; line-height: 1.8; }
.about-image-box { height: 240px; border-radius: 12px; overflow: hidden; background: rgba(0,0,0,0.3); }
.aesthetics-img { width: 100%; height: 100%; object-fit: cover; }

.bottom-section { max-width: 700px; margin: 0 auto 50px auto; }
.contact-card {
    background: var(--card-bg); border: 1px solid var(--border-color);
    border-radius: 20px; padding: 35px; text-align: center;
}
.contact-card p { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 25px; }
.contact-person { margin-bottom: 25px; }
.contact-person strong { display: block; font-size: 1.1rem; margin-bottom: 5px; }
.phone-number { font-size: 1.4rem; color: var(--accent-color); font-weight: bold; letter-spacing: 1px; }

.social-buttons { display: flex; gap: 15px; justify-content: center; }
.btn-social {
    flex: 1; padding: 12px; border-radius: 10px; font-size: 0.9rem; font-weight: 500; transition: 0.3s;
}
.telegram { background: rgba(41, 169, 234, 0.1); color: #29a9ea; border: 1px solid #29a9ea; }
.telegram:hover { background: #29a9ea; color: #fff; }
.rubika { background: rgba(255, 115, 0, 0.1); color: #ff7300; border: 1px solid #ff7300; }
.rubika:hover { background: #ff7300; color: #fff; }

/* =========================================================
   مهم‌ترین بخش: تنظیمات اختصاصی موبایل (Mobile Responsive)
   ========================================================= */
@media (max-width: 768px) {
    /* ۱. ساده‌سازی منو در موبایل: لینک‌های وسط مخفی میشن تا لوگو و دکمه تمیز کنار هم باشن */
    .nav-links { display: none; }
    .navbar { padding: 15px 4%; }
    .logo h1 { font-size: 0.95rem; }
    .btn-outline { padding: 6px 14px; font-size: 0.8rem; }

    /* ۲. چیدمان ستونی برای هیرو با ارتفاع ثابت و دقیق برای مرورگر موبایل */
    .hero-container {
        flex-direction: column !important;
    }
    .hero-3d {
        width: 100%;
        height: 380px !important; /* ارتفاع دقیق و اجباری برای جلوگیری از باگ مرورگر گوشی */
    }
    .ar-button { display: block; } /* نمایش دکمه AR فقط روی گوشی */

    .hero-content { padding: 25px 20px; text-align: center; align-items: center; }
    .hero-content h2 { font-size: 1.35rem; }

    /* ۳. تنظیم بخش درباره ما و شبکه‌های اجتماعی برای موبایل */
    .about-visual-section { grid-template-columns: 1fr; padding: 25px 20px; text-align: center; }
    .about-image-box { height: 180px; }
    
    .contact-card { padding: 25px 20px; }
    .social-buttons { flex-direction: column; }
}
