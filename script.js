const canvas = document.getElementById('profileCanvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');
const loadAvatarBtn = document.getElementById('loadAvatarBtn');
const usernameInput = document.getElementById('username');
const color1Picker = document.getElementById('color1');
const color2Picker = document.getElementById('color2');
const imageTypeSelect = document.getElementById('imageType');

let avatarImage = null; 

function draw() {
    const bgColor1 = color1Picker.value;
    const bgColor2 = color2Picker.value;


    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, bgColor1);
    gradient.addColorStop(1, bgColor2);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

   
    if (avatarImage) {
        ctx.drawImage(avatarImage, 64, 64, 128, 128); 
    }
}

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'minecraft_profile.png';
    link.href = canvas.toDataURL();
    link.click();
});

loadAvatarBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();

    if (username) {
        const imageType = imageTypeSelect.value;
        const avatarUrl = `https://mc-heads.net/${imageType}/${username}/128`;

        avatarImage = new Image();
        avatarImage.crossOrigin = "anonymous";
        avatarImage.src = avatarUrl;

        avatarImage.onload = function() {
            draw();
        };

        avatarImage.onerror = function() {
            alert("Errore: Nome utente non trovato!");
        };
    } else {
        alert("Per favore inserisci un nome utente!");
    }
});

color1Picker.addEventListener('input', draw);
color2Picker.addEventListener('input', draw);

draw(); 
