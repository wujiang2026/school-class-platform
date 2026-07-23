/* 百度统计（访客统计）接入脚本
 * 站点 token 由百度统计后台获取，替换下方 BAIDU_TONGJI_TOKEN 即可。
 * 百度统计后台：https://tongji.baidu.com → 新增网站 → 获取代码中的 hm.js?xxxx 那段即为 token。
 */
(function () {
  var TOKEN = "d98a78421655a05bf91eaec3524f868f"; // 百度统计站点 token
  if (!TOKEN || TOKEN === "BAIDU_TONGJI_TOKEN") return; // 未配置时静默跳过，不影响网站运行

  var _hmt = window._hmt = window._hmt || [];
  (function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?" + TOKEN;
    hm.async = true;
    var s = document.getElementsByTagName("script")[0];
    if (s && s.parentNode) {
      s.parentNode.insertBefore(hm, s);
    } else {
      document.head.appendChild(hm);
    }
  })();
})();
