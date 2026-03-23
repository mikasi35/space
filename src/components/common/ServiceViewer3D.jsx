import { useEffect, useRef, useState, useCallback } from "react";
import { BRAND, FONT } from "../../shared/constants";

// ── SVG Icons ──────────────────────────────────────────────────────────────
const Icons = {
  Construction: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20M4 20V10l8-6 8 6v10"/><rect x="9" y="14" width="6" height="6"/>
      <path d="M9 8h.01M15 8h.01"/>
    </svg>
  ),
  Roads: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20L12 4L21 20"/><path d="M7 20L12 10L17 20"/>
      <path d="M10 20h4M10 16h4M10 12h4"/>
    </svg>
  ),
  Electrical: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Water: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6 10 4 14 4 16a8 8 0 0016 0c0-2-2-6-8-14z"/>
      <path d="M8 18a4 4 0 005.5-1.5" strokeWidth="1.4"/>
    </svg>
  ),
  Management: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18M9 21V9"/><path d="M13 13h4M13 17h4M7 13h.01M7 17h.01"/>
    </svg>
  ),
  Interior: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h18M3 7v13h18V7"/><path d="M7 7V4h10v3"/>
      <path d="M8 20v-5h8v5"/><path d="M3 13h18"/>
    </svg>
  ),
  Reset: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 109-9H9"/><polyline points="9 3 9 8 14 8"/>
    </svg>
  ),
  Fullscreen: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 00-2 2v3M21 8V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3M16 21h3a2 2 0 002-2v-3"/>
    </svg>
  ),
  ExitFullscreen: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3v3a2 2 0 01-2 2H3M21 8h-3a2 2 0 01-2-2V3M3 16h3a2 2 0 012 2v3M16 21v-3a2 2 0 012-2h3"/>
    </svg>
  ),
  Close: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Sun: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  ),
  Moon: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
  ),
};

// ── Theme tokens ───────────────────────────────────────────────────────────
// All colours live here — components reference CSS vars, never raw values.
const THEMES = {
  dark: {
    "--sv3d-bg":            "#0a0a0b",
    "--sv3d-bg-fs":         "#000000",
    "--sv3d-chrome-bg":     "rgba(18,18,20,0.88)",
    "--sv3d-strip-bg":      "rgba(14,14,16,0.92)",
    "--sv3d-footer-bg":     "rgba(10,10,12,0.90)",
    "--sv3d-border":        "rgba(255,255,255,0.07)",
    "--sv3d-border-soft":   "rgba(255,255,255,0.04)",
    "--sv3d-inset-hi":      "rgba(255,255,255,0.06)",
    "--sv3d-title":         "rgba(255,255,255,0.92)",
    "--sv3d-icon-btn":      "rgba(255,255,255,0.55)",
    "--sv3d-icon-btn-hover-bg": "rgba(255,255,255,0.09)",
    "--sv3d-icon-btn-hover": "rgba(255,255,255,0.90)",
    "--sv3d-close-hover-bg": "rgba(255,60,60,0.15)",
    "--sv3d-close-hover":   "rgba(255,100,100,1)",
    "--sv3d-divider":       "rgba(255,255,255,0.10)",
    "--sv3d-thumb-icon":    "rgba(255,255,255,0.32)",
    "--sv3d-thumb-label":   "rgba(255,255,255,0.28)",
    "--sv3d-thumb-active-label": "rgba(255,255,255,0.72)",
    "--sv3d-thumb-hover-bg": "rgba(255,255,255,0.04)",
    "--sv3d-thumb-active-bg": "rgba(200,75,17,0.09)",
    "--sv3d-thumb-sep":     "rgba(255,255,255,0.06)",
    "--sv3d-hint":          "rgba(255,255,255,0.28)",
    "--sv3d-hint-strong":   "rgba(255,255,255,0.55)",
    "--sv3d-desc":          "rgba(255,255,255,0.45)",
    "--sv3d-status":        "rgba(255,255,255,0.60)",
    "--sv3d-progress-track": "rgba(255,255,255,0.07)",
    "--sv3d-scene-bg":      "#0a0a0b",
  },
  light: {
    "--sv3d-bg":            "#f2f2f5",
    "--sv3d-bg-fs":         "#ffffff",
    "--sv3d-chrome-bg":     "rgba(250,250,252,0.88)",
    "--sv3d-strip-bg":      "rgba(245,245,248,0.95)",
    "--sv3d-footer-bg":     "rgba(248,248,251,0.95)",
    "--sv3d-border":        "rgba(0,0,0,0.08)",
    "--sv3d-border-soft":   "rgba(0,0,0,0.04)",
    "--sv3d-inset-hi":      "rgba(255,255,255,0.80)",
    "--sv3d-title":         "rgba(10,10,14,0.90)",
    "--sv3d-icon-btn":      "rgba(10,10,14,0.45)",
    "--sv3d-icon-btn-hover-bg": "rgba(0,0,0,0.06)",
    "--sv3d-icon-btn-hover": "rgba(10,10,14,0.85)",
    "--sv3d-close-hover-bg": "rgba(220,30,30,0.08)",
    "--sv3d-close-hover":   "rgba(200,30,30,1)",
    "--sv3d-divider":       "rgba(0,0,0,0.10)",
    "--sv3d-thumb-icon":    "rgba(10,10,14,0.30)",
    "--sv3d-thumb-label":   "rgba(10,10,14,0.38)",
    "--sv3d-thumb-active-label": "rgba(10,10,14,0.75)",
    "--sv3d-thumb-hover-bg": "rgba(0,0,0,0.04)",
    "--sv3d-thumb-active-bg": "rgba(200,75,17,0.07)",
    "--sv3d-thumb-sep":     "rgba(0,0,0,0.07)",
    "--sv3d-hint":          "rgba(0,0,0,0.28)",
    "--sv3d-hint-strong":   "rgba(0,0,0,0.55)",
    "--sv3d-desc":          "rgba(10,10,14,0.50)",
    "--sv3d-status":        "rgba(10,10,14,0.55)",
    "--sv3d-progress-track": "rgba(0,0,0,0.08)",
    "--sv3d-scene-bg":      "#e8e8ec",
  },
};

