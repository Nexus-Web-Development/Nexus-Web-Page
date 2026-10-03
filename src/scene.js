import * as THREE from 'three';

// ---------------------------------------------------------------------------
// GLSL helpers
// ---------------------------------------------------------------------------
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
float fbm(vec3 p){float f=0.,a=.5;for(int i=0;i<5;i++){f+=a*snoise(p);p*=2.03;a*=.5;}return f;}
`;

// ---------------------------------------------------------------------------
// Planet
// ---------------------------------------------------------------------------
function createPlanet() {
  const group = new THREE.Group();

  const surface = new THREE.Mesh(
    new THREE.SphereGeometry(1, 160, 160),
    new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uSun: { value: new THREE.Vector3(0.6, 0.4, 0.6).normalize() },
        uOpacity: { value: 1 },
      },
      vertexShader: /* glsl */ `
        varying vec3 vObjN; varying vec3 vN; varying vec3 vV;
        void main(){
          vObjN = normal;
          vN = normalize(mat3(modelMatrix) * normal);
          vec4 wp = modelMatrix * vec4(position,1.);
          vV = normalize(cameraPosition - wp.xyz);
          gl_Position = projectionMatrix * viewMatrix * wp;
        }`,
      fragmentShader: /* glsl */ `
        uniform float uTime; uniform vec3 uSun; uniform float uOpacity;
        varying vec3 vObjN; varying vec3 vN; varying vec3 vV;
        ${NOISE}
        void main(){
          vec3 N = normalize(vN); vec3 V = normalize(vV);
          vec3 p = normalize(vObjN);
          float n = fbm(p * 1.7 + vec3(3.1, 1.7, 0.4));
          float land = smoothstep(0.03, 0.10, n);
          vec3 ocean = mix(vec3(0.010,0.016,0.030), vec3(0.030,0.050,0.085), smoothstep(-0.4,0.03,n));
          vec3 rock = mix(vec3(0.16,0.165,0.175), vec3(0.46,0.46,0.47), smoothstep(0.08,0.55,n + fbm(p*6.)*0.15));
          float lat = abs(p.y);
          rock = mix(rock, vec3(0.80,0.82,0.86), smoothstep(0.88,0.98,lat + n*0.2));
          vec3 base = mix(ocean, rock, land);

          float c = fbm(p * 2.6 + vec3(uTime*0.012, 0., uTime*0.006));
          c = smoothstep(0.12, 0.7, c) * 0.7;
          base = mix(base, vec3(0.78,0.80,0.85), c);

          float ndl = dot(N, uSun);
          float day = smoothstep(-0.04, 0.55, ndl);
          vec3 col = base * day * 0.95;

          vec3 H = normalize(uSun + V);
          col += pow(max(dot(N,H),0.), 48.) * (1.-land) * (1.-c) * day * 0.55;

          // City lights on the night side — the only warm light on the page.
          float city = smoothstep(0.78, 0.92, snoise(p*140.)*0.5+0.5) * smoothstep(0.55, 0.75, snoise(p*9.)*0.5+0.5);
          city *= land * (1.-c) * smoothstep(0.02, -0.3, ndl);
          col += vec3(1.0, 0.70, 0.32) * city * 0.75;

          float fres = pow(1. - max(dot(N,V),0.), 3.2);
          col += vec3(0.56,0.68,0.92) * fres * smoothstep(-0.25, 0.45, ndl) * 0.6;
          gl_FragColor = vec4(col, uOpacity);
        }`,
    })
  );
  group.add(surface);

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.1, 96, 96),
    new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        uSun: surface.material.uniforms.uSun,
        uOpacity: surface.material.uniforms.uOpacity,
      },
      vertexShader: /* glsl */ `
        varying vec3 vN; varying vec3 vWN; varying vec3 vV;
        void main(){
          vN = normalize(normalMatrix * normal);
          vWN = normalize(mat3(modelMatrix) * normal);
          vec4 wp = modelMatrix * vec4(position,1.);
          vV = normalize(cameraPosition - wp.xyz);
          gl_Position = projectionMatrix * viewMatrix * wp;
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uSun; uniform float uOpacity;
        varying vec3 vN; varying vec3 vWN; varying vec3 vV;
        void main(){
          // 0 at the shell's silhouette → 1 where it meets the planet limb
          float k = clamp(-normalize(vN).z / 0.42, 0., 1.);
          float rim = pow(k, 2.6);
          float lit = smoothstep(-0.35, 0.75, dot(normalize(vWN), uSun));
          vec3 col = vec3(0.52,0.64,0.95) * rim * (0.04 + lit * 0.9);
          gl_FragColor = vec4(col * uOpacity, 1.0);
        }`,
    })
  );
  group.add(atmosphere);

  return { group, surface, atmosphere };
}

// ---------------------------------------------------------------------------
// Sun flare (used for the closing sunrise)
// ---------------------------------------------------------------------------
function createFlare() {
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uIntensity: { value: 0 }, uTime: { value: 0 } },
    vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }`,
    fragmentShader: /* glsl */ `
      uniform float uIntensity; uniform float uTime; varying vec2 vUv;
      void main(){
        vec2 p = vUv - 0.5; p.x *= 2.0;
        float d = length(p);
        float core = exp(-d * 18.0) * 2.2;
        float halo = exp(-d * 4.5) * 0.55;
        float streak = exp(-abs(p.y) * 120.0) * exp(-abs(p.x) * 2.2) * 0.9;
        vec3 warm = vec3(1.0, 0.78, 0.46);
        vec3 col = warm * halo + vec3(1.0,0.95,0.88) * core + vec3(0.85,0.9,1.0) * streak;
        vec2 e = abs(vUv - 0.5);
        float edge = smoothstep(0.5, 0.32, max(e.x, e.y));
        gl_FragColor = vec4(col * uIntensity * edge, 1.0);
      }`,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(16, 8), mat);
  return mesh;
}

