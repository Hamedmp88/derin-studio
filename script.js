// script.js

document.addEventListener('DOMContentLoaded', () => {
    const thumbnails = document.querySelectorAll('.thumb');
    const modelViewer = document.getElementById('main-viewer');

    // عملکرد کلیک روی تصاویر بندانگشتی و تغییر مدل اصلی
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // ۱. جابجایی کلاس اکتیو
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // ۲. خواندن استخراج مسیرها
            const newSrc = this.getAttribute('data-src');
            const newPoster = this.getAttribute('data-poster');
            
            // ۳. ست کردن مدل و پوستر جدید
            if(newSrc) modelViewer.src = newSrc;
            if(newPoster) modelViewer.poster = newPoster;
        });
    });

    // فعال‌سازی اسکرول افقی با فلش‌ها در دسکتاپ (اختیاری و برای زیبایی حرکتی)
    const track = document.querySelector('.thumbnails-track');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');

    if(track && prevArrow && nextArrow) {
        prevArrow.addEventListener('click', () => {
            track.scrollBy({ left: -120, behavior: 'smooth' });
        });
        nextArrow.addEventListener('click', () => {
            track.scrollBy({ left: 120, behavior: 'smooth' });
        });
    }
});
