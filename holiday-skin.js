/*!
 * holiday-skin.js  v2  —  기념일 자동 스킨 (색상 + 폰트 + 버튼 모양 + 애니메이션 + 헤더 장식)
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
 * 스킨 한 개의 구성 (HOLIDAYS 배열의 항목)
 *   vars  : 색상 팔레트
 *   look  : 폰트 / 버튼 모양 / 호버 애니메이션 / 헤더 테두리·하단 장식 / 카드 모양 (아래 DEFAULT_LOOK 참고)
 *   fx    : 화면 효과 레이어 목록. 레이어마다 움직임(m)이 다름
 *           m: fall snow petals leaves rise float twinkle fly confetti rain drift
 */
(function () {
  "use strict";

  var BEFORE_DAYS = 10; // 기념일 며칠 전부터
  var AFTER_DAYS = 1;   // 기념일 당일 + 며칠 후까지

  /* ------------------------------------------------------------------ */
  /* 0. 도우미: 색 묶음 / 헤더 하단 장식(SVG·CSS 패턴)                     */
  /* ------------------------------------------------------------------ */
  function V(bg, text, card, cardText, cardBorder, a, b, shadow, headerBg, headerTitle, headerText, headerSub) {
    return {
      bg: bg, text: text, card: card, cardText: cardText, cardBorder: cardBorder,
      a: a, b: b, shadow: shadow,
      headerBg: headerBg, headerTitle: headerTitle, headerText: headerText, headerSub: headerSub
    };
  }

  function svgUrl(w, h, inner) {
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' width='" + w + "' height='" + h + "'>" + inner + "</svg>";
    return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
  }
  // 모든 edge: { bg: CSS background 값, h: 높이(px) }
  var E = {
    teeth: function (c) { return { h: 9, bg: svgUrl(14, 9, "<path d='M0 9L7 0L14 9Z' fill='" + c + "'/>") + " repeat-x 0 100%/14px 9px" }; },
    scallop: function (c) { return { h: 8, bg: svgUrl(16, 8, "<circle cx='8' cy='0' r='8' fill='" + c + "'/>") + " repeat-x 0 0/16px 8px" }; },
    drip: function (c) {
      var svg = "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='10' viewBox='0 0 30 14' preserveAspectRatio='none'>" +
        "<path d='M0 0H30V5Q30 9 27 9Q24 9 24 5Q24 13 20 13Q16 13 16 6Q16 10 12 10Q8 10 8 5Q8 8 4 8Q0 8 0 3Z' fill='" + c + "'/></svg>";
      return { h: 10, bg: 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '") repeat-x 0 0/30px 10px' };
    },
    wave: function (c) { return { h: 10, bg: svgUrl(40, 10, "<path d='M0 6Q10 0 20 6T40 6V10H0Z' fill='" + c + "'/>") + " repeat-x 0 100%/40px 10px" }; },
    grass: function (c) { return { h: 11, bg: svgUrl(20, 11, "<path d='M0 11L3 3L6 11L9 1L12 11L15 4L18 11Z' fill='" + c + "'/>") + " repeat-x 0 100%/20px 11px" }; },
    candy: function () { return { h: 7, bg: "repeating-linear-gradient(45deg,#ffffff 0 7px,#d6112f 7px 14px)" }; },
    dancheong: function () { return { h: 6, bg: "linear-gradient(90deg,#1d4e9e 0 20%,#d62828 20% 40%,#f4d03f 40% 60%,#1e7a4c 60% 80%,#2b2b2b 80% 100%) 0 0/120px 100%" }; },
    rainbow: function () { return { h: 7, bg: "linear-gradient(90deg,#ff5f5f,#ffb703,#ffe45e,#7bd389,#4cc9f0,#a779ff,#ff5fa2)" }; },
    straw: function () { return { h: 7, bg: "repeating-linear-gradient(90deg,#e0b050 0 3px,#a8741f 3px 6px)" }; },
    dots: function (c) { return { h: 9, bg: "radial-gradient(circle," + c + " 2.6px,transparent 3px) 0 0/13px 9px" }; },
    split: function (a, b) { return { h: 6, bg: "linear-gradient(90deg," + a + " 50%," + b + " 50%)" }; },
    gold: function () { return { h: 4, bg: "repeating-linear-gradient(90deg,#ffd76a 0 14px,#1e5bd8 14px 28px)" }; },
    ink: function (c) { return { h: 4, bg: "linear-gradient(90deg,transparent," + c + " 10%," + c + " 90%,transparent)" }; },
    line: function (c) { return { h: 3, bg: c }; },
    pencil: function () { return { h: 6, bg: "repeating-linear-gradient(90deg,#f2b705 0 16px,#e0a000 16px 32px)" }; }
  };

  /* ------------------------------------------------------------------ */
  /* 1. 룩앤필 기본값 (스킨의 look 에서 필요한 것만 덮어씀)                 */
  /* ------------------------------------------------------------------ */
  var DEFAULT_LOOK = {
    font: null,            // 구글 폰트 패밀리 이름 (null 이면 기존 폰트 유지)
    fontQuery: null,       // 구글 폰트 URL 의 family= 값 직접 지정(굵기 지정 등)
    titleSize: 21, titleWeight: 800, titleSpacing: "-0.018em",
    navSize: 10, navWeight: 400, navSpacing: "0",
    navRadius: "999px", navBorderW: "1px", navBorderStyle: "solid", navBorderColor: null,
    navFill: null, navColor: null, navShadow: null,
    navPalette: null,      // 메뉴 버튼마다 돌아가며 쓰는 색 목록 (CSS 변수 --pc)
    navHover: "jelly",     // jelly wiggle bounce pulse heart shake float flicker stamp none
    hoverBg: null,         // null=포인트 그라데이션, "pc"=팔레트 색
    hoverColor: "#fff",
    headRadius: "12px", headBorderW: "1px", headBorderStyle: "solid", headBorderColor: null,
    headBg: null, headShadow: null, homeRadius: "12px",
    edge: null,            // 헤더 하단 장식 E.xxx() / null 이면 이모지 띠
    strip: true,
    sweep: false,          // 헤더 위로 빛이 지나가는 효과
    menuSize: 22, cardRadius: "20px", cardBorderW: "1px", cardBorderStyle: "solid",
    cardFill: null, cardBorderColor: null, cardShadow: null, cardIdle: "float", cardPalette: null, cardOrigin: null,
    bgPattern: null, bgSize: null,
    badgeRadius: "999px",
    extra: ""              // 스킨 전용 추가 CSS ( & = html[data-holiday-skin] )
  };

  /* ------------------------------------------------------------------ */
  /* 2. 기념일 / 스킨 정의                                              */
  /*    fixed: [월, 일] 매년 고정 / dates: {연도:'YYYY-MM-DD'} 음력 등    */
  /* ------------------------------------------------------------------ */
  var HOLIDAYS = [

    /* ===== 🎃 할로윈 : 으스스한 손글씨 + 삐죽한 이빨 테두리 + 박쥐가 날아다님 ===== */
    {
      id: "halloween", name: "Halloween", fixed: [10, 31],
      message: "Happy Halloween!", favicon: "🎃", ornament: " 🎃",
      vars: V("linear-gradient(135deg,#150826,#2a1145,#4a1d0a)", "#ffd9a8", "rgba(48,22,72,0.55)", "#ffb347", "rgba(255,140,0,0.55)",
        "#ff7518", "#7b2cbf", "rgba(0,0,0,0.45)", "linear-gradient(90deg,#1d0b33,#3a1560)", "#ff9a3c", "#ffd9a8", "#b8a0d6"),
      look: {
        font: "East Sea Dokdo", titleSize: 29, titleWeight: 400, titleSpacing: "0.03em", navSize: 14, menuSize: 26,
        navRadius: "4px 14px 4px 14px", navBorderW: "2px", navBorderStyle: "dashed", navBorderColor: "rgba(255,140,0,.75)",
        navHover: "shake", headRadius: "6px", headBorderW: "2px", edge: E.teeth("#ff7518"),
        cardRadius: "6px 28px 6px 28px", cardBorderW: "2px", cardBorderStyle: "dashed", cardIdle: "sway",
        extra: "& .header-title{animation:hs-k-flick 3.4s steps(1) infinite;}"
      },
      fx: [
        { m: "fly", p: ["🦇"], n: 7, s: [20, 36], d: [9, 17] },
        { m: "twinkle", p: ["👻"], n: 4, s: [28, 44], o: 0.9 },
        { m: "fall", p: ["🎃", "🕸️", "🍬"], n: 8, s: [16, 28], d: [12, 20] }
      ]
    },

    /* ===== 🎄 크리스마스 : 통통한 폰트 + 장식 구슬 버튼 + 캔디케인 + 눈 ===== */
    {
      id: "christmas", name: "Christmas", fixed: [12, 25],
      message: "Merry Christmas!", favicon: "🎄", ornament: " 🎄",
      vars: V("linear-gradient(135deg,#0b3524,#14573c,#5a1320)", "#ffffff", "rgba(255,255,255,0.14)", "#ffffff", "rgba(255,215,120,0.8)",
        "#d6112f", "#12a150", "rgba(0,0,0,0.4)", "linear-gradient(90deg,#0d4a31,#8c1427)", "#ffffff", "#fff3d6", "#ffd6d6"),
      look: {
        font: "Jua", titleSize: 23, titleWeight: 400, titleSpacing: "0.01em", navSize: 11.5, menuSize: 22,
        navPalette: ["#d6112f", "#12a150"], navBorderW: "2px", navBorderColor: "rgba(255,255,255,.85)", navColor: "#fff",
        navFill: "radial-gradient(circle at 30% 22%,rgba(255,255,255,.55),transparent 38%),var(--pc)",
        navHover: "jelly", hoverBg: "pc", headRadius: "18px", headBorderW: "3px", headBorderColor: "rgba(255,255,255,.9)",
        edge: E.candy(), cardRadius: "50%", cardBorderW: "4px", cardBorderStyle: "solid", cardIdle: "swing", cardOrigin: "50% -14px",
        extra: ""
      },
      fx: [
        { m: "snow", p: ["❄️", "❅", "❆"], n: 24, s: [11, 26], d: [9, 17], sw: 40, rot: 30 },
        { m: "fall", p: ["⭐", "🎁", "🎄"], n: 5, s: [18, 28], d: [14, 22] },
        { m: "twinkle", p: ["✨", "🔴", "🟢", "🟡"], n: 10, s: [10, 18] }
      ]
    },

    /* ===== 🎆 새해 : 명조 서체 + 금테 각진 버튼 + 지나가는 빛 + 불꽃 ===== */
    {
      id: "newyear", name: "새해", fixed: [1, 1],
      message: "Happy New Year!", favicon: "🎆", ornament: " 🎆",
      vars: V("linear-gradient(135deg,#0a1030,#1b2559,#3b2a6e)", "#ffe9a8", "rgba(255,255,255,0.10)", "#ffd76a", "rgba(255,215,106,0.7)",
        "#ffb703", "#d62ea0", "rgba(0,0,0,0.5)", "linear-gradient(90deg,#0d1538,#2c2470)", "#ffd76a", "#ffeab8", "#b9b5e8"),
      look: {
        font: "Noto Serif KR", fontQuery: "Noto+Serif+KR:wght@600;800", titleSize: 21, titleWeight: 800, titleSpacing: "0.07em",
        navSize: 10.5, navWeight: 600, navSpacing: "0.06em", menuSize: 20,
        navRadius: "2px", navBorderColor: "rgba(255,215,106,.75)", navFill: "rgba(255,215,106,.07)", navColor: "#ffe9a8",
        navHover: "none", hoverBg: "linear-gradient(135deg,#ffd76a,#ffb703)", hoverColor: "#1a1230",
        headRadius: "4px", headBorderW: "4px", headBorderStyle: "double", headBorderColor: "#ffd76a",
        edge: E.line("linear-gradient(90deg,transparent,#ffd76a,transparent)"), sweep: true,
        cardRadius: "0", cardBorderW: "4px", cardBorderStyle: "double", cardIdle: "none"
      },
      fx: [
        { m: "twinkle", p: ["🎆", "✨", "⭐", "🎇"], n: 14, s: [18, 40] },
        { m: "confetti", p: ["#ffd76a", "#ff6fb5", "#8fb8ff", "#ffffff"], n: 22, s: [10, 18], d: [5, 9] },
        { m: "rise", p: ["🥂"], n: 2, s: [26, 32], d: [16, 22] }
      ]
    },

    /* ===== 🧧 설날 : 바탕체 + 한지 느낌 겹테두리 + 오방색 단청 띠 + 등불 ===== */
    {
      id: "seollal", name: "설날", message: "새해 복 많이 받으세요!",
      dates: { 2027: "2027-02-06", 2028: "2028-01-26", 2029: "2029-02-13", 2030: "2030-02-03" },
      favicon: "🧧", ornament: " 🧧",
      vars: V("linear-gradient(135deg,#fff6e3,#ffe7bf,#ffd6cc)", "#7a1f1f", "rgba(255,250,235,0.85)", "#8f1d1d", "rgba(179,23,29,0.7)",
        "#d62828", "#f4a300", "rgba(122,31,31,0.18)", "linear-gradient(90deg,#fff1d0,#ffd9b0)", "#b3171d", "#7a1f1f", "#a35a2a"),
      look: {
        font: "Gowun Batang", fontQuery: "Gowun+Batang:wght@400;700", titleSize: 22, titleWeight: 700, titleSpacing: "0.02em",
        navSize: 11, navWeight: 700, menuSize: 21,
        navRadius: "3px", navBorderW: "3px", navBorderStyle: "double", navBorderColor: "rgba(179,23,29,.7)",
        navFill: "rgba(255,250,235,.92)", navHover: "pulse", hoverBg: "linear-gradient(135deg,#d62828,#b3171d)",
        headRadius: "4px", headBorderW: "3px", headBorderStyle: "double", headBorderColor: "#b3171d", edge: E.dancheong(),
        cardRadius: "4px", cardBorderW: "3px", cardBorderStyle: "double", cardIdle: "sway"
      },
      fx: [
        { m: "rise", p: ["🏮"], n: 5, s: [24, 38], d: [18, 28], sw: 40, rot: 20 },
        { m: "petals", p: ["🌸"], n: 10, s: [14, 24], d: [11, 19], sw: 120 },
        { m: "leaves", p: ["🧧", "🍊"], n: 4, s: [22, 30], d: [16, 24] }
      ]
    },

    /* ===== 💖 발렌타인 : 손글씨 + 바늘땀(점선) 리본 + 레이스 하단 + 두근두근 ===== */
    {
      id: "valentine", name: "발렌타인데이", fixed: [2, 14],
      message: "Happy Valentine's Day!", favicon: "💖", ornament: " 💖",
      vars: V("linear-gradient(135deg,#fff0f5,#ffd9e8,#ffc4dc)", "#8a1c4a", "rgba(255,255,255,0.7)", "#9d174d", "rgba(255,61,129,0.7)",
        "#ff3d81", "#b5179e", "rgba(157,23,77,0.18)", "linear-gradient(90deg,#ffe3ee,#ffc6dd)", "#c2185b", "#8a1c4a", "#b0577e"),
      look: {
        font: "Gaegu", fontQuery: "Gaegu:wght@400;700", titleSize: 25, titleWeight: 700, titleSpacing: "0", navSize: 13, navWeight: 700, menuSize: 24,
        navBorderW: "2px", navBorderStyle: "dashed", navBorderColor: "#ff6fa5", navFill: "linear-gradient(180deg,#fff,#ffe1ee)",
        navHover: "heart", hoverBg: "linear-gradient(135deg,#ff3d81,#b5179e)",
        headRadius: "26px", headBorderW: "3px", headBorderStyle: "dashed", headBorderColor: "#ff6fa5", edge: E.scallop("#ff9ec4"),
        cardRadius: "30px", cardBorderW: "3px", cardBorderStyle: "dashed", cardIdle: "pulse"
      },
      fx: [
        { m: "float", p: ["💖", "💝", "💕", "💗"], n: 16, s: [16, 36], d: [9, 16], sw: 60, rot: 30 },
        { m: "petals", p: ["🌹"], n: 5, s: [16, 24], d: [12, 18] },
        { m: "twinkle", p: ["✨"], n: 6, s: [12, 20] }
      ]
    },

    /* ===== 🌕 추석 : 명조 + 한옥 창문(아치) 카드 + 볏짚 띠 + 낙엽이 흔들리며 떨어짐 ===== */
    {
      id: "chuseok", name: "추석", message: "풍성한 한가위 되세요!",
      dates: { 2026: "2026-09-25", 2027: "2027-09-15", 2028: "2028-10-03", 2029: "2029-09-22", 2030: "2030-09-12" },
      favicon: "🌕", ornament: " 🌕",
      vars: V("linear-gradient(135deg,#fff8e8,#ffe5b8,#f2c48c)", "#5b3a12", "rgba(255,255,255,0.6)", "#6b3f10", "rgba(184,116,42,0.75)",
        "#e07a1f", "#8c4a0f", "rgba(91,58,18,0.2)", "linear-gradient(90deg,#ffedc9,#f7cf9b)", "#9a4a0c", "#5b3a12", "#8a6a3c"),
      look: {
        font: "Nanum Myeongjo", fontQuery: "Nanum+Myeongjo:wght@400;800", titleSize: 21, titleWeight: 800, navSize: 10.5, navWeight: 800, menuSize: 20,
        navBorderW: "2px", navBorderColor: "#b8742a", navFill: "linear-gradient(180deg,#fff6dc,#f6dcaa)",
        navHover: "float", hoverBg: "linear-gradient(135deg,#e07a1f,#8c4a0f)",
        headRadius: "10px", headBorderW: "4px", headBorderColor: "#8a5a1a", edge: E.straw(),
        cardRadius: "999px 999px 22px 22px", cardBorderW: "3px", cardBorderColor: null, cardIdle: "float",
        extra: "& .menu-btn{box-shadow:0 0 26px rgba(255,214,120,.55),0 8px 18px var(--hs-shadow) !important;}"
      },
      fx: [
        { m: "leaves", p: ["🍂", "🍁"], n: 14, s: [18, 32], d: [10, 18], sw: 90 },
        { m: "twinkle", p: ["🌕"], n: 2, s: [60, 84], o: 0.35, t: [6, 10] },
        { m: "fall", p: ["🌾", "🥮"], n: 4, s: [18, 26], d: [14, 22] }
      ]
    },

    /* ===== 🍬 화이트데이 : 말랑한 폰트 + 사탕 컬러 버튼 + 물방울 무늬 + 비눗방울 ===== */
    {
      id: "whiteday", name: "화이트데이", fixed: [3, 14],
      message: "Happy White Day!", favicon: "🍬", ornament: " 🍬",
      vars: V("linear-gradient(135deg,#ffffff,#e8f4ff,#d6ebff)", "#2b5a8a", "rgba(255,255,255,0.8)", "#2f6fb0", "rgba(255,255,255,1)",
        "#5aa9f0", "#b48cf2", "rgba(60,110,170,0.18)", "linear-gradient(90deg,#f4faff,#d9ecff)", "#2f6fb0", "#2b5a8a", "#6a8fb5"),
      look: {
        font: "Gowun Dodum", titleSize: 22, titleWeight: 400, navSize: 11, menuSize: 21,
        navPalette: ["#7cc4ff", "#c7a2ff", "#ffb3d9", "#8fe0c4"], navBorderW: "2px", navBorderColor: "var(--pc)",
        navFill: "#ffffff", navColor: "#2b5a8a", navHover: "jelly", hoverBg: "pc",
        headRadius: "22px", headBorderW: "3px", headBorderColor: "#ffffff", edge: E.dots("#ffffff"),
        cardRadius: "30px", cardBorderW: "4px", cardBorderColor: null, cardIdle: "float",
        bgPattern: "radial-gradient(circle,rgba(255,255,255,.9) 3px,transparent 4px)", bgSize: "42px 42px"
      },
      fx: [
        { m: "float", p: ["🫧"], n: 12, s: [20, 42], d: [10, 18], o: 0.75 },
        { m: "petals", p: ["🍬", "🍭", "🤍", "💙"], n: 9, s: [14, 24], d: [11, 19] }
      ]
    },

    /* ===== 🌳 식목일 : 손글씨 + 나뭇잎 모양 버튼/헤더 + 풀잎 하단 + 나비 ===== */
    {
      id: "arborday", name: "식목일", fixed: [4, 5],
      message: "나무를 심어요!", favicon: "🌳", ornament: " 🌳",
      vars: V("linear-gradient(135deg,#f3fbe9,#dff3c8,#c6e8a8)", "#2e5a1c", "rgba(255,255,255,0.65)", "#2f6b1f", "rgba(80,160,60,0.7)",
        "#4caf50", "#9ccc3c", "rgba(46,90,28,0.2)", "linear-gradient(90deg,#eaf8d8,#cfeab0)", "#2f7d1f", "#2e5a1c", "#6f9a58"),
      look: {
        font: "Gamja Flower", titleSize: 26, titleWeight: 400, navSize: 13, menuSize: 24,
        navRadius: "14px 2px 14px 2px", navBorderW: "2px", navBorderColor: "#5fae3a", navFill: "linear-gradient(135deg,#f6ffe9,#d6f0b0)",
        navHover: "wiggle", hoverBg: "linear-gradient(135deg,#4caf50,#9ccc3c)",
        headRadius: "8px 30px 8px 30px", headBorderW: "3px", headBorderColor: "#5fae3a", edge: E.grass("#5fae3a"),
        cardRadius: "34px 6px 34px 6px", cardBorderW: "3px", cardIdle: "sway"
      },
      fx: [
        { m: "leaves", p: ["🍃", "🌿"], n: 12, s: [16, 28], d: [10, 17], sw: 80 },
        { m: "fly", p: ["🦋"], n: 4, s: [20, 28], d: [12, 20] },
        { m: "twinkle", p: ["🌱"], n: 4, s: [20, 30] }
      ]
    },

    /* ===== 🌍 지구의 날 : 또렷한 고딕 + 물결 하단 + 물방울 모양 카드 + 빗방울 ===== */
    {
      id: "earthday", name: "지구의 날", fixed: [4, 22],
      message: "Happy Earth Day!", favicon: "🌍", ornament: " 🌍",
      vars: V("linear-gradient(135deg,#e6f7ff,#d2f1e2,#bfe8cf)", "#1f5a4a", "rgba(255,255,255,0.65)", "#1d6b57", "rgba(30,155,215,0.7)",
        "#1e9bd7", "#2eb872", "rgba(30,90,74,0.2)", "linear-gradient(90deg,#dff4ff,#c6ecd8)", "#1a7d62", "#1f5a4a", "#5f9a88"),
      look: {
        font: "Sunflower", fontQuery: "Sunflower:wght@300;700", titleSize: 21, titleWeight: 700, navSize: 10.5, navWeight: 700, menuSize: 21,
        navRadius: "8px", navBorderW: "2px", navBorderColor: "#1e9bd7", navFill: "linear-gradient(180deg,#ffffff,#d3f0ff)",
        navHover: "float", hoverBg: "linear-gradient(135deg,#1e9bd7,#2eb872)",
        headRadius: "16px", headBorderW: "2px", headBorderColor: "#1e9bd7", edge: E.wave("#1e9bd7"),
        cardRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", cardBorderW: "3px", cardIdle: "float"
      },
      fx: [
        { m: "rain", p: ["💧"], n: 18, s: [12, 20], d: [1.4, 2.6], sw: -25, rot: 0 },
        { m: "float", p: ["🌍"], n: 2, s: [46, 60], d: [24, 34], o: 0.6 },
        { m: "leaves", p: ["🌱", "🍃"], n: 5, s: [16, 24], d: [12, 18] }
      ]
    },

    /* ===== 🎈 어린이날 : 장난감 블록 버튼(알록달록) + 무지개 띠 + 통통 튀는 카드 ===== */
    {
      id: "childrensday", name: "어린이날", fixed: [5, 5],
      message: "즐거운 어린이날!", favicon: "🎈", ornament: " 🎈",
      vars: V("linear-gradient(135deg,#fff9d6,#ffe3f0,#d9f0ff)", "#6a3d9a", "rgba(255,255,255,0.8)", "#7b3fbf", "#ffffff",
        "#ff5fa2", "#33a1fd", "rgba(120,80,170,0.2)", "linear-gradient(90deg,#fff3b8,#ffd3ea,#cfeaff)", "#e0408a", "#6a3d9a", "#8a7ab5"),
      look: {
        font: "Single Day", titleSize: 24, titleWeight: 400, navSize: 12, menuSize: 22,
        navPalette: ["#ff5fa2", "#ffb703", "#4cc9f0", "#7bd389", "#a779ff"], navRadius: "10px", navBorderW: "2px", navBorderColor: "rgba(255,255,255,.9)",
        navFill: "var(--pc)", navColor: "#ffffff", navShadow: "0 3px 0 rgba(0,0,0,.2)",
        navHover: "bounce", hoverBg: "pc",
        headRadius: "22px", headBorderW: "4px", headBorderColor: "#ffffff", headShadow: "0 5px 0 #ffb703,0 10px 20px rgba(120,80,170,.25)",
        edge: E.rainbow(),
        cardPalette: ["#ff5fa2", "#ffb703", "#4cc9f0", "#7bd389"], cardRadius: "40px", cardBorderW: "5px", cardBorderColor: "var(--pc)", cardIdle: "bounce",
        extra: "& .menu-btn{box-shadow:0 8px 0 color-mix(in srgb,var(--pc) 70%,#000),0 12px 20px rgba(0,0,0,.12) !important;}"
      },
      fx: [
        { m: "rise", p: ["🎈"], n: 9, s: [28, 44], d: [12, 20], sw: 50 },
        { m: "confetti", p: ["#ff5fa2", "#ffb703", "#4cc9f0", "#7bd389", "#a779ff"], n: 26, s: [10, 18], d: [4, 8] },
        { m: "petals", p: ["🌈", "🧸", "🎠"], n: 5, s: [24, 34], d: [12, 18] }
      ]
    },

    /* ===== 💐 어버이날 : 따뜻한 손글씨 + 꽃잎 모양 카드 + 레이스 + 꽃잎이 흩날림 ===== */
    {
      id: "parentsday", name: "어버이날", fixed: [5, 8],
      message: "감사합니다, 사랑합니다", favicon: "💐", ornament: " 💐",
      vars: V("linear-gradient(135deg,#fff5f5,#ffe0e0,#ffcfd2)", "#8c1f2d", "rgba(255,255,255,0.7)", "#a3202f", "rgba(224,100,120,0.8)",
        "#e0334c", "#ff8fa3", "rgba(140,31,45,0.18)", "linear-gradient(90deg,#ffeaea,#ffcdd2)", "#c2182f", "#8c1f2d", "#b26a74"),
      look: {
        font: "Hi Melody", titleSize: 26, titleWeight: 400, navSize: 13, menuSize: 25,
        navBorderW: "2px", navBorderColor: "#f2a1b0", navFill: "linear-gradient(180deg,#ffffff,#ffe3e8)",
        navHover: "float", hoverBg: "linear-gradient(135deg,#e0334c,#ff8fa3)",
        headRadius: "30px", headBorderW: "2px", headBorderColor: "#f2a1b0", edge: E.scallop("#f7b5c1"),
        cardRadius: "12px 60px 12px 60px", cardBorderW: "4px", cardBorderStyle: "double", cardIdle: "sway"
      },
      fx: [
        { m: "petals", p: ["🌸", "🌷", "💐"], n: 14, s: [16, 28], d: [11, 19], sw: 140 },
        { m: "twinkle", p: ["❤️"], n: 6, s: [14, 22] },
        { m: "float", p: ["💗"], n: 4, s: [16, 26], d: [12, 18] }
      ]
    },

    /* ===== 🌻 스승의 날 : 분필 손글씨 + 칠판/나무 액자 헤더 + 공책 카드 ===== */
    {
      id: "teachersday", name: "스승의 날", fixed: [5, 15],
      message: "스승의 은혜에 감사드립니다", favicon: "🌻", ornament: " 🌻",
      vars: V("linear-gradient(135deg,#fffbe6,#fff0b8,#e6f2c2)", "#5a4a10", "rgba(255,253,242,0.9)", "#5a4a10", "rgba(201,162,74,0.9)",
        "#f2b705", "#6fb33a", "rgba(90,74,16,0.18)", "linear-gradient(135deg,#1e4a3a,#2a5a48)", "#f7f4e8", "#f7f4e8", "#c8d8c0"),
      look: {
        font: "Nanum Pen Script", titleSize: 30, titleWeight: 400, titleSpacing: "0.02em", navSize: 15, navSpacing: "0.02em", menuSize: 27,
        navRadius: "6px", navBorderW: "2px", navBorderStyle: "dashed", navBorderColor: "rgba(255,255,255,.75)", navFill: "transparent",
        navHover: "wiggle", hoverBg: "#f7f4e8", hoverColor: "#1d3b2e",
        headRadius: "6px", headBorderW: "7px", headBorderColor: "#9b6a35",
        headBg: "radial-gradient(circle at 30% 20%,rgba(255,255,255,.1),transparent 50%),linear-gradient(135deg,#1e4a3a,#2a5a48)",
        headShadow: "inset 0 0 22px rgba(0,0,0,.4),0 8px 20px rgba(0,0,0,.2)", edge: E.pencil(),
        cardRadius: "4px", cardBorderW: "3px", cardBorderStyle: "dashed", cardIdle: "sway",
        cardFill: "linear-gradient(90deg,transparent 18px,rgba(230,80,80,.5) 18px 19px,transparent 19px),repeating-linear-gradient(180deg,transparent 0 26px,rgba(90,150,220,.3) 26px 27px),#fffdf2",
        extra: "& .header-title{text-shadow:0 0 3px rgba(255,255,255,.55) !important;}"
      },
      fx: [
        { m: "drift", p: ["✏️", "📚", "🍎", "🔔"], n: 9, s: [18, 28], d: [16, 26], sw: 60, rot: 90 },
        { m: "petals", p: ["🌻"], n: 4, s: [22, 30], d: [12, 18] },
        { m: "twinkle", p: ["⭐"], n: 5, s: [14, 22] }
      ]
    },

    /* ===== 🎗️ 현충일 : 절제된 명조 + 검은 헤더 + 장식/움직임 최소화 ===== */
    {
      id: "memorialday", name: "현충일", fixed: [6, 6],
      message: "호국영령을 기립니다", favicon: "🎗️", ornament: " 🎗️",
      vars: V("linear-gradient(135deg,#f4f4f4,#e4e4e6,#d2d3d8)", "#2a2a2e", "rgba(255,255,255,0.7)", "#2a2a2e", "rgba(60,60,70,0.5)",
        "#3a3a42", "#8a8a96", "rgba(0,0,0,0.12)", "linear-gradient(90deg,#111114,#26262b)", "#f2f2f2", "#e8e8ea", "#9a9aa5"),
      look: {
        font: "Song Myung", titleSize: 22, titleWeight: 400, titleSpacing: "0.08em", navSize: 11, navSpacing: "0.04em", menuSize: 22,
        navRadius: "2px", navBorderColor: "rgba(255,255,255,.3)", navFill: "transparent", navHover: "none",
        hoverBg: "rgba(255,255,255,.16)", hoverColor: "#ffffff",
        headRadius: "2px", headBorderColor: "#55555d", headShadow: "0 4px 12px rgba(0,0,0,.25)", edge: E.line("#ffffff"), strip: false,
        cardRadius: "2px", cardBorderColor: null, cardShadow: "0 4px 10px rgba(0,0,0,.12)", cardIdle: "none"
      },
      fx: [
        { m: "drift", p: ["🕊️", "🎗️"], n: 4, s: [22, 30], d: [26, 38], o: 0.7, sw: 30, rot: 20 },
        { m: "drift", p: ["🌺"], n: 3, s: [18, 24], d: [28, 40], o: 0.5 }
      ]
    },

    /* ===== 🏖️ 여름휴가 : 굵은 포스터 폰트 + 파도 하단 + 구름이 흘러감 ===== */
    {
      id: "summer", name: "여름휴가", fixed: [7, 25],
      message: "시원한 여름 보내세요!", favicon: "🏖️", ornament: " 🏖️",
      vars: V("linear-gradient(135deg,#e0f7ff,#b8ecff,#ffe9b0)", "#0b5c7a", "rgba(255,255,255,0.7)", "#0b6d92", "rgba(255,159,28,0.8)",
        "#00a8e8", "#ff9f1c", "rgba(11,92,122,0.2)", "linear-gradient(90deg,#d6f4ff,#ffe6a8)", "#0877a0", "#0b5c7a", "#5f98ad"),
      look: {
        font: "Black Han Sans", titleSize: 21, titleWeight: 400, titleSpacing: "0.01em", navSize: 10.5, menuSize: 21,
        navBorderW: "2px", navBorderColor: "#ff9f1c", navFill: "linear-gradient(180deg,#ffffff,#ffe9b0)",
        navHover: "bounce", hoverBg: "linear-gradient(135deg,#00a8e8,#ff9f1c)",
        headRadius: "14px 14px 30px 30px", headBorderW: "2px", headBorderColor: "#00a8e8", edge: E.wave("#00a8e8"),
        cardRadius: "50% 50% 24px 24px", cardBorderW: "3px", cardIdle: "float"
      },
      fx: [
        { m: "fly", p: ["☁️"], n: 4, s: [34, 56], d: [40, 70], o: 0.8 },
        { m: "float", p: ["🫧", "🐚"], n: 8, s: [16, 30], d: [10, 17] },
        { m: "twinkle", p: ["☀️"], n: 2, s: [36, 48], t: [4, 7] },
        { m: "fall", p: ["🍉", "🍦", "🌴"], n: 4, s: [22, 30], d: [12, 20] }
      ]
    },

    /* ===== 🌺 광복절 : 각진 고딕 + 태극 빨강/파랑 번갈아 버튼 + 비둘기가 날아감 ===== */
    {
      id: "liberationday", name: "광복절", fixed: [8, 15],
      message: "광복절을 기념합니다", favicon: "🌺", ornament: " 🌺",
      vars: V("linear-gradient(135deg,#ffffff,#eef3fb,#fbeaec)", "#0d2f6b", "rgba(255,255,255,0.85)", "#0b3a8a", "rgba(0,71,160,0.4)",
        "#cd2e3a", "#0047a0", "rgba(13,47,107,0.18)", "linear-gradient(90deg,#ffffff,#e6edf9)", "#0047a0", "#0d2f6b", "#cd2e3a"),
      look: {
        font: "Do Hyeon", titleSize: 22, titleWeight: 400, titleSpacing: "0.02em", navSize: 11, menuSize: 22,
        navPalette: ["#cd2e3a", "#0047a0"], navRadius: "0", navBorderW: "2px", navBorderColor: "var(--pc)", navFill: "#ffffff", navColor: "var(--pc)",
        navHover: "stamp", hoverBg: "pc",
        headRadius: "0", headBorderW: "3px", headBorderColor: "#0047a0", edge: E.split("#cd2e3a", "#0047a0"),
        cardPalette: ["#cd2e3a", "#0047a0"], cardRadius: "0", cardBorderW: "3px", cardBorderColor: "var(--pc)", cardIdle: "none",
        extra: "& .menu-btn{color:var(--pc) !important;}& .menu-btn:hover{color:#fff !important;background:var(--pc) !important;}"
      },
      fx: [
        { m: "fly", p: ["🕊️"], n: 5, s: [24, 36], d: [10, 18] },
        { m: "confetti", p: ["#cd2e3a", "#0047a0"], n: 16, s: [10, 16], d: [6, 10] },
        { m: "twinkle", p: ["🌺"], n: 6, s: [20, 32] }
      ]
    },

    /* ===== 한 한글날 : 붓글씨 + 인장(도장) 버튼 + 먹선 하단 + 글자가 먹처럼 번졌다 사라짐 ===== */
    {
      id: "hangul", name: "한글날", fixed: [10, 9],
      message: "한글날을 축하합니다", favicon: "한", ornament: " 한글",
      vars: V("linear-gradient(135deg,#fbf6e9,#f3ead2,#e9dcb9)", "#1f2a44", "rgba(255,255,255,0.65)", "#1f2a44", "rgba(192,57,43,0.85)",
        "#2b4c7e", "#c0392b", "rgba(31,42,68,0.2)", "linear-gradient(90deg,#f7efd9,#eadfc0)", "#1f3a6e", "#1f2a44", "#7a7560"),
      look: {
        font: "Nanum Brush Script", titleSize: 30, titleWeight: 400, titleSpacing: "0.03em", navSize: 15, menuSize: 27,
        navRadius: "3px", navBorderW: "2px", navBorderColor: "#c0392b", navFill: "rgba(255,255,255,.6)", navColor: "#1f2a44",
        navHover: "stamp", hoverBg: "#c0392b",
        headRadius: "2px", headBorderW: "1px", headBorderColor: "#1f2a44", edge: E.ink("#1f2a44"),
        cardRadius: "3px", cardBorderW: "3px", cardBorderColor: null, cardIdle: "none",
        bgPattern: "repeating-linear-gradient(0deg,rgba(120,100,60,.05) 0 1px,transparent 1px 5px)", bgSize: "100% 5px"
      },
      fx: [
        { m: "twinkle", p: ["ㄱ", "ㅏ", "ㅎ", "ㅁ", "ㅅ", "ㅣ", "ㅗ", "ㄴ"], n: 14, s: [34, 64], o: 0.3, c: "#1f2a44", t: [4, 8] },
        { m: "drift", p: ["ㄱ", "ㅏ", "ㅎ", "ㅁ"], n: 5, s: [22, 32], d: [20, 30], o: 0.45, c: "#c0392b" }
      ]
    },

    /* ===== 🍫 빼빼로데이 : 둥글둥글 레트로 폰트 + 초콜릿 바 격자 + 딸기 시럽 하단 ===== */
    {
      id: "pepero", name: "빼빼로데이", fixed: [11, 11],
      message: "Happy Pepero Day!", favicon: "🍫", ornament: " 🍫",
      vars: V("linear-gradient(135deg,#3b1f14,#5a3020,#8a1c2b)", "#ffe0c2", "rgba(255,255,255,0.12)", "#ffe0c2", "rgba(255,200,160,0.5)",
        "#e63946", "#b5651d", "rgba(0,0,0,0.45)", "linear-gradient(90deg,#3f2216,#7a2230)", "#ffd2a8", "#ffe0c2", "#d9a98c"),
      look: {
        font: "Yeon Sung", titleSize: 22, titleWeight: 400, titleSpacing: "0.02em", navSize: 11, menuSize: 22,
        navRadius: "6px", navBorderW: "2px", navBorderColor: "#2b150c", navColor: "#ffe0c2",
        navFill: "radial-gradient(circle,rgba(255,255,255,.85) 1.4px,transparent 2px) 0 0/11px 11px,linear-gradient(180deg,#6b3a1d,#4a2412)",
        navHover: "wiggle", hoverBg: "linear-gradient(135deg,#e63946,#b5651d)",
        headRadius: "4px", headBorderW: "4px", headBorderColor: "#2b150c",
        headBg: "repeating-linear-gradient(90deg,rgba(0,0,0,.3) 0 2px,transparent 2px 52px),linear-gradient(90deg,#4a2412,#6b3a1d,#7a2230)",
        edge: E.drip("#ff8fb1"),
        cardRadius: "6px", cardBorderW: "3px", cardBorderColor: "#2b150c", cardIdle: "sway",
        cardFill: "repeating-linear-gradient(90deg,rgba(0,0,0,.25) 0 2px,transparent 2px 50px),repeating-linear-gradient(0deg,rgba(0,0,0,.25) 0 2px,transparent 2px 50px),linear-gradient(135deg,#6b3a1d,#4a2412)"
      },
      fx: [
        { m: "fall", p: ["🍫", "🍪", "🍓", "🥨"], n: 10, s: [18, 30], d: [10, 18] },
        { m: "confetti", p: ["#ff7aa8", "#ffd36a", "#8fd3ff", "#ffffff"], n: 22, s: [8, 13], d: [5, 9] }
      ]
    },

    /* ===== 🎉 창립기념일 : 회사 기본 폰트 + 골드 프리미엄 테두리 + 지나가는 빛 + 색종이 ===== */
    {
      /* 이테크시스템 창립기념일 — 매년 6/1 (주년 계산 기준 연도 founded: 2009 — 실제 창립 연도와 다르면 수정)
         priority:true 로 바꾸면 다른 스킨과 기간이 겹쳐도 항상 창립기념일 스킨이 우선합니다. */
      id: "founding", name: "창립기념일", fixed: [6, 1], founded: 2009, priority: false,
      message: function (year) { return "이테크시스템 창립 " + (year - 2009) + "주년을 축하합니다!"; },
      favicon: "🎉", ornament: " 🎉",
      vars: V("linear-gradient(135deg,#eef4ff,#dbe8ff,#fff1c9)", "#0b2a5b", "rgba(255,255,255,0.75)", "#123a8a", "rgba(242,183,5,0.9)",
        "#1e5bd8", "#f2b705", "rgba(11,42,91,0.2)", "linear-gradient(90deg,#0b1d3a,#123a69,#6b5210)", "#ffd76a", "#fff3c9", "#a9bde0"),
      look: {
        titleSize: 22, titleWeight: 800, titleSpacing: "0.02em", navSize: 10.5, navWeight: 600, menuSize: 21,
        navRadius: "8px", navBorderColor: "rgba(255,215,106,.85)", navFill: "rgba(255,215,106,.1)", navColor: "#fff3c9",
        navHover: "pulse", hoverBg: "linear-gradient(135deg,#ffd76a,#f2b705)", hoverColor: "#1a1a2e",
        headRadius: "12px", headBorderW: "2px", headBorderColor: "#ffd76a",
        headShadow: "0 8px 26px rgba(242,183,5,.35),0 2px 6px rgba(0,0,0,.2)", edge: E.gold(), sweep: true,
        cardRadius: "14px", cardBorderW: "2px", cardIdle: "float"
      },
      fx: [
        { m: "confetti", p: ["#f2b705", "#1e5bd8", "#ff6fb5", "#7bd389", "#ffd76a"], n: 28, s: [10, 18], d: [4, 8] },
        { m: "twinkle", p: ["✨", "🏆", "🎉"], n: 8, s: [20, 34] },
        { m: "rise", p: ["🎈"], n: 5, s: [28, 40], d: [14, 22] }
      ]
    }
  ];

  /* ------------------------------------------------------------------ */
  /* 3. 날짜 계산 (전부 "일 단위 정수"로 비교 → 시간대/서머타임 영향 없음)  */
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
   * today(일 정수)에 적용할 {holiday, diff, year} 반환. 없으면 null.
   * diff = 기념일 - 오늘  (3 → D-3, 0 → 당일, -1 → D+1)
   * 기간이 겹치면: priority 스킨 우선 → 기념일에 날짜상 가장 가까운 것 → 동률이면 아직 안 지난 쪽
   */
  function pickHoliday(today) {
    var Y = yearOf(today), found = [];
    HOLIDAYS.forEach(function (h) {
      for (var y = Y - 1; y <= Y + 1; y++) {
        var day = occurrence(h, y);
        if (day == null) continue;
        var diff = day - today;
        if (diff <= BEFORE_DAYS && diff >= -AFTER_DAYS) found.push({ holiday: h, diff: diff, year: y });
      }
    });
    if (!found.length) return null;
    found.sort(function (a, b) {
      var pa = a.holiday.priority ? 1 : 0, pb = b.holiday.priority ? 1 : 0;
      return (pb - pa) || (Math.abs(a.diff) - Math.abs(b.diff)) || (b.diff - a.diff);
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
  /* 4. 오늘 적용할 스킨 결정 (미리보기 파라미터 지원)                     */
  /* ------------------------------------------------------------------ */
  var qs = new URLSearchParams(location.search);
  var forced = qs.get("skin");
  if (forced === "off") return;

  var result = null;
  if (forced) {
    var fh = HOLIDAYS.filter(function (h) { return h.id === forced; })[0];
    if (fh) result = { holiday: fh, diff: 0, year: yearOf(seoulToday()) };
  } else {
    var fake = parseYMD(qs.get("date"));
    result = pickHoliday(fake != null ? fake : seoulToday());
  }
  if (!result) return; // 기념일 기간 아님 → 기본 스킨 유지

  var skin = result.holiday, diff = result.diff, v = skin.vars;
  var L = {};
  Object.keys(DEFAULT_LOOK).forEach(function (k) { L[k] = DEFAULT_LOOK[k]; });
  Object.keys(skin.look || {}).forEach(function (k) { L[k] = skin.look[k]; });

  /* ------------------------------------------------------------------ */
  /* 5. 폰트 로드 (적용되는 스킨의 폰트 1개만)                            */
  /* ------------------------------------------------------------------ */
  var root = document.documentElement;
  if (L.font) {
    var fl = document.createElement("link");
    fl.rel = "stylesheet";
    fl.href = "https://fonts.googleapis.com/css2?family=" + (L.fontQuery || L.font.replace(/ /g, "+")) + "&display=swap";
    // 폰트를 못 불러오면(사내망 차단 등) 기본 폰트가 큰 글자 크기로 보이지 않도록 원래 크기로 되돌림
    var fontFail = function () { root.setAttribute("data-hs-font-fail", ""); };
    fl.onerror = fontFail;
    fl.onload = function () {
      if (!document.fonts || !document.fonts.load) return;
      document.fonts.load('16px "' + L.font + '"', "가").then(function (f) { if (!f || !f.length) fontFail(); }).catch(fontFail);
    };
    (document.head || root).appendChild(fl);
  }
  var FF = L.font ? '"' + L.font + '",' : "";
  var FONT_STACK = FF + '"Paperlogy","Noto Sans KR",sans-serif';

  /* ------------------------------------------------------------------ */
  /* 6. CSS 생성                                                         */
  /* ------------------------------------------------------------------ */
  root.setAttribute("data-holiday-skin", skin.id);
  var isHome = /\/(index\.html)?$/.test(location.pathname);
  if (isHome) root.setAttribute("data-hs-home", "");

  function hexLum(hex) {
    var h = hex.replace("#", "");
    if (h.length === 3) h = h.replace(/(.)/g, "$1$1");
    var r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }
  var lightHeader = hexLum(v.headerText) < 0.5;
  var pillBg = lightHeader
    ? "linear-gradient(180deg,rgba(255,255,255,.88),rgba(255,255,255,.58))"
    : "linear-gradient(180deg,rgba(255,255,255,.12),rgba(255,255,255,.05))";
  var pillBorder = lightHeader ? "color-mix(in srgb,var(--hs-a) 40%,transparent)" : "rgba(255,255,255,.2)";
  var titleShadow = lightHeader
    ? "0 1px 0 rgba(255,255,255,.7)"
    : "0 1px 1px rgba(0,0,0,.25),0 0 14px color-mix(in srgb,var(--hs-a) 45%,transparent)";

  // 이모지 띠(edge 가 없는 스킨용) — fx 의 이모지를 모아서 사용
  var stripPool = [];
  skin.fx.forEach(function (ly) { ly.p.forEach(function (it) { if (it.charAt(0) !== "#" && stripPool.indexOf(it) < 0) stripPool.push(it); }); });
  var stripItems = [];
  for (var k = 0; k < 140; k++) stripItems.push(stripPool[k % stripPool.length]);
  var strip = stripItems.join(" ");

  var S = "html[data-holiday-skin]";
  function X(str) { return (str || "").replace(/&/g, S); }
  function px(n) { return typeof n === "number" ? n + "px" : n; }

  var HOVER = {
    jelly: "hs-k-jelly .65s ease", wiggle: "hs-k-wiggle .5s ease", bounce: "hs-k-bounce .6s ease",
    pulse: "hs-k-pulse .9s ease-in-out infinite", heart: "hs-k-heart .9s ease-in-out infinite",
    shake: "hs-k-shake .4s ease", float: "hs-k-float 1.1s ease-in-out infinite",
    flicker: "hs-k-flicker .5s linear infinite", stamp: "hs-k-stamp .35s ease-out", none: "none"
  };
  var IDLE = {
    float: "floatUpDown 3.5s ease-in-out infinite", sway: "hs-k-csway 4.2s ease-in-out infinite",
    swing: "hs-k-cswing 3.4s ease-in-out infinite", pulse: "hs-k-cpulse 2.4s ease-in-out infinite",
    bounce: "hs-k-cbounce 1.6s ease-in-out infinite", none: "none"
  };
  var gradAB = "linear-gradient(135deg,var(--hs-a),var(--hs-b))";
  function hoverBgOf(val) { return val === "pc" ? "var(--pc)" : (val || gradAB); }

  var c = [];
  c.push(S + "{--hs-bg:" + v.bg + ";--hs-text:" + v.text + ";--hs-card:" + v.card + ";--hs-card-text:" + v.cardText +
    ";--hs-card-border:" + v.cardBorder + ";--hs-a:" + v.a + ";--hs-b:" + v.b + ";--hs-shadow:" + v.shadow +
    ";--hs-header-bg:" + v.headerBg + ";--hs-header-title:" + v.headerTitle + ";--hs-header-text:" + v.headerText +
    ";--hs-header-sub:" + v.headerSub + ';--hs-orn:"' + skin.ornament + '";--hs-pill-bg:' + pillBg +
    ";--hs-pill-border:" + pillBorder + ";--hs-title-shadow:" + titleShadow + ';--hs-strip:"' + strip + '";--pc:var(--hs-a);}');

  /* --- 메인(index) 배경 / 카드 --- */
  c.push("html[data-hs-home] body{" +
    (L.bgPattern ? "background:" + L.bgPattern + ",var(--hs-bg);background-size:" + L.bgSize + ",200% 200%;" : "background:var(--hs-bg);background-size:200% 200%;") +
    "color:var(--hs-text);}");

  c.push(S + " .menu-btn{background:" + (L.cardFill || "var(--hs-card)") + ";color:var(--hs-card-text);" +
    "border:" + L.cardBorderW + " " + L.cardBorderStyle + " " + (L.cardBorderColor || "var(--hs-card-border)") + ";" +
    "border-radius:" + L.cardRadius + ";font-family:" + FONT_STACK + ";font-size:" + px(L.menuSize) + ";" +
    "box-shadow:" + (L.cardShadow || "0 8px 18px var(--hs-shadow),0 3px 6px var(--hs-shadow)") + ";" +
    "animation:" + IDLE[L.cardIdle] + ";" + (L.cardOrigin ? "transform-origin:" + L.cardOrigin + ";" : "") + "}");
  c.push(S + " .menu-btn:hover{animation-play-state:paused;background:" + hoverBgOf(L.hoverBg) + ";color:" + L.hoverColor + ";" +
    "box-shadow:0 18px 40px rgba(0,0,0,.25),0 0 25px color-mix(in srgb,var(--hs-a) 55%,transparent),0 0 28px color-mix(in srgb,var(--hs-b) 50%,transparent);}");
  c.push(S + " .menu-btn:active{animation:springClick .25s ease;}");
  c.push(S + " .menu-btn{box-sizing:border-box;padding:0 5px;text-align:center;line-height:1.15;word-break:keep-all;}");
  c.push(S + "[data-hs-font-fail] .header-title{font-size:21px !important;font-weight:800 !important;letter-spacing:-0.018em !important;}",
    S + "[data-hs-font-fail] .nav-btn," + S + "[data-hs-font-fail] .nav-btn-soon{font-size:10px !important;letter-spacing:0 !important;}",
    S + "[data-hs-font-fail] .menu-btn{font-size:22px;}");
  c.push(S + " .menu-btn::after{border-radius:" + L.cardRadius + ";background:" + gradAB + ";}");
  c.push(S + " .menu-btn:hover::after{box-shadow:0 0 14px color-mix(in srgb,var(--hs-a) 70%,transparent);}");

  /* --- 팔레트(버튼마다 돌아가며 색 지정) : nav 는 첫 자식이 숨은 링크라 위치 +2 --- */
  function palette(selector, list, offset) {
    var n = list.length;
    list.forEach(function (col, i) {
      c.push(S + " " + selector + ":nth-child(" + n + "n+" + ((i + offset) % n) + "){--pc:" + col + ";}");
    });
  }
  if (L.navPalette) palette(".header-nav .nav-btn", L.navPalette, 2);
  if (L.cardPalette) palette(".menu-btn", L.cardPalette, 1);

  /* --- 헤더 바 --- */
  c.push(S + " .dashboard-header{" +
    "background:" + (L.headBg || "radial-gradient(circle at 18% -40%,color-mix(in srgb,var(--hs-a) 32%,transparent),transparent 34%),var(--hs-header-bg)") + " !important;" +
    "border:" + L.headBorderW + " " + L.headBorderStyle + " " + (L.headBorderColor || "color-mix(in srgb,var(--hs-a) 50%,transparent)") + " !important;" +
    "border-radius:" + L.headRadius + " !important;" +
    "box-shadow:" + (L.headShadow || "0 8px 22px color-mix(in srgb,var(--hs-a) 28%,transparent),0 2px 6px var(--hs-shadow),inset 0 1px 0 rgba(255,255,255,.14)") + " !important;}");

  if (L.edge) {
    c.push(S + " .dashboard-header::after{content:\"\";position:absolute;left:0;right:0;bottom:0;height:" + L.edge.h + "px;" +
      "background:" + L.edge.bg + ";pointer-events:none;z-index:0;}");
  } else if (L.strip) {
    c.push(S + " .dashboard-header::after{content:var(--hs-strip);position:absolute;left:0;right:0;bottom:2px;height:11px;line-height:11px;" +
      "font-size:9px;letter-spacing:9px;white-space:nowrap;overflow:hidden;opacity:.4;pointer-events:none;z-index:0;}");
  }
  if (L.sweep) {
    c.push(S + " .dashboard-header::before{content:\"\";position:absolute;inset:0 auto 0 -45%;width:40%;pointer-events:none;" +
      "background:linear-gradient(100deg,transparent,rgba(255,235,160,.4),transparent);animation:hs-k-sweep 4.8s ease-in-out infinite;}");
  }

  /* --- 로고 버튼 / 구분선 / 제목 --- */
  c.push(S + " .home-btn{background:linear-gradient(145deg,color-mix(in srgb,var(--hs-a) 82%,#000),color-mix(in srgb,var(--hs-b) 68%,#000)) !important;" +
    "border-radius:" + L.homeRadius + " !important;border-color:rgba(255,255,255,.38) !important;" +
    "box-shadow:0 8px 18px color-mix(in srgb,var(--hs-a) 42%,transparent),inset 0 1px 0 rgba(255,255,255,.3) !important;}");
  c.push(S + " .brand-divider{background:linear-gradient(180deg,transparent,var(--hs-header-sub),transparent) !important;}");
  c.push(S + " .header-title{font-family:" + FONT_STACK + " !important;font-size:" + px(L.titleSize) + " !important;" +
    "font-weight:" + L.titleWeight + " !important;letter-spacing:" + L.titleSpacing + " !important;" +
    "color:var(--hs-header-title) !important;text-shadow:var(--hs-title-shadow) !important;}");
  c.push(S + " .header-title::after{content:var(--hs-orn);}");
  c.push(S + " .header-version," + S + " .header-subtitle{color:var(--hs-header-sub) !important;opacity:1 !important;}");

  /* --- 메뉴 알약 버튼 : 모양 / 폰트 / 호버 애니메이션 --- */
  c.push(S + " .nav-btn," + S + " .nav-btn-soon{font-family:" + FONT_STACK + " !important;font-size:" + px(L.navSize) + " !important;" +
    "font-weight:" + L.navWeight + " !important;letter-spacing:" + L.navSpacing + " !important;" +
    "border-radius:" + L.navRadius + " !important;" +
    "border:" + L.navBorderW + " " + L.navBorderStyle + " " + (L.navBorderColor || "var(--hs-pill-border)") + " !important;" +
    "background:" + (L.navFill || "var(--hs-pill-bg)") + " !important;" +
    "color:" + (L.navColor || "var(--hs-header-text)") + " !important;" +
    (L.navShadow ? "box-shadow:" + L.navShadow + " !important;" : "") + "}");
  c.push(S + " .nav-btn:hover," + S + " .nav-btn-soon:hover{background:" + hoverBgOf(L.hoverBg) + " !important;color:" + L.hoverColor + " !important;" +
    "border-color:rgba(255,255,255,.55) !important;animation:" + HOVER[L.navHover] + ";" +
    "box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 4px 12px color-mix(in srgb,var(--hs-a) 50%,transparent) !important;}");

  if (L.extra) c.push(X(L.extra));

  /* --- 키프레임 (nav/카드는 !important 를 피하려고 rotate/scale/translate 개별 속성 사용) --- */
  c.push(
    "@keyframes hs-k-jelly{0%{scale:1}30%{scale:1.2 .82}50%{scale:.9 1.1}70%{scale:1.06 .97}100%{scale:1}}",
    "@keyframes hs-k-wiggle{0%,100%{rotate:0deg}20%{rotate:-7deg}40%{rotate:6deg}60%{rotate:-4deg}80%{rotate:3deg}}",
    "@keyframes hs-k-bounce{0%,100%{translate:0 0}30%{translate:0 -8px}55%{translate:0 0}75%{translate:0 -3px}}",
    "@keyframes hs-k-pulse{0%,100%{scale:1}50%{scale:1.1}}",
    "@keyframes hs-k-heart{0%,100%{scale:1}15%{scale:1.16}30%{scale:1}45%{scale:1.12}60%{scale:1}}",
    "@keyframes hs-k-shake{0%,100%{translate:0}20%{translate:-3px 0}40%{translate:3px 0}60%{translate:-3px 0}80%{translate:3px 0}}",
    "@keyframes hs-k-float{0%,100%{translate:0 0}50%{translate:0 -4px}}",
    "@keyframes hs-k-flicker{0%,100%{filter:brightness(1)}25%{filter:brightness(1.5)}50%{filter:brightness(.8)}75%{filter:brightness(1.35)}}",
    "@keyframes hs-k-stamp{0%{scale:1.35;opacity:.5}60%{scale:.94;opacity:1}100%{scale:1}}",
    "@keyframes hs-k-flick{0%,100%{filter:none}46%{filter:none}48%{filter:brightness(.55)}50%{filter:brightness(1.5)}52%{filter:brightness(.7)}54%{filter:none}}",
    "@keyframes hs-k-sweep{0%{transform:translateX(0)}60%,100%{transform:translateX(390%)}}",
    "@keyframes hs-k-csway{0%,100%{rotate:-1.6deg}50%{rotate:1.6deg}}",
    "@keyframes hs-k-cswing{0%,100%{rotate:-5deg}50%{rotate:5deg}}",
    "@keyframes hs-k-cpulse{0%,100%{scale:1}50%{scale:1.045}}",
    "@keyframes hs-k-cbounce{0%,100%{translate:0 0}50%{translate:0 -10px}}"
  );

  /* --- 하단 배지 --- */
  c.push(S + " #hs-badge{font-family:" + FONT_STACK + ";font-size:" + px(Math.max(14, L.navSize + 3)) + ";border-radius:" + L.badgeRadius + ";}");

  /* --- 화면 효과(파티클) 공통 + 움직임별 CSS --- */
  c.push(
    "#hs-fx{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:9998;transition:opacity 1.6s ease;}",
    "#hs-fx.hs-out{opacity:0;}",
    "#hs-fx .p{position:absolute;left:var(--x);font-size:var(--s);line-height:1;opacity:.88;will-change:transform;text-shadow:0 0 6px rgba(255,255,255,.3);}",
    "#hs-fx .p i{display:block;font-style:normal;}",
    "#hs-fx .p i.shape{border-radius:2px;box-shadow:none;}",
    "#hs-fx .m-fall,#hs-fx .m-snow,#hs-fx .m-petals,#hs-fx .m-leaves,#hs-fx .m-confetti,#hs-fx .m-rain,#hs-fx .m-drift{top:-12vh;animation:hs-fall var(--dur) linear var(--delay) infinite;}",
    "#hs-fx .m-snow i{animation:hs-k-sway var(--d2) ease-in-out infinite alternate;}",
    "#hs-fx .m-petals i{animation:hs-k-spin3d var(--d2) linear infinite;}",
    "#hs-fx .m-leaves i{transform-origin:50% 0;animation:hs-k-pend var(--d2) ease-in-out infinite alternate;}",
    "#hs-fx .m-confetti i{animation:hs-k-flip var(--d2) linear infinite;}",
    "#hs-fx .m-rain i{opacity:.75;}",
    "#hs-fx .m-rise,#hs-fx .m-float{top:auto;bottom:-14vh;}",
    "#hs-fx .m-rise{animation:hs-rise var(--dur) linear var(--delay) infinite;}",
    "#hs-fx .m-float{animation:hs-float var(--dur) linear var(--delay) infinite;}",
    "#hs-fx .m-rise i,#hs-fx .m-float i{animation:hs-k-wobble var(--d2) ease-in-out infinite alternate;}",
    "#hs-fx .m-twinkle{top:var(--y);}",
    "#hs-fx .m-twinkle i{opacity:0;animation:hs-k-twinkle var(--d2) ease-in-out var(--delay) infinite;}",
    "#hs-fx .m-fly{top:var(--y);left:-12vw;animation:hs-fly var(--dur) linear var(--delay) infinite;}",
    "#hs-fx .m-fly i{animation:hs-k-bob var(--d2) ease-in-out infinite alternate;}",
    "@keyframes hs-fall{from{transform:translate3d(0,0,0) rotate(0deg)}to{transform:translate3d(var(--sway),118vh,0) rotate(var(--rot))}}",
    "@keyframes hs-rise{from{transform:translate3d(0,0,0) rotate(0deg)}to{transform:translate3d(var(--sway),-122vh,0) rotate(var(--rot))}}",
    "@keyframes hs-float{0%{transform:translate3d(0,0,0);opacity:0}12%{opacity:.85}85%{opacity:.85}100%{transform:translate3d(var(--sway),-115vh,0);opacity:0}}",
    "@keyframes hs-fly{from{transform:translate3d(0,0,0)}to{transform:translate3d(128vw,0,0)}}",
    "@keyframes hs-k-sway{from{transform:translateX(-18px)}to{transform:translateX(18px)}}",
    "@keyframes hs-k-spin3d{from{transform:rotateX(0) rotateZ(0)}to{transform:rotateX(360deg) rotateZ(140deg)}}",
    "@keyframes hs-k-pend{from{transform:rotate(-38deg) translateX(-8px)}to{transform:rotate(38deg) translateX(8px)}}",
    "@keyframes hs-k-bob{from{transform:translateY(-18px) rotate(-8deg)}to{transform:translateY(18px) rotate(8deg)}}",
    "@keyframes hs-k-twinkle{0%,100%{opacity:0;transform:scale(.3) rotate(0deg)}50%{opacity:1;transform:scale(1.1) rotate(18deg)}}",
    "@keyframes hs-k-flip{from{transform:rotate3d(1,1,0,0deg)}to{transform:rotate3d(1,1,0,360deg)}}",
    "@keyframes hs-k-wobble{from{transform:scale(1) translateX(-5px)}to{transform:scale(1.12) translateX(5px)}}"
  );

  /* --- 하단 안내 배지 --- */
  c.push(
    "#hs-badge{position:fixed;right:16px;bottom:16px;z-index:9999;cursor:pointer;padding:8px 14px;line-height:1.2;" +
    "color:#fff;background:linear-gradient(135deg,var(--hs-a),var(--hs-b));box-shadow:0 6px 18px rgba(0,0,0,.3);" +
    "animation:hs-pop .6s ease both;transition:opacity .8s ease,transform .8s ease;text-shadow:0 1px 2px rgba(0,0,0,.3);}",
    "#hs-badge.hs-out{opacity:0 !important;transform:translateY(10px) scale(.96);pointer-events:none;}",
    "@keyframes hs-pop{from{opacity:0;transform:translateY(12px) scale(.9)}to{opacity:1;transform:none}}",
    "@media (prefers-reduced-motion:reduce){#hs-fx{display:none;}" + S + " .menu-btn," + S + " .nav-btn:hover," + S + " .header-title{animation:none !important;}}"
  );

  var styleEl = document.createElement("style");
  styleEl.id = "hs-style";
  styleEl.textContent = c.join("");
  (document.head || root).appendChild(styleEl);

  /* ------------------------------------------------------------------ */
  /* 7. 파비콘 / 파티클 / 배지 (DOM 준비 후)                              */
  /* ------------------------------------------------------------------ */
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }
  function rnd(a, b) { return a + Math.random() * (b - a); }

  ready(function () {
    // 파비콘
    var link = document.querySelector('link[rel~="icon"]');
    if (!link) { link = document.createElement("link"); link.rel = "icon"; document.head.appendChild(link); }
    link.href = "data:image/svg+xml," + encodeURIComponent(
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>" + skin.favicon + "</text></svg>"
    );

    // 파티클 : 레이어마다 움직임(m)이 다름
    var fx = document.createElement("div");
    fx.id = "hs-fx";
    var mob = window.innerWidth < 700 ? 0.55 : 1;
    skin.fx.forEach(function (ly) {
      var n = Math.max(1, Math.round(ly.n * mob));
      for (var i = 0; i < n; i++) {
        var it = ly.p[i % ly.p.length];
        var size = rnd(ly.s ? ly.s[0] : 14, ly.s ? ly.s[1] : 30);
        var dur = rnd(ly.d ? ly.d[0] : 10, ly.d ? ly.d[1] : 18);
        var sp = document.createElement("span");
        sp.className = "p m-" + ly.m;
        var inner = document.createElement("i");
        if (it.charAt(0) === "#") {          // 색종이 조각
          inner.className = "shape";
          inner.style.background = it;
          inner.style.width = size * 0.45 + "px";
          inner.style.height = size * 0.8 + "px";
        } else {
          inner.textContent = it;
        }
        var st = sp.style;
        if (ly.c) st.color = ly.c;
        if (ly.o) st.opacity = ly.o;
        st.setProperty("--x", rnd(0, 100) + "%");
        st.setProperty("--y", rnd(4, 86) + "%");
        st.setProperty("--s", size + "px");
        st.setProperty("--dur", dur + "s");
        st.setProperty("--delay", -rnd(0, dur) + "s");
        var swBase = ly.sw != null ? ly.sw : 80;
        st.setProperty("--sway", (swBase < 0 ? -rnd(0.5, 1) * -swBase : rnd(-1, 1) * swBase) + "px");
        st.setProperty("--rot", rnd(-1, 1) * (ly.rot != null ? ly.rot : 180) + "deg");
        st.setProperty("--d2", rnd(ly.t ? ly.t[0] : 2.5, ly.t ? ly.t[1] : 5) + "s");
        sp.appendChild(inner);
        fx.appendChild(sp);
      }
    });
    document.body.appendChild(fx);

    // 안내 배지 (클릭하면 효과와 배지가 스르륵 사라짐)
    var dText = diff > 0 ? "D-" + diff : diff === 0 ? "D-Day" : "D+" + -diff;
    var badge = document.createElement("div");
    badge.id = "hs-badge";
    badge.title = "클릭하면 떨어지는 효과가 사라집니다";
    var msg = typeof skin.message === "function" ? skin.message(result.year) : skin.message;
    badge.textContent = skin.favicon + " " + msg + " · " + skin.name + " " + dText;
    badge.addEventListener("click", function () {
      if (badge.dataset.closing) return;
      badge.dataset.closing = "1";
      badge.classList.add("hs-out");
      fx.classList.add("hs-out");
      setTimeout(function () { badge.remove(); fx.remove(); }, 1800);
    });
    document.body.appendChild(badge);
  });
})();
