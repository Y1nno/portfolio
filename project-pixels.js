(() => {
  document.querySelectorAll(".projects .project").forEach((card) => {
    const edge = document.createElement("span");
    edge.className = "liquid-edge";
    edge.setAttribute("aria-hidden", "true");
    card.append(edge);
  });
})();
