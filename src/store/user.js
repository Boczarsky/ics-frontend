import axios from 'axios';
import { API_URL } from '../config/env';

const getters = {
  userData: state => state.userData,
  userType: state => state.userData && state.userData.user_type,
  userId: state => state.userData && state.userData.user_id,
};

const actions = {
  async fetchUserData({ commit }) {
    const accessToken = localStorage.getItem('access_token');
    try {
      const response = await axios.get(`${API_URL}users/my`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      commit('setUserData', response.data);
    } catch (error) {
      localStorage.removeItem('access_token');
      commit('clearUserData');
    }
  },
};

const mutations = {
  setUserData(state, userData) {
    state.userData = userData;
  },
  clearUserData(state) {
    state.userData = null;
  },
};

const state = {
  userData: null,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
