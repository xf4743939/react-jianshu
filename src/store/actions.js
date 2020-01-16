import * as actionTypes from './action-type.js'
import { get } from '../config/ajax.js'
// 保存表单数据
export const saveFormData = (value, dataType) => ({
  type: actionTypes.SAVEFROMDATA,
  value,
  dataType
})

// 保存图片地址
export const saveImg = path => ({
  type: actionTypes.SAVEIMG,
  path
})

// 清除数据
export const clearData = () => ({
  type: actionTypes.CLEARDATA
})

// 获取商品列表

export const getProduct = () => {
  return async dispatch => {
    try {
      let res = await get(`https://api.cangdu.org/shopro/data/products`)
      let arr = res.data.data
      console.log(arr)
      arr.map(item => {
        item.selectStatus = true
        item.selectNum = 0
        return item
      })
      dispatch({
        type: actionTypes.GETPRODICT,
        productList: arr
      })
    } catch (error) {
      console.log(error)
    }
  }
}

// 选择商品
export const toggleProduct = index => ({
  type: actionTypes.SELECTPRODUCT,
  index
})

// 编辑商品
export const editProduct = (index, selectNum) => ({
  type: actionTypes.EDITPRODUCT,
  index,
  selectNum
})

// 清空数据
export const clearSelected = () => ({
  type: actionTypes.CLEARSELECTED
})
