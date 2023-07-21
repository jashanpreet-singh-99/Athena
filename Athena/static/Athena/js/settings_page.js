console.log("Script is running ", currentMinFeature);

const editButton = document.getElementById('edit-button');
const readOnlyFields = document.getElementsByClassName('read-only');

const cancelAccountButton = document.getElementById('cancel-membership');
const dialogOverlay = document.getElementById('dialog-overlay');
const dialogBox = document.getElementById('dialog-box');
const cancelMembershipButton = document.getElementById('cancel-membership-button');
const continueMembershipButton = document.getElementById('continue-membership-button');

const upgradeButton = document.getElementById('upgrade-button');
const upgradeDialog = document.getElementById('upgrade-dialog');

const monthlyRateBtn = document.getElementById('monthly-button');
const yearlyRateBtn = document.getElementById('yearly-button');
const exitBuyDialog = document.getElementById('exit-dialog-button');
const buySelectedButtonD = document.getElementById('buy-selected-btn-d');
const buySelectedButtonL = document.getElementById('buy-selected-btn-l');
const buySelectedButtonI = document.getElementById('buy-selected-btn-i');
const buySelectedButtonG = document.getElementById('buy-selected-btn-g');

const buySelectedButtonDDiv = document.getElementById('buy-selected-btn-d-div');
const buySelectedButtonLDiv = document.getElementById('buy-selected-btn-l-div');
const buySelectedButtonIDiv = document.getElementById('buy-selected-btn-i-div');
const buySelectedButtonGDiv = document.getElementById('buy-selected-btn-g-div');

const buySelectedButtonLDivY = document.getElementById('buy-selected-btn-l-div-y');
const buySelectedButtonIDivY = document.getElementById('buy-selected-btn-i-div-y');
const buySelectedButtonGDivY = document.getElementById('buy-selected-btn-g-div-y');

const membershipItems = document.querySelectorAll('.membership-price-item')
const featureItems = document.querySelectorAll('.feature-item')
const membershipBuySelection = document.getElementById('membership-buy-selection')
const membershipUpForm = document.getElementById('membership-upgrade-form');

editButton.addEventListener('click', function() {
    document.querySelector('.details-container').classList.toggle('edit-mode');
    if (editButton.innerHTML === 'Edit Details') {
        editButton.innerHTML = 'Save Details';
        enableFields();
    } else {
        editButton.innerHTML = 'Edit Details';
        disableFields();
        const form = document.getElementById('user_names_form');
        form.submit();
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
    const form = document.getElementById('profile_form');
    form.submit();

  }
}

if (cancelAccountButton != null) {
    cancelAccountButton.addEventListener('click', () => {
      dialogOverlay.style.display = 'block';
      dialogBox.style.display = 'block';
    });
}

cancelMembershipButton.addEventListener('click', () => {
  // Perform cancel membership action
  console.log('Cancel membership clicked');
  const form = document.getElementById('membership_form');
  form.submit();
});

continueMembershipButton.addEventListener('click', () => {
  // Perform continue membership action
  console.log('Continue membership clicked');
  dialogOverlay.style.display = 'none';
  dialogBox.style.display = 'none';
});


upgradeButton.addEventListener('click', () => {
  upgradeDialog.style.display = 'flex';
  dialogOverlay.style.display = 'block';
});

upgradeDialog.addEventListener('click', (event) => {
  if (event.target === upgradeDialog) {
    upgradeDialog.style.display = 'none';
    dialogOverlay.style.display = 'none';
  }
});

dialogOverlay.addEventListener('click', () => {
  dialogOverlay.style.display = 'none';
  dialogBox.style.display = 'none';
  upgradeDialog.style.display = 'none';
});

let selectedPriceType = 0

monthlyRateBtn.addEventListener('click', () => {
    monthlyRateBtn.classList.add("sel");
    yearlyRateBtn.classList.remove("sel");
    if (selectedPriceType > 0) {
        const membershipItems = document.querySelectorAll('.membership-price-item');
        membershipItems.forEach(item => {
            const priceElement = item.querySelector('h2');
            const currentPrice = parseFloat(priceElement.textContent.replace('$', ''));
            const newPrice = currentPrice / 12;
            priceElement.textContent = `$${newPrice}`;
        });
        selectedPriceType = 0;
    }
});

yearlyRateBtn.addEventListener('click', () => {
    monthlyRateBtn.classList.remove("sel");
    yearlyRateBtn.classList.add("sel");
    if (selectedPriceType < 1) {
        const membershipItems = document.querySelectorAll('.membership-price-item');
        membershipItems.forEach(item => {
            const priceElement = item.querySelector('h2');
            const currentPrice = parseFloat(priceElement.textContent.replace('$', ''));
            const newPrice = currentPrice * 12;
            priceElement.textContent = `$${newPrice}`;
        });
        selectedPriceType = 1;
    }
});

buySelectedButtonD.addEventListener('click', () => {
    membershipUpForm.submit();
});

exitBuyDialog.addEventListener('click', () => {
    dialogOverlay.style.display = 'none';
    upgradeDialog.style.display = 'none';
});

function updateFeatures() {
    featureItems.forEach(item => {
        const text = item.querySelector('p');
        const image = item.querySelector('img');
        let feature_name = text.textContent;
        if (currentMinFeature >= features[feature_name]) {
            image.src = "https://img.icons8.com/070708/material-rounded/24/checked--v1.png";
        } else {
            image.src = "https://img.icons8.com/070708/ios/50/cancel.png";
        }
        // console.log(features[feature_name]);
    });
}

function updateButtons(index) {
    buySelectedButtonDDiv.classList.add("hide");
    buySelectedButtonLDiv.classList.add("hide");
    buySelectedButtonIDiv.classList.add("hide");
    buySelectedButtonGDiv.classList.add("hide");
    buySelectedButtonLDivY.classList.add("hide");
    buySelectedButtonIDivY.classList.add("hide");
    buySelectedButtonGDivY.classList.add("hide");
    switch(index) {
        case '2':
            if (selectedPriceType > 0) {
                buySelectedButtonLDivY.classList.remove("hide");
            } else {
                buySelectedButtonLDiv.classList.remove("hide");
            }
            break;
        case '3':
            if (selectedPriceType > 0) {
                buySelectedButtonIDivY.classList.remove("hide");
            } else {
                buySelectedButtonIDiv.classList.remove("hide");
            }
            break;
        case '4':
            if (selectedPriceType > 0) {
                buySelectedButtonGDivY.classList.remove("hide");
            } else {
                buySelectedButtonGDiv.classList.remove("hide");
            }
            break;
        default:
            buySelectedButtonDDiv.classList.remove("hide");
            break;
    }
}

membershipItems.forEach(item => {
  item.addEventListener('click', () => {
    // Remove 'sel' class from all items
    membershipItems.forEach(item => {
      item.classList.remove('sel');
      const image = item.querySelector('img');
      image.src = "https://img.icons8.com/aaaaaa/ios-filled/50/circled.png";
    });

    // Add 'sel' class to the clicked item
    item.classList.add('sel');
    const image = item.querySelector('img');
    image.src = "https://img.icons8.com/ffffff/material-rounded/24/checked--v1.png";

    const cureM = item.querySelector('p');
    currentMinFeature = cureM.textContent;
    updateButtons(currentMinFeature);
    membershipBuySelection.value = currentMinFeature;
    updateFeatures();

  });

  item.addEventListener('dblclick', () => {
      membershipUpForm.submit();
  });
});