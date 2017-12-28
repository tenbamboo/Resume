Page({
  data: {
    isShowContact:true, //是否显示联系方式
    workList: [ //工作经验
      {
        title: '标题',
        content: ' 我是内容点点滴滴的离开家了顺利打开房间里思考等级分类考试的解放路口建设路口的分机老师的发多少收到 适得府君书离开大家 时代峰峻老司机代理费 似懂非懂数据来看',
        isShow: false,
      },
      {
        title: '标题2',
        content: ' 2我是内容点点滴滴的离开家了顺利打开房间里思考等级分类考试的解放路口建设路口的分机老师的发多少收到 适得府君书离开大家 时代峰峻老司机代理费 似懂非懂数据来看2',
        isShow: false,
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
      mobilePhone:'13478670140',//移动手机
      email:'liu19891014@163.com',//邮箱
      wechatNo:'mc_fly',//微信号
      github:'@tenbamboo', //github 用户名
      githubUrl:'https://github.com/tenbamboo', //github主页
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
  },
  onReady: function (e) {

  },
  //打开/关闭手风琴项
  toggleAccordionItem(e) {
    let item = this.data.workList[e.currentTarget.dataset.index];

    item.isShow = !item.isShow

    this.setData({
      workList: this.data.workList
    })
  },
  //设置剪切板内容
  setClipboard(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.content,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  //打电话
  callPhone(){
    wx.makePhoneCall({
      phoneNumber: this.data.baseInfo.mobilePhone
    })
  }

})