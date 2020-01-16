import * as actionTypes from './action-types.js'
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
