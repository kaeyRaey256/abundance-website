/* ================================================================
   ABUNDANCE LOGISTICS LTD. — Main JavaScript
   Site: abundancelogistics.com

   TABLE OF CONTENTS
   1.  Service Data
   2.  Dot-Grid Particle Background (replaces ripples)
   3.  Page Navigation + localStorage persistence
   4.  Page title updater
   5.  Scroll-to-Team
   6.  Sticky Nav
   7.  Mobile Menu
   8.  Careers Dropdown
   9.  Scroll Reveal
   10. Stat Counters (reset-safe)
   11. Service Card Scroll
   12. Service Detail Modal
   13. Apply Modal
   14. Contact & Newsletter Forms
   15. Back-to-top button
   16. Init
================================================================ */

(function(){

/* ── 1. SERVICE DATA ── */
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

/* ── 2. DOT-GRID PARTICLE BACKGROUND ──
   Slow-drifting dots on a CSS canvas — looks like a logistics
   tracking grid / radar — subtle, premium, on-brand.
   Replaces the ripple animations entirely.
*/
function initDotGrid(canvasId, dotColor, dotOpacity, dotCount, speed){
  const canvas = document.getElementById(canvasId);
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, dots=[];

  function resize(){
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;
  }

  function makeDots(){
    dots = [];
    const count = dotCount || 40;
    for(let i=0;i<count;i++){
      dots.push({
        x: Math.random()*W,
        y: Math.random()*H,
        r: Math.random()*2+1,
        vx: (Math.random()-.5)*(speed||0.3),
        vy: (Math.random()-.5)*(speed||0.3),
        op: Math.random()*.6+.2
      });
    }
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    dots.forEach(d=>{
      ctx.beginPath();
      ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fillStyle = dotColor || 'rgba(255,255,255,0.3)';
      ctx.globalAlpha = d.op * dotOpacity;
      ctx.fill();
      ctx.globalAlpha = 1;
      d.x += d.vx;
      d.y += d.vy;
      if(d.x<0) d.x=W;
      if(d.x>W) d.x=0;
      if(d.y<0) d.y=H;
      if(d.y>H) d.y=0;
    });
    requestAnimationFrame(draw);
  }

  resize();
  makeDots();
  draw();
  window.addEventListener('resize', ()=>{ resize(); makeDots(); });
}

/* Inject canvas into a section and start dot grid */
function addDotGrid(sectionId, color, opacity, count, speed){
  const sec = document.getElementById(sectionId);
  if(!sec) return;
  const id = 'dg-'+sectionId;
  const canvas = document.createElement('canvas');
  canvas.id = id;
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1';
  sec.style.position = 'relative';
  sec.insertBefore(canvas, sec.firstChild);
  initDotGrid(id, color, opacity, count, speed);
}

/* Add dot grids to sections that previously had ripples */
addDotGrid('hero',     'rgba(255,255,255,1)', 0.18, 45, 0.25);
addDotGrid('svc-sec',  'rgba(2,31,56,1)',     0.12, 35, 0.18);
addDotGrid('team-sec', 'rgba(255,255,255,1)', 0.14, 30, 0.20);
addDotGrid('cta-sec',  'rgba(26,178,232,1)',  0.15, 28, 0.22);
addDotGrid('map-sec',  'rgba(26,178,232,1)',  0.12, 25, 0.15);


/* ── 3. PAGE NAVIGATION + localStorage persistence ── */
const PAGE_TITLES = {
  home:       'Abundance Logistics Ltd. — East Africa\'s Premier Freight Partner',
  about:      'About Us — Abundance Logistics Ltd.',
  services:   'Our Services — Abundance Logistics Ltd.',
  contact:    'Contact Us — Abundance Logistics Ltd.',
  privacy:    'Privacy Policy — Abundance Logistics Ltd.',
  disclaimer: 'Disclaimer — Abundance Logistics Ltd.',
};

window.gp = function(id){
  document.querySelectorAll('.pg').forEach(p=>p.classList.remove('on'));
  const pg = document.getElementById('pg-'+id);
  if(pg) pg.classList.add('on');
  window.scrollTo({top:0, behavior:'smooth'});
  document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('act'));
  const m = {home:0, about:1, services:2, contact:4};
  const ls = document.querySelectorAll('.nav-link:not(.nc-toggle)');
  if(m[id]!==undefined && ls[m[id]]) ls[m[id]].classList.add('act');
  document.getElementById('nc').classList.remove('open');
  /* Update page title */
  if(PAGE_TITLES[id]) document.title = PAGE_TITLES[id];
  /* Persist current page */
  try { localStorage.setItem('al_page', id); } catch(e){}
  /* Re-run reveal + counters on the newly shown page */
  setTimeout(()=>initReveal(), 60);
  resetAndInitCounters();
};

/* Restore last visited page on load/refresh */
(function restorePage(){
  try {
    const saved = localStorage.getItem('al_page');
    if(saved && document.getElementById('pg-'+saved)){
      /* Use gp but suppress scroll on initial load */
      document.querySelectorAll('.pg').forEach(p=>p.classList.remove('on'));
      document.getElementById('pg-'+saved).classList.add('on');
      if(PAGE_TITLES[saved]) document.title = PAGE_TITLES[saved];
      const m = {home:0, about:1, services:2, contact:4};
      const ls = document.querySelectorAll('.nav-link:not(.nc-toggle)');
      if(m[saved]!==undefined && ls[m[saved]]) ls[m[saved]].classList.add('act');
    }
  } catch(e){}
})();


/* ── 4. SCROLL-TO-TEAM ── */
window.scrollToTeam = function(){
  /* Navigate to home first, then scroll after transition */
  if(!document.getElementById('pg-home').classList.contains('on')){
    gp('home');
    setTimeout(()=>{
      const el = document.getElementById('team-sec');
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    }, 200);
  } else {
    const el = document.getElementById('team-sec');
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  }
};


/* ── 5. STICKY NAV ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', ()=>nav.classList.toggle('scrolled', scrollY>40), {passive:true});


/* ── 6. MOBILE MENU ── */
const burger = document.getElementById('burger');
const mob    = document.getElementById('mobnav');
burger.addEventListener('click', ()=>{
  burger.classList.toggle('open');
  mob.classList.toggle('open');
  document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
});
window.cm = function(){
  burger.classList.remove('open');
  mob.classList.remove('open');
  document.body.style.overflow = '';
};


/* ── 7. CAREERS DROPDOWN ── */
window.toggleNC = function(e){
  e.stopPropagation();
  document.getElementById('nc').classList.toggle('open');
};
document.addEventListener('click', ()=>document.getElementById('nc').classList.remove('open'));


/* ── 8. SCROLL REVEAL ── */
function initReveal(){
  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }});
  }, {threshold:.1, rootMargin:'0px 0px -36px 0px'});
  document.querySelectorAll('.sr:not(.in)').forEach(el=>io.observe(el));
}
window.initReveal = initReveal;


