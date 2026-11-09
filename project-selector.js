(() => {
  const projects = [
    {
      title: "Snowmageddon",
      summary: "Tiny Cowboy arcade snowball combat project where I refactored and extended gameplay systems inside an existing Unity codebase.",
      systems: "Ability refactor, data-driven pickups, shop spawning.",
      href: "snowmageddon.html",
      poster: "resources/snowmageddon/snowmageddon-static.jpg",
      video: "resources/snowmageddon/snowmageddon-video.mp4"
    },
    {
      title: "P.U.F.F.-N.",
      summary: "A relaxing Unity exploration game focused on physics-informed puffin flight, traversal, and player-readable movement.",
      systems: "Flight systems, camera, traversal, recovery.",
      href: "puffn.html",
      image: "resources/puffn/puff-n-static-image.jpg",
      video: "resources/puffn/puff-n-video.mp4"
    },
    {
      title: "Untitled Spa Game",
      summary: "Spa management sim work centered on guests, resources, and player-planned appointment timing.",
      systems: "NPC AI, Data Driven Interactions, UI Logic.",
      href: "",
      poster: "resources/untitled-spa-game/untitled-spa-game-static.png",
      video: "resources/untitled-spa-game/untitled-spa-game.mp4"
    },
    {
      title: "Tides of Eternity",
      summary: "Combat prototype work focused on readable movement and flexible runtime status behavior.",
      systems: "Player Movement, Data Driven Systems, Combat.",
      href: "",
      poster: "resources/tides-of-eternity/tides-of-eternity-static.png",
      video: "resources/tides-of-eternity/tides-of-eternity.mp4"
    },
  ];

  document.querySelectorAll("[data-project-selector]").forEach((selector) => {
    const items = Array.from(selector.querySelectorAll("[data-project-index]"));
    const fields = {
      title: selector.querySelector("[data-project-title]"),
      summary: selector.querySelector("[data-project-summary]"),
      systems: selector.querySelector("[data-project-systems]"),
      link: selector.querySelector("[data-project-link]"),
      video: selector.querySelector("[data-project-video]")
    };

    let activeIndex = 0;
    let intervalId = 0;
    let resumeTimeoutId = 0;
    let switchTimeoutId = 0;
    let isPointerInside = false;
    const narrowScreenQuery = window.matchMedia("(max-width: 700px)");

    function centerSelectedItem(item) {
      if (!narrowScreenQuery.matches) {
        return;
      }

      item.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    }

    function updateVideo(project, shouldPlayNow = false) {
      if (!fields.video) {
        return;
      }

      const videoSrc = narrowScreenQuery.matches && project.mobileVideo
        ? project.mobileVideo
        : project.video;

      fields.video.muted = true;
      fields.video.defaultMuted = true;
      fields.video.loop = true;
      fields.video.playsInline = true;
      fields.video.autoplay = true;
      fields.video.setAttribute("autoplay", "");
      fields.video.setAttribute("muted", "");
      fields.video.setAttribute("playsinline", "");
      fields.video.setAttribute("webkit-playsinline", "");

      const poster = project.poster || (!videoSrc && project.image);
      if (poster) {
        fields.video.poster = poster;
      } else {
        fields.video.removeAttribute("poster");
      }

      if (videoSrc) {
        fields.video.preload = "auto";
        if (!fields.video.src.endsWith(videoSrc)) {
          fields.video.src = videoSrc;
          fields.video.load();
        }
        fields.video.classList.add("is-visible");
        if (shouldPlayNow) {
          fields.video.play().catch(() => {});
        }
      } else {
        fields.video.pause();
        fields.video.preload = "metadata";
        fields.video.removeAttribute("src");
        fields.video.load();
        fields.video.classList.remove("is-visible");
      }
    }

    function setProject(index, options = {}) {
      const project = projects[index];
      if (!project) {
        return;
      }

      activeIndex = index;
      window.clearTimeout(switchTimeoutId);
      items.forEach((item, itemIndex) => {
        const isActive = itemIndex === index;
        item.classList.toggle("is-active", isActive);
        if (item.tagName === "BUTTON") {
          item.setAttribute("aria-pressed", String(isActive));
        }
      });

      selector.classList.add("is-switching");
      selector.style.setProperty("--project-bg", project.video ? "none" : `url("${project.image}")`);
      selector.classList.toggle("has-video", Boolean(project.video));
      updateVideo(project, Boolean(options.playVideoNow));

      switchTimeoutId = window.setTimeout(() => {
        fields.title.textContent = project.title;
        fields.summary.textContent = project.summary;
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
        updateVideo(project, true);

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
      if (item.tagName === "BUTTON") {
        item.addEventListener("click", () => {
          setProject(index, { playVideoNow: true });
          centerSelectedItem(item);
          pauseThenResume();
        });
      }
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
