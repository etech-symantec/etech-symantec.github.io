/*!
 * holiday-skin.js  —  기념일 자동 스킨
 *
 * - 기념일 BEFORE_DAYS(10)일 전 ~ 기념일 당일 +AFTER_DAYS(1)일까지 해당 스킨 적용
 * - 그 외 기간에는 아무것도 하지 않음 → 기존(기본) 스킨 그대로
 * - 기준 시간은 방문자 PC 시간대와 무관하게 한국(Asia/Seoul) 날짜
 *
 * 미리보기(주소 뒤에 붙여서 테스트)
 *   ?skin=halloween            특정 스킨 강제 적용
 *   ?date=2026-12-20           그 날짜인 것처럼 동작
 *   ?skin=off                  스킨 끄기
 *
 * 스킨 추가: HOLIDAYS 배열에 항목 하나만 추가하면 됨
 */
(function () {
  "use strict";

  var BEFORE_DAYS = 10; // 기념일 며칠 전부터
  var AFTER_DAYS = 1;   // 기념일 당일 + 며칠 후까지

  /* ------------------------------------------------------------------ */
  /* 1. 기념일 / 스킨 정의                                              */
  /*    fixed: [월, 일] 매년 고정 / dates: {연도:'YYYY-MM-DD'} 음력 등    */
  /* ------------------------------------------------------------------ */
  var HOLIDAYS = [
    {
      id: "halloween", name: "Halloween", fixed: [10, 31],
      message: "Happy Halloween!", favicon: "🎃", ornament: " 🎃",
      particles: ["🎃", "🦇", "👻", "🕸️", "🍬"], fall: "slow",
      vars: {
        bg: "linear-gradient(135deg,#150826,#2a1145,#4a1d0a)",
        text: "#ffd9a8",
        card: "rgba(48,22,72,0.55)", cardText: "#ffb347", cardBorder: "rgba(255,140,0,0.35)",
        a: "#ff7518", b: "#7b2cbf", shadow: "rgba(0,0,0,0.45)",
        headerBg: "linear-gradient(90deg,#1d0b33,#3a1560)",
        headerTitle: "#ff9a3c", headerText: "#ffd9a8", headerSub: "#b8a0d6"
      }
    },
    {
      id: "christmas", name: "Christmas", fixed: [12, 25],
      message: "Merry Christmas!", favicon: "🎄", ornament: " 🎄",
      particles: ["❄️", "❄️", "❅", "🎄", "⭐", "🎁"], fall: "snow",
      vars: {
        bg: "linear-gradient(135deg,#0b3524,#14573c,#5a1320)",
        text: "#ffffff",
        card: "rgba(255,255,255,0.14)", cardText: "#ffffff", cardBorder: "rgba(255,255,255,0.4)",
        a: "#d6112f", b: "#12a150", shadow: "rgba(0,0,0,0.4)",
        headerBg: "linear-gradient(90deg,#0d4a31,#8c1427)",
        headerTitle: "#ffffff", headerText: "#fff3d6", headerSub: "#ffd6d6"
      }
    },
    {
      id: "newyear", name: "새해", fixed: [1, 1],
      message: "Happy New Year!", favicon: "🎆", ornament: " 🎆",
      particles: ["✨", "🎆", "🎉", "🥂", "⭐"], fall: "slow",
      vars: {
        bg: "linear-gradient(135deg,#0a1030,#1b2559,#3b2a6e)",
        text: "#ffe9a8",
        card: "rgba(255,255,255,0.10)", cardText: "#ffd76a", cardBorder: "rgba(255,215,106,0.45)",
        a: "#ffb703", b: "#d62ea0", shadow: "rgba(0,0,0,0.5)",
        headerBg: "linear-gradient(90deg,#0d1538,#2c2470)",
        headerTitle: "#ffd76a", headerText: "#ffeab8", headerSub: "#b9b5e8"
      }
    },
    {
      id: "seollal", name: "설날", message: "새해 복 많이 받으세요!",
      /* 음력 1월 1일 (양력) — 이후 연도는 추가 필요 */
      dates: { 2027: "2027-02-06", 2028: "2028-01-26", 2029: "2029-02-13", 2030: "2030-02-03" },
      favicon: "🧧", ornament: " 🧧",
      particles: ["🧧", "🏮", "🌸", "🍊", "✨"], fall: "slow",
      vars: {
        bg: "linear-gradient(135deg,#fff6e3,#ffe7bf,#ffd6cc)",
        text: "#7a1f1f",
        card: "rgba(255,255,255,0.6)", cardText: "#8f1d1d", cardBorder: "rgba(214,40,40,0.35)",
        a: "#d62828", b: "#f4a300", shadow: "rgba(122,31,31,0.18)",
        headerBg: "linear-gradient(90deg,#fff1d0,#ffd9b0)",
        headerTitle: "#b3171d", headerText: "#7a1f1f", headerSub: "#a35a2a"
      }
    },
    {
      id: "valentine", name: "발렌타인데이", fixed: [2, 14],
      message: "Happy Valentine's Day!", favicon: "💖", ornament: " 💖",
      particles: ["💖", "💝", "🌹", "🍫", "💕"], fall: "slow",
      vars: {
        bg: "linear-gradient(135deg,#fff0f5,#ffd9e8,#ffc4dc)",
        text: "#8a1c4a",
        card: "rgba(255,255,255,0.55)", cardText: "#9d174d", cardBorder: "rgba(255,61,129,0.35)",
        a: "#ff3d81", b: "#b5179e", shadow: "rgba(157,23,77,0.18)",
        headerBg: "linear-gradient(90deg,#ffe3ee,#ffc6dd)",
        headerTitle: "#c2185b", headerText: "#8a1c4a", headerSub: "#b0577e"
      }
    },
    {
      id: "chuseok", name: "추석", message: "풍성한 한가위 되세요!",
      dates: { 2026: "2026-09-25", 2027: "2027-09-15", 2028: "2028-10-03", 2029: "2029-09-22", 2030: "2030-09-12" },
      favicon: "🌕", ornament: " 🌕",
      particles: ["🍂", "🍁", "🌕", "🌾", "🥮"], fall: "slow",
      vars: {
        bg: "linear-gradient(135deg,#fff8e8,#ffe5b8,#f2c48c)",
        text: "#5b3a12",
        card: "rgba(255,255,255,0.55)", cardText: "#6b3f10", cardBorder: "rgba(224,122,31,0.4)",
        a: "#e07a1f", b: "#8c4a0f", shadow: "rgba(91,58,18,0.2)",
        headerBg: "linear-gradient(90deg,#ffedc9,#f7cf9b)",
        headerTitle: "#9a4a0c", headerText: "#5b3a12", headerSub: "#8a6a3c"
      }
    }
  ];

  /* ------------------------------------------------------------------ */
  /* 2. 날짜 계산 (전부 "일 단위 정수"로 비교 → 시간대/서머타임 영향 없음)  */
  /* ------------------------------------------------------------------ */
  var MS_DAY = 86400000;
  function dayNum(y, m, d) { return Math.round(Date.UTC(y, m - 1, d) / MS_DAY); }
  function parseYMD(s) {
    var p = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || "");
    return p ? dayNum(+p[1], +p[2], +p[3]) : null;
  }
  function seoulToday() {
    var s = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" }).format(new Date());
    return parseYMD(s);
  }
  function yearOf(day) { return new Date(day * MS_DAY).getUTCFullYear(); }

  function occurrence(h, year) {
    if (h.fixed) return dayNum(year, h.fixed[0], h.fixed[1]);
    if (h.dates && h.dates[year]) return parseYMD(h.dates[year]);
    return null;
  }

  /**
   * today(일 정수)에 적용할 {holiday, diff} 반환. 없으면 null.
   * diff = 기념일 - 오늘  (3 → D-3, 0 → 당일, -1 → D+1)
   * 기간이 겹치면: 아직 안 지난 기념일 중 가장 가까운 것 우선
   *   (예: 12/22~12/26 은 크리스마스, 12/26 에는 새해로 넘어감)
   */
  function pickHoliday(today) {
    var Y = yearOf(today), found = [];
    HOLIDAYS.forEach(function (h) {
      for (var y = Y - 1; y <= Y + 1; y++) {
        var day = occurrence(h, y);
        if (day == null) continue;
        var diff = day - today;
        if (diff <= BEFORE_DAYS && diff >= -AFTER_DAYS) found.push({ holiday: h, diff: diff });
      }
    });
    if (!found.length) return null;
    found.sort(function (a, b) {
      var au = a.diff >= 0, bu = b.diff >= 0;
      if (au !== bu) return au ? -1 : 1;           // 아직 안 지난 쪽 우선
      return au ? a.diff - b.diff : b.diff - a.diff; // 더 가까운 쪽
    });
    return found[0];
  }

  // Node 테스트용
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { pickHoliday: pickHoliday, dayNum: dayNum, HOLIDAYS: HOLIDAYS };
  }
  if (typeof document === "undefined") return;
  if (window.__holidaySkinLoaded) return;
  window.__holidaySkinLoaded = true;

  /* ------------------------------------------------------------------ */
  /* 3. 오늘 적용할 스킨 결정 (미리보기 파라미터 지원)                     */
  /* ------------------------------------------------------------------ */
  var qs = new URLSearchParams(location.search);
  var forced = qs.get("skin");
  if (forced === "off") return;

  var result = null;
  if (forced) {
    var fh = HOLIDAYS.filter(function (h) { return h.id === forced; })[0];
    if (fh) result = { holiday: fh, diff: 0 };
  } else {
    var fake = parseYMD(qs.get("date"));
    result = pickHoliday(fake != null ? fake : seoulToday());
  }
  if (!result) return; // 기념일 기간 아님 → 기본 스킨 유지

  var skin = result.holiday, diff = result.diff, v = skin.vars;

  /* ------------------------------------------------------------------ */
  /* 4. CSS 주입                                                         */
  /* ------------------------------------------------------------------ */
  var root = document.documentElement;
  root.setAttribute("data-holiday-skin", skin.id);
  var isHome = /\/(index\.html)?$/.test(location.pathname);
  if (isHome) root.setAttribute("data-hs-home", "");

  var S = "html[data-holiday-skin]";
  var css = [
    S + "{",
    "--hs-bg:" + v.bg + ";--hs-text:" + v.text + ";",
    "--hs-card:" + v.card + ";--hs-card-text:" + v.cardText + ";--hs-card-border:" + v.cardBorder + ";",
    "--hs-a:" + v.a + ";--hs-b:" + v.b + ";--hs-shadow:" + v.shadow + ";",
    "--hs-header-bg:" + v.headerBg + ";--hs-header-title:" + v.headerTitle + ";",
    "--hs-header-text:" + v.headerText + ";--hs-header-sub:" + v.headerSub + ";",
    '--hs-orn:"' + skin.ornament + '";',
    "}",

    /* 메인(index) 배경 — 기존 bgMove 애니메이션은 그대로 유지 */
    "html[data-hs-home] body{background:var(--hs-bg);background-size:200% 200%;color:var(--hs-text);}",

    /* 메인 메뉴 버튼 */
    S + " .menu-btn{background:var(--hs-card);color:var(--hs-card-text);border-color:var(--hs-card-border);",
    "box-shadow:0 8px 18px var(--hs-shadow),0 3px 6px var(--hs-shadow);}",
    S + " .menu-btn:hover{background:linear-gradient(135deg,var(--hs-a),var(--hs-b));color:#fff;",
    "box-shadow:0 18px 40px rgba(0,0,0,.25),0 0 25px color-mix(in srgb,var(--hs-a) 55%,transparent),",
    "0 0 28px color-mix(in srgb,var(--hs-b) 50%,transparent);}",
    S + " .menu-btn::after{background:linear-gradient(135deg,var(--hs-a),var(--hs-b));}",
    S + " .menu-btn:hover::after{box-shadow:0 0 14px color-mix(in srgb,var(--hs-a) 70%,transparent);}",

    /* 공통 헤더 (header.js) */
    S + " .dashboard-header{background:var(--hs-header-bg);border-bottom:2px solid var(--hs-a);",
    "box-shadow:0 2px 14px var(--hs-shadow);}",
    S + " .header-title{color:var(--hs-header-title);}",
    S + " .header-title::after{content:var(--hs-orn);}",
    S + " .header-version,html[data-holiday-skin] .header-subtitle{color:var(--hs-header-sub);}",
    S + " .nav-btn{color:var(--hs-header-text);}",
    S + " .nav-btn:hover{background:color-mix(in srgb,var(--hs-a) 28%,transparent);}",

    /* 떨어지는 효과 */
    "#hs-fx{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:9998;}",
    "#hs-fx span{position:absolute;top:-12vh;opacity:.85;will-change:transform;",
    "animation:hs-fall linear infinite;text-shadow:0 0 6px rgba(255,255,255,.35);}",
    "@keyframes hs-fall{from{transform:translate3d(0,0,0) rotate(0deg);}",
    "to{transform:translate3d(var(--hs-sway),115vh,0) rotate(var(--hs-rot));}}",

    /* 하단 안내 배지 */
    "#hs-badge{position:fixed;right:16px;bottom:16px;z-index:9999;cursor:pointer;",
    "padding:8px 14px;border-radius:999px;font:14px/1.2 'Do Hyeon',sans-serif;",
    "color:#fff;background:linear-gradient(135deg,var(--hs-a),var(--hs-b));",
    "box-shadow:0 6px 18px rgba(0,0,0,.3);animation:hs-pop .6s ease both;}",
    "@keyframes hs-pop{from{opacity:0;transform:translateY(12px) scale(.9);}to{opacity:1;transform:none;}}",
    "@media (prefers-reduced-motion:reduce){#hs-fx{display:none;}}"
  ].join("");

  var styleEl = document.createElement("style");
  styleEl.id = "hs-style";
  styleEl.textContent = css;
  (document.head || root).appendChild(styleEl);

  /* ------------------------------------------------------------------ */
  /* 5. 파비콘 / 파티클 / 배지 (DOM 준비 후)                              */
  /* ------------------------------------------------------------------ */
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(function () {
    // 파비콘
    var link = document.querySelector('link[rel~="icon"]');
    if (!link) { link = document.createElement("link"); link.rel = "icon"; document.head.appendChild(link); }
    link.href = "data:image/svg+xml," + encodeURIComponent(
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>" + skin.favicon + "</text></svg>"
    );

    // 파티클
    var fx = document.createElement("div");
    fx.id = "hs-fx";
    var count = window.innerWidth < 700 ? 14 : 26;
    var snow = skin.fall === "snow";
    for (var i = 0; i < count; i++) {
      var s = document.createElement("span");
      s.textContent = skin.particles[i % skin.particles.length];
      var dur = (snow ? 9 : 12) + Math.random() * (snow ? 8 : 10);
      s.style.left = Math.random() * 100 + "%";
      s.style.fontSize = 14 + Math.random() * 18 + "px";
      s.style.animationDuration = dur + "s";
      s.style.animationDelay = -Math.random() * dur + "s"; // 처음부터 화면에 흩어져 있도록
      s.style.setProperty("--hs-sway", (Math.random() * 120 - 60) + "px");
      s.style.setProperty("--hs-rot", (Math.random() * 360 - 180) + "deg");
      fx.appendChild(s);
    }
    document.body.appendChild(fx);

    // 안내 배지 (클릭하면 닫힘)
    var dText = diff > 0 ? "D-" + diff : diff === 0 ? "D-Day" : "D+" + -diff;
    var badge = document.createElement("div");
    badge.id = "hs-badge";
    badge.title = "클릭하면 닫힙니다";
    badge.textContent = skin.favicon + " " + skin.message + " · " + skin.name + " " + dText;
    badge.addEventListener("click", function () { badge.remove(); });
    document.body.appendChild(badge);
  });
})();
