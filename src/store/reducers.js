import * as actionTypes from './action-type.js'
import { List, Map, fromJS } from 'immutable'

let defaultState = {
  orderSum: '', // 金额
  name: '', // 姓名
  phoneNo: '', // 手机号
  imgPath: '' // 图片地址
}

// eslint-disable-next-line no-undef
/* reducer 接收当前状态 和 action 动作 */
export const formData = (state = defaultState, action = {}) => {
  switch (action.type) {
    case actionTypes.SAVEFROMDATA:
      return { ...state, ...{ [action.dataType]: action.value } }
    case actionTypes.SAVEIMG:
      return { ...state, ...{ imgPath: action.path } }
    case actionTypes.CLEARDATA:
      return { ...state, ...defaultState }
    default:
      return state
  }
}

export const prodData = (state = { productList: [] }, action) => {
  let imuDataList
  let imuItem
  // eslint-disable-next-line default-case
  switch (action.type) {
    case actionTypes.GETPRODICT:
      return { ...state, ...action }
    case actionTypes.SELECTPRODUCT:
      // 避免引用数据类型 使用immutable进行数据转化
      imuDataList = List(state.productList)
      imuItem = Map(state.productList[action.index])
      imuItem = imuItem.set('selectStatus', !imuItem.get('selectStatus'))
      imuDataList = imuDataList.set(action.index, imuItem)
      return { ...state, ...{ productList: imuDataList.toJS() } }
    case actionTypes.EDITPRODUCT:
      //避免引用类型数据，使用immutable进行数据转换
      imuDataList = List(state.productList)
      imuItem = Map(state.productList[action.index])
      imuItem = imuItem.set('selectNum', action.selectNum)
      imuDataList = imuDataList.set(action.index, imuItem)
      return { ...state, ...{ productList: imuDataList.toJS() } }
    case actionTypes.CLEARSELECTED:
      imuDataList = fromJS(state.productList)

      for (let i = 0; i < state.productList.length; i++) {
        imuDataList = imuDataList.update(i, item => {
          item = item.set('selectStatus', false)
          item = item.set('selectNum', 0)
          return item
        })
      }
      return { ...state, ...{ productList: imuDataList } }
    default:
      return state
  }
}