// ---------------------------------------------------------------------------
// Stars
// ---------------------------------------------------------------------------
function createStars(count = 5200) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const size = new Float32Array(count);
  const seed = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const r = 40 + Math.random() * 80;
    const u = Math.random() * 2 - 1;
    const t = Math.random() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    pos.set([r * s * Math.cos(t), r * u, r * s * Math.sin(t)], i * 3);
    size[i] = Math.pow(Math.random(), 6) * 3.2 + 0.6;
    seed[i] = Math.random() * 100;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uPR: { value: 1 }, uFade: { value: 1 } },
    vertexShader: /* glsl */ `
      attribute float aSize; attribute float aSeed; uniform float uTime; uniform float uPR;
      varying float vA;
      void main(){
        vec4 mv = modelViewMatrix * vec4(position,1.);
        gl_Position = projectionMatrix * mv;
        float tw = 0.65 + 0.35 * sin(uTime * (0.6 + fract(aSeed)*1.6) + aSeed);
        vA = tw * clamp(aSize / 2.0, 0.35, 1.0);
        gl_PointSize = aSize * uPR;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uFade; varying float vA;
      void main(){
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(vec3(0.94,0.94,0.98), a * vA * uFade);
      }`,
  });
  return new THREE.Points(geo, mat);
}

// ---------------------------------------------------------------------------
// Morphing particle system
// shapes: 0 scatter · 1 atom orbits · 2 ground-station dish · 3 data terrain · 4 scatter
// ---------------------------------------------------------------------------
const GRID = 96;
const COUNT = GRID * GRID;

