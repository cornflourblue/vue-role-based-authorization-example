<template>
    <div>
        <div class="alert alert-info">
            <strong>Normal User</strong> - U: user P: user<br />
            <strong>Administrator</strong> - U: admin P: admin
        </div>
        <h2>Login</h2>
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
            </div>
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="loading">
                    <span class="spinner-border spinner-border-sm" v-show="loading"></span>
                    <span>Login</span>
                </button>
            </div>
            <div v-if="error" class="alert alert-danger">{{error}}</div>
        </form>
    </div>
</template>

<script>
import { router } from '@/_helpers';
import { authenticationService } from '@/_services';

export default {
    data () {
        return {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            returnUrl: '',
            error: ''
        };
    },
    created () {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.$route.query.returnUrl || '/';
    },
    methods: {
        onSubmit () {
            this.submitted = true;
            const { username, password } = this;

            // stop here if form is invalid
            if (!(username && password)) {
                return;
            }

            this.loading = true;
            authenticationService.login(username, password)
                .then(
                    user => router.push(this.returnUrl),
                    error => {
                        this.error = error;
                        this.loading = false;
                    }
                );
        }
    }
};
</script>