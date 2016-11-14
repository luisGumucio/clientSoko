var formModal;
var formLogin;
var formSignup;
var formForgotPassword;
var formModalTab;
var tabLogin;
var tabSignup;
//forgotPasswordLink = formLogin.find('.cd-form-bottom-message a'),
//backToLoginLink = formForgotPassword.find('.cd-form-bottom-message a'),
//mainNav = $('.contenedor1');
function mainController() {
        this.test = function() {
            alert("hola");
        };
        this.login = function () {
            formModal = angular.element(document.querySelector('.cd-user-modal'));
            formLogin = angular.element(document.querySelector('#cd-login'));
            formForgotPassword = angular.element(document.querySelector('#cd-reset-password'));
            formSignup = angular.element(document.querySelector('#cd-signup'));
            formModalTab = angular.element(document.querySelector('.cd-switcher'));
            tabLogin = formModalTab.children('li').eq(0).children('a');
            tabSignup = formModalTab.children('li').eq(1).children('a');
            login_selected();
        };
        this.create = function() {
            signup_selected();
        }
        function login_selected() {
            formModal.addClass('is-visible');
            formLogin.addClass('is-selected');
            formSignup.removeClass('is-selected');
            formForgotPassword.removeClass('is-selected');
            tabLogin.addClass('selected');
            tabSignup.removeClass('selected');
        }
        function signup_selected() {
            //mainNav.children('ul').removeClass('is-visible');
            formModal.addClass('is-visible');
            formLogin.removeClass('is-selected');
            formSignup.addClass('is-selected');
            formForgotPassword.removeClass('is-selected');
            tabLogin.removeClass('selected');
            tabSignup.addClass('selected');
        }

        this.session_init = function(levelItem) {
            formModal.removeClass('is-visible');
        }
        this.levelinit = function (levelItem) {
            for (i = 1; i <= levelItem; i++) {
                formLevel = $('#levelGame' + i),
                    formLevel.removeClass('active');
                formLevel.addClass('visited');
            }
        }
        this.setCookie = function (cvalue, exdays, cookie) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            cookie.put("user", JSON.stringify(cvalue), { expiry: d.toGMTString() });
        }
    }