// ── Service list ───────────────────────────────────────────────────────────
const SERVICES = [
  { id: 1, title: "General Export Construction", short: "Construction", Icon: Icons.Construction },
  { id: 2, title: "Road & Bridge Works",          short: "Roads",        Icon: Icons.Roads        },
  { id: 3, title: "Electrical Works",             short: "Electrical",   Icon: Icons.Electrical   },
  { id: 4, title: "Water Works",                  short: "Water",        Icon: Icons.Water        },
  { id: 5, title: "Project Management",           short: "Management",   Icon: Icons.Management   },
  { id: 6, title: "Interior Design",              short: "Interior",     Icon: Icons.Interior     },
];

const SERVICE_TILT    = { 1:0.60, 2:0.28, 3:0.58, 4:0.50, 5:0.52, 6:0.62 };
const SERVICE_PADDING = { 1:0.55, 2:1.2,  3:1.2,  4:1.2,  5:1.2,  6:1.1  };
const MODEL_MAP = {
  1: "/assets/3d-models/construction.glb",
  2: "/assets/3d-models/roads-bridges.glb",
  3: "/assets/3d-models/electrical.glb",
  4: "/assets/3d-models/water-works.glb",
  5: "/assets/3d-models/project-management.glb",
  6: "/assets/3d-models/interior-design.glb",
};
const INTERIOR_SPHERE_SERVICES = new Set([1]);

// ── Three.js module cache ──────────────────────────────────────────────────
let _threeCache = null;
async function getThree() {
  if (_threeCache) return _threeCache;
  const [THREE, { OrbitControls }, { GLTFLoader }] = await Promise.all([
    import("three"),
    import("three/examples/jsm/controls/OrbitControls.js"),
    import("three/examples/jsm/loaders/GLTFLoader.js"),
  ]);
  _threeCache = { THREE, OrbitControls, GLTFLoader };
  return _threeCache;
}

let _prefetchDone = false;
function prefetchModels() {
  if (_prefetchDone) return; _prefetchDone = true;
  Object.values(MODEL_MAP).forEach((path) => {
    const link = document.createElement("link");
    link.rel = "prefetch"; link.href = path; link.as = "fetch";
    document.head.appendChild(link);
  });
}

