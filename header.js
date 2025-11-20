document.addEventListener("DOMContentLoaded", function() {
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

      <h1 class="dongle-regular">
        <div class="title-left">
          ELK logstash.conf 생성기<br>
          <span class="subtitle">by 이테크시스템</span>
        </div>
        <div class="date-container">
          <div class="version">ver.2025.11.17.01</div><p>
        </div>
      </h1>
    </div>
    `;

    // body 태그의 맨 처음에 헤더를 삽입합니다.
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
});
