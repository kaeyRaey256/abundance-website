/* ================================================================
   ABUNDANCE LOGISTICS LTD. — main.js v10
   abundancelogistics.com
================================================================ */
(function(){
'use strict';

/* ── SERVICE DATA ── */
const S=[
  {n:'01',t:'Transportation',slug:'transportation',img:'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=700&q=80',c:'We offer Full Truckload (FCL), Less-Than-Truckload (LCL), Flatbed, Intermodal and Specialty freight shipping options to both domestic and international clients. Our transportation networks allow us to manage regional, long-haul and international truck shipments in and out of most major global markets.',f:['Full Truckload (FCL)','Less-Than-Truckload (LCL)','Flatbed & Specialty','Intermodal Transport','Regional & Long-Haul','International Routes']},
  {n:'02',t:'Ware Housing',slug:'ware-housing',img:'https://images.unsplash.com/photo-1553413077-190dd305871c?w=700&q=80',c:'We offer state-of-the-art warehousing facilities equipped with advanced technology for secure storage and inventory management. Whether you need short-term storage or long-term warehousing solutions, we have the capabilities to meet your needs.',f:['Short-Term Storage','Long-Term Warehousing','Inventory Management','Secure Facility','Tech-Enabled Tracking','Flexible Capacity']},
  {n:'03',t:'3PL',slug:'3pl',img:'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=700&q=80',c:'Our third-party logistics services optimize supply chain efficiency and reduce costs for our clients. From inventory management to order fulfillment, we handle every aspect of logistics so you can focus on growing your business.',f:['Inventory Management','Order Fulfillment','Supply Chain Optimization','Cost Reduction','Dedicated Account Mgr','Scalable Solutions']},
  {n:'04',t:'Air Freight',slug:'air-freight',img:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=80',c:'Abundance Logistics provides top-tier airfreight solutions for cargo of all sizes through a vast global network of partners. Our dedicated air team ensures swift and secure transportation with advanced tracking technology.',f:['Express Air Cargo','Standard Air Freight','Air Import & Export','Advanced Tracking','Dangerous Goods','Time-Critical Solutions']},
  {n:'05',t:'Sea Freight',slug:'sea-freight',img:'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=700&q=80',c:'Abundance Logistics offers comprehensive ocean freight solutions. Our expert team handles full container loads, less container loads, reefer containers, machinery, bulk loading, and RORO via Mombasa and Dar es Salaam.',f:['Full Container (FCL)','Less Container (LCL)','Reefer Containers','RORO Vehicles','Bulk Cargo','Port Clearance']},
  {n:'06',t:'Customs Clearance',slug:'customer-clearance',img:'https://images.unsplash.com/photo-1570126618953-d437176e8c79?w=700&q=80',c:'We handle all documentation and compliance requirements to ensure your goods are cleared quickly and efficiently. We work closely with the Uganda Revenue Authority and other government agencies for correct classification and timely processing.',f:['URA Compliance','Import Documentation','Export Documentation','Tariff Classification','Duty Management','Expedited Clearance']},
  {n:'07',t:'Freight Forwarding',slug:'freight-forwarding',img:'https://images.unsplash.com/photo-1553413077-190dd305871c?w=700&q=80',c:'Our global transportation specialists coordinate standard and expedited air and ocean freight services. Through strategic partnerships with leading carriers worldwide, we provide customized international freight solutions.',f:['Air Freight Forwarding','Ocean Forwarding','Multimodal Solutions','Carrier Negotiation','Door-to-Door','Expedited Options']},
  {n:'08',t:'Import / Export',slug:'import-export',img:'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=700&q=80',c:'Abundance Logistics offers comprehensive support for import and export operations, including documentation, compliance, and logistics management for both inbound and outbound international cargo.',f:['Import Documentation','Export Compliance','Trade Finance Support','Regulatory Advisory','Letter of Credit','Country Expertise']},
  {n:'09',t:'Packing & Relocation',slug:'packing-and-relocating',img:'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80',c:'Whether moving locally or internationally, our packing and relocation services make the process stress-free. Our experienced team handles packing, loading, transportation, and unloading.',f:['Professional Packing','Residential Relocation','Office & Commercial','International Moves','Loading & Unloading','Fragile Item Care']},
];

/* ── PAGE TITLES ── */
const TITLES={
  home:'Abundance Logistics Ltd. — East Africa\'s Premier Freight Partner',
  about:'About Us — Abundance Logistics Ltd.',
  contact:'Contact Us — Abundance Logistics Ltd.',
  privacy:'Privacy Policy — Abundance Logistics Ltd.',
  disclaimer:'Disclaimer — Abundance Logistics Ltd.',
};

/* ── SCROLL PROGRESS BAR ── */
const bar=document.createElement('div');
bar.id='spb';
document.body.prepend(bar);
window.addEventListener('scroll',()=>{
  const h=document.documentElement.scrollHeight-window.innerHeight;
  bar.style.width=(h>0?(scrollY/h*100):0)+'%';
},{passive:true});

/* ── DOT-GRID CANVAS ── */
function addDotGrid(secId,color,opacity,count,speed){
  const sec=document.getElementById(secId);
  if(!sec)return;
  const canvas=document.createElement('canvas');
  canvas.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1';
  sec.style.position='relative';
  sec.insertBefore(canvas,sec.firstChild);
  const ctx=canvas.getContext('2d');
  let W,H,dots=[];
  const resize=()=>{W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;dots=Array.from({length:count||40},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*2+1,vx:(Math.random()-.5)*(speed||.28),vy:(Math.random()-.5)*(speed||.28),op:Math.random()*.55+.15}))};
  const draw=()=>{ctx.clearRect(0,0,W,H);dots.forEach(d=>{ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fillStyle=color||'rgba(255,255,255,0.3)';ctx.globalAlpha=d.op*opacity;ctx.fill();ctx.globalAlpha=1;d.x+=d.vx;d.y+=d.vy;if(d.x<0)d.x=W;if(d.x>W)d.x=0;if(d.y<0)d.y=H;if(d.y>H)d.y=0});requestAnimationFrame(draw)};
  resize();draw();
  window.addEventListener('resize',resize);
}
addDotGrid('hero','rgba(255,255,255,1)',.15,50,.22);
addDotGrid('svc-sec','rgba(2,31,56,1)',.1,38,.16);
addDotGrid('team-sec','rgba(255,255,255,1)',.12,32,.18);
addDotGrid('cta-sec','rgba(26,178,232,1)',.14,28,.20);
addDotGrid('map-sec','rgba(26,178,232,1)',.1,22,.14);

/* ── PAGE NAVIGATION ── */
window.gp=function(id){
  /* Page fade */
  const all=document.querySelectorAll('.pg');
  all.forEach(p=>p.classList.remove('on'));
  const pg=document.getElementById('pg-'+id);
  if(pg){pg.classList.add('on');pg.classList.add('pg-enter');requestAnimationFrame(()=>requestAnimationFrame(()=>pg.classList.remove('pg-enter')))}
  window.scrollTo({top:0,behavior:'smooth'});
  document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('act'));
  const m={home:0,about:1,contact:3};
  const ls=document.querySelectorAll('.nav-link:not(.nc-toggle)');
  if(m[id]!==undefined&&ls[m[id]])ls[m[id]].classList.add('act');
  document.getElementById('nc').classList.remove('open');
  if(TITLES[id])document.title=TITLES[id];
  try{localStorage.setItem('al_page',id)}catch(e){}
  setTimeout(()=>initReveal(),80);
  resetCounters();
};

