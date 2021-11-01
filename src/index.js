'use strict';

import {userActions} from './actions/user.js';

// Stores
import UserStore from './stores/UserStore/UserStore.js';

// Modules
import Router from './modules/Router/Router.js';

// utils
import {Html, Urls} from './constants/constants.js';

// Файл стилей
import './styles/scss/Common.scss';

// Views
import RegisterView from './views/RegisterView/RegisterView.js';
import LoginView from './views/LoginView/LoginView.js';
import BoardsView from './views/BoardsView/BoardsView.js';
import BoardView from './views/BoardView/BoardView.js';
import CardComponent from './components/Card/Card.js';

/* Обработчик на загрузку страницы */
window.addEventListener('DOMContentLoaded', async () => {
    const root = document.getElementById(Html.Root);

    /* Сверка требуемого состояния пользователя с состоянием на сервере */
    if (UserStore.getContext('isAuthorized') === undefined) {
        userActions.fetchUser();

        const promise = new Promise(function waitForFetchUser(resolve, reject) {
            if (UserStore.getContext('isAuthorized') === undefined) {
                // eslint-disable-next-line no-invalid-this
                setTimeout(waitForFetchUser.bind(this, resolve, reject), 30);
            }
            resolve();
        });
        await promise;
    }

    try {
        Router.register(Urls.Root, new BoardsView(root));
        Router.register(Urls.Register, new RegisterView(root));
        Router.register(Urls.Login, new LoginView(root));
        Router.register(Urls.Card, new CardComponent());
        Router.register(Urls.Boards, new BoardsView(root));
        Router.register(Urls.Board, new BoardView(root));

        Router.start();
    } catch (error) {
        console.error(error);
    }
});
