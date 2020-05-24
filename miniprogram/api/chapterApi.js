const db = wx.cloud.database()
const collectionName = 'chapter'
module.exports = {
  getChapter: ({bookId, pageSize, pageNum}) => {
    
    return new Promise((resolve, reject) => {
      var skip = (pageNum - 1) * pageSize
      db.collection(collectionName)
      .where({
        bookId: bookId
      })

      .field({
        _id: true,
        name: true,
        order: true
      })
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
  getChapterDetail: ({id}) => {
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