// ── Camera fit ─────────────────────────────────────────────────────────────
function fitCamera(camera, controls, model, THREE, serviceId) {
  const box = new THREE.Box3().setFromObject(model);
  const centre = new THREE.Vector3();
  box.getCenter(centre); model.position.sub(centre);
  const sphere = new THREE.Sphere();
  new THREE.Box3().setFromObject(model).getBoundingSphere(sphere);
  const r = Math.max(sphere.radius, 0.1);

  if (INTERIOR_SPHERE_SERVICES.has(serviceId)) {
    model.traverse((child) => {
      if (!child.isMesh) return;
      (Array.isArray(child.material) ? child.material : [child.material])
        .forEach((mat) => { if (mat) { mat.side = THREE.BackSide; mat.needsUpdate = true; } });
    });
    camera.position.set(0, 0, 0.1); camera.near = 0.01; camera.far = r * 3;
    camera.updateProjectionMatrix();
    controls.target.set(0, 0, -1); controls.minDistance = 0; controls.maxDistance = r * 0.9;
    controls.update();
  } else {
    const dist = (r / Math.sin((camera.fov * Math.PI / 180) / 2)) * (SERVICE_PADDING[serviceId] ?? 1.2);
    const tilt = (SERVICE_TILT[serviceId] ?? 0.5) * (Math.PI / 2);
    camera.position.set(dist * Math.sin(tilt) * Math.sin(Math.PI/5), dist * Math.cos(tilt), dist * Math.sin(tilt) * Math.cos(Math.PI/5));
    camera.near = dist * 0.01; camera.far = dist * 20; camera.updateProjectionMatrix();
    controls.target.set(0, 0, 0); controls.minDistance = r * 0.8; controls.maxDistance = r * 10;
    controls.update();
  }
  controls._defaultPos = camera.position.clone(); controls._defaultTarget = controls.target.clone();
}

// ── Skeleton builder ───────────────────────────────────────────────────────
function buildSkeleton(THREE, box) {
  const size = new THREE.Vector3(), centre = new THREE.Vector3();
  box.getSize(size); box.getCenter(centre);
  const group = new THREE.Group();
  group.add(new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(size.x, size.y, size.z)),
    new THREE.LineBasicMaterial({ color: BRAND.orange, transparent: true, opacity: 0.5 })
  ));
  const cGeo = new THREE.BoxGeometry(size.x*.04, size.y*.04, size.z*.04);
  const cMat = new THREE.MeshBasicMaterial({ color: BRAND.orange, transparent: true, opacity: 0.9 });
  const [hx,hy,hz] = [size.x/2, size.y/2, size.z/2];
  for (const sx of [-1,1]) for (const sy of [-1,1]) for (const sz of [-1,1]) {
    const c = new THREE.Mesh(cGeo, cMat); c.position.set(sx*hx,sy*hy,sz*hz); group.add(c);
  }
  const scan = new THREE.Mesh(
    new THREE.PlaneGeometry(size.x*.8, size.z*.8),
    new THREE.MeshBasicMaterial({ color: BRAND.orange, transparent: true, opacity: 0.1, side: THREE.DoubleSide, depthWrite: false })
  );
  scan.rotation.x = Math.PI/2; scan.position.y = -hy; group.add(scan);
  group.userData.scan = scan; group.userData.scanMin = -hy; group.userData.scanMax = hy;
  group.position.copy(centre);
  return group;
}

