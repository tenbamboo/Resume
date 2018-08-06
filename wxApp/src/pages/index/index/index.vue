<template>
  <div class="indexContainer commonContainer">

    <div class="overlay" v-if="overlay"></div>

    <!-- banner 区域-->
    <div class="banner">
      <img src="/static/image/head.jpg" class="head " />
      <div class="info ">
        <p class="titleResume">RESUME</p>
        <p class="enName">{{baseInfo.enName}}</p>
        <p class="title">{{baseInfo.title}}</p>
      </div>
      <img src="/static/image/bg.jpg" class="bannerBg" />
      <div class="bannerOverlay"></div>
    </div>

    <!-- 关于我 区域-->
    <div class="aboutMe area ">
      <p class="title">关于我</p>
      <div class="iconArea">
        <img src="/static/image/icon1.png" />
        <span>{{baseInfo.nameAndSex}}</span>
      </div>
      <div class="iconArea">
        <img src="/static/image/icon2.png" />
        <span>{{baseInfo.birthday}}</span>
      </div>
      <div class="iconArea">
        <img src="/static/image/icon3.png" />
        <span>{{baseInfo.diplomaAndSchool}}</span>
      </div>
      <div class="iconArea">
        <img src="/static/image/icon4.png" />
        <span>{{baseInfo.workAge}} (工作年限)</span>
      </div>
      <div class="iconArea">
        <img src="/static/image/icon5.png" />
        <span>{{baseInfo.location}}</span>
      </div>
      <div class="iconArea">
        <img src="/static/image/icon6.png" />
        <span>{{baseInfo.wantPosition}}</span>
      </div>
      <div class="iconArea">
        <img src="/static/image/icon7.png" />
        <span>{{baseInfo.salary}}</span>
      </div>
    </div>
    <!-- 工作经历 区域-->
    <div class="area">
      <p class="title">工作经验</p>
      <div class="accordion">
        <div class="accordionItem" v-for="(item,index) in workList" :key="index">
          <p class="title" :class="item.isShow == true?'isShow':''" @click="toggleAccordionItem(item)">
            <span>{{item.title}}</span>
          </p>

          <div class="contentWrap" :class="item.isShow == true?'isShow':''" v-if="item.isShow == true">
            <div class="content">
              <div v-for="(child,indexC) in item.projectList" :key="indexC">
                <div class="hr"></div>
                <div class="detail">
                  <font class="fontBold">项目名：</font>{{child.projectName}}
                </div>
                <div class="detail">
                  <font class="fontBold">介绍：</font>{{child.info}}
                </div>
                <div class="detail">
                  <font class="fontBold">担当：</font>{{child.duty}}
                </div>
                <div class="detail">
                  <font class="fontBold">技术：</font>{{child.skill}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 其他作品 区域-->
    <div class="area">
      <p class="title">其他作品</p>
      <div class="accordion">
        <div class="accordionItem" v-for="(item,index) in otherWork" :key="index">
          <p class="title" :class="item.isShow == true?'isShow':''" @click="toggleAccordionItem(item)">
            <span>{{item.title}} {{item.projectList[0].projectName}}</span>
          </p>

          <div class="contentWrap" :class="item.isShow == true?'isShow':''" v-if="item.isShow == true">
            <div class="content">
              <div v-for="(child,indexC) in item.projectList" :key="indexC">
                <div class="hr"></div>
                <!-- <div class="detail">
                  <font class="fontBold">项目名：</font>{{child.projectName}}
                </div> -->
                <div class="detail">
                  <font class="fontBold">介绍：</font>{{child.info}}
                </div>
                <div class="detail">
                  <font class="fontBold">担当：</font>{{child.duty}}
                </div>
                <div class="detail">
                  <font class="fontBold">技术：</font>{{child.skill}}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 技能栈区域-->
    <div class="skillList area">
      <p class="title">技能栈</p>
      <div class="content">
        <div class="item" v-for="(item,index) in skillList" :key="index">{{item}}</div>
      </div>
    </div>

    <!-- 技能关键字区域-->
    <div class="starList area">
      <p class="title">技能关键字</p>
      <div class="content">
        <div class="item" v-for="(item,index) in starList" :key="index">
          <span>{{item.name}}</span>
          <img src="/static/image/star.png" v-for="(itemS,indexS) in item.star" :key="indexS" />
          <img src="/static/image/star_e.png" v-for="(itemS1,indexS1) in (5-item.star)" :key="indexS1" />
        </div>
      </div>
    </div>
    <div class="contactList area">
      <p class="title">联系方式</p>
      <div class="haveData content" v-if="isShowContact">
        <div class="iconArea" @click="callPhone()">
          <img src="/static/image/icon8.png" />
          <span class="link">{{baseInfo.mobilePhone}}</span>
        </div>
        <div class="iconArea" @click="setClipboard(baseInfo.email)">
          <img src="/static/image/icon9.png" />
          <span class="link">{{baseInfo.email}}</span>
        </div>
        <div class="iconArea" @click="setClipboard(baseInfo.wechatNo)">
          <img src="/static/image/icon10.png" />
          <span class="link">{{baseInfo.wechatNo}}</span>
        </div>
        <div class="iconArea" @click="setClipboard(baseInfo.githubUrl)">
          <img src="/static/image/icon11.png" />
          <span class="link">{{baseInfo.githubUrl}}</span>
        </div>
      </div>
      <div class="noData content" v-if="!isShowContact">
        <img src="/static/image/icon12.png" />
        <p>作者暂时隐藏了联系方式，可能最近没有找工作的想法</p>
      </div>
    </div>

    <div class="aboutMe area">
      <p class="title">致谢</p>
      <div class="content">
        <div class="iconArea">
          <img src="/static/image/icon13.png" />
          <span>感谢您花时间阅读我的简历，期待能有机会和您共事。</span>
        </div>
      </div>
    </div>

    <div class="otherOper area">
      <p class="title">您还可以</p>
      <div class="content">
        <div class="flex">
          <button @click="openZSCode" class="appreciateBtn"><img src="/static/image/appreciate.png" />赞赏一下</button>
          <button open-type="share" class="shareBtn"><img src="/static/image/share.png" />分享一下</button>
        </div>

        <div class="flex">
          <button class="downPDF"><img src="/static/image/pdf.png" />下载PDF简历</button>
        </div>

      </div>
    </div>

    <div class="powerBy">
      Powered By
      <span class="link" @click="setClipboard('@tenbamboo/Resume')">GitHub : @tenbamboo/Resume</span>
    </div>

    <div class="dialogWrap" v-if="dialogStatus">
      <div class="dialogOverlay"></div>
      <img src="/static/image/close.png" @click="closeDialog" class="closeBtn" />
      <div class="dialog">
        <div class="appreciateArea">
          <img src="/static/image/code.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cain from '@cain/'
export default {
  data () {
    return {
      overlay: true,
      baseInfo: {},
      otherWork: [],
      skillList: [],
      starList: [],
      workList: [],
      isShowContact: false,
      dialogStatus: false
    }
  },
  async created () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  },
  async mounted () {
    this.getData()
  },
  methods: {
    // 获取数据
    async getData () {
      // 本地方式
      // this.setData(LocalData)

      // 远程方式
      // const self = this
      const res = await Cain.post('haze.liu.json')
      console.log(res)
      this.baseInfo = res.baseInfo

      for (let item of res.workList) {
        item.isShow = false
      }
      for (let item of res.otherWork) {
        item.isShow = false
      }
      this.workList = res.workList
      this.otherWork = res.otherWork
      this.skillList = res.skillList
      this.starList = res.starList
      this.isShowContact = res.isShowContact
      this.overlay = false

      wx.hideLoading()

      wx.showShareMenu({
        withShareTicket: true
      })
    },
    toggleAccordionItem (item) {
      item.isShow = !item.isShow
    },
    // 设置剪切板内容
    setClipboard (val) {
      Cain.setClipboard(val)
    },
    // 打电话
    callPhone (val) {
      Cain.callPhone(this.baseInfo.mobilePhone)
    },
    showDialog (type) {
      this.dialogStatus = true
    },
    closeDialog () {
      this.dialogStatus = false
    },
    // 打开赞赏码
    openZSCode () {
      let url = 'https://www.tenbamboo.com/common/image/code.png'
      wx.previewImage({
        current: url,
        urls: [url]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.indexContainer {
  background: url("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx4BBQUFBwYHDggIDh4UERQeHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHv/AABEIAZwBnAMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APsegYUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFAHxr/wUx/5p/wD9xL/21oEfZVAwoAKACgAoAKACgAoAhcn7WgycbaAJqACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA+Nf+CmP/NP/wDuJf8AtrQI+yqBhQAUAFABQAUAFABQAwoDKJMnIGMUAPoAKACgAoAKACgAPAyaAIPOdyREm4DuaBC+cyHEqbQe46UDJqACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA+Nf+CmP/NP/wDuJf8AtrQI+yqBhQAUAFABQAUAFABQAUAFABQAUAFABQAUAQ3ZIiwO5xQBKqhVCjoKAB1DKVPQ0AR2pJhGexxQBLQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFAEc8nlxkjqelADo/9Wv0FADqACgAoAKACgAoA+Nf+CmP/NP/APuJf+2tAj7KoGFABQAUAFABQAUAFABQAUAFABQAUAFABQAyVPMjK/lQBGk20bZQVYd/WgQPNvGyHLE9/SgZJEnlxhfSgB9ABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAVJMyh5P4V4WgRZj/1a/QUDHUAFABQAUAFABQB8a/8ABTH/AJp//wBxL/21oEfZVAwoAKACgAoAKACgAoAKACgAoAKACgAoAKACgBCAeoBoAAAOgAoAWgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAILl+kYOC3U+goAJSgtiisDgetAiWP/Vr9BQMdQAUAFABQAUAFAHxr/wUx/5p/wD9xL/21oEfZVAwoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAIpBKG3odw7qaAHRSq/A4buD1oAfQAUAFABQAUAFABQAUAFABQAUAFABQAxoo2YllyT70AJ5EX9wfnQA8AAADoKAFoAKACgAoAKACgD41/wCCmP8AzT//ALiX/trQI+yqBhQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFADJIlfnow6EdaACISAEOQcdCO9AD6ACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA+Nf+CmP/ADT/AP7iX/trQI+yqBhQAjsqLuY4FAFcyyn96F/djt60CLCsGUMDkGgYtABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFAHxr/wUx/5p/8A9xL/ANtaBH2VQMKAK9wuJBIwLJ6elAiYsuzcSNuKBkNtnzG2A+X70CLFAwoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgD41/4KY/8ANP8A/uJf+2tAj7KoGFACEAggjINAEAtzu2sxMYOQKBFgAAYAwKBhQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQB8a/8ABTH/AJp//wBxL/21oEfZVAwoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAPjX/gpj/zT/8A7iX/ALa0CPsqgYUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFAFeWcrIVVQcdc0CJ0YMoYdCKBi0AFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAfGv/BTH/mn/wD3Ev8A21oEfZVAwoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAI5IUdtxBz3wetADwABgdBQAtABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAjHCk4zgUAJG29A2MZoAdQAUAFABQAUAFABQAUAFAHxr/wUx/5p/wD9xL/21oEfZVAwoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAhtf9WV/usRQBNQAUAFABQAUAFABQAUAFAHxr/wUx/5p/wD9xL/21oEfZVAwoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAhjnDSFTwD90+tAE1ABQAUAFABQAUAFABQAUAFABQBDFkTSjscGgCagAoAKACgAoAKACgAoAKAPjX/gpj/zT/wD7iX/trQI+yqBhQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFAENyxwI1+838qAFaFTEE9OhoASCQ58uThx+tAE1ABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQB8a/wDBTH/mn/8A3Ev/AG1oEfZVAyEpOSf3oAz2FAD4lZQQzlsnvQA+gAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgCCdWV/OTkjqPagCQSKY/MzxQAy3UsTK3VunsKAJqACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgD41/4KY/8ANP8A/uJf+2tAj7KoGFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFAFd4Dv+XhGPzCgRYHAwKBhQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAfGv/BTH/mn/AP3Ev/bWgR9lUDCgAoAKACgAoAKACgAoAill8tlBXIPpQA9JEcfK2aAHUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAfGv/BTH/mn/AP3Ev/bWgR9lUDCgAoAKACgAoAKACgAoAhf/AI+o/oaAEnjiA3n5D6igBbYyFcufl7Z60ATUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFACEgdSB9aAAEHoQaAFoAKAPjX/gpj/wA0/wD+4l/7a0CPsqgYUAFABQAUAFABQAUAFAFeVwlzuPZaBCxxs7eZN+C+lAyegAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAZK/lxlvyoAjSHcN8uWY9vSgQPDtG+LKsO3rQMkiffGG9aAH0AfGv/BTH/mn/wD3Ev8A21oEfZVAwoAKACgAoAKACgAoAKAGeWvmmQ8nt7UAPoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgCK4RnjAUZIOaAJaACgAoAKAPjX/gpj/zT/8A7iX/ALa0CPsqgYUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFADZHVACx6nFAAjq4yrA0AOoAKACgAoAKACgAoAKACgAoAKACgAoAa4Yqdpwe1ADLfeVLOTknoe1AEtABQAUAFABQAUAFABQAUAFABQAUAFAHxr/wUx/5p/wD9xL/21oEfZVAwoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAIbiNpMbSOOxoAW2Qoh3DBJoAloAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA+Nf+CmP/ADT/AP7iX/trQI+yqBhQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAfGv8AwUx/5p//ANxL/wBtaBH2VQMKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgD41/4KY/80/8A+4l/7a0CPsqgYUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFAHxr/wAFMf8Amn//AHEv/bWgR9lUDCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA+Nf+CmP/NP/wDuJf8AtrQI+yqBhQAUAFABQAUAFABQAUAFABQAUAFAEcsgQYAyx6CgB46DIxQAtABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAfGv/AAUx/wCaf/8AcS/9taBH2VQMKACgAoAKACgAoAKACgAoAKACgCKWXB2INzn9KAFii2fMx3OepoAkoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAGs6L95gPxoAcORkUAFABQAUAFABQAUAFABQAUAFABQAUAfGv/BTH/mn/wD3Ev8A21oEfZVAwoAKACgAoAKACgAoAKACgAoAKAGqiqSQACetADqACgAoAKACgAoAKACgAoAKAEdgilmOBQAtABQAUAFABQAUAFABQAUAFABQAUAQTZeZYgSBjJxQA5YIh/Dn60AMUmB9jcoeh9KBFigYUAFABQAUAFABQAUAFABQAUAFAHxr/wAFMf8Amn//AHEv/bWgR9lUDCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgCG8/1X4igCagAoAKACgAoAKACgAoAKACgAoAKAK+fLuSX6PwD6UCLFAyCT57hE7L8xoET0DCgAoAKACgAoAKACgCvek7VwTQIli2iMKpBxxxQMfQAUAfGv8AwUx/5p//ANxL/wBtaBH2VQMKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgBGZVGWIAoAZ50X98UARXMiPHhWBOaBFmgYUAFABQAUAFABQAUAFABQAUAFADXVXXaw4oAiEDYw0rY9BQBJHEkeSucnuTQA+gAoAKACgAoAKACgAoAiuVUxljnKg4oAdCuyIDv3oAfQAUAfGv/BTH/mn/wD3Ev8A21oEfZVAwoAKACgAoAQso6kD6mgBqyxs20MCaAH0AFABQAUAFABQAUAFABQAUAFABQAUAFACMqt95QfqKAE8tP7i/lQAeWn9xfyoAdQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAI6hlwelAC0AFABQB8a/8ABTH/AJp//wBxL/21oEfZVAwoAKACgAoAguFBmjJGQTg0CCVVjliKgAZxxQBPQMKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAPjX/gpj/zT/wD7iX/trQI+yqBhQAUAFABQBDd/6sN/dYGgAu+YQw7EGgCYHIzQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAJkZx3oAWgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA+Nf+CmP/NP/wDuJf8AtrQI+yqBhQAUAFABQAycZhYe1AEJkLw7BGx4xnFAieLPlruGDigY6gAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgCKWNmkVlYLtoAloAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAPjX/gpj/zT/8A7iX/ALa0CPsqgYUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFAHxr/wUx/5p/wD9xL/21oEfZVAwoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAPjX/AIKY/wDNP/8AuJf+2tAj7KoGFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAI5IUlRk9hQA2KRZFyOD3HpQA+gAoAKACgAoAKACgAoAKAPjX/AIKY/wDNP/8AuJf+2tAj7KoGFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFAEUsZ3eZGcOP1oAWKQOMdGHUUASUAFABQAUAFABQAUAFAHxr/wAFMf8Amn//AHEv/bWgR9lUDCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAK0s0iSFfl46cUCLCkMoYdCKBi0AFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQA3Yu/fj5vWgB1ABQAUAFABQAUAFABQB8a/8ABTH/AJp//wBxL/21oEfZVAwoAKACgAoAKACgAoAKACgAoAKACgAoAKACgBrIjHLKCfcUAKAAMAACgBaACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA+Nf8Agpj/AM0//wC4l/7a0CPsqgYUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFAHxr/wUx/5p/8A9xL/ANtaBH2VQMKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAr3BkQ5DnYfQdKBCOhEZczsRjt3oAfbIVTc2ct/KgZNQAUAFABQAUAFABQAUAFABQAUAFABQBDOzF1iU43dTQA2RGhHmI7EDqCetAiwORmgYUAFABQAUAfGv/BTH/mn/AP3Ev/bWgR9lUDCgBu9N+zcN3pQA6gAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgBCAQQRkGgCv5LeYEzmPOf/AK1AizQMKACgAoAKACgAoAKACgAoAKACgAoAKAI5oy+GU4ZehoAYUlkwJCoUdh3oAnoAKACgAoAKAPjX/gpj/wA0/wD+4l/7a0CPsqgYUAReQvm78nrnHvQBLQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFAHxr/AMFMf+af/wDcS/8AbWgR9lUDCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA+Nf+CmP/NP/APuJf+2tAj7KoGFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQB8a/8ABTH/AJp//wBxL/21oEfZVAwoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAPjX/gpj/zT/8A7iX/ALa0CD/huX/ql/8A5X//ALnoAP8AhuX/AKpf/wCV/wD+56AD/huX/ql//lf/APuegA/4bl/6pf8A+V//AO56AD/huX/ql/8A5X//ALnoAP8AhuX/AKpf/wCV/wD+56AD/huX/ql//lf/APuegA/4bl/6pf8A+V//AO56AD/huX/ql/8A5X//ALnoAP8AhuX/AKpf/wCV/wD+56AD/huX/ql//lf/APuegA/4bl/6pf8A+V//AO56AD/huX/ql/8A5X//ALnoAP8AhuX/AKpf/wCV/wD+56AD/huX/ql//lf/APuegA/4bl/6pf8A+V//AO56AD/huX/ql/8A5X//ALnoAP8AhuX/AKpf/wCV/wD+56AD/huX/ql//lf/APuegA/4bl/6pf8A+V//AO56AD/huX/ql/8A5X//ALnoAP8AhuX/AKpf/wCV/wD+56AD/huX/ql//lf/APuegA/4bl/6pf8A+V//AO56AD/huX/ql/8A5X//ALnoAP8AhuX/AKpf/wCV/wD+56AD/huX/ql//lf/APuegA/4bl/6pf8A+V//AO56AD/huX/ql/8A5X//ALnoAP8AhuX/AKpf/wCV/wD+56AD/huX/ql//lf/APuegA/4bl/6pf8A+V//AO56AD/huX/ql/8A5X//ALnoAP8AhuX/AKpf/wCV/wD+56AD/huX/ql//lf/APuegA/4bl/6pf8A+V//AO56AD/huX/ql/8A5X//ALnoAP8AhuX/AKpf/wCV/wD+56AD/huX/ql//lf/APuegA/4bl/6pf8A+V//AO56AD/huX/ql/8A5X//ALnoAP8AhuX/AKpf/wCV/wD+56AD/huX/ql//lf/APuegA/4bl/6pf8A+V//AO56AD/huX/ql/8A5X//ALnoAP8AhuX/AKpf/wCV/wD+56AD/huX/ql//lf/APuegA/4bl/6pf8A+V//AO56AD/huX/ql/8A5X//ALnoAP8AhuX/AKpf/wCV/wD+56AD/huX/ql//lf/APuegDxr9pj45f8AC6P+Ef8A+KX/ALC/sf7T/wAv/wBp87zvK/6Zptx5Xvnd2xyAf//Z")
    repeat;
  font-size: 15px;

  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(48, 53, 56, 0.8);
    z-index: 2000;
  }

  .overlayText {
    z-index: 2001;
    position: absolute;
    top: 48%;
    color: #fff;
  }

  .link {
    color: #4395ff;
  }

  .fontBold {
    font-weight: 900;
  }

  .hr {
    border-top: 1px solid #3d3b3b;
    height: 1px;
    margin: 10px;
  }

  .banner {
    position: relative;
    margin-bottom: 30px;
    .bannerBg {
      width: 100%;
      height: 300px;
    }
    .bannerOverlay {
      width: 100%;
      height: 300px;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(41, 41, 41, 0.2);
      z-index: 1;
    }
    .info {
      color: #fff;
      position: absolute;
      z-index: 3;
      text-align: center;
      width: 100%;
      top: 85px;
    }
    .titleResume {
      padding-bottom: 4px;
      margin-bottom: 5px;
      font-size: 22px;
      font-weight: 900;
      &::after {
        border-bottom: 2px solid #fff;
        content: " ";
        width: 100px;
        height: 2px;
        display: block;
        margin-left: 38%;
      }
    }
    .enName {
      font-size: 18px;
    }
    .title {
      font-size: 18px;
    }
    .head {
      position: absolute;
      top: 260px;
      left: 40%;
      width: 80px;
      height: 80px;
      border: 2px solid #fff;
      border-radius: 50%;
      z-index: 4;
    }
  }

  .area {
    padding: 10px;
    color: #000;
    margin-top: 10px;
    & > .title {
      padding-bottom: 10px;
      border-bottom: 1px solid #3d3b3b;
      margin-bottom: 10px;
      font-size: 20px;
      &::before {
        content: " ";
        display: inline-block;
        border-left: 4px solid #3d3b3b;
        width: 1px;
        height: 20px;
        margin-right: 10px;
        margin-left: 5px;
        margin-top: -4px;
        vertical-align: middle;
      }
    }
  }

  .aboutMe {
    .iconArea {
      margin-bottom: 10px;
      img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-right: 10px;
        display: inline-block;
      }
    }
  }
  .contactList {
    .iconArea {
      margin-bottom: 10px;
      img {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
    .noData {
      text-align: center;
      font-size: 15px;
      img {
        display: inline-block;
        width: 100px;
        height: 100px;
      }
    }
  }
  .accordion {
    .accordionItem {
      margin-bottom: 15px;
      padding: 5px;
      border: 1px solid #666161;
      border-radius: 4px;
      .title {
        display: flex;
        padding: 5px;
        span {
          flex: 1;
        }
        &::after {
          content: " ";
          background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABnklEQVR4Xu3azVEDMQwFYGkpAEpIB3CNw9YAJUALNECogBJCB6SHhd0caQXusZi98DNkOMnSc6wUYOt9lvbgmKnxHzeenwIgOqBxgRiBxhsgPoIxAjECygIppYuO6J6IFizyMEzTVnkL1eXUR6BPaUvMV19VitwO4/ikWrXiYuoAl6vVGxOd/6oRGEEdoF8ur6nrnv8cEiiCOsAcvE/phpg3NSAUAagJoRhALQhFAWpAKA6AjmACgIxgBoCKYAqAiGAOgIbgAoCE4AaAguAKgIDgDuCNAAHgiQAD4IUABeCBAAfwH0Le7+9ed7tHxRsx3P8FDl6q5Pw+TNNZOwBEG+LvJhWRj5dxPD16gJ+nLyI0I7AI5ZyPfwSs7xOhPoLW4edRggHwCA8D4BUeAsAzvDuAd3hXAITwbgAo4V0AkMKbA6CFNwVADG8GgBreBAA5fHEA9PBFAWoIXwyglvBFAJp/JBXP5Fp/KDk/lT0hWgvzgnNeN/dUVvPG1mItmCsxi7CH9ggAL3mUfaMDUE7Cq47oAC95lH2jA1BOwquOTy3GPVCReXKAAAAAAElFTkSuQmCC")
            no-repeat;
          background-size: 100% 100%;
          width: 20px;
          height: 20px;
          display: inline-block;
          vertical-align: middle;
          transition: 0.5s all;
        }
        &.isShow::after {
          transform: rotate(90deg);
        }
      }
      .contentWrap {
        margin-top: 10px;
        animation: all 0.7s;
        min-height: 100px;
        .content {
          line-height: 30px;
          padding: 5px;
          .detail {
            margin: 20px 0;
          }
        }
      }
    }
  }

  .skillList {
    .content {
      & > div {
        padding: 5px;
      }
    }
  }

  .skillList .content .item {
    padding: 5px;
  }

  .skillList .content .item:first-child,
  .starList .content .item:first-child {
    padding-top: 0;
  }

  .starList .content .item {
    padding: 5px;
    display: flex;
    span {
      margin-right: 10px;
      width: 100px;
    }
    img {
      width: 20px;
      height: 20px;
      vertical-align: middle;
      margin-right: 5px;
    }
  }

  .otherOper {
    .content {
      margin: 10px;
      .flex {
        display: flex;
        button {
          flex: 1;
          margin-right: 10px;
          display: block;
          text-align: center;
          color: #fff;
          border-radius: 6px;
          margin-top: 20px;
          font-size: 14px;
          img {
            width: 20px;
            height: 20px;
            display: inline-block;
            vertical-align: middle;
            margin-right: 6px;
            margin-top: -3px;
          }
        }
        .shareBtn {
          background-color: #3585cf;
        }

        .appreciateBtn {
          background-color: #3eb94e;
        }
        .downPDF {
          background-color: #444444;
        }
      }
    }
  }
  .dialogWrap {
    overflow: hidden;
    .dialogOverlay {
      overflow: hidden;
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(41, 42, 43, 0.8);
      z-index: 100;
    }
    .closeBtn {
      width: 30px;
      height: 30px;
      position: fixed;
      top: 15%;
      right: 9%;
      z-index: 1002;
    }
    .dialog {
      padding: 10px;
      border-radius: 10px;
      position: fixed;
      width: 60%;
      min-height: 200px;
      border-radius: 6px;
      background-color: #fff;
      z-index: 1001;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .appreciateArea {
    img {
      width: 100%;
    }
  }

  .powerBy {
    text-align: center;
    padding-bottom: 20px;
    font-size: 14px;
  }
}
</style>
