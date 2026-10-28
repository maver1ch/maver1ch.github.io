// Click-to-zoom lightbox with wheel / pinch zoom and drag-to-pan.
// Diagrams are tall 2x PNGs with small text: the viewer opens them fitted to the
// screen, then lets the reader zoom into any part to read it at full resolution.

const ZOOM_STEP = 1.4;
const DRAG_THRESHOLD = 4; // px a pointer must travel before a press counts as a drag
const TOOLBAR_SPACE = 72; // px kept clear at the bottom so the zoom toolbar never covers a fitted image

export function initImageLightbox(): void {
  const lightbox = document.getElementById('image-lightbox');
  const stage = lightbox?.querySelector<HTMLElement>('.lightbox-stage');
  const img = lightbox?.querySelector<HTMLImageElement>('.lightbox-img');
  const level = lightbox?.querySelector<HTMLElement>('.lightbox-level');
  if (!lightbox || !stage || !img || !level) return;

  // Idempotent: Astro view transitions call this again on every page load
  if (lightbox.dataset.bound === '1') {
    bindTriggers();
    return;
  }
  lightbox.dataset.bound = '1';

  let scale = 1;
  let tx = 0;
  let ty = 0;
  let fitScale = 1;
  const pointers = new Map<number, { x: number; y: number }>();
  let pressStart: { x: number; y: number } | null = null;
  let dragged = false;
  let pinchDistance = 0;

  const maxScale = () => Math.max(2, fitScale * 6);

  const render = () => {
    img.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    level.textContent = `${Math.round((scale / fitScale) * 100)}%`;
    lightbox.classList.toggle('is-zoomed', scale > fitScale * 1.01);
  };

  // Keep the image on screen: centred when smaller than the stage, edge-clamped when larger
  const clamp = () => {
    const vw = stage.clientWidth;
    const vh = stage.clientHeight;
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    tx = w <= vw ? (vw - w) / 2 : Math.min(0, Math.max(vw - w, tx));
    ty = h <= vh ? Math.max(0, (vh - TOOLBAR_SPACE - h) / 2) : Math.min(0, Math.max(vh - h, ty));
  };

  const fit = () => {
    const pad = window.innerWidth < 640 ? 16 : 48;
    fitScale = Math.min(
      (stage.clientWidth - pad * 2) / img.naturalWidth,
      (stage.clientHeight - TOOLBAR_SPACE - pad * 2) / img.naturalHeight,
    );
    scale = fitScale;
    clamp();
    render();
  };

  // Zoom so the image point under (cx, cy) stays under the cursor
  const zoomTo = (next: number, cx: number, cy: number) => {
    const target = Math.min(maxScale(), Math.max(fitScale, next));
    tx = cx - ((cx - tx) * target) / scale;
    ty = cy - ((cy - ty) * target) / scale;
    scale = target;
    clamp();
    render();
  };

  const stagePoint = (e: { clientX: number; clientY: number }) => {
    const r = stage.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const centre = () => ({ x: stage.clientWidth / 2, y: stage.clientHeight / 2 });

  const open = (src: string, alt: string) => {
    img.alt = alt;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    img.onload = fit;
    img.src = src;
    if (img.complete && img.naturalWidth) fit();
  };

  const close = () => {
    lightbox.classList.remove('is-open', 'is-zoomed');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    pointers.clear();
  };

  function bindTriggers() {
    document.querySelectorAll<HTMLImageElement>('img[data-zoom]').forEach((trigger) => {
      if (trigger.dataset.zoomBound === '1') return;
      trigger.dataset.zoomBound = '1';
      trigger.style.cursor = 'zoom-in';
      trigger.addEventListener('click', () => open(trigger.currentSrc || trigger.src, trigger.alt));
    });
  }
  bindTriggers();

  stage.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      const p = stagePoint(e);
      zoomTo(scale * Math.exp(-e.deltaY * 0.0015), p.x, p.y);
    },
    { passive: false },
  );

  stage.addEventListener('pointerdown', (e) => {
    stage.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, stagePoint(e));
    if (pointers.size === 1) {
      pressStart = stagePoint(e);
      dragged = false;
    } else if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinchDistance = Math.hypot(a.x - b.x, a.y - b.y);
      dragged = true;
    }
  });

  stage.addEventListener('pointermove', (e) => {
    const prev = pointers.get(e.pointerId);
    if (!prev) return;
    const p = stagePoint(e);
    pointers.set(e.pointerId, p);

    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinchDistance > 0) zoomTo((scale * distance) / pinchDistance, (a.x + b.x) / 2, (a.y + b.y) / 2);
      pinchDistance = distance;
      return;
    }

    if (pressStart && Math.hypot(p.x - pressStart.x, p.y - pressStart.y) > DRAG_THRESHOLD) dragged = true;
    if (dragged) {
      tx += p.x - prev.x;
      ty += p.y - prev.y;
      clamp();
      render();
      lightbox.classList.add('is-dragging');
    }
  });

  const release = (e: PointerEvent) => {
    if (!pointers.delete(e.pointerId)) return;
    if (pointers.size > 0) return;
    lightbox.classList.remove('is-dragging');
    pinchDistance = 0;
    if (dragged) return;

    // A plain click: on the image it toggles fit <-> zoomed at that spot, outside it closes
    // Pointer capture retargets events to the stage, so hit-test the image box by hand
    const p = stagePoint(e);
    const onImage =
      p.x >= tx && p.x <= tx + img.naturalWidth * scale && p.y >= ty && p.y <= ty + img.naturalHeight * scale;
    if (!onImage && scale <= fitScale * 1.01) close();
    else if (scale > fitScale * 1.01) fit();
    else zoomTo(Math.max(fitScale * 2.5, Math.min(1, maxScale())), p.x, p.y);
  };
  stage.addEventListener('pointerup', release);
  stage.addEventListener('pointercancel', (e) => {
    pointers.delete(e.pointerId);
    lightbox.classList.remove('is-dragging');
  });

  lightbox.querySelector('.lightbox-close')?.addEventListener('click', close);
  lightbox.querySelector('[data-zoom-in]')?.addEventListener('click', () => zoomTo(scale * ZOOM_STEP, centre().x, centre().y));
  lightbox.querySelector('[data-zoom-out]')?.addEventListener('click', () => zoomTo(scale / ZOOM_STEP, centre().x, centre().y));
  lightbox.querySelector('[data-zoom-fit]')?.addEventListener('click', fit);

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === '+' || e.key === '=') zoomTo(scale * ZOOM_STEP, centre().x, centre().y);
    else if (e.key === '-') zoomTo(scale / ZOOM_STEP, centre().x, centre().y);
    else if (e.key === '0') fit();
  });

  window.addEventListener('resize', () => {
    if (lightbox.classList.contains('is-open')) fit();
  });
}
