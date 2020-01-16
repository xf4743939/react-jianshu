// const actionTypes = {
//   SAVEFROMDATA: 'SAVEFROMDATA',
//   SAVEIMG: 'SAVEIMG',
//   CLEARDATA: 'CLEARDATA'
// }
import * as actionTypes from './action-types.js'

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
