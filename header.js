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

  // 기능별 메뉴를 두 줄로 정렬합니다. NEW는 data-new="true"로 지정합니다.
  const style = document.createElement("style");
  style.textContent = `
    /* 오른쪽 영역만 2행: 왼쪽 페이지 제목은 원래 위치 유지 */
    .dashboard-header:has(.grouped-nav) {
      height: auto !important;
      min-height: 72px !important;
      padding-top: 5px !important;
      padding-bottom: 5px !important;
      align-items: center !important;
      box-sizing: border-box;
    }
    .header-nav.grouped-nav {
      display: grid !important;
      grid-template-columns: max-content max-content !important;
      grid-template-rows: max-content max-content !important;
      align-items: center !important;
      justify-content: end !important;
      align-content: center !important;
      gap: 3px 10px !important;
      flex: 0 1 auto !important;
      min-width: 0 !important;
      max-width: 100% !important;
      overflow: visible !important;
      box-sizing: border-box;
    }
    .grouped-nav .calendar-legacy-link {
      position: absolute !important;
      width: 1px !important; height: 1px !important;
      overflow: hidden !important; clip-path: inset(50%);
      pointer-events: none;
    }
    .grouped-nav .nav-group {
      display: flex !important;
      flex-direction: row !important;
      flex-wrap: nowrap !important;
      align-items: center !important;
      justify-content: flex-end !important;
      min-width: max-content !important;
      gap: 6px !important;
      padding: 0 6px !important;
      position: relative;
      box-sizing: border-box;
    }
    .grouped-nav .nav-group + .nav-group::before {
      content: ""; position: absolute; left: -5px;
      top: 4px; bottom: 4px; width: 1px;
      background: rgba(177,207,242,.30); pointer-events:none;
    }
    .grouped-nav .nav-group-title {
      flex: 0 0 auto;
      font: 700 9px/1.15 'Malgun Gothic',Arial,sans-serif;
      color: #a9c9ec; white-space: nowrap;
      pointer-events: none; user-select: none;
      padding-right: 3px;
    }
    .grouped-nav .nav-group-items {
      display: flex !important;
      flex-flow: row nowrap !important;
      justify-content: flex-start !important;
      align-items: center !important;
      gap: 4px !important;
      white-space: nowrap !important;
    }
    .grouped-nav .nav-btn {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex: 0 0 auto !important;
      position: relative;
      box-sizing: border-box !important;
      padding: 4px 7px !important;
      min-height: 23px !important;
      min-width: 0 !important;
      font-size: 11px !important;
      line-height: 1.1 !important;
      gap: 3px !important;
      white-space: nowrap !important;
    }
    .grouped-nav .nav-btn .nav-label {
      display: inline !important;
      opacity: 1 !important;
      visibility: visible !important;
      width: auto !important;
      max-width: none !important;
      font-size: inherit !important;
    }
    .grouped-nav .nav-btn.has-new .nav-new-badge {
      position: static !important;
      display: inline-flex !important;
      align-items: center !important; justify-content: center !important;
      flex: 0 0 auto !important;
      margin-left: 2px !important;
      min-width: 22px; height: 12px; padding: 0 3px;
      border-radius: 7px; box-sizing: border-box;
      font: 700 8px/1 Arial,sans-serif; color: #fff;
      background: linear-gradient(120deg,#ff476e,#ff7757);
      box-shadow: 0 1px 4px rgba(229,60,91,.25);
      pointer-events: none; white-space: nowrap;
    }
    /* 좁은 화면에서는 이름을 숨기지 않고 메뉴 영역만 좌우 스크롤 */
    @media (max-width: 1170px) {
      .header-nav.grouped-nav {
        overflow-x: auto !important;
        overflow-y: hidden !important;
        scrollbar-width: thin;
        scrollbar-color: rgba(150,185,235,.5) transparent;
        padding-bottom: 2px;
      }
      .grouped-nav .nav-group { gap: 4px !important; padding: 0 4px !important; }
      .grouped-nav .nav-btn { padding: 4px 5px !important; font-size: 10px !important; }
    }
  `;
  document.head.appendChild(style);
  document.querySelectorAll('.grouped-nav .nav-btn[data-new="true"]').forEach((btn) => {
    btn.classList.add('has-new');
    if (!btn.querySelector('.nav-new-badge')) {
      btn.insertAdjacentHTML('beforeend', '<span class="nav-new-badge" aria-label="새 메뉴">NEW</span>');
    }
  });
  // 기존 icon-only 축소 기능을 사용하지 않습니다.
});
