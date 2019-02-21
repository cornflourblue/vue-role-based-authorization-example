import config from 'config';
import { handleResponse, requestOptions } from '@/_helpers';

export const userService = {
    getAll,
    getById
};

function getAll() {
    return fetch(`${config.apiUrl}/users`, requestOptions.get())
        .then(handleResponse);
}

function getById(id) {
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions.get())
        .then(handleResponse);
}