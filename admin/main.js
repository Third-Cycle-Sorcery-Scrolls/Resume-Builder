// main.js: entry point wiring data, UI render, and events.

import {
  initStore,
  getUsers,
  getTemplates,
  upsertUser,
  deleteUser,
  toggleUserStatus,
  upsertTemplate,
  deleteTemplate,
  toggleTemplateStatus,
  getStats,
  getTheme,
  setTheme,
} from "./data.js";
import { render } from "./ui.js";
import {
  initEvents,
  openModal,
  closeModals,
  fillUserForm,
  fillTemplateForm,
} from "./events.js";

const viewEl = document.getElementById("view");
const breadcrumbEl = document.getElementById("breadcrumb");
let currentView = "dashboard";
let toastTimer;

const titleMap = {
  dashboard: "Dashboard",
  users: "Users",
  templates: "Resume Templates",
  statistics: "Statistics",
  settings: "Settings",
};

const setActiveNav = (view) => {
  document.querySelectorAll(".nav__link").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.view === view);
  });
};

const setThemeOnBody = (theme) => {
  document.body.dataset.theme = theme;
};

const showToast = (message) => {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
};

const refresh = (view = currentView) => {
  currentView = view;
  const payload = {
    users: getUsers(),
    templates: getTemplates(),
    stats: getStats(),
    theme: getTheme(),
  };
  viewEl.innerHTML = render(view, payload);
  breadcrumbEl.textContent = titleMap[view] || "Dashboard";
  setActiveNav(view);
  setThemeOnBody(payload.theme);
};

const emailIsValid = (email) => /\S+@\S+\.\S+/.test(email);

const handleUserSubmit = (payload) => {
  if (!payload.name || !payload.email) {
    showToast("Name and email are required.");
    return;
  }
  if (!emailIsValid(payload.email)) {
    showToast("Please enter a valid email.");
    return;
  }
  const normalized = {
    id: payload.id || undefined,
    name: payload.name.trim(),
    email: payload.email.trim(),
    role: payload.role || "User",
    status: payload.status || "Active",
  };
  upsertUser(normalized);
  closeModals();
  refresh(currentView === "users" ? "users" : currentView);
  showToast(normalized.id ? "User updated." : "User added.");
};

const handleTemplateSubmit = (payload) => {
  if (!payload.name) {
    showToast("Template name is required.");
    return;
  }
  const normalized = {
    id: payload.id || undefined,
    name: payload.name.trim(),
    status: payload.status || "Active",
  };
  upsertTemplate(normalized);
  closeModals();
  refresh(currentView === "templates" ? "templates" : currentView);
  showToast(normalized.id ? "Template updated." : "Template added.");
};

const handleEditUser = (id) => {
  const user = getUsers().find((u) => u.id === id);
  if (!user) return;
  document.getElementById("userModalTitle").textContent = "Edit User";
  fillUserForm(user);
  openModal("user");
};

const handleEditTemplate = (id) => {
  const template = getTemplates().find((t) => t.id === id);
  if (!template) return;
  document.getElementById("templateModalTitle").textContent = "Edit Template";
  fillTemplateForm(template);
  openModal("template");
};

const resetModalTitles = () => {
  document.getElementById("userModalTitle").textContent = "Add User";
  document.getElementById("templateModalTitle").textContent = "Add Template";
};

const handleToggleUser = (id) => {
  toggleUserStatus(id);
  refresh(currentView);
  showToast("User status updated.");
};

const handleDeleteUser = (id) => {
  deleteUser(id);
  refresh(currentView);
  showToast("User deleted.");
};

const handleToggleTemplate = (id) => {
  toggleTemplateStatus(id);
  refresh(currentView);
  showToast("Template status updated.");
};

const handleDeleteTemplate = (id) => {
  deleteTemplate(id);
  refresh(currentView);
  showToast("Template deleted.");
};

const handleThemeChange = (theme) => {
  setTheme(theme);
  setThemeOnBody(theme);
  showToast(`Theme set to ${theme}.`);
};

const handleNavigate = (view) => {
  refresh(view);
  closeModals();
};

const handleLogout = () => {
  // Clear login status
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  showToast("Logged out successfully.");
  // Redirect to signin page
  window.location.href = "../auth/signin.html";
};

const handleOpenModal = (name) => {
  if (name === "user") resetModalTitles();
  if (name === "template") resetModalTitles();
};

const bootstrap = () => {
  //check if admin is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const currentUser = localStorage.getItem("currentUser");
  if (isLoggedIn !== "true" || currentUser !== "admin@gmail.com") {
    window.location.href = "../auth/signin.html";
    return;
  }

  initStore();
  refresh("dashboard");
  initEvents({
    onNavigate: handleNavigate,
    onSubmitUser: handleUserSubmit,
    onSubmitTemplate: handleTemplateSubmit,
    onEditUser: handleEditUser,
    onEditTemplate: handleEditTemplate,
    onToggleUser: handleToggleUser,
    onDeleteUser: handleDeleteUser,
    onToggleTemplate: handleToggleTemplate,
    onDeleteTemplate: handleDeleteTemplate,
    onChangeTheme: handleThemeChange,
    onLogout: handleLogout,
    onOpenModal: handleOpenModal,
  });
};

bootstrap();
