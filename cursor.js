AFRAME.registerComponent("cursor-listener", {
  schema: {
    selectedItemId: { default: "", type: "string" }
  },
  init: function () {
    this.handleClickEvents();
    this.handleMouseEnterEvents();
    this.handleMouseLeaveEvents();
  },
  handleClickEvents: function () {
    this.el.addEventListener("click", evt => {
      const placesContainer = document.querySelector("#places-container");
      const { state } = placesContainer.getAttribute("poster-component");

      if (state === "places-list") {
        const id = this.el.getAttribute("id");
        const placesId = [
          "batgirl",
          "batman",
          "wonder-woman"
        ];
        if (placesId.includes(id)) {
          placesContainer.setAttribute("poster", {
            state: "view",
            selectedCard: id
          });
        }
      }
    });
  },
  handlePlacesListState: function () {
    const id = this.el.getAttribute("id");
    const placesId = ["batgirl", "batman", "wonder-woman"];
    if (placesId.includes(id)) {
      const placeContainer = document.querySelector("#places-container");
      placeContainer.setAttribute("cursor-listener", {
        selectedItemId: id,
      });
      this.el.setAttribute("material", {
        color: "#D76B30",
        opacity: 1,
      });
    }
  },
  handleMouseEnterEvents: function () {
    this.el.addEventListener("mouseenter", () => {
      this.handlePlacesListState();
    });
  },
  handleMouseLeaveEvents: function () {
    this.el.addEventListener("mouseleave", () => {
      const { selectedItemId } = this.data;
      if (selectedItemId) {
        const el = document.querySelector(`#${selectedItemId}`);
        const id = el.getAttribute("id");
        if (id == selectedItemId) {
          el.setAttribute("material", {
            color: "#0077CC",
            opacity: 1,
          });
        }
      }
    });
  },

});