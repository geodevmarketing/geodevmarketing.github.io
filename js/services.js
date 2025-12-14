// services.js : met à jour dynamiquement les liens et descriptions des services

document.addEventListener("DOMContentLoaded", () => {

    const serviceCards = document.querySelectorAll(".card");

    const serviceMap = {
        sigweb: {
            title: "SIG web",
            description: [
                "Visualisation interactive des données géographiques via un navigateur web",
                "Analyse et interrogation des données spatiales en temps réel",
                "Partage et diffusion de l’information géographique pour l’aide à la décision"
            ],
            video: "media/LGeoCRUD2_1.mp4",
            video2: "media/frontTrim.mp4"
        },
        visite: {
            title: "Visite virtuelle",
            description: "Description du service Visite virtuelle..."
        },
        formation: {
            title: "Formation",
           description: [
        "Topographie et bases géodésiques",
        "Traitement et analyse des images satellitaires (télédétection)",
        "Photogrammétrie et exploitation des photos aériennes",
        "Maîtrise des outils SIG et des applications Web SIG",
        "Cartographie numérique et production cartographique",   
    ]
        },
        assistance: {
            title: "Assistance technique",
            description: "Description du service Assistance technique..."
        },
        validation: {
            title: "Validation des cahiers des charges",
            description: "Description du service Validation des cahiers des charges..."
        },
        controle: {
            title: "Contrôle technique des produits",
            description: "Description du service Contrôle technique des produits..."
        },
        prisevue: {
            title: "Accompagnement prise de vue aérienne",
            description: "Description du service Accompagnement prise de vue aérienne..."
        },
        topographie: {
            title: "Travaux topographiques et géodésiques",
            description: "Description du service Travaux topographiques et géodésiques..."
        }
    };

    /* ===============================
       Mise à jour des cards (services.html)
    =============================== */
    serviceCards.forEach(card => {
        const href = card.getAttribute("href");
        if (!href) return;

        const url = new URL(href, window.location.href);
        const serviceKey = url.searchParams.get("service");

        if (serviceKey && serviceMap[serviceKey]) {
            card.querySelector("h3").textContent = serviceMap[serviceKey].title;
        }
    });

    /* ===============================
       Mise à jour du service-detail.html
    =============================== */
    const serviceTitleElem = document.getElementById("service-title");
    const serviceDescElem = document.getElementById("service-description");
    const serviceVideoElem = document.getElementById("service-video");
    const serviceVideoElem2 = document.getElementById("service-video2");

    if (serviceTitleElem && serviceDescElem) {
        const params = new URLSearchParams(window.location.search);
        const serviceKey = params.get("service");

        if (serviceKey && serviceMap[serviceKey]) {
            const service = serviceMap[serviceKey];

            // Titre
            serviceTitleElem.textContent = service.title;

            // Description (liste ou texte)
            if (Array.isArray(service.description)) {
                serviceDescElem.innerHTML = `
                    <ul class="service-points">
                        ${service.description.map(point => `<li>${point}</li>`).join("")}
                    </ul>
                `;
            } else {
                serviceDescElem.textContent = service.description;
            }

            // Vidéo 1
            if (service.video && serviceVideoElem) {
                serviceVideoElem.innerHTML = `
                    <video autoplay muted loop playsinline preload="auto">
                        <source src="${service.video}" type="video/mp4">
                        Votre navigateur ne supporte pas la lecture vidéo.
                    </video>
                `;
            }

            // Vidéo 2
            if (service.video2 && serviceVideoElem2) {
                serviceVideoElem2.innerHTML = `
                    <video autoplay muted loop playsinline preload="auto">
                        <source src="${service.video2}" type="video/mp4">
                        Votre navigateur ne supporte pas la lecture vidéo.
                    </video>
                `;
            }
        }
    }

});

const video = document.getElementById("service-video-player");
if (video) {
    video.playbackRate = 2;
}





