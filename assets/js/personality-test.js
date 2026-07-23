/* 性格测试 —— DISC 四动物模型：老虎 / 孔雀 / 考拉 / 猫头鹰
   进入后先选择身份：班主任 或 校长；两者题库不同、类型解读也各自贴合角色。
   情境化：每题描述一个真实工作场景，四个选项是不同的「做法」，
   只需选出「最像自己会做的」，由做法客观反映性格倾向。
   每套题库随机抽 12 题（localStorage 各自防重复，保证每次不太一样）。 */
(function () {
  /* ============================================================
     一、班主任版 类型解读
     ============================================================ */
  var TYPES_TEACHER = {
    tiger: { emoji: "🐯", code: "老虎型", name: "老虎型 · 支配果决", color: "#FF6B35",
      trait: "目标导向 · 果断掌控 · 雷厉风行",
      desc: "你有魄力、讲原则、执行力强，班级在你手中秩序井然、方向清晰。学生敬你、服你。你的挑战在于——在威严之下，让学生也感受到看得见的温柔与理解。",
      strength: ["决断力强，关键时刻镇得住场面", "目标明确，带班很有方向感", "规则落地快，班级执行力高"],
      tip: ["刻意增加一对一的暖心交流", "多用鼓励代替命令，给学生表达空间", "借助心理疏导方法软化沟通语气"],
      comm: {
        style: "你的沟通直接、简洁、目标导向——说话有力、节奏快，喜欢开门见山、就事论事，不绕弯子。这让你高效可靠，但语气偏硬时容易让人感到压力。",
        points: [
          "对学生：指令清晰、边界明确，学生知道底线在哪；但要放慢语速、多肯定进步，避免让孩子感到被压迫。",
          "对家长：务实高效、能快速给方案；建议「先共情、再讲要求」，别让家长觉得过于强势。",
          "对同事：果断推进、勇于担当；记得多倾听不同意见，把「你应该」换成「我们一起」。"
        ],
        watch: "刻意练习「先听后说」，多用商量的语气，你的力量会更有温度。"
      } },
    peacock: { emoji: "🦚", code: "孔雀型", name: "孔雀型 · 热情感染", color: "#2AB0A6",
      trait: "外向表达 · 富感染力 · 活跃气氛",
      desc: "你热情、有趣、感染力强，班会和活动总能被你点燃，学生喜欢围着你转。你的挑战在于——让热闹落到实处，把好点子沉淀成持续的机制与坚持。",
      strength: ["善于激励、调动学生情绪与参与", "亲和健谈，能快速拉近距离", "班级氛围活跃、有创造力"],
      tip: ["把热闹的活动转化为可持续的常规", "多倾听、少独白，认真听学生诉求", "关注细节落实，兑现每一个承诺"],
      comm: {
        style: "你的沟通生动热情、绘声绘色，善用故事、鼓励和幽默，表情丰富、气场很足，能迅速活跃气氛、感染他人。要留意的是别只顾表达而忽略倾听。",
        points: [
          "对学生：善于激励和带动情绪，课堂很有魅力；注意把「说得热闹」落到「做得扎实」，多给安静的孩子发言机会。",
          "对家长：亲和、正能量足、容易建立好感；注意抓重点、别话太多，也要认真听家长的真实诉求。",
          "对同事：乐于分享、带动团队氛围；注意跟进细节、说到做到，避免只停留在「点子」。"
        ],
        watch: "多留白给别人说话，把热情用在「持续跟进」上，感染力才会真正开花结果。"
      } },
    koala: { emoji: "🐨", code: "考拉型", name: "考拉型 · 温和稳健", color: "#6BB6E0",
      trait: "温和耐心 · 包容和谐 · 值得信赖",
      desc: "你温柔、有耐心、包容力强，是很好的倾听者，孩子们愿意跟你说心里话，班级和睦有安全感。你的挑战在于——温柔也要有边界，别一味迁就而让自己心累。",
      strength: ["亲和力强，师生关系融洽", "耐心倾听，敏锐察觉情绪变化", "稳定可靠，家长信任度高"],
      tip: ["温柔而坚定地守住规则底线", "主动表达自己的立场，别总是迁就", "建立自主管理机制，学会适当放手"],
      comm: {
        style: "你的沟通柔和委婉、不急不躁，让人感到安全、被接纳，是天然的「倾听型」沟通者。要留意的是有时过于照顾对方感受，反而不敢明确表达自己的立场。",
        points: [
          "对学生：包容有耐心，学生愿意吐露心声；注意「温柔要有边界」，该坚持原则时也要敢于说「不」。",
          "对家长：真诚、稳定、可信；建议更主动地沟通反馈，及时表达你的判断和界限。",
          "对同事：配合度高、和谐好相处；注意适时说出真实想法，别一味退让委屈自己。"
        ],
        watch: "练习「温柔而坚定」——把体贴和原则结合起来，你的稳重会更有分量。"
      } },
    owl: { emoji: "🦉", code: "猫头鹰型", name: "猫头鹰型 · 严谨理性", color: "#9B5CD8",
      trait: "条理清晰 · 注重细节 · 追求严谨",
      desc: "你严谨、理性、逻辑清晰，凡事讲证据、重规则，班级被你管理得井井有条、公平规范。你的挑战在于——在理性和规则之外，多给学生一点情感回应与鼓励。",
      strength: ["条理分明、处理问题有章法", "注重细节，规则清晰公平", "冷静客观，分析判断能力强"],
      tip: ["在理性之外多一点情绪的回应", "允许不完美，接纳不同的风格", "把成熟方法沉淀成可复制的案例"],
      comm: {
        style: "你的沟通准确严谨、有理有据，喜欢摆事实、讲逻辑、重细节，说话有条理、可信度高。要留意的是别太「公事公办」，让理性显得有些冷。",
        points: [
          "对学生：讲道理、有章法，规则清晰公平；注意在「讲清道理」之外，多一点共情、肯定和情感回应。",
          "对家长：分析到位、建议具体、专业感强；注意别只谈问题和数据，也带上一点温度与鼓励。",
          "对同事：细致可靠、把关严格；注意别过度追求完美与挑错，多欣赏他人的不同做法。"
        ],
        watch: "在「对不对」之外多想想「暖不暖」——理性配上共情，你的专业会更打动人。"
      } }
  };

  /* 班主任情境题库（每题四选项分别对应 tiger/peacock/koala/owl，顺序会被打乱） */
  var BANK_TEACHER = [
    { scene: "课间两个学生扭打起来，你赶到现场，第一时间你会——",
      opts: [ ["一声令下把两人分开，当场立规矩：先停手，谁先动手谁担责", "tiger"], ["大声招呼围观同学散开，用一句话稳住场面、压下火气", "peacock"], ["分别把两人拉到一旁先安抚，等平静下来再慢慢问", "koala"], ["先问清前因后果、旁边同学怎么说，再判断怎么处理", "owl"] ] },
    { scene: "班里最近迟到的人越来越多，你决定——",
      opts: [ ["立刻定下新规矩：迟到怎么处理，说到做到", "tiger"], ["搞个全勤评比，用荣誉和激励带动大家早到", "peacock"], ["找几个常迟到的孩子聊聊，看看是不是家里有难处", "koala"], ["先统计谁常迟到、迟到时间和原因，再分类想对策", "owl"] ] },
    { scene: "一位家长在班级群里公开质疑你的某个做法，你会——",
      opts: [ ["直接、简明地把你的理由和依据讲清楚，稳住局面", "tiger"], ["先肯定家长的关心，用轻松语气缓和，再私下细聊", "peacock"], ["私信家长表示理解，耐心听完他的想法再回应", "koala"], ["把具体情况和事实摆出来，条理清晰地解释来龙去脉", "owl"] ] },
    { scene: "一个原本不错的学生成绩突然下滑，你找他谈话，更可能——",
      opts: [ ["直接指出问题，和他约定接下来的目标和要求", "tiger"], ["先鼓励他「你底子好」，聊聊状态、帮他找回信心", "peacock"], ["温和地问问他最近是不是遇到什么事，先关心人", "koala"], ["和他一起分析每科的失分点，找出具体原因", "owl"] ] },
    { scene: "班级卫生连续几周被扣分，你会——",
      opts: [ ["重新分工到人，明确责任，谁的区域出问题谁负责", "tiger"], ["发起「最美教室」挑战，用评比和表扬激发大家", "peacock"], ["亲自带着值日生一起打扫，边做边引导", "koala"], ["排查是哪个环节没做好，重新设计值日流程和检查表", "owl"] ] },
    { scene: "要组织一次班会，你最先想到的是——",
      opts: [ ["定好主题和目标，安排下去、高效推进", "tiger"], ["设计有趣的互动环节，让全班都热闹起来", "peacock"], ["选一个能让大家敞开心扉、彼此靠近的话题", "koala"], ["列好流程和时间表，每个环节都安排妥当", "owl"] ] },
    { scene: "班里两个好朋友闹矛盾冷战了，你会——",
      opts: [ ["把两人叫到一起，把话挑明，督促他们把问题解决", "tiger"], ["找个轻松场合用幽默缓和气氛，撮合他们和好", "peacock"], ["分别陪两人聊聊，耐心听他们各自的委屈", "koala"], ["先弄清矛盾的起因和经过，再分别引导", "owl"] ] },
    { scene: "上课时你发现一个学生在偷玩手机，你会——",
      opts: [ ["当场收走，课后按班规处理", "tiger"], ["用一句幽默提醒他，不点破也让他收起来", "peacock"], ["先不声张，课后单独找他了解情况", "koala"], ["先记下来，课后弄清他为什么带手机、玩什么再处理", "owl"] ] },
    { scene: "期中考试后要开家长会，你的重点会放在——",
      opts: [ ["直接讲清成绩、问题和对家长的具体要求", "tiger"], ["营造积极氛围，多讲孩子的闪光点、鼓励家长", "peacock"], ["多和家长交流感受，营造温暖信任的氛围", "koala"], ["用数据分析班级和每个孩子的情况，给出具体建议", "owl"] ] },
    { scene: "你察觉班里有学生早恋，你会——",
      opts: [ ["找当事人谈，明确界限和你的态度", "tiger"], ["用过来人的轻松方式聊聊，正面引导", "peacock"], ["温和关心、不批评，慢慢引导他把心思放回学习", "koala"], ["先观察确认再了解具体情况，谨慎稳妥地处理", "owl"] ] },
    { scene: "班级要选班委，你倾向于——",
      opts: [ ["定好岗位职责和标准，择优选出能干的", "tiger"], ["鼓励大家上台竞选，搞得热闹又有仪式感", "peacock"], ["尽量照顾更多同学的意愿，让大家都有参与感", "koala"], ["制定明确的选举流程和评分标准，力求公平公正", "owl"] ] },
    { scene: "学校临时下达一个任务，只有一天时间，你会——",
      opts: [ ["马上拍板分工，盯紧进度，先把事办成", "tiger"], ["招呼骨干一起动员，用热情把大家带起来", "peacock"], ["先稳住大家情绪，和配合的同事一起慢慢推进", "koala"], ["快速理清任务要点，排出步骤和时间，按计划执行", "owl"] ] },
    { scene: "班上有个很内向的学生几乎从不发言，你会——",
      opts: [ ["直接点他回答简单问题，推他一把", "tiger"], ["制造机会公开表扬他，用鼓励让他自信起来", "peacock"], ["私下多和他聊天，耐心等他慢慢打开", "koala"], ["先观察他擅长什么，创造适合他的表现场景", "owl"] ] },
    { scene: "一个学生没交作业，还撒谎说交了，你会——",
      opts: [ ["当面点破，明确要求补交并说明后果", "tiger"], ["用不伤人的方式点他一下，给他改正的台阶", "peacock"], ["私下问清缘由，先理解他为什么撒谎", "koala"], ["核实情况后分析他撒谎的原因，再对症处理", "owl"] ] },
    { scene: "班级要参加合唱比赛，作为班主任你会——",
      opts: [ ["把目标定成拿名次，抓紧训练、严格要求", "tiger"], ["亲自带头喊口号，把大家的热情和斗志点起来", "peacock"], ["更看重一起参与的过程和感情，不太在意名次", "koala"], ["排好训练计划和分工，细化到每次练习的安排", "owl"] ] },
    { scene: "一个学生突然在教室里情绪崩溃大哭，你会——",
      opts: [ ["先把场面控制住，带他离开教室冷静一下", "tiger"], ["用温暖的话安抚，让周围同学别围观起哄", "peacock"], ["蹲下来陪着他，先不急着问，让他先哭出来", "koala"], ["冷静判断是突发还是长期问题，再决定怎么介入", "owl"] ] },
    { scene: "制定班规时，你的做法更接近——",
      opts: [ ["由你来定核心规则，清晰、有威慑力", "tiger"], ["带着大家一起讨论，让制定过程也很有参与感", "peacock"], ["多听学生意见，规则尽量温和、能被接受", "koala"], ["逐条细化、考虑各种情况，力求严谨全面", "owl"] ] },
    { scene: "一位家长私信你，说孩子在家完全不听话、向你求助，你会——",
      opts: [ ["直接给几条明确、可执行的建议", "tiger"], ["先宽慰家长、给他打打气，再一起想办法", "peacock"], ["耐心听家长倒苦水，先给足情感支持", "koala"], ["详细了解在家的具体情形，再分析给出针对性方案", "owl"] ] },
    { scene: "你发现班里有小团体，在孤立某个同学，你会——",
      opts: [ ["严肃处理，明确表态绝不允许排挤同学", "tiger"], ["通过集体活动重新凝聚班级，淡化小团体", "peacock"], ["私下多关心被孤立的孩子，给他温暖和支持", "koala"], ["先摸清人际关系的来龙去脉，再有针对性地介入", "owl"] ] },
    { scene: "一个学生当众顶撞你，你会——",
      opts: [ ["当场稳住气场、明确底线，课后再处理", "tiger"], ["用幽默化解尴尬，不激化，给彼此台阶", "peacock"], ["先克制情绪，课后单独找他心平气和地谈", "koala"], ["冷静不动怒，先了解他顶撞背后的原因", "owl"] ] },
    { scene: "一次大考班级排名靠后，面对全班你会——",
      opts: [ ["直面差距，提出明确目标，带大家奋起直追", "tiger"], ["先鼓劲打气，用正能量重新点燃大家的信心", "peacock"], ["安慰大家别气馁，肯定努力，慢慢调整", "koala"], ["客观分析失分原因，拿出具体的改进计划", "owl"] ] },
    { scene: "一个学生频繁请假，你会——",
      opts: [ ["明确请假规矩，严格把关", "tiger"], ["关心地问问情况，顺便鼓励他别落下功课", "peacock"], ["体谅他的难处，耐心了解背后的原因", "koala"], ["记录请假次数和缘由，分析是否有规律再处理", "owl"] ] },
    { scene: "布置教室文化墙，你会——",
      opts: [ ["定好主题和标准，交给能干的同学快速搞定", "tiger"], ["发动全班一起创意设计，弄得热闹又亮眼", "peacock"], ["让每个孩子都留下一份作品，重在参与", "koala"], ["规划好版块、尺寸和内容，整齐规范地布置", "owl"] ] },
    { scene: "同一个错误，一个学生已经犯到第三次了，你会——",
      opts: [ ["加重处理，让他清楚地记住后果", "tiger"], ["换个方式激励他，帮他找回改正的动力", "peacock"], ["耐心再谈一次，相信他能慢慢改过来", "koala"], ["分析他反复犯错的深层原因，从根上解决", "owl"] ] }
  ];

  /* ============================================================
     二、校长版 类型解读（同为 DISC 四型，解读贴合治校情境）
     ============================================================ */
  var TYPES_PRINCIPAL = {
    tiger: { emoji: "🐯", code: "老虎型", name: "老虎型 · 决断掌舵", color: "#FF6B35",
      trait: "目标坚定 · 敢于拍板 · 强力推进",
      desc: "你有魄力、有担当，敢定方向、敢啃硬骨头，学校在你手中令行禁止、推进有力。你的挑战在于——在强势推进之外，多倾听教师声音，让改革既有力度也有温度。",
      strength: ["决断力强，重大关头稳得住、拍得了板", "目标清晰，能把学校带出明确方向", "执行强势，政策与改革落地快"],
      tip: ["多用共识凝聚代替单向下达", "给中层和教师更多授权与试错空间", "关键决策前多听一线与家长的真实声音"],
      comm: {
        style: "你的沟通直接有力、目标导向，开会不绕弯、要求明确、节奏快。这让学校高效有力，但语气偏硬时容易让教师有压力、不敢表达。",
        points: [
          "对教师：方向明确、要求清晰，队伍知道往哪走；注意多肯定、多授权，把「你们要」换成「我们一起」。",
          "对家长与社区：务实高效、敢于表态、能快速回应；建议先共情再讲原则，避免显得过于强硬。",
          "对上级与同行：执行到位、敢担责；记得争取资源时也讲方法，多做横向沟通与借力。"
        ],
        watch: "练习「先听后决」，把强推变成共识，你的领导力会更有凝聚力。"
      } },
    peacock: { emoji: "🦚", code: "孔雀型", name: "孔雀型 · 感召引领", color: "#2AB0A6",
      trait: "愿景感召 · 善于激励 · 凝聚人心",
      desc: "你有激情、会讲愿景、感染力强，能把教师的干劲和学校的氛围点燃，对外也很会塑造学校形象。你的挑战在于——让愿景落到制度和细节，把热度沉淀为长效机制。",
      strength: ["善于描绘愿景、激励团队士气", "对外亲和、长于形象塑造与关系经营", "推动文化与氛围建设很有一套"],
      tip: ["把愿景转化为可落地的制度与流程", "多倾听、少独讲，重视执行细节", "兑现每一个对教师和家长的承诺"],
      comm: {
        style: "你的沟通热情生动、鼓舞人心，善用愿景、故事和表扬调动情绪，气场足、场面 hold 得住。要留意别只顾表达而忽略倾听和落实。",
        points: [
          "对教师：能点燃热情、凝聚认同；注意把「说得振奋」落到「做得扎实」，多给沉默的骨干发声机会。",
          "对家长与社区：亲和、正能量、善于经营关系；注意抓重点、听诉求，别只报喜。",
          "对上级与同行：善于展示学校亮点、争取支持；注意跟进细节、说到做到，别停在口号。"
        ],
        watch: "把感染力用在「持续跟进」上，愿景配上机制，才能真正开花结果。"
      } },
    koala: { emoji: "🐨", code: "考拉型", name: "考拉型 · 稳健护航", color: "#6BB6E0",
      trait: "温和包容 · 稳定可靠 · 善聚人和",
      desc: "你温和、有耐心、包容力强，重视教师感受与团队和谐，是让人安心的「定海神针」，队伍稳定、人心不散。你的挑战在于——稳健之外也要敢于变革，别因求稳而错失时机。",
      strength: ["亲和稳重，教师有归属感、队伍稳定", "长于协调关系、化解矛盾、营造和谐", "值得信赖，是团队的稳定器"],
      tip: ["在稳健中主动求变，敢于推动必要改革", "温和之上守住原则与底线，敢于问责", "该拍板时果断，不因怕冲突而拖延"],
      comm: {
        style: "你的沟通柔和真诚、不急不躁，让教师感到被尊重、被接纳，是天然的「倾听型」领导。要留意的是有时太照顾情面，不敢明确表态。",
        points: [
          "对教师：包容耐心、善于倾听，队伍愿意跟你说真话；注意「温和要有边界」，该坚持与问责时也要敢于表态。",
          "对家长与社区：真诚稳定、可信赖；建议更主动地沟通与反馈，及时表达学校的判断与立场。",
          "对上级与同行：配合度高、和谐好协作；注意适时说出真实想法，别一味退让。"
        ],
        watch: "练习「温和而坚定」——把体恤和魄力结合，你的稳重会更有分量。"
      } },
    owl: { emoji: "🦉", code: "猫头鹰型", name: "猫头鹰型 · 精治善谋", color: "#9B5CD8",
      trait: "系统思考 · 精细规范 · 依规而治",
      desc: "你严谨、理性、重规则重数据，善于制度设计与流程规范，把学校治理得井井有条、公平透明。你的挑战在于——在制度和数据之外，多一点人情温度与灵活弹性。",
      strength: ["系统规划、制度设计能力强", "依规依数据决策，公平规范、经得起检验", "冷静客观，善于把控风险与细节"],
      tip: ["在规范之外多给教师情感回应与激励", "允许弹性与不完美，避免管得过死", "把成熟治理经验沉淀为可复制的机制"],
      comm: {
        style: "你的沟通严谨有据、条理清晰，喜欢摆事实、讲流程、重细节，专业感强、可信度高。要留意别太「公事公办」，让理性显得有些冷。",
        points: [
          "对教师：讲规则、有章法，管理公平透明；注意在「讲清制度」之外多一点共情、肯定与关怀。",
          "对家长与社区：分析到位、方案专业；注意别只谈数据与规定，也带上温度与诚意。",
          "对上级与同行：严谨可靠、把关到位；注意别过度追求完美与挑错，多欣赏他人的不同做法。"
        ],
        watch: "在「规不规范」之外多想想「暖不暖人心」——制度配上温度，治理会更有人愿意跟随。"
      } }
  };

  /* ============================================================
     二、新教师版 类型解读（同为 DISC 四型，解读贴合新入职教师的成长情境）
     ============================================================ */
  var TYPES_NEWTEACHER = {
    tiger: { emoji: "🐯", code: "老虎型", name: "老虎型 · 敢闯敢拼", color: "#FF6B35",
      trait: "有冲劲 · 敢管敢试 · 执行力强",
      desc: "你年轻有魄力、敢管敢做，遇事不怵、上手快，是领导眼里「能扛事的新人」。你的挑战在于——经验还在积累，别急于求成，多听听师父和老教师的建议，把冲劲用在刀刃上。",
      strength: ["敢管敢试，班级/课堂很快立住", "执行力强，交办的任务落地快", "有主见、不怯场，成长速度快"],
      tip: ["遇事先问师父和老教师，少走弯路", "把「快」和「稳」结合起来，别操之过急", "多复盘每节课、每次处理，沉淀成经验"],
      comm: {
        style: "你的沟通直接、有底气、说干就干，新人里很有存在感。要留意的是——年轻气盛时容易让人觉得「太冲」，多给同事和家长一点缓冲。",
        points: [
          "对学生：有边界、有威信，学生不敢造次；注意把「威」和「亲和」结合，别让孩子觉得你只是凶。",
          "对家长：专业有底气、能拿结果说话；建议多共情、少用「你应该」，让家长感到被尊重。",
          "对师父/同事：敢表达、有主见是好事；记得多请教、少硬杠，把冲劲变成大家愿意帮你的好感。"
        ],
        watch: "年轻是你的优势，虚心是你最大的加速度——先学后闯，冲劲会更稳、更久。"
      } },
    peacock: { emoji: "🦚", code: "孔雀型", name: "孔雀型 · 热情亲和", color: "#2AB0A6",
      trait: "热情活泼 · 善拉近关系 · 有感染力",
      desc: "你热情、有趣、和学生打成一片，课堂气氛活跃，孩子喜欢你、愿意靠近你。你的挑战在于——人气之外要把课堂规矩和教学底气立起来，让「受欢迎」真正变成「带得稳」。",
      strength: ["亲和力强，很快和学生建立好关系", "课堂生动、气氛好，学生爱听你的课", "善于表达、乐于分享，融入集体快"],
      tip: ["在亲和力之上建立清晰的教学与班规底线", "把热闹的课堂转化成扎实的常态", "多向严谨型同事取经，补强条理与规范"],
      comm: {
        style: "你的沟通生动热情、绘声绘色，新人里最会「热场」，容易和谁都聊得来。要留意的是别只顾表达，也要学会倾听和沉下来。",
        points: [
          "对学生：有趣有活力，师生关系好；注意「好玩」之外也要有要求，避免课堂失序。",
          "对家长：亲切正能量，好感度高；注意抓重点、别话太多，也要认真听家长的真实诉求。",
          "对师父/同事：活跃气氛、乐于配合；注意说到做到、跟进细节，别只停在「点子」和「热闹」。"
        ],
        watch: "把热情用在「持续跟进」和「立规矩」上，人气会沉淀成真正的威信。"
      } },
    koala: { emoji: "🐨", code: "考拉型", name: "考拉型 · 虚心温和", color: "#6BB6E0",
      trait: "温和耐心 · 虚心好学 · 值得信赖",
      desc: "你温柔、虚心、有耐心，愿意听、愿意学，是学生和同事眼里的「好脾气新人」，师生关系舒服、团队好相处。你的挑战在于——温柔也要有边界，该管要敢管、该说要敢说，别因怕冲突而委屈自己或耽误学生。",
      strength: ["虚心好学，进步稳、同事愿意带", "耐心亲和，学生愿意对你说心里话", "稳定靠谱，团队里让人安心"],
      tip: ["温柔而坚定地守住课堂与班规底线", "敢于表达自己的想法，别总迁就", "学会合理拒绝，保护自己的精力与时间"],
      comm: {
        style: "你的沟通柔和真诚、不急不躁，让人如沐春风，是天然的「倾听型」新人。要留意的是有时太照顾别人感受，反而不敢明确表达立场。",
        points: [
          "对学生：包容耐心，孩子愿意吐露心声；注意「温柔要有边界」，该严时要敢于说「不」。",
          "对家长：真诚稳定、可信赖；建议更主动反馈，及时表达你的判断和界限。",
          "对师父/同事：配合度高、好相处；注意适时说出真实想法，别一味退让、不敢提需求。"
        ],
        watch: "练习「温柔而坚定」——把体贴和原则结合，你的稳重会更有分量。"
      } },
    owl: { emoji: "🦉", code: "猫头鹰型", name: "猫头鹰型 · 严谨细致", color: "#9B5CD8",
      trait: "认真备课 · 注重细节 · 追求严谨",
      desc: "你严谨、认真、凡事讲准备，教案细致、批改用心，是让人放心的「靠谱新人」。你的挑战在于——新教师本就手生，别因追求完美而过度焦虑、不敢放手，允许自己边做边学、先完成再完美。",
      strength: ["备课扎实、教学规范，出错少", "注重细节，批改与反馈都用心", "冷静理性，善于分析和总结"],
      tip: ["接受「先完成再完美」，别被焦虑拖住", "多与同伴交流，别一个人死磕", "把成熟做法沉淀成可复用的教学模板"],
      comm: {
        style: "你的沟通准确严谨、有条理，凡事有准备、靠谱感强，是新人的「定心丸」。要留意的是别太紧绷、太「公事公办」，让自己显得不好接近。",
        points: [
          "对学生：讲得清楚、要求明确，学生知道标准；注意在严谨之外多一点共情和鼓励，让孩子敢问。",
          "对家长：分析到位、建议具体、专业感强；注意别只谈数据和问题，也带上一点温度与鼓励。",
          "对师父/同事：细致可靠、把关严；注意别过度追求完美与挑错，多欣赏他人、也放过自己。"
        ],
        watch: "在「对不对」之外多想想「暖不暖」——允许不完美，你的专业会更从容、更有感染力。"
      } }
  };

  /* 校长情境题库（四选项分别对应 tiger/peacock/koala/owl，顺序会被打乱） */
  var BANK_PRINCIPAL = [
    { scene: "学校要制定新一轮三年发展规划，启动时你更倾向于——",
      opts: [ ["先定下核心目标和时间节点，再分解落实到人", "tiger"], ["先开动员会讲愿景，把大家的热情和认同调动起来", "peacock"], ["广泛征求教职工意见，尽量凝聚共识再往前走", "koala"], ["先做现状分析和数据调研，再系统地拟定方案", "owl"] ] },
    { scene: "一位骨干教师突然提出辞职，你会——",
      opts: [ ["直接谈，问清诉求，能解决的当场给答复", "tiger"], ["动之以情、讲学校前景，努力挽留、重燃他的干劲", "peacock"], ["耐心倾听他的委屈和难处，先给足理解与关心", "koala"], ["分析他离职的深层原因，评估是否有制度性问题再应对", "owl"] ] },
    { scene: "教代会上，老师们对新的绩效方案意见很大，你会——",
      opts: [ ["稳住场面，说明方案依据，明确执行口径", "tiger"], ["先肯定大家的关心，用轻松方式缓和情绪再沟通", "peacock"], ["认真听取每一条意见，表示会充分考虑大家感受", "koala"], ["把方案的测算和逻辑摆出来，逐条回应质疑", "owl"] ] },
    { scene: "上级临时通知一小时后来校检查，你会——",
      opts: [ ["马上部署分工，盯着关键点，先把该做的落实", "tiger"], ["招呼中层一起动员，把大家的劲头快速带起来", "peacock"], ["先安抚大家别慌，和配合的同事一起从容应对", "koala"], ["迅速理清检查要点，按清单逐项核对准备", "owl"] ] },
    { scene: "两个中层为争夺资源起了明显冲突，你会——",
      opts: [ ["把话挑明，当场定规矩、划边界，谁的职责谁负责", "tiger"], ["找个轻松场合缓和关系，撮合两人重新合作", "peacock"], ["分别谈心，先听两边的委屈，再慢慢调和", "koala"], ["先弄清资源分配的症结，用制度和标准来化解", "owl"] ] },
    { scene: "有家长在校门口拉横幅投诉学校，你第一时间会——",
      opts: [ ["立即到现场表态，稳住局面、明确处理立场", "tiger"], ["先安抚家长情绪，用诚恳沟通把火气降下来", "peacock"], ["请家长到室内坐下，耐心听完诉求、给足尊重", "koala"], ["先弄清事件原委和证据，再依规稳妥处置", "owl"] ] },
    { scene: "要推进一项新课改，部分老教师明显抵触，你会——",
      opts: [ ["明确要求先动起来，用制度和考核推动落地", "tiger"], ["讲清改革意义、树立样板，用榜样激励带动", "peacock"], ["理解他们的顾虑，给时间、给帮扶，慢慢带", "koala"], ["先小范围试点、拿出数据，再有步骤地推广", "owl"] ] },
    { scene: "学校要办一场大型开放日活动，你会——",
      opts: [ ["定好目标和分工，倒排工期、强力推进", "tiger"], ["亲自牵头造氛围，把活动办得亮眼又有影响力", "peacock"], ["重在全员参与、其乐融融，不追求排场", "koala"], ["制定详细方案和应急预案，把每个环节抠到位", "owl"] ] },
    { scene: "一位年轻教师出了教学事故被家长投诉，你会——",
      opts: [ ["明确指出问题、划清底线，要求限期整改", "tiger"], ["先给他打气别慌，帮他一起面对和挽回", "peacock"], ["体谅他是新人，先安抚情绪再耐心指导", "koala"], ["核实事实、分析成因，再决定如何处理与帮扶", "owl"] ] },
    { scene: "财务预算有限，多个部门都来要钱，你会——",
      opts: [ ["按学校重点果断定优先级，钱花在刀刃上", "tiger"], ["和各部门沟通愿景，争取理解、共渡难关", "peacock"], ["尽量兼顾各方，让大家都不太为难", "koala"], ["按项目效益和数据排序，用统一标准来分配", "owl"] ] },
    { scene: "教师队伍整体士气有些低落，你会——",
      opts: [ ["定下振奋人心的目标，带头冲、把劲头提起来", "tiger"], ["搞暖心活动、多表彰，用正能量重新点燃热情", "peacock"], ["多走近教师、嘘寒问暖，先把人心焐热", "koala"], ["调研症结所在，从制度和待遇上系统改善", "owl"] ] },
    { scene: "校园里发生一起学生安全事件，你第一时间会——",
      opts: [ ["立即启动处置、明确分工，先控制局面保安全", "tiger"], ["一边稳住各方情绪，一边协调各方共同应对", "peacock"], ["第一时间关心受影响的师生，给足安抚与陪伴", "koala"], ["冷静核实情况、留存证据，按预案有序处置", "owl"] ] },
    { scene: "要选拔一名新的年级组长，你倾向于——",
      opts: [ ["按岗位标准择优，直接定能扛事的人", "tiger"], ["鼓励竞聘演讲，让过程有活力、有认同感", "peacock"], ["多听年级组老师的意愿，选大家都服气的人", "koala"], ["设定明确的选拔标准和流程，力求公平公正", "owl"] ] },
    { scene: "一项上级政策要求落地，但和校情不太契合，你会——",
      opts: [ ["先坚决执行到位，再在允许范围内灵活调整", "tiger"], ["向师生讲清背景、争取理解，减少落地阻力", "peacock"], ["体谅一线难处，尽量把执行做得柔和一些", "koala"], ["吃透政策精神，结合校情设计可行的落地方案", "owl"] ] },
    { scene: "学校要打造办学特色/品牌，你会——",
      opts: [ ["选定方向、集中发力，强力打造拳头项目", "tiger"], ["讲好学校故事，对内对外一起造势提升影响", "peacock"], ["尊重师生基础，稳扎稳打、水到渠成地培育", "koala"], ["系统调研定位，规划路径分步推进、久久为功", "owl"] ] },
    { scene: "教师之间形成了小圈子、影响协作，你会——",
      opts: [ ["严肃表态，明确以学校大局为重，绝不搞内耗", "tiger"], ["用共同目标和集体活动重新凝聚团队", "peacock"], ["私下多关心相关教师，慢慢化解隔阂", "koala"], ["摸清成因和关系脉络，用机制引导良性协作", "owl"] ] },
    { scene: "一位老教师经验丰富但不愿改变，你会——",
      opts: [ ["明确新要求，请他带头示范、发挥影响力", "tiger"], ["肯定他的价值，用真诚打动他愿意尝试", "peacock"], ["尊重他的习惯，不勉强，慢慢引导", "koala"], ["用数据和案例让他看到改变的实效，再推动", "owl"] ] },
    { scene: "面对社区或媒体对学校的负面舆论，你会——",
      opts: [ ["果断表态、澄清事实，第一时间稳住局面", "tiger"], ["主动沟通、真诚回应，努力扭转外界印象", "peacock"], ["低调稳妥，先做好内部安抚，避免激化", "koala"], ["先核实、评估影响，按预案有理有据地回应", "owl"] ] },
    { scene: "要建立新的教师评价制度，你会——",
      opts: [ ["定下核心指标，明确奖惩、说到做到", "tiger"], ["讲清导向、多做动员，让大家认同这套机制", "peacock"], ["充分听取意见，让评价尽量温和、能被接受", "koala"], ["逐项设计指标和流程，力求科学、公平、可操作", "owl"] ] },
    { scene: "期末教职工大会上，你的总结重点会放在——",
      opts: [ ["直面问题、亮出目标，激励大家来年再上台阶", "tiger"], ["多讲亮点和榜样，营造振奋、感恩的氛围", "peacock"], ["肯定每个人的付出，营造温暖有归属的氛围", "koala"], ["用数据复盘一年得失，给出具体的改进方向", "owl"] ] }
  ];

  /* 新教师情境题库（近三年新入职教师；四选项分别对应 tiger/peacock/koala/owl，顺序会被打乱） */
  var BANK_NEWTEACHER = [
    { scene: "第一次正式站上讲台前，你心里更会——",
      opts: [ ["给自己打气，按准备好的方案大干一场", "tiger"], ["想着怎么用热情和互动拉近和学生的距离", "peacock"], ["有点紧张，告诉自己慢慢来、温柔地讲就好", "koala"], ["反复核对教案，确保每一个环节都不出错", "owl"] ] },
    { scene: "学生没太把你当回事，课堂有点乱，你会——",
      opts: [ ["立刻立规矩、严肃整顿，先把秩序拉回来", "tiger"], ["用有趣的互动重新抓住大家的注意力", "peacock"], ["先软着说、不批评，课后慢慢引导", "koala"], ["分析课堂乱的原因，调整自己的教学设计", "owl"] ] },
    { scene: "有经验的老师当众指出了你的不足，你会——",
      opts: [ ["当场说明自己的思路，坚持觉得对的地方", "tiger"], ["笑着接住，气氛轻松、不尴尬", "peacock"], ["虚心记下，过后认真反思怎么改", "koala"], ["详细记录，查证后系统改进自己的做法", "owl"] ] },
    { scene: "一周的备课量太大、时间明显不够，你会——",
      opts: [ ["抓重点，先把核心课备扎实、上出效果", "tiger"], ["找同事资源共享，轻松一点应对", "peacock"], ["熬熬夜慢慢磨，尽量每节课都备好", "koala"], ["排好计划表，逐课精细准备、不慌不乱", "owl"] ] },
    { scene: "有家长质疑「你太年轻、没经验」，你会——",
      opts: [ ["用专业和底气回应，拿学生进步说话", "tiger"], ["热情沟通，用亲和力慢慢化解顾虑", "peacock"], ["耐心解释，用真心换家长的信任", "koala"], ["用详细计划和具体案例证明自己靠谱", "owl"] ] },
    { scene: "师父（带教老师）给了你很直接的改进意见，你会——",
      opts: [ ["有选择地采纳，保留自己觉得好的风格", "tiger"], ["感谢并乐观接受，气氛轻松愉快", "peacock"], ["全盘虚心接受，怕得罪师父不敢多说", "koala"], ["逐条分析，形成一份自己的改进清单", "owl"] ] },
    { scene: "学校要你上一节汇报课 / 公开课，你更会——",
      opts: [ ["定个高目标，冲出几个亮点", "tiger"], ["设计得生动出彩，好好展示自己的风采", "peacock"], ["求稳妥就好，别出岔子就行", "koala"], ["反复打磨每个环节，追求尽善尽美", "owl"] ] },
    { scene: "班里有个「刺头」学生总爱挑衅你，你会——",
      opts: [ ["当场立威，严肃震慑、让他服气", "tiger"], ["用幽默和关注化解对立，慢慢走近他", "peacock"], ["温柔感化，用耐心慢慢走进他心里", "koala"], ["先摸清他挑衅的原因，再制定个案方案", "owl"] ] },
    { scene: "批改作业量太大、几乎占满所有时间，你会——",
      opts: [ ["抓关键、高效批改，重点抓典型问题", "tiger"], ["写点有趣的批语，和学生顺便互动", "peacock"], ["每本都认真写评语，慢慢来不敷衍", "koala"], ["建好批改标准模板，分类做精细反馈", "owl"] ] },
    { scene: "教研组里你最年轻、不太敢说话，你会——",
      opts: [ ["主动发言，大胆提出自己的想法", "tiger"], ["活跃气氛、积极融入，和大家处好", "peacock"], ["安静听着，怕说错话不敢开口", "koala"], ["先扎实准备，用专业见解再开口", "owl"] ] },
    { scene: "你被临时安排组织一次校园活动，你会——",
      opts: [ ["马上拍板分工，强力推进办成", "tiger"], ["搞得热闹、有仪式感，大家开心", "peacock"], ["慢慢来，重在人人参与、不重排场", "koala"], ["列出详细方案和流程，把细节抠到位", "owl"] ] },
    { scene: "你带的学生成绩不太理想，你会——",
      opts: [ ["定目标、加练习，对学生严格要求", "tiger"], ["多鼓励打气，先调动起学习兴趣", "peacock"], ["耐心辅导，多关心每个落后的孩子", "koala"], ["分析失分点，系统地帮他们补弱", "owl"] ] },
    { scene: "上课时有学生睡觉 / 走神，你会——",
      opts: [ ["直接点名提醒，严肃要求坐好", "tiger"], ["用互动或小幽默把注意力拉回来", "peacock"], ["课后轻轻提醒，不当众批评他", "koala"], ["反思自己的课哪里 boring，调整教法", "owl"] ] },
    { scene: "课堂上突发学生打架 / 意外，你第一时间会——",
      opts: [ ["立即控制场面，果断处置保安全", "tiger"], ["先稳住各方情绪，再一起处理", "peacock"], ["先关心安抚受伤的同学", "koala"], ["冷静留证，按学校流程有序处置", "owl"] ] },
    { scene: "班主任工作和教学任务冲突、忙不过来，你会——",
      opts: [ ["排优先级，先保住最重要的事", "tiger"], ["找同事搭把手，乐观面对", "peacock"], ["尽量都揽下来，怕推脱不好", "koala"], ["列清单，系统统筹、合理分配", "owl"] ] },
    { scene: "领导要来听你的课，你会——",
      opts: [ ["正常发挥，展现自己的魄力", "tiger"], ["上得生动精彩、有感染力", "peacock"], ["有点紧张，但稳妥别出错就好", "koala"], ["每个环节都精心准备到位", "owl"] ] },
    { scene: "有学生私下向你倾诉家里的烦恼，你会——",
      opts: [ ["给明确的建议，引导他振作起来", "tiger"], ["暖心开导，给他正能量", "peacock"], ["耐心倾听，陪着他、共情他的感受", "koala"], ["理性分析，必要时联系家长或心理老师", "owl"] ] },
    { scene: "不知道怎么写教学反思 / 论文，你会——",
      opts: [ ["定个主题，逼自己先写出来再说", "tiger"], ["从有趣的案例写起，边做边写", "peacock"], ["跟着师父和模板，慢慢学", "koala"], ["系统读文献，按规范严谨地写", "owl"] ] },
    { scene: "同事让你帮忙做不属于你本职的事，你会——",
      opts: [ ["直接说「我现在忙、顾不上」", "tiger"], ["爽快帮忙，搞好同事关系", "peacock"], ["不好意思拒绝，硬着头皮接下", "koala"], ["评估利弊，合理安排或委婉拒绝", "owl"] ] },
    { scene: "入职半年感觉进步慢、有点焦虑，你会——",
      opts: [ ["给自己加压，定个更高的目标", "tiger"], ["找朋友同事倾诉，调节一下情绪", "peacock"], ["有点怀疑自己，但慢慢熬过去", "koala"], ["列一份成长清单，按计划补短板", "owl"] ] }
  ];

  /* ============================================================
     三、角色配置 + 运行逻辑
     ============================================================ */
  var ROLES = {
    teacher:   { key: "teacher",   label: "班主任", types: TYPES_TEACHER,   bank: BANK_TEACHER,
                 seenKey: "personality_test_seen_teacher_v1",
                 heroDesc: "全部为一线真实带班情境——你只需选出「最像自己会做的」那个做法，由做法客观反映你的性格倾向，并分析你的沟通交流特点。" },
    principal: { key: "principal", label: "校长",   types: TYPES_PRINCIPAL, bank: BANK_PRINCIPAL,
                 seenKey: "personality_test_seen_principal_v1",
                 heroDesc: "全部为真实治校管理情境——你只需选出「最像自己会做的」那个做法，由做法客观反映你的领导风格，并分析你的沟通与治校特点。" },
    newteacher:{ key: "newteacher", label: "新教师", types: TYPES_NEWTEACHER, bank: BANK_NEWTEACHER,
                 seenKey: "personality_test_seen_newteacher_v1",
                 heroDesc: "全部为近三年新入职教师的真实成长情境——你只需选出「最像自己会做的」那个做法，由做法客观反映你的性格底色，并分析你的沟通与成长特点。" }
  };

  var TARGET = 12;
  var role = null;      // 当前身份配置
  var QUESTIONS = [];
  var idx = 0;
  var answers = [];

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }
  function loadSeen(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; }
  }
  function saveSeen(key, list) {
    try { localStorage.setItem(key, JSON.stringify(list)); } catch (e) {}
  }

  /* 从当前身份题库抽 TARGET 题：优先抽没出现过的，全部出现过后自动清零循环 */
  function pickQuestions() {
    var bank = role.bank, key = role.seenKey;
    var seen = loadSeen(key);
    var allIdx = bank.map(function (_, i) { return i; });
    var unseen = allIdx.filter(function (i) { return seen.indexOf(i) === -1; });
    var seenBefore = allIdx.filter(function (i) { return seen.indexOf(i) !== -1; });
    shuffle(unseen); shuffle(seenBefore);

    var chosen = unseen.slice(0, TARGET);
    if (chosen.length < TARGET) {
      chosen = chosen.concat(seenBefore.slice(0, TARGET - chosen.length));
      saveSeen(key, chosen.slice());
    } else {
      saveSeen(key, seen.concat(chosen));
    }
    return shuffle(chosen).map(function (i) {
      return { scene: bank[i].scene, opts: shuffle(bank[i].opts.slice()) };
    });
  }

  // DOM
  var roleArea = document.getElementById("roleArea");
  var quizEl = document.getElementById("quiz");
  var qTitle = document.getElementById("qTitle");
  var optionsEl = document.getElementById("options");
  var progressFill = document.getElementById("progressFill");
  var progressText = document.getElementById("progressText");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");
  var questionArea = document.getElementById("questionArea");
  var resultArea = document.getElementById("resultArea");
  var heroDescEl = document.getElementById("heroDesc");

  function startRole(r) {
    role = ROLES[r];
    if (heroDescEl) heroDescEl.textContent = role.heroDesc;
    QUESTIONS = pickQuestions();
    idx = 0; answers = new Array(QUESTIONS.length).fill(null);
    if (roleArea) roleArea.classList.add("hidden");
    if (quizEl) quizEl.classList.remove("hidden");
    resultArea.classList.add("hidden");
    questionArea.classList.remove("hidden");
    renderQ();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function backToRole() {
    if (quizEl) quizEl.classList.add("hidden");
    questionArea.classList.add("hidden");
    resultArea.classList.add("hidden");
    if (roleArea) roleArea.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // 绑定角色卡
  if (roleArea) {
    roleArea.querySelectorAll("[data-role]").forEach(function (el) {
      el.addEventListener("click", function () { startRole(el.getAttribute("data-role")); });
    });
  }

  function renderQ() {
    var item = QUESTIONS[idx];
    qTitle.innerHTML =
      '<span class="q-num">Q' + (idx + 1) + '</span>' +
      '<span class="q-scene">' + item.scene + '</span>' +
      '<span class="q-hint">选出「最像你会做的」那一个，凭第一反应，没有标准答案。</span>';
    var keys = ["A", "B", "C", "D"];
    optionsEl.innerHTML = item.opts.map(function (o, i) {
      var sel = answers[idx] === i ? " selected" : "";
      return '<div class="option' + sel + '" data-i="' + i + '"><span class="opt-key">' + keys[i] + '</span><span>' + o[0] + '</span></div>';
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
    nextBtn.textContent = idx === QUESTIONS.length - 1 ? "查看结果 ✓" : "下一题 →";
  }

  prevBtn.addEventListener("click", function () { if (idx > 0) { idx--; renderQ(); } });
  nextBtn.addEventListener("click", function () {
    if (answers[idx] === null) { alert("请先选择一个选项哦～"); return; }
    if (idx < QUESTIONS.length - 1) { idx++; renderQ(); }
    else showResult();
  });

  function showResult() {
    var TYPES = role.types;
    var tally = { tiger: 0, peacock: 0, koala: 0, owl: 0 };
    for (var i = 0; i < QUESTIONS.length; i++) {
      if (answers[i] !== null) tally[QUESTIONS[i].opts[answers[i]][1]]++;
    }
    var order = ["tiger", "peacock", "koala", "owl"];
    var bestKey = "tiger", bestVal = -1;
    order.forEach(function (k) { if (tally[k] > bestVal) { bestVal = tally[k]; bestKey = k; } });
    var t = TYPES[bestKey];
    var total = QUESTIONS.length;

    var bars = order.slice().sort(function (a, b) { return tally[b] - tally[a]; }).map(function (k) {
      var pct = Math.round(tally[k] / total * 100);
      var tt = TYPES[k];
      return '<div style="margin:8px 0;text-align:left">' +
        '<div style="display:flex;justify-content:space-between;font-size:13px;font-weight:600;margin-bottom:4px">' +
        '<span>' + tt.emoji + ' ' + tt.code + '</span><span style="color:' + tt.color + '">' + pct + '%</span></div>' +
        '<div style="height:8px;background:var(--surface-soft);border-radius:99px;overflow:hidden">' +
        '<div style="height:100%;width:' + pct + '%;background:' + tt.color + ';border-radius:99px"></div></div></div>';
    }).join("");

    var commPoints = t.comm.points.map(function (p) { return '<li>' + p + '</li>'; }).join("");

    questionArea.classList.add("hidden");
    resultArea.classList.remove("hidden");
    resultArea.innerHTML =
      '<div style="font-size:13px;color:var(--ink-mute);font-weight:700;margin-bottom:10px">身份：' + role.label + ' · DISC 性格测评</div>' +
      '<div class="ptype-card" style="border:2px solid ' + t.color + '">' +
        '<div class="emoji">' + t.emoji + '</div>' +
        '<div class="code" style="color:' + t.color + '">' + t.code + '</div>' +
        '<div class="name">' + t.name + '</div>' +
        '<div style="font-size:13px;color:var(--ink-mute);margin-top:6px">' + t.trait + '</div>' +
      '</div>' +
      '<p class="desc">' + t.desc + '</p>' +
      '<div class="advice" style="border-left:4px solid ' + t.color + ';background:' + t.color + '12;padding:16px 18px;border-radius:12px">' +
        '<h4>💬 你的沟通交流特点</h4>' +
        '<p style="margin:6px 0 12px;color:var(--ink-soft);line-height:1.7">' + t.comm.style + '</p>' +
        '<ul>' + commPoints + '</ul>' +
        '<p style="margin-top:12px;font-weight:600;color:' + t.color + '">💡 一句话提醒：' + t.comm.watch + '</p>' +
      '</div>' +
      '<div class="advice"><h4>🌟 你的优势</h4><ul>' +
        t.strength.map(function (s) { return '<li>' + s + '</li>'; }).join("") + '</ul></div>' +
      '<div class="advice"><h4>🌱 成长建议</h4><ul>' +
        t.tip.map(function (s) { return '<li>' + s + '</li>'; }).join("") + '</ul></div>' +
      '<div class="advice"><h4>📊 你的性格维度分布</h4>' + bars + '</div>' +
      '<div style="margin-top:24px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
        '<button class="btn btn-primary" id="retryBtn">换一批题重测</button>' +
        '<button class="btn btn-ghost" id="switchRoleBtn">换个身份重测</button>' +
        '<a class="btn btn-ghost" href="resources.html">去资源库看看 →</a>' +
      '</div>';
    document.getElementById("retryBtn").addEventListener("click", function () {
      QUESTIONS = pickQuestions();
      idx = 0; answers = new Array(QUESTIONS.length).fill(null);
      resultArea.classList.add("hidden"); questionArea.classList.remove("hidden");
      renderQ(); window.scrollTo({ top: 0, behavior: "smooth" });
    });
    document.getElementById("switchRoleBtn").addEventListener("click", backToRole);
    try { if (window.SiteTrack) window.SiteTrack.recordTest(role.label + "性格", { type: t.name }); } catch (e) {}
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
})();
