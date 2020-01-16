import React, { Component } from 'react'
import { get } from '../../config/ajax'
import { fromJS, is } from 'immutable'
import './recode-list.css'

export default class RecordList extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  componentWillReceiveProps(nextProps) {
    // 判断类型是否重复
    let currenType = this.props.location.pathname.split('/')[2]
    let type = nextProps.location.pathname.split('/')[2]
    if (currenType !== type) {
      this.getRecords(type)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(nextProps)) ||
      !is(fromJS(this.state), fromJS(nextState))
    )
  }

  async getRecords(type) {
    if (!type) return
    let url = `https://api.cangdu.org/shopro/data/record/${type}`
    let res = await get(url)
    this.setState(() => ({
      list: res.data.data || []
    }))
    console.log(res)
  }

  componentWillMount() {
    const type = this.props.location.pathname.split('/')[2]
    this.getRecords(type)
  }

  render() {
    return (
      <ul className="record-list">
        {this.state.list.map((item, index) => {
          return (
            <li className="record-item" key={item.sales_id}>
              <div className="record-top">
                <span>创建时间: {item.created_at}</span>
                <span className="status">{item.type_name}</span>
              </div>
              <div className="record-info">
                <div className="info-item">
                  用户名: {item.customers_name} &nbsp;&nbsp;
                  {item.customers_phone}
                </div>
                <div className="info-item">
                  商品： {item.product[0].product_name}
                </div>
                <div className="info-item">金额：{item.sales_money}</div>
              </div>
              <div className="record-bottom">
                等待管理员审核，审核通过后，佣金将结算至账户
              </div>
            </li>
          )
        })}
      </ul>
    )
  }
}
