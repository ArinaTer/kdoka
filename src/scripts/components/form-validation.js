export function formValidation() {
    const form = document.querySelector('.feedback__form');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');
    const fileInput = document.querySelector('#file');
    const submitButton = document.querySelector('.feedback__button');
    const fileLabel = document.querySelector('.feedback__label--file');

    const nameRegex = /^[А-Яа-яA-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxFileSize = 5 * 1024 * 1024;

    function showFileInfo(file) {
        const svgIcon = `
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.9999 11.2001L1.7999 7.0001L0.399902 8.4001L5.9999 14.0001L17.9999 2.0001L16.5999 0.600098L5.9999 11.2001Z" fill="white"/>
            </svg>
        `;
        fileLabel.innerHTML = `<span class="file-info">${file.name}</span> ${svgIcon}`;
    }

    function clearFileInfo() {
        fileLabel.innerHTML = 'Загрузить файл';
    }

    function showError(input, message) {
        const field = input.parentElement;
        let error = field.querySelector('.error-message');
        if (!error) {
            error = document.createElement('div');
            error.className = 'error-message';
            field.appendChild(error);
        }
        error.textContent = message;
        input.style.borderColor = 'red';
    }

    function clearError(input) {
        const field = input.parentElement;
        const error = field.querySelector('.error-message');
        if (error) {
            error.remove();
        }
        input.style.borderColor = '';
    }

    function validateName() {
        const value = nameInput.value.trim();
        if (value === '') {
            showError(nameInput, 'Пожалуйста, введите ваше имя');
            return false;
        }
        if (!nameRegex.test(value)) {
            showError(nameInput, 'Имя может содержать только буквы и пробелы');
            return false;
        }
        clearError(nameInput);
        return true;
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        if (value === '') {
            showError(emailInput, 'Пожалуйста, введите ваш email');
            return false;
        }
        if (!emailRegex.test(value)) {
            showError(emailInput, 'Пожалуйста, введите корректный email');
            return false;
        }
        clearError(emailInput);
        return true;
    }

    function validateMessage() {
        const value = messageInput.value.trim();
        if (value === '') {
            showError(messageInput, 'Пожалуйста, введите ваше сообщение');
            return false;
        }
        clearError(messageInput);
        return true;
    }

    function validateFile() {
        const file = fileInput.files[0];
        if (file) {
            if (!allowedFileTypes.includes(file.type)) {
                showError(fileInput, 'Допустимы только файлы JPEG, PNG или PDF');
                clearFileInfo();
                return false;
            }
            if (file.size > maxFileSize) {
                showError(fileInput, 'Файл не должен превышать 5MB');
                clearFileInfo();
                return false;
            }
            showFileInfo(file);
        } else {
            clearFileInfo();
        }
        clearError(fileInput);
        return true;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        const isFileValid = validateFile();

        if (isNameValid && isEmailValid && isMessageValid && isFileValid) {
            console.log('Форма успешно отправлена!');
            form.reset();
            clearFileInfo();
        }
    });

    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);
    fileInput.addEventListener('change', validateFile);
}
