import Vue from 'vue';
import Router from 'vue-router';

import Organizations from '../views/Organizations.vue';
import Employees from '../views/Employees.vue';
import AddEmployee from '../views/AddEmployee.vue';
import EditEmployee from '../views/EditEmployee.vue';
import DeletedEmployees from '../views/DeletedEmployees.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/organizations' },
    { path: '/organizations', component: Organizations },
    { path: '/employees', component: Employees },
    { path: '/employees/add', component: AddEmployee },
    { path: '/employees/edit/:id', component: EditEmployee, props: true },
    { path: '/employees/deleted', component: DeletedEmployees }
  ]
});
