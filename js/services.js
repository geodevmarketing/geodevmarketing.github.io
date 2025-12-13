// services.js : met à jour dynamiquement les liens et descriptions des services

document.addEventListener("DOMContentLoaded", () => {
    const serviceCards = document.querySelectorAll(".card");

    const serviceMap = {
        sigweb: {
            title: "SIG Web",
            description: "Description du service SIG web..."
        },
        visite: {
            title: "Visite Virtuelle",
            description: "Description du service Visite virtuelle..."
        },
        formation: {
            title: "Formation",
            description: "Description du service Formation..."
        },
        assistance: {
            title: "Assistance Technique",
            description: "Description du service Assistance technique..."
        },
        validation: {
            title: "Validation des Cahiers des Charges",
            description: "Description du service Validation des cahiers des charges..."
        },
        controle: {
            title: "Contrôle Technique des Produits",
            description: "Description du service Contrôle technique des produits..."
        },
        prisevue: {
            title: "Accompagnement Prise de Vue Aérienne",
            description: "Description du service Accompagnement prise de vue aérienne..."
        },
        topographie: {
            title: "Travaux Topographiques et Géodésiques",
            description: "Description du service Travaux topographiques et géodésiques..."
        }
    };

    // Mise à jour des titres des cards sur services.html
    serviceCards.forEach(card => {
        const href = card.getAttribute("href");
        const url = new URL(href, window.location.href);
        const serviceKey = url.searchParams.get("service");
        if(serviceKey && serviceMap[serviceKey]){
            card.querySelector("h3").textContent = serviceMap[serviceKey].title;
        }
    });

    // Mise à jour du service-detail.html
    const serviceTitleElem = document.getElementById("service-title");
    const serviceDescElem = document.getElementById("service-description");

    if(serviceTitleElem && serviceDescElem){
        const params = new URLSearchParams(window.location.search);
        const serviceKey = params.get("service");
        if(serviceKey && serviceMap[serviceKey]){
            serviceTitleElem.textContent = serviceMap[serviceKey].title;
            serviceDescElem.textContent = serviceMap[serviceKey].description;
        }
    }
});


