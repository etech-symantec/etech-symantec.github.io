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

        <nav class="header-nav grouped-nav" aria-label="공통 메뉴">
          <a href="https://etech-calendar.vercel.app/" class="calendar-legacy-link" aria-label="캘린더">　</a>
          <div class="nav-group" role="group" aria-label="보안 운영">
            <span class="nav-group-title">보안 운영</span>
            <div class="nav-group-items">
              <a href="https://etech-sym-case.vercel.app/" class="nav-btn" title="Case 관리"><span class="nav-icon">⚠️</span><span class="nav-label">Case 관리</span></a>
              <a href="https://etech-sym-ma.vercel.app/" class="nav-btn" title="유지보수"><span class="nav-icon">☑️</span><span class="nav-label">유지보수</span></a>
              <a href="https://etech-symantec.github.io/proxysg" class="nav-btn" data-new="true" title="SWG 웹콘솔 가이드"><span class="nav-icon">🕹️</span><span class="nav-label">SWG 웹콘솔 가이드</span></a>
              <a href="https://etech-symantec.github.io/monitoring" class="nav-btn" data-new="true" title="SWG 모니터링"><span class="nav-icon">🚨</span><span class="nav-label">SWG 모니터링</span></a>
            </div>
          </div>
          <div class="nav-group" role="group" aria-label="트래픽·로그 분석">
            <span class="nav-group-title">트래픽·로그 분석</span>
            <div class="nav-group-items">
              <a href="https://etech-symantec.github.io/sysinfo" class="nav-btn" title="Sysinfo 분석"><span class="nav-icon">🧩</span><span class="nav-label">Sysinfo 분석</span></a>
              <a href="https://etech-symantec.github.io/isg" class="nav-btn" title="ISG 분석"><span class="nav-icon">🔎</span><span class="nav-label">ISG 분석</span></a>
              <a href="https://etech-symantec.github.io/trace" class="nav-btn" title="Trace 분석"><span class="nav-icon">📄</span><span class="nav-label">Trace 분석</span></a>
              <a href="https://etech-sym-pcap.vercel.app/" class="nav-btn" data-new="true" title="pcap 분석"><span class="nav-icon">🧮</span><span class="nav-label">pcap 분석</span></a>
              <a href="https://etech-symantec.github.io/elk" class="nav-btn" data-new="true" title="ELK 로그 설정"><span class="nav-icon">🧬</span><span class="nav-label">ELK</span></a>
            </div>
          </div>
          <div class="nav-group" role="group" aria-label="관리 도구">
            <span class="nav-group-title">관리 도구</span>
            <div class="nav-group-items">
              <a href="https://etech-symantec.github.io/base64" class="nav-btn" data-new="true" title="base64/OCR 변환기"><span class="nav-icon">🏁</span><span class="nav-label">base64/OCR</span></a>
              <a href="https://etech-symantec.github.io/mib" class="nav-btn" title="MIB"><span class="nav-icon">🪬</span><span class="nav-label">MIB</span></a>
              <a href="https://etech-symantec.github.io/archive" class="nav-btn" title="Archive 편집"><span class="nav-icon">✂️</span><span class="nav-label">Archive 편집</span></a>
              <a href="https://etech-symantec.github.io/xml" class="nav-btn" title="XML 편집"><span class="nav-icon">🗂️</span><span class="nav-label">XML 편집</span></a>
            </div>
          </div>
          <div class="nav-group" role="group" aria-label="기술 자료·검색">
            <span class="nav-group-title">기술 자료·검색</span>
            <div class="nav-group-items">
              <a href="https://etech-symantec.github.io/broadcom" class="nav-btn" title="Broadcom"> <img class="nav-favicon" src="https://support.broadcom.com/o/ecx-standard-theme/images/favicon.ico" alt=""> <span class="nav-label">Broadcom</span> </a>
              <a href="https://etech-symantec.github.io/sizing-sg" class="nav-btn" title="Sizing-SG 보기"><span class="nav-icon">📊</span><span class="nav-label">Sizing-SG 보기</span></a>
              <a href="https://jandi-search.vercel.app/search.html" class="nav-btn" data-new="true" title="통합검색"><span class="nav-icon">📑</span><span class="nav-label">통합검색</span></a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("afterbegin", headerHTML);

  // 기능별 그룹: 메뉴는 모두 상시 표시하고, 그룹명만 위에 작게 표기합니다.
  // NEW 표시 여부는 각 링크의 data-new="true" 속성으로만 제어합니다.
  const groupedStyle = document.createElement("style");
  groupedStyle.textContent = `
    /* 기존 헤더 대비 그룹 이름 한 줄(약 12px)만 추가 */
    .dashboard-header:has(.grouped-nav) {
      height: auto !important;
      min-height: 62px;
      box-sizing: border-box;
    }
    .header-nav.grouped-nav {
      display: flex !important;
      flex-wrap: nowrap !important;
      align-items: center !important;
      gap: 0 !important;
      min-width: 0;
      box-sizing: border-box;
      overflow: visible;
    }
    .grouped-nav .calendar-legacy-link {
      position: absolute !important; width: 1px !important; height: 1px !important;
      overflow: hidden !important; clip-path: inset(50%); white-space: nowrap;
    }
    .grouped-nav .nav-group {
      display: flex; flex-direction: column; align-items: stretch;
      flex: 0 0 auto; min-width: 0;
      padding: 0 8px; box-sizing: border-box;
      position: relative;
    }
    .grouped-nav .nav-group:first-of-type { padding-left: 0; }
    .grouped-nav .nav-group:last-of-type { padding-right: 0; }
    .grouped-nav .nav-group + .nav-group::before {
      content: ""; position: absolute; left: 0; top: 14px; bottom: 4px;
      width: 1px; background: rgba(172, 202, 242, .28);
      pointer-events: none;
    }
    .grouped-nav .nav-group-title {
      display: block; text-align: center; height: 12px; line-height: 12px;
      font: 600 9px/12px Arial, 'Malgun Gothic', sans-serif;
      letter-spacing: .25px; color: #a7c6ec; white-space: nowrap;
      pointer-events: none; user-select: none; margin-bottom: 2px;
    }
    .grouped-nav .nav-group-items {
      display: flex; flex-flow: row nowrap; justify-content: center;
      align-items: center; gap: 5px; white-space: nowrap;
    }
    .grouped-nav .nav-btn { flex: 0 0 auto; white-space: nowrap; }
    .grouped-nav .nav-btn.has-new {
      display: inline-flex; align-items: center; justify-content: center;
      position: relative; box-sizing: border-box;
    }
    .grouped-nav .nav-btn.has-new .nav-new-badge {
      position: static; flex: 0 0 auto; align-self: center;
      display: inline-flex; align-items: center; justify-content: center;
      margin-left: 5px; min-width: 23px; height: 13px; padding: 0 4px;
      border-radius: 7px; box-sizing: border-box;
      font: 700 8px/1 Arial, sans-serif; letter-spacing: .1px;
      color: #fff; background: linear-gradient(120deg, #ff476e, #ff7757);
      box-shadow: 0 1px 4px rgba(229,60,91,.25);
      white-space: nowrap; pointer-events: none;
    }
    .grouped-nav .nav-btn.has-new.icon-only .nav-new-badge {
      font-size: 0; min-width: 0; width: 6px; height: 6px;
      margin-left: 3px; padding: 0; border-radius: 50%;
    }
    @media (max-width: 900px) {
      .grouped-nav .nav-group { padding-left: 5px; padding-right: 5px; }
      .grouped-nav .nav-group-items { gap: 3px; }
    }
  `;
  document.head.appendChild(groupedStyle);
  document.querySelectorAll('.grouped-nav .nav-btn[data-new="true"]').forEach((btn) => {
    btn.classList.add("has-new");
    btn.insertAdjacentHTML("beforeend", '<span class="nav-new-badge" aria-label="새 메뉴">NEW</span>');
  });

  const dashboardHeader = document.querySelector(".dashboard-header");
  const navEl = document.querySelector(".header-nav.grouped-nav");
  const brandArea = document.querySelector(".brand-area");
  if (!dashboardHeader || !navEl || !brandArea) return;

  const navButtons = Array.from(navEl.querySelectorAll(".nav-btn"));
  const groups = Array.from(navEl.querySelectorAll(".nav-group"));
  const MIN_GAP = 12;
  let rafId = 0;

  // 그룹 안의 메뉴는 모두 남겨두고, 공간 부족 시 버튼 이름만 순차적으로 축소합니다.
  function getRequiredNavWidth() {
    const navCss = getComputedStyle(navEl);
    let total = (parseFloat(navCss.paddingLeft) || 0) + (parseFloat(navCss.paddingRight) || 0);
    const groupGap = parseFloat(navCss.columnGap || navCss.gap) || 0;
    groups.forEach((group, i) => {
      // group은 flex: 0 0 auto 로 구성돼 실제 내용 너비를 유지합니다.
      total += group.getBoundingClientRect().width;
      if (i) total += groupGap;
    });
    return total;
  }

  function collapseNavButtons() {
    navButtons.forEach((btn) => btn.classList.remove("icon-only"));
    const headerCss = getComputedStyle(dashboardHeader);
    const padding = (parseFloat(headerCss.paddingLeft) || 0) + (parseFloat(headerCss.paddingRight) || 0);
    const availableWidth = dashboardHeader.getBoundingClientRect().width - padding;
    const brandWidth = brandArea.getBoundingClientRect().width;
    let i = 0;
    while (brandWidth + getRequiredNavWidth() + MIN_GAP > availableWidth && i < navButtons.length) {
      navButtons[i++].classList.add("icon-only");
    }
  }

  function scheduleCollapse() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => { rafId = 0; collapseNavButtons(); });
  }
  scheduleCollapse();
  window.addEventListener("load", scheduleCollapse);
  window.addEventListener("resize", scheduleCollapse);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(scheduleCollapse);
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(scheduleCollapse);
    ro.observe(dashboardHeader);
    ro.observe(brandArea);
  }
});
