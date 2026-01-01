// data.js: handles in-memory data with localStorage persistence.

const STORAGE_KEYS = {
  users: "rb_admin_users",
  templates: "rb_admin_templates",
  theme: "rb_admin_theme",
};

const defaultUsers = [
  {
    id: "u-1001",
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: "u-1002",
    name: "Jamie Patel",
    email: "jamie.patel@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: "u-1003",
    name: "Priya Singh",
    email: "priya.singh@example.com",
    role: "User",
    status: "Blocked",
  },
];

const defaultTemplates = [
  { id: "1", name: "Modern Minimal", status: "Active" },
  { id: "2", name: "Serif Professional", status: "Inactive" },
  { id: "3", name: "Bold Accent", status: "Active" },
];

const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.error("Failed to parse storage", err);
    return fallback;
  }
};

export const initStore = () => {
  if (!localStorage.getItem(STORAGE_KEYS.users))
    save(STORAGE_KEYS.users, defaultUsers);
  if (!localStorage.getItem(STORAGE_KEYS.templates))
    save(STORAGE_KEYS.templates, defaultTemplates);
  if (!localStorage.getItem(STORAGE_KEYS.theme))
    save(STORAGE_KEYS.theme, "light");
};

const generateId = (prefix) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(16)
    .slice(2, 7)}`;

export const getUsers = () => load(STORAGE_KEYS.users, defaultUsers);
export const getTemplates = () =>
  load(STORAGE_KEYS.templates, defaultTemplates);

export const upsertUser = (payload) => {
  // TODO: replace localStorage with real API call when backend exists.
  const users = getUsers();
  const index = users.findIndex((u) => u.id === payload.id);
  if (index >= 0) {
    users[index] = { ...users[index], ...payload };
  } else {
    users.push({ ...payload, id: generateId("u") });
  }
  save(STORAGE_KEYS.users, users);
  return users;
};

export const deleteUser = (id) => {
  const users = getUsers().filter((u) => u.id !== id);
  save(STORAGE_KEYS.users, users);
  return users;
};

export const toggleUserStatus = (id) => {
  const users = getUsers().map((u) =>
    u.id === id
      ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" }
      : u
  );
  save(STORAGE_KEYS.users, users);
  return users;
};

export const upsertTemplate = (payload) => {
  // TODO: replace localStorage with real API call when backend exists.
  const templates = getTemplates();
  const index = templates.findIndex((t) => t.id === payload.id);
  if (index >= 0) {
    templates[index] = { ...templates[index], ...payload };
  } else {
    templates.push({ ...payload, id: generateId("t") });
  }
  save(STORAGE_KEYS.templates, templates);
  return templates;
};

export const deleteTemplate = (id) => {
  const templates = getTemplates().filter((t) => t.id !== id);
  save(STORAGE_KEYS.templates, templates);
  return templates;
};

export const toggleTemplateStatus = (id) => {
  const templates = getTemplates().map((t) =>
    t.id === id
      ? { ...t, status: t.status === "Active" ? "Inactive" : "Active" }
      : t
  );
  save(STORAGE_KEYS.templates, templates);
  return templates;
};

export const getStats = () => {
  const users = getUsers();
  const templates = getTemplates();
  return {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === "Active").length,
    totalTemplates: templates.length,
    activeTemplates: templates.filter((t) => t.status === "Active").length,
  };
};

export const getTheme = () => load(STORAGE_KEYS.theme, "light");
export const setTheme = (theme) => save(STORAGE_KEYS.theme, theme);
