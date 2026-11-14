const pinnedList = document.getElementById("pinned-list");
const otherList = document.getElementById("other-list");

const pinnedSection = document.getElementById("pinned-notes");
const otherSection = document.getElementById("other-notes");

const notesPanel = document.getElementById("notes-panel");
const contentPanel = document.getElementById("content-panel");
const noteDetails = document.getElementById("note-details");
const noteForm = document.getElementById("note-form");

const detailsTitle = document.getElementById("details-title");
const detailsDate = document.getElementById("details-date");
const detailsAuthor = document.getElementById("details-author");
const detailsText = document.getElementById("details-text");

const titleInput = document.getElementById("note-title");
const authorInput = document.getElementById("note-author");
const textInput = document.getElementById("note-text");

const searchInput = document.getElementById("search-input");
const searchBox = document.getElementById("search-box");
const emptySearch = document.getElementById("empty-search");

const floatingAdd = document.getElementById("floating-add");
const addNoteNav = document.getElementById("add-note-nav");
const showNotesNav = document.getElementById("show-notes");
const addPinnedButton = document.getElementById("add-pinned-note");

const sidebar = document.getElementById("sidebar");
const mobileHeader = document.querySelector(".mobile-header");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const closeDrawerBtn = document.getElementById("close-drawer-btn");
const mobileSearchBtn = document.getElementById("mobile-search-btn");
const searchIconSvg = document.getElementById("search-icon-svg");
const closeSearchSvg = document.getElementById("close-search-svg");

const STORAGE_KEY = "almdrasa-notes";

let notes = loadNotes();
let selectedNoteId = null;

function isMobileView() {
  return window.innerWidth <= 600;
}

function loadNotes() {
  try {
    const savedNotes = localStorage.getItem(STORAGE_KEY);

    if (!savedNotes) return [];

    const parsedNotes = JSON.parse(savedNotes);

    return Array.isArray(parsedNotes) ? parsedNotes : [];
  } catch (error) {
    console.error("Error loading notes:", error);
    return [];
  }
}

function saveNotes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Error saving notes:", error);
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function createNote(title, text, author = "", pinned = false) {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    text: text.trim(),
    author: author.trim(),
    date: new Date().toISOString(),
    pinned,
  };
}

function renderNotes() {
  pinnedList.replaceChildren();
  otherList.replaceChildren();

  const searchValue = searchInput.value.trim().toLowerCase();

  const filteredNotes = notes.filter((note) => {
    const title = (note.title || "").toLowerCase();
    const text = (note.text || "").toLowerCase();
    const author = (note.author || "").toLowerCase();

    return (
      title.includes(searchValue) ||
      text.includes(searchValue) ||
      author.includes(searchValue)
    );
  });

  const pinnedNotes = filteredNotes.filter((note) => note.pinned);
  const otherNotes = filteredNotes.filter((note) => !note.pinned);

  pinnedNotes.forEach((note) => {
    pinnedList.appendChild(createNoteCard(note));
  });

  otherNotes.forEach((note) => {
    otherList.appendChild(createNoteCard(note));
  });

  pinnedSection.classList.toggle("hidden", pinnedNotes.length === 0);
  otherSection.classList.toggle("hidden", otherNotes.length === 0);
  emptySearch.classList.toggle("visible", filteredNotes.length === 0);

  const selectedNote = filteredNotes.find((note) => note.id === selectedNoteId);

  if (selectedNote) {
    updateNoteDetails(selectedNote);
  } else if (selectedNoteId !== null) {
    selectedNoteId = null;
    showEmptyDetails();
  }
}

function createNoteCard(note) {
  const card = document.createElement("article");
  card.className = "note-card";

  if (note.id === selectedNoteId) {
    card.classList.add("selected");
  }

  card.dataset.testid = "note";
  card.dataset.id = note.id;

  const title = document.createElement("h3");
  title.textContent = note.title || "Untitled";

  const description = document.createElement("p");
  description.textContent = note.text;

  const footer = document.createElement("div");
  footer.className = "note-card-footer";

  const date = document.createElement("time");
  date.textContent = formatDate(note.date);
  date.dateTime = note.date;

  const actions = document.createElement("div");
  actions.className = "note-actions";

  const pinButton = document.createElement("button");
  pinButton.type = "button";
  pinButton.className = "pin-btn";
  pinButton.dataset.testid = "pin-note";
  pinButton.textContent = note.pinned ? "Unpin" : "Pin";

  if (note.pinned) {
    pinButton.classList.add("pinned");
  }

  pinButton.setAttribute("aria-label", note.pinned ? "Unpin note" : "Pin note");

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-btn";
  deleteButton.dataset.testid = "delete-note";
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("aria-label", "Delete note");

  actions.append(pinButton, deleteButton);
  footer.append(date, actions);
  card.append(title, description, footer);

  return card;
}

function updateNoteDetails(note) {
  noteDetails.classList.remove("hidden");
  noteForm.classList.add("hidden");

  detailsTitle.textContent = note.title || "Untitled";
  detailsDate.textContent = formatDate(note.date);
  detailsAuthor.textContent = note.author ? `/ By ${note.author}` : "";
  detailsText.textContent = note.text;

  floatingAdd.classList.remove("hidden");
  updateNavigation(false);

  if (isMobileView()) {
    notesPanel.classList.add("mobile-hidden");
    contentPanel.classList.remove("mobile-hidden");
  }
}

