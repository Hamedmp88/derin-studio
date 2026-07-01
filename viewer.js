document.addEventListener('DOMContentLoaded', () => {
    const viewer = document.getElementById('derin-viewer');
    const loadingOverlay = document.getElementById('loading-overlay');
    const carouselTrack = document.getElementById('carousel-track');

    // ۱. مدیریت انیمیشن لودینگ فایل‌های GLB شما
    viewer.addEventListener('progress', (event) => {
        if (event.detail.totalProgress === 1) {
            loadingOverlay.classList.add('hidden');
        }
    });

    viewer.addEventListener('load', () => {
        loadingOverlay.classList.add('hidden');
        
        // بازنشانی دکمه‌های متریال به حالت پیش‌فرض با لود شدن مدل جدید
        resetMaterialButtons();
    });

    // ۲. اسکرول نرم محصولات در کاتالوگ پایین
    document.getElementById('slide-right-btn').addEventListener('click', () => {
        carouselTrack.scrollBy({ left: 150, behavior: 'smooth' });
    });

    document.getElementById('slide-left-btn').addEventListener('click', () => {
        carouselTrack.scrollBy({ left: -150, behavior: 'smooth' });
    });

    // ۳. تغییر فایل‌های model1.glb تا model5.glb با کلیک روی تامب‌نیل‌ها
    const carouselItems = document.querySelectorAll('.carousel-item');
    carouselItems.forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector('.carousel-item.active').classList.remove('active');
            item.classList.add('active');

            // نمایش مجدد لودینگ حین تغییر فایل
            loadingOverlay.classList.remove('hidden');

            // دریافت مسیر فایل جدید از HTML و اعمال به نمایشگر
            const newModelSrc = item.getAttribute('data-model-src');
            viewer.setAttribute('src', newModelSrc);
        });
    });

    // ۴. منطق تغییر رنگ و متریال (هماهنگ با نام‌گذاری‌های متریال شما)
    const swatchItems = document.querySelectorAll('.swatch-item');
    swatchItems.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const parentGroup = swatch.parentElement;
            parentGroup.querySelector('.swatch-item.active').classList.remove('active');
            swatch.classList.add('active');

            const type = swatch.getAttribute('data-type');
            const targetKeyword = swatch.getAttribute('data-target');

            if (!viewer.model) return;

            // جستجو در متریال‌های فایل GLB فعلی
            if (type === 'color') {
                const hexColor = swatch.getAttribute('data-value');
                viewer.model.materials.forEach(material => {
                    // کلمات کلیدی fabric یا wood را در نام متریال فایل‌های شما می‌گردد
                    if (material.name.toLowerCase().includes(targetKeyword)) {
                        material.pbrMetallicRoughness.setBaseColorFactor(hexColor);
                    }
                });
            } 
            else if (type === 'pbr') {
                const roughness = parseFloat(swatch.getAttribute('data-rough'));
                const metalness = parseFloat(swatch.getAttribute('data-metal'));

                viewer.model.materials.forEach(material => {
                    // کلمه کلیدی metal را در نام متریال فایل‌های شما می‌گردد
                    if (material.name.toLowerCase().includes(targetKeyword)) {
                        material.pbrMetallicRoughness.setRoughnessFactor(roughness);
                        material.pbrMetallicRoughness.setMetalnessFactor(metalness);
                    }
                });
            }
        });
    });

    // ۵. امکانات دوربین و واقعیت افزوده
    document.getElementById('reset-camera').addEventListener('click', () => {
        viewer.cameraOrbit = 'unset';
        viewer.cameraTarget = 'unset';
    });

    document.querySelector('[data-ar-trigger]').addEventListener('click', () => {
        if (viewer.canActivateAR) {
            viewer.activateAR();
        } else {
            alert('قابلیت واقعیت افزوده (AR) روی مرورگر یا دستگاه شما پشتیبانی نمی‌شود.');
        }
    });

    // تابع کمکی برای بازنشانی استایل دکمه‌های متریال
    function resetMaterialButtons() {
        document.querySelectorAll('.swatch-row').forEach(row => {
            row.querySelectorAll('.swatch-item').forEach((swatch, index) => {
                if (index === 0) swatch.classList.add('active');
                else swatch.classList.remove('active');
            });
        });
    }
});