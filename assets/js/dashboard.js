/* 数据看板：读取本机浏览记录与测评足迹并汇总展示 */
(function () {
  var NAMES = {
    index: "首页", resources: "资源库", "level-test": "班主任水平测试",
    "personality-test": "性格测试", "principal-test": "学校管理测评",
    "newteacher-test": "新教师测评", dashboard: "数据看板", messages: "留言互动"
  };
  function pageName(p) { return NAMES[p] || p; }

  function fmtTime(t) {
    var d = new Date(t);
    var pad = function (n) { return n < 10 ? "0" + n : "" + n; };
    return (d.getMonth() + 1) + "月" + d.getDate() + "日 " + pad(d.getHours()) + ":" + pad(d.getMinutes());
  }
  function fmtDay(t) {
    var d = new Date(t);
    var pad = function (n) { return n < 10 ? "0" + n : "" + n; };
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  var visits = (window.SiteTrack ? SiteTrack.getVisits() : []);
  var tests = (window.SiteTrack ? SiteTrack.getTests() : []);

  // ---- 迷你统计 ----
  var lastVisit = visits.length ? fmtTime(visits[visits.length - 1].t) : "暂无";
  var mini = [
    { num: visits.length, lbl: "累计访问页次" },
    { num: tests.length, lbl: "测评完成次数" },
    { num: lastVisit, lbl: "最近访问" }
  ];
  document.getElementById("miniStats").innerHTML = mini.map(function (m) {
    return '<div class="mini-stat"><div class="num">' + m.num + '</div><div class="lbl">' + m.lbl + '</div></div>';
  }).join("");

  // ---- 各页访问量 ----
  var count = {};
  visits.forEach(function (v) { count[v.p] = (count[v.p] || 0) + 1; });
  var rows = Object.keys(count).map(function (p) { return { p: p, n: count[p] }; })
    .sort(function (a, b) { return b.n - a.n; });
  var max = rows.length ? rows[0].n : 1;
  document.getElementById("pageBars").innerHTML = rows.map(function (r) {
    var w = Math.max(6, Math.round(r.n / max * 100));
    return '<div class="bar-row"><span class="bar-label">' + pageName(r.p) + '</span>' +
      '<span class="bar-track"><span class="bar-fill" style="width:' + w + '%"></span></span>' +
      '<span class="bar-num">' + r.n + '</span></div>';
  }).join("") || '<div class="empty">还没有浏览记录，去首页逛逛吧～</div>';

  // ---- 最近浏览 ----
  var vList = visits.slice(-14).reverse();
  document.getElementById("visitList").innerHTML = vList.map(function (v) {
    return '<div class="visit-item"><span class="vi-dot"></span>' +
      '<span class="vi-main">' + pageName(v.p) + '</span>' +
      '<span class="vi-time">' + fmtTime(v.t) + '</span></div>';
  }).join("") || '<div class="empty">暂无记录</div>';

  // ---- 测评足迹 ----
  var tList = tests.slice(-12).reverse();
  document.getElementById("testList").innerHTML = tList.map(function (t) {
    var extra = t.level ? (" · " + t.level) : (t.type ? (" · " + t.type) : "");
    var score = t.score ? (" · " + t.score + " 分") : "";
    return '<div class="visit-item"><span class="vi-dot vi-test"></span>' +
      '<span class="vi-main">' + (t.kind || "测评") + score + extra + '</span>' +
      '<span class="vi-time">' + fmtDay(t.t) + '</span></div>';
  }).join("") || '<div class="empty">还没完成测评，去测一测吧～</div>';

  // ---- 清空 ----
  var clearBtn = document.getElementById("clearBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      if (confirm("确定清空本机所有浏览与测评记录吗？此操作不可恢复。")) {
        if (window.SiteTrack) SiteTrack.clearAll();
        location.reload();
      }
    });
  }
})();
