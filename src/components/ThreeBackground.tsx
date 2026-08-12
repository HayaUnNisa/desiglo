import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export function ThreeBackground() {
  const mountRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    const cubeConfigs = [
      { size: 3.4, opacity: 0.45, spin: 0.006 },
      { size: 2.3, opacity: 0.28, spin: -0.011 },
      { size: 1.25, opacity: 0.65, spin: 0.017 },
    ];
    const cubes = cubeConfigs.map((cfg) => {
      const geo = new THREE.BoxGeometry(cfg.size, cfg.size, cfg.size);
      const edges = new THREE.EdgesGeometry(geo);
      const mat = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: cfg.opacity });
      const mesh = new THREE.LineSegments(edges, mat);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      group.add(mesh);
      return { mesh, spin: cfg.spin };
    });
    group.position.set(1.8, -0.3, -2);
    scene.add(group);

    const particleCount = 140;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x34d399, size: 0.022, transparent: true, opacity: 0.4, sizeAttenuation: true });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let frameId;
    const animate = () => {
      if (!reduced) {
        cubes.forEach(({ mesh, spin }) => { mesh.rotation.y += spin; mesh.rotation.x += spin * 0.6; });
        group.rotation.y += 0.0011;
        particles.rotation.y += 0.0004;
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      cubes.forEach(({ mesh }) => { mesh.geometry.dispose(); mesh.material.dispose(); });
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [reduced]);

  return <div ref={mountRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} aria-hidden="true" />;
}

export function AmbientScrim({ opacity = 0.4, blurred = false }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" style={{ zIndex: 0, filter: blurred ? 'blur(16px)' : 'none' }} aria-hidden="true">
      <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${0.55 - opacity * 0.3})` }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent, #000)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.85) 100%)' }} />
    </div>
  );
}
