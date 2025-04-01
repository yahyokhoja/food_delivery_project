// admin/js/camera.js
document.addEventListener('DOMContentLoaded', function () {
    const cameraInput = document.querySelector('.custom-camera-widget');
    const cameraButton = document.createElement('button');
    cameraButton.textContent = 'Сделать фото';
    document.body.appendChild(cameraButton);

    cameraButton.addEventListener('click', function () {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    const video = document.createElement('video');
                    video.srcObject = stream;
                    video.play();
                    document.body.appendChild(video);

                    // Добавьте логику для захвата фото и отправки его в поле формы
                    const captureButton = document.createElement('button');
                    captureButton.textContent = 'Сделать снимок';
                    document.body.appendChild(captureButton);

                    captureButton.addEventListener('click', function () {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                        // Преобразуйте изображение в data URL и вставьте в поле формы
                        const imageData = canvas.toDataURL('image/png');
                        cameraInput.value = imageData;

                        // Остановите камеру
                        stream.getTracks().forEach(track => track.stop());
                    });
                })
                .catch(function (error) {
                    console.error('Ошибка доступа к камере:', error);
                });
        } else {
            alert('Камера не доступна');
        }
    });
});
