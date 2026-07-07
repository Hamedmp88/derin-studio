/* ==========================================================================
   Derin Studio — script.js
   Vanilla JS. No dependencies besides the official Google <model-viewer>
   web component loaded in index.html.
   ========================================================================== */

(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------------
     1) MODEL CONFIG
     Update the paths below when real assets are added. Nothing else needs
     to change: the material names below must match the material names that
     already exist inside each .glb file.
     ------------------------------------------------------------------------ */
  const MODELS = {
    1: {
      title: "Model 1",
      glb: "assets/models/model1.glb",
      preview: "assets/models/preview1.jpg",
      materialGroups: [
        {
          key: "fabric",
          label: "پارچه",
          materialName: "Fabric", // must match the material name inside model1.glb
          swatches: [
            { id: "Fabric01", color: "#C9BEA9", texture: "assets/textures/model1/fabric/Fabric01.jpg" },
            { id: "Fabric02", color: "#54603F", texture: "assets/textures/model1/fabric/Fabric02.jpg" },
            { id: "Fabric03", color: "#8A8F98", texture: "assets/textures/model1/fabric/Fabric03.jpg" }
          ]
        },
        {
          key: "wood",
          label: "چوب",
          materialName: "Wood", // must match the material name inside model1.glb
          swatches: [
            { id: "Wood01", color: "#B98554", texture: "assets/textures/model1/wood/Wood01.jpg" },
            { id: "Wood02", color: "#8B5A34", texture: "assets/textures/model1/wood/Wood02.jpg" },
            { id: "Wood03", color: "#4A3120", texture: "assets/textures/model1/wood/Wood03.jpg" }
          ]
        }
      ]
    },
    2: {
      title: "Model 2",
      glb: "assets/models/model2.glb",
      preview: "assets/models/preview2.jpg",
      materialGroups: [
        {
          key: "fabric",
          label: "پارچه",
          materialName: "Fabric", // must match the material name inside model2.glb
          swatches: [
            { id: "Fabric01", color: "#C9BEA9", texture: "assets/textures/model2/fabric/Fabric01.jpg" },
            { id: "Fabric02", color: "#54603F", texture: "assets/textures/model2/fabric/Fabric02.jpg" },
            { id: "Fabric03", color: "#8A8F98", texture: "assets/textures/model2/fabric/Fabric03.jpg" }
          ]
        },
        {
          key: "body",
          label: "بدنه",
          materialName: "Body", // must match the material name inside model2.glb
          swatches: [
            { id: "Body01", color: "#D8D2C4", texture: "assets/textures/model2/body/Body01.jpg" },
            { id: "Body02", color: "#6B7280", texture: "assets/textures/model2/body/Body02.jpg" },
            { id: "Body03", color: "#23262C", texture: "assets/textures/model2/body/Body03.jpg" }
          ]
        },
        {
          key: "base",
          label: "پایه",
          materialName: "Base", // must match the material name inside model2.glb
          swatches: [
            { id: "Base01", color: "#B98554", texture: "assets/textures/model2/base/Base01.jpg" },
            { id: "Base02", color: "#3F4650", texture: "assets/textures/model2/base/Base02.jpg" },
            { id: "Base03", color: "#1B1D22", texture: "assets/textures/model2/base/Base03.jpg" }
          ]
        }
      ]
    },
    3: { title: "Model 3", glb: "assets/models/model3.glb", preview: "assets/models/preview3.jpg", materialGroups: [] },
    4: { title: "Model 4", glb: "assets/models/model4.glb", preview: "assets/models/preview4.jpg", materialGroups: [] },
    5: { title: "Model 5", glb: "assets/models/model5.glb", preview: "assets/models/preview5.jpg", materialGroups: [] }
  };

  /* ------------------------------------------------------------------------
     2) HEADER / NAV
     ------------------------------------------------------------------------ */
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");

  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ------------------------------------------------------------------------
     3) SCROLL REVEAL (subtle, respects reduced-motion)
     ------------------------------------------------------------------------ */
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));
  } else {
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
  }

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------------
     4) VIEWER PANEL
     ------------------------------------------------------------------------ */
  const viewerPanel = document.getElementById("viewerPanel");
  const viewerTitle = document.getElementById("viewerTitle");
  const viewerBack = document.getElementById("viewerBack");
  const materialPanel = document.getElementById("materialPanel");
  const portfolioGrid = document.getElementById("portfolioGrid");

  const mv = document.getElementById("mainViewer");
  const progressBarFill = document.getElementById("progressBarFill");
  const arBtn = document.getElementById("arBtn");

  const btnReset = document.getElementById("btnReset");
  const btnAutoRotate = document.getElementById("btnAutoRotate");
  const btnZoomIn = document.getElementById("btnZoomIn");
  const btnZoomOut = document.getElementById("btnZoomOut");
  const btnFullscreen = document.getElementById("btnFullscreen");

  let currentModelId = null;
  let defaultOrbit = null; // remembered per load, used by "reset"

  function openViewer(modelId) {
    const model = MODELS[modelId];
    if (!model) return;

    currentModelId = modelId;
    viewerTitle.textContent = model.title;

    // Show a preview instantly; the actual model loads only now, on demand.
    mv.removeAttribute("data-loaded");
    mv.poster = model.preview;
    mv.setAttribute("reveal", "auto");
    if (!prefersReducedMotion) {
      mv.setAttribute("auto-rotate", "");
      mv.setAttribute("rotation-per-second", "8deg");
    }
    btnAutoRotate.classList.toggle("is-active", !prefersReducedMotion);
    btnAutoRotate.setAttribute("aria-pressed", String(!prefersReducedMotion));
    progressBarFill.style.width = "0%";
    mv.src = model.glb;

    buildMaterialPanel(model);

    document.querySelectorAll(".portfolio-card").forEach((card) => {
      card.classList.toggle("is-active", card.dataset.modelId === String(modelId));
    });

    viewerPanel.hidden = false;
    viewerPanel.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  }

  function closeViewer() {
    viewerPanel.hidden = true;
    mv.removeAttribute("auto-rotate");
    mv.src = ""; // free memory / stop rendering the hidden canvas
    currentModelId = null;
    document.querySelectorAll(".portfolio-card").forEach((card) => card.classList.remove("is-active"));
    portfolioGrid.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  }

  portfolioGrid.querySelectorAll(".portfolio-card-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".portfolio-card");
      openViewer(card.dataset.modelId);
    });
  });

  viewerBack.addEventListener("click", closeViewer);

  /* ---- model-viewer load / progress events ---- */
  mv.addEventListener("progress", (event) => {
    const pct = Math.round((event.detail.totalProgress || 0) * 100);
    progressBarFill.style.width = pct + "%";
  });

  mv.addEventListener("load", () => {
    mv.setAttribute("data-loaded", "");
    defaultOrbit = mv.getCameraOrbit ? mv.getCameraOrbit() : null;
    arBtn.hidden = !mv.canActivateAR;
    applyAllSelectedMaterials();
  });

  mv.addEventListener("ar-status", () => {
    arBtn.hidden = !mv.canActivateAR;
  });

  /* ------------------------------------------------------------------------
     5) VIEWER CONTROLS
     ------------------------------------------------------------------------ */
  btnReset.addEventListener("click", () => {
    if (defaultOrbit) {
      mv.cameraOrbit = `${defaultOrbit.theta}rad ${defaultOrbit.phi}rad ${defaultOrbit.radius}m`;
    } else {
      mv.cameraOrbit = "auto auto auto";
    }
    mv.fieldOfView = "auto";
    mv.jumpCameraToGoal();
  });

  btnAutoRotate.addEventListener("click", () => {
    const isActive = mv.hasAttribute("auto-rotate");
    if (isActive) {
      mv.removeAttribute("auto-rotate");
    } else {
      mv.setAttribute("auto-rotate", "");
    }
    btnAutoRotate.classList.toggle("is-active", !isActive);
    btnAutoRotate.setAttribute("aria-pressed", String(!isActive));
  });

  function zoomBy(factor) {
    if (!mv.getCameraOrbit) return;
    const orbit = mv.getCameraOrbit();
    const nextRadius = orbit.radius * factor;
    mv.cameraOrbit = `${orbit.theta}rad ${orbit.phi}rad ${nextRadius}m`;
  }
  btnZoomIn.addEventListener("click", () => zoomBy(0.85));
  btnZoomOut.addEventListener("click", () => zoomBy(1.18));

  btnFullscreen.addEventListener("click", () => {
    const stage = mv.closest(".viewer-stage");
    if (!document.fullscreenElement) {
      (stage.requestFullscreen || stage.webkitRequestFullscreen)?.call(stage);
    } else {
      (document.exitFullscreen || document.webkitExitFullscreen)?.call(document);
    }
  });

  /* ------------------------------------------------------------------------
     6) MATERIAL / TEXTURE SWAPPING (Model 1 & Model 2 only)
     Uses the official model-viewer material API:
       modelViewer.model.materials -> list of materials already in the .glb
       material.pbrMetallicRoughness.baseColorTexture.setTexture(texture)
       modelViewer.createTexture(url) -> loads a new texture
     Only the texture is replaced; no new .glb is generated or required.
     ------------------------------------------------------------------------ */
  const selectedSwatches = {}; // { materialName: swatchId }

  function buildMaterialPanel(model) {
    materialPanel.innerHTML = "";

    if (!model.materialGroups.length) {
      materialPanel.hidden = true;
      return;
    }

    materialPanel.hidden = false;

    model.materialGroups.forEach((group) => {
      const wrap = document.createElement("div");
      wrap.className = "material-group";

      const title = document.createElement("p");
      title.className = "material-group-title";
      title.textContent = group.label;
      wrap.appendChild(title);

      const row = document.createElement("div");
      row.className = "swatch-row";

      group.swatches.forEach((swatch, index) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "swatch";
        btn.style.background = swatch.color;
        btn.setAttribute("aria-label", `${group.label} — ${swatch.id}`);
        if (index === 0) {
          btn.classList.add("is-selected");
          selectedSwatches[group.materialName] = swatch.id;
        }

        btn.addEventListener("click", () => {
          row.querySelectorAll(".swatch").forEach((s) => s.classList.remove("is-selected"));
          btn.classList.add("is-selected");
          selectedSwatches[group.materialName] = swatch.id;
          applyTexture(group.materialName, swatch.texture);
        });

        row.appendChild(btn);
      });

      wrap.appendChild(row);
      materialPanel.appendChild(wrap);
    });
  }

  async function applyTexture(materialName, textureUrl) {
    if (!mv.model) return;
    const material = mv.model.materials.find((m) => m.name === materialName);
    if (!material) {
      console.warn(`[Derin Studio] Material "${materialName}" not found in this model.`);
      return;
    }
    try {
      const texture = await mv.createTexture(textureUrl);
      material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
    } catch (err) {
      // Expected until the real texture files are added under assets/textures/…
      console.warn(`[Derin Studio] Texture not available yet: ${textureUrl}`);
    }
  }

  function applyAllSelectedMaterials() {
    const model = MODELS[currentModelId];
    if (!model || !model.materialGroups.length) return;
    model.materialGroups.forEach((group) => {
      const selectedId = selectedSwatches[group.materialName];
      const swatch = group.swatches.find((s) => s.id === selectedId) || group.swatches[0];
      if (swatch) applyTexture(group.materialName, swatch.texture);
    });
  }
})();
