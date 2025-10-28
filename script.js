// Elements
const openFormBtn = document.getElementById('openFormBtn');
const modalOverlay = document.getElementById('modalOverlay');
const closeModalBtn = document.getElementById('closeModalBtn');
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.querySelector('#studentTable tbody');

// Inputs
const nameInput = document.getElementById('nameInput');
const ageInput = document.getElementById('ageInput');
const emailInput = document.getElementById('emailInput');
const genderInputs = Array.from(document.getElementsByName('gender'));
const courseSelect = document.getElementById('courseSelect');

function openModal(){
  modalOverlay.classList.add('show');
  modalOverlay.setAttribute('aria-hidden', 'false');
  setTimeout(()=> nameInput.focus(), 50);
}

function closeModal(){
  modalOverlay.classList.remove('show');
  modalOverlay.setAttribute('aria-hidden', 'true');
  openFormBtn.focus();
}

// Reset form fields
function resetFormFields(){
  nameInput.value = "";
  ageInput.value = "";
  emailInput.value = "";
  genderInputs.forEach(g => g.checked = false);
  courseSelect.selectedIndex = 0;
}

// Add row to table
function addStudentRow(student){
  const tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${escapeHtml(student.name)}</td>
    <td>${escapeHtml(student.age)}</td>
    <td>${escapeHtml(student.course)}</td>
    <td>${escapeHtml(student.gender)}</td>
    <td>${escapeHtml(student.email)}</td>
    <td class="action-cell"><button type="button" class="delete-btn">Delete</button></td>
  `;
  // delete handling
  tr.querySelector('.delete-btn').addEventListener('click', () => {
    tr.remove();
  });

  studentTableBody.appendChild(tr);
}

// Simple HTML escaping for safety
function escapeHtml(text){
  if (text == null) return '';
  return String(text).replace(/[&<>"']/g, (s) => {
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s];
  });
}

// Event listeners
openFormBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

// close when clicking outside modal content
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// close on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('show')) {
    closeModal();
  }
});

// submit form
studentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // gather values
  const name = nameInput.value.trim();
  const age = ageInput.value.trim();
  const email = emailInput.value.trim();
  const course = courseSelect.value;
  const gender = (genderInputs.find(g => g.checked) || {}).value || '';

  // basic validation
  if (!name || !age || !email || !course || !gender) {
    alert('Please fill all fields.');
    return;
  }

  // add to table
  addStudentRow({ name, age, course, gender, email });

  // reset and close
  resetFormFields();
  closeModal();
});