// ── Component ──────────────────────────────────────────────────────────────
export function ServiceViewer3D({ service: initialService, onClose, services: allServices }) {
  const serviceList = allServices || SERVICES;

  const [activeService, setActiveService] = useState(
    serviceList.find(s => s.id === initialService.id) || serviceList[0]
  );
  const [phase, setPhase]               = useState("loading");
  const [loadProgress, setLoadProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theme, setTheme]               = useState("dark"); // "dark" | "light"

  const containerRef  = useRef(null);
  const canvasWrapRef = useRef(null);
  const threeRef      = useRef({});
  const lastTapRef    = useRef(0);

  const isDark = theme === "dark";

  // ── Theme → scene background sync ─────────────────────────────────────────
  useEffect(() => {
    const { THREE, scene } = threeRef.current;
    if (!THREE || !scene) return;
    scene.background = new THREE.Color(THEMES[theme]["--sv3d-scene-bg"]);
  }, [theme]);

  // ── Camera reset ────────────────────────────────────────────────────────
  const resetCamera = useCallback(() => {
    const { camera, controls } = threeRef.current;
    if (!camera || !controls?._defaultPos) return;
    camera.position.copy(controls._defaultPos);
    controls.target.copy(controls._defaultTarget);
    controls.update();
  }, []);

  const handleCanvasInteraction = useCallback((e) => {
    const now = Date.now(), delta = now - lastTapRef.current;
    if (delta < 300 && delta > 0) { e.preventDefault(); resetCamera(); }
    lastTapRef.current = now;
  }, [resetCamera]);

  // ── Fullscreen ─────────────────────────────────────────────────────────
  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current; if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.() || el.webkitRequestFullscreen?.();
    } else {
      document.exitFullscreen?.() || document.webkitExitFullscreen?.();
    }
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
    };
  }, []);

  // ── Scene init (once) ──────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    const wrap = canvasWrapRef.current;
    if (!wrap) return;

    const init = async () => {
      try {
        const { THREE, OrbitControls } = await getThree();
        if (cancelled) return;

        const W = wrap.clientWidth || 800, H = wrap.clientHeight || 400;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(THEMES.dark["--sv3d-scene-bg"]);
        const camera = new THREE.PerspectiveCamera(50, W/H, 0.01, 2000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace    = THREE.SRGBColorSpace;
        renderer.toneMapping         = THREE.LinearToneMapping;
        renderer.toneMappingExposure = 1.0;
        renderer.domElement.style.cssText = "display:block;width:100%;height:100%;position:absolute;top:0;left:0;";
        wrap.appendChild(renderer.domElement);

        scene.add(new THREE.AmbientLight(0xffffff, 1.4));
        const key = new THREE.DirectionalLight(0xfff8f0, 1.8); key.position.set(8,12,10); scene.add(key);
        const fill = new THREE.DirectionalLight(0xd0e8ff, 0.9); fill.position.set(-8,4,-6); scene.add(fill);
        const rim = new THREE.DirectionalLight(0xffffff, 0.6); rim.position.set(0,-4,-10); scene.add(rim);
        const accent = new THREE.PointLight(BRAND.orange, 0.35, 9999); accent.position.set(-4,2,-4); scene.add(accent);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; controls.dampingFactor = 0.07;
        controls.enablePan = false; controls.autoRotate = false;
        controls.maxPolarAngle = Math.PI * 0.88; controls.update();

        threeRef.current = { THREE, scene, camera, renderer, controls };

        const onResize = () => {
          const w = wrap.clientWidth, h = wrap.clientHeight;
          if (!w || !h) return;
          camera.aspect = w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h);
        };
        window.addEventListener("resize", onResize, { passive: true });

        let animId;
        const animate = () => {
          if (cancelled) return;
          animId = requestAnimationFrame(animate);
          controls.update();
          const sk = scene.userData.skeleton;
          if (sk?.userData.scan) {
            const { scan, scanMin, scanMax } = sk.userData;
            scan.position.y = scanMin + (scanMax - scanMin) * ((Date.now() % 2000) / 2000);
          }
          if (scene.userData.isFallback && scene.userData.model) scene.userData.model.rotation.y += 0.005;
          renderer.render(scene, camera);
        };
        animate();

        wrap._cleanup = () => {
          window.removeEventListener("resize", onResize);
          cancelAnimationFrame(animId); controls?.dispose();
          scene?.traverse((o) => {
            if (o.geometry) o.geometry.dispose();
            (Array.isArray(o.material) ? o.material : o.material ? [o.material] : []).forEach((m) => m?.dispose());
          });
          renderer?.domElement?.parentNode?.removeChild(renderer.domElement); renderer?.dispose();
        };

        await loadModel(activeService.id);
      } catch (err) {
        console.error("[ServiceViewer3D]", err);
        if (!cancelled) setPhase("error");
      }
    };

    init();
    return () => { cancelled = true; wrap._cleanup?.(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Model loader ───────────────────────────────────────────────────────
  const loadModel = useCallback(async (serviceId) => {
    const { THREE, scene, camera, controls } = threeRef.current;
    if (!THREE || !scene) return;
    setPhase("loading"); setLoadProgress(0);
    const { GLTFLoader } = await getThree();

    if (scene.userData.model) { scene.remove(scene.userData.model); scene.userData.model = null; }
    if (scene.userData.skeleton) { scene.remove(scene.userData.skeleton); scene.userData.skeleton = null; }
    scene.userData.isFallback = false;

    const placeholder = buildSkeleton(THREE, new THREE.Box3(new THREE.Vector3(-1,-1,-1), new THREE.Vector3(1,1,1)));
    scene.add(placeholder); scene.userData.skeleton = placeholder;

    const loader = new GLTFLoader();
    await new Promise((resolve) => {
      loader.load(
        MODEL_MAP[serviceId] || MODEL_MAP[1],
        (gltf) => {
          const model = gltf.scene;
          model.traverse((child) => {
            if (!child.isMesh) return;
            (Array.isArray(child.material) ? child.material : [child.material]).forEach((mat) => {
              if (!mat) return;
              try { if (mat.emissive !== undefined) { mat.emissive.set(BRAND.orange); mat.emissiveIntensity = 0.08; } }
              catch { child.material = new THREE.MeshStandardMaterial({ color: new THREE.Color(BRAND.orange), roughness:0.5, metalness:0.3 }); }
            });
          });
          const realSkel = buildSkeleton(THREE, new THREE.Box3().setFromObject(model));
          scene.remove(placeholder); scene.add(realSkel); scene.userData.skeleton = realSkel;
          setTimeout(() => {
            scene.remove(realSkel); scene.userData.skeleton = null;
            scene.add(model); scene.userData.model = model;
            fitCamera(camera, controls, model, THREE, serviceId);
            setPhase("ready"); prefetchModels(); resolve(true);
          }, 300);
        },
        (xhr) => setLoadProgress(xhr.total ? Math.round((xhr.loaded/xhr.total)*100) : 0),
        (err) => {
          console.warn("[ServiceViewer3D] GLB failed:", err);
          scene.remove(placeholder); scene.userData.skeleton = null;
          const mesh = new THREE.Mesh(
            new THREE.IcosahedronGeometry(1.2, 1),
            new THREE.MeshStandardMaterial({ color: new THREE.Color(BRAND.orange), roughness:0.35, metalness:0.4 })
          );
          scene.add(mesh); scene.userData.model = mesh; scene.userData.isFallback = true;
          camera.position.set(0,1.5,5); controls.minDistance=2; controls.maxDistance=20; controls.update();
          setPhase("ready"); resolve(false);
        }
      );
    });
  }, []);

  const handleThumbClick = useCallback((svc) => {
    if (svc.id === activeService.id) return;
    setActiveService(svc); loadModel(svc.id);
  }, [activeService.id, loadModel]);

  // ── Keyboard + focus-trap ──────────────────────────────────────────────
  useEffect(() => {
    const FOCUSABLE = 'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])';
    const onKey = (e) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key !== "Tab") return;
      const nodes = [...(containerRef.current?.querySelectorAll(FOCUSABLE) || [])];
      if (!nodes.length) return;
      const first = nodes[0], last = nodes[nodes.length-1];
      if (e.shiftKey) { if (document.activeElement===first) { e.preventDefault(); last.focus(); } }
      else            { if (document.activeElement===last)  { e.preventDefault(); first.focus(); } }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    containerRef.current?.querySelector("button")?.focus();
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  // Build inline CSS vars string from current theme
  const cssVars = Object.entries(THEMES[theme])
    .map(([k, v]) => `${k}:${v}`)
    .join(";");

  const { Icon: ActiveIcon } = activeService;

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      className={`sv3d-modal sv3d-modal--${theme}`}
      style={{ cssText: cssVars }} // fallback for browsers without CSS var support
      role="dialog"
      aria-modal="true"
      aria-labelledby="sv3d-title"
      aria-describedby="sv3d-desc"
    >
      {/* ── Header ── */}
      <header className="sv3d-header">
        <div className="sv3d-header-left">
          <span className="sv3d-header-icon">{ActiveIcon && <ActiveIcon />}</span>
          <h2 id="sv3d-title" className="sv3d-title">{activeService.title}</h2>
        </div>
        <div className="sv3d-header-actions">
          <button className="sv3d-icon-btn" onClick={resetCamera} aria-label="Reset camera" title="Reset view">
            <Icons.Reset />
          </button>
          <button className="sv3d-icon-btn" onClick={toggleFullscreen} aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}>
            {isFullscreen ? <Icons.ExitFullscreen /> : <Icons.Fullscreen />}
          </button>
          {/* Theme toggle */}
          <button
            className="sv3d-icon-btn sv3d-theme-btn"
            onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark ? <Icons.Sun /> : <Icons.Moon />}
          </button>
          <div className="sv3d-divider" />
          <button className="sv3d-icon-btn sv3d-close-btn" onClick={onClose} aria-label="Close">
            <Icons.Close />
          </button>
        </div>
      </header>

      {/* ── Canvas ── */}
      <div
        ref={canvasWrapRef}
        className="sv3d-canvas-wrap"
        aria-hidden="true"
        onDoubleClick={handleCanvasInteraction}
        onTouchEnd={handleCanvasInteraction}
      >
        {phase === "loading" && (
          <div className="sv3d-overlay" role="status" aria-live="polite">
            <p className="sv3d-skeleton-label">
              {loadProgress > 0 ? `Loading… ${loadProgress}%` : "Preparing model…"}
            </p>
            {loadProgress > 0 && (
              <div className="sv3d-progress-track">
                <div className="sv3d-progress-bar" style={{ width: `${loadProgress}%` }} />
              </div>
            )}
          </div>
        )}
        {phase === "error" && (
          <div className="sv3d-overlay sv3d-overlay--center">
            <p className="sv3d-status-text">3D viewer couldn&apos;t load.</p>
            <button className="sv3d-retry-btn" onClick={onClose}>Close</button>
          </div>
        )}
        {phase === "ready" && (
          <p className="sv3d-hint" aria-hidden="true">
            <span>Drag</span> to rotate &nbsp;·&nbsp; <span>Scroll</span> to zoom &nbsp;·&nbsp; <span>Double-tap</span> to reset
          </p>
        )}
      </div>

      {/* ── Service strip ── */}
      <nav className="sv3d-strip" aria-label="Switch 3D model">
        <div className="sv3d-strip-inner">
          {serviceList.map((svc) => {
            const isActive = svc.id === activeService.id;
            const SvcIcon  = svc.Icon;
            return (
              <button
                key={svc.id}
                className={`sv3d-thumb${isActive ? " sv3d-thumb--active" : ""}`}
                onClick={() => handleThumbClick(svc)}
                aria-current={isActive ? "true" : undefined}
                aria-label={`View ${svc.title}`}
              >
                <span className="sv3d-thumb-icon">{SvcIcon && <SvcIcon />}</span>
                <span className="sv3d-thumb-label">{svc.short}</span>
                {isActive && <span className="sv3d-thumb-bar" />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── Footer ── */}
      <footer className="sv3d-footer">
        <p id="sv3d-desc" className="sv3d-desc">{activeService.desc}</p>
      </footer>

      <style>{`
        /* ── CSS custom properties injected via .sv3d-modal--dark/light ── */
        .sv3d-modal--dark  { ${Object.entries(THEMES.dark).map(([k,v])=>`${k}:${v}`).join(";")} }
        .sv3d-modal--light { ${Object.entries(THEMES.light).map(([k,v])=>`${k}:${v}`).join(";")} }

        /* ── Modal shell ──────────────────────────────────────────────── */
        .sv3d-modal {
          position: fixed; inset: 0;
          padding-top: env(safe-area-inset-top);
          padding-bottom: env(safe-area-inset-bottom);
          background: var(--sv3d-bg);
          z-index: 9999;
          display: flex; flex-direction: column; overflow: hidden;
          animation: sv3d-in 0.28s cubic-bezier(0.22,1,0.36,1) both;
          font-family: ${FONT.body};
          -webkit-font-smoothing: antialiased;
          /* Smooth theme crossfade — only chrome elements, not the canvas */
          transition: background 0.35s ease;
        }
        .sv3d-modal:fullscreen, .sv3d-modal:-webkit-full-screen { background: var(--sv3d-bg-fs); }
        @keyframes sv3d-in {
          from { opacity:0; transform:scale(0.96) translateY(8px); }
          to   { opacity:1; transform:scale(1)    translateY(0);   }
        }

        /* ── Header ───────────────────────────────────────────────────── */
        .sv3d-header {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          padding: 14px 20px;
          background: var(--sv3d-chrome-bg);
          backdrop-filter: saturate(180%) blur(20px);
          -webkit-backdrop-filter: saturate(180%) blur(20px);
          border-bottom: 1px solid var(--sv3d-border);
          box-shadow: inset 0 1px 0 var(--sv3d-inset-hi);
          transition: background 0.35s, border-color 0.35s, box-shadow 0.35s;
        }
        .sv3d-header-left { display:flex; align-items:center; gap:10px; min-width:0; }
        .sv3d-header-icon {
          flex-shrink:0; width:28px; height:28px;
          display:flex; align-items:center; justify-content:center;
          color: ${BRAND.orange}; opacity:0.9;
        }
        .sv3d-header-icon svg { width:20px; height:20px; }
        .sv3d-title {
          font-family: ${FONT.heading};
          font-size: clamp(14px,3vw,18px); font-weight:600;
          color: var(--sv3d-title); margin:0; line-height:1.3;
          letter-spacing:-0.01em; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
          transition: color 0.35s;
        }
        .sv3d-header-actions { display:flex; align-items:center; gap:4px; flex-shrink:0; }
        .sv3d-divider {
          width:1px; height:20px;
          background: var(--sv3d-divider); margin:0 4px;
          transition: background 0.35s;
        }

        /* Icon buttons */
        .sv3d-icon-btn {
          background: transparent; border: none;
          color: var(--sv3d-icon-btn); cursor:pointer;
          border-radius:8px; min-width:36px; min-height:36px;
          display:flex; align-items:center; justify-content:center;
          transition: background 0.15s, color 0.15s;
          -webkit-tap-highlight-color: transparent;
        }
        .sv3d-icon-btn svg { width:17px; height:17px; }
        .sv3d-icon-btn:hover, .sv3d-icon-btn:focus-visible {
          background: var(--sv3d-icon-btn-hover-bg);
          color: var(--sv3d-icon-btn-hover); outline:none;
        }
        /* Theme button gets a subtle warm tint on hover in dark, cool in light */
        .sv3d-theme-btn:hover { background: rgba(200,75,17,0.12) !important; color: ${BRAND.orange} !important; }
        .sv3d-close-btn { color: var(--sv3d-icon-btn); }
        .sv3d-close-btn:hover { background: var(--sv3d-close-hover-bg) !important; color: var(--sv3d-close-hover) !important; }

        /* ── Canvas ───────────────────────────────────────────────────── */
        .sv3d-canvas-wrap {
          position:relative; flex:1 1 0; min-height:min(200px,35vh);
          overflow:hidden; cursor:grab;
        }
        .sv3d-canvas-wrap:active { cursor:grabbing; }

        /* ── Overlays ─────────────────────────────────────────────────── */
        .sv3d-overlay {
          position:absolute; inset:0;
          display:flex; flex-direction:column; align-items:center;
          justify-content:flex-end; gap:8px; padding:0 20px 24px;
          pointer-events:none;
        }
        .sv3d-overlay--center { justify-content:center; }
        .sv3d-skeleton-label {
          font-size:10px; font-weight:600; color:${BRAND.orange};
          letter-spacing:0.12em; text-transform:uppercase; margin:0;
          animation: sv3d-pulse 1.4s ease-in-out infinite;
        }
        @keyframes sv3d-pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        .sv3d-progress-track {
          width:min(180px,50vw); height:1.5px;
          background:var(--sv3d-progress-track); border-radius:99px; overflow:hidden;
          transition: background 0.35s;
        }
        .sv3d-progress-bar {
          height:100%; background:${BRAND.orange}; border-radius:99px;
          transition:width 0.25s ease; box-shadow:0 0 6px ${BRAND.orange};
        }
        .sv3d-status-text {
          font-size:14px; color:var(--sv3d-status); margin:0 0 12px; text-align:center;
          transition: color 0.35s;
        }
        .sv3d-retry-btn {
          pointer-events:auto; background:${BRAND.orange}; color:#fff; border:none;
          padding:10px 28px; border-radius:99px; cursor:pointer;
          font-family:${FONT.heading}; font-size:13px; font-weight:600; letter-spacing:0.04em; min-height:44px;
        }
        .sv3d-hint {
          position:absolute; bottom:14px; left:50%; transform:translateX(-50%);
          font-size:11px; color:var(--sv3d-hint); white-space:nowrap; margin:0;
          pointer-events:none; letter-spacing:0.02em;
          animation:sv3d-fadeup 0.6s ease 0.5s both;
          transition: color 0.35s;
        }
        .sv3d-hint span { color:var(--sv3d-hint-strong); font-weight:600; transition:color 0.35s; }
        @keyframes sv3d-fadeup {
          from { opacity:0; transform:translate(-50%,6px); }
          to   { opacity:1; transform:translate(-50%,0); }
        }

        /* ── Service strip ────────────────────────────────────────────── */
        .sv3d-strip {
          flex-shrink:0;
          background:var(--sv3d-strip-bg);
          backdrop-filter:saturate(180%) blur(20px);
          -webkit-backdrop-filter:saturate(180%) blur(20px);
          border-top:1px solid var(--sv3d-border);
          box-shadow:inset 0 1px 0 var(--sv3d-border-soft);
          overflow-x:auto; scrollbar-width:none; -webkit-overflow-scrolling:touch;
          transition:background 0.35s, border-color 0.35s;
        }
        .sv3d-strip::-webkit-scrollbar { display:none; }
        .sv3d-strip-inner {
          display:flex; align-items:stretch;
          min-width:100%; width:max-content; margin:0 auto;
        }
        @media (min-width:640px) {
          .sv3d-strip-inner { width:100%; justify-content:center; }
        }

        .sv3d-thumb {
          flex:0 0 auto; width:clamp(72px,13vw,96px);
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          gap:5px; padding:11px 6px 13px;
          background:transparent; border:none; position:relative;
          cursor:pointer; transition:background 0.2s;
          -webkit-tap-highlight-color:transparent;
        }
        .sv3d-thumb + .sv3d-thumb::before {
          content:''; position:absolute; left:0; top:20%; height:60%; width:1px;
          background:var(--sv3d-thumb-sep); transition:background 0.35s;
        }
        .sv3d-thumb:hover { background:var(--sv3d-thumb-hover-bg); }
        .sv3d-thumb--active { background:var(--sv3d-thumb-active-bg); }
        .sv3d-thumb-icon {
          width:22px; height:22px; display:flex; align-items:center; justify-content:center;
          color:var(--sv3d-thumb-icon); transition:color 0.2s, transform 0.2s;
        }
        .sv3d-thumb-icon svg { width:20px; height:20px; stroke-width:1.5; }
        .sv3d-thumb--active .sv3d-thumb-icon { color:${BRAND.orange}; transform:scale(1.1); }
        .sv3d-thumb-label {
          font-size:clamp(8px,1.6vw,10px); font-weight:500;
          color:var(--sv3d-thumb-label); letter-spacing:0.07em;
          text-transform:uppercase; white-space:nowrap;
          transition:color 0.2s;
        }
        .sv3d-thumb--active .sv3d-thumb-label { color:var(--sv3d-thumb-active-label); }
        .sv3d-thumb-bar {
          position:absolute; bottom:0; left:50%; transform:translateX(-50%);
          width:24px; height:2px; background:${BRAND.orange};
          border-radius:99px 99px 0 0;
          animation:sv3d-bar-in 0.25s cubic-bezier(0.22,1,0.36,1) both;
          box-shadow:0 0 8px ${BRAND.orange}88;
        }
        @keyframes sv3d-bar-in {
          from { transform:translateX(-50%) scaleX(0); }
          to   { transform:translateX(-50%) scaleX(1); }
        }

        /* ── Footer ───────────────────────────────────────────────────── */
        .sv3d-footer {
          flex-shrink:0; padding:14px 20px 16px;
          background:var(--sv3d-footer-bg);
          border-top:1px solid var(--sv3d-border-soft);
          max-height:22vh; overflow-y:auto;
          transition:background 0.35s, border-color 0.35s;
        }
        .sv3d-desc {
          font-size:clamp(12px,2.2vw,13px); color:var(--sv3d-desc);
          line-height:1.6; margin:0; max-width:680px; letter-spacing:0.01em;
          transition:color 0.35s;
        }

        /* ── Light mode: scene gets a soft warm vignette shadow ───────── */
        .sv3d-modal--light .sv3d-canvas-wrap::after {
          content:'';
          position:absolute; inset:0; pointer-events:none;
          box-shadow:inset 0 0 60px rgba(0,0,0,0.06);
        }

        /* ── Landscape phone ──────────────────────────────────────────── */
        @media (max-height:500px) {
          .sv3d-footer { display:none; }
          .sv3d-canvas-wrap { min-height:120px; }
          .sv3d-thumb { padding:7px 6px 9px; width:60px; }
        }
      `}</style>
    </div>
  );
}