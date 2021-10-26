import {ConstantMessages} from '../../constants/constants.js';

/**
  * Класс, реализующий валидацию форм.
  */
export default class Validator {
    /**
     * Метод, валидирующий e-mail.
     * @param {String} source e-mail для валидации
     * @return {String | null} сообщение об ошибке
     */
    validateEMail(source) {
        const email = /^.*[@]+.*$/;
        if (!(email).test(source)) {
            return ConstantMessages.EnterCorrectEmail;
        }
        return null;
    }

    /**
     * Метод, валидирующий логин.
     * @param {String} source логин для валидации
     * @return {String | null} сообщение об ошибке
     */
    validateLogin(source) {
        if (source.length < 3 || source.length > 20) {
            return ConstantMessages.WrongLoginLength;
        }

        const containsLetters = /^.*[a-zA-Z]+.*$/;
        if (!(containsLetters).test(source)) {
            return ConstantMessages.UseOnlyLatinLettersLogin;
        }

        return null;
    }

    /**
     * Метод, валидирующий пароль.
     * @param {String} source пароль для валидации
     * @return {String | null} сообщение об ошибке
     */
    validatePassword(source) {
        if (source.length < 6 || source.length > 25) {
            return ConstantMessages.WrongPasswordLength;
        }
        const beginWithoutDigit = /^\D.*$/;
        if (!(beginWithoutDigit).test(source)) {
            return ConstantMessages.NotBeginningWithNumberPassword;
        }

        const withoutSpecialChars = /^[^-() /]*$/;
        if (!(withoutSpecialChars).test(source)) {
            return ConstantMessages.NoSpecialSymbolsPassword;
        }

        const containsLetters = /^.*[a-zA-Z]+.*$/;
        if (!(containsLetters).test(source)) {
            return ConstantMessages.UseOnlyLatinLettersPassword;
        }

        return null;
    }
}
