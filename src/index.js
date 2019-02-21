import Vue from 'vue';

import { router } from './_helpers';
import App from './app/App';

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});