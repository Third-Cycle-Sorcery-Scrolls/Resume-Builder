// events.js: attaches UI event listeners and delegates actions.

let handlers = {};

export const openModal = (name) => {
  const modal = document.querySelector(`.modal[data-modal="${name}"]`);
  if (modal) {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    const firstField = modal.querySelector("input, select, button");
    if (firstField) firstField.focus();
  }
};

export const closeModals = () => {
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  });
  // Clear forms after closing
  const forms = document.querySelectorAll(".modal form");
  forms.forEach((form) => form.reset());
};

export const fillUserForm = (user) => {
  const form = document.getElementById("userForm");
  if (!form || !user) return;
  form.querySelector('[name="id"]').value = user.id;
  form.querySelector('[name="name"]').value = user.name;
  form.querySelector('[name="email"]').value = user.email;
  form.querySelector('[name="role"]').value = user.role;
  form.querySelector('[name="status"]').value = user.status;
};

export const fillTemplateForm = (template) => {
  const form = document.getElementById("templateForm");
  if (!form || !template) return;
  form.querySelector('[name="id"]').value = template.id;
  form.querySelector('[name="name"]').value = template.name;
  form.querySelector('[name="status"]').value = template.status;
};

const handleNav = (e) => {
  const navLink = e.target.closest(".nav__link");
  if (!navLink) return;
  const view = navLink.dataset.view;
  handlers.onNavigate?.(view);
};

const handleModalTriggers = (e) => {
  const openBtn = e.target.closest("[data-open-modal]");
  if (openBtn) {
    const name = openBtn.dataset.openModal;
    handlers.onOpenModal?.(name);
    openModal(name);
    return;
  }
  const closeBtn = e.target.closest("[data-close-modal]");
  if (closeBtn) {
    closeModals();
  }
};

const handleTableActions = (e) => {
  const actionBtn = e.target.closest("[data-action]");
  if (!actionBtn) return;
  const action = actionBtn.dataset.action;
  const row = actionBtn.closest("[data-id]");
  const id = row?.dataset.id;
  if (!id) return;
  if (action === "edit-user") handlers.onEditUser?.(id);
  if (action === "edit-template") handlers.onEditTemplate?.(id);
  if (action === "toggle-user") handlers.onToggleUser?.(id);
  if (action === "delete-user") handlers.onDeleteUser?.(id);
  if (action === "toggle-template") handlers.onToggleTemplate?.(id);
  if (action === "delete-template") handlers.onDeleteTemplate?.(id);
};

const handleForms = () => {
  const userForm = document.getElementById("userForm");
  if (userForm) {
    userForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(userForm);
      const payload = Object.fromEntries(formData.entries());
      handlers.onSubmitUser?.(payload);
    });
  }
  const templateForm = document.getElementById("templateForm");
  if (templateForm) {
    templateForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(templateForm);
      const payload = Object.fromEntries(formData.entries());
      handlers.onSubmitTemplate?.(payload);
    });
  }
  document.addEventListener("submit", (e) => {
    const form = e.target;
    if (form && form.id === "settingsForm") {
      e.preventDefault();
      const theme = new FormData(form).get("theme");
      handlers.onChangeTheme?.(theme);
    }
  });
};

const handleGlobals = () => {
  document.addEventListener("click", (e) => {
    handleNav(e);
    handleModalTriggers(e);
    handleTableActions(e);
    const modalOverlay = e.target.classList.contains("modal");
    if (modalOverlay) closeModals();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModals();
  });
};

const handleSidebarToggle = () => {
  const toggle = document.querySelector(".sidebar__toggle");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const collapsed = document.body.classList.toggle("is-collapsed");
    toggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
  });
};

const handleLogout = () => {
  const btn = document.getElementById("logoutBtn");
  if (!btn) return;
  btn.addEventListener("click", () => handlers.onLogout?.());
};

export const initEvents = (options = {}) => {
  handlers = options;
  handleGlobals();
  handleForms();
  handleSidebarToggle();
  handleLogout();
};
