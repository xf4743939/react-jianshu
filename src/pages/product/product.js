import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fromJS, is } from 'immutable'
import Header from '../../components/header/header.js'
import { getProduct, toggleProduct, editProduct } from '../../store/actions'

import './product.css'

class Product extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
    // this.toggleSelect = this.toggleSelect.bind(this)
  }

  toggleSelect = index => {
    this.props.toggleProduct(index)
  }

  handleEdit = (index, num) => {
    let currentNum = this.props.prodData.productList[index].selectNum + num
    if (currentNum < 0) {
      return
    }
    this.props.editProduct(index, currentNum)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(nextProps)) ||
      !is(fromJS(this.state), fromJS(nextState))
    )
  }

  componentWillMount() {
    if (!this.props.prodData.productList.length) {
      this.props.getProduct()
    }
  }

  render() {
    return (
      <div className="product-container">
        <Header confirm={true}></Header>
        <div className="product-main">
          {this.props.prodData.productList.map((item, index) => {
            return (
              <div className="prod-item" key={item.product_id}>
                <div
                  className="prod-left"
                  onClick={this.toggleSelect.bind(this, index)}
                >
                  <span
                    className={`iconduigou iconfont icon ${
                      item.selectStatus ? 'active' : ''
                    }`}
                  ></span>
                  <span className="prod-name">{item.product_name}</span>
                </div>
                <div className="prod-right">
                  <span
                    onClick={this.handleEdit.bind(this, index, -1)}
                    className={`iconjianhao iconfont icon ${
                      item.selectNum > 0 ? 'active' : ''
                    }`}
                  ></span>
                  <span className="prod-num">{item.selectNum}</span>
                  <span
                    onClick={this.handleEdit.bind(this, index, 1)}
                    className="iconfont iconjiahao icon icon"
                  ></span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

Product.propTypes = {
  prodData: PropTypes.object.isRequired,
  getProduct: PropTypes.func.isRequired,
  toggleProduct: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired
}

export default connect(
  state => ({
    prodData: state.prodData
  }),
  {
    getProduct,
    toggleProduct,
    editProduct
  }
)(Product)
