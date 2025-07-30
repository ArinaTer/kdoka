export function formValidation() {
    const form = document.querySelector('.feedback__form');
    const emailInput = document.querySelector('#email');
    const fileInput = document.querySelector('#file');
    const fileLabel = document.querySelector('.feedback__label--file');

    // Если форма или нужные поля отсутствуют, не выполнять дальнейший код
    if (!form || !emailInput || !fileInput || !fileLabel) {
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxFileSize = 5 * 1024 * 1024;

    let triedSubmit = false;
    let emailHadError = false;

    function showFileInfo(file) {
        const svgIcon = `
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.9999 11.2001L1.7999 7.0001L0.399902 8.4001L5.9999 14.0001L17.9999 2.0001L16.5999 0.600098L5.9999 11.2001Z" fill="white"/>
            </svg>
        `;
        fileLabel.innerHTML = '<span class="file-info">' + file.name + '</span> ' + svgIcon;
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
        input.classList.add('feedback__input--error');
    }

    function clearError(input) {
        const field = input.parentElement;
        const error = field.querySelector('.error-message');
        if (error) error.remove();
        input.classList.remove('feedback__input--error');
    }

    function validateEmail(show) {
        const value = emailInput.value.trim();
        if (value === '') {
            if (show) showError(emailInput, 'Обязательное поле');
            emailHadError = true;
            return false;
        }
        if (!emailRegex.test(value)) {
            if (show) showError(emailInput, 'Укажите, пожалуйста, корректный email');
            emailHadError = true;
            return false;
        }
        clearError(emailInput);
        emailHadError = false;
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
        triedSubmit = true;
        const isEmailValid = validateEmail(true);
        validateFile();
        if (isEmailValid) {
            form.reset();
            clearFileInfo();
            clearError(emailInput);
            emailHadError = false;
        }
    });

    emailInput.addEventListener('input', function () {
        if (triedSubmit || emailHadError) {
            validateEmail(true);
        }
    });

    fileInput.addEventListener('change', validateFile);
}
