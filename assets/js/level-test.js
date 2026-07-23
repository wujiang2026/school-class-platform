/* 班级管理水平测试 —— 情境化客观测评版
   设计依据：《中小学教师培训课程指导标准（班级管理）》(教育部办公厅,2020) 能力诊断级差表。
   改造要点（回应一线使用反馈）：
   1) 题目均为真实工作场景，选项是老师会采取的不同「做法」，通过做法客观判断水平——不再让老师直接自评。
   2) 题干不暴露所测维度；部分场景一题可同时诊断多个维度，从而减少答题量（本次共 12 题）。
   3) 题目由易到难排序；含反向/情境陷阱题，并对「连续同一水平」等敷衍作答做出提示。
   每个做法映射四级水平（lv 1~4），最后按 5 个维度分别诊断 + 综合水平 + 对照标准的提升建议。 */
(function () {
  /* ===== 五大能力维度(一级指标) ===== */
  var DIMS = [
    { key: "D1", name: "班集体建设",   color: "#4FB06A", icon: "🏛️" },
    { key: "D2", name: "班级活动组织", color: "#EEB84A", icon: "🎪" },
    { key: "D3", name: "学生发展指导", color: "#4DA8F0", icon: "🌱" },
    { key: "D4", name: "综合素质评价", color: "#35C08A", icon: "📊" },
    { key: "D5", name: "沟通与合作",   color: "#9B8CE8", icon: "🤝" }
  ];

  /* ===== 情境题库 =====
     diff：难度(1易/2中/3难，用于由易到难排序)
     dims：本题诊断的维度(可多维，选项水平会计入每个维度)
     reverse：反向/陷阱题(最佳做法并非"最花哨"的那个)
     opts：{ t 做法文本, lv 对应水平1~4, trap 陷阱项(看似果断实则不当) } */
  var BANK = [
    /* —— 易 —— */
    { id: 1, diff: 1, dims: ["D1"],
      scene: "新接班第一周，早读课总有几个学生说话、走神，教室有点乱。",
      opts: [
        { t: "当场点名批评带头的几个，撂下狠话「谁再讲话就罚站」。", lv: 1 },
        { t: "用自己带班的老办法，安排小组长盯着、记名字扣分。", lv: 2 },
        { t: "和学生一起把早读流程和小目标定清楚，安排值日班长带领，提前防乱。", lv: 3 },
        { t: "把早读做成有仪式感的班级例行，让学生轮流主持、自我管理，慢慢内化成习惯。", lv: 4 }
      ] },
    { id: 2, diff: 1, dims: ["D5"],
      scene: "一个平时不起眼的学生，这周主动帮同学、作业也认真了不少。",
      opts: [
        { t: "这点小事不用特意联系家长，家长有事自然会找我。", lv: 1 },
        { t: "等下次家长会或家长来问时，顺口提一句。", lv: 2 },
        { t: "及时给家长发条消息，具体说说孩子的进步，肯定他。", lv: 3 },
        { t: "主动和家长沟通，一起商量怎么把这份进步延续下去，形成合力。", lv: 4 }
      ] },
    { id: 3, diff: 1, dims: ["D4"],
      scene: "期末又到了给每个学生写操行评语的时候。",
      opts: [
        { t: "凭整体印象，套用模板写几句通用的话。", lv: 1 },
        { t: "回想一下平时表现，综合给个等级和评语。", lv: 2 },
        { t: "参考平时积累的记录和多方面表现来写，尽量写具体。", lv: 3 },
        { t: "结合成长档案和过程记录，写出个性化评语并附上发展建议。", lv: 4 }
      ] },
    { id: 4, diff: 1, dims: ["D2"],
      scene: "临近期末，班里想办一场小型联欢会放松一下。",
      opts: [
        { t: "时间紧，随便让文娱委员安排几个节目应付一下。", lv: 1 },
        { t: "凭经验组织报名和串场，办得热闹就行。", lv: 2 },
        { t: "有计划地发动全班，让学生自主分工、策划节目单。", lv: 3 },
        { t: "借联欢会做一次集体凝聚的教育契机，赛后带大家一起回顾成长。", lv: 4 }
      ] },

    /* —— 中 —— */
    { id: 5, diff: 2, dims: ["D3", "D5"],
      scene: "一个成绩不错的学生，最近连续几天上课走神、闷闷不乐，作业也开始敷衍。",
      opts: [
        { t: "先批评他态度问题，要求他尽快端正学习态度。", lv: 1 },
        { t: "找他简单谈一次，凭经验劝导几句。", lv: 2 },
        { t: "主动找他谈心倾听，弄清背后原因，并留意后续的情绪变化。", lv: 3 },
        { t: "在倾听关心的同时，视情况联系家长、任课老师，共同关注、及时疏导。", lv: 4 }
      ] },
    { id: 6, diff: 2, dims: ["D2", "D1"],
      scene: "学校运动会临近，需要组织班级参赛和啦啦队。",
      opts: [
        { t: "按要求报几个人别缺席，不出事就行。", lv: 1 },
        { t: "凭经验安排报名和加油，办得热闹点。", lv: 2 },
        { t: "有计划地发动全班，让学生自主分工报名、设计口号和方阵。", lv: 3 },
        { t: "借运动会培养集体荣誉感，引导学生自主策划，赛后再带大家一起复盘。", lv: 4 }
      ] },
    { id: 7, diff: 2, dims: ["D1"],
      scene: "新学期要产生新一届班委。",
      opts: [
        { t: "直接指定几个我信得过、能替我管纪律的学生。", lv: 1 },
        { t: "凭平时观察挑几个能干的，分工由我来定。", lv: 2 },
        { t: "组织自荐、竞选，有计划地轮岗让更多人得到锻炼。", lv: 3 },
        { t: "设计「人人有岗、事事有人」的班级组织，让学生在岗位上学会自治与担当。", lv: 4 }
      ] },
    { id: 8, diff: 2, dims: ["D3"],
      scene: "一个学生作业总不交，屡次提醒也没什么改善。",
      opts: [
        { t: "严厉批评、请家长，盯着他把作业补齐。", lv: 1 },
        { t: "用我以前对付这类学生的老办法督促他。", lv: 2 },
        { t: "分析他不交作业的原因，有针对性地帮扶并肯定他的点滴进步。", lv: 3 },
        { t: "用发展的眼光找到症结，定个性化转化方案，静待他慢慢改变。", lv: 4 }
      ] },
    { id: 9, diff: 2, dims: ["D4"],
      scene: "关于平时记录学生的成长过程这件事，你的现状更接近——",
      opts: [
        { t: "基本不做记录，用到再说。", lv: 1 },
        { t: "零散记一点，需要时翻一翻。", lv: 2 },
        { t: "有计划地为学生建立成长记录。", lv: 3 },
        { t: "系统建立成长档案，并真正用于个性化指导。", lv: 4 }
      ] },

    /* —— 反向 / 情境陷阱题（安排在中段） —— */
    { id: 90, diff: 2, dims: ["D5"], reverse: true,
      scene: "一位家长在班级群里公开质疑你「偏心」，情绪激动，其他家长开始围观。此刻你的第一步——",
      opts: [
        { t: "立刻在群里逐条反驳，把事情当众说清楚，维护自己的威信。", lv: 1, trap: true },
        { t: "先在群里简短回应「稍后与您私聊沟通」，把交流转到私下、待双方冷静。", lv: 4 },
        { t: "不予理会，等家长自己冷静下来再说。", lv: 2 },
        { t: "马上打电话过去，情绪对情绪地解释一通。", lv: 1 }
      ] },
    { id: 91, diff: 2, dims: ["D1", "D3"], reverse: true,
      scene: "课间两个学生突然动手打起来，周围同学起哄。你的第一反应应该是——",
      opts: [
        { t: "冲上去先把带头的严厉训一顿，杀鸡儆猴。", lv: 1, trap: true },
        { t: "第一时间制止、把两人分开确保安全，再冷静了解情况。", lv: 4 },
        { t: "让班长先去处理，我随后过问。", lv: 2 },
        { t: "当众要求两人马上握手言和、别闹了。", lv: 2 }
      ] },

    /* —— 难 —— */
    { id: 10, diff: 3, dims: ["D1"],
      scene: "你希望这个班更有凝聚力和归属感。最能体现你思路的做法是——",
      opts: [
        { t: "多贴些励志标语和口号，把气氛烘起来。", lv: 1 },
        { t: "参考别的班，搞个班徽、班歌、文化角。", lv: 2 },
        { t: "有主题、有计划地和学生一起共建班级精神文化。", lv: 3 },
        { t: "系统规划环境—制度—精神文化，让班级气质潜移默化影响每个人。", lv: 4 }
      ] },
    { id: 11, diff: 3, dims: ["D2"],
      scene: "针对最近班里的手机沉迷问题，你打算开一次班会。",
      opts: [
        { t: "在班会上强调纪律，宣布没收手机的规定。", lv: 1 },
        { t: "准备些案例和道理，讲给学生听。", lv: 2 },
        { t: "设计一节有学生参与、体验的主题班会，引导他们自己认识问题。", lv: 3 },
        { t: "抓住这个教育时机，让学生自主策划班会、共订公约，育人于无形。", lv: 4 }
      ] },
    { id: 12, diff: 3, dims: ["D4", "D3"],
      scene: "一次阶段性评价（考试或综合测评）之后，你会怎样处理评价结果？",
      opts: [
        { t: "公布分数或排名，就算完成任务。", lv: 1 },
        { t: "用结果提醒、督促排名靠后的学生。", lv: 2 },
        { t: "给每个学生反馈，指出具体的改进方向。", lv: 3 },
        { t: "把评价当育人工具，引导学生自我反思、制定成长目标。", lv: 4 }
      ] },
    { id: 13, diff: 3, dims: ["D5"],
      scene: "班上整体学风出现波动，涉及好几门学科。你倾向于——",
      opts: [
        { t: "主要靠自己盯，很少和科任老师沟通。", lv: 1 },
        { t: "有需要时才找相关科任老师协调一下。", lv: 2 },
        { t: "主动与科任老师沟通，协同关注学生。", lv: 3 },
        { t: "牵头搭建班级教育团队，定期沟通共商，形成育人合力。", lv: 4 }
      ] },
    { id: 14, diff: 3, dims: ["D3"],
      scene: "面对学生对「为什么学习、将来做什么」的迷茫，你会——",
      opts: [
        { t: "觉得这不是班主任分内事，抓好成绩就行。", lv: 1 },
        { t: "偶尔在合适的时候给点建议。", lv: 2 },
        { t: "有计划地开展生活习惯与生涯启蒙的引导。", lv: 3 },
        { t: "结合每个学生的特点，为其长远发展做规划引导。", lv: 4 }
      ] }
  ];

  var TARGET = 12;                    // 每次作答题量（较原 15 题精简）
  var SEEN_KEY = "level_test_seen_v3";

  /* 各维度对照提升建议 */
  var ADVICE_BY_DIM = {
    D1: ["从「我说你听」走向价值引领：尝试师生共订班级公约，让规则被学生认同。",
         "有计划地培养班干部、推行值日轮岗，逐步建立班级自主管理机制。",
         "系统规划班级文化（环境—制度—精神），营造归属感与共同价值。"],
    D2: ["把班会从「传达通知」升级为「主题课程」，围绕成长主题精心设计。",
         "组织文体/实践活动时，鼓励学生自主策划，并带领大家在活动后反思。",
         "用仪式感标记成长节点，放大集体活动的育人功能。"],
    D3: ["建立学生档案，动态了解学情，做个性化的学习与生活指导。",
         "增强心理健康的预防意识，主动关注情绪，而非事后才处理。",
         "对后进生分析成因、正向激励，用发展的眼光去转化。"],
    D4: ["从「期末凭印象」转向过程性、多维度的综合评价。",
         "为学生建立成长记录，并把评价结果真正用于反馈与改进。",
         "引入学生自评、互评，培养他们的自我认识能力。"],
    D5: ["师生沟通多倾听、少命令，练习「冷静—倾听—共商」三步法。",
         "变「出问题才联系家长」为定期的正面沟通，形成家校合力。",
         "主动与科任老师协同，搭建班级教育团队。"]
  };

  /* 综合水平等级（四级水平） */
  var LEVELS = [
    { min: 3.25, tier: "四级水平", name: "艺术引领型", color: "#35C08A",
      desc: "你已进入班级管理的「艺术」境界——关注顶层设计与教育时机，善用潜移默化育人，尊重每个学生的差异。你是可以示范引领的卓越班主任。" },
    { min: 2.50, tier: "三级水平", name: "计划预防型", color: "#4DA8F0",
      desc: "你注重「预防」，能有目的、有计划、有系统地开展班级工作，以身示范、言传身教。再向「教育艺术」进阶，你会更加从容。" },
    { min: 1.75, tier: "二级水平", name: "经验积累型", color: "#EEB84A",
      desc: "你已积累了一定的带班经验，懂得「方法引导」。下一步是从「凭经验」走向「成体系」——多一些计划性与预防性设计。" },
    { min: 0,    tier: "一级水平", name: "任务胜任型", color: "#EF8A6E",
      desc: "你目前更关注「完成任务」，管理方式偏直接。这是每位班主任的必经起点——对照标准找差距，从机制与方法入手，你会快速成长。" }
  ];

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  /* 选题：始终纳入反向题；其余优先抽未见过的；确保五维度全覆盖；按难度由易到难排序 */
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

    // 保证五维度全覆盖：缺哪个维度就从题库里换入一题
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

    // 生成渲染对象（选项打乱，隐藏维度）
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
        ' <span class="adv-lv">当前 ' + x.avg.toFixed(1) + ' 级</span></h5><ul>' +
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
      '<h2>你的班级管理能力水平</h2>' +
      '<span class="level-tag" style="background:' + band.color + '">' + band.tier + ' · ' + band.name + '</span>' +
      '<p class="desc">' + band.desc + '</p>' +
      '<div class="dim-breakdown"><h4>📐 五大维度诊断（1→4 级）</h4>' + breakdownHtml + '</div>' +
      '<div class="advice"><h4>💡 对照标准找差距 · 优先提升</h4>' + adviceHtml + '</div>' +
      '<p class="std-note">诊断依据：《中小学教师培训课程指导标准（班级管理）》（教育部办公厅，2020）能力诊断级差表 · 本次通过 ' + QUESTIONS.length + ' 个真实情境反推你的能力水平，重测将换一批场景。</p>' +
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
    try { if (window.SiteTrack) window.SiteTrack.recordTest("班主任水平", { score: overall.toFixed(1), level: band.name }); } catch (e) {}
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  renderQ();
})();
