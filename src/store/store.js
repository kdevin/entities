// store.js

import Vue from 'vue'
import Vuex from 'vuex'

import allNews from '../assets/news.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allNews: allNews,
    currentNews: [],
    newsSelected: {},
    dateSelected: new Date(2018, 0, 1)
  },
  getters: {
    allNews: state => state.allNews,
    currentNews: state => state.currentNews,
    newsSelected: state => state.newsSelected,
    dateSelected: state => state.dateSelected
  },
  mutations: {
    cleanNews: (state) => {
      state.currentNews = []
      state.newsSelected = []
    },
    pushNews: (state, value) => {
      state.currentNews.push(value)
    },
    setNewsSelected: (state, value) => {
      console.log(value)
      state.newsSelected = value
    },
    setDateSelected: (state, value) => {
      console.log(value)
      state.dateSelected = value
    }
  },
  actions: {
    cleanNews: function ({ commit }) {
      commit('cleanNews')
    },
    pushNews: function ({ commit }, diff) {
      commit('pushNews', diff)
    },
    setNewsSelected: function ({ commit }, diff) {
      commit('setNewsSelected', diff)
    },
    setDateSelected: function ({ commit }, diff) {
      commit('setDateSelected', diff)
    }
  }
})
