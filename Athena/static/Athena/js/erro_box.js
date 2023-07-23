const callContainer = document.getElementById('callContainer');
const closeCallButton = document.getElementById('closeCallButton');
const errorMsgValue = document.getElementById('err_msg_value');

function show_error(msg) {
  callContainer.classList.remove('hidden');
  callContainer.classList.add('visible');
  errorMsgValue.innerText = msg;

  setTimeout(() => {
    callContainer.classList.remove('visible');
    callContainer.classList.add('hidden');
  }, 7000);
}

closeCallButton.addEventListener('click', () => {
  callContainer.classList.remove('visible');
  callContainer.classList.add('hidden');
});

function check_error() {
    if (err_msg !== '') {
        show_error(err_msg);
    }
}

window.addEventListener("load", check_error);
