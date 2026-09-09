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
          <a href="https://etech-symantec.github.io/broadcom" class="nav-btn">
            <img class="nav-favicon" src="https://support.broadcom.com/o/ecx-standard-theme/images/favicon.ico" alt="">
            <span>Broadcom</span>
          </a>
          <a href="https://etech-sym-case.vercel.app/" class="nav-btn"><span class="nav-icon">⚠️</span><span>Case 관리</span></a>
          <a href="https://etech-sym-ma.vercel.app/" class="nav-btn"><span class="nav-icon">☑️</span><span>유지보수</span></a>
          <a href="https://etech-symantec.github.io/sysinfo" class="nav-btn"><span class="nav-icon">🧩</span><span>Sysinfo 분석</span></a>
          <a href="https://etech-symantec.github.io/mib" class="nav-btn"><span class="nav-icon">🪬</span><span>MIB</span></a>
          <a href="https://etech-symantec.github.io/archive" class="nav-btn"><span class="nav-icon">✂️</span><span>Archive 편집</span></a>
          <a href="https://etech-symantec.github.io/xml" class="nav-btn"><span class="nav-icon">🗂️</span><span>XML 편집</span></a>
          <a href="https://etech-symantec.github.io/isg" class="nav-btn"><span class="nav-icon">🔎</span><span>ISG 분석</span></a>
          <a href="https://etech-symantec.github.io/trace" class="nav-btn"><span class="nav-icon">📄</span><span>Trace 분석</span></a>
          <a href="https://etech-symantec.github.io/sizing-sg" class="nav-btn"><span class="nav-icon">📊</span><span>Sizing-SG 보기</span></a>
          <a href="https://etech-symantec.github.io/elk" class="nav-btn"><span class="nav-icon">🧬</span><span>ELK 로그 설정</span></a>
          <a href="https://etech-symantec.github.io/pac" class="nav-btn nav-btn-soon"><span class="nav-icon">🚦</span><span>PAC</span></a>
        </nav>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("afterbegin", headerHTML);
});
