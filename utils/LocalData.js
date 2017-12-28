const LocalData = {
  isShowContact: true, //是否显示联系方式
  workList: [ //工作经验
    {
      title: '倍通健康（2017年9月 ~ 至今）',
      projectList: [
        {
          projectName: '内部流程项目',
          duty: '整理优化并重写项目代码（ES6）',
          info: '内部流程项目。',
          skill: 'Java,Vue'
        },
        {
          projectName: '某医疗社区（公众号）',
          duty: '前台架构，PC端前端业务代码',
          info: '维系医院、医生、护士、病友的社区。',
          skill: 'Java,Vue,ES6,Webpack'
        },
       
      ],
    },
    {
      title: '东软集团（2016年3月 ~ 2017月09月）',
      projectList: [
        {
          projectName: '上海福利彩票即开票系统',
          duty: '前台架构，组件二次封装，封装自有UI库',
          info: '彩票行业，本系统囊括即开票（刮刮乐）的整个生命周期，主要包含：创建、印刷、分发、调拨、兑奖、销毁等。',
          skill: 'Java,Jquery,Pjax'
        },
        {
          projectName: '蓝熙健康、绿城健康社区',
          duty: '前台架构，组件二次封装，与客户协调和沟通需求，细化需求，并抽离需求给相关开发人员',
          info: '医疗行业，使用相关检测设备（血糖仪，血压仪等）检测之后上传到云端，再推送到设备的关注者，让关注者实时了解使用的数据。 以此衍生附属功能，比如月度报表、分析数据并给出改善病情的建议、专属家庭医生和健康管理师实时解答相关问题等功能。',
          skill: 'Java,Jquery,Pjax'
        },
        {
          projectName: '彩票O2O项目',
          info: '通过Cordova和相关Plugin来封装成IOS和Android的APP,并实现门店端和用户端整个前端页面逻辑',
          duty: '调研需求，前台架构，组件二次封装，后期的维护',
          skill: 'Cordova,Java,Jquery,Pjax'

        },
      ],
    },
    {
      title: '大连楼兰（2015年5月 ~ 2016年3月）',
      projectList: [
        {
          projectName: '公司内部微信服务号',
          duty: 'Demo原型编写，前端业务代码',
          info: '公司内部流程',
          skill: 'Java,Jquery'
        },
        {
          projectName: '内部项目',
          duty: '优化之前老代码，提升代码的可阅读性，并已插件的形式支持各个模块',
          info: '内部流程项目，主要是维护代码',
          skill: 'Java,Jquery'
        },
        {
          projectName: '预言性项目（PICC合作）',
          duty: '复用之前的插件来开发，前端开发，前端简单架构',
          info: '此项目是预言性项目，公司和保险公司合作，监控车辆详细数据，并生成第二年的保单。',
          skill: 'Java,Jquery'
        },
      ],
    },
    {
      title: '博彦科技（2014年3月 ~ 2015年5月）',
      projectList: [
        {
          projectName: '外派IBM',
          duty: '前端业务代码',
          info: '内部孵化项目，通过WorkLight 来 Hybrid 开发 想法池 的需求',
          skill: 'Cordova,Java,Jquery'
        },

      ],
    },
    {
      title: '中软国际（2013年3月 ~ 2014年3月）',
      projectList: [
        {
          projectName: '中信证劵对外服务平台',
          duty: '按模块开发（前后端）',
          info: '本项目是为各个劵商提供信息和咨询的分析上传和下载，通过客户端来自动分发信息。 ',
          skill: 'Flex,Java'
        },
        {
          projectName: '英大财险微信公众平台',
          duty: '前端业务代码',
          info: '本项目通过通过微信关注英大财险公众平台来投保车险等。 ',
          skill:'JqueryMobile,Jquery,Java'
        },

      ],
    },
  ],
  baseInfo: { //基础信息
    enName: 'Haze.Liu', //英文名
    title: 'FE Engineer',  //职位英文名
    nameAndSex: '刘心远 / 男', //中文名/性别
    birthday: '1989/10/14', //生日
    diplomaAndSchool: '本科 / 大连海洋大学计算机系', //学历/学校
    workAge: '5年', //工作年限
    location: '大连',  //工作地点
    wantPosition: '前端工程师、全栈工程师', //期望职位
    salary: '12.5K ~ 15K', //期望薪酬
    mobilePhone: '13478670140',//移动手机
    email: 'liu19891014@163.com',//邮箱
    wechatNo: 'mc_fly',//微信号
    github: '@tenbamboo', //github 用户名
    githubUrl: 'https://github.com/tenbamboo', //github主页
  },
  skillList: [  //技能清单
    'Web开发：Java / NodeJs',
    'Web框架：SSI / express',
    'CSS框架：Bootstrap / PureCSS / SASS',
    'JS框架：Jquery / AngularJS / Vue',
    '构建工具：Webpack / Bower  / Grunt / NPM',
    'Hybird开发：Cordova / Ionic',
    '数据库相关：MySQL / Oracle / IndexedDB',
    '版本管理：Svn / Git',
    '测试：Selenium For Java / Junit',
    '微信：公众号开发 / 小程序开发',
    '图表工具：HighChars / EChars / D3'
  ],
  starList: [ //技能关键字start 1-5
    { name: 'JavaScript', star: 4 },
    { name: 'Css3', star: 4 },
    { name: 'Html5', star: 4 },
    { name: 'Jquery', star: 4 },
    { name: 'Vue', star: 4 },
    { name: 'Bootstrap', star: 4 },
    { name: 'Cordova', star: 4 },
    { name: 'Git/SVN', star: 4 },
    { name: 'Charts', star: 4 },
    { name: 'Webpack', star: 3 },
    { name: 'AngularJS', star: 3 },
    { name: 'Java', star: 3 },
    { name: 'NodeJs', star: 3 },
    { name: 'Ionic', star: 3 },
    { name: 'Mysql', star: 3 },
    { name: 'React', star: 2 }
  ]
};
module.exports = LocalData