// اطلاعات دیتابیس لوکال برای مدل‌ها و متریال‌ها
const modelsData = {
    1: {
        title: 'Model 1 - مبل راحتی',
        src: 'assets/models/model1.glb',
        hasMaterials: true,
        // شرط مهم: نام کلیدها (Fabric, Wood) باید دقیقاً با نام متریال داخل فایل GLB یکسان باشد
        materials: {
            'Fabric': [
                { id: 'fab1', color: '#D1C4E9', texture: 'assets/textures/m1_fabric1.jpg' },
                { id: 'fab2', color: '#C8E6C9', texture: 'assets/textures/m1_fabric2.jpg' },
                { id: 'fab3', color: '#FFCDD2', texture: 'assets/textures/m1_fabric3.jpg' }
            ],
            'Wood': [
                { id: 'wood1', color: '#8D6E63', texture: 'assets/textures/m1_wood1.jpg' },
                { id: 'wood2', color: '#5D4037', texture: 'assets/textures/m1_wood2.jpg' },
                { id: 'wood3', color: '#3E2723', texture: 'assets/textures/m1_wood3.jpg' }
            ]
        }
    },
    2: {
        title: 'Model 2 - صندلی ناهارخوری',
        src: 'assets/models/model2.glb',
        hasMaterials: true,
        materials: {
            'Fabric': [
                { id: 'm2fab1', color: '#37474F', texture: 'assets/textures/m2_fabric1.jpg' },
                { id: 'm2fab2', color: '#4E342E', texture: 'assets/textures/m2_fabric2.jpg' },
                { id: 'm2fab3', color: '#263238', texture: 'assets/textures/m2_fabric3.jpg' }
            ],
            'Body': [
                { id: 'body1', color: '#BCAAA4', texture: 'assets/textures/m2_body1.jpg' },
                { id: 'body2', color: '#A1887F', texture: 'assets/textures/m2_body2.jpg' },
                { id: 'body3', color: '#8D6E63', texture: 'assets/textures/m2_body3.jpg' }
            ],
            'Base': [
                { id: 'base1', color: '#212121', texture: 'assets/textures/m2_base1.jpg' },
                { id: 'base2', color: '#424242', texture: 'assets/textures/m2_base2.jpg' },
                { id: 'base3', color: '#616161', texture: 'assets/textures/m2_base3.jpg' }
            ]
        }
    },
    3: { title: 'Model 3 - تخت استخری', src: 'assets/models/model3.glb', hasMaterials: false },
    4: { title: 'Model 4 - میز ناهارخوری', src: 'assets/models/model4.glb', hasMaterials: false },
    5: { title: 'Model 5 - ست مبلمان فضای باز', src: 'assets/models/model5.glb', hasMaterials: false }
};

// انتخابگرهای DOM
const modal = document.getElementById('model-modal');
const closeModalBtn = document.getElementById('close-modal');
const viewerWrapper = document.getElementById('viewer-wrapper');
const materialPanel = document.getElementById('material-panel');
const materialControls = document.getElementById('material-controls');
const modalTitle = document.getElementById('modal-title');
const cards = document.querySelectorAll('.model-card');

let currentViewer = null;

// باز کردن مودال هنگام کلیک روی کارت
cards.forEach(card => {
    card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        openModal(id);
    });
});

// بستن مودال
closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        closeModal();
    }
});

function openModal(id) {
    const data = modelsData[id];
    if (!data) return;

    modalTitle.textContent = data.title;
    
    // تزریق داینامیک model-viewer برای جلوگیری از درگیری پرفورمنس
    viewerWrapper.innerHTML = `
        <model-viewer 
            id="active-viewer"
            src="${data.src}" 
            camera-controls 
            auto-rotate 
            rotation-per-second="30deg"
            environment-image="neutral" 
            shadow-intensity="1"
            exposure="1"
            ar>
        </model-viewer>
    `;
    
    currentViewer = document.getElementById('active-viewer');

    // مدیریت پنل متریال
    if (data.hasMaterials) {
        buildMaterialUI(data.materials);
        materialPanel.classList.remove('hidden');
    } else {
        materialControls.innerHTML = '';
        materialPanel.classList.add('hidden');
    }

    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
    viewerWrapper.innerHTML = ''; // پاکسازی viewer برای آزادسازی رم
    currentViewer = null;
}

// ساخت رابط کاربری تغییر متریال
function buildMaterialUI(materials) {
    materialControls.innerHTML = '';
    
    for (const [matName, options] of Object.entries(materials)) {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'mat-group';
        
        const title = document.createElement('h5');
        title.textContent = `جنس ${matName}`;
        groupDiv.appendChild(title);
        
        const swatchContainer = document.createElement('div');
        swatchContainer.className = 'swatch-container';
        
        options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = `swatch ${index === 0 ? 'active' : ''}`;
            btn.style.backgroundColor = opt.color; // نمایش رنگ حدودی تا زمانی که تکسچر لود شود
            
            btn.addEventListener('click', async (e) => {
                // آپدیت UI
                const siblings = swatchContainer.querySelectorAll('.swatch');
                siblings.forEach(s => s.classList.remove('active'));
                btn.classList.add('active');
                
                // اعمال تکسچر روی مدل
                await applyTexture(matName, opt.texture);
            });
            
            swatchContainer.appendChild(btn);
        });
        
        groupDiv.appendChild(swatchContainer);
        materialControls.appendChild(groupDiv);
    }
}

// تابع اصلی برای تغییر تکسچر از طریق Scene Graph
async function applyTexture(materialName, texturePath) {
    if (!currentViewer || !currentViewer.model) {
        console.warn('مدل هنوز به طور کامل بارگذاری نشده است.');
        return;
    }

    try {
        // پیدا کردن متریال بر اساس نام دقیق آن در فایل GLB
        const material = currentViewer.model.materials.find(m => m.name === materialName);
        
        if (material) {
            // ایجاد تکسچر جدید توسط متد داخلی model-viewer
            const texture = await currentViewer.createTexture(texturePath);
            
            // جایگزینی تکسچر Base Color
            material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
        } else {
            console.error(`متریالی با نام "${materialName}" در این فایل GLB یافت نشد! نام‌ها باید کاملا یکسان باشند.`);
        }
    } catch (error) {
        console.error('خطا در اعمال تکسچر:', error);
    }
}
