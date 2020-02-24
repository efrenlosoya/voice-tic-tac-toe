const LANG = 'en-US';
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = LANG;

function initVoiceRecognition() {
    recognition.onresult = (event) => {
        const currentIndex = event.resultIndex;
        const transcript = event.results[currentIndex][0].transcript;
        const speechDisplay = document.getElementById('speech-display');
        speechDisplay.innerHTML = transcript;
        recognition.stop();
        speak(transcript);
    };
}

function start() {
    recognition.start();
}

function speak(text) {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.lang = LANG;
    synth.speak(utterThis);
    utterThis.onend = () => {
        recognition.start();
    }
}

initVoiceRecognition();
