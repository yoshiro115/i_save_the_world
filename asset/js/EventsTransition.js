class EventsTransition{
constructor() {
    this.element = null;
  }
  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("eventsTransition");
  }

  fadeOut() {
    this.element.classList.add("fade-out");
    this.element.addEventListener("animationend", () => {
      this.element.remove();
    }, { once: true })
  }

  init(container) {
    this.createElement();
    container.prepend(this.element);
  }
}