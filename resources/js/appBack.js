import 'bootstrap';
import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
import Router from './back/routerClass';
import AnimationRouter from './animations/animationRouter';

window.onload = function (){
    new Router;
    new AnimationRouter;
}



