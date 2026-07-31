var avatarGradients = [
'linear-gradient(to right bottom, #ff2056 0%, #e60076 100%)',
'linear-gradient(to right bottom, #fe9a00 0%, #f54900 100%)',
'linear-gradient(to right bottom, #8e51ff 0%, #9810fa 100%)',
'linear-gradient(to right bottom, #00bc7d 0%, #009689 100%)',
'linear-gradient(to right bottom, #2b7fff 0%, #155dfb 100%)',
'linear-gradient(to right bottom, #00b8db 0%, #155dfb 100%)',
'linear-gradient(to right bottom, #e12afb 0%, #e60076 100%)'
]

// ----------- * Global Variables
var contactModal = document.getElementById("contactModal");
var contactModalTitle = document.getElementById("modalTitle");
var totalContacts = document.getElementById("totalContacts");
var totalFavContacts = document.getElementById("totalFavContacts");
var totalEmergContacts = document.getElementById("totalEmergContacts");
var contactCardContainer = document.getElementById("contactCardContainer");
var totalContactsCount = document.getElementById("totalContactsCount");
var searchInput = document.getElementById("searchInput");
var closeModalBtn = document.getElementById("closeModalBtn");
var cancelModalBtn = document.getElementById("cancelModalBtn");
var addContactBtn = document.getElementById("addContactBtn");
var saveModalBtn = document.getElementById("saveModalBtn");
var favoritesContent = document.getElementById("favoritesContent");
var emergencyContent = document.getElementById("emergencyContent");
var phoneInput = document.getElementById("phoneInput");
var nameInput = document.getElementById("nameInput");
var nameError = document.getElementById("nameError");
var phoneError = document.getElementById("phoneError");
var modalBody = document.querySelector(".modalBody")

// User form data

var contactForm = document.getElementById("contactForm");
var avatarPreview = document.getElementById("avatarPreview");
var avatarInput = document.getElementById("avatarInput");
var avatarPath = document.getElementById("avatarPath");
var contactName = document.getElementById("contactName");
var contactPhone = document.getElementById("contactPhone");
var contactEmail = document.getElementById("contactEmail");
var contactAddress = document.getElementById("contactAddress");
var contactGroup = document.getElementById("contactGroup");
var contactNote = document.getElementById("contactNote");
var contactFavorite = document.getElementById("contactFavorite");
var contactEmergency = document.getElementById("contactEmergency");
var contactId = document.getElementById("contactId");


closeModalBtn.addEventListener("click", function(){
  contactModal.classList.add("d-none");
  clearForm();
});
addContactBtn.addEventListener("click", function(){
  contactModal.classList.remove("d-none");
});
cancelModalBtn.addEventListener("click", function(){
  contactModal.classList.add("d-none");
  clearForm();
});
contactName.addEventListener("input", function(){
  if (contactName.value.trim()){
    contactName.classList.remove("border-alert");
    nameError.classList.add("d-none");
  }
  // else{
  //   contactName.classList.add("border-alert");
  //   nameError.classList.remove("d-none");
  // }
})
contactPhone.addEventListener("input", function(){
  if(contactPhone.value.trim()){
    contactPhone.classList.remove("border-alert");
    phoneError.classList.add("d-none");
  }
  // else{
  //   contactPhone.classList.add("border-alert");
  //   phoneError.classList.remove("d-none");

  // }
})

// function closeModal() {
//   contactModal.classList.toggle("d-none");
// }

var contactDataList = JSON.parse(localStorage.getItem("contacts")) || [];
displayData();

