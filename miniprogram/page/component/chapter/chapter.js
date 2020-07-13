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
    windowWidth: 0,
    originalTop:0,
    translationTop:0,
    offset: 50
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

      wxparse.wxParse('original', 'html', '<div>' + chapter.original + '</div>', self);
      if (chapter.translation){
        wxparse.wxParse('translation', 'html', '<div>' + chapter.translation + '</div>', self);
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
    
    if(index == 0){
      this.data.translationTop = this.data.scrollTop;
      this.data.scrollTop = this.data.originalTop
    
    }else if(index == 1){
      this.data.originalTop = this.data.scrollTop;
      this.data.scrollTop = this.data.translationTop 
    }

    wx.pageScrollTo({
      scrollTop: this.data.scrollTop,
      duration: 100
    })
  },

  prev:function(){
    var top = this.data.scrollTop - this.data.windowHeight + 60 + this.data.offset;
    if(top < 0){
      top = 0;
    }
    this.setData({
      scrollTop: top
    });
    wx.pageScrollTo({
      scrollTop: this.data.scrollTop,
      duration: 500
    })
  },

  next:function(){
    this.setData({
      scrollTop: this.data.scrollTop + this.data.windowHeight - 60 - this.data.offset
    });
    wx.pageScrollTo({
      scrollTop: this.data.scrollTop,
      duration: 500,
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