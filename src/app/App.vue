<template>
    <div>
        <nav v-if="currentUser" class="navbar navbar-expand navbar-dark bg-dark">
            <div class="navbar-nav">
                <router-link to="/" class="nav-item nav-link">Home</router-link>
                <router-link v-if="isAdmin" to="/admin" class="nav-item nav-link">Admin</router-link>
                <a @click="logout" class="nav-item nav-link">Logout</a>
            </div>
        </nav>
        <div class="jumbotron">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 offset-sm-3">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { authenticationService } from '@/_services';
import { router, Role } from '@/_helpers';

export default {
    name: 'app',
    data () {
        return {
            currentUser: null
        };
    },
    computed: {
        isAdmin () {
            return this.currentUser && this.currentUser.role === Role.Admin;
        }
    },
    created () {
        authenticationService.currentUser.subscribe(x => this.currentUser = x);
    },
    methods: {
        logout () {
            authenticationService.logout();
            router.push('/login');
        }
    }
};
</script>