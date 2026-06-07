/* ── THEME ── */
const root=document.documentElement,themeBtn=document.getElementById('themeBtn');
function setTheme(t){root.setAttribute('data-theme',t);themeBtn.textContent=t==='dark'?'☀':'☾';localStorage.setItem('luv-theme',t)}
const saved=localStorage.getItem('luv-theme')||'dark';setTheme(saved);
themeBtn.addEventListener('click',()=>setTheme(root.getAttribute('data-theme')==='dark'?'light':'dark'));

/* ── NAV ── */
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('solid',scrollY>60),{passive:true});

/* ── BURGER ── */
const burger=document.getElementById('burger'),mobNav=document.getElementById('mobNav');
burger.addEventListener('click',()=>{burger.classList.toggle('open');mobNav.classList.toggle('open');document.body.style.overflow=mobNav.classList.contains('open')?'hidden':''});
function closeMob(){burger.classList.remove('open');mobNav.classList.remove('open');document.body.style.overflow=''}

/* ── HERO PARALLAX ── */
const heroImg=document.getElementById('heroImg');
setTimeout(()=>heroImg.classList.add('loaded'),100);
window.addEventListener('scroll',()=>{if(scrollY<window.innerHeight)heroImg.style.transform=`scale(1) translateY(${scrollY*.28}px)`},{passive:true});

/* ── REVEAL ── */
const obs=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el=>obs.observe(el));

/* ── CUSTOM CURSOR ── */
const cur=document.getElementById('cur'),ring=document.getElementById('curRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px'},{passive:true});
function animRing(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=Math.round(rx)+'px';ring.style.top=Math.round(ry)+'px';requestAnimationFrame(animRing)}animRing();
document.querySelectorAll('a,button,.room-card,.am-item,.gal-item,.hero-thumb').forEach(el=>{el.addEventListener('mouseenter',()=>{cur.classList.add('expand');ring.classList.add('expand')});el.addEventListener('mouseleave',()=>{cur.classList.remove('expand');ring.classList.remove('expand')})});

/* ── TESTIMONIALS ── */
const testis=[
  {quote:'"We stayed here with our family and are fully satisfied with our vacation. Rooms are very modern, have all needed amenities, the kitchen is very delicious and service is just perfect. We will for sure come back."',name:'Kate Palmer',loc:'Idaho, USA',initial:'K'},
  {quote:'"An extraordinary experience from the moment we arrived. The staff\'s attention to detail, the breathtaking views from our suite, and the restaurant\'s cuisine exceeded every expectation. Truly world-class."',name:'James Whitfield',loc:'London, UK',initial:'J'},
  {quote:'"Luviana is unlike any resort we\'ve visited. The harmony of architecture, service and nature is perfection. The private beach at sunrise is something we will carry with us forever."',name:'Sophia Merrano',loc:'Milan, Italy',initial:'S'}
];
let currentTesti=0;
function setTesti(i){
  const q=document.getElementById('testiQuote'),n=document.getElementById('testiName'),l=document.getElementById('testiLoc'),iv=document.getElementById('testiInitial');
  [q,n,l,iv].forEach(el=>el.style.opacity='0');
  setTimeout(()=>{
    currentTesti=i;const t=testis[i];
    q.textContent=t.quote;n.textContent=t.name;l.textContent=t.loc;iv.textContent=t.initial;
    [q,n,l,iv].forEach(el=>{el.style.transition='opacity .4s';el.style.opacity='1'});
    document.querySelectorAll('.testi-dot').forEach((d,j)=>d.classList.toggle('active',j===i));
  },220);
}
setInterval(()=>setTesti((currentTesti+1)%3),5000);

/* ── CUISINE TABS ── */
const cuisines={
  italian:{desc:'With our Italian dishes cooked by professional chefs you will feel as if you are at an authentic Italian restaurant. Olive oil, aged wines, and artisan bread are the cornerstones.',items:[['Tagliatelle al Tartufo Nero','$42'],['Risotto ai Frutti di Mare','$38'],['Bistecca alla Fiorentina','$64'],['Tiramisu della Casa','$18']]},
  mexican:{desc:'Authentic Mexican flavors brought to life with the finest spices and freshest ingredients. From street-style tacos to sophisticated mole, every dish tells a vibrant story of tradition.',items:[['Carne Asada Tacos','$28'],['Chile en Nogada','$36'],['Mole Negro Poblano','$44'],['Tres Leches Cake','$16']]},
  japanese:{desc:'Precision, artistry and the finest seasonal ingredients define our Japanese kitchen. Every dish is a testament to centuries of culinary tradition, served with quiet reverence.',items:[['Omakase Sushi Selection','$88'],['A5 Wagyu Teppanyaki','$120'],['Black Truffle Ramen','$52'],['Matcha Panna Cotta','$22']]},
  indian:{desc:'A symphony of spices, aromatics and textures from the rich tapestry of Indian cuisine. Each dish is a journey through the diverse culinary traditions of the subcontinent.',items:[['Butter Chicken Royale','$32'],['Lamb Rogan Josh','$38'],['Paneer Tikka Masala','$28'],['Gulab Jamun','$14']]}
};
function switchCuisine(btn,key){
  document.querySelectorAll('.c-tab').forEach(t=>t.classList.remove('active'));btn.classList.add('active');
  const desc=document.getElementById('cDesc'),list=document.getElementById('menuList');
  desc.style.opacity='0';list.style.opacity='0';
  setTimeout(()=>{
    const d=cuisines[key];desc.textContent=d.desc;
    list.innerHTML=d.items.map(([n,p])=>`<li class="menu-row"><span class="menu-row-name">${n}</span><span style="display:flex;align-items:center;gap:.6rem"><span class="menu-row-price">${p}</span><span class="menu-row-ico">→</span></span></li>`).join('');
    desc.style.transition='opacity .3s';desc.style.opacity='1';
    list.style.transition='opacity .3s';list.style.opacity='1';
  },230);
}
