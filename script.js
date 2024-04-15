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
// ^^^^^^ opacity changer ^^^^^^ //

//hi, i am not that good of a "developer"(if i can say it that way), so, i hope you give me some advise for this projeсt and js in general

const root = document.querySelector(':root');

const baseImage = 'https://images.unsplash.com/photo-1597747729747-0828f54b0b79';
var backgroundImageStored = localStorage.getItem('backgroundStored');

if (backgroundImageStored == null || backgroundImageStored == "") {
  localStorage.setItem('backgroundStored',baseImage);
  console.log('background not found. base image is used');
};

// ^^^^^^ save background image in local storage ^^^^^^ //

document
  .getElementById("backgroundInput")
  .addEventListener("input", function () {
    var backgroundImageURL = this.value;
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
// ^^^^^^ background changer ^^^^^^ //

// add or remove notes\\

const add_note = (noteContent) => {
  
  const notes = document.querySelector(".notes");
  var lastNote = notes.lastElementChild;

  var noteText = document.createElement("p");
  var noteContainer = document.createElement("div");
  noteContainer.classList.add("note");

  const textArea = document.getElementById("write_note");
  var textAreaContent = textArea.value;

  if (noteContent) {
    textAreaContent = noteContent;
  };

  if (textAreaContent.trim() === "") {
    textArea.focus();
    return;
  }

  noteText.textContent = textAreaContent;

  // Creating delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.classList.add("noteButtonsDelete");
  deleteButton.addEventListener("click", () => {
    const noteElement = deleteButton.parentNode;
    noteElement.remove();
  });

  // Creating edit button
  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  editButton.classList.add("noteButtonsEdit");
  editButton.addEventListener("click", () => {
    const noteElement = editButton.parentNode;
    const noteText = noteElement.querySelector("p");
    const textArea = document.getElementById("write_note");

    textArea.value = noteText.textContent;
    textArea.focus();
    noteElement.remove();
  });

  notes.appendChild(noteContainer);
  noteContainer.appendChild(noteText);
  noteContainer.appendChild(deleteButton);
  noteContainer.appendChild(editButton);

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

const noteChangeListener = () => {

  const notes = document.querySelector(".notes");
  let childCountBuffer = notes.childElementCount;

  setInterval(() => {
    if (childCountBuffer !== notes.childElementCount) {
      childCountBuffer = notes.childElementCount;
      console.log('noteChange');
      saveNotes();
    }
  }, 0);

};

const saveNotes = () => {

  const notes = document.querySelectorAll('.notes .note p');
  let noteTexts = Array.from(notes).map(note => note.textContent);
  noteTexts = noteTexts;

  localStorage.setItem('notes', JSON.stringify(noteTexts));
}

const loadNotes = () => {

  const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];

  for (let counter = 0; counter <= savedNotes.length - 1; counter++) {
    add_note(savedNotes[counter]);
  };
}

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
document
  .getElementById("backgroundInput")
  .addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault(); // Prevent the default action of pressing ENTER
    }
});

const textInputPlaceholder = `def typing(some-data, don't-read-pls):
  Simulate text.
  
  This function simulates text,
  why do you read this?
  
  :param data: Lorem ipsum dolor sit amet.
  :type data: why do you read this, just type you're notes
  :param iterations: Aenean euismod eu est eget.
    :type iterations: int
import time
for _ in range(iterations):
    for char in data:
        print(char, end='', flush=True)
        time.sleep(0.05)
    print()
{ log -> _______________________________________________________________________________ }
    
[$ user1] > Cras blandit eget augue ut iaculis.
[$ user1] > Maecenas luctus libero sit amet lectus aliquet consequat.
[$ user1] > Suspendisse vulputate ex lobortis, gravida diam.
[$ user1] > sudo rm -rf /
[# root ] > password: **********
[# root ] > deleting /             01:34 [ ========================================> ] 100%`;

const backgroundInputPlaceholder = `https://www.background-image.url/paste/here/index.html`;

const __init__ = () => {
 
  if (backgroundImageStored != baseImage) {
    document.getElementById("backgroundInput").value = backgroundImageStored;
  };
 
  root.style.backgroundImage = `url(${backgroundImageStored})`;
 
  noteChangeListener();
  loadNotes();
 
  if (JSON.parse(localStorage.getItem('notes')) && JSON.parse(localStorage.getItem('notes')).length === 0) {
    document.getElementById("write_note").focus();
  };

  const isFirstVisit = () => {
    return localStorage.getItem('visited') === null;
  }

  const onFirstVisit = () => {
    localStorage.setItem('visited', true);
  };
  if (isFirstVisit()) { onFirstVisit() } else { 
    document.getElementById("write_note").placeholder = textInputPlaceholder;
    document.getElementById("backgroundInput").placeholder = backgroundInputPlaceholder; 
  }
};

window.onload = __init__ ;