document.addEventListener('DOMContentLoaded', () => {
    // گرفتن المان‌های مورد نیاز
    const modelViewer = document.getElementById('main-viewer');
    const thumbnails = document.querySelectorAll('.thumb');
    const colorButtons = document.querySelectorAll('.color-btn');

    // ==========================================
    // بخش اول: مدیریت تغییر مدل با کلیک روی تصاویر
    // ==========================================
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // ۱. برداشتن کلاس فعال از همه عکس‌ها و دادن آن به عکس کلیک شده
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // ۲. گرفتن مسیر فایل سه بعدی و کاور از ویژگی‌های دیتا (data-src)
            const newSrc = this.getAttribute('data-src');
            const newPoster = this.getAttribute('data-poster');
            
            // ۳. اعمال مسیرهای جدید به تگ model-viewer
            if(newSrc) modelViewer.src = newSrc;
            if(newPoster) modelViewer.poster = newPoster;
        });
    });

    // ==========================================
    // بخش دوم: مدیریت دکمه‌های متریال (رنگ)
    // ==========================================
    colorButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // ۱. تغییر ظاهر دکمه‌ها (فعال شدن دکمه انتخاب شده)
            colorButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // ۲. خواندن کد رنگ از ویژگی data-color دکمه
            const colorHex = this.getAttribute('data-color');

            // ۳. تغییر رنگ مدل سه‌بعدی (در صورتی که مدل لود شده باشد)
            // model-viewer متریال‌ها را در یک آرایه نگهداری می‌کند. ما متریال اول [0] را تغییر می‌دهیم.
            if (modelViewer.model && modelViewer.model.materials.length > 0) {
                // متد setBaseColorFactor برای اعمال رنگ روی تکسچر PBR استفاده می‌شود
                modelViewer.model.materials[0].pbrMetallicRoughness.setBaseColorFactor(colorHex);
            }
        });
    });

    // ==========================================
    // بخش سوم: اسکرول افقی اسلایدر با دکمه در دسکتاپ
    // ==========================================
    const track = document.querySelector('.thumbnails-track');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');

    if(track && prevArrow && nextArrow) {
        prevArrow.addEventListener('click', () => {
            track.scrollBy({ left: -150, behavior: 'smooth' });
        });
        nextArrow.addEventListener('click', () => {
            track.scrollBy({ left: 150, behavior: 'smooth' });
        });
    }
});
