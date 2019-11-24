const getters = {
  notifications: state => state.notifications,
};

const actions = {
  pushNotification({ commit }, notificationData) {
    const { notification, timeout } = notificationData;
    commit('pushNotification', notification);
    setTimeout(() => {
      commit('removeNotification', notification);
    }, timeout);
  },
};

const mutations = {
  pushNotification(state, notification) {
    state.notifications = [...state.notifications, notification];
  },
  removeNotification(state, notification) {
    state.notifications = state.notifications.filter(item => item !== notification);
  },
};

const state = {
  notifications: [],
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
