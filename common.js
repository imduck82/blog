function set_lang(language) {
    document.querySelectorAll("[data-es]").forEach(element => {
        const attribute = element.dataset.attr;
        const html = element.hasAttribute("data-html");
        if (element.en === undefined) {
            element.en = attribute ? element.getAttribute(attribute)
                : html ? element.innerHTML : element.textContent;
        }
        const value = language === "es" ? element.dataset.es : element.en;
        if (attribute) {
            element.setAttribute(attribute, value);
        } else if (html) {
            element.innerHTML = value;
        } else {
            element.textContent = value;
        }
    });
    document.documentElement.lang = language;
    localStorage.setItem("language", language);
}

function init_lang() {
    const saved = localStorage.getItem("language");
    if (saved === "en" || saved === "es") {
        return saved;
    }
    if (navigator.language.toLowerCase().startsWith("es")) {
        return "es";
    }
    return "en";
}

function toggle_lang() {
    const current = document.documentElement.lang;
    set_lang(current === "en" ? "es" : "en");
}

function init_tabs() {
    document.querySelector("nav.tabs").innerHTML = `
        <a href="/blog/" data-es="inicio">home</a>
        <a href="journal.html" data-es="mi diario">my diary</a>
        <a href="contact.html" data-es="contacto">contact</a>
        <a href="misc.html" data-es="otros">other</a>
        <a href="" onclick="toggle_lang(); return false" data-es="english">español</a>`;
}

function color_title() {
    const title = document.getElementById("title");
    if (!title) return;
    title.style.color = `rgb(${Math.round(Math.random()) * 255}, ${Math.round(Math.random()) * 255}, ${Math.round(Math.random()) * 255})`;
    if (title.style.color === "rgb(0, 0, 0)") {
        title.style.setProperty("-webkit-text-stroke", "2px white");
    }
}


init_tabs();
color_title();
set_lang(init_lang());
