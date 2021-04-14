// var UsersModal = function() {
//     this.open = function(onModalOpen, title, modalMode) {
//         var usersModal = document.getElementById("usersModal");
//         usersModal.classList.add("popup");
//         usersModal.innerHTML = `
//         <div class="popup-contents">
//             <div class="popup-header">
//                 <h4>${title}</h4>
//                 <button class="btn btn-light modal-close">&times;</button>
//             </div>
//             <div class="popup-form">
//                 <form id="userForm" method="POST">
//                     <label for="FirstName">Please enter First Name:</label>
//                     <input type="text" id="FirstNameI" name="FirstName" placeholder="John" required minlength="5" maxlength="30"><br />
//                     <label for="LastName">Please enter Last Name:</label>
//                     <input type="text" id="LastNameI" name="LastName" placeholder="Doe" required minlength="5" maxlength="30" value="Sychova"><br />
//                     <label for="Age">Please enter your age:</label>
//                     <input type="number" id="AgeI" name="Age" placeholder="333" required min=18 value="18"><br />
//                     <label for="Phone">Please enter your phone:</label>
//                     <input type="text" id="PhoneI" name="Phone" placeholder="(29)321 65 75" required pattern="^[(]{0,1}[0-9]{2,2}[)]{0,1}[0-9]{3,3}\\s[0-9]{2,2}\\s[0-9]{2,2}$" minlength="12" maxlength="30" value="(29)321 65 75"><br />
//                     <label for="Email">Please enter your email:</label>
//                     <input type="text" id="EmailI" name="Email" placeholder="john.doe@gmail.com" required pattern="\\S+@\\S+\\.\\S+" value="anastasiya.sychova@gmail.com"><br />
//                     <label for="Gender">What is your gender</label>
//                     <select name="Gender" id="GenderI">
// 						<option value="Female">Female</option>
// 						<option value="Male">Male</option>
// 						<option value="Transgender female">Transgender female</option>
// 						<option value="Transgender male">Transgender male</option>
// 					</select><br />
//                 </form>
//             </div>
//             <div class="popup-footer">
//                 <span class="validationWarning"></span>
//                 <button id="addUser" class="btn btn-success">Add</button>
//                 <button id="updateUser" class="btn btn-success">Save</button>
//                 <button id="formReset" class="btn btn-secondary">Reset</button>
//                 <button class="btn btn-link modal-close">Close</button>
//             </div>`
//         if (onModalOpen) {
//             onModalOpen();
//         }
//         if (modalMode) {
//             modalMode();
//         }
//         document.querySelector(".popup").style.display = "flex";
//         document.querySelector(".popup").style.animation = "popupIN 500ms";
//     }
//     this.close = function() {
//         setTimeout(function() { document.querySelector(".popup").style.display = "none"; }, 500);
//         document.querySelector(".popup").style.animation = "popupOUT 500ms";
//         setTimeout(function() { usersModal.classList.remove("popup"); }, 500);
//         usersModal.innerHTML = "";
//     }
//     this.validate = function() {
//         form = document.getElementById("userForm");
//         if (form.checkValidity()) {
//             return true;
//         } else {
//             document.querySelector(".validationWarning").innerHTML = "Your form is not valid. Please revise your data.";
//         }
//     }
//     this.read = function(userID) {
//         var objectUser = {};
//         objectUser.Id = userID;
//         objectUser.FirstName = document.getElementById("FirstNameI").value;
//         objectUser.LastName = document.getElementById("LastNameI").value;
//         objectUser.Age = document.getElementById("AgeI").value;
//         objectUser.Phone = document.getElementById("PhoneI").value;
//         objectUser.Email = document.getElementById("EmailI").value;
//         objectUser.Gender = document.getElementById("GenderI").value;
//         return objectUser;
//     }
// }