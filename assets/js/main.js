/* ================================================================
   ABUNDANCE LOGISTICS LTD. — Main JavaScript
   Site: abundancelogistics.com
   
   TABLE OF CONTENTS
   1.  Service Data (names, descriptions, features, images)
   2.  Wave & Ripple Animation Engine
   3.  Page Navigation (gp function — SPA routing)
   4.  Scroll-to-Team
   5.  Sticky Nav (scroll shadow)
   6.  Mobile Menu (burger toggle)
   7.  Careers Dropdown
   8.  Scroll Reveal (IntersectionObserver)
   9.  Stat Counters (count-up animation)
   10. Service Card Scroll (left/right arrows)
   11. Service Detail Modal (open/close)
   12. Apply / Careers Modal (open/close/submit)
   13. Contact Form Submit
   14. Newsletter Signup Submit
   15. Init (kicks everything off on load)
================================================================ */

(function(){
/* ── SERVICE DATA ── */
const S=[
  {n:'Service 01',t:'Transportation',img:'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=700&q=80',c:'We offer Full Truckload (FCL), Less-Than-Truckload (LCL), Flatbed, Intermodal and Specialty freight shipping options to both domestic and international clients. Our transportation networks allow us to manage regional, long-haul and international truck shipments in and out of most major global markets.',f:['Full Truckload (FCL)','Less-Than-Truckload (LCL)','Flatbed & Specialty','Intermodal Transport','Regional & Long-Haul','International Routes']},
  {n:'Service 02',t:'Ware Housing',img:'https://images.unsplash.com/photo-1553413077-190dd305871c?w=700&q=80',c:'We offer state-of-the-art warehousing facilities equipped with advanced technology for secure storage and inventory management. Whether you need short-term storage or long-term warehousing solutions, we have the capabilities to meet your needs.',f:['Short-Term Storage','Long-Term Warehousing','Inventory Management','Secure Facility','Tech-Enabled Tracking','Flexible Capacity']},
  {n:'Service 03',t:'3PL',img:'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=700&q=80',c:'Our third-party logistics services optimize supply chain efficiency and reduce costs for our clients. From inventory management to order fulfillment, we handle every aspect of logistics so you can focus on growing your business.',f:['Inventory Management','Order Fulfillment','Supply Chain Optimization','Cost Reduction','Dedicated Account Mgr','Scalable Solutions']},
  {n:'Service 04',t:'Air Freight',img:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=80',c:'Abundance Logistics provides top-tier airfreight solutions for cargo of all sizes through a vast global network of partners. Our dedicated air team ensures swift and secure transportation with advanced tracking technology.',f:['Express Air Cargo','Standard Air Freight','Air Import & Export','Advanced Tracking','Dangerous Goods','Time-Critical Solutions']},
  {n:'Service 05',t:'Sea Freight',img:'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=700&q=80',c:'Abundance Logistics offers comprehensive ocean freight solutions. Our expert team handles full container loads, less container loads, reefer containers, machinery, bulk loading, and RORO via Mombasa and Dar es Salaam.',f:['Full Container (FCL)','Less Container (LCL)','Reefer Containers','RORO Vehicles','Bulk Cargo','Port Clearance']},
  {n:'Service 06',t:'Customs Clearance',img:'https://images.unsplash.com/photo-1570126618953-d437176e8c79?w=700&q=80',c:'We handle all documentation and compliance requirements to ensure your goods are cleared quickly and efficiently. We work closely with the Uganda Revenue Authority and other government agencies for correct classification and timely processing.',f:['URA Compliance','Import Documentation','Export Documentation','Tariff Classification','Duty Management','Expedited Clearance']},
  {n:'Service 07',t:'Freight Forwarding',img:'https://images.unsplash.com/photo-1553413077-190dd305871c?w=700&q=80',c:'Our global transportation specialists coordinate standard and expedited air and ocean freight services. Through strategic partnerships with leading carriers worldwide, we provide customized international freight solutions.',f:['Air Freight Forwarding','Ocean Forwarding','Multimodal Solutions','Carrier Negotiation','Door-to-Door','Expedited Options']},
  {n:'Service 08',t:'Import / Export',img:'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=700&q=80',c:'Abundance Logistics offers comprehensive support for import and export operations, including documentation, compliance, and logistics management for both inbound and outbound international cargo.',f:['Import Documentation','Export Compliance','Trade Finance Support','Regulatory Advisory','Letter of Credit','Country Expertise']},
  {n:'Service 09',t:'Packing & Relocation',img:'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80',c:'Whether moving locally or internationally, our packing and relocation services make the process stress-free. Our experienced team handles packing, loading, transportation, and unloading.',f:['Professional Packing','Residential Relocation','Office & Commercial','International Moves','Loading & Unloading','Fragile Item Care']},
];

/* ================================================================
   WAVE & RIPPLE ANIMATION ENGINE
================================================================ */

function makeWaveSVG(color, opacity, h, speed, amplitude, phase){
  const dur=speed+'s'; const w=2000; const y1=h/2; const a=amplitude;
  const id='w'+Math.random().toString(36).slice(2,7);
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="position:absolute;top:0;left:0;width:200%;height:100%;pointer-events:none">
    <path d="M0,${y1} C80,${y1-a} 160,${y1+a} 240,${y1} C320,${y1-a} 400,${y1+a} 480,${y1} C560,${y1-a} 640,${y1+a} 720,${y1} C800,${y1-a} 880,${y1+a} 960,${y1} C1040,${y1-a} 1120,${y1+a} 1200,${y1} C1280,${y1-a} 1360,${y1+a} 1440,${y1} C1520,${y1-a} 1600,${y1+a} 1680,${y1} C1760,${y1-a} 1840,${y1+a} 1920,${y1} C1960,${y1-a} 2000,${y1+a} 2000,${y1}"
      fill="none" stroke="${color}" stroke-width="2.2" opacity="${opacity}">
      <animateTransform attributeName="transform" type="translate" from="${phase},0" to="${phase-1000},${a*0.3}" dur="${dur}" repeatCount="indefinite"/>
    </path>
    <path d="M0,${y1+a*0.5} C120,${y1-a*.7} 240,${y1+a*.9} 360,${y1+a*.2} C480,${y1-a*.8} 600,${y1+a*.6} 720,${y1} C840,${y1-a*.5} 960,${y1+a*.7} 1080,${y1+a*.1} C1200,${y1-a*.6} 1320,${y1+a*.4} 1440,${y1} C1560,${y1-a*.7} 1680,${y1+a*.5} 1800,${y1} C1920,${y1-a*.3} 2000,${y1+a*.4} 2000,${y1}"
      fill="none" stroke="${color}" stroke-width="1.4" opacity="${opacity*0.55}">
      <animateTransform attributeName="transform" type="translate" from="${-phase},0" to="${1000-phase},${-a*0.2}" dur="${speed*1.5}s" repeatCount="indefinite"/>
    </path>
    <path d="M0,${y1-a*0.3} C200,${y1+a*.5} 400,${y1-a*.4} 600,${y1+a*.3} C800,${y1-a*.6} 1000,${y1+a*.4} 1200,${y1-a*.2} C1400,${y1+a*.5} 1600,${y1-a*.3} 1800,${y1+a*.4} C1900,${y1-a*.2} 2000,${y1+a*.1} 2000,${y1}"
      fill="none" stroke="${color}" stroke-width="0.9" opacity="${opacity*0.35}">
      <animateTransform attributeName="transform" type="translate" from="0,0" to="-700,${a*0.15}" dur="${speed*2.2}s" repeatCount="indefinite"/>
    </path>
  </svg>`;
}

function makeRippleSVG(color, opacity, size, count){
  let c='';
  for(let i=0;i<count;i++){
    const delay=(i*(3.5/count)).toFixed(2);
    const r=(size*0.12)+(i*(size*0.1));
    c+=`<circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="${Math.max(0.5,1.8-i*0.3)}">
      <animate attributeName="r" values="${r*0.5};${r*1.5};${r*0.5}" dur="${3.2+i*0.6}s" begin="${delay}s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="${opacity};${opacity*0.1};${opacity}" dur="${3.2+i*0.6}s" begin="${delay}s" repeatCount="indefinite"/>
    </circle>`;
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="pointer-events:none">${c}</svg>`;
}

function spawnWave(laneEl, color, opacity, amplitude, speed, phase){
  if(!laneEl) return;
  laneEl.style.overflow='hidden';
  const h=parseInt(laneEl.style.height)||38;
  const d=document.createElement('div');
  d.style.cssText='position:absolute;inset:0;overflow:hidden;pointer-events:none';
  d.innerHTML=makeWaveSVG(color, opacity, h, speed, amplitude, phase||0);
  laneEl.appendChild(d);
}

function spawnRipple(laneEl, color, opacity, size, count, leftPct){
  if(!laneEl) return;
  const w=document.createElement('div');
  w.style.cssText=`position:absolute;left:${leftPct||50}%;top:50%;transform:translate(-50%,-50%);pointer-events:none`;
  w.innerHTML=makeRippleSVG(color, opacity, size, count);
  laneEl.appendChild(w);
}

// Lane wave configs: [id, color, opacity, amplitude, speed, phase]
[
  ['hero-truck-lane',  'rgba(2,31,56,.25)',    .6, 15, 7,  0],
  ['hero-ship-lane',   'rgba(2,31,56,.16)',    .4, 10, 12, 400],
  ['svc-truck-lane',   'rgba(2,31,56,.22)',    .55,16, 8,  0],
  ['svc-train-lane',   'rgba(2,31,56,.12)',    .3, 9,  14, 300],
  ['map-ship-lane',    'rgba(26,178,232,.5)',  .7, 20, 9,  0],
  ['team-truck-lane',  'rgba(2,31,56,.2)',     .5, 14, 10, 200],
  ['team-train-lane',  'rgba(2,31,56,.1)',     .28,8,  17, 500],
  ['nl-vehicle-lane',  'rgba(2,31,56,.2)',     .5, 14, 9,  0],
  ['cta-ship-lane',    'rgba(26,178,232,.42)', .65,22, 8,  0],
  ['footer-vehicle-lane','rgba(26,178,232,.3)',.5, 12, 13, 300],
].forEach(([id,c,o,a,s,p])=>spawnWave(document.getElementById(id),c,o,a,s,p));

// Plane lanes get ripples
[
  ['hero-plane-lane',  'rgba(2,31,56,.2)',     .38, 90, 4, 20],
  ['map-plane-lane',   'rgba(26,178,232,.45)', .6, 110, 5, 25],
  ['team-plane-lane',  'rgba(2,31,56,.18)',    .32, 80, 4, 75],
].forEach(([id,c,o,sz,cnt,lp])=>{
  const el=document.getElementById(id);
  if(el){ spawnRipple(el,c,o,sz,cnt,lp); spawnRipple(el,c,o*0.6,sz*0.7,cnt,100-lp); }
});

// Ambient ripples inside section backgrounds
function addAmbientRipples(secId, color, opacity, count){
  const sec=document.getElementById(secId); if(!sec) return;
  [[15,25],[80,60],[48,80],[70,18],[32,50]].slice(0,count).forEach(([l,t])=>{
    const d=document.createElement('div');
    d.style.cssText=`position:absolute;left:${l}%;top:${t}%;transform:translate(-50%,-50%);pointer-events:none;z-index:1;width:180px;height:180px`;
    d.innerHTML=makeRippleSVG(color, opacity, 180, 3);
    sec.appendChild(d);
  });
}
addAmbientRipples('hero',    'rgba(255,255,255,.1)', .3, 3);
addAmbientRipples('svc-sec', 'rgba(2,31,56,.08)',   .25,4);
addAmbientRipples('team-sec','rgba(255,255,255,.08)',.22,3);
addAmbientRipples('cta-sec', 'rgba(26,178,232,.12)',.3, 3);

/* ── PAGE NAV ── */
window.gp=function(id){
  document.querySelectorAll('.pg').forEach(p=>p.classList.remove('on'));
  const pg=document.getElementById('pg-'+id);
  if(pg)pg.classList.add('on');
  window.scrollTo({top:0,behavior:'smooth'});
  document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('act'));
  const m={home:0,about:1,services:2,contact:4};
  const ls=document.querySelectorAll('.nav-link:not(.nc-toggle)');
  if(m[id]!==undefined&&ls[m[id]])ls[m[id]].classList.add('act');
  document.getElementById('nc').classList.remove('open');
  setTimeout(()=>initReveal(),60);initCounters();
};

window.scrollToTeam=function(){
  setTimeout(()=>{
    const el=document.getElementById('team-sec');
    if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
  },110);
};

/* ── NAV ── */
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40),{passive:true});
const burger=document.getElementById('burger');
const mob=document.getElementById('mobnav');
burger.addEventListener('click',()=>{burger.classList.toggle('open');mob.classList.toggle('open');document.body.style.overflow=mob.classList.contains('open')?'hidden':''});
window.cm=function(){burger.classList.remove('open');mob.classList.remove('open');document.body.style.overflow=''};
window.toggleNC=function(e){e.stopPropagation();document.getElementById('nc').classList.toggle('open')};
document.addEventListener('click',()=>document.getElementById('nc').classList.remove('open'));

