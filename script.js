// Load existing tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Render tasks
function renderList() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderList();
    });

    li.appendChild(checkbox);

    // Task text
    const text = document.createTextNode(" " + task.text + " ");
    li.appendChild(text);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderList();
    });

    li.appendChild(deleteBtn);
if (task.done) {
  li.style.textDecoration = "line-through";
}
    taskList.appendChild(li);
  });
}
addBtn.addEventListener("click", () => {
  const value = input.value.trim();

  if (value !== "") {
    tasks.push({
      text: value,
      done: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderList();
    input.value = "";
  }
});

renderList();
