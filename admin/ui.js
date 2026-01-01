// ui.js: DOM rendering helpers.

const statusPill = (status) => {
  const cls = status.toLowerCase();
  return `<span class="status-pill ${cls}">${status}</span>`;
};

const userRow = (u) => `
  <tr data-id="${u.id}">
    <td>${u.id}</td>
    <td>${u.name}</td>
    <td>${u.email}</td>
    <td>${u.role}</td>
    <td>${statusPill(u.status)}</td>
    <td>
      <div class="table-actions">
        <button class="btn ghost" data-action="edit-user" type="button">Edit</button>
        <button class="btn ghost" data-action="toggle-user" type="button">${
          u.status === "Active" ? "Block" : "Unblock"
        }</button>
        <button class="btn ghost" data-action="delete-user" type="button">Delete</button>
      </div>
    </td>
  </tr>`;

const templateCard = (t) => `
  <div class="card" data-id="${t.id}">
    <div class="template-preview" aria-hidden="true">
        <img src="../assets/preview-images/template${
          t.id
        }.jpg" alt="Preview of ${t.name} template" />
    </div>
    <div>
      <h3>${t.name}</h3>
      <p class="card__meta">ID: ${t.id}</p>
    </div>
    <div class="status-pill ${t.status.toLowerCase()}">${t.status}</div>
    <div class="table-actions">
      <button class="btn ghost" data-action="edit-template" type="button">Edit</button>
      <button class="btn ghost" data-action="toggle-template" type="button">${
        t.status === "Active" ? "Disable" : "Enable"
      }</button>
      <button class="btn ghost" data-action="delete-template" type="button">Delete</button>
    </div>
  </div>`;

const statCard = (label, value, total) => {
  const percent = total ? Math.round((value / total) * 100) : 0;
  return `
    <div class="metric">
      <h3>${label}</h3>
      <p class="badge">${value}</p>
      <div class="bar"><div class="bar__fill" style="width: ${Math.min(
        percent,
        100
      )}%"></div></div>
      <p class="card__meta">${percent}%</p>
    </div>`;
};

const renderDashboard = ({ users, templates, stats }) => `
  <section class="section">
    <div class="section__header">
      <h2>At a Glance</h2>
      <span class="card__meta">Quick snapshot</span>
    </div>
    <div class="metrics">
      <div class="metric"><h3>Total Users</h3><p class="badge">${
        stats.totalUsers
      }</p></div>
      <div class="metric"><h3>Active Users</h3><p class="badge">${
        stats.activeUsers
      }</p></div>
      <div class="metric"><h3>Total Templates</h3><p class="badge">${
        stats.totalTemplates
      }</p></div>
      <div class="metric"><h3>Active Templates</h3><p class="badge">${
        stats.activeTemplates
      }</p></div>
    </div>
  </section>
  <section class="section grid-2">
    <div>
      <div class="section__header">
        <h2>Latest Users</h2>
        <button class="btn primary" data-open-modal="user" type="button">Add User</button>
      </div>
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr></thead>
          <tbody>
            ${users
              .slice(0, 5)
              .map(
                (u) => `
              <tr>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.role}</td>
                <td>${statusPill(u.status)}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <div class="section__header">
        <h2>Templates</h2>
        <button class="btn ghost" data-open-modal="template" type="button">Add Template</button>
      </div>
      <div class="cards">
        ${templates.slice(0, 3).map(templateCard).join("")}
      </div>
    </div>
  </section>`;

const renderUsers = (users) => `
   <section class="section grid-2">
    <div>
      <div class="section__header">
        <h2>Users</h2>
        <button class="btn primary" data-open-modal="user" type="button">Add User</button>
      </div>
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr></thead>
          <tbody>
            ${users
              //   .slice(0, 5)
              .map(
                (u) => `
              <tr>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.role}</td>
                <td>${statusPill(u.status)}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>

  </section>`;

const renderTemplates = (templates) => `
  <section class="section">
    <div class="section__header">
      <h2>Resume Templates</h2>
      <button class="btn primary" data-open-modal="template" type="button">Add Template</button>
    </div>
    <div class="cards">
      ${templates.map(templateCard).join("")}
    </div>
  </section>`;

const renderStatistics = (stats) => `
  <section class="section">
    <div class="section__header">
      <h2>Statistics</h2>
      <span class="card__meta">Live from local data</span>
    </div>
    <div class="grid-2">
      ${statCard("Active Users", stats.activeUsers, stats.totalUsers || 1)}
      ${statCard(
        "Blocked Users",
        stats.totalUsers - stats.activeUsers,
        stats.totalUsers || 1
      )}
      ${statCard(
        "Active Templates",
        stats.activeTemplates,
        stats.totalTemplates || 1
      )}
      ${statCard(
        "Inactive Templates",
        stats.totalTemplates - stats.activeTemplates,
        stats.totalTemplates || 1
      )}
    </div>
  </section>`;

const renderSettings = (theme) => `
  <section class="section">
    <div class="section__header">
      <h2>Settings</h2>
      <span class="card__meta">Preferences persist in localStorage</span>
    </div>
    <form class="form" id="settingsForm">
      <label class="field">
        <span>Theme</span>
        <select name="theme">
          <option value="light" ${
            theme === "light" ? "selected" : ""
          }>Light</option>
          <option value="dark" ${
            theme === "dark" ? "selected" : ""
          }>Dark</option>
        </select>
      </label>
      <div>
        <button class="btn primary" type="submit">Save Preferences</button>
      </div>
    </form>
  </section>`;

export const render = (view, data) => {
  const { users, templates, stats, theme } = data;
  switch (view) {
    case "users":
      return renderUsers(users);
    case "templates":
      return renderTemplates(templates);
    case "statistics":
      return renderStatistics(stats);
    case "settings":
      return renderSettings(theme);
    case "dashboard":
    default:
      return renderDashboard({ users, templates, stats });
  }
};
