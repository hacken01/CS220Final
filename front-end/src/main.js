import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mock from '../starter-code/mock-data.js'

Vue.config.productionTip = false



let data = {
    users: mock,
    posts: [],
    following: [],
    numUserPosts: 0,
    numFollowingPosts: 0,
    currentID: 2,
    comments: [],

    //LIKED POSTS
    addToMyStuff(newUser) {
        this.posts.push(newUser);
    },
    updateMyPostsNum() {
        this.numUserPosts += 1;
    },
    decreaseMyPostsNum() {
        this.numUserPosts -= 1;
    },
    removefromMyPosts(newUser) {
        for (var i = 0; i < this.posts.length; i++) {
            if (this.posts[i].id === newUser.id) {
                this.posts.splice(i, 1);
            }
        }
    },

    //MY POSTS
    addToFollowing(newUser) {
        this.following.push(newUser);
    },
    updateFollowingNum() {
        this.numFollowingPosts += 1;
    },
    decreaseFollowingNum() {
        this.numFollowingPosts -= 1;
    },
    removefromFollowing(newUser) {
        for (var i = 0; i < this.following.length; i++) {
            if (this.following[i].id === newUser.id) {
                this.following.splice(i, 1);
            }
        }
    },

    //ADD COMMENTS
    getComments() {
        return this.comments;
    },
    addComment(firstname, lastname, comment) {
        this.comments.push({
            firstname: firstname,
            lastname: lastname,
            comment: comment
        });
        this.currentID += 1;
        this.numFollowingPosts += 1;
    }
}

new Vue({
    router,
    data,
    render: h => h(App)
}).$mount('#app')