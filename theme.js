(function () {
    const storageKey = "theme";
    const body = document.body;
    const pathDepth = window.location.pathname.split("/").filter(Boolean).length;
    const homeHref = pathDepth > 1 ? "../index.html" : "index.html";

    if (!body) return;

    const existingToggle =
        document.getElementById("theme-toggle") || document.getElementById("themeToggle");
    const navbar =
        document.querySelector(".navbar") ||
        (() => {
            const nav = document.createElement("nav");
            nav.className = "navbar";
            nav.innerHTML = `
                <a class="nav-brand" href="${homeHref}">DSA Visualizer App</a>
                <div class="nav-actions"></div>
            `;
            body.prepend(nav);
            return nav;
        })();
    const navActions =
        navbar.querySelector(".nav-actions") ||
        (() => {
            const wrapper = document.createElement("div");
            wrapper.className = "nav-actions";
            navbar.appendChild(wrapper);
            return wrapper;
        })();
    const themeToggle =
        existingToggle ||
        (() => {
            const button = document.createElement("button");
            button.id = "theme-toggle";
            button.type = "button";
            button.className = "theme-toggle";
            navActions.appendChild(button);
            return button;
        })();

    if (!existingToggle && !themeToggle.parentElement?.classList.contains("nav-actions")) {
        navActions.appendChild(themeToggle);
    }

    const applyTheme = (theme) => {
        const isDarkMode = theme !== "light";
        body.classList.toggle("dark-mode", isDarkMode);
        themeToggle.innerHTML = isDarkMode
            ? '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.5"></circle><path d="M12 2.5v2.2M12 19.3v2.2M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"></path></svg>'
            : '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M20.8 14.4A8.8 8.8 0 0 1 9.6 3.2a.7.7 0 0 0-.9-.9A10.2 10.2 0 1 0 21.7 15.3a.7.7 0 0 0-.9-.9Z"></path></svg>';
        themeToggle.setAttribute(
            "aria-label",
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
        );
        themeToggle.setAttribute(
            "title",
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
        );
    };

    const savedTheme = localStorage.getItem(storageKey) || "dark";
    applyTheme(savedTheme);
    requestAnimationFrame(() => body.classList.add("page-ready"));

    themeToggle.addEventListener("click", () => {
        const nextTheme = body.classList.contains("dark-mode") ? "light" : "dark";
        localStorage.setItem(storageKey, nextTheme);
        applyTheme(nextTheme);
    });

    window.addEventListener("storage", (event) => {
        if (event.key === storageKey && event.newValue) {
            applyTheme(event.newValue);
        }
    });
})();
