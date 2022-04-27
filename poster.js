AFRAME.registerComponent("poster-component", {
  schema: {
    state: { type: "string", default: "places-list" },
    selectedCard: { type: "string", default: "#card1" },
  },
  init: function () {
    this.placesContainer = this.el;
    this.createCards();
  },

  tick: function () {
    const { state } = this.el.getAttribute("poster-component");

    if (state === "view") {
      this.hideEl([this.placesContainer]);
      this.showView();
    }
  },
  hideEl: function (elList) {
    elList.map(el => {
      el.setAttribute("visible", false);
    });
  },
  
    createCards: function () {
      const thumbNailsRef = [
        {
          id: "batgirl",
          title: "Batgirl",
          url: "./assets/image.png",
        },
        {
          id: "batman",
          title: "Batman",
          url: "./assets/batman_poster.jpg",
        },
        {
          id: "wonder-woman",
          title: "Wonder Woman",
          url: "./assets/wonderwoman_poster.jpg",
        },
      ];
      let prevoiusXPosition = -60;
  
      for (var item of thumbNailsRef) {
        const posX = prevoiusXPosition + 25;
        const posY = 10;
        const posZ = -40;
        const position = { x: posX, y: posY, z: posZ };
        prevoiusXPosition = posX;
  
        const borderEl = this.createBorder(position, item.id);
  
        const thumbNail = this.createThumbNail(item);
        borderEl.appendChild(thumbNail);
  
        const titleEl = this.createTitleEl(position, item);
        borderEl.appendChild(titleEl);
  
        this.placesContainer.appendChild(borderEl);
      }
    },
    createBorder: function (position, id) {
      const entityEl = document.createElement("a-entity");
      entityEl.setAttribute("id", id);
      entityEl.setAttribute("visible", true);
      entityEl.setAttribute("geometry", {
        primitive: "plane",
        width: 20,
        height: 30,
      });
      entityEl.setAttribute("position", position);
      entityEl.setAttribute("material", {
        color: "#0077CC",
        opacity: 1,
      });
  
      entityEl.setAttribute("cursor-listener", {});
      return entityEl;
    },
    createThumbNail: function (item) {
      const entityEl = document.createElement("a-entity");
      entityEl.setAttribute("visible", true);
      entityEl.setAttribute("geometry", {
        primitive: "plane",
        width: 19,
        height: 29,
        z: 5,
      });
      entityEl.setAttribute("material", { src: item.url });
      return entityEl;
    },
    createTitleEl: function (position, item) {
      const entityEl = document.createElement("a-entity");
      entityEl.setAttribute("text", {
        font: "exo2bold",
        align: "center",
        width: 70,
        color: "#e65100",
        value: item.title,
      });
      const elPosition = position;
      elPosition.y = -20;
      entityEl.setAttribute("position", elPosition);
      entityEl.setAttribute("visible", true);
      return entityEl;
    },
  });