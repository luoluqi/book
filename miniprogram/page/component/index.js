var app = getApp();
const bookApi = require('../../api/bookApi')
Page({
  data: {
    bookList: [],
   
    pageNum: 1,
    pageSize:5,
    isMore: true,
    isLoading: false,
    loadingText: "正在加载更多",

    search:""
  },
 
  onLoad: function (options){
   // this.getBookList(this.data.pageNum);
  
  
  },
  onShareAppMessage: function () {

  },



  searchInput:function(e){
    this.setData({
      search: e.detail.value
    });
  },

  search:function(){

    this.setData({
      bookList: [],
      isMore:true,
      loadingText: "正在加载更多"
    });

    this.getBookList(1);

    
    
  },

  onReachBottom: function () {
    if (!this.data.isMore) {
      return;
    }

    this.setData({
      isLoading: true
    });
    this.data.pageNum++;
    this.getBookList( this.data.pageNum);


  },

  getBookList: function ( pageNum) {
    this.setData({
     
      pageNum: pageNum
    })
    var param = {};
    
    var name = this.data.search;
    if (name != "" && name != null) {
      name = name.replace(/\s/g, "");
      param.name = name;
    }

    param.pageNum = pageNum;
    param.pageSize = this.data.pageSize;

 
   

    var self = this;
    bookApi.getBook(param).then(res => {
      var list = res;
      if (list.length == 0) {
        self.setData({
          isLoading: true,
          loadingText: "没有更多了"
        });
        self.data.isMore = false;
        return;
      }


      self.setData({
        bookList: self.data.bookList.concat(list),
        isLoadding: false
      });
    })

  },
  toBook:function(e){
    var id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: 'book/book?id=' + id
    })
  }
 
})