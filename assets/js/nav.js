// 移动端导航切换 + 高亮当前页 + 集中渲染导航项
(function () {
  var NAV = [
    { href: "index.html",          label: "首页" },
    { href: "resources.html",       label: "资源库" },
    { href: "level-test.html",      label: "班主任水平" },
    { href: "principal-test.html",  label: "学校管理" },
    { href: "newteacher-test.html", label: "新师测评" },
    { href: "personality-test.html",label: "性格测试" },
    { href: "booking.html",         label: "在线约课" },
    { href: "dashboard.html",       label: "数据看板" },
    { href: "messages.html",        label: "留言互动" }
  ];

  function currentKey() {
    var m = location.pathname.match(/([\w-]+)\.html/);
    return m ? m[1] : "index";
  }

  var links = document.getElementById("navLinks");
  if (links) {
    var key = currentKey();
    links.innerHTML = NAV.map(function (n) {
      var active = (n.href.replace(".html", "") === key) ? " active" : "";
      return '<a href="' + n.href + '"' + active + '>' + n.label + '</a>';
    }).join("");
  }

  var toggle = document.querySelector(".nav-toggle");
  if (toggle && links) {
    document.addEventListener("click", function (e) {
      if (!links.contains(e.target) && !toggle.contains(e.target)) links.classList.remove("open");
    });
  }
})();
