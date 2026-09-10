(() => {
  const projects = [
    {
      title: "Untitled Spa Game",
      summary: "Spa management sim work centered on guests, resources, and player-planned appointment timing.",
      role: "Co-Developer",
      tech: "Unity / C#",
      systems: "NPC AI, Data Driven Interactions, UI Logic.",
      href: "",
      image: ""
    },
    {
      title: "Tides of Eternity",
      summary: "Combat prototype work focused on readable movement and flexible runtime status behavior.",
      role: "Gameplay Programmer",
      tech: "Unity / C#",
      systems: "Player Movement, Data Driven Systems, Combat.",
      href: "",
      image: ""
    },
    {
      title: "Mario World 1-1 in Unreal",
      summary: "Weekend Unreal prototype reinterpreting classic platformer mechanics in a 3d environment.",
      role: "Solo Developer",
      tech: "Unreal Engine / Blueprints",
      systems: "Blueprint logic, enemies, interactive environment, HUD UI, win states.",
      href: "../unreal-weekend.html",
      image: "../project-backgrounds/03.png"
    },
    {
      title: "Demons & Dining, Darling!",
      summary: "IGA Level 1 jam submission with timed orders, ingredient prep, serving, and Ink dialogue.",
      role: "Unity Developer",
      tech: "Unity / C# / Ink",
      systems: "Cooking gameplay logic, pointer interaction, dialogue.",
      href: "",
      image: "../project-backgrounds/04.png"
    }
  ];

  function fillCard(card, project) {
    card.style.setProperty(
      "--project-bg",
      project.image ? `url("${project.image}")` : "linear-gradient(160deg, #130b0b, #050505)"
    );
    card.querySelector("[data-project-title]").textContent = project.title;
    card.querySelector("[data-project-summary]").textContent = project.summary;
    card.querySelector("[data-project-role]").textContent = project.role;
    card.querySelector("[data-project-tech]").textContent = project.tech;
    card.querySelector("[data-project-systems]").textContent = project.systems;

    const link = card.querySelector("[data-project-link]");
    if (project.href) {
      link.href = project.href;
      link.textContent = `See more of ${project.title}`;
      link.hidden = false;
    } else {
      link.removeAttribute("href");
      link.hidden = true;
    }
  }

  document.querySelectorAll("[data-switcher-copy]").forEach((copy) => {
    const card = copy.querySelector("[data-project-card]");
    const buttons = Array.from(copy.querySelectorAll("[data-project-index]"));

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.projectIndex);
        const project = projects[index];

        buttons.forEach((item) => {
          const active = item === button;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-pressed", String(active));
        });

        fillCard(card, project);

        button.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
      });
    });

    fillCard(card, projects[0]);
  });

  document.querySelectorAll("[data-accordion-copy]").forEach((copy) => {
    const items = Array.from(copy.querySelectorAll("[data-accordion-item]"));

    items.forEach((item) => {
      const button = item.querySelector("[data-project-index]");
      const card = item.querySelector("[data-project-card]");
      const project = projects[Number(button.dataset.projectIndex)];

      fillCard(card, project);

      button.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");

        items.forEach((entry) => {
          const entryButton = entry.querySelector("[data-project-index]");
          entry.classList.remove("is-open");
          entryButton.classList.remove("is-active");
          entryButton.setAttribute("aria-expanded", "false");
        });

        if (!isOpen) {
          item.classList.add("is-open");
          button.classList.add("is-active");
          button.setAttribute("aria-expanded", "true");
        }
      });
    });
  });
})();
