const LASTFM_API_KEY = window.LASTFM_API_KEY || "d858d8a86db7242eb0919f0b3ff516e1"; 
const API_ROOT = "https://ws.audioscrobbler.com/2.0/";
 
async function lastfmRequest(params) {
    const url = new URL(API_ROOT);
    url.search = new URLSearchParams({
        format: "json",
        api_key: LASTFM_API_KEY,
        ...params,
    }).toString();

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error(`Сеть недоступна: ${response.status}`);
    }
    const data = await response.json();
    if (data.error) {
        throw new Error(data.message || "Ошибка API last.fm");
    }
    return data;
}

function renderArtists(artists) {
    const root = document.getElementById("artists-list");
    root.textContent = "";

    const limited = artists.slice(0, 12);

    const createCard = (a) => {
        const image = (a.image && a.image[2] && a.image[2]["#text"]) ||
            (a.image && a.image[1] && a.image[1]["#text"]) ||
            "https://picsum.photos/seed/artist/160";

        const card = document.createElement("article");
        card.className = "artist";

        const img = document.createElement("img");
        img.src = image;
        img.alt = a.name;
        card.appendChild(img);

        const name = document.createElement("h3");
        name.className = "artist-name";
        name.textContent = a.name;
        card.appendChild(name);

        const meta = document.createElement("p");
        meta.className = "meta";
        meta.textContent = "artist";
        card.appendChild(meta);

        return card;
    };

    limited.forEach((a) => root.appendChild(createCard(a)));
}

function renderTracks(tracks) {
    const root = document.getElementById("tracks-list");
    root.textContent = "";

    tracks.slice(0, 12).forEach((t) => {
        const image = (t.image && t.image[1] && t.image[1]["#text"]) ||
            "https://picsum.photos/seed/track/64";

        const card = document.createElement("article");
        card.className = "track";

        const img = document.createElement("img");
        img.className = "cover";
        img.src = image;
        img.alt = t.name;
        card.appendChild(img);

        const info = document.createElement("div");
        info.className = "track-info";

        const title = document.createElement("h3");
        title.className = "track-title";
        title.textContent = t.name;
        info.appendChild(title);

        const meta = document.createElement("p");
        meta.className = "meta";
        meta.textContent = t.artist?.name || t.artist || "";
        info.appendChild(meta);

        card.appendChild(info);
        root.appendChild(card);
    });
}

function showError(sectionId, message) {
    const section = document.getElementById(sectionId);
    const div = document.createElement("div");
    div.className = "small";
    div.style.color = "#dc2626";
    div.style.marginTop = "8px";
    div.textContent = message + " — проверьте ключ API и сеть.";
    section.appendChild(div);
}

async function loadInitialData() {
    try {
        const [artistsRes, tracksRes] = await Promise.all([
            lastfmRequest({ method: "chart.getTopArtists", limit: 12 }),
            lastfmRequest({ method: "chart.getTopTracks", limit: 12 }),
        ]);

        renderArtists(artistsRes.artists?.artist || []);
        renderTracks(tracksRes.tracks?.track || []);
    } catch (e) {
        console.error(e);
        showError("hot-artists-section", String(e.message || e));
        showError("popular-tracks-section", String(e.message || e));
    }
}

async function setupSearch() {
    const form = document.querySelector(".search");
    const input = form?.querySelector("input[type=search]");
    const button = form?.querySelector("button");
    if (!form || !input || !button) return;

    button.disabled = false;

    form.addEventListener("submit", async (ev) => {
        ev.preventDefault();
        const q = input.value.trim();
        const target = "search.html" + (q ? `?q=${encodeURIComponent(q)}` : "");
        window.location.href = target;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupSearch();
    loadInitialData();
});


