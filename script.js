/* ==========================================================================
   Derin Studio — 3D Portfolio Viewer
   Three.js powered model viewer: rotate / zoom / fullscreen / AR
   ========================================================================== */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/* --------------------------------------------------------------------------
   1) Project data — edit titles / filenames here
   -------------------------------------------------------------------------- */
const PROJECTS = [
  { title: 'صندلی طراحی',      model: 'assets/models/model1.glb', preview: 'assets/models/preview01.jpg' },
  { title: 'ساعت مچی لوکس',    model: 'assets/models/model2.glb', preview: 'assets/models/preview02.jpg' },
  { title: 'چراغ رومیزی',       model: 'assets/models/model3.glb', preview: 'assets/models/preview03.jpg' },
  { title: 'دوربین حرفه‌ای',    model: 'assets/models/model4.glb', preview: 'assets/models/preview04.jpg' },
  { title: 'مبل کلاسیک',        model: 'assets/models/model5.glb', preview: 'assets/models/preview05.jpg' },
];

/* --------------------------------------------------------------------------
   2) DOM references
   -------------------------------------------------------------------------- */
const stage        = document.getElementById('stage');
const canvas        = document.getElementById('viewer-canvas');
const poster        = document.getElementById('stage-poster');
const stageCta       = document.getElementById('stage-cta');
const stageTitle     = document.getElementById('stage-title');
const loadingBox     = document.getElementById('stage-loading');
const loadingText    = document.getElementById('stage-loading-text');
const errorBox       = document.getElementById('stage-error');
const retryBtn       = document.getElementById('stage-retry');
const filmstrip      = document.getElementById('filmstrip');

const btnAutorotate  = document.getElementById('btn-autorotate');
const btnZoomIn      = document.getElementById('btn-zoom-in');
const btnZoomOut     = document.getElementById('btn-zoom-out');
const btnAr          = document.getElementById('btn-ar');
const btnFullscreen  = document.getElementById('btn-fullscreen');

let activeIndex = -1;
let isLoading   = false;

/* --------------------------------------------------------------------------
   3) Build the filmstrip
   -------------------------------------------------------------------------- */
PROJECTS.forEach((project, i) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'film-item';
  btn.setAttribute('role', 'tab');
  btn.setAttribute('aria-selected', 'false');
  btn.innerHTML = `
    <img class="film-thumb" src="${project.preview}" alt="" loading="lazy">
    <span class="film-label">${project.title}</span>
  `;
  btn.addEventListener('click', () => selectProject(i));
  filmstrip.appendChild(btn);
});

function setActiveFilmItem(index){
  [...filmstrip.children].forEach((el, i) => {
    const active = i === index;
    el.classList.toggle('is-active', active);
    el.setAttribute('aria-selected', String(active));
  });
}

/* --------------------------------------------------------------------------
   4) Three.js scene setup (created once, reused for every model)
   -------------------------------------------------------------------------- */
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.xr.enabled = true;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(40, 1, 0.01, 100);
camera.position.set(0, 0.4, 3);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enablePan = false;
controls.minDistance = 0.2;
controls.maxDistance = 20;
controls.autoRotate = false;
controls.autoRotateSpeed = 2.2;

// Studio-style environment lighting (no external HDRI file needed)
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

// Soft key light for a subtle specular highlight on top of the environment
const keyLight = new THREE.DirectionalLight(0xffffff, 1.1);
keyLight.position.set(3, 4, 2);
scene.add(keyLight);
scene.add(new THREE.AmbientLight(0xffffff, 0.15));

let currentModel = null;
let modelRadius = 1;

function resizeRenderer(){
  const { clientWidth: w, clientHeight: h } = stage;
  if (!w || !h) return;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
new ResizeObserver(resizeRenderer).observe(stage);
resizeRenderer();

renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});

/* --------------------------------------------------------------------------
   5) Loading models
   -------------------------------------------------------------------------- */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

