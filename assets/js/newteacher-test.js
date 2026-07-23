/* 新教师专业发展水平测试 —— 情境化客观测评版
   设计依据：《小学教师专业标准（试行）》《中学教师专业标准（试行）》(教育部, 2012)
   三大维度（一级指标）：专业理念与师德 / 专业知识 / 专业能力。
   面向近三年新入职教师：题目均为真实教育教学场景，选项是不同「做法」，
   通过做法客观反推专业发展水平——不暴露所测维度，由易到难，含反向陷阱题。 */
(function () {
  var DIMS = [
    { key: "D1", name: "专业理念与师德", color: "#7A25A8", icon: "🌟" },
    { key: "D2", name: "专业知识",       color: "#4DA8F0", icon: "📚" },
    { key: "D3", name: "专业能力",       color: "#35C08A", icon: "🛠️" }
  ];

  var BANK = [
    /* —— 易 —— */
    { id: 1, diff: 1, dims: ["D1"],
      scene: "开学第一课，你走进一个陌生的新班级。你最先做的是——",
      opts: [
        { t: "先立规矩、点名、把课堂纪律和处罚说在前头。", lv: 1 },
        { t: "照着老教师的开班流程走一遍，求稳不出错。", lv: 2 },
        { t: "先认识学生、了解班情，再和他们一起商量班级公约。", lv: 3 },
        { t: "用一节能走进学生心里的课，建立信任与共同愿景。", lv: 4 }
      ] },
    { id: 2, diff: 1, dims: ["D2"],
      scene: "备课组发来单元教材和教参，作为新教师的你会——",
      opts: [
        { t: "照着教参把知识点讲完就行。", lv: 1 },
        { t: "把教材内容熟悉一遍，按经验备好课。", lv: 2 },
        { t: "研究课标与学情，把内容转化成学生能学会的活动。", lv: 3 },
        { t: "在读懂课标与学生的基础上，设计有层次、可探究的学习任务。", lv: 4 }
      ] },
    { id: 3, diff: 1, dims: ["D3"],
      scene: "第一次正式站上讲台，你当下最关注的是——",
      opts: [
        { t: "别讲错、别冷场，把自己这关先过。", lv: 1 },
        { t: "把流程顺下来，按时完成教学任务。", lv: 2 },
        { t: "学生听没听懂、有没有跟上我的节奏。", lv: 3 },
        { t: "学生有没有真正参与、有没有在思考。", lv: 4 }
      ] },
    { id: 4, diff: 1, dims: ["D2"],
      scene: "班里学生基础参差不齐，你备课时会——",
      opts: [
        { t: "按中等水平讲，跟不上的课后自己补。", lv: 1 },
        { t: "凭感觉兼顾一下好中差。", lv: 2 },
        { t: "设计分层目标与任务，让不同学生都有所得。", lv: 3 },
        { t: "建立学情档案，长期跟踪差异并动态调整教学。", lv: 4 }
      ] },

    /* —— 中 —— */
    { id: 5, diff: 2, dims: ["D3", "D1"],
      scene: "你精心设计的一个提问，举起来的手却寥寥无几。你会——",
      opts: [
        { t: "直接点名，逼着不举手的人回答。", lv: 1 },
        { t: "自问自答把答案说出来，继续往下讲。", lv: 2 },
        { t: "换一种更贴近生活的问法，给思考时间再小组讨论。", lv: 3 },
        { t: "反思问题本身，降低门槛、搭好台阶，让更多人敢说。", lv: 4 }
      ] },
    { id: 6, diff: 2, dims: ["D2", "D3"],
      scene: "一位老教师随堂听了你的课，课后指出好几处问题。你会——",
      opts: [
        { t: "心里不舒服，觉得他是挑刺。", lv: 1 },
        { t: "礼貌听完，该怎样还怎样。", lv: 2 },
        { t: "认真记下建议，挑能改的先改。", lv: 3 },
        { t: "把意见当作成长资源，主动约老教师再磨一节、对标改进。", lv: 4 }
      ] },
    { id: 7, diff: 2, dims: ["D3"],
      scene: "两个学生在你课上小声说话、影响到旁边同学。你会——",
      opts: [
        { t: "当众点名批评，杀一儆百。", lv: 1 },
        { t: "走过去敲敲桌子提醒一下。", lv: 2 },
        { t: "用眼神或走近的方式无声提醒，课后单独聊。", lv: 3 },
        { t: "不动声色地把互动机会给他们，把注意力拉回课堂。", lv: 4 }
      ] },
    { id: 8, diff: 2, dims: ["D1"], reverse: true,
      scene: "一位家长在微信上客气地提了个不太合理的要求（想让你多照顾自家孩子）。你的第一反应应该是——",
      opts: [
        { t: "当场答应「没问题」，免得家长不高兴。", lv: 1, trap: true },
        { t: "先倾听、表示理解，再温和说明原则与能做到的边界。", lv: 4 },
        { t: "客气地敷衍过去，不置可否。", lv: 2 },
        { t: "直接说「这不符合规定」，把家长怼回去。", lv: 1 }
      ] },
    { id: 9, diff: 2, dims: ["D3"], reverse: true,
      scene: "公开课在即，你发现自己课件里有个知识性小错误。此刻最妥当的做法是——",
      opts: [
        { t: "将错就错，反正学生也难发现。", lv: 1, trap: true },
        { t: "立刻核实、改正，并向学生坦诚「老师也要严谨」。", lv: 4 },
        { t: "临时口头圆一下，不改课件。", lv: 2 },
        { t: "假装那是故意设的「陷阱题」来掩饰。", lv: 1 }
      ] },
    { id: 10, diff: 2, dims: ["D1"],
      scene: "你注意到班里一名留守儿童总独来独往、不太合群。你会——",
      opts: [
        { t: "只要不影响纪律，随他去。", lv: 1 },
        { t: "偶尔提醒他多和同学玩。", lv: 2 },
        { t: "主动关心、安排热心同学带他，创造融入机会。", lv: 3 },
        { t: "持续关注他的心理与需求，联动家长与导师做长期陪伴。", lv: 4 }
      ] },

    /* —— 难 —— */
    { id: 11, diff: 3, dims: ["D3"],
      scene: "期中成绩出来，你教的班排名靠后。你会——",
      opts: [
        { t: "把责任推给学生基础差、家长不重视。", lv: 1 },
        { t: "多布置练习、占点时间补课。", lv: 2 },
        { t: "分析数据找薄弱点，调整下阶段教学策略。", lv: 3 },
        { t: "从教与学两端复盘，建立「诊断—改进」闭环并跟踪见效。", lv: 4 }
      ] },
    { id: 12, diff: 3, dims: ["D2"],
      scene: "新课标强调核心素养，落实到你的课堂，你倾向于——",
      opts: [
        { t: "在教案里写几个素养词应付检查。", lv: 1 },
        { t: "按旧教法讲，结尾提一句「培养素养」。", lv: 2 },
        { t: "在关键处设计真实情境与问题解决活动。", lv: 3 },
        { t: "围绕大概念重构单元，让素养在真实任务中自然生长。", lv: 4 }
      ] },
    { id: 13, diff: 3, dims: ["D1", "D3"],
      scene: "你和一位经验丰富的老教师教育理念有冲突。你会——",
      opts: [
        { t: "坚持己见，私下不服。", lv: 1 },
        { t: "表面上听，实际各干各的。", lv: 2 },
        { t: "尊重差异，找机会就具体问题交流各自的道理。", lv: 3 },
        { t: "以学生学习效果为标尺，与老教师共建、互相取长补短。", lv: 4 }
      ] },
    { id: 14, diff: 3, dims: ["D3"],
      scene: "学校让你这位新人牵头一项跨学科主题学习。你会——",
      opts: [
        { t: "怕出错，推掉或只挂名。", lv: 1 },
        { t: "按通知凑几个活动交差。", lv: 2 },
        { t: "主动联合相关学科老师，做出一个能落地的方案。", lv: 3 },
        { t: "以真实问题统领，组建教师小团队，把项目做成样本。", lv: 4 }
      ] },
    { id: 15, diff: 3, dims: ["D2", "D1"],
      scene: "入职初期的挫败感一阵阵袭来，你更可能会——",
      opts: [
        { t: "怀疑自己不适合当老师，想放弃。", lv: 1 },
        { t: "硬扛着，不跟人说起。", lv: 2 },
        { t: "找师傅或同伴聊聊，把困惑摊开来看。", lv: 3 },
        { t: "把挫败当成长信号，建自己的反思日志、系统补短板。", lv: 4 }
      ] },
    { id: 16, diff: 3, dims: ["D2"],
      scene: "你希望三年后自己在专业上达到的状态是——",
      opts: [
        { t: "把课顺顺当当讲完、不出乱子就行。", lv: 1 },
        { t: "积累几套好用的教学套路。", lv: 2 },
        { t: "形成自己的教学风格，带出像样的成绩。", lv: 3 },
        { t: "成为能研究、能示范、能带动同伴的骨干力量。", lv: 4 }
      ] }
  ];

  var TARGET = 12;
  var SEEN_KEY = "newteacher_test_seen_v1";

  var ADVICE_BY_DIM = {
    D1: ["把「管纪律」升级为「立关系」：先建立信任，规则才有生命力。",
         "主动、温和地与家长沟通边界，把家校变成同盟而非对立。",
         "对特殊学生多一份看见与陪伴，师德就落在日常的细节里。"],
    D2: ["从「教教材」走向「用课标教」：先读懂标准，再设计学习。",
         "建立学情档案，用分层任务照顾差异，让每个孩子够得着。",
         "把新课标素养要求变成真实情境中的学习任务，而非贴标签。"],
    D3: ["课堂从「我讲完」转向「学生学会」：多用提问与活动拉动参与。",
         "把听课意见当资源，主动约师傅磨课、对标改进。",
         "用「数据诊断—策略调整—跟踪见效」的闭环替代凭感觉。"]
  };

  var LEVELS = [
    { min: 3.25, tier: "四级水平", name: "骨干期", color: "#35C08A",
      desc: "你已显露出骨干教师的潜质——能研究、能示范、能带动同伴，专业发展进入自觉自为的阶段。向「学科带头人」稳步迈进。" },
    { min: 2.50, tier: "三级水平", name: "胜任期", color: "#4DA8F0",
      desc: "你能独立、稳妥地开展教育教学，并开始形成自己的风格。下一步把「经验」提炼成「方法」，向骨干进阶。" },
    { min: 1.75, tier: "二级水平", name: "成长期", color: "#F2B33D",
      desc: "你已度过最难的适应关，能完成常规教学并主动求进。多向师傅借力、多反思复盘，你会快速成长。" },
    { min: 0,    tier: "一级水平", name: "适应期", color: "#EF8A6E",
      desc: "这是每位新教师的必经起点——先把课堂站稳、把学生摸清。对照标准找差距，从一节课、一个学生做起，你会越来越从容。" }
  ];

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

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

    var ids = all.map(function (q) { return q.id; });
    var newSeen = seen.concat(ids);
    var cap = BANK.length - reverseItems.length;
    if (newSeen.length > cap) newSeen = newSeen.slice(newSeen.length - cap);
    try { localStorage.setItem(SEEN_KEY, JSON.stringify(newSeen)); } catch (e) {}

    all.sort(function (a, b) { return a.diff - b.diff; });

    return all.map(function (q) {
      return {
        dims: q.dims, reverse: !!q.reverse, scene: q.scene,
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

  function showResult() {
    var dimSum = {}, dimCnt = {};
    DIMS.forEach(function (d) { dimSum[d.key] = 0; dimCnt[d.key] = 0; });
    var total = 0, count = 0, trapHits = 0, lvSeq = [];
    for (var i = 0; i < QUESTIONS.length; i++) {
      if (answers[i] !== null) {
        var opt = QUESTIONS[i].opts[answers[i]];
        QUESTIONS[i].dims.forEach(function (d) { dimSum[d] += opt.lv; dimCnt[d]++; });
        total += opt.lv; count++;
        lvSeq.push(opt.lv);
        if (QUESTIONS[i].reverse && opt.trap) trapHits++;
      }
    }
    var overall = count ? total / count : 0;
    var pct = Math.round(overall / 4 * 100);
    var band = LEVELS.find(function (l) { return overall >= l.min; });

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
      '<h2>你的新教师专业发展水平</h2>' +
      '<span class="level-tag" style="background:' + band.color + '">' + band.tier + ' · ' + band.name + '</span>' +
      '<p class="desc">' + band.desc + '</p>' +
      '<div class="dim-breakdown"><h4>📐 三维度诊断（1→4 级）</h4>' + breakdownHtml + '</div>' +
      '<div class="advice"><h4>💡 对照标准找差距 · 优先提升</h4>' + adviceHtml + '</div>' +
      '<p class="std-note">诊断依据：《小学 / 中学教师专业标准（试行）》（教育部，2012）三维度框架 · 本次通过 ' + QUESTIONS.length + ' 个真实情境反推你的专业发展水平，重测将换一批场景。</p>' +
      '<div style="margin-top:20px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
        '<button class="btn btn-primary" id="retryBtn">换一批重测</button>' +
        '<a class="btn btn-ghost" href="resources.html">去新教师资源提升 →</a>' +
      '</div>';
    document.getElementById("retryBtn").addEventListener("click", function () {
      QUESTIONS = pickQuestions();
      idx = 0; answers = new Array(QUESTIONS.length).fill(null);
      resultArea.classList.add("hidden"); questionArea.classList.remove("hidden");
      renderQ(); window.scrollTo({ top: 0, behavior: "smooth" });
    });
    try { if (window.SiteTrack) window.SiteTrack.recordTest("新教师测评", { score: overall.toFixed(1), level: band.name }); } catch (e) {}
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  renderQ();
})();
