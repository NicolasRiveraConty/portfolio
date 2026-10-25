/* JS compartilhado do portfólio: menu mobile, revelar ao rolar, toasts de formulários ilustrativos, abas */
(function(){
  var d=document;
  var btn=d.querySelector('[data-menu-btn]'), nav=d.querySelector('[data-menu]');
  if(btn&&nav){
    btn.addEventListener('click',function(){
      var o=nav.classList.toggle('aberto'); btn.setAttribute('aria-expanded',o); d.body.classList.toggle('menu-aberto',o);
    });
    nav.addEventListener('click',function(e){ if(e.target.closest('a')){nav.classList.remove('aberto');btn.setAttribute('aria-expanded',false);d.body.classList.remove('menu-aberto');} });
    d.addEventListener('keydown',function(e){ if(e.key==='Escape'&&nav.classList.contains('aberto')){btn.click();btn.focus();} });
  }
  var rev=[].slice.call(d.querySelectorAll('.rv'));
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    rev.forEach(function(el){io.observe(el);});
  } else rev.forEach(function(el){el.classList.add('vis');});
  var hd=d.querySelector('[data-header]');
  if(hd){var f=function(){hd.classList.toggle('rolou',scrollY>8);};f();addEventListener('scroll',f,{passive:true});}
  var toast=d.querySelector('[data-toast]');
  d.querySelectorAll('form[data-ilustrativo]').forEach(function(fm){
    fm.addEventListener('submit',function(e){
      e.preventDefault();
      if(!toast)return; toast.textContent=fm.getAttribute('data-ilustrativo'); toast.classList.add('on');
      clearTimeout(toast._t); toast._t=setTimeout(function(){toast.classList.remove('on');},3800);
    });
  });
  d.querySelectorAll('[data-tabs]').forEach(function(box){
    var tabs=[].slice.call(box.querySelectorAll('[role=tab]')), cards=[].slice.call(d.querySelectorAll(box.getAttribute('data-tabs')+' [data-cat]'));
    function sel(t){
      tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;});
      var c=t.getAttribute('data-filtro'); var n=0;
      cards.forEach(function(el){var show=(c==='todos')||el.getAttribute('data-cat')===c; el.hidden=!show; if(show){el.classList.remove('vis');void el.offsetWidth;el.classList.add('vis');n++;}});
    }
    tabs.forEach(function(t,i){
      t.addEventListener('click',function(){sel(t);});
      t.addEventListener('keydown',function(e){
        var k=e.key; if(k!=='ArrowRight'&&k!=='ArrowLeft')return; var j=(i+(k==='ArrowRight'?1:-1)+tabs.length)%tabs.length; tabs[j].focus(); sel(tabs[j]); e.preventDefault();
      });
    });
    d.querySelectorAll('[data-ir-aba]').forEach(function(a){a.addEventListener('click',function(){var t=box.querySelector('[data-filtro="'+a.getAttribute('data-ir-aba')+'"]'); if(t)sel(t);});});
  });
})();
