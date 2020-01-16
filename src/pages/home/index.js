import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fromJS, is } from 'immutable'
import { NavLink } from 'react-router-dom'

import Header from '../../components/header/header.js'
import { ImagePicker } from 'antd-mobile'
import { saveFormData, saveImg, clearData } from '../../store/actions.js'
import Alert from '../../components/alert/alert.js'
import { instance } from '../../config/ajax.js'
import envconfig from '../../config/envconfig.js'
import './home.css'

class Home extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
    this.state = {
      imgs: [],
      multiple: false,
      alertTip: '',
      alertStatus: false,
      prodList: [] // 选中商品的数量
    }
    this.selectedImg = this.selectedImg.bind(this)
    this.closeAlert = this.closeAlert.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.sumitForm = this.sumitForm.bind(this)
  }
  closeAlert() {
    this.setState(state => ({
      alertStatus: false,
      alertTip: ''
    }))
  }
  /**
   * 将表单数据保存到redux 保留状态
   * @param {String} type 数据类型 orderSum|name|phoneNo
   * @param {Object} event 事件对象
   */
  handleInput(type, event) {
    let value = event.target.value
    if (type === 'num') {
      value = value.replace(/\D/g, '')
    }
    this.props.saveFormData(value, type)
  }

  async selectedImg(files, type, index) {
    if (!files || !files.length) {
      this.props.saveImg('')
      this.setState(() => ({
        imgs: []
      }))
      return
    }
    let formdata = new FormData()
    formdata.append('file', files[0].file)
    let res = await instance.post(
      'https://elm.cangdu.org/v1/addimg/shop',
      formdata,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      }
    )
    if (res.image_path) {
      this.props.saveImg(envconfig.imgUrl + res.image_path)
      let url = envconfig.imgUrl + res.image_path
      this.setState(() => ({
        imgs: [
          {
            url
          }
        ]
      }))
    }
  }
  sumitForm() {
    const { orderSum, name, phoneNo } = this.props.formData
    let alertTip = ''
    if (!orderSum) {
      alertTip = '商品金额为空'
    } else if (!name) {
      alertTip = '姓名不能为空'
    } else if (!phoneNo) {
      alertTip = '请输入手机号码'
    } else if (!/^1[3456789]\d{9}$/.test(phoneNo)) {
      alertTip = '手机号码格式不正确'
    } else {
      alertTip = '清除数据成功'
      this.setState(() => ({
        imgs: []
      }))
      this.props.clearData()
    }
    this.setState(state => ({
      alertTip,
      alertStatus: true
    }))
  }
  componentWillReceiveProps(nextProps) {
    if (!is(fromJS(this.props.prodData), fromJS(nextProps.prodData))) {
      this.initData(nextProps)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(nextProps)) ||
      !is(fromJS(this.state), fromJS(nextState))
    )
  }

  componentWillMount() {
    this.initData(this.props)
  }

  initData = props => {
    console.log(props, 'props')

    let prodList = []
    //  this.prodList=[]
    props.prodData.productList.forEach(item => {
      if (item.selectStatus && item.selectNum) {
        prodList.push(item)
      }
    })
    console.log(prodList)
    this.setState(() => ({
      prodList: [...prodList]
    }))
  }

  render() {
    const { imgs, alertTip, alertStatus } = this.state
    return (
      <div className="home-cotainer">
        <Header record={true}></Header>
        <div className="form-wrap">
          <div className="home-title">请录入您的信息</div>
          <div className="form-item">
            <label>销售金额：</label>
            <input
              type="number"
              value={this.props.formData.orderSum}
              placeholder="请输入订单金额"
              onChange={this.handleInput.bind(this, 'orderSum')}
            />
          </div>
          <div className="form-item">
            <label>客户姓名：</label>
            <input
              type="text"
              value={this.props.formData.name}
              placeholder="请输入客户姓名"
              onChange={this.handleInput.bind(this, 'name')}
            />
          </div>
          <div className="form-item">
            <label>客户电话：</label>
            <input
              type="number"
              value={this.props.formData.phoneNo}
              placeholder="请输入客户电话"
              onChange={this.handleInput.bind(this, 'phoneNo')}
            />
          </div>
          <div className="prod-main">
            <div className="home-title">请选择销售的产品</div>
            <NavLink to="/product" className="prod-text nav-link">
              {this.state.prodList.length ? (
                <ul>
                  {this.state.prodList.map((item, index) => {
                    return (
                      <li key={index}>
                        {item.product_name}x{item.selectNum}
                      </li>
                    )
                  })}
                </ul>
              ) : (
                '选择产品'
              )}
            </NavLink>
          </div>
          <div className="prod-main">
            <div className="home-title">请上传发票凭证</div>
            <div className="prod-text">
              <ImagePicker
                files={this.state.imgs}
                onChange={this.selectedImg}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={imgs.length < 1}
                multiple={this.state.multiple}
              />
            </div>
          </div>
          <div className="submit-btn" onClick={this.sumitForm}>
            提交
          </div>
        </div>
        <Alert
          alertTip={alertTip}
          alertStatus={alertStatus}
          closeAlert={this.closeAlert}
        ></Alert>
      </div>
    )
  }
}

Home.propTypes = {
  formData: PropTypes.object.isRequired,
  prodData: PropTypes.object.isRequired,
  saveFormData: PropTypes.func.isRequired,
  saveImg: PropTypes.func.isRequired,
  clearData: PropTypes.func.isRequired
}

/* connect 把组件和store连接起来 */
export default connect(
  state => ({
    formData: state.formData,
    prodData: state.prodData
  }),
  {
    clearData,
    saveFormData,
    saveImg
  }
)(Home)
