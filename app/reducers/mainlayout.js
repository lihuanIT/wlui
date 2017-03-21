const initialState = {
    pages:[
        {
            name:'组件',
            path:'/wlui/homepage',
            key:'homepage'
        },
        {
            name:'管理',
            path:'/wlui/manage',
            key:'manage'
        },
        {
            name:'导出工具',
            path:'/wlui/exporttool',
            key:'exporttool'
        }
    ]
}

export default function counter(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
