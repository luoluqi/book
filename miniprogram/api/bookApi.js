const db = wx.cloud.database()
const collectionName = 'book'
module.exports = {
  getBook: ({categoryId, pageSize, pageNum, name}) => {
    var where = {
      categoryId: categoryId
    }
    if (name) {
      where.name ={
        $regex:'.*'+ name,
        $options: 'i'
      }
    }
    return new Promise((resolve, reject) => {
      var skip = (pageNum - 1) * pageSize
      db.collection(collectionName)
      .where(where)
      .orderBy('order', 'asc')
        .skip(skip) // 跳过结果集中的前 10 条，从第 11 条开始返回
        .limit(pageSize) // 限制返回数量为 10 条
        .get()
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.error(err)
        })
    })
    
  },

  getBookDetail: ({id}) => {
    return new Promise((resolve, reject) => {
      db.collection(collectionName)
      .doc(id)
      .get()
      .then(res => {
        resolve(res.data)
      })
    })
  }
}