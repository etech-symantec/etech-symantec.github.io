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
          <a href="https://etech-symantec.github.io/base64" class="nav-btn" title="base64/OCR 변환기"><span class="nav-icon">🏁</span><span class="nav-label">base64/OCR</span></a>
          <a href="https://etech-symantec.github.io/broadcom" class="nav-btn" title="Broadcom">
            <img class="nav-favicon" src="https://support.broadcom.com/o/ecx-standard-theme/images/favicon.ico" alt="">
            <span class="nav-label">Broadcom</span>
          </a>
          <a href="https://etech-sym-case.vercel.app/" class="nav-btn" title="Case 관리"><span class="nav-icon">⚠️</span><span class="nav-label">Case 관리</span></a>
          <a href="https://etech-sym-ma.vercel.app/" class="nav-btn" title="유지보수"><span class="nav-icon">☑️</span><span class="nav-label">유지보수</span></a>
          <a href="https://etech-symantec.github.io/proxysg" class="nav-btn" title="SWG 웹콘솔 가이드"><span class="nav-icon">🕹️</span><span class="nav-label">SWG 웹콘솔 가이드</span></a>
          <a href="https://etech-symantec.github.io/monitoring" class="nav-btn" title="SWG 모니터링"><span class="nav-icon">🚨</span><span class="nav-label">SWG 모니터링</span></a>
          <a href="https://etech-symantec.github.io/sysinfo" class="nav-btn" title="Sysinfo 분석"><span class="nav-icon">🧩</span><span class="nav-label">Sysinfo 분석</span></a>
          <a href="https://etech-symantec.github.io/mib" class="nav-btn" title="MIB"><span class="nav-icon">🪬</span><span class="nav-label">MIB</span></a>
          <a href="https://etech-symantec.github.io/archive" class="nav-btn" title="Archive 편집"><span class="nav-icon">✂️</span><span class="nav-label">Archive 편집</span></a>
          <a href="https://etech-symantec.github.io/xml" class="nav-btn" title="XML 편집"><span class="nav-icon">🗂️</span><span class="nav-label">XML 편집</span></a>
          <a href="https://etech-symantec.github.io/isg" class="nav-btn" title="ISG 분석"><span class="nav-icon">🔎</span><span class="nav-label">ISG 분석</span></a>
          <a href="https://etech-symantec.github.io/trace" class="nav-btn" title="Trace 분석"><span class="nav-icon">📄</span><span class="nav-label">Trace 분석</span></a>
          <a href="https://etech-sym-pcap.vercel.app/" class="nav-btn" data-new="true" title="pcap 분석"><span class="nav-icon">🧮</span><span class="nav-label">pcap 분석</span></a>
          <a href="https://etech-symantec.github.io/sizing-sg" class="nav-btn" title="Sizing-SG 보기"><span class="nav-icon">📊</span><span class="nav-label">Sizing</span></a>
          <a href="https://etech-symantec.github.io/elk" class="nav-btn" title="ELK 로그 설정"><span class="nav-icon">🧬</span><span class="nav-label">ELK</span></a>
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
    btn.insertAdjacentHTML("beforeend", '<span class="nav-new-badge" aria-label="새 메뉴">NEW</span>');
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

  // ── 화면이 좁아지면, 메뉴 버튼들이 왼쪽의 "제목/버전" 영역과 맞닿는 순간부터
  //     왼쪽 버튼부터 순서대로 아이콘만 남기고 축소 ──
  const dashboardHeader = document.querySelector(".dashboard-header");
  const navEl = document.querySelector(".header-nav");
  const brandArea = document.querySelector(".brand-area");
  if (!dashboardHeader || !navEl || !brandArea) return;

  // 실제 메뉴 버튼들만 마크업에 등장한 순서(왼쪽→오른쪽) 그대로 수집
  const navButtons = Array.from(navEl.querySelectorAll(".nav-btn"));

  // 완전히 맞닿기 직전, 최소한의 여백(px). 필요에 맞게 조절 가능
  const MIN_GAP = 12;

  let rafId = null;

  // header-nav 안의 모든 요소(숨김 캘린더 링크 포함)를 지금 상태 그대로
  // 실제 렌더링된 너비 기준으로 합산 (겹침/스크롤 상태와 무관하게 정확한 값)
  function getRequiredNavWidth() {
    const children = Array.from(navEl.children);
    const gap = parseFloat(getComputedStyle(navEl).columnGap || getComputedStyle(navEl).gap) || 0;
    const navPadding =
      parseFloat(getComputedStyle(navEl).paddingLeft) +
      parseFloat(getComputedStyle(navEl).paddingRight);

    let total = navPadding;
    children.forEach((child, idx) => {
      total += child.getBoundingClientRect().width;
      if (idx > 0) total += gap;
    });
    return total;
  }

  function collapseNavButtons() {
    // 1) 우선 전부 라벨을 보이는 상태로 되돌린 뒤 다시 계산 (화면이 넓어지면 복원되도록)
    navButtons.forEach((btn) => btn.classList.remove("icon-only"));

    const headerPadding =
      parseFloat(getComputedStyle(dashboardHeader).paddingLeft) +
      parseFloat(getComputedStyle(dashboardHeader).paddingRight);

    // 2) "브랜드(제목/버전) 실제 너비 + 메뉴 전체 실제 너비"가
    //    헤더 전체 너비보다 커서 서로 맞닿을 때까지, 왼쪽 버튼부터 순서대로 라벨을 숨김
    let i = 0;
    while (i <= navButtons.length) {
      const availableWidth = dashboardHeader.getBoundingClientRect().width - headerPadding;
      const brandWidth = brandArea.getBoundingClientRect().width;
      const requiredNavWidth = getRequiredNavWidth();

      const fits = brandWidth + requiredNavWidth + MIN_GAP <= availableWidth;
      if (fits || i >= navButtons.length) break;

      navButtons[i].classList.add("icon-only");
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
