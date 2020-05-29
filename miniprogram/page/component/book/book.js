const bookApi = require('../../../api/bookApi')
const chapterApi = require('../../../api/chapterApi')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:{},
    bookId:0,
    chapterList:[],
    pageNum: 1,
    pageSize: 10,
    isMore: true,
    isLoading: false,
    loadingText: "正在加载...",

    upPageNum:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var bookId = options.id;
    this.setData({ bookId: bookId});
    if(options.pageNum){
      this.setData({ 
        pageNum: options.pageNum,
        upPageNum: options.pageNum
      });
    }
    bookApi.getBookDetail({
      id:bookId
    }).then(res => {
      self.setData({
        book:res
      });

      wx.setNavigationBarTitle({
        title: res.name
      });

      self.getChapterList(self.data.pageNum);
    })

  },

  onPullDownRefresh:function(){
    if(this.data.upPageNum <= 1){
      wx.stopPullDownRefresh();
      return;
    }
    this.data.upPageNum--;
    var param = {};
    param.pageNum = this.data.upPageNum;
    param.pageSize = this.data.pageSize;
    param.bookId = this.data.bookId;


    var self = this;
    chapterApi.getChapter(param).then(res => {
      
      wx.stopPullDownRefresh();
      var list = res
      if (list.length == 0) {
        
        return;
      }
      self.setData({
        chapterList: list.concat(self.data.chapterList),
        isLoadding: false
      });
    })
   
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    if (!this.data.isMore) {
      return;
    }

    this.setData({
      isLoading: true
    });
    this.data.pageNum++;
    this.getChapterList(this.data.pageNum);

  },

  getChapterList: function (pageNum){

    this.setData({

      pageNum: pageNum
    })
    var param = {};
    param.pageNum = pageNum;
    param.pageSize = this.data.pageSize;
    param.bookId = this.data.bookId;




    var self = this;
    chapterApi.getChapter(param).then(res => {
      
      var list = res;
        if (list.length < this.data.pageSize) {
          self.setData({
            isLoading: true,
            loadingText: "没有更多了"
          
          });
          self.data.isMore = false;
       
        }


        self.setData({
          chapterList: self.data.chapterList.concat(list),
          isLoadding: false
        });
    })
   
  },
  toChapter: function (e) {
    
    var _id = e.currentTarget.dataset.id;
    var cur = {};
    for(var temp of this.data.chapterList){
      if(temp._id == _id){
        cur.chapterName = temp.name;
        cur.chapterId = temp._id;
        var order = temp.order + 1
        cur.pageNum = Math.ceil(order / this.data.pageSize)
      }
    }
    cur.bookName = this.data.book.name;
    cur.bookId = this.data.book._id;
    

    app.history.add(cur);
    wx.navigateTo({
      url: '../chapter/chapter?id=' + _id
    })
  },

  onShareAppMessage: function () {

  }


 
})