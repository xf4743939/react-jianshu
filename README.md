## record react 实战学习

#### react thunk
  - UI组件
    1. 只负责ui呈现,不带任何业务逻辑
    2. 没有状态(不使用this.state这个变量)
    3. 所有数据都有参数(this.props)提供
    4. 不使用任何redux的API
  - 容器组件
    1. 负责管理数据和业务逻辑
    2. 带有内部状态
    3. 使用redux的API
  - 一个组件又有UI又有业务逻辑
    1. 拆分结构 一个外层容器组件,里面包含一个Ui组件
    2. 容器组件与外部通信,把数据库传递给后者,后者渲染出视图
    3. react-redux规定所有Ui组件都由用户提供,容器组件由react-redux自动生成     
  - connect(mapStateToProps,mapDispatchToProps)它们定义了 UI 组件的业务逻辑   
    1. mapStateToProps 将外部state对象映射到UI组件的props对象上
       ```js
         const mapStateToProps = (state) => {
                return {
                  todos: getVisibleTodos(state.todos, state.visibilityFilter)
                }
              }
       ``` 
     2. mapDispatchToProps 可以是函数或一个对象 
       ```js
         const mapDispatchToProps = {
               // ... 通常是action creators构成的对象
            }
       ``` 
   - Provider组件可以让容器组件拿到state
      