/* ── 9. STAT COUNTERS — reset-safe ── */
/* Clears and re-observes every time a page is shown,
   so counters always animate when scrolled into view */
let counterObserver = null;
function resetAndInitCounters(){
  if(counterObserver) counterObserver.disconnect();
  /* Reset all counter elements to 0 so they animate again */
  document.querySelectorAll('[data-count]').forEach(el=>{ el.textContent='0'; });
  counterObserver = new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(e.isIntersecting){
        const el = e.target;
        const t  = +el.dataset.count;
        const d  = 1600;
        const s  = performance.now();
        const f  = n=>{
          const p = Math.min((n-s)/d, 1);
          const v = Math.round((1-Math.pow(1-p,3))*t);
          el.textContent = v+(p>=1?'+':'');
          if(p<1) requestAnimationFrame(f);
        };
        requestAnimationFrame(f);
        counterObserver.unobserve(el);
      }
    });
  }, {threshold:.5});
  document.querySelectorAll('[data-count]').forEach(el=>counterObserver.observe(el));
}


/* ── MOBILE SERVICE GRID INJECTION ──
   Compact icon+title+summary cards shown only on mobile/tablet.
   Tapping opens the same full service modal.
*/
(function buildMobileGrid(){
  const grid = document.getElementById('svc-mobile-grid');
  if(!grid) return;
  grid.innerHTML = S.map((s,i)=>`
    <div class="svc-card-m" onclick="openSvc(${i})">
      <div class="svc-ico">
        <img src="assets/images/services/${['transportation','ware-housing','3pl','air-freight','sea-freight','customer-clearance','freight-forwarding','import-export','packing-and-relocating'][i]}.svg" alt="" class="svc-icon-img">
      </div>
      <div class="svc-name">${s.t}</div>
      <div class="svc-desc-m">${s.c.substring(0,80)}…</div>
    </div>`).join('');
})();

/* ── 10. SERVICE CARD SCROLL ── */
window.scrollSvc = function(d){
  const el = document.getElementById('svc-scroll');
  if(el) el.scrollBy({left: d*340, behavior:'smooth'});
};


/* ── 11. SERVICE MODAL ── */
window.openSvc = function(i){
  const s = S[i];
  document.getElementById('sm-img').src        = s.img;
  document.getElementById('sm-num').textContent  = s.n;
  document.getElementById('sm-title').textContent = s.t;
  document.getElementById('sm-content').textContent = s.c;
  document.getElementById('sm-features').innerHTML =
    s.f.map(f=>`<div class="smfi"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg><span>${f}</span></div>`).join('');
  document.getElementById('svc-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
};
window.closeSvc = function(){
  document.getElementById('svc-modal').classList.remove('open');
  document.body.style.overflow = '';
};


/* ── 12. APPLY MODAL ── */
window.openApply = function(role){
  document.getElementById('amodal-role').textContent = role;
  document.getElementById('apos').value = role;
  document.getElementById('amodal').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('nc').classList.remove('open');
};
window.closeApply = function(){
  document.getElementById('amodal').classList.remove('open');
  document.body.style.overflow = '';
};
window.submitApply = function(e){
  if(e) e.preventDefault();
  const m = document.getElementById('amodal-msg');
  m.className = 'cf-msg ok';
  m.textContent = 'Your application has been submitted. We will review it and be in touch shortly.';
};


/* ── 13. FORMS ── */
window.submitContact = function(e){
  e.preventDefault();
  const m = document.getElementById('cf-msg');
  m.className = 'cf-msg ok';
  m.textContent = 'Thank you — your message has been sent. We respond within one business day.';
  e.target.reset();
};
window.submitNL = function(e){
  e.preventDefault();
  const m = document.getElementById('nl-msg');
  m.className = 'nl-msg ok';
  m.textContent = "Subscribed! You'll receive our next East Africa logistics update.";
  const inp = document.getElementById('nl-email');
  if(inp) inp.value = '';
};


/* ── 14. BACK TO TOP BUTTON ── */
(function initBackToTop(){
  const btn = document.createElement('button');
  btn.id = 'btt';
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
  btn.setAttribute('aria-label', 'Back to top');
  btn.title = 'Back to top';
  document.body.appendChild(btn);

  window.addEventListener('scroll', ()=>{
    btn.classList.toggle('visible', scrollY > 400);
  }, {passive:true});

  btn.addEventListener('click', ()=>{
    window.scrollTo({top:0, behavior:'smooth'});
  });
})();


/* ── 15. INIT ── */
initReveal();
resetAndInitCounters();

})();
