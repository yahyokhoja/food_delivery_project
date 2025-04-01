from django.forms.widgets import ClearableFileInput
from django.utils.safestring import mark_safe

class CameraWidget(ClearableFileInput):
    template_name = "widgets/camera_widget.html"

    def render(self, name, value, attrs=None, renderer=None):
        input_html = super().render(name, value, attrs, renderer)
        camera_button = (
            '<button type="button" id="camera-button">📷 Сделать снимок</button>'
            '<video id="camera-preview" autoplay style="display:none;"></video>'
            '<canvas id="camera-canvas" style="display:none;"></canvas>'
            '<script>'
            'document.addEventListener("DOMContentLoaded", function() {'
            '  const button = document.getElementById("camera-button");'
            '  const video = document.getElementById("camera-preview");'
            '  const canvas = document.getElementById("camera-canvas");'
            '  const fileInput = document.querySelector("input[type=file]");'
            '  button.addEventListener("click", function() {'
            '    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {'
            '      video.style.display = "block";'
            '      video.srcObject = stream;'
            '      video.play();'
            '      button.textContent = "📸 Сделать фото";'
            '      button.onclick = function() {'
            '        const context = canvas.getContext("2d");'
            '        canvas.width = video.videoWidth;'
            '        canvas.height = video.videoHeight;'
            '        context.drawImage(video, 0, 0, canvas.width, canvas.height);'
            '        canvas.toBlob(blob => {'
            '          const file = new File([blob], "photo.png", { type: "image/png" });'
            '          const dataTransfer = new DataTransfer();'
            '          dataTransfer.items.add(file);'
            '          fileInput.files = dataTransfer.files;'
            '        });'
            '        video.style.display = "none";'
            '        stream.getTracks().forEach(track => track.stop());'
            '        button.textContent = "📷 Сделать снимок";'
            '      };'
            '    }).catch(console.error);'
            '  });'
            '});'
            '</script>'
        )
        return mark_safe(input_html + camera_button)
