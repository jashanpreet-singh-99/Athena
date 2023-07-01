console.log("Script is running");

const editButton = document.getElementById('edit-button');
const readOnlyFields = document.getElementsByClassName('read-only');

editButton.addEventListener('click', function() {
    document.querySelector('.details-container').classList.toggle('edit-mode');
    if (editButton.innerHTML === 'Edit Details') {
        editButton.innerHTML = 'Save Details';
        enableFields();
    } else {
        editButton.innerHTML = 'Edit Details';
        disableFields();
    }
});

function enableFields() {
    for (let field of readOnlyFields) {
        field.removeAttribute('readonly');
    }
}

function disableFields() {
    for (let field of readOnlyFields) {
        field.setAttribute('readonly', 'readonly');
    }
}

function openImageBrowser(event) {
    event.preventDefault();
    const inputImgElement = document.getElementById('image-input');
    console.log("Open Image browser");
    inputImgElement.click();
}

document.getElementById('image-input').addEventListener('change', handleImageSelection);


function getCSRFToken() {
  const csrfInput = document.getElementById('csrf-token');
  if (csrfInput) {
    return csrfInput.value;
  }
  return null;
}

function handleImageSelection(event) {
  const file = event.target.files[0];
  const usernameInput = document.getElementById('username-input')
  if (file) {
    // Perform operations with the selected file (e.g., display preview, upload, etc.)
    console.log('Selected image file:', file);
    const formData = new FormData();
    formData.append('username', usernameInput.textContent);
    formData.append('img', file);
    const form = document.getElementById('profile_form');
    form.submit();
    // fetch('/upload_profile', {
    //     method: 'POST',
    //     body: formData,
    //     headers: {
    //         'X-CSRFToken': getCSRFToken()
    //     }
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     });

  }
}