function addContact(){
  var contactInfo={
    userName: contactName.value,
    userPhone: contactPhone.value,
    userEmail: contactEmail.value,
    userAddress: contactAddress.value,
    userGroup: contactGroup.value,
    userNote: contactNote.value,
    userFavorite: contactFavorite.checked,
    userEmergency: contactEmergency.checked,
    userImage: avatarPath.value,
    userColor: avatarGradients[Math.floor(Math.random() * avatarGradients.length)]
  };

  // Username or Userphone validation
  var isValid = true;

  if (!contactName.value.trim()){
    contactName.classList.add("border-alert");
    nameError.classList.remove("d-none");
    // contactName.focus();
    isValid = false;
  }
  else{
    contactName.classList.remove("border-alert");
    nameError.classList.add("d-none");
  }
  if (!contactPhone.value.trim()){
    contactPhone.classList.add("border-alert");
    phoneError.classList.remove("d-none");
    // contactPhone.focus();
    isValid = false;
  }
  else{
    contactPhone.classList.remove("border-alert");
    phoneError.classList.add("d-none");
  }

  if(!isValid){
    if (!contactName.value.trim()){
      // contactName.focus();
      modalBody.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
    return false;
  }

    contactDataList.push(contactInfo);
    localStorage.setItem("contacts", JSON.stringify(contactDataList));
  
  Swal.fire({
          icon: "success",
          title: "Added!",
          text: "Contact has been added successfully.",
          timer: 1500,
          showConfirmButton: false
      });
    return true;
}

function clearForm(){
  contactName.value ="";
  contactPhone.value ="";
  contactEmail.value ="";
  contactAddress.value ="";
  contactGroup.value ="";
  contactNote.value ="";
  contactFavorite.checked = false;
  contactEmergency.checked = false;
  avatarPath.value ="";
  avatarPreview.innerHTML = `<i class="fa-solid fa-user text-white"></i>`;

      contactModalTitle.innerHTML = "Add New Contact";


};

function getInitials(userName){
  //.....Console Error Fix.....//
  if (!userName.trim()){
    return "";
  }
  //
  var name = userName.trim().split(/\s+/); // Used regex to handle multiple whitespace, preventing toUpperCase() function errors
  if (name.length === 1){
    return name[0][0].toUpperCase();
  }
  else {
    return name[0][0].toUpperCase() + name[1][0].toUpperCase();
  }
}

function getGroupBadge(group){
  switch (group){
    case "family" :
      return `<span class="family px-2 py-1 fs-11 lh-base fw-normal rounded-2">Family</span>`;
    case "friends" :
      return `<span class="friends px-2 py-1 fs-11 lh-base fw-normal rounded-2">Friends</span>`; 
    case "work" :
      return `<span class="work px-2 py-1 fs-11 lh-base fw-normal rounded-2">Work</span>`; 
    case "school" :
      return `<span class="school px-2 py-1 fs-11 lh-base fw-normal rounded-2">School</span>`; 
    case "other" :
      return `<span class="other px-2 py-1 fs-11 lh-base fw-normal rounded-2">Other</span>`; 
    
    case "" :
      return "";

  };
};

function createContactCard(currentContact, i){
  return`
            <div class="col-md-6 mb-4">
             <div class="contact-card d-flex flex-column h-100 bg-white rounded-4 overflow-hidden">
              <div class="card-body px-3">
                  <div class="card-title d-flex align-items-start">
                      <div class="position-relative flex-shrink-0">
                          <div class="avatar-container text-white rounded-12 overflow-hidden">
                              ${currentContact.userImage ? `<img src="${currentContact.userImage}" class="w-100 object-fit-cover overflow-hidden" alt="avatar"> `
                                : `<div class="avatar-initials d-flex align-items-center justify-content-center" style="background: ${currentContact.userColor};">${getInitials(currentContact.userName)}</div>`
                              }
                              <div
                                  class="badge-star position-absolute rounded-circle d-flex align-items-center justify-content-center ${currentContact.userFavorite ? "" : "d-none"}">
                                  <i class="fas fa-star text-white"></i>
                              </div>
                              ${currentContact.userEmergency ? `<div
                                  class="badge-heart position-absolute rounded-circle d-flex align-items-center justify-content-center">
                                  <i class="fas fa-heart-pulse text-white"></i>
                              </div>` : ""}                            
  
                          </div>
                      </div>
                      <div class="flex-grow-1 pt-1">
                          <h3 class="text-truncate fs-6 lh-base fw-medium text-gray-900 mb-1">${currentContact.userName}</h3>
                          <div class="d-flex align-items-center gap-2 mt-1">
                              <div class="phone-icon d-flex align-items-center justify-content-center rounded-2">
                                  <i class="fas fa-phone"></i>
                              </div>
                              <span class="fs-14 lh-base fw-light text-gray-500 text-truncate ">${currentContact.userPhone}</span>
                          </div>
                      </div>
                  </div>
                  <!-- Contact info -->
                  <div class="contact-info">
                      ${currentContact.userEmail ? `<div class="email-info d-flex align-items-center mb-2">
                          <div class="d-flex align-items-center justify-content-center rounded-3 bg-violet-100 text-violet-600 fs-10"
                              style="width: 28px; height: 28px;">
                              <i class="fas fa-envelope"></i>
                          </div>
                          <span class="text-gray-600 fs-14 lh-base fw-light text-truncate">${currentContact.userEmail}</span>
                      </div>` : ""}
                      ${currentContact.userAddress ? `<div class="address-info d-flex align-items-center gap-2">
                          <div class="d-flex align-items-center justify-content-center rounded-3 text-emerald-600 bg-emerald-100 fs-10"
                              style="width: 28px; height: 28px;">
                              <i class="fas fa-location-dot"></i>
                          </div>
                          <span class="text-gray-600 fs-14 lh-base fw-light text-truncate">${currentContact.userAddress}</span>
                      </div>` : ""}
                  </div>
  
                  <div class="info-tags d-flex flex-wrap gap-6">
                      ${getGroupBadge(currentContact.userGroup)}
                      <span
                          ${currentContact.userEmergency ? `class="d-inline-flex align-items-center gap-1 px-2 py-1 bg-rose-50 text-rose-600 fs-11 lh-base fw-normal rounded-2"><i class="fa-solid fa-heart-pulse fs-10"></i>Emergency` : ""}
                          </span>
                  </div>
              </div>
              <!-- Actions Footer -->
              <div class="card-footer d-flex justify-content-between px-3 mt-auto">
                  <div class="d-flex gap-6">
                      <a href="tel:${currentContact.userPhone}"
                          class="d-flex align-items-center justify-content-center text-emerald-600 rounded-3 fs-14 text-decoration-none"
                          title="Call">
                          <i class="fa-solid fa-phone"></i>
                      </a>
                      ${currentContact.userEmail ? `<a href="mailto:${currentContact.userEmail}"
                          class="d-flex align-items-center justify-content-center rounded-3 text-violet-600 fs-14 text-decoration-none"
                          title="Email">
                          <i class="fa-solid fa-envelope"></i>
                      </a>` : ""}
                  </div>
                  <div class="d-flex gap-6">
                      ${currentContact.userFavorite ? `<button onclick="toggleFavorite(${i})" class="d-flex align-items-center justify-content-center border border-0 rounded-3 fs-6"
                          title="Favorite">
                          <i class="fa-solid fa-star"></i></button>` : `<button onclick="toggleFavorite(${i})" class="favUnchecked d-flex align-items-center justify-content-center border border-0 rounded-3 text-gray-400 bg-transparent fs-6"
                                                  title="Favorite-Unchecked">
                                                  <i class="fa-regular fa-star"></i></button>`}
                      ${currentContact.userEmergency ? `<button onclick="toggleEmergency(${i})" class="d-flex align-items-center justify-content-center border border-0 rounded-3 fs-6 "
                          title="Emergency">
                          <i class="fa-solid fa-heart-pulse"></i></button>` : `<button onclick="toggleEmergency(${i})" class="emergUnchecked d-flex align-items-center justify-content-center border border-0 rounded-3 text-gray-400 bg-transparent fs-6 "
                                                  title="Emergency-Unchecked">
                                                  <i class="fa-regular fa-heart"></i></button>`}
                      <button
                          class="d-flex align-items-center justify-content-center text-gray-500 border border-0 rounded-3 fs-14 edit-btn"
                          title="Edit" onclick="setupDataForEdit(${i})">
                          <i class="fa-solid fa-pen"></i>
                      </button>
                      <button
                          class="d-flex align-items-center justify-content-center text-gray-500 border border-0 rounded-3 fs-14 delete-btn"
                          title="Delete" onclick="deleteContact(${i})">
                          <i class="fa-solid fa-trash"></i>
                      </button>
                  </div>
              </div>
          </div>
        </div>

  `
}

function displayData() {
  var cardContainer = "";
  var emergContainer = "";

  if(contactDataList.length ===0 ){
    cardContainer = `
                <div class="col-12 text-center py-80">
                    <div class="bg-gray-100 rounded-4 p-4 d-inline-flex align-items-center justify-content-center mx-auto mb-3" style="width: 80px; height: 80px;">
                        <i class="fas fa-address-book fs-2 text-gray-300"></i>
                    </div>
                    <p class="text-gray-500 fw-normal lh-base m-0">No contacts found</p>
                    <p class="text-gray-400 fs-14 lh-base fw-light mt-1 mb-0">Click "Add Contact" to get started</p>
                </div>
    `
  }
  else{
    for (var i = 0; i < contactDataList.length; i++) {
      var currentContact = contactDataList[i];
      cardContainer += createContactCard(currentContact,i)
  

    
         
    }
  }

  contactCardContainer.innerHTML = cardContainer;
  totalContacts.innerHTML = contactDataList.length;
  totalContactsCount.innerHTML = contactDataList.length;

  var favoriteCount = 0;
  for (var i = 0; i < contactDataList.length; i++) {
    if (contactDataList[i].userFavorite) {
      favoriteCount++;
      
    }
  }
  totalFavContacts.innerHTML = favoriteCount;

  var emergencyCount = 0;
  for (var i = 0; i < contactDataList.length; i++) {
    if (contactDataList[i].userEmergency) {
      emergencyCount++;
      
    }
  }
  totalEmergContacts.innerHTML = emergencyCount;

  displayFavorites();
  displayEmergency();

};

//........UserImage Input

avatarInput.addEventListener("change", function () {

    var file = this.files[0];

    if (!file) return;

    var reader = new FileReader();

    reader.onload = function (e) {

        avatarPath.value = e.target.result;

        avatarPreview.innerHTML = `
            <img src="${e.target.result}"
                 class="w-100 h-100 object-fit-cover rounded-circle"
                 alt="Avatar">
        `;
    };

    reader.readAsDataURL(file);

});

function displayFavorites(){
    var favContainer = "";
    var hasFavorites = false;
    for (var i = 0; i < contactDataList.length; i++) {
    currentFavContact = contactDataList[i];
    if(currentFavContact.userFavorite){
      hasFavorites = true;
       favContainer+= `
                    <div class="col-12 col-sm-6 col-xl-12">
                        <div id="fav-card" class="bg-gray-50 rounded-12">
                            <div class="d-flex align-items-center justify-content-between gap-12 ${contactDataList.length === 0 ? "d-none" : ""}">
                                <div class="flex-shrink-0">
                                    <div class="rounded-3 fs-14 lh-base fw-medium text-white" style="width: 40px; height: 40px;">
                                    ${currentFavContact.userImage ? `<img src="${currentFavContact.userImage}" class="w-100 object-fit-cover overflow-hidden rounded-3" alt="avatar"> `
                                    : `<div class="avatar-initials rounded-3 d-flex align-items-center justify-content-center" style="background: ${currentFavContact.userColor}; width: 40px; height: 40px;">${getInitials(currentFavContact.userName)}</div>`
                                  }
                              </div>
                                </div>
                                <div class="flex-grow-1 overflow-hidden">
                                    <h4 class="mb-0 fs-14 lh-base fw-semibold text-gray-900">${currentFavContact.userName}</h4>
                                    <p class="mb-0 fs-12 lh-base fw-light text-gray-500">${currentFavContact.userPhone}</p>
                                </div>
                                <a href="tel:${currentFavContact.userPhone}" class="d-flex align-items-center justify-content-center text-decoration-none rounded-3 text-emerald-600 bg-emerald-100">
                                    <i class="fa-solid fa-phone fs-12"></i>
                                </a>
                            </div>
                        </div>
                    
                    </div>
                        
      `   
    }
    }
    if(!hasFavorites){
          favContainer=`
                <div class="card-body text-center text-gray-400 small px-5">No favorites yet</div>
              `
    }

  favoritesContent.innerHTML = favContainer;

};
function displayEmergency(){
    var emergContainer = "";
    var hasEmergency = false;
    for (var i = 0; i < contactDataList.length; i++) {
    currentEmergContact = contactDataList[i];
    if(currentEmergContact.userEmergency){
      hasEmergency = true;
       emergContainer+= `
                  <div class="col-12 col-sm-6 col-xl-12">
                      <div id="emerg-card" class="bg-gray-50 rounded-12">
                            <div class="d-flex align-items-center justify-content-between gap-12">
                                <div class="flex-shrink-0">
                                    <div class="rounded-3 fs-14 lh-base fw-medium text-white" style="width: 40px; height: 40px;">
                                                              ${currentEmergContact.userImage ? `<img src="${currentEmergContact.userImage}" class="w-100 object-fit-cover overflow-hidden rounded-3" alt="avatar"> `
                                            : `<div class="avatar-initials rounded-3 d-flex align-items-center justify-content-center" style="background: ${currentEmergContact.userColor}; width: 40px; height: 40px;">${getInitials(currentEmergContact.userName)}</div>`
                                          }
                                    </div>
                                </div>
                                <div class="flex-grow-1 overflow-hidden">
                                    <h4 class="mb-0 fs-14 lh-base fw-semibold text-gray-900">${currentEmergContact.userName}</h4>
                                    <p class="mb-0 fs-12 lh-base fw-light text-gray-500">${currentEmergContact.userPhone}</p>
                                </div>
                                <a href="tel:${currentEmergContact.userPhone}" class="d-flex align-items-center justify-content-center text-decoration-none rounded-3">
                                    <i class="fa-solid fa-phone fs-12"></i>
                                </a>
                            </div>
                        </div>
                               
                  </div>
                        
      ` 
    }
    }
    if(!hasEmergency){
       emergContainer=`
    <div class="card-body text-center text-gray-400 small px-5">No emergency contacts yet</div>
    `
         
    }

  emergencyContent.innerHTML = emergContainer;

};

var currentUpdateIndex=null;

function deleteContact(index){

  
    Swal.fire({

        title: "Delete Contact?",
        text: "Are you sure you want to delete " + contactDataList[index].userName +"? This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) 
      {
        contactDataList.splice(index,1)
          localStorage.setItem("contacts", JSON.stringify(contactDataList));
            displayData();
            displayFavorites();
            displayEmergency();
            Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Contact has been deleted.",
            timer: 1500,
            showConfirmButton: false
      });
      }
        
});
    
};

