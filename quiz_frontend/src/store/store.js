import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        editButton: {
            name: "Save",
            class: true,
        },
    },
    getters: {},
    actions: {
        changeButton: (context) => {
            context.commit("changeButton");
        },
    },
    mutations: {
        changeButton: (state) => {
            state.editButton.name = "Edit";
            state.editButton.class = false;
        },
    },
});

export default store;
