const street = document.querySelectorAll("[streetLanes]");

function generateStreetLanes() {
    street.forEach((element) => {
        const qty = parseInt(element.getAttribute("streetLanes"));
    
        for (let i = 0; i < qty; i++) {
            const lane = document.createElement("div");
            lane.classList.add("street-lane");
            element.appendChild(lane);
        }
    });
}

generateStreetLanes();