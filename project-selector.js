(() => {
  const projects = [
    {
      title: "Untitled Spa Game",
      summary: "Spa management sim work centered on guests, resources, and player-planned appointment timing.",
      role: "Co-Developer",
      tech: "Unity / C#",
      systems: "NPC AI, Data Driven Interactions, UI Logic.",
      href: "",
      image: "project-backgrounds/01.png",
      video: ""
    },
    {
      title: "Tides of Eternity",
      summary: "Combat prototype work focused on readable movement and flexible runtime status behavior.",
      role: "Gameplay Programmer",
      tech: "Unity / C#",
      systems: "Player Movement, Data Driven Systems, Combat.",
      href: "",
      image: "project-backgrounds/02.png",
      video: ""
    },
    {
      title: "Mario World 1-1 in Unreal",
      summary: "Weekend Unreal prototype reinterpreting classic platformer mechanics in a 3d environment.",
      role: "Solo Developer",
      tech: "Unreal Engine / Blueprints",
      systems: "Blueprint logic, enemies, interactive environment, HUD UI, win states.",
      href: "unreal-weekend.html",
      image: "project-backgrounds/03.png",
      video: "project-backgrounds/03.mp4"
    },
    {
      title: "Demons & Dining, Darling!",
      summary: "IGA Level 1 jam submission. Cooking and dating-sim with timed orders, ingredient prep, serving, and Ink dialogue.",
      role: "Unity Developer",
      tech: "Unity / C# / Ink",
      systems: "Cooking gameplay logic, pointer interaction, dialogue.",
      href: "",
      image: "project-backgrounds/04.png",
      video: ""
    },
  ];

  document.querySelectorAll("[data-project-selector]").forEach((selector) => {
    const items = Array.from(selector.querySelectorAll("[data-project-index]"));
    const fields = {
      title: selector.querySelector("[data-project-title]"),
      summary: selector.querySelector("[data-project-summary]"),
      role: selector.querySelector("[data-project-role]"),
      tech: selector.querySelector("[data-project-tech]"),
      systems: selector.querySelector("[data-project-systems]"),
      link: selector.querySelector("[data-project-link]"),
      video: selector.querySelector("[data-project-video]")
    };

    let activeIndex = 0;
    let intervalId = 0;
    let resumeTimeoutId = 0;
    let switchTimeoutId = 0;
    let isPointerInside = false;

    function setProject(index) {
      const project = projects[index];
      if (!project) {
        return;
      }

      activeIndex = index;
      window.clearTimeout(switchTimeoutId);
      items.forEach((item, itemIndex) => {
        const isActive = itemIndex === index;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      selector.classList.add("is-switching");

      switchTimeoutId = window.setTimeout(() => {
        fields.title.textContent = project.title;
        fields.summary.textContent = project.summary;
        fields.role.textContent = project.role;
        fields.tech.textContent = project.tech;
        fields.systems.textContent = project.systems;
        if (project.href) {
          fields.link.href = project.href;
          fields.link.textContent = `See more of ${project.title} \u2192`;
          fields.link.hidden = false;
        } else {
          fields.link.removeAttribute("href");
          fields.link.textContent = "Project page coming later";
          fields.link.hidden = true;
        }
        selector.style.setProperty("--project-bg", `url("${project.image}")`);
        selector.classList.toggle("has-video", Boolean(project.video));

        if (fields.video) {
          if (project.video) {
            if (!fields.video.src.endsWith(project.video)) {
              fields.video.src = project.video;
            }
            fields.video.classList.add("is-visible");
            fields.video.play().catch(() => {});
          } else {
            fields.video.pause();
            fields.video.removeAttribute("src");
            fields.video.load();
            fields.video.classList.remove("is-visible");
          }
        }

        selector.classList.remove("is-switching");
      }, 140);
    }

    function stopCycle() {
      window.clearInterval(intervalId);
      intervalId = 0;
    }

    function startCycle() {
      stopCycle();
      intervalId = window.setInterval(() => {
        setProject((activeIndex + 1) % projects.length);
      }, 5200);
    }

    function pauseThenResume() {
      stopCycle();
      window.clearTimeout(resumeTimeoutId);
      if (!isPointerInside) {
        resumeTimeoutId = window.setTimeout(startCycle, 9000);
      }
    }

    items.forEach((item) => {
      const index = Number(item.dataset.projectIndex);
      item.addEventListener("mouseenter", () => {
        setProject(index);
        pauseThenResume();
      });
      item.addEventListener("focus", () => {
        setProject(index);
        pauseThenResume();
      });
      item.addEventListener("click", () => {
        setProject(index);
        pauseThenResume();
      });
    });

    selector.addEventListener("mouseenter", () => {
      isPointerInside = true;
      window.clearTimeout(resumeTimeoutId);
      stopCycle();
    });

    selector.addEventListener("mouseleave", () => {
      isPointerInside = false;
      window.clearTimeout(resumeTimeoutId);
      resumeTimeoutId = window.setTimeout(startCycle, 1200);
    });

    setProject(0);
    startCycle();
  });
})();