function buildDish() {
  // Paraboloid dish in local frame, opening toward +Y, then tilted toward the sky.
  const f = 0.62;
  const R = 1.45;
  const pts = [];
  const beam = new Float32Array(COUNT);
  const add = (x, y, z) => pts.push(new THREE.Vector3(x, y, z));
  const rings = 15;
  const perRing = 300;
  for (let r = 1; r <= rings; r++) {
    const rad = (r / rings) * R;
    for (let i = 0; i < perRing; i++) {
      const a = (i / perRing) * Math.PI * 2;
      add(Math.cos(a) * rad, (rad * rad) / (4 * f), Math.sin(a) * rad);
    }
  }
  const spokes = 28;
  for (let s = 0; s < spokes; s++) {
    const a = (s / spokes) * Math.PI * 2;
    for (let i = 0; i < 70; i++) {
      const rad = (i / 69) * R;
      add(Math.cos(a) * rad, (rad * rad) / (4 * f), Math.sin(a) * rad);
    }
  }
  // Feed struts from rim to focus
  const rimY = (R * R) / (4 * f);
  for (let s = 0; s < 4; s++) {
    const a = (s / 4) * Math.PI * 2 + Math.PI / 4;
    for (let i = 0; i < 160; i++) {
      const t = i / 159;
      add(Math.cos(a) * R * (1 - t), rimY + (f * 1.25 - rimY) * t, Math.sin(a) * R * (1 - t));
    }
  }
  // Feed horn cluster
  for (let i = 0; i < 220; i++) {
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * 0.09;
    add(Math.cos(u) * v, f * 1.25 + (Math.random() - 0.5) * 0.12, Math.sin(u) * v);
  }
  // Pedestal (this sits below the tilted dish; added after tilt)
  const tilt = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.15, 0, 0.62));
  const dishPts = pts.map((p) => p.applyQuaternion(tilt));
  for (let i = 0; i < 500; i++) {
    const t = i / 499;
    dishPts.push(new THREE.Vector3((Math.random() - 0.5) * 0.06, -t * 1.7, (Math.random() - 0.5) * 0.06));
  }
  for (let i = 0; i < 420; i++) {
    const a = (i / 420) * Math.PI * 2;
    dishPts.push(new THREE.Vector3(Math.cos(a) * 0.55, -1.7, Math.sin(a) * 0.55));
  }
  const focus = new THREE.Vector3(0, f * 1.25, 0).applyQuaternion(tilt);
  const axis = new THREE.Vector3(0, 1, 0).applyQuaternion(tilt).normalize();
  // Remaining particles become the telemetry beam (animated in shader)
  const out = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    if (i < dishPts.length) {
      out.set([dishPts[i].x, dishPts[i].y, dishPts[i].z], i * 3);
    } else {
      out.set([focus.x, focus.y, focus.z], i * 3);
      beam[i] = 0.001 + Math.random();
    }
  }
  return { positions: out, beam, focus, axis };
}

