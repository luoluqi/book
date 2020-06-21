App({
  onLaunch: function () {
    console.log('App Launch')

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        env: 'book-e9sdz',
        traceUser: true,
      })
    }

  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  baseUrl: "https://www.luoluqi.top",
 // baseUrl: "http://localhost",

  globalData: {
    userInfo: null,
    login:null
  },
 
  getUserInfo: function (cb) {
    
  },
  getOpenid:function(fn){
    var self = this;
    if(this.globalData.login){
      fn(this.globalData.login);
    }else{
      var self = this;
      wx.login({
        success: function (res) {
         
          self.post(
            "/wechat/login",
            { code: res.code },
            function (d) {

              self.globalData.login = d.data;
              fn(d.data);
            }
          );
        }
      })
    }
    
  },
  post:function(url,param,success){
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: this.baseUrl + url,
      data: param,
      header: {
        // 'Content-Type': 'application/json'
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        success(res);
      },
      fail: function (e) {
       wx.showToast({
         title: '请求出错！',
       });
      },
      complete: function () {
      
      
      }
    })
  },
  postJson: function (url, param, success){

    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: this.baseUrl + url,
      data: param,
      header: {
        'Content-Type': 'application/json'
        //"Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        success(res);
      },
      fail: function (e) {
        wx.showToast({
          title: '请求出错！',
        });
      },
      complete: function () {
      
        
      }
    })
  },
  history:{
    key:"history",
    add:function(p){
      var dic = wx.getStorageSync(this.key) || [];
      for(var i = dic.length - 1;i>=0;i--){
        var temp = dic[i];
        if (temp.bookId == p.bookId && temp.chapterId == p.chapterId){
            dic.splice(i,1);       
        }
      }
      dic.unshift(p);
    
      for (var i = dic.length - 1; i >= 20; i--){
        dic.splice(i, 1);
      }
      wx.setStorageSync(this.key, dic);
    },
    getList: function () {
      return wx.getStorageSync(this.key) || [];
    }
  },
  cart: {
    key: "cart",
    add: function (p) {
     
      var dic = wx.getStorageSync(this.key) || [];
      var isExist = false;
      for(var temp of dic){
        if(temp.id == p.id && temp.styleId == p.styleId && temp.sizeId == p.sizeId){
          isExist = true;
          temp.num ++;
        }
      }
      if(!isExist){
        p.num = 1;
        p.selected = true;
        dic.push(p);
      }
      wx.setStorageSync(this.key, dic);
    },
  
    remove: function (p) {
      var dic = wx.getStorageSync(this.key) || [];
      for(var i = 0;i<dic.length;i++){
        if (dic[i].id == p.id && dic[i].styleId == p.styleId && dic[i].sizeId == p.sizeId){
          dic.splice(i,1);
        }
      }
      wx.setStorageSync(this.key, dic);
    },
    getNum: function () {
      var n = 0;
      var dic = wx.getStorageSync(this.key) || [];
      for(var p of dic){
        if (p.selected){
          n += p.num;
        }
       
      }
      
      return n;
    },
    setNum: function (p, n) {
      var dic = wx.getStorageSync(this.key) || [];
      for(var i = 0;i<dic.length;i++){
        if (dic[i].id == p.id && dic[i].styleId == p.styleId && dic[i].sizeId == p.sizeId){
          if(n > 0){
            dic[i].num = n;
          }else{
            dic.splice(i,1);
          }
        }
      }
      wx.setStorageSync(this.key, dic);
    },
    getList: function () {
      return wx.getStorageSync(this.key) || [];
    },
    clear: function () {
      wx.removeStorageSync(this.key);
    },
    select: function (p) {
      var dic = wx.getStorageSync(this.key) || [];
      for (var i = 0; i < dic.length; i++) {
        if (dic[i].id == p.id && dic[i].styleId == p.styleId && dic[i].sizeId == p.sizeId) {
          dic[i].selected = p.selected;
        }
      }
      wx.setStorageSync(this.key, dic);
    },
    selectAll: function (selected){
      var dic = wx.getStorageSync(this.key) || [];
      for (var i = 0; i < dic.length; i++) {
       
        dic[i].selected = selected;
        
      }
      wx.setStorageSync(this.key, dic);
    }
    
  },
 
})
