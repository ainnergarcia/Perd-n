// Frases de insistencia
const noPhrases = [
    "¿De verdad? Piénsalo bien por favor... 🥺",
    "¿Segurísima/o? Dame otra oportunidad 💔",
    "Te prometo portarme bien y compensártelo 😭"
];

// Arreglo completo con las 5 imágenes en orden estricto
const backgroundImages = [
    'IMG/Foto1.png', // Índice 0: Estado inicial
    'IMG/Foto2.png',       // Índice 1: Clic 1
    'IMG/Foto3.png',       // Índice 2: Clic 2
    'IMG/Foto4.png',       // Índice 3: Clic 3
    'IMG/Foto5.png'        // Índice 4: Clic 4 (Estado final sin botón "No")
];

let clickCount = 0;
let yesButtonScale = 1;

function sayNo() {
    const questionEl = document.getElementById("question");
    const yesBtn = document.getElementById("yes-btn");
    const noBtn = document.getElementById("no-btn");

    clickCount++;

    if (clickCount < noPhrases.length) {
        // Pasos 1 y 2
        questionEl.innerText = noPhrases[clickCount - 1];
        document.body.style.backgroundImage = `url('${backgroundImages[clickCount]}')`;
    } 
    else if (clickCount === noPhrases.length) {
        // Paso 3 (Muestra la última frase de insistencia y la Foto 4)
        questionEl.innerText = noPhrases[clickCount - 1];
        document.body.style.backgroundImage = `url('${backgroundImages[clickCount]}')`;
    } 
    else {
        // Paso 4 / Estado final (Desaparece el "No" y carga obligatoriamente la Foto 5)
        questionEl.innerText = "¡Ya no vale decir que no! Tienes que perdonarme 🫶";
        if (noBtn) {
            noBtn.style.display = "none";
        }
        document.body.style.backgroundImage = `url('${backgroundImages[4]}')`;
    }

    // Agrandar el botón "Sí"
    yesButtonScale += 0.15;
    if (yesBtn) {
        yesBtn.style.transform = `scale(${yesButtonScale})`;
    }
}

function sayYes() {
    document.body.style.backgroundImage = `url('Final-Fondo.png')`; 

    const contentBox = document.querySelector(".content-box");
    if (contentBox) {
        contentBox.innerHTML = `
            <div style="text-align: center; margin: auto;">
                <h1 class="success-message">¡Yay! Sabía que tenías un gran corazón. Te quiero muchísimo ❤️</h1>
                <p style="color: #444; margin-top: 15px; font-size: 16px;">Ya le he enviado un aviso a tu correo.</p>
            </div>
        `;
    }

    fetch('https://formspree.io/f/tu-id-de-formspree', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: "¡Han aceptado tus disculpas en la página web! ❤️" })
    }).catch(error => console.log('Aviso enviado localmente'));
}