function setupDataForEdit(updateIndex){

  currentUpdateIndex=updateIndex;

  var contacts=contactDataList[updateIndex]

  contactName.value=contacts.userName;
  contactPhone.value=contacts.userPhone;
  contactEmail.value=contacts.userEmail;
  contactAddress.value=contacts.userAddress;
  contactGroup.value=contacts.userGroup;
  contactNote.value=contacts.userNote;
  contactFavorite.checked=contacts.userFavorite;
  contactEmergency.checked=contacts.userEmergency;

  avatarPath.value = contacts.userImage;

if (contacts.userImage) {
    avatarPreview.innerHTML = `
        <img src="${contacts.userImage}"
             class="w-100 h-100 object-fit-cover rounded-circle">
    `;
} else {
    avatarPreview.innerHTML = `
        <div class="avatar-initials rounded-circle d-flex align-items-center justify-content-center"
             style="background:${contacts.userColor}; width:100%; height:100%;">
            ${getInitials(contacts.userName)}
        </div>
    `;
}

    
    contactModalTitle.innerHTML = "Edit Contact";
    contactModal.classList.remove("d-none");

}
function updateContact(){
  console.log(contactDataList[currentUpdateIndex]);
  contactDataList[currentUpdateIndex]={
    userName: contactName.value,
    userPhone: contactPhone.value,
    userEmail: contactEmail.value,
    userAddress: contactAddress.value,
    userGroup: contactGroup.value,
    userNote: contactNote.value,
    userFavorite: contactFavorite.checked,
    userEmergency: contactEmergency.checked,

    userColor: contactDataList[currentUpdateIndex].userColor,
    userImage: avatarPath.value || contactDataList[currentUpdateIndex].userImage

  }
console.log(contactDataList[currentUpdateIndex]);
  localStorage.setItem("contacts", JSON.stringify(contactDataList));
  // displayData();
  clearForm();
  currentUpdateIndex = null;

  Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Contact has been updated successfully.",
        timer: 1500,
        showConfirmButton: false
    });

}

