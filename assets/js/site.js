/* ==========================================================================
   하네스 엔지니어링 with Claude Code — 강의 사이트 공통 스크립트
   - CURRICULUM: 커리큘럼 매니페스트 (실습을 추가할 때 status 를 'ready' 로 바꾸고 dir 을 채운다)
   - 사이드바 / 페이저 / 코드 복사 / 테마 토글 / 모바일 메뉴
   ========================================================================== */
(function () {
  "use strict";

  // 사이트 루트 (로컬 http.server, GitHub Pages 프로젝트 경로 모두 대응)
  var script = document.currentScript || document.querySelector('script[src*="site.js"]');
  var ROOT = script ? script.src.replace(/assets\/js\/site\.js.*$/, "") : "/";

  var CURRICULUM = [
    { ch: 2, title: "첫 하네스", items: [
      { id: "02-01", slug: "ex-02-01-ab-comparison", dir: "02-01-ab-comparison", status: "ready",
        title: "하네스 적용 전/후 A/B 비교",
        desc: "동일한 한 줄 프롬프트를 맨몸 vs 하네스 적용으로 실행해 산출물을 2단 비교" },
      { id: "02-02", slug: "ex-02-02-my-first-harness", dir: "02-02-my-first-harness", status: "planned",
        title: "첫 하네스 — 2인 팀 커밋 메시지",
        desc: "author·reviewer 두 에이전트와 commit-message 스킬로 구성한 최소 하네스" }
    ]},
    { ch: 4, title: "에이전트 설계", items: [
      { id: "04-01", slug: "ex-04-01-security-analyst", dir: "04-01-security-analyst", status: "planned",
        title: "읽기 전용 보안 분석 에이전트",
        desc: "tools 에서 Write/Edit 을 제외해 수정 권한을 물리적으로 차단한 security-analyst" },
      { id: "04-02", slug: "ex-04-02-copy-editor", dir: "04-02-copy-editor", status: "planned",
        title: "기계적 교정 에이전트 — 1단계 검수",
        desc: "콜론·조사·오탈자 3종만 기계적으로 잡는 copy-editor" }
    ]},
    { ch: 5, title: "스킬 디자인 원리", items: [
      { id: "05-05", slug: "ex-05-05-separation-signals", dir: "05-05-separation-signals", status: "planned",
        title: "스킬 분리 3 신호 진단", desc: "크기·도메인 분기·조건부 상세 3 신호를 skill-size-auditor 로 진단" },
      { id: "05-06", slug: "ex-05-06-domain-references", dir: "05-06-domain-references", status: "planned",
        title: "도메인 분기형 references — 메뉴판/레시피", desc: "SKILL.md 는 링크만, 본문은 references/ 로 위임하는 패턴" },
      { id: "05-08", slug: "ex-05-08-generalization", dir: "05-08-generalization", status: "planned",
        title: "일반화 vs 오버피팅 — 재적용 실측", desc: "Overfit / Generalized SKILL.md 2개의 적용률 비교 시뮬레이션" },
      { id: "05-09", slug: "ex-05-09-context-savings", dir: "05-09-context-savings", status: "planned",
        title: "컨텍스트 절약 3 원칙 가지치기", desc: "prose-pruner 로 위반 샘플을 30% 이상 축약" },
      { id: "05-10", slug: "ex-05-10-book-writer-skill", dir: "05-10-book-writer-skill", status: "planned",
        title: "book-writer 종합 사례 + 3 원리 매핑", desc: "Pushy·Layer·Why-First 3 원리로 스킬 프론트매터 진단" },
      { id: "05-11", slug: "ex-05-11-with-without", dir: "05-11-with-without", status: "planned",
        title: "With/Without 스킬 비교 1 사이클", desc: "csv-summary 스킬을 With/Without 동시 실행해 3축 비교" },
      { id: "05-12", slug: "ex-05-12-antipatterns", dir: "05-12-antipatterns", status: "planned",
        title: "스킬 안티패턴 3종 진단", desc: "거대 SKILL.md / references 부재 / 이유 없는 규칙을 antipattern-detector 로 진단" }
    ]},
    { ch: 6, title: "PR 리뷰 오케스트레이션", items: [
      { id: "06-12", slug: "ex-06-12-pr-review-skill-md", dir: "06-12-pr-review-skill-md", status: "planned",
        title: "pr-review-orchestrator SKILL.md 실물", desc: "4인 에이전트 stub 과 dry-run 결과를 동봉한 오케스트레이터 스킬" },
      { id: "06-15", slug: "ex-06-15-292-agent-incident", dir: "06-15-292-agent-incident", status: "planned",
        title: "292개 에이전트 사건 — 정량 검증", desc: "채널 수 폭주 사례를 정량 데이터와 외부 자료로 교차 검증" }
    ]},
    { ch: 7, title: "에이전트 정의 실물", items: [
      { id: "07-13", slug: "ex-07-13-phase3-agent-5sections", dir: "07-13-phase3-agent-5sections", status: "planned",
        title: "Phase 3 에이전트 정의 — 8 섹션 완비", desc: "security-reviewer.md 를 8 섹션으로 작성하고 5 필수 섹션과 비교" }
    ]},
    { ch: 8, title: "안전장치", items: [
      { id: "08-15", slug: "ex-08-15-max-retries-code", dir: "08-15-max-retries-code", status: "planned",
        title: "MAX_RETRIES 안전장치 — 실행 가능 코드", desc: "의사코드를 실제 실행 가능한 파이썬으로, 성공/실패 2 시나리오 로그" }
    ]},
    { ch: 11, title: "코드 리뷰 팀", items: [
      { id: "11-03", slug: "ex-11-03-static-analyzer-md", dir: "11-03-static-analyzer-md", status: "planned",
        title: "static-analyzer 에이전트 + 샘플 TS PR", desc: "mock 모드 기본 + tsc·eslint 화이트리스트로 경계 강제" },
      { id: "11-04", slug: "ex-11-04-three-frontmatter", dir: "11-04-three-frontmatter", status: "planned",
        title: "4인 팀 — 3 에이전트 frontmatter 공존", desc: "security / design / refactor 에이전트의 도구 경계를 frontmatter 로 강제" },
      { id: "11-05", slug: "ex-11-05-orchestrator-6phase", dir: "11-05-orchestrator-6phase", status: "planned",
        title: "code-review-team 6 Phase dry-run", desc: "의사코드를 SKILL.md 로 마감하고 6 Phase mock 오케스트레이션" },
      { id: "11-06", slug: "ex-11-06-jwt-pr-bugs", dir: "11-06-jwt-pr-bugs", status: "planned",
        title: "JWT PR + 의도 버그 4종 + 4인 팀", desc: "SQL 인젝션·N+1·경계면 불일치·테스트 0건을 4 리뷰어가 발견하는 매트릭스" }
    ]},
    { ch: 12, title: "풀스택 팀", items: [
      { id: "12-03", slug: "ex-12-03-team-8-agents", dir: "12-03-team-8-agents", status: "planned",
        title: "풀스택 8 에이전트 + Phase 활성 매트릭스", desc: "PM·api·ui·db·backend·frontend·boundary·test 8 에이전트, Phase 별 동시 활성 ≤4" }
    ]},
    { ch: 13, title: "의존성 분석", items: [
      { id: "13-01", slug: "ex-13-01-dependency-mapper", dir: "13-01-dependency-mapper", status: "planned",
        title: "의존성 그래프 → 결정론적 배치 계획", desc: "Read/Grep/Bash 만으로 import 그래프를 위상정렬해 batches.json 산출" }
    ]},
    { ch: 14, title: "응용 가이드", items: [
      { id: "14-10", slug: "ex-14-10-application-guide", dir: "14-10-application-guide", status: "planned",
        title: "4 응용 가이드 매핑", desc: "Post-mortem · 플래키 · 성능 · 1인 개발 응용 가이드와 reviewer 매핑" }
    ]}
  ];

  var REFERENCE_REPO = "https://github.com/revfactory/harness-engineering-with-cc";

  function flat() {
    var out = [];
    CURRICULUM.forEach(function (c) { c.items.forEach(function (it) { it.ch = c.ch; it.chTitle = c.title; out.push(it); }); });
    return out;
  }
  function hrefOf(it) { return ROOT + "lectures/" + it.dir + "/"; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function renderSidebar(currentId) {
    var el = document.getElementById("sidebar");
    if (!el) return;
    var html = '<div class="chapter"><a class="item' + (currentId === "home" ? " active" : "") + '" href="' + ROOT + '"><span class="num">⌂</span>강의 홈</a></div>';
    CURRICULUM.forEach(function (c) {
      html += '<div class="chapter"><div class="chapter-title">' + c.ch + '장 · ' + esc(c.title) + '</div>';
      c.items.forEach(function (it) {
        var ready = it.status === "ready";
        var cls = "item" + (it.id === currentId ? " active" : "") + (ready ? "" : " planned");
        var href = ready ? hrefOf(it) : "#";
        html += '<a class="' + cls + '" href="' + href + '"' + (ready ? "" : ' aria-disabled="true" title="준비 중"') + '>' +
                '<span class="num">' + it.id + '</span><span>' + esc(it.title) + '</span></a>';
      });
      html += "</div>";
    });
    el.innerHTML = html;
  }

  function renderPager(currentId) {
    var el = document.getElementById("pager");
    if (!el) return;
    var all = flat(), idx = -1;
    all.forEach(function (it, i) { if (it.id === currentId) idx = i; });
    if (idx < 0) return;
    var prev = null, next = null;
    for (var i = idx - 1; i >= 0; i--) if (all[i].status === "ready") { prev = all[i]; break; }
    for (var j = idx + 1; j < all.length; j++) if (all[j].status === "ready") { next = all[j]; break; }
    var html = "";
    html += prev ? '<a class="prev" href="' + hrefOf(prev) + '"><small>← 이전</small>' + esc(prev.id + " " + prev.title) + '</a>'
                 : '<a class="prev" href="' + ROOT + '"><small>← 처음</small>강의 홈</a>';
    html += next ? '<a class="next" href="' + hrefOf(next) + '"><small>다음 →</small>' + esc(next.id + " " + next.title) + '</a>'
                 : '<a class="next" href="' + ROOT + '"><small>마지막</small>강의 홈으로</a>';
    el.innerHTML = html;
  }

  function renderHome() {
    var el = document.getElementById("curriculum");
    if (!el) return;
    var all = flat(), ready = all.filter(function (i) { return i.status === "ready"; }).length;
    var stat = document.getElementById("stat");
    if (stat) stat.innerHTML =
      '<div><b>' + CURRICULUM.length + '</b><span>챕터</span></div>' +
      '<div><b>' + all.length + '</b><span>실습</span></div>' +
      '<div><b>' + ready + '</b><span>공개됨</span></div>';
    var html = "";
    CURRICULUM.forEach(function (c) {
      html += '<h2 id="ch-' + c.ch + '">' + c.ch + '장 · ' + esc(c.title) + '</h2><div class="grid">';
      c.items.forEach(function (it) {
        var ready = it.status === "ready";
        var tag = ready ? "a" : "div";
        html += '<' + tag + ' class="card' + (ready ? "" : " planned") + '"' + (ready ? ' href="' + hrefOf(it) + '"' : "") + '>' +
                '<div class="num">' + it.id + ' · ' + esc(it.slug) + '</div>' +
                '<div class="title">' + esc(it.title) + '<span class="badge ' + (ready ? "ready\">공개" : "planned\">준비 중") + '</span></div>' +
                '<div class="desc">' + esc(it.desc) + '</div></' + tag + '>';
      });
      html += "</div>";
    });
    el.innerHTML = html;
  }

  function enhanceCode() {
    document.querySelectorAll("pre").forEach(function (pre) {
      if (pre.querySelector(".copy")) return;
      var b = document.createElement("button");
      b.className = "copy"; b.type = "button"; b.textContent = "복사";
      b.addEventListener("click", function () {
        var code = pre.querySelector("code") || pre;
        navigator.clipboard.writeText(code.innerText).then(function () {
          b.textContent = "복사됨"; b.classList.add("done");
          setTimeout(function () { b.textContent = "복사"; b.classList.remove("done"); }, 1500);
        });
      });
      pre.appendChild(b);
    });
    document.querySelectorAll("table").forEach(function (t) {
      if (t.parentElement.classList.contains("table-wrap")) return;
      var w = document.createElement("div"); w.className = "table-wrap";
      t.parentNode.insertBefore(w, t); w.appendChild(t);
    });
  }

  function theme() {
    var root = document.documentElement;
    try { var saved = localStorage.getItem("theme"); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var dark = root.getAttribute("data-theme") === "dark" ||
                 (!root.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
      var next = dark ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  function mobileMenu() {
    var t = document.getElementById("menu-toggle"), s = document.getElementById("sidebar");
    if (!t || !s) return;
    t.addEventListener("click", function () { s.classList.toggle("open"); });
    document.addEventListener("click", function (e) {
      if (s.classList.contains("open") && !s.contains(e.target) && e.target !== t) s.classList.remove("open");
    });
  }

  function init() {
    var page = document.body.getAttribute("data-page") || "home";
    document.querySelectorAll("a.brand").forEach(function (a) { a.href = ROOT; });
    document.querySelectorAll("a[data-ref]").forEach(function (a) {
      a.href = REFERENCE_REPO + "/tree/main/" + a.getAttribute("data-ref");
      a.target = "_blank"; a.rel = "noopener";
    });
    renderSidebar(page);
    renderPager(page);
    renderHome();
    enhanceCode();
    theme();
    mobileMenu();
  }

  window.SITE = { ROOT: ROOT, CURRICULUM: CURRICULUM, REFERENCE_REPO: REFERENCE_REPO };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
