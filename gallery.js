const all=window.SUOL_GALLERY||[], grid=document.getElementById('galleryGrid'), filters=document.getElementById('filters');
let visible=[...all], current=0;
const cats=['Alle',...new Set(all.map(x=>x.category))];
function renderFilters(){filters.innerHTML=cats.map((c,i)=>`<button class="filterBtn ${i===0?'active':''}" data-cat="${c}">${c}</button>`).join('');filters.querySelectorAll('button').forEach(b=>b.onclick=()=>{filters.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');visible=b.dataset.cat==='Alle'?[...all]:all.filter(x=>x.category===b.dataset.cat);renderGrid();});}
function renderGrid(){grid.innerHTML=visible.map((x,i)=>`<button class="visualCard" data-i="${i}"><img src="${x.src}" alt="${x.title}" loading="lazy"><span><small>${x.category}</small><b>${x.title}</b></span></button>`).join('');grid.querySelectorAll('.visualCard').forEach(b=>b.onclick=()=>openLB(+b.dataset.i));}
const lb=document.getElementById('lightbox'), img=document.getElementById('lbImage'), title=document.getElementById('lbTitle'), cat=document.getElementById('lbCategory');
function show(){const x=visible[current];img.src=x.src;img.alt=x.title;title.textContent=x.title;cat.textContent=x.category+' / S.U.O.L. VISUAL LAB';}
function openLB(i){current=i;show();lb.classList.add('open');lb.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
function closeLB(){lb.classList.remove('open');lb.setAttribute('aria-hidden','true');document.body.style.overflow='';}
document.querySelector('.lbClose').onclick=closeLB;document.querySelector('.lbPrev').onclick=()=>{current=(current-1+visible.length)%visible.length;show()};document.querySelector('.lbNext').onclick=()=>{current=(current+1)%visible.length;show()};lb.onclick=e=>{if(e.target===lb)closeLB()};document.addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')closeLB();if(e.key==='ArrowLeft')document.querySelector('.lbPrev').click();if(e.key==='ArrowRight')document.querySelector('.lbNext').click();});
renderFilters();renderGrid();
