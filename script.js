/* style.css */

:root {
    --bg-color: #07080a;
    --card-bg: rgba(255, 255, 255, 0.03);
    --border-color: rgba(255, 255, 255, 0.08);
    --accent-color: #c99b66; 
    --text-main: #ffffff;
    --text-muted: #8e929a;
}

* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Vazirmatn', sans-serif; }

body {
    background-color: var(--bg-color); color: var(--text-main); line-height: 1.6;
    background-image: radial-gradient(circle at 50% 0%, rgba(40, 42, 54, 0.4) 0%, transparent 65%);
    overflow-x: hidden;
}

a { text-decoration: none; color: var(--text-main); }

/* --- Navbar --- */
.navbar {
    display: flex; justify-content: space-between; align-items: center;
    padding: 20px 5%; border-bottom: 1px solid var(--border-color);
}
.logo h1 { font-size: 1.1rem; letter-spacing: 2px; font-family: sans-serif; }
.logo span { display: block; font-size: 0.55rem; color: var(--text-muted); letter-spacing: 1px; font-family: sans-serif; }
.nav-links { display: flex; list-style: none; gap: 30px; }
.nav-links a { font-size: 0.9rem; color: var(--text-muted); transition: 0.3s; }
.nav-links a:hover, .nav-links a.active { color: var(--accent-color); }
.btn-outline {
    background: transparent; border: 1px solid var(--border-color); color: var(--text-main);
    padding: 8px 20px; border-radius: 8px; font-size: 0.85rem; transition: 0.3s; text-align: center;
}
.btn-outline:hover { border-color: var(--accent-color); color: var(--accent-color); }

main { max-width: 1400px; margin: 0 auto; padding: 30px 5%; }

/* --- Hero Section --- */
.hero-container {
    display: flex; flex-direction: row-reverse; /* مدل سمت راست، متن چپ */
    background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.3) 100%);
    border: 1px solid var(--border-color); border-radius: 20px; overflow: hidden; min-height: 480px;
}
.hero-3d { flex: 1.2; position: relative; }
.hero-content { flex: 1; padding: 40px; display: flex; flex-direction: column; justify-content: center; }
.hero-content h2 { font-size: 1.8rem; margin-bottom: 15px; line-height: 1.4; }
.hero-content p { color: var(--text-muted); margin-bottom: 30px; font-size: 0.95rem; }

.materials { display: flex; gap: 12px; }
.color-btn { width: 35px; height: 35px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; transition: 0.3s; }
.color-btn.active, .color-btn:hover { border-color: var(--accent-color); transform: scale(1.1); }

/* Model Viewer & AR Button */
model-viewer { width: 100%; height: 100%; --poster-color: transparent; }
.ar-button {
    background-color: var(--accent-color); color: #000; border: none; border-radius: 8px;
    padding: 10px 20px; font-size: 0.9rem; font-weight: bold; font-family: 'Vazirmatn';
    position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
    cursor: pointer; display: none; /* در دسکتاپ مخفی، در موبایل نمایش داده می‌شود */
    box-shadow: 0 4px 15px rgba(201, 155, 102, 0.4);
}

/* --- Thumbnails --- */
.thumbnails-slider { margin: 30px 0 50px 0; overflow-x: auto; padding-bottom: 10px; }
.thumbnails-track { display: flex; gap: 15px; justify-content: center; min-width: max-content; margin: 0 auto; }
.thumb {
    width: 90px; height: 90px; border-radius: 12px; border: 2px solid var(--border-color);
    background: var(--card-bg); display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: 0.3s; overflow: hidden; flex-shrink: 0; color: var(--text-muted);
}
.thumb img { width: 100%; height: 100%; object-fit: cover; }
.thumb.active { border-color: var(--accent-color); transform: translateY(-3px); }

/* --- About & Image Placeholders --- */
.about-visual-section {
    display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 50px; align-items: center;
}
.about-text-box { padding: 20px; }
.section-title { font-size: 1.3rem; margin-bottom: 20px; color: var(--accent-color); }
.about-text-box p { color: var(--text-muted); line-height: 1.8; }
.about-image-box { border-radius: 16px; overflow: hidden; height: 300px; background: var(--card-bg); border: 1px solid var(--border-color); }
.aesthetics-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; }

/* --- Contact Section --- */
.bottom-section { max-width: 600px; margin: 0 auto; }
.contact-card { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 20px; padding: 40px; text-align: center; }
.contact-card p { color: var(--text-muted); margin-bottom: 30px; }
.contact-details { display: flex; flex-direction: column; gap: 25px; align-items: center; }
.contact-person { display: flex; flex-direction: column; gap: 5px; }
.contact-person strong { font-size: 1.2rem; }
.phone-number { font-size: 1.5rem; color: var(--accent-color); font-weight: bold; letter-spacing: 2px; }
.social-buttons { display: flex; gap: 15px; width: 100%; }
.btn-social {
    flex: 1; padding: 12px; border-radius: 10px; font-weight: 500; text-align: center; transition: 0.3s;
}
.telegram { background: rgba(41, 169, 234, 0.1); color: #29a9ea; border: 1px solid #29a9ea; }
.telegram:hover { background: #29a9ea; color: #fff; }
.rubika { background: rgba(255, 115, 0, 0.1); color: #ff7300; border: 1px solid #ff7300; }
.rubika:hover { background: #ff7300; color: #fff; }

/* --- Mobile Responsiveness --- */
@media (max-width: 768px) {
    .navbar { flex-wrap: wrap; }
    .nav-links { order: 3; width: 100%; justify-content: center; margin-top: 15px; }
    
    .hero-container { flex-direction: column; }
    .hero-3d { min-height: 400px; }
    .ar-button { display: block; } /* نمایش دکمه AR فقط در موبایل */
    
    .thumbnails-track { justify-content: flex-start; padding-right: 5%; }
    
    .about-visual-section { grid-template-columns: 1fr; }
    .about-image-box { height: 250px; }
    
    .social-buttons { flex-direction: column; }
}
