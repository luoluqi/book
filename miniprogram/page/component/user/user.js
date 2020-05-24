// page/component/new-pages/user/user.js
var app = getApp();
Page({
  data:{
    historyList:[],
    isShang:false,
    tempFilePath:""
  },

  onLoad(){

    

    this.drawPay();
  },
  onShow(){
   
    var historyList = app.history.getList();
    console.log(historyList);
    this.setData({
      historyList: historyList 
    });  
  
  },
  toBook:function(e){
    var index = e.currentTarget.dataset.index;
    var history = this.data.historyList[index];
    var bookId = history.bookId;
    var pageNum = history.pageNum;
    wx.navigateTo({
      url: '../book/book?id=' + bookId + '&pageNum=' + pageNum
    })
  },
  toChapter:function(e){
    var id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../chapter/chapter?id=' + id
    })
  },
  suggest:function(){
    wx.navigateTo({
      url: '../suggest/suggest'
    })
  },

  drawPay:function(){
    var self = this;

    var context = wx.createCanvasContext('myCanvas');

    context.drawImage("/image/zhifu.jpg", 0, 0, 375, 513)

    //绘制图片
    context.draw();
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          console.log(tempFilePath);
         
          self.setData({
            tempFilePath: tempFilePath
          });
         
        }
      });
    }, 500);
  },

  showPay:function(){


    
    wx.previewImage({

      urls: [this.data.tempFilePath] // 需要预览的图片http链接列表

    })
   
  },
  onShareAppMessage: function () {

  },

})