function createParticles() {
  const geo = new THREE.BufferGeometry();
  const scatter = new Float32Array(COUNT * 3);
  const orbit = new Float32Array(COUNT * 3);
  const terrain = new Float32Array(COUNT * 3);
  const rand = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    const r = 3 + Math.pow(Math.random(), 0.6) * 7;
    const u = Math.random() * 2 - 1;
    const t = Math.random() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    scatter.set([r * s * Math.cos(t), r * u * 0.6, r * s * Math.sin(t) - 2], i * 3);
    // orbit: ring index, angle, radial jitter
    orbit.set([i % 3, Math.random() * Math.PI * 2, (Math.random() - 0.5) * 0.05], i * 3);
    const gx = (i % GRID) / (GRID - 1) - 0.5;
    const gz = Math.floor(i / GRID) / (GRID - 1) - 0.5;
    terrain.set([gx * 7.5, 0, gz * 7.5], i * 3);
    rand[i] = Math.random();
  }
  const dish = buildDish();
  geo.setAttribute('position', new THREE.BufferAttribute(scatter, 3));
  geo.setAttribute('aOrbit', new THREE.BufferAttribute(orbit, 3));
  geo.setAttribute('aDish', new THREE.BufferAttribute(dish.positions, 3));
  geo.setAttribute('aBeam', new THREE.BufferAttribute(dish.beam, 1));
  geo.setAttribute('aTerrain', new THREE.BufferAttribute(terrain, 3));
  geo.setAttribute('aRand', new THREE.BufferAttribute(rand, 1));

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uOpacity: { value: 0 },
      uPR: { value: 1 },
      uFocus: { value: dish.focus },
      uAxis: { value: dish.axis },
    },
    vertexShader: /* glsl */ `
      attribute vec3 aOrbit; attribute vec3 aDish; attribute float aBeam; attribute vec3 aTerrain; attribute float aRand;
      uniform float uTime; uniform float uMorph; uniform float uPR; uniform vec3 uFocus; uniform vec3 uAxis;
      varying float vA;
      ${NOISE}
      mat3 rotX(float a){float c=cos(a),s=sin(a);return mat3(1,0,0,0,c,s,0,-s,c);}
      mat3 rotZ(float a){float c=cos(a),s=sin(a);return mat3(c,s,0,-s,c,0,0,0,1);}
      mat3 rotY(float a){float c=cos(a),s=sin(a);return mat3(c,0,-s,0,1,0,s,0,c);}

      vec3 orbitPos(){
        float k = aOrbit.x;
        float speed = 0.16 + k * 0.05;
        float ang = aOrbit.y + uTime * speed;
        // ~4% of particles bunch into moving "satellites"
        if (aRand < 0.045) ang = uTime * speed * 1.6 + k * 2.1 + (aRand - 0.0225) * 3.0;
        float a = 2.25 + k * 0.08; float b = 0.78 + k * 0.05;
        vec3 p = vec3(cos(ang) * a, 0., sin(ang) * b) * (1.0 + aOrbit.z);
        p.y += aOrbit.z * 0.6;
        p = rotZ(k * 2.0944 + 0.35) * rotX(0.28) * p;
        return p;
      }
      vec3 dishPos(){
        if (aBeam > 0.0) {
          float t = fract(aBeam + uTime * 0.18);
          vec3 side = normalize(cross(uAxis, vec3(0.,0.,1.)));
          vec3 up2 = cross(uAxis, side);
          float spread = t * 0.35;
          float ang = aRand * 6.2831;
          float pulse = step(0.5, fract(t * 6.0 - uTime * 0.5));
          return uFocus + uAxis * (t * 5.2) + (side * cos(ang) + up2 * sin(ang)) * spread * (0.4 + 0.6 * pulse);
        }
        return aDish;
      }
      vec3 terrainPos(){
        vec3 p = aTerrain;
        float h = snoise(vec3(p.x * 0.35, p.z * 0.35, uTime * 0.08)) * 0.55
                + sin(p.x * 1.4 + uTime * 0.6) * 0.12 + cos(p.z * 1.1 - uTime * 0.45) * 0.12;
        p.y = h;
        return rotX(0.5) * p;
      }
      float seg(float m, float i){ return smoothstep(0., 1., clamp((m - i) * 1.35 - aRand * 0.35, 0., 1.)); }

      void main(){
        vec3 s0 = position;
        vec3 s1 = orbitPos();
        vec3 s2 = dishPos();
        vec3 s3 = terrainPos();
        vec3 s4 = rotY(uTime * 0.02) * position * 1.2;
        float m = uMorph;
        vec3 p = mix(s0, s1, seg(m, 0.));
        p = mix(p, s2, seg(m, 1.));
        p = mix(p, s3, seg(m, 2.));
        p = mix(p, s4, seg(m, 3.));
        // turbulence while in transit
        float transit = sin(fract(m) * 3.14159);
        p += vec3(snoise(p * 0.8 + aRand * 10.), snoise(p * 0.8 + 3.3), snoise(p * 0.8 + 7.1)) * transit * 0.35;

        vec4 mv = modelViewMatrix * vec4(p, 1.);
        gl_Position = projectionMatrix * mv;
        float sz = (aRand < 0.045 && m > 0.5 && m < 1.5) ? 2.6 : 1.0 + aRand * 0.9;
        gl_PointSize = sz * uPR * (7.5 / -mv.z) * 1.6;
        // feather the terrain grid's edges so it dissolves into space
        float edge = 1.0 - smoothstep(2.2, 3.75, max(abs(aTerrain.x), abs(aTerrain.z)));
        float inTerrain = seg(m, 2.) * (1.0 - seg(m, 3.));
        vA = (0.45 + aRand * 0.55) * mix(1.0, edge, inTerrain);
      }`,
    fragmentShader: /* glsl */ `
      uniform float uOpacity; varying float vA;
      void main(){
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.05, d);
        gl_FragColor = vec4(vec3(0.94,0.94,0.98), a * vA * uOpacity);
      }`,
  });
  return new THREE.Points(geo, mat);
}

