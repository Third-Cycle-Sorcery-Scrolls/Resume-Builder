document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".template-card");
  const buttons = document.querySelectorAll(".select-template-btn");

  if (!cards.length) return;

  const selectTemplate = (templateId) => {
    cards.forEach((card) => {
      card.classList.toggle(
        "selected",
        card.getAttribute("data-template-id") === String(templateId)
      );
    });

    const selectedCss = `style-template-${templateId}.css`;
    const selectedTemplateHtml = `templates/resume-template-${templateId}.html`;

    localStorage.setItem("selectedTemplateCSS", selectedCss);
    localStorage.setItem("setedTemplateHTML", selectedTemplateHtml);
    lec;

    window.location.href = "resume-editor.html";
  };

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target instanceof HTMLButtonElement) return;
      const id = card.getAttribute("data-template-id");
      if (id) {
        selectTemplate(id);
      }
    });
  });

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const parentCard = button.closest(".template-card");
      if (!parentCard) return;
      const id = parentCard.getAttribute("data-template-id");
      if (id) {
        selectTemplate(id);
      }
    });
  });
});
