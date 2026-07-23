/* 本地行为记录（无服务器版本）
   记录页面访问与测评结果到浏览器 localStorage，供「数据看板」汇总展示。
   说明：数据仅保存在当前设备浏览器，不跨用户、不上传服务器。 */
window.SiteTrack = (function () {
  var VISIT_KEY = "site_visits_v1";
  var TEST_KEY = "site_tests_v1";

  function pageKey() {
    var m = location.pathname.match(/([\w-]+)\.html/);
    return m ? m[1] : "index";
  }

  function read(key) {
    try { return JSON.parse(localStorage.getItem(key) || "[]") || []; } catch (e) { return []; }
  }
  function write(key, arr) {
    try { localStorage.setItem(key, JSON.stringify(arr)); } catch (e) {}
  }

  function visit() {
    var arr = read(VISIT_KEY);
    arr.push({ p: pageKey(), t: Date.now() });
    if (arr.length > 300) arr = arr.slice(arr.length - 300);
    write(VISIT_KEY, arr);
  }

  function recordTest(kind, data) {
    var arr = read(TEST_KEY);
    arr.push(Object.assign({ kind: kind, t: Date.now() }, data || {}));
    if (arr.length > 200) arr = arr.slice(arr.length - 200);
    write(TEST_KEY, arr);
  }

  function clearAll() {
    try { localStorage.removeItem(VISIT_KEY); localStorage.removeItem(TEST_KEY); } catch (e) {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", visit);
  } else {
    visit();
  }

  return { visit: visit, recordTest: recordTest, clearAll: clearAll,
           getVisits: function () { return read(VISIT_KEY); },
           getTests: function () { return read(TEST_KEY); } };
})();
