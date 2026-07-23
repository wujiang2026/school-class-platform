// 在线约课：表单校验 + 本机预约记录 + 百度统计事件
(function () {
  var KEY = "booking_records_v1";
  var form = document.getElementById("bookingForm");
  var tip = document.getElementById("formTip");
  var historyBox = document.getElementById("bookingHistory");
  var historyList = document.getElementById("historyList");
  if (!form) return;

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }
  function save(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }
  function fmt(ts) {
    var d = new Date(ts);
    var p = function (n) { return (n < 10 ? "0" : "") + n; };
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
  }
  function renderHistory() {
    var list = load();
    if (!list.length) { historyBox.hidden = true; return; }
    historyBox.hidden = false;
    historyList.innerHTML = list.slice().reverse().map(function (r) {
      return '<li><span class="bh-course">' + esc(r.course) + '</span>' +
             '<span class="bh-meta">' + esc(r.name) + ' · ' + esc(r.phone) + (r.mode ? ' · ' + esc(r.mode) : '') + '</span>' +
             '<span class="bh-time">' + fmt(r.ts) + '</span></li>';
    }).join("");
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var name = (data.get("name") || "").toString().trim();
    var phone = (data.get("phone") || "").toString().trim();
    var course = (data.get("course") || "").toString().trim();

    if (!name || !phone || !course) {
      tip.textContent = "请填写姓名、联系电话和预约课程（带 * 为必填）。";
      tip.className = "form-tip form-tip-err";
      return;
    }
    if (!/^[\d\-+\s]{6,20}$/.test(phone)) {
      tip.textContent = "联系电话格式好像不太对，请检查后重新提交。";
      tip.className = "form-tip form-tip-err";
      return;
    }

    var record = {
      name: name, phone: phone, course: course,
      mode: (data.get("mode") || "").toString().trim(),
      time: (data.get("time") || "").toString().trim(),
      note: (data.get("note") || "").toString().trim(),
      ts: Date.now()
    };
    var list = load();
    list.push(record);
    save(list);

    // 百度统计：记录一次预约提交事件（站长可在后台看到预约量与热门课程）
    if (window._hmt && window._hmt.push) {
      window._hmt.push(["_trackEvent", "预约", "提交", course]);
    }

    tip.textContent = "✅ 预约已提交！我会尽快与您联系确认时间，请保持电话畅通。";
    tip.className = "form-tip form-tip-ok";
    form.reset();
    renderHistory();
  });

  renderHistory();
})();
