let wxparse = require("../../../util/wxParse.js");
var app = getApp();
const chapterApi = require('../../../api/chapterApi')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapter:{},
    active:0,
    scrollTop:0,
    windowHeight:0,
    windowWidth: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var id = options.id;
    chapterApi.getChapterDetail({
      id:id
    }).then(res => {
      var chapter = res;

      wx.setNavigationBarTitle({
        title: chapter.name
      })

      wxparse.wxParse('original', 'html', chapter.original, self);
      if (chapter.translation){
        wxparse.wxParse('translation', 'html', chapter.translation, self);
      }
     
    })
 

    wx.getSystemInfo({
      success:function(res){
     
        console.log(res);
        self.setData({
          windowHeight: res.windowHeight,
           windowWidth: res.windowWidth
        });
      }
    });
    
  },
  change:function(e){
    var index = e.currentTarget.dataset.index;
    this.setData({
      active:index
    });
  },

  prev:function(){
    var top = this.data.scrollTop - this.data.windowHeight + 60;
    if(top < 0){
      top = 0;
    }
    this.setData({
      scrollTop: top
    });
    wx.pageScrollTo({
      scrollTop: this.data.scrollTop,
      duration: 1000
    })
  },

  next:function(){
    this.setData({
      scrollTop: this.data.scrollTop + this.data.windowHeight - 60
    });
    wx.pageScrollTo({
      scrollTop: this.data.scrollTop,
      duration: 1000,
      success:function(val){
          console.log(val,"success");
      },
      fail:function(){
          console.log("fail");
      }
    })
  },
  dianji:function(e){
    console.log(e);
    var x = e.detail.x;
    if (x < this.data.windowWidth / 2){
      this.prev();
    }else{
      this.next();
    }
  },
  onPageScroll: function (e) {
   
    this.setData({
      scrollTop: e.scrollTop
    });
  },

  onShareAppMessage: function () {

  }


 
})