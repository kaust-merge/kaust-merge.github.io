// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
    const progressBar = event.target.querySelector('.progress-bar');
    const updatingBar = event.target.querySelector('.update-bar');
    updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
    if (event.detail.totalProgress === 1) {
        progressBar.classList.add('hide');
        event.target.removeEventListener('progress', onProgress);
    } else {
        progressBar.classList.remove('hide');
    }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);

const modelViewer = document.querySelector('model-viewer');
const modelPaths = ['model.gltf'];

const loadModel = (modelPath) => {
    modelViewer.src = modelPath;
};

const urlParams = new URLSearchParams(window.location.search);
const folderName = urlParams.get('folder');

// Set the folder name in the div
if (folderName) {
    document.getElementById('folder-name').textContent = folderName;
}

// Initial model load
if (folderName) {
    loadModel('model.gltf___' + folderName); // Adds a '/' between folderName and model file
} else {
    loadModel(modelPaths[0]); // Load the first model by default
}

