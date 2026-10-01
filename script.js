const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1});document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
// V0.5 Future Lab easter egg
const bush=document.getElementById('rustleBush'),future=document.getElementById('futureReveal'),closeFuture=document.getElementById('futureClose');
function rustleSound(){try{const A=window.AudioContext||window.webkitAudioContext,a=new A(),n=a.createBuffer(1,a.sampleRate*.42,a.sampleRate),d=n.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);const s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();s.buffer=n;f.type='bandpass';f.frequency.value=1100;f.Q.value=.7;g.gain.value=.045;s.connect(f);f.connect(g);g.connect(a.destination);s.start();s.stop(a.currentTime+.42)}catch(e){}}
function openFuture(){bush.classList.add('rustling');rustleSound();setTimeout(()=>bush.classList.remove('rustling'),1000);future.classList.add('open');future.setAttribute('aria-hidden','false');bush.setAttribute('aria-expanded','true');setTimeout(()=>future.scrollIntoView({behavior:'smooth',block:'center'}),280)}
function shutFuture(){future.classList.remove('open');future.setAttribute('aria-hidden','true');bush.setAttribute('aria-expanded','false')}
if(bush){bush.addEventListener('click',openFuture);closeFuture.addEventListener('click',shutFuture);setInterval(()=>{if(!future.classList.contains('open')){bush.classList.add('idleRustle');setTimeout(()=>bush.classList.remove('idleRustle'),900)}},6500)}
// V0.9 — reveal only once, pause ambient motion while page is hidden
if(document.hidden) document.body.classList.add('pageHidden');
document.addEventListener('visibilitychange',()=>document.body.classList.toggle('pageHidden',document.hidden));
