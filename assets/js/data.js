/* ============================================================
   资源库数据 · 7 大类
   每类：key / name / color / count（声明总数）/ items
   每条资源含 url：指向真实可访问的官方原文 / 权威平台 / 检索页
   带班锦囊额外带 domain（领域）字段
   ============================================================ */

const CATEGORIES = [
  // —— 班级管理（班主任）——
  { key: "jinnang",  name: "带班锦囊", color: "#FF6B35", count: 41, icon: "💡", board: "班级管理" },
  { key: "case",     name: "实践案例", color: "#E8618C", count: 10, icon: "🏅", board: "班级管理" },
  { key: "policy",   name: "政策文件", color: "#FF7E6B", count: 12, icon: "📋", board: "班级管理" },
  { key: "video",    name: "视频课程", color: "#4DA8F0", count: 6,  icon: "🎬", board: "班级管理" },
  { key: "doc",      name: "文档资料", color: "#FFB23E", count: 5,  icon: "📄", board: "班级管理" },
  { key: "ppt",      name: "PPT课件", color: "#36C98D", count: 3,  icon: "📽️", board: "班级管理" },
  { key: "book",     name: "推荐书目", color: "#FFC857", count: 8,  icon: "📖", board: "班级管理" },
  { key: "journal",  name: "专业期刊", color: "#9B7BF0", count: 4,  icon: "📰", board: "班级管理" },
  // —— 学校管理（校长）——
  { key: "schoolpolicy", name: "学校政策标准", color: "#14A277", count: 8, icon: "📜", board: "学校管理" },
  { key: "schtip",   name: "治校锦囊", color: "#F2B33D", count: 12, icon: "🗝️", board: "学校管理" },
  { key: "schcase",  name: "治校案例", color: "#E8618C", count: 5, icon: "🏛️", board: "学校管理" },
  { key: "schbook",  name: "校长必读", color: "#9B7BF0", count: 8, icon: "📚", board: "学校管理" },
  // —— 新教师（近三年入职）——
  { key: "xinshi",   name: "新师必读", color: "#7A25A8", count: 6, icon: "📘", board: "新教师" },
  { key: "rudao",    name: "入职锦囊", color: "#A24FD6", count: 8, icon: "🧭", board: "新教师" },
  { key: "jibengong",name: "教学基本功", color: "#4DA8F0", count: 6, icon: "✍️", board: "新教师" },
  { key: "shitu",    name: "师徒结对", color: "#35C08A", count: 5, icon: "🤝", board: "新教师" },
];

// 带班锦囊 / 实践案例 共用领域（班级管理）
const JINNANG_DOMAINS = ["常规管理", "习惯养成", "家校沟通", "心理疏导", "班级文化"];

// 治校锦囊 / 治校案例 共用领域（学校管理，对应《校长专业标准》六项专业职责）
const SCH_DOMAINS = ["规划学校发展", "营造育人文化", "领导课程教学", "引领教师成长", "优化内部管理", "调适外部环境"];

// 入职锦囊 / 新师资源 共用领域（对应《教师专业标准》三维度）
const NEWTEACHER_DOMAINS = ["专业理念与师德", "专业知识", "专业能力"];

// 学校政策 / 治校资源检索链接
function schoolPolicyUrl(kw) {
  return "https://www.baidu.com/s?wd=" + encodeURIComponent(kw + " 校长专业标准 教育部");
}
function schTipUrl(kw) {
  return "https://www.baidu.com/s?wd=" + encodeURIComponent(kw + " 学校管理 治校 实践");
}
function schCaseUrl(kw) {
  return "https://www.baidu.com/s?wd=" + encodeURIComponent(kw + " 校长 治校 案例");
}

// 带班锦囊为原创实践经验，链接指向相关做法的权威检索/实践文章
function tipUrl(kw) {
  return "https://www.baidu.com/s?wd=" + encodeURIComponent(kw + " 班级管理 实践");
}

// 实践案例检索链接
function caseUrl(kw) {
  return "https://www.baidu.com/s?wd=" + encodeURIComponent(kw + " 班主任 教育案例");
}

