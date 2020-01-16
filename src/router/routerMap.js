import Home from '../pages/home/index'
import Product from '../pages/product/product'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    auth: false
  },
  {
    path: '/product',
    name: 'product',
    component: Product,
    auth: true
  }
]
