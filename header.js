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
  const navEl = document.querySelector(".header-nav");
  const brandArea = document.querySelector(".brand-area");
  if (!navEl || !brandArea) return;

  // 실제 메뉴 버튼들만 마크업에 등장한 순서(왼쪽→오른쪽) 그대로 수집
  const navButtons = Array.from(navEl.querySelectorAll(".nav-btn"));

  // 완전히 맞닿기 직전, 최소한의 여백(px). 필요에 맞게 조절 가능
  const MIN_GAP = 12;

  let rafId = null;

  function collapseNavButtons() {
    // 1) 우선 전부 라벨을 보이는 상태로 되돌린 뒤 다시 계산 (화면이 넓어지면 복원되도록)
    navButtons.forEach((btn) => btn.classList.remove("icon-only"));

    // 2) 버튼 영역(제일 왼쪽 지점)이 브랜드(제목/버전) 영역의 오른쪽 끝과
    //    맞닿거나 겹칠 때까지, 왼쪽 버튼부터 순서대로 라벨을 숨김
    let i = 0;
    while (i < navButtons.length) {
      const brandRight = brandArea.getBoundingClientRect().right;
      const navRect = navEl.getBoundingClientRect();
      // header-nav는 오른쪽 정렬(justify-content: flex-end)이라
      // 실제 콘텐츠(모든 버튼)의 시작 지점 = 오른쪽 끝 - 전체 콘텐츠 너비
      const navContentLeft = navRect.right - navEl.scrollWidth;

      const isTouching = navContentLeft <= brandRight + MIN_GAP;
      if (!isTouching) break;

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

  // 창 크기 변경 시 재계산
  window.addEventListener("resize", scheduleCollapse);

  // 폰트 로딩 완료, 레이아웃 변화 등도 감지 (지원 브라우저 한정)
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(scheduleCollapse);
    ro.observe(navEl);
  }
});
