document.getElementById("write_note").addEventListener("focus", function () {
  const notesElement = document.querySelector(".notes");
  notesElement.style.transition = "opacity 0.4s"; // Apply transition property
  notesElement.style.opacity = "0"; // Hide .notes when #write_note is focused
});

document.getElementById("write_note").addEventListener("blur", function () {
  const notesElement = document.querySelector(".notes");
  notesElement.style.transition = "opacity 0.4s"; // Apply transition property
  notesElement.style.opacity = "1"; // Display .notes again when #write_note loses focus
});
//^^^^^^opacity changer^^^^^^//

//hi, i am not that good of a "developer"(if i can say it that way), so, i hope you give me some advise for this projeсt and js in general

const root = document.querySelector(':root');

const baseImage = 'https://images.unsplash.com/photo-1597747729747-0828f54b0b79';
var backgroundImageStored = localStorage.getItem('backgroundStored');

if (backgroundImageStored == null || backgroundImageStored == "") {
  localStorage.setItem('backgroundStored',baseImage);
  console.log('background not found. base image is used')
};

document
  .getElementById("backgroundInput")
  .addEventListener("input", function () {
    console.log(backgroundImageStored);
    var backgroundImageURL = this.value;
    console.log(backgroundImageStored);
    if (backgroundImageURL.trim() === "" || !isValidURL(backgroundImageURL)) {
      localStorage.setItem('backgroundStored','https://images.unsplash.com/photo-1597747729747-0828f54b0b79');      
    } else {
      localStorage.setItem('backgroundStored', backgroundImageURL); 
    };
    backgroundImageStored = localStorage.getItem('backgroundStored');
    root.style.backgroundImage = `url(${backgroundImageStored})`; 
  });

function isValidURL(url) {
  // Regular expression to check if the URL is valid
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(url);
}
//^^^^^^background changer^^^^^^//

//  !\/!\/!\/ add or remove notes \/!\/!\/!  \\

const add_note = () => {
  const notes = document.querySelector(".notes");
  var lastNote = notes.lastElementChild;

  var noteText = document.createElement("p");
  var noteVisuals = document.createElement("div");
  noteVisuals.classList.add("note");

  const textArea = document.getElementById("write_note");
  var textAreaContent = textArea.value;

  if (textAreaContent.trim() === "") {
    textArea.focus();
    return;
  }

  noteText.textContent = textAreaContent;

  // Creating delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.classList.add("note_buttons_delete");
  deleteButton.addEventListener("click", () => {
    const noteElement = deleteButton.parentNode;
    noteElement.remove();
  });

  // Creating edit button
  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  editButton.classList.add("note_buttons_edit");
  editButton.addEventListener("click", () => {
    const noteElement = editButton.parentNode;
    const noteText = noteElement.querySelector("p");
    const textArea = document.getElementById("write_note");

    textArea.value = noteText.textContent;
    textArea.focus();
    noteElement.remove();
  });

  notes.appendChild(noteVisuals);
  noteVisuals.appendChild(noteText);
  noteVisuals.appendChild(deleteButton);
  noteVisuals.appendChild(editButton);

  textArea.value = "";

  notes.scrollTop = -notes.scrollHeight;
};

const delete_note = () => {
  const notes = document.querySelector(".notes");
  var lastNote = notes.lastElementChild;

  const textArea = document.getElementById("write_note");
  var childrenCount = notes.children.length;

  if (childrenCount <= 1) {
    textArea.focus();
  }

  notes.removeChild(lastNote);
};

document
  .getElementById("write_note")
  .addEventListener("keydown", function (event) {
    const textArea = document.getElementById("write_note");
    var textAreaContent = textArea.value;

    var keyCode = event.keyCode || event.which;

    if (keyCode === 13 && !event.shiftKey) {
      event.preventDefault();

      add_note();
      if (textAreaContent.trim() != "") {
        document.getElementById("shiftFocus").focus();
      }
    }
    if (event.keyCode === 9) {
      event.preventDefault();
      var textarea = event.target;
      var start = textarea.selectionStart;
      var end = textarea.selectionEnd;

      textarea.value =
        textarea.value.substring(0, start) +
        "  " +
        textarea.value.substring(end);

      textarea.selectionStart = start + 2;
      textarea.selectionEnd = start + 2;
    }
    if (event.keyCode === 27) {
      document.getElementById("shiftFocus").focus();
    }
  }); 

document.addEventListener("keydown", function (event) {
  const textArea = document.getElementById("write_note");
  var textAreaContent = textArea.value;
  var keyCode = event.keyCode || event.which;

  if (event.keyCode === 45 && event.shiftKey || event.keyCode === 38) {
    event.preventDefault();
    textArea.focus();
  }
  if (event.keyCode === 46 && event.shiftKey) {
    delete_note();
  }
});

document.getElementById("write_note").focus();

setInterval(console.log("вчителька з інформатики дурна"),1000);