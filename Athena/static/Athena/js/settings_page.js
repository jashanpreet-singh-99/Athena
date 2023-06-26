console.log("Script is running");

const editButton = document.getElementById('edit-button');
    const readOnlyFields = document.getElementsByClassName('read-only');

    editButton.addEventListener('click', function() {
      document.querySelector('.details-container').classList.toggle('edit-mode');

      if (editButton.innerHTML === 'Edit') {
        editButton.innerHTML = 'Save';
        enableFields();
      } else {
        editButton.innerHTML = 'Edit';
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