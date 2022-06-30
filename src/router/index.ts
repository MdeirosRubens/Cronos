import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tarefas from '../views/TaskViews.vue';
import Projetos from '../views/ProjectViews.vue'
import FormViews from '../views/Projetos/FormViews.vue'
import ListViews from '../views/Projetos/ListViews.vue'

const rotas: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tarefas',
    component: Tarefas,
  },
  {
    path: '/projetos',
    component: Projetos,
    children: [
      {
        path: '',
        name: 'Projetos',
        component: ListViews
      },
      {
        path: 'novo',
        name: 'Novo Projeto',
        component: FormViews
      },
      {
        path: ':id',
        name: 'Editar Projeto',
        component: FormViews,
        props: true
      }
    ]
  },
  
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: rotas,
});

export default router;
