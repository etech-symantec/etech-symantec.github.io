/* Palo Alto 공통 헤더 (header-pa.js)
   모든 팔로알토 페이지가 이 파일 하나를 공유합니다. (브로드컴 header.js 와 같은 방식)

   [사용법] 페이지의 <body> 맨 끝에 아래를 넣으세요.
     <script>
       window.pageTitle   = '페이지 제목';        // 선택 (기본: Palo Alto 팀 페이지)
       window.pageVersion = 'ver.2026.11.14';     // 선택 (기본: ver.1.0)
       // 선택: 헤더 우측 메뉴. 그룹 배열 → 각 그룹에 caption 과 items
       // item: { id, icon, label, tip, active, href, newTab }
       //   - href 가 있으면 링크(<a>), 없으면 버튼(<button>)으로 만들어집니다.
       window.paHeaderMenu = [{ caption:'팀\n관리', items:[
         { id:'navHome', icon:'▦', label:'프로젝트', tip:'설명', active:true }
       ]}];
       // 선택: 로그인 사용자 영역(#myName, #myRole, #logout). true 이면 body.pa-authenticated 가 될 때만 메뉴/계정 영역이 보입니다.
       window.paHeaderAccount = true;
     </script>
     <script src="https://etech-symantec.github.io/header-pa.js"></script>

   스타일은 https://etech-symantec.github.io/header-pa.css 를 자동으로 불러옵니다.
   (깜빡임을 없애려면 <head>에 <link rel="stylesheet" href="https://etech-symantec.github.io/header-pa.css"> 를 직접 넣으세요.)

   [단축키] 홈 버튼(브랜드 선택 팝업)이 열린 상태에서
     - "sse" 입력 → 관리자(admin) 페이지, "1" → 캘린더 페이지 (둘 다 새 탭) */
