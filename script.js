// اطلاعات لوکال مدل‌ها و متریال‌ها
const modelsData = {
    1: {
        title: 'Model 1 - مبل راحتی',
        src: 'assets/models/model1.glb',
        hasMaterials: true,
        materials: {
            'Fabric': [
                { id: 'fab1', color: '#050505', texture: 'assets/textures/m1_fabric1.jpg' },
                { id: 'fab2', color: '#3e1d00', texture: 'assets/textures/m1_fabric2.jpg' },
                { id: 'fab3', color: '#a65814', texture: 'assets/textures/m1_fabric3.jpg' }
            ],
            'Wood': [
                { id: 'wood1', color: '#050505', texture: 'assets/textures/m1_wood1.jpg' },
                { id: 'wood2', color: '#3e1d00', texture: 'assets/textures/m1_wood2.jpg' },
                { id: 'wood3', color: '#a65814', texture: 'assets/textures/m1_wood3.jpg' }
            ]
        }
    },
    2: {
        title: 'Model 2 - صندلی ناهارخوری',
        src: 'assets/models/model2.glb',
        hasMaterials: true,
        materials: {
            'fabric': [
                { id: 'm2fab1', color: '#41533b', texture: 'assets/textures/m2_fabric1.jpg' },
                { id: 'm2fab2', color: '#4e4e4e', texture: 'assets/textures/m2_fabric2.jpg' },
                { id: 'm2fab3', color: '#364060', texture: 'assets/textures/m2_fabric3.jpg' }
            ],
            'body': [
                { id: 'body1', color: '#b9a083', texture: 'assets/textures/m2_body1.jpg' },
                { id: 'body2', color: '#8a765e', texture: 'assets/textures/m2_body2.jpg' },
                { id: 'body3', color: '#1d1d1d', texture: 'assets/textures/m2_body3.jpg' }
            ],
            'leg': [
                { id: 'base1', color: '#b9a083', texture: 'assets/textures/m2_body1.jpg' },
                { id: 'base2', color: '#8a765e', texture: 'assets/textures/m2_body2.jpg' },
                { id: 'base3', color: '#1d1d1d', texture: 'assets/textures/m2_body3.jpg' }
            ]
        }
    },
    3: { title: 'Model 3 - تخت استخری', src: 'assets/models/model3.glb', hasMaterials: false },
    4: { title: 'Model 4 - میز ناهارخوری', src: 'assets/models/model4.glb', hasMaterials: false },
    5: { title: 'Model 5 - ست مبلمان فضای باز', src: 'assets/models/model5.glb', hasMaterials: false }
};

// انتخابگرها
const modal = document.getElementById('model-modal');
const closeModalBtn = document.getElementById('close-modal');
const viewerWrapper = document.getElementById('viewer-wrapper');
const materialPanel = document.getElementById('material-panel');
const materialControls = document.getElementById('material-controls');
const modalTitle = document.getElementById('modal-title');
const cards = document.querySelectorAll('.model-card:not(.placeholder-card)');

let currentViewer = null;

// ==========================================
// 1. منطق اسکرول (جلوه‌ها و انیمیشن‌ها)
// ==========================================
window.addEventListener('scroll', () => {
    // الف) جابجایی نرم گرادیانت پس زمینه
    const scrollY = window.scrollY;
    document.getElementById('bg-gradient').style.transform = `translate(${scrollY * -0.05}px, ${scrollY * 0.15}px)`;
});

// ب) Scroll Reveal Animations ( Intersection Observer )
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15, // وقتی ۱۵ درصد المان وارد شد، اجرا می‌شود
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); 
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// استثنا برای هیرو: برای اینکه به محض باز شدن سایت بدون نیاز به اسکرول ظاهر شود
window.addEventListener('load', () => {
    const hero = document.querySelector('.hero.reveal');
    if (hero) hero.classList.add('active');
});


// ==========================================
// 2. منطق مودال و Model Viewer
// ==========================================
cards.forEach(card => {
    card.addEventListener('click', () => openModal(card.getAttribute('data-id')));
});

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) closeModal();
});

function openModal(id) {
    const data = modelsData[id];
    if (!data) return;

    modalTitle.textContent = data.title;
    
    // تزریق Overlay لودینگ همراه با خود مدل و HDR
    viewerWrapper.innerHTML = `
        <div class="loading-overlay" id="loading-overlay">
            <span class="loading-text">در حال بارگذاری مدل...</span>
            <div class="loading-bar-container">
                <div class="loading-bar-fill" id="loading-bar-fill"></div>
            </div>
        </div>
        <model-viewer 
            id="active-viewer"
            src="${data.src}" 
            camera-controls 
            auto-rotate 
            rotation-per-second="30deg"
            environment-image="assets/models/studio_lighting.hdr" 
            shadow-intensity="1"
            exposure="1"
            ar>
        </model-viewer>
    `;
    
    currentViewer = document.getElementById('active-viewer');
    const loadingOverlay = document.getElementById('loading-overlay');
    const loadingBarFill = document.getElementById('loading-bar-fill');

    // اتصال درصد دانلود به لودینگ بار
    currentViewer.addEventListener('progress', (event) => {
        const progress = event.detail.totalProgress * 100;
        loadingBarFill.style.width = `${progress}%`;
        
        if (progress === 100) {
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
            }, 400); 
        }
    });

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
    setTimeout(() => {
        viewerWrapper.innerHTML = ''; 
        currentViewer = null;
    }, 300);
}

// ==========================================
// 3. منطق تغییر متریال
// ==========================================
function buildMaterialUI(materials) {
    materialControls.innerHTML = '';
    for (const [matName, options] of Object.entries(materials)) {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'mat-group';
        groupDiv.innerHTML = `<h5>جنس ${matName}</h5>`;
        
        const swatchContainer = document.createElement('div');
        swatchContainer.className = 'swatch-container';
        
        options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = `swatch ${index === 0 ? 'active' : ''}`;
            btn.style.backgroundColor = opt.color; 
            
            btn.addEventListener('click', async () => {
                swatchContainer.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
                btn.classList.add('active');
                await applyTexture(matName, opt.texture);
            });
            swatchContainer.appendChild(btn);
        });
        groupDiv.appendChild(swatchContainer);
        materialControls.appendChild(groupDiv);
    }
}

async function applyTexture(materialName, texturePath) {
    if (!currentViewer || !currentViewer.model) return;
    try {
        const material = currentViewer.model.materials.find(m => m.name === materialName);
        if (material) {
            const texture = await currentViewer.createTexture(texturePath);
            material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
        }
    } catch (error) {
        console.error('Error applying texture:', error);
    }
}
