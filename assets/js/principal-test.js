/* 学校管理水平测评 —— 情境化客观测评版
   设计依据：《义务教育学校校长专业标准》(教育部,2013) 与《普通高中校长专业标准》(教育部,2015)
   的「六项专业职责」。改造要点（与班级管理水平测试一致）：
   1) 题目均为真实治校场景，选项是校长会采取的不同「做法」，通过做法客观判断水平——避免主观自评。
   2) 题干不暴露所测职责；部分场景一题可同时诊断多个职责，从而减少答题量（本次共 12 题）。
   3) 题目由易到难排序；含反向/情境陷阱题，并对「连续同一水平」等敷衍作答做出提示。
   每个做法映射四级水平（lv 1~4），最后按 6 项专业职责分别诊断 + 综合水平 + 对照标准的提升建议。 */
(function () {
  /* ===== 六项专业职责（一级指标）===== */
  var DIMS = [
    { key: "P1", name: "规划学校发展", color: "#14A277", icon: "🗺️" },
    { key: "P2", name: "营造育人文化", color: "#EBA93C", icon: "🎨" },
    { key: "P3", name: "领导课程教学", color: "#4DA8F0", icon: "📚" },
    { key: "P4", name: "引领教师成长", color: "#2FBF8C", icon: "🌱" },
    { key: "P5", name: "优化内部管理", color: "#9B8CE8", icon: "⚙️" },
    { key: "P6", name: "调适外部环境", color: "#EF8A6E", icon: "🤝" }
  ];

  /* ===== 情境题库 =====
     diff：难度(1易/2中/3难，用于由易到难排序)
     dims：本题诊断的职责(可多维，选项水平会计入每个职责)
     reverse：反向/陷阱题(最佳做法并非「最果断」的那个)
     opts：{ t 做法文本, lv 对应水平1~4, trap 陷阱项(看似决断实则不当) } */
  var BANK = [
    /* —— 易 —— */
    { id: 1, diff: 1, dims: ["P1"],
      scene: "区里要求各校制定新一轮三年发展规划，你们学校刚启动这项工作。",
      opts: [
        { t: "按上级模板填一份材料交差，应付检查就行。", lv: 1 },
        { t: "由校长室几位行政凭经验写一份，再走个教代会通过。", lv: 2 },
        { t: "组织师生、家长、社区多方调研，经教代会充分讨论后形成规划。", lv: 3 },
        { t: "系统诊断校情、凝聚全员共识，并把规划拆成可落地的年度行动与监测机制。", lv: 4 }
      ] },
    { id: 2, diff: 1, dims: ["P5"],
      scene: "学校考勤松散、会议纪律差，教职工对常规管理有点「随意」。",
      opts: [
        { t: "开会时强调一下、点名批评几个典型。", lv: 1 },
        { t: "按既有制度执行，该扣绩效的扣。", lv: 2 },
        { t: "完善考勤与会议流程，明确标准并定期反馈。", lv: 3 },
        { t: "建立以人为本的治理结构，授权加透明加关怀，激发自主管理。", lv: 4 }
      ] },
    { id: 3, diff: 1, dims: ["P6"],
      scene: "一位家长在学校门口拉横幅维权，引来路人围观、议论纷纷。",
      opts: [
        { t: "让保安驱赶、必要时报警清场。", lv: 1 },
        { t: "把家长请进传达室冷处理，等风头过去。", lv: 2 },
        { t: "主动接待、耐心倾听诉求，依法依规沟通化解。", lv: 3 },
        { t: "以此为契机建立家校社协同机制，把对立转为共建伙伴。", lv: 4 }
      ] },
    { id: 4, diff: 1, dims: ["P4"],
      scene: "一批新教师入职第一年，成长缓慢、压力很大、有人萌生去意。",
      opts: [
        { t: "新人嘛，让他们自己摸索、扛过去就好。", lv: 1 },
        { t: "安排一位老教师带一带，有问题再问。", lv: 2 },
        { t: "启动青蓝工程，系统培训、听课反馈、定期座谈。", lv: 3 },
        { t: "构建教师学习共同体，分层培养并关注他们的职业幸福感。", lv: 4 }
      ] },

    /* —— 中 —— */
    { id: 5, diff: 2, dims: ["P3", "P1"],
      scene: "区里推进课堂教学改革，要求切实提升常态课质量。",
      opts: [
        { t: "转发文件、按上级考核指标执行。", lv: 1 },
        { t: "组织几节公开课、评优课了事。", lv: 2 },
        { t: "立足校情制定课堂改进方案，聚焦每一节常态课。", lv: 3 },
        { t: "以课程领导力统筹国家、地方、校本课程，建起教学质量保障体系。", lv: 4 }
      ] },
    { id: 6, diff: 2, dims: ["P2", "P4"],
      scene: "学校想加强校园文化建设，但师生参与热情低，像是「被安排」。",
      opts: [
        { t: "多做几个宣传栏、挂些标语口号。", lv: 1 },
        { t: "搞几次文体活动凑热闹。", lv: 2 },
        { t: "师生共建文化，把育人融入日常制度与关系。", lv: 3 },
        { t: "系统规划精神、制度、环境文化，形成全员育人生态。", lv: 4 }
      ] },
    { id: 7, diff: 2, dims: ["P5", "P4"],
      scene: "中层干部执行力不强，部门之间各自为政、协同困难。",
      opts: [
        { t: "大小事都自己盯、事必躬亲。", lv: 1 },
        { t: "开会反复强调要协同配合。", lv: 2 },
        { t: "明确权责边界，建立协作流程与联席例会。", lv: 3 },
        { t: "授权赋能，打造学习型管理团队，用文化引领而非管控。", lv: 4 }
      ] },
    { id: 8, diff: 2, dims: ["P6", "P1"],
      scene: "周边社区对学校噪音、停车有意见，关系日趋紧张。",
      opts: [
        { t: "不理会，按程序走、等对方适应。", lv: 1 },
        { t: "派总务处去协调几次。", lv: 2 },
        { t: "主动沟通，建立校社定期联席与反馈机制。", lv: 3 },
        { t: "把社区资源转化为育人伙伴，开放共享、互利共赢。", lv: 4 }
      ] },

    /* —— 反向 / 情境陷阱题（安排在中段） —— */
    { id: 90, diff: 2, dims: ["P6"], reverse: true,
      scene: "有家长在家长群公开质疑你「护短」、处理不公，其他家长开始围观起哄。此刻你的第一步——",
      opts: [
        { t: "立刻在群里逐条反驳，把事情当众说清楚、维护威信。", lv: 1, trap: true },
        { t: "先简短回应「稍后私聊」，把交流转到私下、待双方冷静。", lv: 4 },
        { t: "不予理会，等家长自己冷静下来再说。", lv: 2 },
        { t: "马上打电话过去，情绪对情绪地解释一通。", lv: 1 }
      ] },
    { id: 91, diff: 2, dims: ["P1", "P5"], reverse: true,
      scene: "上级突然下达一项紧急创建任务（如文明校园），时间非常紧。你的总体思路更可能是——",
      opts: [
        { t: "连夜开会施压，全员突击、重留痕轻内涵去迎检。", lv: 1, trap: true },
        { t: "抓住契机把创建融入常态，分工协同、以评促建。", lv: 4 },
        { t: "对照清单逐项应付，交差了事。", lv: 2 },
        { t: "只让德育处一家负责，其他人不必动。", lv: 2 }
      ] },

    /* —— 难 —— */
    { id: 11, diff: 3, dims: ["P1"],
      scene: "学校发展到平台期，特色不鲜明、部分教师出现职业倦怠。",
      opts: [
        { t: "维持现状，等上级有新部署再动。", lv: 1 },
        { t: "照搬一两所名校的经验做法。", lv: 2 },
        { t: "做校情诊断，凝练办学理念并分步推进。", lv: 3 },
        { t: "以愿景引领，构建能自我更新的学校持续改进循环。", lv: 4 }
      ] },
    { id: 12, diff: 3, dims: ["P3"],
      scene: "学生学业负担重，但核心素养提升不明显，家长却只盯分数。",
      opts: [
        { t: "加作业、加补习，用题量换成绩。", lv: 1 },
        { t: "狠抓考试排名，以考促学。", lv: 2 },
        { t: "推进评价改革、优化作业设计与分层教学。", lv: 3 },
        { t: "以核心素养为导向，重构课程、教学与评价的生态。", lv: 4 }
      ] },
    { id: 13, diff: 3, dims: ["P4", "P2"],
      scene: "骨干教师流失、青年教师动力不足，队伍青黄不接。",
      opts: [
        { t: "主要靠提高待遇来「留人」。", lv: 1 },
        { t: "多组织几场培训讲座。", lv: 2 },
        { t: "搭建教师成长阶梯，营造常态化教研文化。", lv: 3 },
        { t: "以使命与专业双轮驱动，把学校办成教师发展的学校。", lv: 4 }
      ] },
    { id: 14, diff: 3, dims: ["P2"],
      scene: "校园活动不少，但缺温度，学生归属感弱、像「局外人」。",
      opts: [
        { t: "再多搞些活动凑数、冲热闹。", lv: 1 },
        { t: "抓行为规范评比、争流动红旗。", lv: 2 },
        { t: "把育人润物无声地融入课程与师生关系。", lv: 3 },
        { t: "让文化内生，使每个角落、每段关系都成为育人现场。", lv: 4 }
      ] },
    { id: 15, diff: 3, dims: ["P5"],
      scene: "规章制度越来越多，但师生觉得管得死、办事效率低。",
      opts: [
        { t: "继续加码考核、细化条款。", lv: 1 },
        { t: "把流程再拆细、层层审批。", lv: 2 },
        { t: "简政放权，用数据优化治理与服务。", lv: 3 },
        { t: "从「管控」转向「赋能」，建立有温度的现代学校制度。", lv: 4 }
      ] },
    { id: 16, diff: 3, dims: ["P6"],
      scene: "一次校园安全小事故引发媒体关注，舆情开始在网上发酵。",
      opts: [
        { t: "封锁消息、回避采访，等热度过去。", lv: 1 },
        { t: "等上级统一口径再回应。", lv: 2 },
        { t: "主动发布权威信息，坦诚沟通、澄清误解。", lv: 3 },
        { t: "建立舆情应对与公共沟通机制，化危为机、重塑信任。", lv: 4 }
      ] }
  ];

  var TARGET = 12;                    // 每次作答题量
  var SEEN_KEY = "principal_test_seen_v1";

  /* 各职责对照提升建议（依据两项校长专业标准） */
  var ADVICE_BY_DIM = {
    P1: ["从「写一份材料」走向「凝聚共识」：用调查与教代会把规划变成大家的规划。",
         "把规划拆成年度行动加监测指标，让蓝图可落地、可复盘。",
         "建立学校自我诊断与改进循环，让发展持续内生。"],
    P2: ["少做「标语墙」，多做「关系场」：让育人发生在课程与日常互动里。",
         "系统规划精神、制度、环境三层文化，避免碎片化活动。",
         "让师生成为文化共建者，而非被动参与者。"],
    P3: ["把目光从「几节公开课」移到「每一节常态课」的质量。",
         "以课程领导力统筹三类课程，建起教学质量保障闭环。",
         "以核心素养为导向，重构教学评价而非只盯分数。"],
    P4: ["从「一对一师徒」升级为「教师学习共同体」，让成长彼此赋能。",
         "关注新教师与骨干的差异化需求，分层培养。",
         "把教师职业幸福感纳入治校目标，减少倦怠与流失。"],
    P5: ["从事必躬亲转向授权赋能，培养中层执行力与协同。",
         "用透明流程与数据优化治理，减少「人治」随意。",
         "从「管控」走向「服务」，让制度有温度、有效率。"],
    P6: ["把家校冲突视为信任建设机会，先接住情绪再谈事实。",
         "主动建立校社、校媒常态化沟通机制，化被动为主动。",
         "把社区与公共关系转化为育人资源与合作伙伴。"]
  };

  /* 综合水平等级（四级水平） */
  var LEVELS = [
    { min: 3.25, tier: "四级水平", name: "教育家型校长", color: "#2FBF8C",
      desc: "你已进入治校的「艺术」境界——以愿景引领、系统规划、文化内生，把学校办成师生共同成长的生态。你是可以示范引领的卓越校长。" },
    { min: 2.50, tier: "三级水平", name: "系统治校型", color: "#4DA8F0",
      desc: "你注重「体系」，能有计划、有方法地规划学校、领导教学、带好队伍。再向「教育艺术」进阶，你会更加从容。" },
    { min: 1.75, tier: "二级水平", name: "经验管理型", color: "#EBA93C",
      desc: "你已积累治校经验，懂得「用什么方法管」。下一步是从「凭经验」走向「成体系」——多一些规划性与机制设计。" },
    { min: 0,    tier: "一级水平", name: "事务应对型", color: "#EF8A6E",
      desc: "你目前更关注「把事情办完」，管理偏事务应对。这是每位校长的必经起点——对照专业标准找差距，从规划与机制入手，你会快速成长。" }
  ];

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  /* 选题：始终纳入反向题；其余优先抽未见过的；确保六职责全覆盖；按难度由易到难排序 */
  function pickQuestions() {
    var seen = [];
    try { seen = JSON.parse(localStorage.getItem(SEEN_KEY) || "[]") || []; } catch (e) { seen = []; }

    var reverseItems = BANK.filter(function (b) { return b.reverse; });
    var normal = BANK.filter(function (b) { return !b.reverse; });

    var unseen = shuffle(normal.filter(function (b) { return seen.indexOf(b.id) < 0; }));
    var seenPool = shuffle(normal.filter(function (b) { return seen.indexOf(b.id) >= 0; }));
    var ordered = unseen.concat(seenPool);

    var need = TARGET - reverseItems.length;
    var chosen = ordered.slice(0, need);

    // 保证六职责全覆盖：缺哪个职责就从题库里换入一题
    function coverSet(list) {
      var c = {};
      list.forEach(function (q) { q.dims.forEach(function (d) { c[d] = true; }); });
      return c;
    }
    DIMS.forEach(function (d) {
      var cov = coverSet(chosen.concat(reverseItems));
      if (!cov[d.key]) {
        var cand = ordered.find(function (q) { return chosen.indexOf(q) < 0 && q.dims.indexOf(d.key) >= 0; });
        if (cand) chosen[chosen.length - 1] = cand;
      }
    });

    var all = chosen.concat(reverseItems);

    // 记录已见，滚动淘汰，避免连续重测过度重复
    var ids = all.map(function (q) { return q.id; });
    var newSeen = seen.concat(ids);
    var cap = BANK.length - reverseItems.length; // 反向题每次都出，不计入淘汰
    if (newSeen.length > cap) newSeen = newSeen.slice(newSeen.length - cap);
    try { localStorage.setItem(SEEN_KEY, JSON.stringify(newSeen)); } catch (e) {}

    // 由易到难
    all.sort(function (a, b) { return a.diff - b.diff; });

    // 生成渲染对象（选项打乱，隐藏职责）
    return all.map(function (q) {
      return {
        dims: q.dims,
        reverse: !!q.reverse,
        scene: q.scene,
        opts: shuffle(q.opts.map(function (o) { return { t: o.t, lv: o.lv, trap: !!o.trap }; }))
      };
    });
  }

  var QUESTIONS = pickQuestions();
  var idx = 0;
  var answers = new Array(QUESTIONS.length).fill(null);

  var qTitle = document.getElementById("qTitle");
  var optionsEl = document.getElementById("options");
  var progressFill = document.getElementById("progressFill");
  var progressText = document.getElementById("progressText");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");
  var questionArea = document.getElementById("questionArea");
  var resultArea = document.getElementById("resultArea");

  function renderQ() {
    var item = QUESTIONS[idx];
    qTitle.innerHTML =
      '<span class="q-num">情境 ' + (idx + 1) + '</span>' +
      '<span class="q-scene">' + item.scene + '</span>' +
      '<span class="q-hint">如果是你，下面哪种做法最接近你的真实选择？</span>';
    var keys = ["A", "B", "C", "D"];
    optionsEl.innerHTML = item.opts.map(function (o, i) {
      var sel = answers[idx] === i ? " selected" : "";
      return '<div class="option' + sel + '" data-i="' + i + '"><span class="opt-key">' + keys[i] + '</span><span>' + o.t + '</span></div>';
    }).join("");
    optionsEl.querySelectorAll(".option").forEach(function (el) {
      el.addEventListener("click", function () {
        answers[idx] = parseInt(el.getAttribute("data-i"), 10);
        renderQ();
      });
    });
    progressFill.style.width = ((idx + 1) / QUESTIONS.length * 100) + "%";
    progressText.textContent = "第 " + (idx + 1) + " / " + QUESTIONS.length + " 题";
    prevBtn.style.visibility = idx === 0 ? "hidden" : "visible";
    nextBtn.textContent = idx === QUESTIONS.length - 1 ? "查看诊断结果 ✓" : "下一题 →";
  }

  prevBtn.addEventListener("click", function () { if (idx > 0) { idx--; renderQ(); } });
  nextBtn.addEventListener("click", function () {
    if (answers[idx] === null) { alert("请先选择一个选项哦～"); return; }
    if (idx < QUESTIONS.length - 1) { idx++; renderQ(); }
    else showResult();
  });

  function dimName(key) {
    for (var i = 0; i < DIMS.length; i++) if (DIMS[i].key === key) return DIMS[i].name;
    return "";
  }

  function showResult() {
    var dimSum = {}, dimCnt = {};
    DIMS.forEach(function (d) { dimSum[d.key] = 0; dimCnt[d.key] = 0; });
    var total = 0, count = 0, trapHits = 0;
    var lvSeq = [];
    for (var i = 0; i < QUESTIONS.length; i++) {
      if (answers[i] !== null) {
        var opt = QUESTIONS[i].opts[answers[i]];
        var lvl = opt.lv;
        QUESTIONS[i].dims.forEach(function (d) { dimSum[d] += lvl; dimCnt[d]++; });
        total += lvl; count++;
        lvSeq.push(lvl);
        if (QUESTIONS[i].reverse && opt.trap) trapHits++;
      }
    }
    var overall = count ? total / count : 0;
    var pct = Math.round(overall / 4 * 100);
    var band = LEVELS.find(function (l) { return overall >= l.min; });

    // 敷衍作答检测：连续同一水平 或 两道反向题都掉进陷阱
    var allSame = lvSeq.length > 0 && lvSeq.every(function (v) { return v === lvSeq[0]; });
    var careless = allSame || trapHits >= 2;

    var dimAvgs = DIMS.map(function (d) {
      return { d: d, avg: dimCnt[d.key] ? dimSum[d.key] / dimCnt[d.key] : 0 };
    });

    var breakdownHtml = dimAvgs.map(function (x) {
      var w = Math.round(x.avg / 4 * 100);
      return '<div class="dim-row">' +
        '<span class="dim-label"><span class="dim-ic">' + x.d.icon + '</span>' + x.d.name + '</span>' +
        '<span class="dim-track"><span class="dim-bar" style="width:' + w + '%;background:' + x.d.color + '"></span></span>' +
        '<span class="dim-lvl" style="color:' + x.d.color + '">' + x.avg.toFixed(1) + ' 级</span>' +
      '</div>';
    }).join("");

    var weak = dimAvgs.slice().sort(function (a, b) { return a.avg - b.avg; }).slice(0, 2);
    var adviceHtml = weak.map(function (x) {
      var tips = ADVICE_BY_DIM[x.d.key] || [];
      return '<div class="adv-block"><h5><span class="dim-ic">' + x.d.icon + '</span>' + x.d.name +
        ' <span class="adv-lvl">当前 ' + x.avg.toFixed(1) + ' 级</span></h5><ul>' +
        tips.map(function (t) { return '<li>' + t + '</li>'; }).join("") + '</ul></div>';
    }).join("");

    var qualityHtml = careless
      ? '<div class="quality-note">⚠️ 检测到本次作答可能不够认真（如连续选择同一水平，或情境反应题的处置偏冲动）。诊断结果仅供参考，建议放松心态、按真实做法「换一批重测」。</div>'
      : '';

    questionArea.classList.add("hidden");
    resultArea.classList.remove("hidden");
    resultArea.innerHTML =
      qualityHtml +
      '<div class="score-ring" style="--pct:' + pct + '%">' +
        '<div class="inner"><span class="val">' + overall.toFixed(1) + '</span><span class="unit">综合水平</span></div>' +
      '</div>' +
      '<h2>你的学校管理能力水平</h2>' +
      '<span class="level-tag" style="background:' + band.color + '">' + band.tier + ' · ' + band.name + '</span>' +
      '<p class="desc">' + band.desc + '</p>' +
      '<div class="dim-breakdown"><h4>📐 六项专业职责诊断（1→4 级）</h4>' + breakdownHtml + '</div>' +
      '<div class="advice"><h4>💡 对照标准找差距 · 优先提升</h4>' + adviceHtml + '</div>' +
      '<p class="std-note">诊断依据：《义务教育学校校长专业标准》（教育部，2013）与《普通高中校长专业标准》（教育部，2015）六项专业职责 · 本次通过 ' + QUESTIONS.length + ' 个真实治校情境反推你的能力水平，重测将换一批场景。</p>' +
      '<div style="margin-top:20px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
        '<button class="btn btn-primary" id="retryBtn">换一批重测</button>' +
        '<a class="btn btn-ghost" href="resources.html">去资源库提升 →</a>' +
      '</div>';
    document.getElementById("retryBtn").addEventListener("click", function () {
      QUESTIONS = pickQuestions();
      idx = 0; answers = new Array(QUESTIONS.length).fill(null);
      resultArea.classList.add("hidden"); questionArea.classList.remove("hidden");
      renderQ(); window.scrollTo({ top: 0, behavior: "smooth" });
    });
    try { if (window.SiteTrack) window.SiteTrack.recordTest("学校管理", { score: overall.toFixed(1), level: band.name }); } catch (e) {}
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  renderQ();
})();
