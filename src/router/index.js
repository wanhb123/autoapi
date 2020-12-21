import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/user/Index';
import Login from "../components/user/Login";
import User from "../components/user/User";
import AddUser from "../components/user/AddUser";
import EditUser from "../components/user/EditUser";
import Interface from "../components/interface/Interface";
import AddInterface from "../components/interface/AddInterface";
import EditInterface from "../components/interface/EditInterface";
import Project from "../components/project/Project";
import EditProject from "../components/project/EditProject";
import AddProject from "../components/project/AddProject";

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes:
    [
      {path: '', component: Login,},
      {path: '/login', component: Login},
      {path: '/index', component: Index,
        children: [
          {
            path: '/users',
            component: User
          },
          { path: '/edit',
            component: EditUser
          },
          { path: '/add',
            component: AddUser
          },
          {
            path: '/interfaces',
            component: Interface
          },
          {
            path: '/addInterface',
            component: AddInterface
          },
          {
            path: '/editInterface',
            component: EditInterface
          },
          {
            path: '/projects',
            component: Project
          },
          {
            path: '/editProject',
            component: EditProject
          },
          {
            path: '/addProject',
            component: AddProject
          },
        ]
      },
    ]
})
