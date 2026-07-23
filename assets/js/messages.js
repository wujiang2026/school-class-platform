/* 留言互动：本地存储的留言板（无服务器版本）
   数据仅保存在当前浏览器 localStorage，不跨用户、不上传服务器。 */
(function () {
  var KEY = "site_messages_v1";

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]") || []; } catch (e) { return []; }
  }
  function write(arr) {
    try { localStorage.setItem(KEY, JSON.stringify(arr)); } catch (e) {}
  }
  function fmt(t) {
    var d = new Date(t);
    var pad = function (n) { return n < 10 ? "0" + n : "" + n; };
    return (d.getMonth() + 1) + "月" + d.getDate() + "日 " + pad(d.getHours()) + ":" + pad(d.getMinutes());
  }
  function esc(s) {
    return (s || "").replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var nameEl = document.getElementById("msgName");
  var textEl = document.getElementById("msgText");
  var listEl = document.getElementById("msgList");

  function render() {
    var arr = read().slice().reverse();
    if (!arr.length) {
      listEl.innerHTML = '<div class="empty">还没有留言，来当第一个分享经验的人吧～</div>';
      return;
    }
    listEl.innerHTML = arr.map(function (m) {
      return '<div class="msg-item" data-id="' + m.id + '">' +
        '<div class="msg-head"><span class="msg-author">' + esc(m.name) + '</span>' +
        '<span class="msg-time">' + fmt(m.t) + '</span></div>' +
        '<div class="msg-body">' + esc(m.text) + '</div>' +
        '<button class="msg-del" data-id="' + m.id + '">删除</button>' +
      '</div>';
    }).join("");
    listEl.querySelectorAll(".msg-del").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        write(read().filter(function (m) { return String(m.id) !== String(id); }));
        render();
      });
    });
  }

  document.getElementById("msgSend").addEventListener("click", function () {
    var name = (nameEl.value || "").trim() || "匿名老师";
    var text = (textEl.value || "").trim();
    if (!text) { alert("写点内容再发布吧～"); return; }
    var arr = read();
    arr.push({ id: Date.now() + "_" + Math.floor(Math.random() * 1000), name: name, text: text, t: Date.now() });
    if (arr.length > 200) arr = arr.slice(arr.length - 200);
    write(arr);
    textEl.value = "";
    render();
    window.scrollTo({ top: document.querySelector(".msg-list").offsetTop - 80, behavior: "smooth" });
  });

  render();
})();
