var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    desc:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '吐槽留言',
    })
  },
  submit:function(){
    if(this.data.desc == ""){
      wx.showToast({
        title: '请填写建议',
        icon : "none"
      })
      return;
    }
    app.post(
      "/suggest/add",
      {desc:this.data.desc},
      function(res){
         if(res.data.code == 1){
           wx.showModal({
             title: '提示',
             content: '提交成功',
             success: function (r) {
               wx.navigateBack({

               })
             }
           })
          
         }
      }
    );
  },
  change:function(e){
   
    this.setData({
      desc: e.detail.value
    })
  }

})