const RESOURCES = {
  case: [
    {
      title: "把「小霸王」变成「班级卫士」",
      domain: "心理疏导", stage: "小学",
      scene: "班里一名男生频繁欺负同学、抢夺文具，屡次批评都不见效，家长也束手无策。",
      action: "不再单纯惩罚，而是任命他为「班级安全督察员」，负责课间秩序和保护低年级同学，每天肯定他的每一点进步。",
      effect: "两个月后欺负行为基本消失，他从「破坏者」变成有责任感的「守护者」，还主动帮老师调解同学矛盾。",
      desc: "用责任岗位替代惩罚，唤醒问题学生的价值感与归属感。",
      url: caseUrl("问题学生转化 责任岗位")
    },
    {
      title: "一次家长误会的化解",
      domain: "家校沟通", stage: "通用",
      scene: "一位家长在班级群里公开质疑老师「偏心」，情绪激动，其他家长开始围观议论。",
      action: "老师没在群里争辩，而是私信约家长面谈，先倾听诉求、承认沟通不足，再用孩子的具体记录还原事实，共商方案。",
      effect: "家长当面道歉并在群里澄清，家校信任不降反升，后来还成了班级家委会的骨干。",
      desc: "面对家校冲突，先接住情绪、私下沟通、用事实说话，化危机为信任。",
      url: caseUrl("家校冲突 家长误会 化解")
    },
    {
      title: "唤醒「沉默的大多数」",
      domain: "班级文化", stage: "初中",
      scene: "接手一个课堂气氛沉闷的班级，举手发言的永远是那几个，多数学生习惯当「隐形人」。",
      action: "推行「人人有岗、轮流主持」：五分钟班级新闻轮播、小组积分抢答、每周一名「课堂主持人」，把话语权交给学生。",
      effect: "一学期后课堂参与度显著提升，连最内向的学生也能上台播报，班级从沉默走向活跃。",
      desc: "通过岗位轮换与低门槛表达机会，激活班级参与氛围。",
      url: caseUrl("激活班级氛围 学生参与")
    },
    {
      title: "手机不再进课堂",
      domain: "常规管理", stage: "初中·高中",
      scene: "班里手机屡禁不止，没收对抗、家长意见不一，堵的办法越用越僵。",
      action: "召开班会由学生共商「手机公约」：设立统一保管袋、明确使用时段与违约后果，规则由全班表决通过。",
      effect: "因为是自己定的规则，学生自觉遵守，课堂玩手机现象基本杜绝，家长也全力支持。",
      desc: "变「老师管」为「大家定」，用共订公约破解手机管理难题。",
      url: caseUrl("学生手机管理 班级公约")
    },
    {
      title: "插班生的第一周",
      domain: "心理疏导", stage: "通用",
      scene: "学期中来了一名转学生，性格内向，课间总是独自坐着，没有朋友、也不敢求助。",
      action: "老师安排热心同学做「一周伙伴」带他熟悉环境，第一次小组活动特意让他展示特长，私下多次谈心了解顾虑。",
      effect: "一周后他主动融入小组，脸上有了笑容，一个月后已经交到好朋友，成绩也稳步提升。",
      desc: "用伙伴陪伴 + 特长展示 + 个别谈心，帮插班生快速找到归属感。",
      url: caseUrl("转学生 插班生 融入班级")
    },
    {
      title: "后进生的「学习合伙人」",
      domain: "习惯养成", stage: "初中",
      scene: "几名学生长期垫底，屡教不改、自我放弃，单靠老师课后辅导收效甚微。",
      action: "组建「学习合伙人」互助小组，优等生与后进生结对，共用错题本、每日互查，小组捆绑积分评优。",
      effect: "一学期后后进生成绩明显进步，更重要的是重拾了学习信心，同伴关系也更紧密。",
      desc: "用结对互助与小组捆绑激励，激活后进生的内驱力。",
      url: caseUrl("后进生转化 结对帮扶 学习小组")
    },
    {
      title: "毕业班的考前减压",
      domain: "心理疏导", stage: "初中·高中",
      scene: "临近中考，班里弥漫紧张焦虑，个别学生失眠、成绩波动，甚至出现厌考情绪。",
      action: "开展系列减压活动：正念呼吸练习、「给未来的自己写信」、张贴励志留言墙，并邀请心理老师做团体辅导。",
      effect: "班级焦虑情绪明显缓解，学生以更平稳的心态迎考，整体发挥超出预期。",
      desc: "用团体心理辅导与仪式感活动，为毕业班学生稳住心态。",
      url: caseUrl("考前心理辅导 减压 毕业班")
    },
    {
      title: "从「脏乱差」到自主保洁",
      domain: "常规管理", stage: "小学·初中",
      scene: "班级卫生长期垫底，值日敷衍、互相推诿，老师天天盯着提醒也不见好转。",
      action: "推行「责任区承包制」，把教室分片到人、挂牌到岗，每周评选「最美责任区」，卫生纳入小组积分。",
      effect: "两周后卫生面貌焕然一新，学生从被动应付变成主动维护，还养成了随手整理的好习惯。",
      desc: "用责任到人与荣誉激励，把卫生难题转化为习惯养成。",
      url: caseUrl("班级卫生管理 责任区 值日")
    },
    {
      title: "单亲孩子的秘密守护",
      domain: "心理疏导", stage: "通用",
      scene: "一名来自单亲家庭的学生变得沉默易怒、成绩下滑，但特别抗拒别人提及家庭。",
      action: "老师不点破、不特殊化，而是在日常中默默给予关注：安排力所能及的班级小任务、悄悄话信箱回应、家访给予支持。",
      effect: "学生逐渐打开心扉，情绪趋于稳定，重新融入集体，还主动承担了班级图书角的管理。",
      desc: "以不动声色的尊重与持续陪伴，守护特殊家庭孩子的自尊。",
      url: caseUrl("单亲家庭学生 心理关怀 个别教育")
    },
    {
      title: "网络游戏沉迷的家校合围",
      domain: "家校沟通", stage: "初中",
      scene: "一名学生沉迷手游，熬夜打游戏导致上课睡觉、成绩骤降，家长管不住、亲子关系紧张。",
      action: "老师牵头家校三方约谈，共同制定作息与用机计划，家长负责陪伴而非没收，老师安排他负责班级体育活动转移兴趣。",
      effect: "两个月后作息恢复正常，游戏时间大幅减少，他在体育活动中找到成就感，亲子关系也缓和了。",
      desc: "家校协同、疏堵结合，用真实成就感替代虚拟沉迷。",
      url: caseUrl("网络沉迷 手机游戏 家校协同 干预")
    },
  ],
  jinnang: [
    { title: "值日班长轮值制", domain: "常规管理", stage: "通用", desc: "每天一名值日班长负责考勤、纪律与小结，人人都有当家做主的机会，责任感自然生长。", url: tipUrl("值日班长轮值制") },
    { title: "班级公约共订", domain: "班级文化", stage: "通用", desc: "开学第一周由全班讨论、投票产生班规，学生对自己参与制定的规则更愿意遵守。", url: tipUrl("班级公约共同制定") },
    { title: "悄悄话信箱", domain: "心理疏导", stage: "小学·初中", desc: "教室角落设匿名信箱，学生把不便当面说的烦恼写下来，班主任定期回应，守护心事。", url: tipUrl("班级悄悄话信箱 心理") },
    { title: "课间三分钟站队歌", domain: "常规管理", stage: "小学", desc: "用固定的音乐提示课间集合，学生听到旋律自动归位，比反复催促更省心有序。", url: tipUrl("课间集合 音乐提示 常规") },
    { title: "错题漂流本", domain: "习惯养成", stage: "初中·高中", desc: "小组共用一本错题集轮流补充，互相讲解典型错题，把个人短板变成集体财富。", url: tipUrl("错题本 小组共享 习惯") },
    { title: "家长会圆桌模式", domain: "家校沟通", stage: "通用", desc: "打破排排坐，改成小组圆桌，家长之间也能交流育儿经验，会后满意度明显提升。", url: tipUrl("家长会 圆桌 沟通") },
    { title: "情绪温度计打卡", domain: "心理疏导", stage: "小学·初中", desc: "每天进班在情绪墙贴一个表情，班主任快速捕捉状态异常的孩子，及时关心。", url: tipUrl("情绪温度计 情绪墙 心理") },
    { title: "光荣榜滚动更新", domain: "班级文化", stage: "通用", desc: "不只表彰成绩，进步、助人、坚持都能上榜，让每个孩子都有被看见的机会。", url: tipUrl("班级多元评价 光荣榜") },
    { title: "作业分层清单", domain: "习惯养成", stage: "初中", desc: "基础/提高/挑战三档自选，照顾不同水平，减少抄袭与畏难情绪。", url: tipUrl("作业分层设计") },
    { title: "五分钟班级新闻", domain: "班级文化", stage: "通用", desc: "每天由学生轮流播报班级或时事小新闻，锻炼表达也增强集体归属感。", url: tipUrl("班级新闻播报 表达") },
    { title: "冲突调解三步法", domain: "心理疏导", stage: "通用", desc: "先分开冷静、再各自陈述、最后共同找方案，把同学矛盾变成成长课。", url: tipUrl("学生冲突调解 三步法") },
    { title: "家校联系每周一信", domain: "家校沟通", stage: "小学", desc: "每周五发一封简短的班级周报给家长，正面反馈为主，沟通更有温度。", url: tipUrl("班级周报 家校沟通") },
    { title: "座位动态轮换", domain: "常规管理", stage: "通用", desc: "定期按规则轮换座位，兼顾视力、身高与同伴关系，减少家长对座位的焦虑。", url: tipUrl("班级座位轮换方案") },
    { title: "成长档案袋", domain: "习惯养成", stage: "通用", desc: "为每个学生建立作品与进步记录袋，学期末回看成长轨迹，仪式感满满。", url: tipUrl("学生成长档案袋") },
    { title: "班级议事会", domain: "班级文化", stage: "初中·高中", desc: "每两周开一次学生自主议事会，班级大小事由学生提议表决，培养主人翁意识。", url: tipUrl("班级议事会 自主管理") },
  ],
  policy: [
    { title: "《中小学班主任工作规定》", stage: "通用", desc: "教育部关于班主任职责、待遇与权益保障的纲领性文件，带班的基本依据。", url: "https://www.edu.cn/edu/zheng_ce_gs_gui/zheng_ce_wen_jian/ji_chu/200908/t20090824_401584_1.shtml" },
    { title: "《中小学生守则（2015 修订）》", stage: "通用", desc: "9 条学生行为规范，班级常规教育与评价的重要参照。", url: "https://www.baidu.com/s?wd=" + encodeURIComponent("中小学生守则 2015年修订 教育部 全文") },
    { title: "《未成年人学校保护规定》", stage: "通用", desc: "教育部令第50号，明确学校在人身、人格、隐私等方面的保护职责，处理事件必读。", url: "http://www.moe.gov.cn:8080/jyb_xxgk/xxgk/zhengce/guizhang" },
    { title: "《进一步加强中小学生心理健康工作十条措施》", stage: "通用", desc: "教育部办公厅印发，心理筛查、危机干预与家校协同的最新政策要求。", url: "http://www.moe.gov.cn/srcsite/A06/s3325/202510/t20251020_1417420.html" },
    { title: "《中小学德育工作指南》", stage: "通用", desc: "德育目标、内容与实施路径的系统指引。", url: "https://www.baidu.com/s?wd=" + encodeURIComponent("中小学德育工作指南 教育部 全文") },
    { title: "《家庭教育促进法》", stage: "通用", desc: "家校共育的法律边界与协同责任，指导家长沟通（国家法律法规数据库）。", url: "https://flk.npc.gov.cn/" },
    { title: "《中小学教育惩戒规则（试行）》", stage: "通用", desc: "教育部令第49号，教育惩戒的适用情形、方式与禁止行为，规范管理边界。", url: "http://www.moe.gov.cn:8080/jyb_xxgk/xxgk/zhengce/guizhang" },
    { title: "《义务教育质量评价指南》", stage: "小学·初中", desc: "县域、学校、学生三个层面的评价体系框架。", url: "https://www.baidu.com/s?wd=" + encodeURIComponent("义务教育质量评价指南 全文") },
  ],
  video: [
    { title: "中国大学MOOC · 班主任专业成长", stage: "通用", desc: "系统的班主任能力提升课程，涵盖班级建设、家校沟通等模块。", url: "https://www.icourse163.org/search.htm?search=" + encodeURIComponent("班主任") },
    { title: "学习强国 · 教育频道", stage: "通用", desc: "海量师德师风、优秀班主任案例与专题讲座视频。", url: "https://www.xuexi.cn/" },
    { title: "全国班主任基本功展示", stage: "通用", desc: "历届优秀班主任情境答辩与主题班会实录，可直接借鉴。", url: "https://search.bilibili.com/all?keyword=" + encodeURIComponent("全国班主任基本功大赛") },
    { title: "国家中小学智慧教育平台 · 班级管理", stage: "通用", desc: "官方权威的班级管理与心理健康微课资源。", url: "https://basic.smartedu.cn/" },
    { title: "名师主题班会课例", stage: "小学·初中", desc: "分年龄段的优质主题班会完整课堂实录。", url: "https://search.bilibili.com/all?keyword=" + encodeURIComponent("主题班会 课例") },
    { title: "新手班主任 30 讲", stage: "通用", desc: "面向新入职班主任的实操短视频合集，快速上手。", url: "https://search.bilibili.com/all?keyword=" + encodeURIComponent("新手班主任") },
  ],
  doc: [
    { title: "《班主任工作手册（通用版）》", stage: "通用", desc: "一日常规、家校沟通与突发事件处置的标准化流程模板。", url: "https://wenku.baidu.com/search?word=" + encodeURIComponent("班主任工作手册") },
    { title: "《班级量化考核表》", stage: "通用", desc: "操行评分、值日分工与小组积分的可打印模板。", url: "https://wenku.baidu.com/search?word=" + encodeURIComponent("班级量化考核表") },
    { title: "《家校联系记录本》", stage: "通用", desc: "家长走访、电话与线上访谈的标准化记录页。", url: "https://wenku.baidu.com/search?word=" + encodeURIComponent("家校联系记录表") },
    { title: "《主题班会设计模板》", stage: "通用", desc: "目标—流程—素材—反思四段式班会备课框架。", url: "https://wenku.baidu.com/search?word=" + encodeURIComponent("主题班会设计方案模板") },
    { title: "《学期班级工作计划模板》", stage: "通用", desc: "开学初制定学期目标与阶段任务的规划表。", url: "https://wenku.baidu.com/search?word=" + encodeURIComponent("班主任学期工作计划") },
  ],
  ppt: [
    { title: "《开学第一节班会》", stage: "通用", desc: "破冰、规则共建与学期目标设定的开场课件。", url: "https://wenku.baidu.com/search?word=" + encodeURIComponent("开学第一课 班会 PPT") },
    { title: "《如何开好家长会》", stage: "通用", desc: "流程设计、沟通话术与常见疑问应对模板。", url: "https://wenku.baidu.com/search?word=" + encodeURIComponent("家长会 PPT 课件") },
    { title: "《考前心理调适》", stage: "初中·高中", desc: "缓解焦虑、时间管理与放松训练主题课件。", url: "https://wenku.baidu.com/search?word=" + encodeURIComponent("考前心理辅导 班会 PPT") },
  ],
  book: [
    { title: "《正面管教》", stage: "通用", desc: "不惩罚不娇纵，培养自律与合作的长销经典。", url: "https://search.douban.com/book/subject_search?search_text=" + encodeURIComponent("正面管教") },
    { title: "《第56号教室的奇迹》", stage: "通用", desc: "雷夫·艾斯奎斯的教育热情与方法启示。", url: "https://search.douban.com/book/subject_search?search_text=" + encodeURIComponent("第56号教室的奇迹") },
    { title: "《班主任工作漫谈》", stage: "通用", desc: "魏书生关于班级自主管理的实践智慧。", url: "https://search.douban.com/book/subject_search?search_text=" + encodeURIComponent("班主任工作漫谈 魏书生") },
    { title: "《给教师的建议》", stage: "通用", desc: "苏霍姆林斯基的百条教育箴言，常读常新。", url: "https://search.douban.com/book/subject_search?search_text=" + encodeURIComponent("给教师的建议 苏霍姆林斯基") },
    { title: "《非暴力沟通》", stage: "通用", desc: "化解冲突、建立信任的沟通语言，师生家校皆宜。", url: "https://search.douban.com/book/subject_search?search_text=" + encodeURIComponent("非暴力沟通") },
    { title: "《教育的目的》", stage: "通用", desc: "怀特海对教育本质的哲思，拓宽育人视野。", url: "https://search.douban.com/book/subject_search?search_text=" + encodeURIComponent("教育的目的 怀特海") },
    { title: "《窗边的小豆豆》", stage: "小学", desc: "巴学园的故事，理解与尊重每一个孩子。", url: "https://search.douban.com/book/subject_search?search_text=" + encodeURIComponent("窗边的小豆豆") },
    { title: "《被讨厌的勇气》", stage: "通用", desc: "阿德勒心理学入门，帮助面对师生关系中的课题分离。", url: "https://search.douban.com/book/subject_search?search_text=" + encodeURIComponent("被讨厌的勇气") },
  ],
  journal: [
    { title: "《班主任之友》", stage: "通用", desc: "一线班主任经验、案例与研讨的前沿读物。", url: "https://navi.cnki.net/knavi/journals/search?searchText=" + encodeURIComponent("班主任之友") },
    { title: "《人民教育》", stage: "通用", desc: "把握基础教育政策与改革方向的核心期刊。", url: "https://navi.cnki.net/knavi/journals/search?searchText=" + encodeURIComponent("人民教育") },
    { title: "《中小学心理健康教育》", stage: "通用", desc: "学生心理发展与辅导的专业参考。", url: "https://navi.cnki.net/knavi/journals/search?searchText=" + encodeURIComponent("中小学心理健康教育") },
    { title: "《班主任》", stage: "通用", desc: "聚焦班级管理理论与实务的专业月刊。", url: "https://navi.cnki.net/knavi/journals/search?searchText=" + encodeURIComponent("班主任") },
  ],
  /* ===== 学校管理（校长）===== */
  schoolpolicy: [
    { title: "《义务教育学校校长专业标准》", stage: "小学·初中", desc: "教育部 2013 年印发，规划学校发展等六项专业职责的专业准则，治校的基本遵循。", url: schoolPolicyUrl("义务教育学校校长专业标准 2013") },
    { title: "《普通高中校长专业标准》", stage: "高中", desc: "教育部 2015 年印发，在六项职责基础上突出高中育人方式改革要求。", url: schoolPolicyUrl("普通高中校长专业标准 2015") },
    { title: "《义务教育学校管理标准》", stage: "小学·初中", desc: "教育部 2017 年印发，从平等对待、促进学生全面发展等 92 条明确学校管理底线与方向。", url: schoolPolicyUrl("义务教育学校管理标准 2017") },
    { title: "《幼儿园园长专业标准》", stage: "幼儿园", desc: "教育部 2015 年印发，规划发展、营造育人文化等六项专业职责参照。", url: schoolPolicyUrl("幼儿园园长专业标准 2015") },
    { title: "《关于建立中小学校党组织领导的校长负责制的意见（试行）》", stage: "通用", desc: "中办印发，明确党组织把方向、管大局与校长依法依规行使职权的领导体制。", url: schoolPolicyUrl("中小学校党组织领导的校长负责制") },
    { title: "《中小学教师校长培训课程标准》", stage: "通用", desc: "教育部办公厅印发，校长培训的能力诊断与课程设计参照框架。", url: schoolPolicyUrl("中小学校长培训课程标准") },
    { title: "《义务教育质量评价指南》", stage: "小学·初中", desc: "学校、县域、学生三层评价体系，学校治理与质量保障的重要依据。", url: "https://www.baidu.com/s?wd=" + encodeURIComponent("义务教育质量评价指南 全文") },
    { title: "《中小学领导人员管理暂行办法》", stage: "通用", desc: "中组部、教育部印发，明确校长选拔、任职与考核的管理规范。", url: schoolPolicyUrl("中小学领导人员管理暂行办法") },
  ],
  schtip: [
    { title: "三年规划共绘", domain: "规划学校发展", stage: "通用", desc: "用校情诊断加教代会讨论，把规划变成全员共识与年度行动，而非一份应付材料。", url: schTipUrl("学校三年发展规划 制定") },
    { title: "SWOT 办学诊断", domain: "规划学校发展", stage: "通用", desc: "定期做优势—劣势—机会—威胁分析，让学校改进有数据、有方向。", url: schTipUrl("学校 SWOT 诊断 办学") },
    { title: "文化内生三层次", domain: "营造育人文化", stage: "通用", desc: "系统规划精神、制度、环境文化，让育人发生在课程与日常关系里。", url: schTipUrl("校园文化建设 精神 制度 环境") },
    { title: "课程领导力清单", domain: "领导课程教学", stage: "通用", desc: "统筹国家、地方、校本三类课程，建立常态课质量保障闭环。", url: schTipUrl("校长 课程领导力 课堂教学") },
    { title: "青蓝工程 2.0", domain: "引领教师成长", stage: "通用", desc: "从一对一师徒升级为教师学习共同体，分层培养加职业关怀。", url: schTipUrl("青蓝工程 青年教师 培养") },
    { title: "中层授权赋能", domain: "优化内部管理", stage: "通用", desc: "明确权责、建协作流程，把事必躬亲转为授权型领导。", url: schTipUrl("学校中层管理 授权 赋能") },
    { title: "家校社联席会", domain: "调适外部环境", stage: "通用", desc: "建立校、家、社定期沟通机制，把对立与投诉转为共建伙伴。", url: schTipUrl("家校社协同 联席会议") },
    { title: "舆情应对预案", domain: "调适外部环境", stage: "通用", desc: "事前有口径、事中有发布、事后有复盘，化危为机。", url: schTipUrl("校园舆情 应对 预案") },
    { title: "教师疗愈计划", domain: "引领教师成长", stage: "通用", desc: "关注职业幸福感，用减负、团建与心理支持减少倦怠流失。", url: schTipUrl("教师职业倦怠 心理疏导") },
    { title: "简政放权清单", domain: "优化内部管理", stage: "通用", desc: "用数据优化治理、减少层层审批，让制度有温度有效率。", url: schTipUrl("学校管理 简政放权 治理") },
    { title: "文明校园以评促建", domain: "营造育人文化", stage: "通用", desc: "把创建融入常态而非突击留痕，以评促建成风化人。", url: schTipUrl("文明校园 创建 以评促建") },
    { title: "社区资源转育人", domain: "调适外部环境", stage: "通用", desc: "开放共享学校体育文化空间，把社区资源转化为育人伙伴。", url: schTipUrl("校社合作 社区资源 育人") },
  ],
  schcase: [
    {
      title: "薄弱校的逆袭",
      domain: "规划学校发展", stage: "通用",
      scene: "一所生源弱、口碑差的学校，家长用脚投票、骨干教师流失。",
      action: "新校长以「把每个孩子放在中央」为愿景，做校情诊断、凝聚共识，三年分步推进课堂与师生关系改革。",
      effect: "学业质量稳步提升，家长回流、教师归队，学校从「避之不及」变成「家门口的好学校」。",
      desc: "以愿景引领与持续改进循环，让薄弱校实现内涵式翻身。",
      url: schCaseUrl("薄弱学校 改进 校长 案例")
    },
    {
      title: "教师共同体的诞生",
      domain: "引领教师成长", stage: "通用",
      scene: "教师各自为战、教研流于形式，青年教师成长慢。",
      action: "校长把「单打独斗」改成跨学科教研共同体，固定时间共备共研、互听互评，并把成长阶梯可视化。",
      effect: "教研从「任务」变「习惯」，一批青年教师迅速冒尖，团队凝聚力明显增强。",
      desc: "以学习共同体激活教师队伍，让成长彼此赋能。",
      url: schCaseUrl("教师学习共同体 教研 校长")
    },
    {
      title: "把投诉家长变成盟友",
      domain: "调适外部环境", stage: "通用",
      scene: "一位情绪激动的家长在校门口拉横幅，引来围观议论。",
      action: "校长没有回避或对抗，而是主动接待、倾听诉求，依法依规沟通，并顺势建立家校社联席机制。",
      effect: "危机化解为信任，该家长后来成了家委会骨干，校社关系持续向好。",
      desc: "把家校冲突视为信任建设机会，先接住情绪再谈事实。",
      url: schCaseUrl("家校冲突 校长 危机化解 案例")
    },
    {
      title: "课改落地的最后一公里",
      domain: "领导课程教学", stage: "通用",
      scene: "上级推动课改，但课堂依旧「穿新鞋走老路」，素养提升不明显。",
      action: "校长以课程领导力统筹三类课程，聚焦每一节常态课，建起备课—观课—反馈的质量闭环。",
      effect: "课堂从「热闹」走向「真实学习」，学生核心素养与学业表现同步改善。",
      desc: "用课程领导力把课改落到常态课，而非几节公开课。",
      url: schCaseUrl("课程改革 落地 校长 课堂")
    },
    {
      title: "一场舆情下的稳健发声",
      domain: "调适外部环境", stage: "通用",
      scene: "一次校园安全小事故被发到网上，舆情开始发酵。",
      action: "学校第一时间发布权威信息、坦诚说明处置进展，并同步建立公共沟通机制与复盘制度。",
      effect: "误解快速澄清，公众看到学校的负责任态度，信任不降反升。",
      desc: "主动、透明、有节奏的沟通，把舆情危机转为信任重建。",
      url: schCaseUrl("校园舆情 应对 校长 沟通")
    },
  ],
  schbook: [
    { title: "《卓有成效的管理者》", stage: "通用", desc: "德鲁克经典，时间、贡献、用人之长——校长自我管理的入门书。", url: "https://search.douban.com/book/subject_search?search_text=" + encodeURIComponent("卓有成效的管理者") },
    { title: "《静悄悄的革命》", stage: "通用", desc: "佐藤学关于学习共同体与课堂改革的启示，治校与课改皆宜。", url: "https://search.douban.com/book/subject_search?search_text=" + encodeURIComponent("静悄悄的革命 佐藤学") },
    { title: "《第五项修炼》", stage: "通用", desc: "彼得·圣吉的系统思考与学习型组织，助力学校持续改进。", url: "https://search.douban.com/book/subject_search?search_text=" + encodeURIComponent("第五项修炼") },
    { title: "《校长如何领导课程与教学》", stage: "通用", desc: "聚焦校长的课程领导力与教学领导实务。", url: "https://search.douban.com/book/subject_search?search_text=" + encodeURIComponent("校长 课程领导 教学领导") },
    { title: "《从管到理》", stage: "通用", desc: "学校治理从管控走向赋能的理念与方法。", url: "https://search.douban.com/book/subject_search?search_text=" + encodeURIComponent("从管到理 学校治理") },
    { title: "《学习型学校与共同体》", stage: "通用", desc: "建设教师学习共同体、营造合作文化的实践指南。", url: "https://search.douban.com/book/subject_search?search_text=" + encodeURIComponent("学习型学校 共同体") },
    { title: "《学校领导与企业文化》", stage: "通用", desc: "从文化视角理解学校精神与制度建设的底层逻辑。", url: "https://search.douban.com/book/subject_search?search_text=" + encodeURIComponent("学校文化 领导") },
    { title: "《给校长的建议》", stage: "通用", desc: "一线名校长谈规划、用人、沟通与危机应对的实话实说。", url: "https://search.douban.com/book/subject_search?search_text=" + encodeURIComponent("给校长的建议") },
  ],
  /* ===== 新教师（近三年入职）===== */
  xinshi: [
    { title: "《小学教师专业标准（试行）》", stage: "小学", desc: "教育部 2012 年印发，专业理念与师德 / 专业知识 / 专业能力三维度的基本遵循。", url: "https://www.baidu.com/s?wd=" + encodeURIComponent("小学教师专业标准 试行 教育部 2012") },
    { title: "《中学教师专业标准（试行）》", stage: "初中·高中", desc: "教育部 2012 年印发，与新教师入职起步直接对标的能力框架。", url: "https://www.baidu.com/s?wd=" + encodeURIComponent("中学教师专业标准 试行 教育部 2012") },
    { title: "《新时代中小学幼儿园教师职业行为十项准则》", stage: "通用", desc: "师德师风底线清单，新教师入职第一课。", url: "https://www.baidu.com/s?wd=" + encodeURIComponent("新时代教师职业行为十项准则 教育部") },
    { title: "《新教师入职读本》", stage: "通用", desc: "从角色转换、班级初建到家校沟通的系统入门。", url: "https://search.douban.com/book/subject_search?search_text=" + encodeURIComponent("新教师入职读本") },
    { title: "《教学工作漫谈》", stage: "通用", desc: "魏书生谈备课、上课与管理的实操智慧，新教师常读常新。", url: "https://search.douban.com/book/subject_search?search_text=" + encodeURIComponent("教学工作漫谈 魏书生") },
    { title: "《教师三项基本功》", stage: "通用", desc: "备课、上课、批改的作业化拆解，把基本功练扎实。", url: "https://search.douban.com/book/subject_search?search_text=" + encodeURIComponent("教师教学基本功") },
  ],
  rudao: [
    { title: "开学第一课设计", domain: "专业理念与师德", stage: "通用", desc: "用一堂走进学生心里的课建立信任与共同愿景，而非只立规矩。", url: tipUrl("开学第一课 设计 信任") },
    { title: "班级初建三件事", domain: "专业理念与师德", stage: "通用", desc: "快速记住名字、摸清班情、共建公约，让新班级有归属感。", url: tipUrl("新教师 接新班 建班 三步") },
    { title: "课堂管理破冰", domain: "专业能力", stage: "通用", desc: "用眼神、走近、无声提醒代替当众批评，把注意力拉回课堂。", url: tipUrl("新教师 课堂管理 破冰 提醒") },
    { title: "作业分层起步", domain: "专业知识", stage: "通用", desc: "基础 / 提高两档起步，照顾差异、减少畏难与抄袭。", url: tipUrl("新教师 作业分层 设计") },
    { title: "第一次家长会", domain: "专业理念与师德", stage: "通用", desc: "用圆桌与正面反馈，把家长变成同盟而非对立。", url: tipUrl("新教师 第一次家长会 沟通") },
    { title: "听课记录模板", domain: "专业能力", stage: "通用", desc: "带着「学什么」去听老教师的课，把经验变成自己的方法。", url: tipUrl("新教师 听课记录 模板") },
    { title: "家校沟通边界", domain: "专业理念与师德", stage: "通用", desc: "先倾听再温和说边界，不随意承诺、也不生硬拒绝。", url: tipUrl("新教师 家校沟通 边界") },
    { title: "反思日志养成", domain: "专业能力", stage: "通用", desc: "每天记一条「成了什么 / 卡在哪」，把挫败变成成长信号。", url: tipUrl("新教师 教学反思日志 养成") },
  ],
  jibengong: [
    { title: "板书设计入门", domain: "专业知识", stage: "通用", desc: "主副板分区、要点成网，让黑板成为学生的思维地图。", url: tipUrl("新教师 板书设计 入门") },
    { title: "提问设计三层次", domain: "专业知识", stage: "通用", desc: "从记忆到分析到创造，用有台阶的问题拉动参与。", url: tipUrl("新教师 课堂提问 设计 层次") },
    { title: "导入与小结", domain: "专业能力", stage: "通用", desc: "用情境导入抓注意，用结构化小结帮学生收网。", url: tipUrl("新教师 课堂导入 小结 设计") },
    { title: "学情分析怎么做", domain: "专业知识", stage: "通用", desc: "前测 + 观察 + 档案，让教学建立在真实起点上。", url: tipUrl("新教师 学情分析 方法") },
    { title: "课件避坑指南", domain: "专业知识", stage: "通用", desc: "少即是多：一页一个重点，莫让花哨掩盖内容。", url: tipUrl("新教师 PPT 课件 设计 避坑") },
    { title: "课堂评价语言", domain: "专业能力", stage: "通用", desc: "用具体、可改进的反馈替代「很好 / 不对」。", url: tipUrl("新教师 课堂评价 语言 反馈") },
  ],
  shitu: [
    { title: "怎么选师傅", domain: "专业能力", stage: "通用", desc: "找「肯教、会教、气场合」的师傅，主动绑定成长关系。", url: tipUrl("新教师 师徒结对 选师傅") },
    { title: "师徒听课约定", domain: "专业能力", stage: "通用", desc: "固定频次互听互评，带着问题去、带着改进回。", url: tipUrl("新教师 师徒 听课 互评") },
    { title: "把意见当资源", domain: "专业能力", stage: "通用", desc: "老教师指出问题别抵触，挑能改的先改、对标进阶。", url: tipUrl("新教师 接受 师傅 建议") },
    { title: "青蓝工程参与", domain: "专业理念与师德", stage: "通用", desc: "从一对一带教升级为教师学习共同体，彼此赋能。", url: tipUrl("新教师 青蓝工程 青年教师 培养") },
    { title: "三年成长地图", domain: "专业理念与师德", stage: "通用", desc: "适应期→成长期→胜任期→骨干期，给自己画一张进阶路线。", url: tipUrl("新教师 三年 专业成长 规划") },
  ],
};