contactForm.addEventListener("submit", function(e){
  e.preventDefault();
  if (currentUpdateIndex===null) {
    if(!addContact()){
      return;
    }
    contactModal.classList.add("d-none");
  }
 
  else{
    updateContact();
     contactModal.classList.add("d-none");

  }
  clearForm();
  displayData();
  displayFavorites();
  displayEmergency();
  contactModal.classList.add("d-none");

})

function toggleEmergency(index){

    contactDataList[index].userEmergency =
    !contactDataList[index].userEmergency;

    localStorage.setItem(
        "contacts",
        JSON.stringify(contactDataList)
    );

    displayData();
}
function toggleFavorite(index){

    contactDataList[index].userFavorite =
    !contactDataList[index].userFavorite;

    localStorage.setItem(
        "contacts",
        JSON.stringify(contactDataList)
    );

    displayData();
}


//SearchInput
searchInput.addEventListener("input", searchContacts);

function searchContacts() {
  var searchValue = searchInput.value.toLowerCase();
  var cardContainer = "";
  for (var i = 0; i < contactDataList.length; i++) {
    var contact = contactDataList[i];

    if(
      contact.userName.toLowerCase().startsWith(searchValue) ||
      contact.userEmail.toLowerCase().startsWith(searchValue) ||
      contact.userPhone.toLowerCase().includes(searchValue)
    ){      
      cardContainer+= createContactCard(contact,i);     
    }   
  }
  if (cardContainer === "") {
    cardContainer = `
      <div class="col-12 text-center py-80">
        <div class="bg-gray-100 rounded-4 p-4 d-inline-flex align-items-center justify-content-center mx-auto mb-3" style="width: 80px; height: 80px;">
          <i class="fas fa-address-book fs-2 text-gray-300"></i>
        </div>
        <p class="text-gray-500 fw-normal lh-base m-0">No contacts found</p>
        <p class="text-gray-400 fs-14 lh-base fw-light mt-1 mb-0">
          Try another search or add a new contact.
        </p>
      </div>
    `;
  }

  contactCardContainer.innerHTML = cardContainer;

}