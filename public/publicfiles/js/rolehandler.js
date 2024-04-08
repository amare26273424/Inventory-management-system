const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const secondRole = urlParams.get("secondRole");

const roleSelectOption = document.getElementById("roleselectoption");

if (secondRole) {
    roleSelectOption.textContent = `${secondRole} Page`;
  if (secondRole == "manager") {
    roleSelectOption.href = "../manager-page/manager.html";
  } else if (secondRole == "storekeeper") {
    roleSelectOption.href = "../storekeeper-page/storekeeper.html";
  } else if (secondRole == "staff") {
    roleSelectOption.href = "../staffmember-page/staff.html";
  } else {
    roleSelectOption.href = "../adminpage/admin.html";
  }
} else {
  // Remove the role anchor element completely if secondRole is not present
  roleSelectOption.remove();
}
