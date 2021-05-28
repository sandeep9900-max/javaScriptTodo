let modalBtn = document.getElementById("modal-btn");
let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".close-btn");
modalBtn.onclick = function () {
  modal.style.display = "block";
};
closeBtn.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};

var saveValue = "";
// addArray();
let itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];
allLoop(itemsArray);

function addArray(value) {
  modal.style.display = "none";
  
  
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var task = document.getElementById("task").value;
  if (fname == "" && lname == "" && task == ""){  
    alert("please fill your Details..");  
    return false;  
  } 
  if (fname != "" && lname != "" && task != "") {
    itemsArray.push({
      fullname: `${fname} ${lname}`,
      fname: `${fname}`,
      lname: lname,
      task: task,
    });

     
    localStorage.setItem("items", JSON.stringify(itemsArray));

    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("task").value = "";

    allLoop(itemsArray);
  }
}

function Edit(item) {
  $(".Submit-Update-button").text("UPDATE").attr("onclick", `Update(${item})`);
  console.log(`Update(${item})`);
  document.getElementById("header").innerHTML = "Edit contact";
  modal.style.display = "block";

  document.getElementById("fname").value = itemsArray[item].fname;
  document.getElementById("lname").value = itemsArray[item].lname;
  document.getElementById("task").value = itemsArray[item].task;

  saveValue = itemsArray[item];
  console.log(itemsArray);
}
function Update(item) {
  console.log("update", item);
  modal.style.display = "none";
  var data = {};
  $(".Submit-Update-button").text("Submit");

  data["fname"] = document.getElementById("fname").value;
  data["fullname"] = `${document.getElementById("fname").value} ${
    document.getElementById("lname").value
  }`;
  data["lname"] = document.getElementById("lname").value;
  data["task"] = document.getElementById("task").value;

  if (data) {
    itemsArray.splice(itemsArray.indexOf(saveValue), 1, data);

    localStorage.setItem("items", JSON.stringify(itemsArray));

    allLoop(itemsArray);
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("task").value = "";
  }
}

function Delete(i) {
  confirm("Did you want to delete it!");
  var data = "";

  itemsArray.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  allLoop(itemsArray);
}
function updateColor(el) {
  el.parentElement.nextSibling.style.color = el.checked ? "red" : "black";
}
function allLoop(val) {
  $("#demo").empty();
  var data =
    "<tr><td><b>Name</b></td><td><b>Contact</b></td><td><b>Action</b></td></tr>";
  for (var i = 0; i <= itemsArray.length - 1; i++) {
    console.log(itemsArray[i]);

    data += "<tr>";
    data += "<td>" + itemsArray[i].fullname + "</td>";
    data += "<td>" + itemsArray[i].task + "</td>";
    data += `<td> <button onclick="Edit(${i})"class="btn btn-info"><i class="fa fa-edit faIcon"></button></td>`;
    data +=
      '<td><button onclick="Delete(' +
      i +
      ')"class="btn btn-warning"><i class="fa fa-trash-o faDelete"></button></td>';
    data += "</tr>";
  }
  $("#demo").append(data);
}
