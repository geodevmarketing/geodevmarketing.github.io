// Gestion de la page maps (menu latéral + Google Maps)

function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    menu.classList.toggle("open");
}

function initMap() {
    // Coordonnées par défaut
    const defaultCenter = { lat: 34.0, lng: 9.0 };

    // Créer la map
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: defaultCenter,
    });

    // Exemple de marker
    const marker = new google.maps.Marker({
        position: defaultCenter,
        map: map,
        title: "CNCT"
    });

    // Récupérer type de produit depuis URL pour afficher titre/échelle
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type") || "produit";

    const titles = {
        topo25k: "Cartes topographiques 1:25 000",
        topo50k: "Cartes topographiques 1:50 000",
        topo100k: "Cartes topographiques 1:100 000",
        marine5k: "Cartes marines 1:5 000",
        marine15k: "Cartes marines 1:15 000",
        marine25k: "Cartes marines 1:25 000",
        marine50k: "Cartes marines 1:50 000",
        marine75k: "Cartes marines 1:75 000",
        marine150k: "Cartes marines 1:150 000",
        thematique: "Cartes thématiques",
        pva: "Photos aériennes (PVA)",
        satellite: "Images satellitaires",
        mnt: "Modèles Numériques de Terrain (MNT)",
        ortho: "Ortho-photos"
    };

    document.getElementById("map-title").textContent = titles[type] || "Produit";
}
