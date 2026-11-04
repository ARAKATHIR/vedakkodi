(()=>{const date=document.querySelector("#wedding-date"),units={days:document.querySelector("[data-days]"),hours:document.querySelector("[data-hours]"),minutes:document.querySelector("[data-minutes]"),seconds:document.querySelector("[data-seconds]")},msg=document.querySelector("[data-countdown-message]");if(date){try{date.value=localStorage.getItem("vedakkodi-wedding-date")||date.value}catch{}const tick=()=>{const d=new Date((date.value||"2030-02-14")+"T00:00:00"),n=d-Date.now();if(n<=0){units.days.textContent="000";units.hours.textContent=units.minutes.textContent=units.seconds.textContent="00";msg.textContent="Today is the day. Let the story begin.";return}units.days.textContent=String(Math.floor(n/864e5)).padStart(3,"0");units.hours.textContent=String(Math.floor(n%864e5/36e5)).padStart(2,"0");units.minutes.textContent=String(Math.floor(n%36e5/6e4)).padStart(2,"0");units.seconds.textContent=String(Math.floor(n%6e4/1e3)).padStart(2,"0");msg.textContent=""};date.addEventListener("change",()=>{try{localStorage.setItem("vedakkodi-wedding-date",date.value)}catch{}tick()});tick();setInterval(tick,1000)}document.querySelectorAll("[data-share]").forEach(b=>b.addEventListener("click",async()=>{try{if(navigator.share)await navigator.share({title:document.title,text:"A little chapter from our Wedding Forever story",url:location.href});else{await navigator.clipboard.writeText(location.href);b.textContent="Link copied ✓";setTimeout(()=>b.textContent="Share this moment ↗",1800)}}catch(e){if(e.name!=="AbortError")b.textContent="Copy link"}}));const dlg=document.querySelector(".lightbox"),img=dlg?.querySelector("img");document.querySelectorAll("[data-lightbox]").forEach(b=>b.addEventListener("click",()=>{img.src=b.dataset.lightbox;img.alt=b.getAttribute("aria-label");dlg.showModal()}));dlg?.querySelector(".lightbox-close")?.addEventListener("click",()=>dlg.close());dlg?.addEventListener("click",e=>{if(e.target===dlg)dlg.close()})})();
/* Gentle chapter reveals: motion stays out of the way of the story. */
(()=>{
  const pieces=document.querySelectorAll(".intro-grid,.timeline-rail,.countdown-wrap,.gallery-grid,.letter-card,.chapter-nav,.final-note-inner");
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(!pieces.length)return;
  if(reduce||!("IntersectionObserver" in window)){pieces.forEach(el=>el.classList.add("is-visible"));return}
  document.documentElement.classList.add("has-motion");
  const observer=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}
    });
  },{threshold:.12,rootMargin:"0px 0px -35px 0px"});
  pieces.forEach(el=>{el.classList.add("reveal-on-scroll");observer.observe(el)});
})();
