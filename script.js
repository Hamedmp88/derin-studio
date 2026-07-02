/* script.js */

// صبر می‌کنیم تا کل ساختار HTML صفحه به طور کامل توسط مرورگر بارگذاری شود
document.addEventListener("DOMContentLoaded", () => {
    
    // انتخاب المان اصلی نمایشگر سه‌بعدی سایت
    const modelViewer = document.getElementById("main-viewer");
    
    // انتخاب تمامی تصاویر بندانگشتی (ثامبنیل‌ها) اسلایدر
    const thumbnails = document.querySelectorAll(".thumb");
    
    // انتخاب دکمه‌های دایره‌ای تغییر رنگ متریال محصول
    const colorBtns = document.querySelectorAll(".color-btn");

    /**
     * ۱. بخش مدیریت اسلایدر و تعویض مدل سه‌بعدی
     */
    thumbnails.forEach(thumb => {
        thumb.addEventListener("click", () => {
            // حذف کلاس active از تصویر انتخاب شده قبلی
            document.querySelector(".thumb.active").classList.remove("active");
            
            // اضافه کردن کلاس active به تصویری که هم اکنون روی آن کلیک شد
            thumb.classList.add("active");
            
            // گرفتن آدرس فایل سه بعدی اختصاصی این تصویر از اتریبیوت data-src
            const newModelSrc = thumb.getAttribute("data-src");
            
            // تغییر سورس نمایشگر سه‌بعدی اصلی به مدل جدید با افکت لودینگ نرم
            modelViewer.src = newModelSrc;
            
            // ریست کردن استایل دکمه‌های تغییر رنگ به دکمه اول (رنگ پیش‌فرض مدل جدید)
            document.querySelector(".color-btn.active").classList.remove("active");
            colorBtns[0].classList.add("active");
        });
    });

    /**
     * ۲. بخش هوشمند تعویض رنگ متریال مدل سه‌بعدی (PBR Base Color)
     */
    colorBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // جا‌به‌جایی کلاس وضعیت اکتیو روی دکمه‌های رنگ
            document.querySelector(".color-btn.active").classList.remove("active");
            btn.classList.add("active");

            // دریافت کدهای رنگی RGBA تعریف شده از دکمه کلیک شده
            const colorString = btn.getAttribute("data-color");
            
            // بررسی اینکه آیا مدل سه‌بعدی در نمایشگر لود شده و متریال معتبری دارد یا خیر
            if (modelViewer.model && modelViewer.model.materials) {
                
                // دسترسی به اولین آبجکت متریال پایه قطعه (Material 0)
                const mainMaterial = modelViewer.model.materials[0]; 
                
                if (mainMaterial) {
                    // تبدیل فرمت متنی استرینگ دیتای رنگ به آرایه‌ای از اعداد واقعی برای موتور رندر وب
                    const rgbaColorArray = colorString.split(',').map(Number);
                    
                    // اعمال زنده رنگ جدید بر روی ساختار کانال بیس کالر PBR مدل خروجی
                    mainMaterial.pbrMetallicRoughness.setBaseColorFactor(rgbaColorArray);
                }
            }
        });
    });
});