function frameModel(object){
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  object.position.sub(center);

  const radius = Math.max(size.length() / 2, 0.001);
  modelRadius = radius;

  const fitDist = (radius / Math.sin((camera.fov * Math.PI) / 360)) * 1.35;

  camera.position.set(fitDist * 0.35, fitDist * 0.25, fitDist);
  camera.near = radius / 100;
  camera.far = radius * 100;
  camera.updateProjectionMatrix();

  controls.target.set(0, 0, 0);
  controls.minDistance = radius * 0.6;
  controls.maxDistance = radius * 6;
  controls.update();
}

function clearCurrentModel(){
  if (currentModel){
    scene.remove(currentModel);
    currentModel.traverse((node) => {
      if (node.geometry) node.geometry.dispose();
      if (node.material){
        const mats = Array.isArray(node.material) ? node.material : [node.material];
        mats.forEach((m) => {
          Object.keys(m).forEach((key) => {
            if (m[key] && m[key].isTexture) m[key].dispose();
          });
          m.dispose();
        });
      }
    });
    currentModel = null;
  }
}

function showState({ poster: showPoster, cta, loading, error, canvasVisible }){
  poster.classList.toggle('is-hidden', !showPoster);
  stageCta.classList.toggle('is-hidden', !cta);
  loadingBox.hidden = !loading;
  errorBox.hidden = !error;
  canvas.classList.toggle('is-visible', !!canvasVisible);
}

function selectProject(index){
  // Skip reselecting a model that's already loaded and displaying without error
  if (index === activeIndex && currentModel && errorBox.hidden) return;
  activeIndex = index;
  const project = PROJECTS[index];

  setActiveFilmItem(index);
  stageTitle.textContent = project.title;
  poster.src = project.preview;

  showState({ poster: true, cta: false, loading: true, error: false, canvasVisible: false });
  controls.autoRotate = false;
  updateAutorotateIcon();

  loadModel(project.model);
}

function loadModel(url){
  isLoading = true;

  gltfLoader.load(
    url,
    (gltf) => {
      clearCurrentModel();
      currentModel = gltf.scene;
      scene.add(currentModel);
      frameModel(currentModel);

      isLoading = false;
      showState({ poster: false, cta: false, loading: false, error: false, canvasVisible: true });
      checkArAvailability();
    },
    (progress) => {
      if (progress.total){
        const pct = Math.round((progress.loaded / progress.total) * 100);
        loadingText.textContent = `در حال بارگذاری مدل… ${pct}%`;
      }
    },
    (err) => {
  console.error('Model failed to load:', url, err);

  alert(
    "Model failed:\n\n" +
    (err?.message || JSON.stringify(err, null, 2))
  );

  isLoading = false;
  showState({
    poster: true,
    cta: false,
    loading: false,
    error: true,
    canvasVisible: false
  });
}

retryBtn.addEventListener('click', () => {
  if (activeIndex >= 0) loadModel(PROJECTS[activeIndex].model);
});

stageCta.addEventListener('click', () => {
  if (activeIndex === -1) selectProject(0);
});

// Default: show the first project's preview, waiting for a click to load it
(function initDefault(){
  const project = PROJECTS[0];
  stageTitle.textContent = project.title;
  poster.src = project.preview;
  setActiveFilmItem(-1);
  showState({ poster: true, cta: true, loading: false, error: false, canvasVisible: false });
})();

/* --------------------------------------------------------------------------
   6) Controls — autorotate / zoom / fullscreen
   -------------------------------------------------------------------------- */
function updateAutorotateIcon(){
  const playIcon = btnAutorotate.querySelector('.icon-play');
  const pauseIcon = btnAutorotate.querySelector('.icon-pause');
  playIcon.hidden = controls.autoRotate;
  pauseIcon.hidden = !controls.autoRotate;
  btnAutorotate.setAttribute('aria-pressed', String(controls.autoRotate));
  btnAutorotate.title = controls.autoRotate ? 'توقف چرخش خودکار' : 'چرخش خودکار';
}

btnAutorotate.addEventListener('click', () => {
  controls.autoRotate = !controls.autoRotate;
  updateAutorotateIcon();
});

function dolly(factor){
  const dir = new THREE.Vector3().subVectors(camera.position, controls.target);
  const newLen = THREE.MathUtils.clamp(dir.length() * factor, controls.minDistance, controls.maxDistance);
  dir.setLength(newLen);
  camera.position.copy(controls.target).add(dir);
}
btnZoomIn.addEventListener('click', () => dolly(0.82));
btnZoomOut.addEventListener('click', () => dolly(1.22));

btnFullscreen.addEventListener('click', async () => {
  if (!document.fullscreenElement){
    await stage.requestFullscreen?.();
  } else {
    await document.exitFullscreen?.();
  }
});
document.addEventListener('fullscreenchange', () => {
  const isFs = !!document.fullscreenElement;
  btnFullscreen.querySelector('.icon-expand').hidden = isFs;
  btnFullscreen.querySelector('.icon-compress').hidden = !isFs;
  btnFullscreen.title = isFs ? 'خروج از تمام‌صفحه' : 'تمام‌صفحه';
  resizeRenderer();
});

/* --------------------------------------------------------------------------
   7) AR (WebXR) — shown only when the browser actually supports it
   -------------------------------------------------------------------------- */
let hitTestSource = null;
let hitTestSourceRequested = false;
let reticle = null;
let arSession = null;

function checkArAvailability(){
  if (navigator.xr && navigator.xr.isSessionSupported){
    navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
      btnAr.hidden = !supported;
    }).catch(() => { btnAr.hidden = true; });
  } else {
    btnAr.hidden = true;
  }
}