function showEmptyDetails() {
  detailsTitle.textContent = "Select a note";
  detailsDate.textContent = "";
  detailsAuthor.textContent = "";
  detailsText.textContent = "Select a note to view its content.";
}

function showAddNoteForm() {
  noteDetails.classList.add("hidden");
  noteForm.classList.remove("hidden");

  titleInput.value = "";
  authorInput.value = "";
  textInput.value = "";

  floatingAdd.classList.add("hidden");
  updateNavigation(true);

  if (isMobileView()) {
    notesPanel.classList.add("mobile-hidden");
    contentPanel.classList.remove("mobile-hidden");
  }

  titleInput.focus();
}

function showNotesView() {
  noteForm.classList.add("hidden");
  noteDetails.classList.remove("hidden");

  floatingAdd.classList.remove("hidden");
  updateNavigation(false);

  if (isMobileView()) {
    notesPanel.classList.remove("mobile-hidden");
    contentPanel.classList.add("mobile-hidden");
    return;
  }

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  if (selectedNote) {
    updateNoteDetails(selectedNote);
  } else {
    showEmptyDetails();
  }
}

function updateNavigation(isAdding) {
  addNoteNav.classList.toggle("active", isAdding);
  showNotesNav.classList.toggle("active", !isAdding);
}

function addNewNote(pinned = false) {
  const title = titleInput.value;
  const author = authorInput.value;
  const text = textInput.value;

  if (!text.trim()) {
    textInput.focus();
    return;
  }

  const newNote = createNote(title, text, author, pinned);

  notes.unshift(newNote);
  selectedNoteId = newNote.id;

  saveNotes();
  renderNotes();
  noteForm.reset();

  if (isMobileView()) {
    showNotesView();
  } else {
    updateNoteDetails(newNote);
  }
}

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addNewNote(false);
});

addPinnedButton.addEventListener("click", () => {
  addNewNote(true);
});

function handleNoteActions(event) {
  const card = event.target.closest('[data-testid="note"]');

  if (!card) return;

  const noteId = card.dataset.id;
  const note = notes.find((item) => item.id === noteId);

  if (!note) return;

  if (event.target.closest('[data-testid="pin-note"]')) {
    note.pinned = !note.pinned;
    saveNotes();
    renderNotes();
    return;
  }

  if (event.target.closest('[data-testid="delete-note"]')) {
    notes = notes.filter((item) => item.id !== noteId);

    if (selectedNoteId === noteId) {
      selectedNoteId = null;
      showEmptyDetails();
    }

    saveNotes();
    renderNotes();
    return;
  }

  selectedNoteId = noteId;
  renderNotes();
  updateNoteDetails(note);
}

pinnedList.addEventListener("click", handleNoteActions);
otherList.addEventListener("click", handleNoteActions);

searchInput.addEventListener("input", renderNotes);

mobileMenuBtn.addEventListener("click", () => {
  sidebar.classList.add("open");
});

closeDrawerBtn.addEventListener("click", () => {
  sidebar.classList.remove("open");
});

function closeMobileSearch() {
  searchBox.classList.remove("mobile-open");

  sidebar.insertBefore(searchBox, sidebar.querySelector(".sidebar-nav"));

  document.body.classList.remove("search-active");

  searchIconSvg.classList.remove("hidden");
  closeSearchSvg.classList.add("hidden");

  searchInput.value = "";
  renderNotes();
}

mobileSearchBtn.addEventListener("click", () => {
  const isOpen = searchBox.classList.contains("mobile-open");

  if (!isOpen) {
    mobileHeader.appendChild(searchBox);

    searchBox.classList.add("mobile-open");
    document.body.classList.add("search-active");

    searchIconSvg.classList.add("hidden");
    closeSearchSvg.classList.remove("hidden");

    if (isMobileView()) {
      showNotesView();
    }

    searchInput.focus();
  } else {
    closeMobileSearch();
  }
});

floatingAdd.addEventListener("click", showAddNoteForm);

addNoteNav.addEventListener("click", () => {
  showAddNoteForm();
  sidebar.classList.remove("open");
});

showNotesNav.addEventListener("click", () => {
  showNotesView();
  sidebar.classList.remove("open");
});

document.getElementById("logo").addEventListener("click", (event) => {
  event.preventDefault();
  showNotesView();
});

document.getElementById("mobile-logo").addEventListener("click", (event) => {
  event.preventDefault();
  showNotesView();
});

window.addEventListener("resize", () => {
  if (!isMobileView()) {
    if (searchBox.classList.contains("mobile-open")) {
      closeMobileSearch();
    }

    notesPanel.classList.remove("mobile-hidden");
    contentPanel.classList.remove("mobile-hidden");
    sidebar.classList.remove("open");
  } else {
    if (!noteForm.classList.contains("hidden")) {
      notesPanel.classList.add("mobile-hidden");
      contentPanel.classList.remove("mobile-hidden");
    } else {
      notesPanel.classList.remove("mobile-hidden");
      contentPanel.classList.add("mobile-hidden");
    }
  }
});

function initializeApp() {
  renderNotes();

  if (isMobileView()) {
    notesPanel.classList.remove("mobile-hidden");
    contentPanel.classList.add("mobile-hidden");
  } else if (notes.length > 0) {
    selectedNoteId = notes[0].id;
    renderNotes();
    updateNoteDetails(notes[0]);
  } else {
    showEmptyDetails();
  }
}

initializeApp();