(function(){
'use strict';
if(window.__paHeaderLoaded)return;
window.__paHeaderLoaded=true;

const BASE=(function(){
  const s=document.currentScript;
  if(s&&s.src)return s.src.split('?')[0].replace(/[^\/]*$/,'');
  return 'https://etech-symantec.github.io/';
})();
const PALOALTO_URL='https://etech-sse-paloalto.vercel.app/';
const BROADCOM_URL='https://etech-symantec.github.io/';
const ADMIN_URL='https://etech-sse.vercel.app/';
const ADMIN_KEYWORD='sse';
const CALENDAR_URL='https://etech-calendar.vercel.app/';

if(!document.querySelector('link[href*="header-pa.css"]')){
  const css=document.createElement('link');
  css.rel='stylesheet';
  css.href=BASE+'header-pa.css';
  document.head.appendChild(css);
}

function esc(x){return String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
const title=esc(window.pageTitle||'Palo Alto 팀 페이지');
const version=esc(window.pageVersion||'ver.1.0');
const menu=Array.isArray(window.paHeaderMenu)?window.paHeaderMenu:[];
const needsAuth=window.paHeaderAccount===true;

function itemHTML(it){
  const isLink=!!it.href;
  const tag=isLink?'a':'button';
  let attrs=isLink?' href="'+esc(it.href)+'"'+(it.newTab?' target="_blank" rel="noopener"':''):' type="button"';
  if(it.id)attrs+=' id="'+esc(it.id)+'"';
  attrs+=' class="pa-nav-btn'+(it.active?' active':'')+'"'+(it.active?' aria-current="page"':'')+' data-tip="'+esc(it.tip||'')+'"';
  return '<'+tag+attrs+'><span class="pa-nav-icon">'+esc(it.icon||'')+'</span><span class="pa-nav-label">'+esc(it.label||'')+'</span></'+tag+'>';
}
const navHTML=menu.length?'<nav class="pa-header-nav" aria-label="팔로알토 메뉴">'+menu.map(g=>
  '<div class="pa-menu-group"><span class="pa-group-caption">'+esc(g.caption||'')+'</span><div class="pa-group-items">'+(g.items||[]).map(itemHTML).join('')+'</div></div>'
).join('')+'</nav>':'';
const accountHTML=needsAuth?'<div class="pa-account"><span class="pa-account-name" id="myName"></span><span class="pa-account-role" id="myRole"></span><button type="button" id="logout" class="pa-logout">로그아웃</button></div>':'';

const el=document.createElement('div');
el.className='pa-header-wrap'+(needsAuth?' pa-needs-auth':'');
el.innerHTML='<div class="pa-dashboard-header">'+
 '<div class="pa-brand-area"><button type="button" class="pa-home-btn pa-brand-switcher" id="paBrandSwitcher" aria-label="브랜드 페이지 선택" aria-haspopup="dialog" aria-expanded="false" aria-controls="paBrandPopup" title="팔로알토 / 브로드컴 페이지 선택"><span class="pa-home-icon pa-brand-icon" aria-hidden="true"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/PaloAltoNetworks_2020_Logo.svg" alt="" loading="eager"></span></button>'+
 '<div class="pa-brand-copy"><span class="pa-header-title">'+title+'</span><div class="pa-brand-meta"><span class="pa-header-version">'+version+'</span><span class="pa-header-subtitle">by 이테크시스템</span></div></div></div>'+
 ((navHTML||accountHTML)?'<div class="pa-header-actions">'+navHTML+accountHTML+'</div>':'')+
 '</div>';
document.body.prepend(el);

/* 브랜드 선택 팝업 */
const switcher=el.querySelector('#paBrandSwitcher');
const chooser=document.createElement('div');
chooser.id='paBrandPopup';
chooser.className='pa-brand-popup';
chooser.setAttribute('role','dialog');
chooser.setAttribute('aria-label','이동할 브랜드 페이지 선택');
chooser.hidden=true;
chooser.innerHTML='<div class="pa-brand-popup-title">이동할 페이지 선택</div>'+
 '<div class="pa-brand-choices">'+
 '<a class="pa-brand-choice" href="'+PALOALTO_URL+'" aria-label="팔로알토 팀 페이지로 이동"><span class="pa-brand-choice-image"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/PaloAltoNetworks_2020_Logo.svg" alt="Palo Alto Networks" loading="lazy"></span><span class="pa-brand-choice-name">팔로알토</span></a>'+
 '<a class="pa-brand-choice" href="'+BROADCOM_URL+'" aria-label="브로드컴 페이지로 이동"><span class="pa-brand-choice-image"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Broadcom_logo_%282016-present%29.svg" alt="Broadcom" loading="lazy"></span><span class="pa-brand-choice-name">브로드컴</span></a>'+
 '</div>';
el.querySelector('.pa-brand-area').append(chooser);
function closeChooser(restore=false){
  if(chooser.hidden)return;
  chooser.hidden=true;
  switcher.setAttribute('aria-expanded','false');
  if(restore)switcher.focus();
}
function openChooser(){
  chooser.hidden=false;
  switcher.setAttribute('aria-expanded','true');
  chooser.querySelector('.pa-brand-choice')?.focus();
}
switcher.addEventListener('click',()=>{
  if(chooser.hidden)openChooser();else closeChooser(true);
});
document.addEventListener('pointerdown',e=>{
  if(!chooser.hidden&&!chooser.contains(e.target)&&!switcher.contains(e.target))closeChooser();
});

/* 팝업이 열린 상태의 키보드: Esc / "sse"(admin) / "1"(캘린더) / Tab 포커스 순환 */
const openNewTab=url=>window.open(url,'_blank','noopener');
let keyBuf='';
let keyTimer=null;
document.addEventListener('keydown',e=>{
  if(chooser.hidden)return;
  if(e.key==='Escape'){e.preventDefault();closeChooser(true);keyBuf='';return;}
  if(!e.ctrlKey&&!e.metaKey&&!e.altKey&&!e.shiftKey&&(e.code==='Digit1'||e.code==='Numpad1')){
    e.preventDefault();keyBuf='';openNewTab(CALENDAR_URL);return;
  }
  /* 한글 IME 상태에서도 동작하도록 e.key 대신 e.code(KeyS, KeyE)로 판별 */
  if(!e.ctrlKey&&!e.metaKey&&!e.altKey&&/^Key[A-Z]$/.test(e.code)){
    keyBuf=(keyBuf+e.code.slice(3).toLowerCase()).slice(-ADMIN_KEYWORD.length);
    clearTimeout(keyTimer);
    keyTimer=setTimeout(()=>{keyBuf='';},1500);
    if(keyBuf===ADMIN_KEYWORD){e.preventDefault();keyBuf='';openNewTab(ADMIN_URL);return;}
  }
  if(e.key==='Tab'){
    const links=[...chooser.querySelectorAll('.pa-brand-choice')];
    if(e.shiftKey&&document.activeElement===links[0]){e.preventDefault();links[links.length-1].focus();}
    else if(!e.shiftKey&&document.activeElement===links[links.length-1]){e.preventDefault();links[0].focus();}
  }
});

/* 메뉴 툴팁 */
const buttons=[...el.querySelectorAll('.pa-nav-btn')];
const tip=document.createElement('div');tip.className='pa-tip';tip.setAttribute('aria-hidden','true');document.body.append(tip);
function hideTip(){tip.classList.remove('visible');tip.setAttribute('aria-hidden','true')}
function showTip(btn){
  const rect=btn.getBoundingClientRect();
  tip.replaceChildren();
  const label=document.createElement('strong');label.textContent=btn.textContent.trim();
  const desc=document.createElement('span');desc.textContent=btn.dataset.tip||'';
  tip.append(label,desc);tip.classList.add('visible');tip.setAttribute('aria-hidden','false');
  const w=tip.offsetWidth,h=tip.offsetHeight;
  tip.style.left=Math.max(10,Math.min(innerWidth-w-10,rect.left+rect.width/2-w/2))+'px';
  tip.style.top=(rect.bottom+h+10>innerHeight?Math.max(10,rect.top-h-11):rect.bottom+11)+'px';
}
buttons.forEach(b=>{b.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')showTip(b)});b.addEventListener('pointerleave',hideTip);b.addEventListener('focus',()=>showTip(b));b.addEventListener('blur',hideTip);b.addEventListener('click',hideTip)});
window.addEventListener('scroll',hideTip,true);
window.addEventListener('resize',()=>{hideTip();fit()});

/* 화면이 좁아지면 왼쪽 메뉴 버튼부터 아이콘만 남기고 축소 */
function fit(){
  buttons.forEach(b=>b.classList.remove('icon-only'));
  const header=el.querySelector('.pa-dashboard-header'),brand=el.querySelector('.pa-brand-area'),nav=el.querySelector('.pa-header-nav'),account=el.querySelector('.pa-account');
  if(!header||!brand||!nav)return;
  if(innerWidth<=600)return;
  const available=header.clientWidth-brand.getBoundingClientRect().width-(account?account.getBoundingClientRect().width:0)-45;
  let i=0;
  while(nav.getBoundingClientRect().width>available&&i<buttons.length){buttons[i++].classList.add('icon-only')}
}
requestAnimationFrame(fit);
window.addEventListener('load',fit);
})();
