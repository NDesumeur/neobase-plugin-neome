// NeoMe : ton compagnon d'origine (code inchangé), livré en plugin avec ses 25 images et son style.
// Son état (nom, niveau, humeur…) est dans le dossier du plugin, que NeoDex sauvegarde (synchro cloud comprise) ; à la première ouverture il reprend ton NeoMe d'avant.
// Il demande l'accès complet pour vivre dans la page de NeoDex. NeoDex ne le charge que s'il est signé.
const HTML = "<div class=\"appWrap\"><div class=\"agHead\"><span class=\"label\">NeoMe</span></div><div class=\"hint\">NeoMe vit sur l'accueil de NeoDex et se balade dans la barre des tâches : clique-le, chatouille-le, nourris-le et joue à la balle avec lui (clic droit).</div><div class=\"row\"><button class=\"btn main px\" id=\"nmToggle\">MONTRER / CACHER NEOME</button></div></div>";
const PET_CSS = `/* NeoMe, the pet of the home page (pet.js): its pictures, and its motions */
#pet{position:fixed;left:20px;bottom:-16px;z-index:40;user-select:none}
#pet img{display:block;width:181px;height:auto;cursor:var(--cp,pointer);touch-action:none;filter:drop-shadow(0 6px 6px rgba(0,0,0,.45));transform-origin:50% 85%}
#pet.toBar img{opacity:.75;scale:.6;transition:scale .15s,opacity .15s}
body.browsing #pet,body.browsing .petBall,body.browsing .petBallShadow,body.browsing .petMenu{display:none!important}
.nm-breathe{animation:nmBreathe 3.2s ease-in-out infinite} @keyframes nmBreathe{50%{transform:scale(1.02,.98) translateY(1px)}}
.nm-sleep{animation:nmBreathe 4.5s ease-in-out infinite}
.nm-hop{animation:nmHop .6s cubic-bezier(.3,.7,.4,1.4)} @keyframes nmHop{0%{transform:scale(1.06,.92)}35%{transform:translateY(-22px) scale(.96,1.05)}70%{transform:translateY(0) scale(1.05,.95)}100%{transform:none}}
.nm-bounce{animation:nmHop .5s cubic-bezier(.3,.7,.4,1.4) infinite}
.nm-dance{animation:nmDance .52s ease-in-out infinite} @keyframes nmDance{0%,100%{transform:rotate(-6deg) translateY(0)}25%{transform:rotate(0) translateY(-8px)}50%{transform:rotate(6deg) translateY(0)}75%{transform:rotate(0) translateY(-8px)}}
.nm-float{animation:nmFloat 1.6s ease-in-out infinite} @keyframes nmFloat{50%{transform:translateY(-8px) scale(1.03)}}
.nm-jolt{animation:nmJolt .45s cubic-bezier(.2,1.6,.4,1)} @keyframes nmJolt{0%{transform:scale(.92,1.08)}30%{transform:translateY(-14px) scale(1.06,.95)}100%{transform:none}}
.nm-tilt{animation:nmTilt 2s ease-in-out infinite} @keyframes nmTilt{0%,100%{transform:rotate(0)}30%,70%{transform:rotate(-8deg)}}
.nm-lean{animation:nmLean 1.8s ease-in-out infinite} @keyframes nmLean{50%{transform:rotate(7deg) translateY(-4px)}}
.nm-shake{animation:nmShake .12s linear infinite} @keyframes nmShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px) rotate(-2deg)}75%{transform:translateX(3px) rotate(2deg)}}
.nm-tremble{animation:nmShake .08s linear infinite}
.nm-droop{animation:nmDroop 2.6s ease-in-out infinite} @keyframes nmDroop{50%{transform:translateY(4px) scale(1.03,.96)}}
.nm-dizzy{animation:nmDizzy .9s ease-in-out infinite} @keyframes nmDizzy{0%,100%{transform:rotate(-12deg)}50%{transform:rotate(12deg)}}
.nm-shy{animation:nmShy 1.4s ease-in-out infinite} @keyframes nmShy{0%,100%{transform:rotate(0) scale(1)}50%{transform:rotate(-4deg) scale(.97,1.02)}}
.nm-sway{animation:nmSway 2.4s ease-in-out infinite} @keyframes nmSway{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg) translateY(-2px)}}
.nm-squish{animation:nmSquish .9s ease-in-out infinite} @keyframes nmSquish{50%{transform:scale(1.08,.9)}}
.nm-ko{animation:nmKo .7s ease-out forwards} @keyframes nmKo{60%{transform:rotate(18deg) translateY(4px)}100%{transform:rotate(12deg) translateY(6px)}}
.nm-glitch{animation:nmGlitch .3s steps(2) infinite} @keyframes nmGlitch{0%{transform:translate(0);filter:none}25%{transform:translate(-4px,1px) skewX(6deg)}50%{transform:translate(3px,-2px);filter:hue-rotate(90deg)}75%{transform:translate(-2px,2px) skewX(-4deg)}}
@media (prefers-reduced-motion:reduce){#pet img{animation:none!important}}
.petBubble{position:absolute;left:50%;bottom:calc(100% - 10px);transform:translateX(-50%) scale(.6);opacity:0;pointer-events:none;white-space:nowrap;background:var(--win);color:#fff;font:15px var(--text);padding:7px 12px;box-shadow:0 0 0 2px var(--line2),0 3px 0 2px #05010b;transition:opacity .15s,transform .15s steps(3)}
.petBubble.on{opacity:1;transform:translateX(-50%) scale(1)} .petBubble::after{content:'';position:absolute;left:50%;top:100%;margin-left:-5px;border:5px solid transparent;border-top-color:var(--line2)}
.petFood{position:absolute;width:20px;height:20px;transition:top .6s cubic-bezier(.5,0,1,1);background:radial-gradient(circle at 35% 35%,#f6c37a 0 30%,#d08a3a 31% 60%,transparent 61%);box-shadow:inset 0 0 0 2px #5a2e10;border-radius:50%}
.petBall{position:fixed;left:0;top:0;width:22px;height:22px;z-index:41;cursor:var(--cg,grab);touch-action:none;border-radius:50%;box-shadow:0 0 0 2px #05010b,inset -4px -4px 0 rgba(0,0,0,.25);
  background:radial-gradient(circle at 32% 30%,#fff 0 14%,transparent 15%),conic-gradient(var(--magenta) 0 25%,var(--pink) 0 50%,var(--magenta) 0 75%,var(--pink) 0)} .petBall.held{cursor:var(--cgg,grabbing)}
.petBallShadow{position:fixed;left:0;top:0;width:24px;height:7px;z-index:39;border-radius:50%;background:rgba(0,0,0,.55);pointer-events:none}
.petBall.fade,.petBallShadow.fade{opacity:0!important;transition:opacity .5s}
.petMenu{position:fixed;z-index:200;display:flex;flex-direction:column;gap:4px;min-width:220px;padding:12px;background:var(--win);box-shadow:0 0 0 2px var(--line2),0 4px 0 2px #05010b}
.petMenu button{all:unset;cursor:var(--cp,pointer);padding:6px 8px;color:var(--shell);font:15px var(--text)} .petMenu button:hover{background:rgba(var(--pkr),.2);color:#fff}
.petTitle{font:9px var(--title);color:var(--lilac);margin-bottom:6px} .petStat{display:grid;grid-template-columns:70px 1fr;align-items:center;gap:8px;font-size:13px;color:var(--muted)}
.petStat b{height:8px;background:rgba(0,0,0,.35);box-shadow:inset 0 0 0 1px var(--line2)} .petStat i{display:block;height:100%;background:var(--magenta)} .petMenu input{font:15px var(--text);padding:6px}
.petCos{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;transform-origin:50% 85%}
.petCos .cosL,.nmDoll .cosL,.nmMini .cosL{position:absolute;left:0;top:0;width:100%;height:auto;pointer-events:none}
#pet .petCos .cosL:not([data-hp]){filter:none}
.hpRainbow{animation:hpHue 4s linear infinite} @keyframes hpHue{to{filter:hue-rotate(360deg)}}
@keyframes nmRainbow{0%{filter:drop-shadow(0 0 9px #ff4fa8) drop-shadow(0 6px 6px rgba(0,0,0,.45))}33%{filter:drop-shadow(0 0 9px #5ec8ff) drop-shadow(0 6px 6px rgba(0,0,0,.45))}66%{filter:drop-shadow(0 0 9px #ffd84a) drop-shadow(0 6px 6px rgba(0,0,0,.45))}}
#pet.aura-rainbow>img,.nmApp .aura-rainbow>img:first-child{animation:nmRainbow 3s infinite!important}
.nmApp .nmXp{height:12px;min-width:220px;background:rgba(0,0,0,.35);box-shadow:inset 0 0 0 2px var(--line2);margin:6px 0}.nmApp .nmXp i{display:block;height:100%;background:var(--pink)}
.nmApp .nmDress{display:flex;gap:22px;align-items:flex-start;flex-wrap:wrap;margin-top:14px}
.nmApp .nmStage{position:sticky;top:10px;display:flex;flex-direction:column;align-items:center;gap:12px;padding:20px 20px 14px;background:radial-gradient(circle at 50% 58%,rgba(var(--pkr),.22),transparent 68%),rgba(0,0,0,.25);box-shadow:inset 0 0 0 2px var(--line2)}
.nmApp .nmDoll,.nmApp .nmMini{position:relative;line-height:0}.nmApp .nmDoll{width:256px}.nmApp .nmMini{width:76px}
.nmApp .nmDoll>img:first-child,.nmApp .nmMini>img:first-child{width:100%;height:auto;filter:drop-shadow(0 6px 6px rgba(0,0,0,.45))}
.nmApp .nmSide{flex:1;min-width:280px}.nmApp .nmTabs{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}
.nmApp .nmTab{all:unset;cursor:var(--cp,pointer);padding:5px 10px;font:13px var(--text);color:var(--muted);box-shadow:inset 0 0 0 2px var(--line2)}.nmApp .nmTab.on,.nmApp .nmTab:hover{color:#fff;box-shadow:inset 0 0 0 2px var(--pink)}
.nmApp .nmWard{display:grid;grid-template-columns:repeat(auto-fill,minmax(108px,1fr));gap:8px}
.nmApp .nmItem{all:unset;cursor:var(--cp,pointer);display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 6px;background:rgba(0,0,0,.25);box-shadow:inset 0 0 0 2px var(--line2);font:13px var(--text);color:var(--shell);text-align:center}
.nmApp .nmItem:hover{background:rgba(var(--pkr),.12)}.nmApp .nmItem.on{box-shadow:inset 0 0 0 2px var(--pink);color:#fff}
.nmApp .nmItem.locked{cursor:default}.nmApp .nmItem.locked .nmMini{opacity:.4;filter:grayscale(.7)}.nmApp .nmItem small{color:var(--muted)}.nmApp h3{font:10px var(--title);color:var(--lilac);margin:0 0 10px}`;
export default async function (ctx) {
  const view = ctx.view;
  if (!ctx.host) { view.textContent = "Ce plugin doit être approuvé par NeoDex pour s'ouvrir."; return; }
  const host = ctx.host, { el, sfx, ask, newTab, pixIcon, PIX, WX } = host;  // (toast et showTab : ceux de la page, NeoMe les enveloppe comme avant)
  const folder = ctx.folder;
  const $ = id => document.getElementById(id);
  const W2 = new URLSearchParams(location.search).get('w2');  // une 2e fenêtre : pas de NeoMe dedans
  const doc = async n => { try { return await folder.read(n); } catch { return null; } };
  const __storeGet = async n => {
    let d = await doc(n);
    if (d == null) { try { d = await neo.storeGet(n); } catch { d = null; } if (d != null) await folder.write(n, d); }  // première ouverture : tu retrouves ton NeoMe d'avant
    return d;
  };
  const __storeSet = async (n, d) => { await folder.write(n, d); return true; };
  if (!document.getElementById('petStyle')) { const st = document.createElement('style'); st.id = 'petStyle'; st.textContent = PET_CSS; document.head.append(st); }
  view.innerHTML = HTML;
  const __imgs = {};  // les 25 images livrées avec le plugin
  const __b64 = {};
  await Promise.all(["1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png","10.png","11.png","12.png","13.png","14.png","15.png","16.png","17.png","18.png","19.png","20.png","21.png","22.png","23.png","24.png","25.png"].map(async n => { const b = await neo.pluginFileRead(ctx.id, 'img/' + n); __b64[n] = b; __imgs[n] = URL.createObjectURL(new Blob([Uint8Array.from(atob(b), c => c.charCodeAt(0))], { type: 'image/png' })); }));
  // la barre des tâches (une autre fenêtre) reçoit les images dont elle a besoin
  neo.tbPetImgs?.(Object.fromEntries([1, 2, 3, 4, 8, 9, 10, 15, 17, 21, 22, 25].map(n => [n, 'data:image/png;base64,' + __b64[n + '.png']])));
  // ---- ton code d'origine ----
/* ---------- NeoMe, the pet of the home page: a little horned shadow with glowing eyes and headphones, in a broken egg shell.
   Its 25 expressions are pictures (web/pet/1..25.png, cut by tools/cut-neome.py); the motions are CSS animations on top (breathing,
   hops, trembling, dizzy sway, glitch...); it keeps the colours of its drawings.
   It lives: hunger, joy and energy go down with time (even while NeoDex is closed); it sleeps at night or when left alone, dances to
   NeoMusic, watches the search bar and the notifications, greets you when you come back home, and does small things by itself.
   You pet it (click), tickle it (double click), carry it (drag), shake the mouse over it, feed it and play ball with it (right click).
   Its state is the "pet" store (more-main.js), in the synced save: the same pet on every PC. ---------- */
const PETV = 4;  // the pictures' version: a new number when they are cut again, so no old copy is shown
// the expressions: picture number, motion, and what it can say
const NM = {
  idle: [1, 'breathe'], content: [2, 'hop'], love: [3, 'float'], sleep: [4, 'sleep'], surprised: [5, 'jolt'], confused: [6, 'tilt'], angry: [7, 'shake'],
  sad: [8, 'droop'], music: [9, 'dance'], wink: [10, 'hop'], amazed: [11, 'float'], dizzy: [12, 'dizzy'], laugh: [13, 'shake'], shy: [14, 'shy'], cool: [15, 'sway'],
  stressed: [16, 'tremble'], think: [17, 'tilt'], hug: [18, 'squish'], ko: [19, 'ko'], bug: [20, 'glitch'], bored: [21, 'droop'], curious: [22, 'lean'],
  joy: [23, 'bounce'], scared: [24, 'tremble'], hello: [25, 'hop'],
};
const petNew = () => ({name: 'NeoMe', born: Date.now(), xp: 0, food: 80, joy: 80, energy: 90, last: Date.now(), pos: null, hidden: false, pets: 0, meals: 0, ballBest: 0, inBar: false});
let pet = null, petBox = null, petImg = null, petCos = null, petSaveT = 0;
const petSt = {mode: 'idle', act: null, until: 0, sleeping: false, idleAt: Date.now(), nextIdle: Date.now() + 6000, hover: false, near: false, said: 0, ball: null, shake: [], lastDir: 0, combo: 0, lastPet: 0, dizzies: []};
const petLevel = xp => 1 + Math.floor(Math.sqrt(xp / 8));
console.assert(petLevel(0) === 1 && petLevel(8) === 2 && petLevel(32) === 3, 'petLevel');
const petClamp = v => Math.max(0, Math.min(100, v));
const petHour = () => petSt.hour ?? new Date().getHours();  // petSt.hour: a self-test can pretend it is day
const petNight = () => { const h = petHour(); return h >= 23 || h < 6; };
// time passing: about 10 h to get hungry, 13 h to get bored; energy comes back while it sleeps (or while you are away)
function petAge(now = Date.now()) {
  const min = Math.max(0, (now - pet.last) / 60000), away = min > 20;
  pet.food = petClamp(pet.food - min / 6); pet.joy = petClamp(pet.joy - min / 8);
  pet.energy = petClamp(pet.energy + (petSt.sleeping || away ? min / 2 : -min / 10));
  pet.last = now;
}
const petSave = () => { clearTimeout(petSaveT); petSaveT = setTimeout(() => __storeSet('pet', pet).catch(() => {}), 1500); };
function petXp(n) {
  const before = petLevel(pet.xp); pet.xp += n; petSave();
  const now = petLevel(pet.xp);
  if (now > before) { const got = COS.filter(c => c.lv > before && c.lv <= now); petAct('amazed', 2200); petSay('Niveau ' + now + ' !' + (got.length ? ' Nouveau : ' + got.map(c => c.name).join(', ') : '')); }
  nmRender();
}

/* ---------- showing an expression ---------- */
function petShowFace(name) {
  const [n, motion] = NM[name] || NM.idle;
  if (petImg.dataset.face !== name) { petImg.dataset.face = name; cosFace(n); }
  if (petImg.dataset.motion !== motion) { petImg.className = petCos.className = ''; void petImg.offsetWidth; petImg.className = 'nm-' + motion; petCos.className = 'petCos nm-' + motion; petImg.dataset.motion = motion; }  // restarts the motion (the cosmetics move with it)
  petSt.mode = name;
}
// an expression for a while, then back to the mood
function petAct(name, ms = 1500) { petSt.act = name; petSt.until = Date.now() + ms; petShowFace(name); }
const petMode = (m, ms) => m === 'sleep' ? (petSt.sleeping = true, petSt.act = null, petShowFace('sleep')) : m === 'idle' ? (petSt.act = null, petSt.until = 0, petShowFace('idle')) : petAct(m, ms);
const musicOn = () => (typeof pluginPlaying === 'function' && pluginPlaying());
// the mood when nothing special happens
function petMood() {
  if (petSt.sleeping) return 'sleep';
  if (musicOn()) return 'music';
  if (pet.food < 20) return 'sad';
  if (pet.joy < 20) return 'bored';
  if (petSt.hover) return 'shy';
  if (pet.energy < 15 || petNight()) return 'bored';
  if (petSt.near) return 'curious';
  return 'idle';
}
function petSay(text, ms = 3200) {
  const b = petBox.querySelector('.petBubble'); b.textContent = text; b.classList.add('on'); petSt.said = Date.now();
  clearTimeout(petSay.t); petSay.t = setTimeout(() => b.classList.remove('on'), ms);
}
function petWake() {
  if (!petSt.sleeping) return false;
  petSt.sleeping = false;
  if (petNight()) { petAct('angry', 1800); petSay('Mmh… il fait nuit…'); } else { petAct('content', 1500); petSay('Bien dormi !'); }
  return true;
}
const petActive = () => { petSt.idleAt = Date.now(); };
// the small things it does when nothing happens
function petIdle() {
  const tired = pet.energy < 40 || petNight();
  const list = [['wink', 1500, 3], ['cool', 2600, 2], ['confused', 2000, 2], ['curious', 2000, 2], ['amazed', 2000, 1], ['content', 1500, 2], ['think', 2600, 2],
    ['love', 2000, pet.joy > 80 ? 2 : 0], ['bored', 2400, tired ? 3 : 1], ['stressed', 1600, 1], ['bug', 900, .5], ['joy', 1400, pet.joy > 60 ? 1 : 0]];
  let n = Math.random() * list.reduce((s, x) => s + x[2], 0);
  for (const [name, ms, w] of list) { n -= w; if (n <= 0) { petAct(name, ms); if (name === 'bug') petSay('*bzzt*', 900); return; } }
}
function petTick() {
  if (!pet || pet.hidden || document.hidden || document.body.classList.contains('browsing')) return;
  const now = Date.now(), st = petSt, idle = now - st.idleAt;
  // falling asleep: left alone 4 min, at night after 1 min, or exhausted; waking up rested in the day
  if (!st.sleeping && !st.act && !st.ball && (idle > 240e3 || (petNight() && idle > 60e3) || pet.energy < 8)) { st.sleeping = true; petSay('Bonne nuit…', 2500); }
  if (st.sleeping && pet.energy >= 100 && !petNight()) petWake();
  if (st.act && now > st.until) st.act = null;
  // close to the mouse: it looks curious
  const r = petImg.getBoundingClientRect(), m = st.mouse;
  st.near = !!m && Math.hypot(m[0] - (r.left + r.width / 2), m[1] - (r.top + r.height / 2)) < 220;
  if (!st.act && !st.sleeping && !musicOn() && now > st.nextIdle) { petIdle(); st.nextIdle = now + 6000 + Math.random() * 8000; }
  if (!st.act && !st.sleeping && now - st.said > 90e3 && Math.random() < .02) {
    if (pet.food < 25) { petSay("J'ai faim… (clic droit : nourrir)"); petAct('sad', 2500); }
    else if (pet.joy < 25) { petSay('On joue ? (clic droit)'); petAct('bored', 2500); }
  }
  if (!st.act) petShowFace(petMood());
}
// every 30 s: time passes for its needs
function petLive() { if (!pet) return; petAge(); petSave(); }

/* ---------- what you do to it ---------- */
function petClick() {
  petActive(); if (petWake()) return;
  pet.joy = petClamp(pet.joy + 4); pet.pets++; petXp(1);
  petSt.combo = Date.now() - petSt.lastPet < 1500 ? petSt.combo + 1 : 1; petSt.lastPet = Date.now();
  if (petSt.combo >= 4) { petSt.combo = 0; petAct('love', 2000); petSay('♥ ♥ ♥', 1500); } else petAct(petSt.combo === 3 ? 'hug' : 'content', 1200);
  const n = pet.pets; if (n === 1 || n % 25 === 0) petSay(n === 1 ? 'Coucou ! Je suis ' + pet.name + ' !' : n + ' câlins ! ♥');
}
function petTickle() {
  petActive(); if (petWake()) return;
  pet.joy = petClamp(pet.joy + 6); petXp(2); petAct('laugh', 1600); petSay(['Hihihi !', 'Arrête, ça chatouille !', 'Hahaha !'][Math.random() * 3 | 0], 1500);
}
function petFeed() {
  petActive(); petWake();
  if (pet.food > 92) { petAct('bored', 1500); return petSay("J'ai plus faim !", 1800); }
  const c = el('div', 'petFood'); petBox.append(c);
  c.style.left = petImg.offsetWidth / 2 - 10 + 'px'; c.style.top = '-40px';
  petAct('surprised', 700);
  requestAnimationFrame(() => { c.style.top = petImg.offsetHeight * .45 + 'px'; });
  setTimeout(() => { c.remove(); pet.food = petClamp(pet.food + 30); pet.meals++; petXp(3); petAct('hug', 1600); petSay(['Miam !', 'Trop bon !', 'Merci !'][Math.random() * 3 | 0], 1800); setTimeout(() => petAct('joy', 1200), 1600); }, 650);
}
/* ---------- the ball game: you throw the ball (grab it and fling it, or click it), NeoMe runs after it and heads it back.
   Every save in a row is a combo; 3 balls on the floor and the game is over; the best combo is kept (pet.ballBest, synced).
   The ball lives on the home page only, between the tabs and the taskbar: opening a site, hiding NeoMe or Escape ends the game. ---------- */
function petBall() {
  petActive(); petWake(); if (petSt.ball) return;
  const b = el('div', 'petBall'), sh = el('div', 'petBallShadow'), r = petImg.getBoundingClientRect();
  document.body.append(sh, b);
  const s = petSt.ball = {el: b, sh, x: r.left + r.width / 2, y: r.top + 20, vx: 3 + Math.random() * 3, vy: -14, spin: 0, combo: 0, misses: 0, held: null, hitAt: 0, floorAt: 0, home: petBox.offsetLeft, squash: 0};
  petSay('Lance-moi la balle ! (attrape-la et jette-la)', 2600); petAct('amazed', 900);
  // the ground is where NeoMe sits (the bottom of its shell), wherever you put it; the ceiling is under the tabs
  const area = () => { const pr = petImg.getBoundingClientRect(); return {top: ($('tabstrip')?.getBoundingClientRect().bottom || 0) + 12, floor: Math.min(innerHeight - 14, pr.top + pr.height * .85 - 11), w: innerWidth}; };
  // grab it and throw it: the speed of the mouse when you let go
  b.onpointerdown = e => { e.stopPropagation(); e.preventDefault(); b.setPointerCapture(e.pointerId); s.held = {t: Date.now(), x: e.clientX, y: e.clientY, pts: [[e.clientX, e.clientY, Date.now()]]}; s.vx = s.vy = 0; };
  b.onpointermove = e => { if (!s.held) return; s.x = e.clientX; s.y = e.clientY; s.held.pts.push([e.clientX, e.clientY, Date.now()]); if (s.held.pts.length > 6) s.held.pts.shift(); };
  b.onpointerup = e => {
    if (!s.held) return; const p = s.held.pts, a = p[0], z = p[p.length - 1], dt = Math.max(16, z[2] - a[2]) / 16;
    if (Math.hypot(z[0] - s.held.x, z[1] - s.held.y) < 6) { s.vx = (Math.random() - .5) * 16; s.vy = -15 - Math.random() * 5; }  // a click: a kick up
    else { s.vx = Math.max(-30, Math.min(30, (z[0] - a[0]) / dt)); s.vy = Math.max(-32, Math.min(20, (z[1] - a[1]) / dt)); }
    s.held = null; s.thrown = true; petActive();
  };
  const key = e => { if (e.key === 'Escape') end('Partie finie.'); };
  s.end = end;
  addEventListener('keydown', key);
  // linger: the ball stays where it fell that many ms (still bouncing), then fades away
  function end(msg, linger = 0) {
    if (petSt.ball !== s || s.over) return;
    s.over = true; removeEventListener('keydown', key);
    const gone = () => { if (petSt.ball === s) petSt.ball = null; clearInterval(s.timer); b.remove(); sh.remove(); };
    if (linger) { setTimeout(() => { b.classList.add('fade'); sh.classList.add('fade'); setTimeout(gone, 500); }, linger); } else gone();
    petBox.style.transition = 'left .5s'; petBox.style.left = s.home + 'px'; setTimeout(() => { petBox.style.transition = ''; petShow(); }, 520);
    if (msg) petSay(msg, 3000);
  }
  const step = () => {
    if (petSt.ball !== s) return;
    if (document.body.classList.contains('browsing') || pet.hidden) { s.over = false; return end(''); }  // only on NeoDex's home page
    const A = area(), now = Date.now(), k = Math.min(4, (now - (s.last || now - 16)) / 16.7); s.last = now;  // k: frames of 60 Hz since the last step
    if (!s.held) {
      s.vy += .75 * k; s.x += s.vx * k; s.y += s.vy * k; s.vx *= .996 ** k; s.spin += s.vx * 2 * k;
      if (s.y < A.top) { s.y = A.top; s.vy = Math.abs(s.vy) * .6; }
      if (s.x < 12 || s.x > A.w - 12) { s.vx *= -.85; s.x = Math.max(12, Math.min(A.w - 12, s.x)); }
      if (s.y > A.floor) {  // on the floor: a bounce, and a ball NeoMe missed
        s.y = A.floor; s.squash = Math.min(.45, Math.abs(s.vy) / 30); s.vy *= -.62; s.vx *= .85;
        if (Math.abs(s.vy) < 2.5) s.vy = 0;
        if (s.thrown && !s.over && now - s.floorAt > 700 && now - s.hitAt > 300) {
          s.floorAt = now; s.misses++;
          if (s.combo >= 3) petSay('Combo de ' + s.combo + ' !', 1800);
          s.combo = 0; petAct(s.misses >= 3 ? 'sad' : 'confused', 1200);
          if (s.misses >= 3) {
            const best = Math.max(pet.ballBest || 0, s.best || 0), rec = (s.best || 0) > (pet.ballBest || 0);
            pet.ballBest = best; petSave(); if (rec) petAct('amazed', 2200);
            return end(rec ? 'Nouveau record : ' + best + ' de suite !' : 'Fin de la partie ! Record : ' + best, 3000);
          }
          petSay(['Raté !', 'Oups…', 'Encore une !'][s.misses - 1] || 'Raté !', 1400);
        }
      }
      s.squash *= .8;
      s.rest = !s.vy && Math.abs(s.vx) < .4 ? s.rest || now : 0;
      if (s.rest && now - s.rest > 3000 && !s.over) end(s.thrown ? 'Tu ne joues plus ? À plus tard !' : '', 1);  // left on the floor
    }
    // NeoMe runs under the ball, a little hop at each step (not once the game is lost)
    const pr = petImg.getBoundingClientRect(), pcx = pr.left + pr.width / 2, head = pr.top + pr.height * .3;
    if (!s.held && !s.over) {
      const want = Math.max(0, Math.min(A.w - pr.width, s.x - pr.width / 2 + s.vx * 6)), cur = petBox.offsetLeft, d = want - cur;
      if (Math.abs(d) > 4) { petBox.style.left = cur + Math.sign(d) * Math.min(Math.abs(d), 9 * k) + 'px'; petBox.style.bottom = petBox.style.bottom || ''; if (petSt.act !== 'joy' && petSt.act !== 'sad' && petSt.act !== 'confused') petAct('curious', 300); }
    }
    // the header: the ball falling on its head
    if (!s.held && !s.over && s.vy > 0 && Math.abs(s.x - pcx) < pr.width * .4 && s.y > head - 30 && s.y < head + 40 && now - s.hitAt > 350) {
      s.hitAt = now; s.combo++; s.best = Math.max(s.best || 0, s.combo);
      // sent back up; the more saves in a row, the wider it goes
      s.vy = -15 - Math.random() * 5; s.vx = Math.max(-14, Math.min(14, (A.w / 2 - s.x) / 200 + (Math.random() - .5) * (5 + s.combo * 1.2)));
      pet.joy = petClamp(pet.joy + 2); petXp(1); petAct('joy', 700);
      if (s.combo > 1) petSay('x' + s.combo + (s.combo > (pet.ballBest || 0) ? ' · record !' : ''), 900);
    }
    const sq = s.squash, sc = 1 - Math.min(1, (A.floor - s.y) / 600) * .5;
    b.style.transform = `translate(${s.x - 11}px, ${s.y - 11}px) rotate(${s.spin}deg) scale(${1 + sq}, ${1 - sq})`;
    sh.style.transform = `translate(${s.x - 12}px, ${A.floor + 8}px) scale(${sc})`; sh.style.opacity = .25 + sc * .35;
    b.classList.toggle('held', !!s.held);
  };
  s.timer = setInterval(step, 16);
}
function petMenu(x, y) {
  petActive();
  document.querySelector('.petMenu')?.remove();
  const m = el('div', 'petMenu px'), bar = (name, v) => { const r = el('div', 'petStat'), b = el('b'), g = el('i'); g.style.width = Math.round(v) + '%'; b.append(g); r.append(el('span', '', name), b); return r; };
  m.append(el('div', 'petTitle', pet.name + ' · niveau ' + petLevel(pet.xp)), bar('Ventre', pet.food), bar('Joie', pet.joy), bar('Énergie', pet.energy));
  const act = (label, f) => { const b = el('button', '', label); b.onclick = () => { m.remove(); f(); }; m.append(b); };
  act('Nourrir', petFeed); act('Jouer à la balle', petBall); act('Câlin', petClick);
  act(petSt.sleeping ? 'Réveiller' : 'Dormir', () => { if (!petWake()) { petSt.sleeping = true; petSt.act = null; petSay('Bonne nuit…', 2000); } });
  act('Renommer…', () => {
    const f = el('div', 'petMenu px'), i = Object.assign(el('input', 'f'), {value: pet.name, maxLength: 16}), ok = el('button', '', 'OK');
    const done = () => { const v = i.value.trim(); if (v) { pet.name = v; petSave(); petSay('Je m’appelle ' + v + ' !'); petAct('joy', 1200); } f.remove(); };
    ok.onclick = done; i.onkeydown = e => { if (e.key === 'Enter') done(); if (e.key === 'Escape') f.remove(); };
    f.append(el('div', 'petTitle', 'Son nom'), i, ok); Object.assign(f.style, {left: x + 'px', top: y + 'px'}); document.body.append(f); i.focus(); i.select();
  });
  act('Son niveau…', () => newTab('plugin:neodex.neome'));
  act('Mettre dans la barre des tâches', () => petToBar(true));
  act('Cacher (MENU pour le remettre)', () => { pet.hidden = true; petSave(); petShow(); });
  m.append(el('div', 'hint', `${pet.pets} câlins · ${pet.meals} repas · record à la balle : ${pet.ballBest || 0} · né le ${new Date(pet.born).toLocaleDateString('fr-FR')}`));
  document.body.append(m);
  Object.assign(m.style, {left: Math.min(x, innerWidth - m.offsetWidth - 8) + 'px', top: Math.max(8, Math.min(y, innerHeight - m.offsetHeight - 8)) + 'px'});
  setTimeout(() => addEventListener('pointerdown', function off(e) { if (!m.contains(e.target)) { m.remove(); removeEventListener('pointerdown', off, true); } }, true));
}
// NeoMe in the taskbar: it walks there, tiny (taskbar.js); the bar gets its mood
function petBarMood() {
  if (petSt.sleeping || (petNight() && Date.now() - petSt.idleAt > 60e3)) return 'sleep';
  if (musicOn()) return 'music';
  if (pet.food < 20) return 'sad';
  if (pet.joy < 20 || pet.energy < 15) return 'bored';
  return 'idle';
}
let petBarSent = '';
function petBarSync(force) {
  const d = {on: !!pet.inBar && !pet.hidden, mood: petBarMood()}, k = JSON.stringify(d);
  if (force || k !== petBarSent) { petBarSent = k; neo.tbPet(d); }
}
async function petToBar(on) {
  if (on && !(await neo.tbInfo().catch(() => ({}))).on) { toast("La barre des tâches n'est pas affichée (MENU > Barre des tâches)"); petAct('confused', 1500); return false; }
  pet.inBar = on; petSave(); petShow(); petBarSync(true);
  if (on) toast(pet.name + ' se balade dans la barre des tâches (double-clic dessus pour le faire revenir)');
  else { pet.pos = null; petShow(); petAct('hello', 2000); petSay('Me revoilà !'); }
  return true;
}
function petShow() {
  petBox.style.display = pet.hidden || pet.inBar ? 'none' : '';
  const p = pet.pos; if (p) Object.assign(petBox.style, {left: Math.round(p.x * innerWidth) + 'px', top: Math.round(p.y * innerHeight) + 'px', bottom: 'auto'});
}

/* ---------- setting up: the element, the pointer, the hooks into NeoDex ---------- */
async function petStart() {
  pet = {...petNew(), ...(await __storeGet('pet').catch(() => null) || {})};
  if (pet.name === 'Osu') pet.name = 'NeoMe';  // the first pet's name
  petAge();
  for (const [n] of Object.values(NM)) { new Image().src = __imgs[n + '.png']; }  // all the expressions ready: no blink when it changes face
  petBox = el('div'); petBox.id = 'pet';
  petImg = el('img'); petImg.alt = ''; petImg.draggable = false;
  petCos = el('div', 'petCos');
  petBox.append(el('div', 'petBubble'), petImg, petCos); document.body.append(petBox); cosWear();
  petShowFace('idle'); petShow();
  // click / double click / drag / right click
  let down = null, clickT = 0;
  petImg.onpointerdown = e => {
    if (e.button) return;
    const r = petBox.getBoundingClientRect(); down = {x: e.clientX, y: e.clientY, dx: e.clientX - r.left, dy: e.clientY - r.top, drag: false};
    petImg.setPointerCapture(e.pointerId);
  };
  petImg.onpointermove = e => {
    if (!down) return;
    if (!down.drag && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 5) { down.drag = true; petWake(); petAct('scared', 864e5); petSay('Waaah !', 1200); }
    if (down.drag) { const low = e.clientY >= innerHeight - Math.max(30, parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tbH')) || 0); petBox.classList.toggle('toBar', low); if (low && !down.said) { down.said = true; petSay('Lâche-moi dans la barre !', 1500); } }
    if (down.drag) Object.assign(petBox.style, {left: Math.max(0, Math.min(innerWidth - 120, e.clientX - down.dx)) + 'px', top: Math.max(0, Math.min(innerHeight - 140, e.clientY - down.dy)) + 'px', bottom: 'auto'});
  };
  petImg.onpointerup = e => {
    if (!down) return; const d = down; down = null; petActive(); petBox.classList.remove('toBar');
    if (d.drag && e.clientY >= innerHeight - Math.max(30, parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tbH')) || 0)) { pet.pos = null; return petToBar(true); }
    if (d.drag) { const r = petBox.getBoundingClientRect(); pet.pos = {x: r.left / innerWidth, y: r.top / innerHeight}; petSave(); petAct('dizzy', 900); return; }
    if (clickT) { clearTimeout(clickT); clickT = 0; return petTickle(); }
    clickT = setTimeout(() => { clickT = 0; petClick(); }, 260);
  };
  petImg.oncontextmenu = e => { e.preventDefault(); petMenu(e.clientX, e.clientY); };
  petImg.onpointerenter = () => { petSt.hover = true; };
  petImg.onpointerleave = () => { petSt.hover = false; };
  // shaking the mouse hard over it: dizzy, and K.O. if it happens again soon
  addEventListener('pointermove', e => {
    petSt.mouse = [e.clientX, e.clientY];
    if (!petSt.hover || down) return;
    const dir = Math.sign(e.movementX), now = Date.now();
    if (dir && dir !== petSt.lastDir) { petSt.lastDir = dir; petSt.shake = petSt.shake.filter(t => now - t < 1200).concat(now); }
    if (petSt.shake.length >= 7 && petSt.act !== 'dizzy' && petSt.act !== 'ko') {
      petSt.shake = []; petWake(); petSt.dizzies = petSt.dizzies.filter(t => now - t < 15000).concat(now);
      if (petSt.dizzies.length >= 2) { petSt.dizzies = []; petAct('ko', 3500); petSay('K.O. …', 2500); } else { petAct('dizzy', 2600); petSay('La tête me tourne…', 2200); }
    }
  });
  // typing in the search bar: it thinks along
  $('search')?.addEventListener('input', () => { petActive(); if (!petSt.sleeping && petSt.act !== 'think') petAct('think', 2200); });
  // a notification: surprised (stressed if it is an error)
  if (typeof toast === 'function') { const real = toast; toast = function (msg, err) { real.apply(this, arguments); if (pet && !petSt.sleeping && !pet.hidden) petAct(err ? 'stressed' : 'surprised', 1400); }; }
  // coming back home after a while: hello!
  { const real = showTab; showTab = function (t) { const was = document.body.classList.contains('browsing'); real.apply(this, arguments);
    if (t) { if (!was) petSt.away = Date.now(); petSt.ball?.end(''); return; }
    if (was && petSt.away && Date.now() - petSt.away > 120e3 && pet && !pet.hidden) { petSt.away = 0; petWake(); petAct('hello', 2200); petSay(['Te revoilà !', 'Tu m’as manqué !', 'Coucou !'][Math.random() * 3 | 0]); petActive(); }
  }; }
  addEventListener('keydown', petActive); addEventListener('pointerdown', petActive);
  addEventListener('resize', () => petShow());
  // hello for the day
  setTimeout(() => { const h = petHour(); petAct('hello', 2200); petSay(h < 6 ? 'Encore debout ?' : h < 12 ? 'Bonjour !' : h < 18 ? 'Salut !' : 'Bonsoir !', 2500); }, 1200);
  setInterval(petTick, 250); setInterval(petLive, 30000);
  neo.onTbPetHome(() => petToBar(false));
  neo.onTbPetPoke(() => { pet.joy = petClamp(pet.joy + 2); pet.pets++; petXp(1); petActive(); });
  setInterval(() => pet.inBar && petBarSync(), 2000); petBarSync(true);
  addEventListener('beforeunload', () => { petAge(); __storeSet('pet', pet); });
}
const petToggle = () => { if (!pet) return; if (pet.inBar) return petToBar(false); pet.hidden = !pet.hidden; petSave(); petShow(); petBarSync(); toast(pet.hidden ? pet.name + ' se cache' : pet.name + ' est de retour !'); if (!pet.hidden) { petSay('Me revoilà !'); petAct('hello', 2000); } };
/* ---------- the wardrobe: cosmetics drawn by the Studio's AI on NeoMe himself (img/cos), unlocked by level, worn on the home page ---------- */
// each one is a 320 x 330 layer cut from « NeoMe wearing it », so it sits exactly on his picture; head things follow the head, shells and
// neck things the body (offsets per picture, in img/cos/items.json: offsets, body). A shell also gets, on the pictures whose shell rim is
// drawn higher, a small patch that covers that rim (img/cos/coq). Coloured headphones: only the magenta of his own (img/hp, one per picture), recoloured.
const COS_SLOTS = {yeux: 'Yeux', casque: 'Casque', cou: 'Cou', coquille: 'Coquille', aura: 'Aura'};
const COS_ORDER = ['coquille', 'cou', 'casque', 'yeux'];  // drawn from back to front
const COS_HEAD = new Set(['yeux']);
const COS_CODE = [
  {id: 'casque_cyan', slot: 'casque', name: 'Casque néon cyan', lv: 3, hp: 'hue-rotate(-100deg) saturate(1.2)'},
  {id: 'casque_citron', slot: 'casque', name: 'Casque citron', lv: 4, hp: 'hue-rotate(160deg) saturate(1.3) brightness(1.15)'},
  {id: 'casque_rouge', slot: 'casque', name: 'Casque rouge', lv: 6, hp: 'hue-rotate(68deg) saturate(1.4)'},
  {id: 'casque_bleu', slot: 'casque', name: 'Casque bleu électrique', lv: 8, hp: 'hue-rotate(-60deg) saturate(1.4)'},
  {id: 'casque_argent', slot: 'casque', name: 'Casque argenté', lv: 11, hp: 'grayscale(1) brightness(1.45) contrast(1.1)'},
  {id: 'casque_or', slot: 'casque', name: 'Casque doré', lv: 14, hp: 'sepia(1) saturate(4) hue-rotate(-12deg) brightness(1.1)'},
  {id: 'casque_arc', slot: 'casque', name: 'Casque arc-en-ciel', lv: 16, hp: 'rainbow'},
  {id: 'aura_rose', slot: 'aura', name: 'Aura rose', lv: 6, glow: '#ff4fa8'}, {id: 'aura_glace', slot: 'aura', name: 'Aura glacée', lv: 10, glow: '#5ec8ff'},
  {id: 'aura_or', slot: 'aura', name: 'Aura dorée', lv: 13, glow: '#ffd84a'}, {id: 'aura_arc', slot: 'aura', name: 'Aura arc-en-ciel', lv: 16, glow: 'rainbow'},
];
// shortcut: plus aucun cosmétique (ceux d'avant ne rendaient pas bien) ; le moteur reste pour une future série dessinée par le modèle du Studio
let COS = [], COS_OFF = {}, COS_BODY = {}, COQ = {};
const cosUrl = {}, __hp = {};
const blobUrl = async p => URL.createObjectURL(new Blob([Uint8Array.from(atob(await neo.pluginFileRead(ctx.id, p)), ch => ch.charCodeAt(0))], {type: 'image/png'}));
async function cosLoad() {
  const meta = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(await neo.pluginFileRead(ctx.id, 'img/cos/items.json')), ch => ch.charCodeAt(0))));
  COS_OFF = meta.offsets || {}; COS_BODY = meta.body || {}; COQ = meta.coq || {};
  COS = [...meta.items, ...COS_CODE].sort((a, b) => a.lv - b.lv);
  await Promise.all([...meta.items.map(async c => { cosUrl[c.id] = await blobUrl('img/cos/' + c.id + '.png'); }),
    ...Array.from({length: 25}, (_, i) => i + 1).map(async n => { __hp[n] = await blobUrl('img/hp/' + n + '.png'); })]);
}
const cosOn = () => (pet.wear && typeof pet.wear === 'object') ? pet.wear : (pet.wear = {});
const cosOk = c => !!c && petLevel(pet.xp) >= c.lv;
const cosWorn = () => Object.fromEntries(Object.entries(cosOn()).filter(([, id]) => cosOk(COS.find(o => o.id === id))));
const auraFilter = a => a && a.glow !== 'rainbow' ? `drop-shadow(0 0 9px ${a.glow}) drop-shadow(0 6px 6px rgba(0,0,0,.45))` : '';
// an outfit: the base picture and the layers on top; face: which of the 25 pictures
const cosAt = (i, [dx, dy], bb = [0, 0, 320, 330]) => Object.assign(i.style, {left: (bb[0] + dx) / 3.2 + '%', top: (bb[1] + dy) / 3.3 + '%', width: (bb[2] - bb[0]) / 3.2 + '%'});
// the patch of a shell for this picture (loaded the first time it is needed)
const coqUrl = {};
async function coqPatch(i, id, face) {
  const bb = COQ[id]?.[face]; i.hidden = !bb; if (!bb) return;
  const k = id + '@' + face; coqUrl[k] ??= blobUrl('img/cos/coq/' + k + '.png');
  i.src = await coqUrl[k]; cosAt(i, COS_BODY[face] || [0, 0], bb);
}
function cosLayers(box, base, wear, face = 1) {
  box.querySelectorAll('.cosL').forEach(n => n.remove());
  base.src = __imgs[face + '.png'];
  for (const slot of COS_ORDER) {
    const c = COS.find(o => o.id === wear[slot]); if (!c) continue;
    const src = c.hp ? __hp[face] : cosUrl[c.id]; if (!src) continue;
    const i = el('img', 'cosL' + (c.hp === 'rainbow' ? ' hpRainbow' : '')); i.src = src; i.alt = '';
    if (c.hp) { i.dataset.hp = 1; if (c.hp !== 'rainbow') i.style.filter = c.hp; }
    else if (COS_HEAD.has(slot)) { i.dataset.head = 1; cosAt(i, COS_OFF[face] || [0, 0]); }
    else { i.dataset.body = 1; cosAt(i, COS_BODY[face] || [0, 0]); }
    box.append(i);
    if (slot === 'coquille' && COQ[c.id]) { const p = el('img', 'cosL'); p.alt = ''; p.dataset.coq = c.id; box.append(p); coqPatch(p, c.id, face); }
  }
}
function cosFace(n) {  // the pet changes face: its base picture, its headphones, what sits on its head and its shell follow
  petImg.src = __imgs[n + '.png'];
  petCos.querySelectorAll('.cosL[data-hp]').forEach(i => { i.src = __hp[n]; });
  petCos.querySelectorAll('.cosL[data-head]').forEach(i => cosAt(i, COS_OFF[n] || [0, 0]));
  petCos.querySelectorAll('.cosL[data-body]').forEach(i => cosAt(i, COS_BODY[n] || [0, 0]));
  petCos.querySelectorAll('.cosL[data-coq]').forEach(i => coqPatch(i, i.dataset.coq, n));
}
// the taskbar (another window) gets NeoMe's pictures with his outfit drawn in
const TB_FACES = [1, 2, 3, 4, 8, 9, 10, 15, 17, 21, 22, 25];
const imgOf = src => new Promise((ok, ko) => { const i = new Image(); i.onload = () => ok(i); i.onerror = ko; i.src = src; });
async function cosBarImgs() {
  if (!neo.tbPetImgs) return;
  const wear = cosWorn(), a = COS.find(o => o.id === wear.aura), out = {};
  for (const n of TB_FACES) {
    const cv = document.createElement('canvas'); cv.width = 320; cv.height = 330; const g = cv.getContext('2d');
    g.filter = auraFilter(a) || (a?.glow === 'rainbow' ? 'drop-shadow(0 0 9px #b46bff)' : 'none'); g.drawImage(await imgOf(__imgs[n + '.png']), 0, 0); g.filter = 'none';
    for (const slot of COS_ORDER) {
      const c = COS.find(o => o.id === wear[slot]); if (!c) continue;
      const src = c.hp ? __hp[n] : cosUrl[c.id]; if (!src) continue;
      const [dx, dy] = c.hp ? [0, 0] : (COS_HEAD.has(slot) ? COS_OFF : COS_BODY)[n] || [0, 0];
      g.filter = c.hp ? (c.hp === 'rainbow' ? 'hue-rotate(120deg)' : c.hp) : 'none'; g.drawImage(await imgOf(src), dx, dy); g.filter = 'none';
      const bb = slot === 'coquille' && COQ[c.id]?.[n];
      if (bb) { const k = c.id + '@' + n; coqUrl[k] ??= blobUrl('img/cos/coq/' + k + '.png'); g.drawImage(await imgOf(await coqUrl[k]), bb[0] + dx, bb[1] + dy); }
    }
    out[n] = cv.toDataURL('image/png');
  }
  neo.tbPetImgs(out);
}
function cosWear() {
  if (!petCos || !pet) return;
  cosBarImgs().catch(e => console.error('NeoMe, barre des tâches :', e));
  const wear = cosWorn(), a = COS.find(o => o.id === wear.aura);
  cosLayers(petCos, petImg, wear, (NM[petSt.mode] || NM.idle)[0]);
  petBox.classList.toggle('aura-rainbow', a?.glow === 'rainbow'); petImg.style.filter = auraFilter(a);
}
function cosToggle(c) {
  if (!cosOk(c)) return;
  const on = cosOn(); on[c.slot] = on[c.slot] === c.id ? '' : c.id;
  petSave(); cosWear(); nmRender();
  if (on[c.slot]) { petAct('cool', 1800); petSay(['Trop classe !', 'Ça me va bien ?', 'Stylé !', 'J’adore !'][Math.random() * 4 | 0], 1800); }
}

/* ---------- the plugin's tab: its level and the wardrobe (a big NeoMe to dress, items by slot, hover one to try it on) ---------- */
let nmSlot = 'tout', nmTry = null;
function nmDoll(box, wear) {
  const a = COS.find(o => o.id === wear.aura), base = box.querySelector('img');
  cosLayers(box, base, wear); box.classList.toggle('aura-rainbow', a?.glow === 'rainbow'); base.style.filter = auraFilter(a);
}
function nmTryOn() {  // what the big NeoMe shows: what he wears, plus the item under the pointer 
  const w = cosWorn(); if (!nmTry) return w;
  return {...w, [nmTry.slot]: nmTry.id};
}
const nmPreview = () => { const box = view.querySelector('.nmDoll'); if (box) nmDoll(box, nmTryOn()); };
function nmRender() {
  const box = view.querySelector('#nmMain'); if (!box || !pet) return;
  const lv = petLevel(pet.xp), lo = 8 * (lv - 1) ** 2, hi = 8 * lv ** 2, on = cosOn(), next = COS.find(c => c.lv > lv);
  box.querySelector('.nmName').textContent = pet.name + ' · niveau ' + lv;
  box.querySelector('.nmXp i').style.width = Math.round((pet.xp - lo) / (hi - lo) * 100) + '%';
  box.querySelector('.nmXpTxt').textContent = `${pet.xp - lo} / ${hi - lo} XP vers le niveau ${lv + 1}` + (COS.length ? ` · ${COS.filter(c => c.lv <= lv).length} / ${COS.length} cosmétiques` : '') + (next ? ` · prochain : ${next.name} (niveau ${next.lv})` : '');
  box.querySelector('.nmTabs').replaceChildren(...['tout', ...Object.keys(COS_SLOTS)].map(s => {
    const b = el('button', 'nmTab' + (nmSlot === s ? ' on' : ''), s === 'tout' ? 'Tout' : COS_SLOTS[s]);
    b.onclick = () => { nmSlot = s; nmRender(); }; return b;
  }));
  const ward = box.querySelector('.nmWard'); ward.replaceChildren();
  for (const c of COS.filter(c => nmSlot === 'tout' || c.slot === nmSlot)) {
    const ok = cosOk(c), worn = on[c.slot] === c.id;
    const b = el('button', 'nmItem' + (ok ? '' : ' locked') + (worn ? ' on' : '')), mini = el('div', 'nmMini'), face = el('img');
    face.alt = ''; mini.append(face); nmDoll(mini, {[c.slot]: c.id});
    b.append(mini, el('span', '', c.name), el('small', '', !ok ? '🔒 niveau ' + c.lv : worn ? 'porté ✓' : COS_SLOTS[c.slot]));
    b.onclick = () => cosToggle(c);
    b.onpointerenter = () => { nmTry = c; nmPreview(); }; b.onpointerleave = () => { nmTry = null; nmPreview(); };
    ward.append(b);
  }
  nmPreview();
}
function nmView() {
  const box = el('div'); box.id = 'nmMain';
  box.innerHTML = `<div class="nmCard"><div><div class="label nmName"></div><div class="nmXp"><i></i></div><div class="hint nmXpTxt"></div>
    <div class="hint">Il gagne de l'XP quand tu t'occupes de lui : câlins, repas, balle, musique… </div></div></div>
    <div class="nmDress" hidden><div class="nmStage"><div class="nmDoll"><img alt=""></div><button class="btn px nmOff">Tout retirer</button></div>
    <div class="nmSide"><h3>GARDE-ROBE</h3><div class="nmTabs"></div><div class="nmWard"></div></div></div>`;
  box.querySelector('.nmDress').hidden = !COS.length;
  box.querySelector('.nmOff').onclick = () => { pet.wear = {}; petSave(); cosWear(); nmRender(); };
  const wrap = view.querySelector('.appWrap'); wrap.classList.add('nmApp'); wrap.append(box);
  nmRender();
}
if (window.neo && !W2) Promise.resolve().then(petStart).then(nmView).catch(e => console.error('pet:', e));
  // ---- fin ----
  view.querySelector('#nmToggle').onclick = () => petToggle();
  ctx.onClose(() => { document.getElementById('pet')?.remove(); document.getElementById('petStyle')?.remove(); });
}