/* Restore on refresh */
try{
  const saved=localStorage.getItem('al_page');
  if(saved&&document.getElementById('pg-'+saved)){
    document.querySelectorAll('.pg').forEach(p=>p.classList.remove('on'));
    document.getElementById('pg-'+saved).classList.add('on');
    if(TITLES[saved])document.title=TITLES[saved];
    const m={home:0,about:1,contact:3};
    const ls=document.querySelectorAll('.nav-link:not(.nc-toggle)');
    if(m[saved]!==undefined&&ls[m[saved]])ls[m[saved]].classList.add('act');
  }
}catch(e){}

/* ── goServices — go home and scroll to services section ── */
window.goServices = function(){
  if(!document.getElementById('pg-home').classList.contains('on')){
    gp('home');
    setTimeout(()=>{
      const el = document.getElementById('svc-sec');
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    }, 200);
  } else {
    const el = document.getElementById('svc-sec');
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  }
};

/* ── SCROLL TO TEAM ── */
window.scrollToTeam=function(){
  if(!document.getElementById('pg-home').classList.contains('on')){
    gp('home');
    setTimeout(()=>{const el=document.getElementById('team-sec');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},220);
  }else{
    const el=document.getElementById('team-sec');
    if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
  }
};

/* ── NAV ── */
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40),{passive:true});

