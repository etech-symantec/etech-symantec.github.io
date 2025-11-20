document.addEventListener("DOMContentLoaded", function() {
    // HTML에서 설정한 변수가 있으면 사용하고, 없으면 기본값 사용
    const title = window.pageTitle || "기본 타이틀";
    const version = window.pageVersion || "ver.1.0";

    const headerHTML = `
    <div class="header-wrap">
      <div class="top-nav">
        <div class="nav-left">
          <a href="https://etech-symantec.github.io/" class="home-btn">🪟</a>
        </div>

        <div class="nav-right">
          <a href="https://etech-symantec.github.io/broadcom" class="nav-btn">
            <img src="https://support.broadcom.com/o/ecx-standard-theme/images/favicon.ico"
                 style="width:14px;height:14px;margin-right:2px;margin-bottom:3px;vertical-align:middle;">
            Broadcom 링크
          </a>
          <a href="https://etech-symantec.github.io/sysinfo" class="nav-btn">🧩 Sysinfo 분석</a>
          <a href="https://etech-symantec.github.io/isg" class="nav-btn">🔎 ISG 분석</a>
          <a href="https://etech-symantec.github.io/trace" class="nav-btn">📄 Trace 분석</a>
          <a href="https://etech-symantec.github.io/sizing-sg" class="nav-btn">📊 Sizing-SG 보기</a>
          <a href="https://etech-symantec.github.io/elk" class="nav-btn">🧬 ELK 로그 설정</a>
          <a href="https://etech-symantec.github.io/pac" class="nav-btn-soon">🚦 PAC</a>
        </div>
      </div>

      <h1 class="gamja-flower-regular">
        <div class="title-left">
          ${title}<br>
          <span class="subtitle">by 이테크시스템</span>
        </div>
        <div class="date-container">
          <div class="version">${version}</div><p></p><p></p>
        </div>
      </h1>
    </div>
    `;

    document.body.insertAdjacentHTML("afterbegin", headerHTML);
});
