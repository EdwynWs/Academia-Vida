/* Progressive enhancement. Native scrolling stays native; no scroll hijacking. */
(() => {
 const root=document.documentElement;
 const media=window.matchMedia('(prefers-reduced-motion: reduce)');
 const finePointer=window.matchMedia('(hover: hover) and (pointer: fine)');
 const toggle=document.querySelector('.motion-toggle');
 const hero=document.querySelector('.hero');
 const stage=document.querySelector('.hero-stage');
 const heroContent=document.querySelector('.hero-content');
 const heroMedia=document.querySelector('.hero-media');
 const essence=document.querySelector('.essence');
 const shell=document.querySelector('.overlap-shell');
 const words=[...document.querySelectorAll('.manifesto>span')];
 const photo=document.querySelector('.training-photo');
 const photoImage=photo.querySelector('img');
 const cards=[...document.querySelectorAll('.step-card')];
 const header=document.querySelector('.header');
 const progress=document.querySelector('.reading-progress');
 const halo=document.querySelector('.cursor-halo');
 const footerWord=document.querySelector('.footer-word');
 const video=document.querySelector('.hero-media video');
 let paused=media.matches,raf=0,videoVisible=true;
 let pointer={x:0,y:0,visible:false};
 const clamp=(v,min=0,max=1)=>Math.min(max,Math.max(min,v));
 const schedule=()=>{if(!raf)raf=requestAnimationFrame(paint)};
 function paint(){
  raf=0;
  const y=window.scrollY,h=window.innerHeight;
  const max=document.documentElement.scrollHeight-h;
  progress.style.transform=`scaleX(${max>0?clamp(y/max):0})`;
  header.classList.toggle('scrolled',y>60);
  if(paused)return;
  const heroRect=stage.getBoundingClientRect();
  if(heroRect.bottom>0&&heroRect.top<h){
   const p=clamp(-heroRect.top/Math.max(1,stage.offsetHeight-hero.offsetHeight));
   heroContent.style.transform=`translate3d(0,${-p*95}px,0)`;
   heroContent.style.opacity=String(1-clamp((p-.1)/.9)*.84);
   heroMedia.style.transform=`scale(${1+p*.12})`;
  }
  const r=shell.getBoundingClientRect();
  if(r.top<h&&r.bottom>0){
   const p=clamp((h-r.top)/(h*.85));
   essence.style.transform=`translate3d(0,0,0) scale(${.91+p*.09}) rotateX(${(1-p)*3}deg)`;
   const fill=clamp((h*.8-r.top)/(h*.6));
   words.forEach((word,i)=>word.style.setProperty('--word-fill',`${clamp(fill*1.5-i*.22)*100}%`));
  }
  const pr=photo.getBoundingClientRect();
  if(pr.top<h&&pr.bottom>0){
   const p=clamp((h-pr.top)/(h+pr.height));
   photoImage.style.transform=`translate3d(0,${(p-.5)*pr.height*.15}px,0)`;
   photo.style.setProperty('--caption-y',`${(p-.5)*-25}px`);
  }
  cards.forEach((card,i)=>{
   const next=cards[i+1];if(!next)return;
   const nextRect=next.getBoundingClientRect();
   const overlap=clamp((h*.72-nextRect.top)/(h*.62));
   card.style.transform=`scale(${1-overlap*.055}) rotateX(${overlap*2}deg)`;
   card.style.filter=`brightness(${1-overlap*.23})`;
  });
  if(pointer.visible&&finePointer.matches){const size=halo.classList.contains('over-link')?58:36;halo.style.transform=`translate3d(${pointer.x-size/2}px,${pointer.y-size/2}px,0)`;halo.style.opacity='1'}
 }
 function updateVideo(){
  if(!video)return;
  if(paused||document.hidden||!videoVisible){video.pause();return}
  const play=video.play();if(play&&typeof play.catch==='function')play.catch(()=>{});
 }
 function setPaused(value){
  paused=value;
  root.classList.toggle('effects-paused',paused);
  toggle.setAttribute('aria-pressed',String(paused));
  toggle.setAttribute('aria-label',paused?'Ativar animações':'Pausar animações');
  toggle.querySelector('.motion-label').textContent=paused?'Ativar efeitos':'Pausar efeitos';
  toggle.querySelector('.motion-icon').textContent=paused?'▷':'Ⅱ';
  if(paused){
   heroContent.style.transform='none';heroContent.style.opacity='1';heroMedia.style.transform='none';essence.style.transform='none';photoImage.style.transform='none';photo.style.setProperty('--caption-y','0px');
   words.forEach(word=>word.style.setProperty('--word-fill','100%'));
   cards.forEach(card=>{card.style.transform='none';card.style.filter='none'});
   document.querySelectorAll('.button').forEach(button=>button.style.transform='');
  }
  updateVideo();schedule();
 }
 if(!media.matches)root.classList.add('motion-enabled');
 requestAnimationFrame(()=>requestAnimationFrame(()=>root.classList.add('page-ready')));
 toggle.addEventListener('click',()=>{if(media.matches)return;setPaused(!paused)});
 media.addEventListener('change',e=>{root.classList.toggle('motion-enabled',!e.matches);toggle.disabled=e.matches;setPaused(e.matches);if(e.matches)toggle.querySelector('.motion-label').textContent='Movimento reduzido'});
 toggle.disabled=media.matches;setPaused(media.matches);if(media.matches)toggle.querySelector('.motion-label').textContent='Movimento reduzido';
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});window.addEventListener('load',schedule,{once:true});
 if(document.fonts)document.fonts.ready.then(schedule);
 if(video){
  video.muted=true;
  video.addEventListener('playing',()=>heroMedia.classList.add('video-ready'));
  video.addEventListener('error',()=>heroMedia.classList.remove('video-ready'));
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{videoVisible=entries[0].isIntersecting;updateVideo()},{threshold:0}).observe(hero);
  document.addEventListener('visibilitychange',updateVideo);
  updateVideo();
 }
 window.addEventListener('pointermove',event=>{
  if(paused||!finePointer.matches)return;
  pointer={x:event.clientX,y:event.clientY,visible:true};
  halo.classList.toggle('over-link',Boolean(event.target.closest('a,button,summary,select')));schedule();
 },{passive:true});
 document.addEventListener('pointerleave',()=>{pointer.visible=false;halo.style.opacity='0'});
 footerWord.addEventListener('pointermove',event=>{if(paused||!finePointer.matches)return;const r=footerWord.getBoundingClientRect();footerWord.style.setProperty('--spot-x',`${(event.clientX-r.left)/r.width*100}%`);footerWord.style.setProperty('--spot-y',`${(event.clientY-r.top)/r.height*100}%`)});
 document.querySelectorAll('.button').forEach(button=>{
  button.addEventListener('pointermove',event=>{if(paused||!finePointer.matches)return;const r=button.getBoundingClientRect();button.style.transform=`translate(${(event.clientX-r.left-r.width/2)*.1}px,${(event.clientY-r.top-r.height/2)*.16}px)`});
  button.addEventListener('pointerleave',()=>{button.style.transform=''});
  button.addEventListener('blur',()=>{button.style.transform=''});
 });
 schedule();
})();