/* ── MOBILE DRAWER ── */
const burger=document.getElementById('burger');
const drawer=document.getElementById('mob-drawer');
const drawerOverlay=document.getElementById('mob-overlay');
function openDrawer(){burger.classList.add('open');drawer.classList.add('open');drawerOverlay.classList.add('open');document.body.style.overflow='hidden'}
function closeDrawer(){burger.classList.remove('open');drawer.classList.remove('open');drawerOverlay.classList.remove('open');document.body.style.overflow=''}
burger.addEventListener('click',()=>drawer.classList.contains('open')?closeDrawer():openDrawer());
drawerOverlay.addEventListener('click',closeDrawer);
window.cm=closeDrawer;

/* Drawer careers accordion */
window.toggleMobCareers=function(e){
  e.stopPropagation();
  document.getElementById('mob-careers-body').classList.toggle('open');
  e.currentTarget.querySelector('.mob-careers-arrow').classList.toggle('open');
};

/* ── CAREERS DROPDOWN ── */
window.toggleNC=function(e){e.stopPropagation();document.getElementById('nc').classList.toggle('open')};
document.addEventListener('click',()=>document.getElementById('nc').classList.remove('open'));

/* ── SCROLL REVEAL ── */
function initReveal(){
  const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1,rootMargin:'0px 0px -36px 0px'});
  document.querySelectorAll('.sr:not(.in)').forEach(el=>io.observe(el));
}
window.initReveal=initReveal;

/* ── COUNTERS ── */
let cObs=null;
function resetCounters(){
  if(cObs)cObs.disconnect();
  document.querySelectorAll('[data-count]').forEach(el=>el.textContent='0');
  cObs=new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(e.isIntersecting){
        const el=e.target,t=+el.dataset.count,d=1800;
        const s=performance.now();
        const f=n=>{const p=Math.min((n-s)/d,1);const v=Math.round((1-Math.pow(1-p,4))*t);el.textContent=v+(p>=1?'+':'');if(p<1)requestAnimationFrame(f)};
        requestAnimationFrame(f);
        cObs.unobserve(el);
      }
    });
  },{threshold:.5});
  document.querySelectorAll('[data-count]').forEach(el=>cObs.observe(el));
}

/* ── SERVICE SCROLL ── */
window.scrollSvc=function(d){const el=document.getElementById('svc-scroll');if(el)el.scrollBy({left:d*360,behavior:'smooth'})};

/* ── MOBILE SERVICE GRID ── */
const mGrid=document.getElementById('svc-mobile-grid');
if(mGrid){
  mGrid.innerHTML=S.map((s,i)=>`
    <div class="svc-card-m" onclick="openSvc(${i})">
      <div class="svc-ico-m">
        <img src="assets/images/services/${s.slug}.svg" alt="${s.t}" class="svc-icon-img"
          onerror="this.style.opacity='.3'">
      </div>
      <div class="svc-name-m">${s.t}</div>
      <div class="svc-desc-m">${s.c.slice(0,72)}…</div>
      <span class="svc-tap">Tap to explore →</span>
    </div>`).join('');
}

/* ── SERVICE MODAL ── */
window.openSvc=function(i){
  const s=S[i];
  document.getElementById('sm-img').src=s.img;
  document.getElementById('sm-num').textContent='Service '+s.n;
  document.getElementById('sm-title').textContent=s.t;
  document.getElementById('sm-content').textContent=s.c;
  document.getElementById('sm-features').innerHTML=s.f.map(f=>`<div class="smfi"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg><span>${f}</span></div>`).join('');
  const m=document.getElementById('svc-modal');
  m.classList.add('open');
  document.body.style.overflow='hidden';
};
window.closeSvc=function(){
  document.getElementById('svc-modal').classList.remove('open');
  document.body.style.overflow='';
};

/* ── APPLY MODAL ── */
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
  m.className='cf-msg ok';
  m.textContent='Application submitted. We will review and be in touch shortly.';
};

/* ── FORMS ── */
window.submitContact=function(e){
  e.preventDefault();
  const m=document.getElementById('cf-msg');
  m.className='cf-msg ok';
  m.textContent='Thank you — your message has been sent. We respond within one business day.';
  e.target.reset();
};
window.submitNL=function(e){
  e.preventDefault();
  const m=document.getElementById('nl-msg');
  m.className='nl-msg ok';
  m.textContent="Subscribed! You'll receive our next East Africa logistics update.";
  const inp=document.getElementById('nl-email');if(inp)inp.value='';
};

/* ── BACK TO TOP ── */
const btt=document.createElement('button');
btt.id='btt';btt.title='Back to top';
btt.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
document.body.appendChild(btt);
window.addEventListener('scroll',()=>btt.classList.toggle('visible',scrollY>420),{passive:true});
btt.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

/* ── INIT ── */
initReveal();
resetCounters();

})();
