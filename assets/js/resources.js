/* 资源库交互逻辑 */
(function () {
  var state = { board: "全部", cat: "all", stage: "全部", domain: "全部", q: "" };

  var boardTabsEl = document.getElementById("boardTabs");
  var catListEl = document.getElementById("catList");
  var stageEl = document.getElementById("stageFilter");
  var domainEl = document.getElementById("domainFilter");
  var domainRow = document.getElementById("domainRow");
  var contentEl = document.getElementById("content");
  var searchEl = document.getElementById("searchInput");
  var totalEl = document.getElementById("totalCount");

  // 总数
  var total = CATEGORIES.reduce(function (s, c) { return s + c.count; }, 0);
  if (totalEl) totalEl.textContent = total;

  // ---- 板块切换：全部 / 学校管理 / 班级管理 / 新教师 ----
  var BOARDS = ["全部", "学校管理", "班级管理", "新教师"];

  // 支持从首页等带 ?board=xxx 进入时直接定位到对应板块
  try {
    var _bp = new URLSearchParams(location.search).get("board");
    if (_bp && BOARDS.indexOf(_bp) >= 0) state.board = _bp;
  } catch (e) {}
  function renderBoards() {
    if (!boardTabsEl) return;
    boardTabsEl.innerHTML = '<span class="bt-label">板块</span>' + BOARDS.map(function (b) {
      return '<span class="pill' + (state.board === b ? " active" : "") + '" data-board="' + b + '">' + b + '</span>';
    }).join("");
    boardTabsEl.querySelectorAll(".pill").forEach(function (el) {
      el.addEventListener("click", function () {
        state.board = el.getAttribute("data-board");
        state.cat = "all"; state.domain = "全部";
        renderBoards(); renderCats(); renderDomains(); render();
      });
    });
  }

  function catsOfBoard() {
    return CATEGORIES.filter(function (c) {
      if (state.board === "全部") return true;
      return c.board === state.board;
    });
  }

  // ---- 侧边栏分类 ----
  function renderCats() {
    var cats = catsOfBoard();
    var boardTotal = cats.reduce(function (s, c) { return s + c.count; }, 0);
    var html = '<div class="cat-item' + (state.cat === "all" ? " active" : "") +
      '" data-cat="all"><span class="cat-dot" style="background:linear-gradient(135deg,#14A277,#F2B33D)"></span>' +
      '<span class="cat-name">全部资源</span><span class="cat-count">' + boardTotal + '</span></div>';
    cats.forEach(function (c) {
      html += '<div class="cat-item' + (state.cat === c.key ? " active" : "") + '" data-cat="' + c.key + '">' +
        '<span class="cat-dot" style="background:' + c.color + '"></span>' +
        '<span class="cat-name">' + c.icon + ' ' + c.name + '</span>' +
        '<span class="cat-count">' + c.count + '</span></div>';
    });
    catListEl.innerHTML = html;
    catListEl.querySelectorAll(".cat-item").forEach(function (el) {
      el.addEventListener("click", function () {
        state.cat = el.getAttribute("data-cat");
        state.domain = "全部";
        renderCats(); renderDomains(); render();
      });
    });
  }

  // ---- 学段筛选 ----
  var STAGES = ["全部", "小学", "初中", "高中"];
  function renderStages() {
    stageEl.innerHTML = STAGES.map(function (s) {
      return '<span class="pill' + (state.stage === s ? " active" : "") + '" data-stage="' + s + '">' + s + '</span>';
    }).join("");
    stageEl.querySelectorAll(".pill").forEach(function (el) {
      el.addEventListener("click", function () {
        state.stage = el.getAttribute("data-stage");
        renderStages(); render();
      });
    });
  }

  // ---- 领域筛选（带班锦囊/实践案例 用班级管理领域；治校锦囊/治校案例 用学校管理领域）----
  function currentDomainSet() {
    if (state.cat === "schtip" || state.cat === "schcase") return SCH_DOMAINS;
    if (state.cat === "jinnang" || state.cat === "case") return JINNANG_DOMAINS;
    if (state.cat === "rudao") return NEWTEACHER_DOMAINS;
    if (state.board === "学校管理") return SCH_DOMAINS;
    if (state.board === "班级管理") return JINNANG_DOMAINS;
    if (state.board === "新教师") return NEWTEACHER_DOMAINS;
    return JINNANG_DOMAINS;
  }
  function renderDomains() {
    var showDomain = (state.cat === "jinnang" || state.cat === "case" ||
                       state.cat === "schtip" || state.cat === "schcase" ||
                       state.cat === "rudao" || state.cat === "all");
    domainRow.style.display = showDomain ? "flex" : "none";
    if (!showDomain) return;
    var doms = ["全部"].concat(currentDomainSet());
    domainEl.innerHTML = doms.map(function (d) {
      return '<span class="pill' + (state.domain === d ? " active" : "") + '" data-dom="' + d + '">' + d + '</span>';
    }).join("");
    domainEl.querySelectorAll(".pill").forEach(function (el) {
      el.addEventListener("click", function () {
        state.domain = el.getAttribute("data-dom");
        renderDomains(); render();
      });
    });
  }

  // ---- 匹配 ----
  function matchStage(item) {
    if (state.stage === "全部") return true;
    var st = item.stage || "通用";
    return st.indexOf("通用") >= 0 || st.indexOf(state.stage) >= 0;
  }
  function matchQ(item) {
    if (!state.q) return true;
    var q = state.q.toLowerCase();
    return (item.title || "").toLowerCase().indexOf(q) >= 0 ||
           (item.desc || "").toLowerCase().indexOf(q) >= 0;
  }
  function matchDomain(item, catKey) {
    if (catKey !== "jinnang" && catKey !== "case" && catKey !== "schtip" && catKey !== "schcase" && catKey !== "rudao") return true;
    if (state.domain === "全部") return true;
    return item.domain === state.domain;
  }

  function card(item, cat) {
    var isTip = cat.key === "jinnang" || cat.key === "schtip";
    var isCase = cat.key === "case" || cat.key === "schcase";
    var tagHtml = '<span class="rc-tag" style="background:' + cat.color + '">' + cat.name + '</span>';
    var domainHtml = ((isTip || isCase) && item.domain) ? '<span class="rc-stage">' + item.domain + '</span>' : '';
    var href = item.url || "#";
    var topHtml = '<div class="rc-top">' + tagHtml + domainHtml +
      '<span class="rc-stage" style="margin-left:auto">' + (item.stage || '通用') + '</span></div>';

    // 实践案例：情境 / 对策 / 成效 三段式
    if (isCase) {
      return '<a class="res-card case-card rise" href="' + href + '" target="_blank" rel="noopener" style="border-left-color:' + cat.color + '">' +
        topHtml +
        '<h4>' + item.title + '</h4>' +
        '<div class="cc-block"><span class="cc-label cc-scene">情境</span><p>' + item.scene + '</p></div>' +
        '<div class="cc-block"><span class="cc-label cc-action">对策</span><p>' + item.action + '</p></div>' +
        '<div class="cc-block"><span class="cc-label cc-effect">成效</span><p>' + item.effect + '</p></div>' +
        '<div class="rc-foot"><span class="rc-meta">查看相关做法</span><span class="rc-open">打开 →</span></div>' +
      '</a>';
    }

    var metaText = isTip ? "查看相关做法" : "查看原文 / 资料";
    return '<a class="res-card' + (isTip ? ' tip-card' : '') + ' rise" href="' + href + '" target="_blank" rel="noopener" style="' + (isTip ? 'border-left-color:' + cat.color : '') + '">' +
      topHtml +
      '<h4>' + item.title + '</h4>' +
      '<p>' + item.desc + '</p>' +
      '<div class="rc-foot"><span class="rc-meta">' + metaText + '</span><span class="rc-open">打开 →</span></div>' +
    '</a>';
  }

  function sectionFor(cat) {
    var items = (RESOURCES[cat.key] || []).filter(function (it) {
      return matchStage(it) && matchQ(it) && matchDomain(it, cat.key);
    });
    if (!items.length) return "";
    var cards = items.map(function (it) { return card(it, cat); }).join("");
    return '<section class="cat-section" id="sec-' + cat.key + '">' +
      '<div class="cat-section-head"><span class="badge" style="background:' + cat.color + '"></span>' +
      '<h3>' + cat.icon + ' ' + cat.name + '</h3>' +
      '<span class="cnt">· 共 ' + cat.count + ' 项 · 展示 ' + items.length + ' 项</span></div>' +
      '<div class="card-grid">' + cards + '</div></section>';
  }

  function render() {
    var cats = state.cat === "all" ? catsOfBoard() : catsOfBoard().filter(function (c) { return c.key === state.cat; });
    var html = cats.map(sectionFor).join("");
    if (!html.trim()) {
      html = '<div class="empty"><div class="big">🔍</div>没有找到匹配的资源，试试换个关键词或筛选条件吧。</div>';
    }
    contentEl.innerHTML = html;
    // 卡片已是真实链接（<a target="_blank">），点击直接在新标签打开对应资源页
  }

  searchEl.addEventListener("input", function () {
    state.q = searchEl.value.trim();
    render();
  });

  // init
  renderBoards();
  renderCats();
  renderStages();
  renderDomains();
  render();
})();