// ---------------------------------------------------------------------------
// Scene controller
// ---------------------------------------------------------------------------
export const defaults = {
  px: 2.3, py: -6.5, pz: -1.5, ps: 4.6, po: 1, // planet position / scale / opacity
  sx: 0.35, sy: 0.9, sz: -0.4, // sun direction
  gx: 2.2, gy: 0, gz: 0, gs: 1, grx: 0, // particle group
  morph: 0, pop: 0, // particle morph + opacity
  sunrise: 0,
  stars: 1,
};

export function createScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 1);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 400);
  camera.position.set(0, 0, 8);

  const stars = createStars();
  scene.add(stars);

  const planet = createPlanet();
  scene.add(planet.group);

  const flare = createFlare();
  scene.add(flare);

  const particles = createParticles();
  const pGroup = new THREE.Group();
  pGroup.add(particles);
  scene.add(pGroup);

  const target = { ...defaults };
  const cur = { ...defaults };
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  let velocity = 0;
  let pr = 1;

  const resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    pr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(pr);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // keep the composition from cropping too hard on portrait screens
    camera.fov = w / h < 0.8 ? 50 : 35;
    camera.updateProjectionMatrix();
    stars.material.uniforms.uPR.value = pr;
    particles.material.uniforms.uPR.value = pr;
  };
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('pointermove', (e) => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
  });

  const sun = new THREE.Vector3();
  const clock = new THREE.Clock();
  let raf = 0;

  const tick = () => {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    const k = 1 - Math.pow(0.02, dt); // frame-rate independent damping
    for (const key in target) cur[key] += (target[key] - cur[key]) * k;
    mouse.x += (mouse.tx - mouse.x) * k * 0.6;
    mouse.y += (mouse.ty - mouse.y) * k * 0.6;

    camera.position.x = mouse.x * 0.18;
    camera.position.y = -mouse.y * 0.12;
    camera.lookAt(0, 0, 0);

    // planet
    planet.group.position.set(cur.px, cur.py, cur.pz);
    planet.group.scale.setScalar(cur.ps);
    planet.surface.rotation.x = 0.85;
    planet.surface.rotation.y = t * 0.018;
    planet.surface.material.uniforms.uTime.value = t;
    planet.surface.material.uniforms.uOpacity.value = cur.po;
    planet.group.visible = cur.po > 0.01;
    sun.set(cur.sx, cur.sy, cur.sz).normalize();
    planet.surface.material.uniforms.uSun.value.copy(sun);

    // sunrise flare sits just behind the planet's upper limb
    flare.position.set(cur.px, cur.py + cur.ps * 0.985, cur.pz - cur.ps * 0.35);
    flare.scale.setScalar(0.6 + cur.sunrise * 0.6);
    flare.material.uniforms.uIntensity.value = cur.sunrise * cur.po;
    flare.visible = cur.sunrise > 0.01;
    flare.lookAt(camera.position);

    // particles
    pGroup.position.set(cur.gx, cur.gy, cur.gz);
    pGroup.scale.setScalar(cur.gs);
    pGroup.rotation.x = cur.grx;
    pGroup.rotation.y = mouse.x * 0.12;
    const pm = particles.material.uniforms;
    pm.uTime.value = t;
    pm.uMorph.value = cur.morph;
    pm.uOpacity.value = cur.pop;
    particles.visible = cur.pop > 0.01;

    // stars drift, and streak a little with scroll velocity
    velocity *= 0.92;
    stars.rotation.y = t * 0.004 + mouse.x * 0.02;
    stars.rotation.x += velocity * 0.00002;
    stars.material.uniforms.uTime.value = t;
    stars.material.uniforms.uFade.value = cur.stars;

    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  };

  return {
    start() {
      if (!raf) raf = requestAnimationFrame(tick);
    },
    renderOnce() {
      renderer.render(scene, camera);
    },
    set(state) {
      Object.assign(target, state);
    },
    jump(state) {
      Object.assign(target, state);
      Object.assign(cur, state);
    },
    nudge(v) {
      velocity += v;
    },
  };
}
