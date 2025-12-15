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
            description: [
        "Réalisation de visites virtuelles immersives à partir de scans laser 3D",
        "Génération de nuages de points haute précision pour la modélisation des espaces",
        "Visualisation interactive des sites et infrastructures en environnement numérique",
        "Exploitation des données 3D pour l’analyse, la documentation et l’aide à la décision"
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
        "Accompagnement technique des institutions et organismes dans les domaines de la cartographie et de la géomatique",
        "Appui à la mise en œuvre et à l’exploitation des systèmes d’information géographique",
        "Assistance dans le traitement, l’analyse et la valorisation des données géospatiales",
        "Support technique adapté aux besoins spécifiques des projets et des utilisateurs"
    ]
        },
        validation: {
            title: "Validation des cahiers des charges",
            description: [
        "Analyse et validation des cahiers des charges relatifs aux projets cartographiques et géomatiques",
        "Vérification de la conformité technique aux normes et standards en vigueur",
        "Évaluation des spécifications fonctionnelles et techniques des projets",
        "Appui aux organismes dans la définition et la sécurisation des exigences techniques"
    ]
        },
        controle: {
            title: "Contrôle technique des produits",
            description: [
        "Réalisation des opérations de contrôle technique et de qualité des produits cartographiques et géomatiques",
        "Vérification de la conformité des données et des livrables aux normes et spécifications techniques",
        "Évaluation de la précision, de la fiabilité et de la cohérence des produits géospatiaux",
        "Contrôle et validation des produits issus des secteurs public et privé"
    ]
        },
        prisevue: {
            title: "Accompagnement prise de vue aérienne",
            description: [
        "Accompagnement technique lors des opérations de prises de vues aériennes",
        "Appui à la planification et à l’exécution des missions de photographie aérienne",
        "Conseil sur les équipements, capteurs et paramètres de prise de vue",
        "Suivi et validation des données acquises conformément aux normes techniques"
    ]
        },
        topographie: {
            title: "Travaux topographiques et géodésiques",
            description: [
        "Réalisation des travaux topographiques pour la levée et la représentation du terrain",
        "Exécution des opérations géodésiques et de positionnement de précision",
        "Implantation, entretien et exploitation des réseaux géodésiques",
        "Production de données topographiques fiables pour les projets d’aménagement et d’infrastructure"
    ]
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





