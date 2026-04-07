const state = {
  selectedView: "weekly",
};

function handleMenuItemsInteraction() {
  const dashboardMenu = document.querySelector(".dashboard-header__menu");

  Array.from(dashboardMenu.children).forEach((menuItem, i, self) => {
    const handleMenuItemClick = (e) => {
      const target = e.target;
      const label = target.getAttribute("data-label");
      target.setAttribute("data-active", "true");
      state.selectedView = label;
      window.dispatchEvent(new Event("statechange"));
      self
        .filter((_, selfIdx) => selfIdx !== i)
        .forEach((ele) => {
          ele.setAttribute("data-active", "false");
        });
    };

    menuItem.addEventListener("click", handleMenuItemClick);
  });
}

function render() {
  const root = document.querySelector(".dashboard");

  Array.from(root.querySelectorAll(".dashboard-card")).forEach(
    (cardElement) => {
      cardElement.remove();
    },
  );

  const templateRef = document.getElementById("dashboard-card-template");
  data.forEach((entry, i) => {
    const templateNode = templateRef.content.cloneNode(true);
    const cardElement = templateNode.firstElementChild;

    cardElement.dataset.variant = entry.title.toLowerCase();
    cardElement.style.gridArea = `card-${i + 1}`;

    cardElement.querySelector(".dashboard-card__illustration > img").src =
      "/images/icon-" + entry.title.toLowerCase().replace(" ", "-") + ".svg";
    cardElement.querySelector(".dashboard-card__category").textContent =
      entry.title;
    cardElement.querySelector(".dashboard-card__stat").textContent =
      `${entry.timeframes[state.selectedView].current}hrs`;
    cardElement.querySelector(".dashboard-card__stat-old").textContent =
      `Last Week - ${entry.timeframes[state.selectedView].previous}hrs`;

    root.appendChild(templateNode);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  render();
  handleMenuItemsInteraction();
  window.addEventListener("statechange", () => render());
});

const data = [
  {
    title: "Work",
    timeframes: {
      daily: {
        current: 5,
        previous: 7,
      },
      weekly: {
        current: 32,
        previous: 36,
      },
      monthly: {
        current: 103,
        previous: 128,
      },
    },
  },
  {
    title: "Play",
    timeframes: {
      daily: {
        current: 1,
        previous: 2,
      },
      weekly: {
        current: 10,
        previous: 8,
      },
      monthly: {
        current: 23,
        previous: 29,
      },
    },
  },
  {
    title: "Study",
    timeframes: {
      daily: {
        current: 0,
        previous: 1,
      },
      weekly: {
        current: 4,
        previous: 7,
      },
      monthly: {
        current: 13,
        previous: 19,
      },
    },
  },
  {
    title: "Exercise",
    timeframes: {
      daily: {
        current: 1,
        previous: 1,
      },
      weekly: {
        current: 4,
        previous: 5,
      },
      monthly: {
        current: 11,
        previous: 18,
      },
    },
  },
  {
    title: "Social",
    timeframes: {
      daily: {
        current: 1,
        previous: 3,
      },
      weekly: {
        current: 5,
        previous: 10,
      },
      monthly: {
        current: 21,
        previous: 23,
      },
    },
  },
  {
    title: "Self Care",
    timeframes: {
      daily: {
        current: 0,
        previous: 1,
      },
      weekly: {
        current: 2,
        previous: 2,
      },
      monthly: {
        current: 7,
        previous: 11,
      },
    },
  },
];
