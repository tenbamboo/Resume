# 微信小程序 个人简历


随着小程序生态的不断完善，并对个人开发者的一系列红利，我感觉是时候码一波小程序了，后续应该还会出一些有趣的小程序，并开源出来，小弟代码尽量写的好看点，如果有什么问题大家可以提Issue。

## 特点

1. 无需服务器支持，可纯静态，也可半静态。

2. 可替换模板（后续实现....）

3. 通过小程序搜索引擎直接搜索到您的简历，比如：小明的个人简历

4. etc....


## 用法

简历中的所有内容都是通过data set 来进行的，这样设计可以把这些data放置到远程服务器，并随时配置一些选项
所以先说下配置项


### 配置项

```javascript
{
     isShowContact:true, //是否显示联系方式
     workList: [ //工作经验
       {
        title: 'xxx公司（2016年9月 ~ 至今）', //公司名
        projectList: [ // 项目罗列
        {
          projectName: '内部流程项目',//项目名称
          duty: '整理优化并重写项目代码', //项目职责
          info: '内部流程项目。', //项目介绍
          skill: 'Java,Vue' //项目使用的核心技术
        },
      ],
    },
    ],
    baseInfo: { //基础信息
      enName: 'Tom', //英文名
      title: 'FE Engineer',  //职位英文名
      nameAndSex: '王小二 / 男', //中文名/性别
      birthday: '1999/12/11', //生日
      diplomaAndSchool: '本科 / 家里蹲大学计算机系', //学历/学校
      workAge: '5年', //工作年限
      location: '北京',  //工作地点
      wantPosition: '前端工程师、全栈工程师', //期望职位
      salary: '12.5K ~ 15K', //期望薪酬
      mobilePhone:'13255533333',//移动手机
      email:'test@163.com',//邮箱
      wechatNo:'wexin',//微信号
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
}

```

## 其他

希望大家通过这个小工具，能快速找到心仪的工作,如果觉得不错，您可以赞赏我。


## License
http://www.opensource.org/licenses/mit-license.php

