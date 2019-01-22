import { getInfo, updateInfo, register } from "@/services"

export default {
  namespace: "info",
  state: {
    info: {
      id: "",
      name: "",
      age: "",
      college: "",
      class: "",
      marjor: "",
      phone: "",
      email: "",
      address: "",
      nation: ""
    }
  },
  // 异步操作
  effects: {
    *GetInfo({ payload }, { call, put }) {
      const { data } = yield call(getInfo, { payload })
      yield put({ type: "save", payload: { data } })
    }
  },
  // 同步操作
  reducer: {
    save(
      state,
      {
        payload: { data: info }
      }
    ) {
      return { ...state, info }
    }
  },
  //订阅数据，如键盘或路由
  subscriptions: {
    //监听路由的变化 获取初始化数据
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === "/info") {
          dispatch({ type: "GetInfo", payload: query })
        }
      })
    }
  }
}
