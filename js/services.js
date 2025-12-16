// services.js : met à jour dynamiquement les liens et descriptions des services

document.addEventListener("DOMContentLoaded", () => {

    const serviceCards = document.querySelectorAll(".card");

    const serviceMap = {
        sigweb: {
            title: "SIG web",
            description: [
                "Visualisation interactive",
                "Analyse et interrogation en temps réel",
                "Partage et diffusion"
            ],
            video: "media/urban_analysis-Trim.mp4",
            // video2: "media/LGeoCRUD2_1.mp4"
        },
        visite: {
            title: "Visite virtuelle",
            description: [
        "Visites virtuelles immersives (scans laser 3D)",
        "Nuages de points haute précision",
        "Visualisation interactive",
        "Analyse et aide à la décision"
        ],
            video: "media/visite.mp4",
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
             description: [
        "Accompagnement technique",
        "Appui à l’exploitation des SIG",
        "Assistance dans le géo-traitement",
        "Support technique adapté aux besoins"
    ]
        },
        validation: {
            title: "Validation des cahiers des charges",
            description: [
        "Analyse et validation",
        "Conformité technique aux normes",
        "Spécifications fonctionnelles et techniques",
        "Sécurisation des exigences techniques"
    ]
        },
        controle: {
            title: "Contrôle technique des produits",
            description: [
        "Contrôle technique",
        "Conformité des livrables",
        "Précision et Fiabilité"
    ]
        },
        prisevue: {
            title: "Accompagnement prise de vue aérienne",
            description: [
        "Accompagnement technique en PVA",
        "Planification des missions de photographie aérienne",
        "Suivi et validation des données acquises"
    ]
        },
        topographie: {
            title: "Travaux topographiques et géodésiques",
            description: [
        "Levée topographique",
        "Opérations géodésiques et Positionnement de précision",
        "Implantation et entretien des réseaux géodésiques"
    ],
            video: "media/topo.mp4",
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
    video.playbackRate = 1.5;
}





