import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

import allNews from '../assets/news.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allNews: allNews,
    currentNews: [],
    newsSelected: {},
    thumbnails: [],
    dateSelected: new Date(2018, 0, 1),
    disabled: {to: new Date(2018, 0, 1), from: new Date(2018, 0, 1)}
  },
  getters: {
    allNews: state => state.allNews,
    currentNews: state => state.currentNews,
    newsSelected: state => state.newsSelected,
    thumbnails: state => state.thumbnails,
    dateSelected: state => state.dateSelected,
    disabled: state => state.disabled
  },
  mutations: {
    clean: (state) => {
      state.currentNews = []
      state.newsSelected = []
      state.thumbnails = []
    },
    pushNews: (state, value) => {
      state.currentNews.push(value)
    },
    setNewsSelected: (state, value) => {
      state.newsSelected = value
    },
    setThumbnails: (state, value) => {
      state.thumbnails = value
    },
    setDateSelected: (state, value) => {
      state.dateSelected = value
    },
    setDisabled: (state, value) => {
      state.dateSelected.to = value.to
      state.dateSelected.from = value.from
    }
  },
  actions: {
    setDisabledDateFrom: function ({ commit }) {
      var disabled = this.getters.disabled
      this.getters.allNews.forEach((news) => {
        var dateArray = news.date.split('/')
        var date = new Date('20' + dateArray[2], dateArray[1] - 1, dateArray[0])
        if (date > disabled.from) {
          disabled.from = date
        }
      })
      commit('setDisabled', disabled)
    },
    setDateSelected: function ({ commit }, diff) {
      commit('setDateSelected', diff)
      commit('clean')
      this.getters.allNews.forEach((news) => {
        if (news.date === moment(this.getters.dateSelected).format('DD/MM/YY')) {
          commit('pushNews', news)
        }
      })
    },
    setDisabled: function ({ commit }, diff) {
      commit('setDisabled', diff)
    },
    setNewsSelected: function ({ commit }, diff) {
      commit('setNewsSelected', diff)
    },
    setThumbnails: function ({ commit }, diff) {
      commit('setThumbnails', diff)
    }
  }
})
