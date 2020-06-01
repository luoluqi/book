var app = getApp();
const categoryApi = require('../../../api/categoryApi')
const bookApi = require('../../../api/bookApi')
Page({
    data: {
      
        category: [
           
        ],
        bookList:[],
        categoryId:0,
        pageNum:1,
        pageSize: 10,
        isMore:true,
        isLoading:false,
        loadingText:"正在加载..."
     
    },
  
  onLoad(){
        this.setData({
          bookList: [],
          isMore:true
        });
        var self = this;
        this.data.pageNum = 1;

        categoryApi.getCategory({
          pageNum:1,pageSize:100
        }).then(res => {
          var list = res;
            var categoryId = self.data.categoryId;
            if(categoryId == 0){
              categoryId = list[0]._id;
            }
            self.setData({
              category: list,
              categoryId: categoryId
            });

            self.getBookList(categoryId,1);
        })
    },
    onReachBottom: function () {
      if(!this.data.isMore){
        return;
      }

     this.setData({
       isLoading:true
     });
      this.data.pageNum++;
      this.getBookList(this.data.categoryId, this.data.pageNum);
     

    },
    switchTab(e){
      var id = e.target.dataset.id; 
      this.setData({
        bookList:[],
        isMore:true,
        isLoading:false
      });
      this.getBookList(id,1);

     
    },
    getBookList: function (categoryId,pageNum){
      this.setData({
        categoryId: categoryId,
        pageNum: pageNum
      })

      var self = this;
      bookApi.getBook({
        pageNum: pageNum,pageSize: this.data.pageSize, categoryId: categoryId
      }).then(res => {
            
          var list = res
          if (list.length < this.data.pageSize) {
            self.setData({
              isMore:false,
              isLoading: true,
              loadingText: "没有更多了"
            });
          
          
          }


          self.setData({
            bookList:self.data.bookList.concat(list),
            isLoadding: false
          });
      })
   
    },
  toBook: function (e) {
    var id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../book/book?id=' + id
    })
  },

  onShareAppMessage: function () {

  },

    
})