/* ── REVEAL ── */
function initReveal(){
  const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1,rootMargin:'0px 0px -36px 0px'});
  document.querySelectorAll('.sr:not(.in)').forEach(el=>io.observe(el));
}
window.initReveal=initReveal;

/* ── COUNTERS ── */
const counted=new Set();
function animCount(el){
  if(counted.has(el))return;counted.add(el);
  const t=+el.dataset.count,d=1600,sfx='+';
  const s=performance.now();
  const f=n=>{const p=Math.min((n-s)/d,1);const v=Math.round((1-Math.pow(1-p,3))*t);el.textContent=v+(p>=1?sfx:'');if(p<1)requestAnimationFrame(f)};
  requestAnimationFrame(f);
}
function initCounters(){
  const cio=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){animCount(e.target);cio.unobserve(e.target)}})},{threshold:.5});
  document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));
}

/* ── SERVICE SCROLL ── */
window.scrollSvc=function(d){const el=document.getElementById('svc-scroll');if(el)el.scrollBy({left:d*340,behavior:'smooth'})};

/* ── SERVICE MODAL ── */
window.openSvc=function(i){
  const s=S[i];
  document.getElementById('sm-img').src=s.img;
  document.getElementById('sm-num').textContent=s.n;
  document.getElementById('sm-title').textContent=s.t;
  document.getElementById('sm-content').textContent=s.c;
  document.getElementById('sm-features').innerHTML=s.f.map(f=>`<div class="smfi"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg><span>${f}</span></div>`).join('');
  document.getElementById('svc-modal').classList.add('open');
  document.body.style.overflow='hidden';
};
window.closeSvc=function(){document.getElementById('svc-modal').classList.remove('open');document.body.style.overflow=''};

/* ── APPLY ── */
window.openApply=function(role){
  document.getElementById('amodal-role').textContent=role;
  document.getElementById('apos').value=role;
  document.getElementById('amodal').classList.add('open');
  document.body.style.overflow='hidden';
  document.getElementById('nc').classList.remove('open');
};
window.closeApply=function(){document.getElementById('amodal').classList.remove('open');document.body.style.overflow=''};
window.submitApply=function(e){
  if(e)e.preventDefault();
  const m=document.getElementById('amodal-msg');
  m.className='cf-msg ok';m.textContent='Your application has been submitted. We will review it and be in touch shortly.';
};

/* ── FORMS ── */
window.submitContact=function(e){
  e.preventDefault();
  const m=document.getElementById('cf-msg');
  m.className='cf-msg ok';m.textContent='Thank you — your message has been sent. We respond within one business day.';
  e.target.reset();
};
window.submitNL=function(e){
  e.preventDefault();
  const m=document.getElementById('nl-msg');
  m.className='nl-msg ok';m.textContent="Subscribed! You'll receive our next East Africa logistics update.";

  const inp=document.getElementById('nl-email');if(inp)inp.value='';
};

/* ── INIT ── */
initReveal();initCounters();
})();