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
          <a href="https://etech-symantec.github.io/calendar">　</a>
          <a href="https://etech-symantec.github.io/broadcom" class="nav-btn" title="Broadcom">
            <img class="nav-favicon" src="https://support.broadcom.com/o/ecx-standard-theme/images/favicon.ico" alt="">
            <span class="nav-label">Broadcom</span>
          </a>
          <a href="https://etech-sym-case.vercel.app/" class="nav-btn" title="Case 관리"><span class="nav-icon">⚠️</span><span class="nav-label">Case 관리</span></a>
          <a href="https://etech-sym-ma.vercel.app/" class="nav-btn" title="유지보수"><span class="nav-icon">☑️</span><span class="nav-label">유지보수</span></a>
          <a href="https://etech-symantec.github.io/sysinfo" class="nav-btn" title="Sysinfo 분석"><span class="nav-icon">🧩</span><span class="nav-label">Sysinfo 분석</span></a>
          <a href="https://etech-symantec.github.io/mib" class="nav-btn" title="MIB"><span class="nav-icon">🪬</span><span class="nav-label">MIB</span></a>
          <a href="https://etech-symantec.github.io/archive" class="nav-btn" title="Archive 편집"><span class="nav-icon">✂️</span><span class="nav-label">Archive 편집</span></a>
          <a href="https://etech-symantec.github.io/xml" class="nav-btn" title="XML 편집"><span class="nav-icon">🗂️</span><span class="nav-label">XML 편집</span></a>
          <a href="https://etech-symantec.github.io/isg" class="nav-btn" title="ISG 분석"><span class="nav-icon">🔎</span><span class="nav-label">ISG 분석</span></a>
          <a href="https://etech-symantec.github.io/trace" class="nav-btn" title="Trace 분석"><span class="nav-icon">📄</span><span class="nav-label">Trace 분석</span></a>
          <a href="https://etech-symantec.github.io/sizing-sg" class="nav-btn" title="Sizing-SG 보기"><span class="nav-icon">📊</span><span class="nav-label">Sizing-SG 보기</span></a>
          <a href="https://etech-symantec.github.io/elk" class="nav-btn" title="ELK 로그 설정"><span class="nav-icon">🧬</span><span class="nav-label">ELK 로그 설정</span></a>
          <a href="https://etech-symantec.github.io/pac" class="nav-btn nav-btn-soon" title="PAC"><span class="nav-icon">🚦</span><span class="nav-label">PAC</span></a>
        </nav>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("afterbegin", headerHTML);

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
