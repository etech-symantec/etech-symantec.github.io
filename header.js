// 기념일 스킨 로드 (기념일 기간이 아니면 아무 변화 없음)
(function () {
  if (window.__holidaySkinLoaded) return;
  var s = document.createElement("script");
  s.src = "https://etech-symantec.github.io/holiday-skin.js";
  document.head.appendChild(s);
})();

document.addEventListener("DOMContentLoaded", function () {
  // HTML에서 설정한 변수가 있으면 사용하고, 없으면 기본값 사용
  const title = window.pageTitle || "기본 타이틀";
  const version = window.pageVersion || "ver.1.0";

  const headerHTML = `
    <div class="header-wrap">
      <div class="dashboard-header">
        <div class="brand-area">
          <a href="https://etech-symantec.github.io/" class="home-btn" aria-label="홈으로 이동" title="홈">
            <span class="home-icon" aria-hidden="true">
              <img class="home-logo-img" src="https://etech-symantec.github.io/brand-logo-premium.png" alt="">
            </span>
          </a>
          <span class="brand-divider" aria-hidden="true"></span>
          <div class="brand-copy">
            <span class="header-title do-hyeon-regular">${title}</span>
          
            <div class="brand-meta">
              <span class="header-version">${version}</span>
              <span class="header-subtitle">by 이테크시스템</span>
            </div>
          </div>
        </div>

        <nav class="header-nav" aria-label="공통 메뉴">
          <a href="https://etech-calendar.vercel.app/">　</a>
          <a href="https://etech-symantec.github.io/base64" class="nav-btn" title="base64/OCR 변환기"><span class="nav-icon">🏁</span><span class="nav-label">base64 OCR</span></a>
          <a href="https://etech-symantec.github.io/broadcom" class="nav-btn" title="Broadcom">
            <img class="nav-favicon" src="https://support.broadcom.com/o/ecx-standard-theme/images/favicon.ico" alt="">
            <span class="nav-label">Broadcom</span>
          </a>
          <a href="https://etech-sym-case.vercel.app/" class="nav-btn" title="Case 관리"><span class="nav-icon">⚠️</span><span class="nav-label">Case 관리</span></a>
          <a href="https://etech-sym-ma.vercel.app/" class="nav-btn" title="유지보수"><span class="nav-icon">☑️</span><span class="nav-label">유지 보수</span></a>
          <a href="https://etech-symantec.github.io/proxysg" class="nav-btn" data-new="true" title="SWG 웹콘솔 가이드"><span class="nav-icon">🕹️</span><span class="nav-label">SWG GUI 가이드</span></a>
          <a href="https://etech-symantec.github.io/monitoring" class="nav-btn" data-new="true" title="SWG 모니터링"><span class="nav-icon">🚨</span><span class="nav-label">SWG 모니터링</span></a>
          <a href="https://etech-symantec.github.io/sysinfo" class="nav-btn" title="Sysinfo 분석"><span class="nav-icon">🧩</span><span class="nav-label">Sysinfo 분석</span></a>
          <a href="https://etech-symantec.github.io/mib" class="nav-btn" title="MIB"><span class="nav-icon">🪬</span><span class="nav-label">MIB</span></a>
          <a href="https://etech-symantec.github.io/archive" class="nav-btn" title="Archive 편집"><span class="nav-icon">✂️</span><span class="nav-label">Archive 편집</span></a>
          <a href="https://etech-symantec.github.io/xml" class="nav-btn" title="XML 편집"><span class="nav-icon">🗂️</span><span class="nav-label">XML 편집</span></a>
          <a href="https://etech-symantec.github.io/isg" class="nav-btn" title="ISG 분석"><span class="nav-icon">🔎</span><span class="nav-label">ISG 분석</span></a>
          <a href="https://etech-symantec.github.io/trace" class="nav-btn" data-new="true" title="Trace 분석"><span class="nav-icon">📄</span><span class="nav-label">Trace 분석</span></a>
          <a href="https://etech-sym-pcap.vercel.app/" class="nav-btn" data-new="true" title="pcap 분석"><span class="nav-icon">🧮</span><span class="nav-label">pcap 분석</span></a>
          <a href="https://etech-symantec.github.io/sizing-sg" class="nav-btn" title="Sizing-SG 보기"><span class="nav-icon">📊</span><span class="nav-label">Sizing</span></a>
          <a href="https://etech-symantec.github.io/elk" class="nav-btn" data-new="true" title="ELK 로그 설정"><span class="nav-icon">🧬</span><span class="nav-label">ELK</span></a>
          <a href="https://jandi-search.vercel.app/search.html" class="nav-btn" data-new="true" title="통합검색"><span class="nav-icon">📑</span><span class="nav-label">통합 검색</span></a>
        </nav>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("afterbegin", headerHTML);

  // NEW 배지: 메뉴 링크에 data-new="true" 속성을 지정합니다.
  const newBadgeStyle = document.createElement("style");
  newBadgeStyle.textContent = `
    /* NEW는 메뉴 글자와 같은 줄에 배치하여 가림/잘림을 모두 방지 */
    .header-nav .nav-btn.has-new {
      display: inline-flex; align-items: center; justify-content: center;
      position: relative; box-sizing: border-box;
    }
    .header-nav .nav-btn.has-new .nav-new-badge {
      position: static; flex: 0 0 auto; align-self: center;
      display: inline-flex; align-items: center; justify-content: center;
      margin-left: 5px; min-width: 23px; height: 13px; padding: 0 4px;
      border-radius: 7px; box-sizing: border-box;
      font: 700 8px/1 Arial, sans-serif; letter-spacing: .1px;
      color: #fff; background: linear-gradient(120deg, #ff476e, #ff7757);
      box-shadow: 0 1px 4px rgba(229,60,91,.25);
      white-space: nowrap; pointer-events: none;
    }
    /* 좁은 화면은 NEW 텍스트 대신 오른쪽의 작은 새 메뉴 표시점 */
    .header-nav .nav-btn.has-new.icon-only .nav-new-badge {
      font-size: 0; min-width: 0; width: 6px; height: 6px;
      margin-left: 3px; padding: 0; border-radius: 50%;
    }
  `;
  document.head.appendChild(newBadgeStyle);
  document.querySelectorAll('.header-nav .nav-btn[data-new="true"]').forEach((btn) => {
    btn.classList.add("has-new");
    btn.insertAdjacentHTML("beforeend", '<span class="nav-new-badge" aria-label="새 메뉴">N</span>');
  });



  // 메뉴 이름: 첫 번째 공백을 기준으로 최대 두 줄로 표시
  document.querySelectorAll('.header-nav .nav-btn .nav-label').forEach((label) => {
    const name = label.textContent.trim();
    const firstSpace = name.search(/\s/);
    if (firstSpace < 0) return;
    const firstLine = name.slice(0, firstSpace);
    const secondLine = name.slice(firstSpace).trim();
    label.textContent = "";
    const top = document.createElement("span");
    top.className = "nav-text-line";
    top.textContent = firstLine;
    const bottom = document.createElement("span");
    bottom.className = "nav-text-line";
    bottom.textContent = secondLine;
    label.append(top, bottom);
  });

  // 아이콘은 왼쪽, 글씨는 오른쪽 2줄. NEW는 텍스트 옆의 독립된 공간에 둡니다.
  const twoLineStyle = document.createElement("style");
  twoLineStyle.textContent = `
    .dashboard-header:has(.header-nav .nav-btn) {
      height: auto !important;
      min-height: 44px !important;
      padding-top: 3px !important;
      padding-bottom: 3px !important;
      box-sizing: border-box;
      align-items: center !important;
    }
    .header-nav:has(.nav-btn) {
      display: flex !important;
      align-items: center !important;
      gap: 4px !important;
      min-width: 0;
    }
    .header-nav .nav-btn,
    .header-nav .nav-btn.has-new {
      display: inline-flex !important;
      flex: 0 0 auto !important;
      flex-direction: row !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 5px !important;
      min-height: 34px !important;
      height: 34px !important;
      padding: 2px 9px !important;
      box-sizing: border-box !important;
      white-space: nowrap !important;
      position: relative !important;
      overflow: hidden !important;
    }
    .header-nav .nav-btn.has-new { padding-right: 32px !important; }
    .header-nav .nav-btn .nav-icon {
      font-size: 15px !important;
      line-height: 1 !important;
      flex: 0 0 auto !important;
      margin: 0 !important;
    }
    .header-nav .nav-btn .nav-favicon {
      width: 15px !important;
      height: 15px !important;
      flex: 0 0 15px !important;
      margin: 0 !important;
    }
    .header-nav .nav-btn .nav-label {
      display: flex !important;
      flex-direction: column !important;
      justify-content: center !important;
      align-items: flex-start !important;
      gap: 0 !important;
      line-height: 1.12 !important;
      font-size: 11px !important;
      white-space: nowrap !important;
      text-align: left !important;
      margin: 0 !important;
    }
    .header-nav .nav-btn .nav-label:has(.nav-text-line) { font-size: 10px !important; }
    .header-nav .nav-btn .nav-text-line { display: block; white-space: nowrap; }
    .header-nav .nav-btn.has-new .nav-new-badge {
      position: absolute !important;
      top: 50% !important;
      right: 5px !important;
      transform: translateY(-50%) !important;
      margin: 0 !important;
      padding: 0 3px !important;
      height: 12px !important;
      min-width: 20px !important;
      font-size: 7px !important;
      z-index: 1;
    }
    .header-nav .nav-btn.icon-only,
    .header-nav .nav-btn.has-new.icon-only {
      min-width: 30px !important;
      width: 30px !important;
      padding: 3px !important;
      gap: 0 !important;
    }
    .header-nav .nav-btn.icon-only .nav-label { display: none !important; }
    .header-nav .nav-btn.has-new.icon-only .nav-new-badge {
      width: 6px !important;
      min-width: 6px !important;
      height: 6px !important;
      padding: 0 !important;
      top: 6px !important;
      right: 3px !important;
      transform: none !important;
      font-size: 0 !important;
    }
  `;
  document.head.appendChild(twoLineStyle);

  // 메뉴 그룹: 기존 nav-btn의 크기/클릭/NEW 속성은 수정하지 않고 컨테이너만 추가
  // 그룹 내 버튼은 한 줄이며 그룹명을 왼쪽에 작게 표시합니다.
  const navRoot = document.querySelector('.header-nav');
  const groupDefs = [
    { name: '업무 · 관리', titles: ['Broadcom', 'Case 관리', '유지보수'] },
    { name: 'SWG', titles: ['SWG 웹콘솔 가이드', 'SWG 모니터링'] },
    { name: '분석 · 모니터', titles: ['Sysinfo 분석', 'ISG 분석', 'Trace 분석', 'pcap 분석', 'MIB', 'ELK 로그 설정'] },
    { name: '유틸리티', titles: ['base64/OCR 변환기', 'Archive 편집', 'XML 편집', 'Sizing-SG 보기', '통합검색'] }
  ];
  if (navRoot) {
    const buttons = Array.from(navRoot.querySelectorAll(':scope > .nav-btn'));
    const originalItems = Array.from(navRoot.children);
    // 기존의 캘린더 링크 등 일반 링크는 그룹 외부에 그대로 둡니다.
    const otherItems = originalItems.filter(el => !el.classList.contains('nav-btn'));
    navRoot.replaceChildren(...otherItems);
    const used = new Set();
    groupDefs.forEach(def => {
      const selected = def.titles.map(t => buttons.find(b => b.title === t)).filter(Boolean);
      if (!selected.length) return;
      const group = document.createElement('div');
      group.className = 'nav-menu-group';
      const caption = document.createElement('span');
      caption.className = 'nav-group-caption';
      caption.textContent = ({ '업무 · 관리': '업무\n관리', '분석 · 모니터링': '분석\n모니터링', '유틸리티': '유틸\n리티' }[def.name] || def.name);
      const items = document.createElement('div');
      items.className = 'nav-group-items';
      selected.forEach(btn => { items.appendChild(btn); used.add(btn); });
      group.append(caption, items);
      navRoot.appendChild(group);
    });
    // 신규 메뉴가 추가되어 그룹에 등록되지 않아도 표시가 사라지지 않도록 합니다.
    const remainder = buttons.filter(btn => !used.has(btn));
    if (remainder.length) {
      const group = document.createElement('div');
      group.className = 'nav-menu-group';
      const caption = document.createElement('span');
      caption.className = 'nav-group-caption';
      caption.textContent = '기타';
      const items = document.createElement('div');
      items.className = 'nav-group-items';
      items.append(...remainder);
      group.append(caption, items);
      navRoot.appendChild(group);
    }
  }

  const compactGroupStyle = document.createElement('style');
  compactGroupStyle.textContent = `
    /* 로고-제목 압축: 구분선 제거, 홈 버튼만 약간 축소 */
    .dashboard-header .brand-area {
      gap: 8px !important;
      padding-left: 0 !important;
      margin-left: 0 !important;
      flex: 0 0 auto !important;
    }
    .dashboard-header .brand-divider { display: none !important; }
    .dashboard-header .home-btn {
      width: 28px !important; height: 28px !important;
      min-width: 28px !important; min-height: 28px !important;
      max-width: 28px !important; max-height: 28px !important;
      flex: 0 0 28px !important; aspect-ratio: 1 / 1 !important;
      padding: 3px !important; margin: 0 !important;
      display: inline-flex !important; align-items: center !important; justify-content: center !important;
      border-radius: 8px !important;
      box-sizing: border-box !important;
    }
    .dashboard-header .home-icon {
      width: 21px !important; height: 21px !important;
      display: inline-flex !important; align-items: center !important; justify-content: center !important;
    }
    .dashboard-header .home-logo-img {
      max-width: 21px !important; max-height: 21px !important;
      width: 100% !important; height: 100% !important;
      object-fit: contain !important;
    }
    .dashboard-header .brand-copy { margin-left: 0 !important; padding-left: 0 !important; }
    /* 제목 길이만큼만 브랜드 폭을 사용하고, 남은 너비는 메뉴에 배분 */
    .dashboard-header {
      display: flex !important;
      flex-direction: row !important;
      justify-content: flex-start !important;
      align-items: center !important;
      column-gap: 7px !important;
    }
    .dashboard-header .brand-area {
      width: max-content !important;
      min-width: 0 !important;
      max-width: none !important;
      flex: 0 0 auto !important;
      justify-content: flex-start !important;
    }
    .dashboard-header .brand-copy { width: max-content !important; flex: 0 0 auto !important; }
    .dashboard-header .header-nav {
      width: auto !important;
      min-width: 0 !important;
      max-width: none !important;
      flex: 0 1 auto !important;
      margin-left: auto !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
      justify-content: flex-end !important;
      flex-wrap: nowrap !important;
    }
    .dashboard-header { padding-left: 5px !important; padding-right: 5px !important; }
    .header-nav { gap: 5px !important; align-items: center !important; }
    /* 그룹은 얇고 은은한 라운드 테두리로만 묶고 그룹명을 왼쪽에 배치 */
    .header-nav .nav-menu-group {
      flex: 0 0 auto !important;
      width: max-content !important;
      display: inline-flex !important; flex-direction: row !important;
      align-items: center !important; justify-content: flex-start !important;
      gap: 4px !important; margin: 0 !important;
      padding: 3px 5px 3px 4px !important;
      border: 1px solid rgba(184,210,241,.24) !important;
      border-radius: 11px !important;
      background: rgba(222,236,255,.045) !important;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.035) !important;
      position: relative !important; box-sizing: border-box !important;
      white-space: nowrap !important;
    }
    .header-nav .nav-menu-group:hover {
      border-color: rgba(184,210,241,.38) !important;
      background: rgba(222,236,255,.07) !important;
    }
    .header-nav .nav-group-caption {
      display: flex !important; flex: 0 0 28px !important;
      width: 28px !important; max-width: 28px !important;
      align-items: center !important; justify-content: center !important;
      font: 600 8px/1.25 Arial, sans-serif !important;
      color: rgba(219,234,255,.78) !important;
      text-align: center !important; letter-spacing: -.15px !important;
      white-space: pre-line !important; pointer-events: none !important;
      padding: 0 !important; margin: 0 !important;
    }
    .header-nav .nav-group-items {
      display: flex !important; flex-direction: row !important; gap: 4px !important;
      align-items: center !important; flex-wrap: nowrap !important; white-space: nowrap !important;
    }
    /* 메뉴 버튼 크기, 패딩, 글자, NEW 배지는 앞서 설정한 값을 그대로 사용 */
  `;
  document.head.appendChild(compactGroupStyle);

  // 즉시 표시되는 커스텀 메뉴 툴팁 (브라우저 기본 title 툴팁은 제거)
  const tipStyle = document.createElement('style');
  tipStyle.textContent = `
    .header-nav-tooltip {
      position: fixed; z-index: 2147483000; left: 0; top: 0;
      max-width: min(280px, calc(100vw - 20px));
      padding: 9px 12px; border-radius: 10px;
      color: #f6faff; background: linear-gradient(140deg, #173a65, #102848);
      border: 1px solid rgba(175,210,255,.35);
      box-shadow: 0 10px 28px rgba(3,18,41,.29), inset 0 1px rgba(255,255,255,.08);
      font-family: Arial, 'Malgun Gothic', sans-serif;
      pointer-events: none; opacity: 0; visibility: hidden;
      transition: opacity .12s ease, visibility .12s ease;
      line-height: 1.4; box-sizing: border-box; text-align: left;
    }
    .header-nav-tooltip.visible { opacity: 1; visibility: visible; }
    .header-nav-tooltip-title { font-weight: 700; font-size: 12px; letter-spacing: -.1px; }
    .header-nav-tooltip-desc { margin-top: 3px; color: #bed5ee; font-size: 10px; }
    .header-nav-tooltip::after {
      content: ''; position: absolute; left: var(--tip-arrow-x, 50%);
      width: 9px; height: 9px; background: #17365e;
      border: 1px solid rgba(175,210,255,.35);
      transform: translateX(-50%) rotate(45deg);
    }
    .header-nav-tooltip.below::after { top: -6px; border-right: 0; border-bottom: 0; }
    .header-nav-tooltip.above::after { bottom: -6px; border-left: 0; border-top: 0; }
    @media (prefers-reduced-motion: reduce) {
      .header-nav-tooltip { transition: none; }
    }
  `;
  document.head.appendChild(tipStyle);
  const tooltip = document.createElement('div');
  tooltip.className = 'header-nav-tooltip below';
  tooltip.setAttribute('role', 'tooltip');
  const tipTitle = document.createElement('div');
  tipTitle.className = 'header-nav-tooltip-title';
  const tipDesc = document.createElement('div');
  tipDesc.className = 'header-nav-tooltip-desc';
  tooltip.append(tipTitle, tipDesc);
  document.body.appendChild(tooltip);

  let activeTipButton = null;
  function placeTooltip(btn) {
    const r = btn.getBoundingClientRect();
    const w = tooltip.offsetWidth;
    const h = tooltip.offsetHeight;
    const mid = r.left + r.width / 2;
    const x = Math.max(10, Math.min(mid - w / 2, window.innerWidth - w - 10));
    const below = r.bottom + 10 + h <= window.innerHeight || r.top < h + 12;
    const y = below ? r.bottom + 10 : r.top - h - 10;
    tooltip.style.left = x + 'px';
    tooltip.style.top = Math.max(6, y) + 'px';
    tooltip.style.setProperty('--tip-arrow-x', Math.max(12, Math.min(w - 12, mid - x)) + 'px');
    tooltip.classList.toggle('below', below);
    tooltip.classList.toggle('above', !below);
  }
  function showTooltip(btn) {
    activeTipButton = btn;
    tipTitle.textContent = btn.dataset.tipTitle || btn.dataset.originalTitle || btn.textContent.trim();
    tipDesc.textContent = btn.dataset.tipDescription || '클릭하여 이동';
    tooltip.classList.add('visible');
    placeTooltip(btn);
  }
  function hideTooltip(btn) {
    if (btn && btn !== activeTipButton) return;
    activeTipButton = null;
    tooltip.classList.remove('visible');
  }
  document.querySelectorAll('.header-nav .nav-btn').forEach((btn) => {
    const originalTitle = btn.getAttribute('title') || '';
    btn.dataset.originalTitle = originalTitle;
    btn.removeAttribute('title');
    btn.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'touch') showTooltip(btn);
    });
    btn.addEventListener('pointerleave', () => hideTooltip(btn));
    btn.addEventListener('focus', () => showTooltip(btn));
    btn.addEventListener('blur', () => hideTooltip(btn));
    btn.addEventListener('click', () => hideTooltip(btn));
  });
  window.addEventListener('scroll', () => hideTooltip(), true);
  window.addEventListener('resize', () => {
    if (activeTipButton) placeTooltip(activeTipButton);
  });

  // ── 화면이 좁아지면, 메뉴 버튼들이 왼쪽의 "제목/버전" 영역과 맞닿는 순간부터
  //     왼쪽 버튼부터 순서대로 아이콘만 남기고 축소 ──
  const dashboardHeader = document.querySelector(".dashboard-header");
  const navEl = document.querySelector(".header-nav");
  const brandArea = document.querySelector(".brand-area");
  if (!dashboardHeader || !navEl || !brandArea) return;

  // 실제 메뉴 버튼들만 마크업에 등장한 순서(왼쪽→오른쪽) 그대로 수집
  const navButtons = Array.from(navEl.querySelectorAll(".nav-btn"));

  // 실제 텍스트 너비와 화면 여유 공간에 맞춰 최소 수의 메뉴만 접습니다.
  const MIN_GAP = 7;
  let rafId = null;

  function px(value) { return parseFloat(value) || 0; }

  function contentWidth(node) {
    const style = getComputedStyle(node);
    return node.getBoundingClientRect().width + px(style.marginLeft) + px(style.marginRight);
  }

  function getRequiredNavWidth() {
    const style = getComputedStyle(navEl);
    const children = Array.from(navEl.children).filter(el => getComputedStyle(el).display !== 'none');
    const gap = px(style.columnGap !== 'normal' ? style.columnGap : style.gap);
    return px(style.paddingLeft) + px(style.paddingRight) +
      children.reduce((sum, el) => sum + contentWidth(el), 0) +
      Math.max(0, children.length - 1) * gap;
  }

  function collapseNavButtons() {
    // 모두 펼친 상태에서 실측해야 제목이 짧은 페이지의 남는 공간까지 사용할 수 있습니다.
    navButtons.forEach(btn => btn.classList.remove('icon-only'));

    const headStyle = getComputedStyle(dashboardHeader);
    const headInnerWidth = dashboardHeader.clientWidth -
      px(headStyle.paddingLeft) - px(headStyle.paddingRight);
    const headerGap = px(headStyle.columnGap !== 'normal' ? headStyle.columnGap : headStyle.gap);
    const availableNavWidth = Math.max(0,
      headInnerWidth - contentWidth(brandArea) - Math.max(MIN_GAP, headerGap));

    // 메뉴별 아이콘 축소 시 그룹 테두리 폭도 매번 다시 계산됩니다.
    let i = 0;
    while (getRequiredNavWidth() > availableNavWidth + 0.5 && i < navButtons.length) {
      navButtons[i].classList.add('icon-only');
      i++;
    }
  }

  function scheduleCollapse() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(collapseNavButtons);
  }

  // 최초 렌더 이후 1회 계산
  scheduleCollapse();

  // 폰트/이미지 로딩이 끝나 실제 텍스트·아이콘 너비가 확정된 후 다시 한 번 계산
  window.addEventListener("load", scheduleCollapse);

  // 창 크기 변경 시 재계산
  window.addEventListener("resize", scheduleCollapse);

  // 헤더/브랜드 영역 폭이 바뀌는 모든 경우(폰트 로딩, 레이아웃 변화 등)도 감지
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(scheduleCollapse);
    ro.observe(dashboardHeader);
    ro.observe(brandArea);
  }
});
