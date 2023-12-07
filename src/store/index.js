import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

let db = new Localbase('db')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    searchText: null,
    tasks: [],
    snackbar: {
      show: false,
      text: ""
    },
    sorting: false
  },
  mutations: {

    setSearch(state, value){
      state.searchText = value
    },
    addTask(state, newTask) {
      state.tasks.push(newTask)
    },

    checkTask(state, id) {
      let task = state.tasks.filter((task) => task.id === id)[0];
      task.checked = !task.checked;
    },

    deleteTask(state, id) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },

    updateTaskTitle(state, payload) {
      let task = state.tasks.filter((task) => task.id === payload.id)[0]
      task.title = payload.title
    },

    updateTaskDueDate(state, payload) {
      let task = state.tasks.filter((task) => task.id === payload.id)[0]
      task.dueDate = payload.dueDate
    },

    showSnackbar(state, text) {
      let timeout = 0
      if (state.snackbar.show) {
        state.snackbar.show = false
        timeout = 300
      }

      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text
      }, timeout);
    },

    hideSnackbar(state) {
      state.snackbar.show = false
    },

    toggleSorting(state) {
      state.sorting = !state.sorting
    },

    setTasks(state, tasks) {
      state.tasks = tasks
    }
  },
  actions: {
    addTask({ commit }, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        checked: false,
        dueDate: null
      }
      db.collection('tasks').add(newTask).then(() => {
        commit('addTask', newTask)
        commit('showSnackbar', 'Task Added')
      })
    },
    checkTask({state, commit}, id){
      let task = state.tasks.filter((task) => task.id === id)[0];
      db.collection('tasks').doc({ id: id }).update({
        checked: !task.checked
      }).then(() => {
        commit('checkTask', id)
        console.log('test')
      })

    },

    deleteTask({ commit }, id) {
      db.collection('tasks').doc({ id: id }).delete().then(() => {
        commit('deleteTask', id)
        commit('showSnackbar', 'Task Deleted')
      })

    },
    updateTaskTitle({commit}, payload){
      db.collection('tasks').doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {
        commit('updateTaskTitle', payload)
        commit('showSnackbar', 'Task Updated')
      })
    },
    updateTaskDueDate({commit}, payload){
      db.collection('tasks').doc({ id: payload.id }).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit('updateTaskDueDate', payload)
        commit('showSnackbar', 'Due Date Updated')
      })

    },
    getTasks({commit}){
      db.collection('tasks').get().then(tasks => {
        commit('setTasks', tasks)
      })
    },

    setTasks({commit}, tasks){
        db.collection('tasks').set(tasks)
        commit('setTasks', tasks)
    },
  },
  getters: {
    tasksFiltered(state){
      if(!state.searchText) {
        return state.tasks
      }
      return state.tasks.filter(task => task.title.toLowerCase().includes(state.searchText.toLowerCase()))
    }
  },
  modules: {
  }
})
