export const state = () => {
  return {
    //景点部分
    cityjingdian: [{
      name: ''
    }],


    // 酒店详情数据
    hotelDetail: []
  }
}

export const mutations = {
  setCityjingdian(state, data) {
    state.cityjingdian = (data)
  },

  //  存储酒店详情数据
  setHotelDetail(state, data) {
    state.hotelDetail = data
  }
}