function createReticle(){
  const geometry = new THREE.RingGeometry(0.07, 0.09, 32).rotateX(-Math.PI / 2);
  const material = new THREE.MeshBasicMaterial({ color: 0x3B82F6 });
  reticle = new THREE.Mesh(geometry, material);
  reticle.matrixAutoUpdate = false;
  reticle.visible = false;
  scene.add(reticle);
}
createReticle();

btnAr.addEventListener('click', async () => {
  if (!currentModel) return;

  try{
    arSession = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: ['hit-test'],
      optionalFeatures: ['dom-overlay'],
      domOverlay: { root: document.body },
    });

    renderer.xr.setReferenceSpaceType('local');
    await renderer.xr.setSession(arSession);

    currentModel.visible = false;
    reticle.visible = false;
    hitTestSource = null;
    hitTestSourceRequested = false;

    const controller = renderer.xr.getController(0);
    controller.addEventListener('select', () => {
      if (reticle.visible && currentModel){
        currentModel.visible = true;
        currentModel.position.setFromMatrixPosition(reticle.matrix);
      }
    });
    scene.add(controller);

    renderer.setAnimationLoop((timestamp, frame) => {
      if (frame){
        const referenceSpace = renderer.xr.getReferenceSpace();
        const session = renderer.xr.getSession();

        if (!hitTestSourceRequested){
          session.requestReferenceSpace('viewer').then((viewerSpace) => {
            session.requestHitTestSource({ space: viewerSpace }).then((source) => {
              hitTestSource = source;
            });
          });
          session.addEventListener('end', onArSessionEnd);
          hitTestSourceRequested = true;
        }

        if (hitTestSource){
          const hitResults = frame.getHitTestResults(hitTestSource);
          if (hitResults.length){
            const hit = hitResults[0];
            reticle.visible = true;
            reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);
          } else {
            reticle.visible = false;
          }
        }
      }
      controls.update();
      renderer.render(scene, camera);
    });
  } catch (err){
    console.error('AR session failed to start:', err);
  }
});

function onArSessionEnd(){
  hitTestSource = null;
  hitTestSourceRequested = false;
  reticle.visible = false;
  if (currentModel) currentModel.visible = true;
  renderer.xr.setAnimationLoop(null);
  renderer.setAnimationLoop(() => {
    controls.update();
    renderer.render(scene, camera);
  });
  resizeRenderer();
}

/* --------------------------------------------------------------------------
   8) Header scroll state
   -------------------------------------------------------------------------- */
const header = document.getElementById('site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();
