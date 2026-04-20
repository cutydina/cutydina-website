import Viewer from "viewerjs";
import options from "./options";

class Gallery {
  gallery: Viewer;
  isMobile: boolean;

  constructor() {
    // Detectar si es vista móvil (Bootstrap breakpoint: < 576px)
    this.isMobile = window.innerWidth < 576;

    const defaultOptions: Viewer.Options = {
      filter: (img: HTMLImageElement) => {
        return this.validate(img);
      },
      url(img: HTMLImageElement) {
        return img.hasAttribute("data-src")
          ? img.getAttribute("data-src")
          : img.src;
      },
    };

    // Detectar si estamos en una página de post/blog
    const postContent = document.querySelector(".post-content");
    const container = postContent || document.querySelector("main");

    // Solo inicializar el gallery si no es mobile
    if (!this.isMobile) {
      this.gallery = new Viewer(
        container,
        Object.assign(defaultOptions, options)
      );
    }
  }

  run() {
    // No ejecutar el listener si es mobile
    if (this.isMobile) return;

    document.addEventListener("click", (e: Event) => {
      if (
        e.target &&
        e.target instanceof HTMLElement &&
        e.target.tagName === "IMG"
      ) {
        if (this.validate(e.target)) {
          this.gallery.show();
        }
      }
    });
    document.addEventListener("hbs:viewer:update", () => {
      this.gallery.update();
    });
  }

  validate(img) {
    if (
      img.parentElement.tagName === "A" ||
      img.hasAttribute("data-viewer-invisible")
    ) {
      return false;
    }
    if (img.parentElement.tagName === "PICTURE") {
      return this.validate(img.parentElement);
    }
    return true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Gallery().run();
});
