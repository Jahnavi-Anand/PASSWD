document.getElementById('generate').addEventListener('click', generatePassword);
document.getElementById('copy').addEventListener('click', copyToClipboard);

function generatePassword() {
    const length = document.getElementById('length').value;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;

    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    document.getElementById('password').value = password;
    updateStrength(password);
}

function copyToClipboard() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    passwordField.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    alert('Password copied to clipboard');
}

document.getElementById('reset').addEventListener('click', function() {
    location.reload();
});


function updateStrength(password) {
    const result = zxcvbn(password);
    const strengthValue = document.getElementById('strength-value');

    switch (result.score) {
        case 0:
            strengthValue.textContent = 'Very Weak';
            break;
        case 1:
            strengthValue.textContent = 'Weak';
            break;
        case 2:
            strengthValue.textContent = 'Fair';
            break;
        case 3:
            strengthValue.textContent = 'Good';
            break;
        case 4:
            strengthValue.textContent = 'Strong';
            break;
    }
}
