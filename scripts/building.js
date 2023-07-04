(function () {
    //----------------- Pavimentos -----------------//
    function createGroundFloor() {
        const window = document.createElement("div");
        window.classList.add("window");

        const groundFloor = document.createElement("div");
        groundFloor.classList.add("ground-floor");
        groundFloor.setAttribute("level", "t");
        groundFloor.appendChild(window);

        return groundFloor;
    }

    function createFloor(level) {
        const door = document.createElement("div");
        door.classList.add("door");

        const floor = document.createElement("div");
        floor.classList.add("floor");
        floor.setAttribute("level", level);
        floor.appendChild(door);

        return floor;
    }

    function generateGroundFloors() {
        const elementsWithFloors = document.querySelectorAll("[floors]");

        elementsWithFloors.forEach((element) => {
            const qty = element.getAttribute("floors");

            for (let i = qty; i > 0; i--) {
                const floor = createFloor(i);
                element.appendChild(floor);
            }

            element.appendChild(createGroundFloor());
        });
    }

    generateGroundFloors();
    //----------------- Elevador -----------------//

    let currentPosition = 0;
    let currentStatus = "stopped";

    function getFloorSize() {
        const floor = document.querySelector("[level='t']");

        return floor.offsetHeight;
    }

    function createElevator() {
        const pit = document.querySelector(".pit");

        const elevator = document.createElement("div");
        elevator.style.height = getFloorSize() + "px";
        elevator.classList.add("elevator");

        pit.appendChild(elevator);
    }

    createElevator();

    function moveElevatorTo(floor, target) {
        const floorLevel = floor === "t" ? 0 : parseInt(floor);
        const elevator = document.querySelector(".elevator");
        const seconds = Math.abs(floorLevel - currentPosition) * 0.8;

        const display = document.querySelector(".display");
        display.innerText = currentPosition < floorLevel ? "Subindo..." : "Descendo...";
        currentStatus = "moving";
        elevator.style.bottom = floorLevel * getFloorSize() + "px";
        elevator.style.transition = `bottom ${seconds}s linear`;

        let _temp = setTimeout(() => {
            changeDisplay(floor);
            currentStatus = "stopped";
            target.classList.remove("active");
            clearTimeout(_temp);
        }, seconds * 1000);

        currentPosition = floorLevel;
    }

    //----------------- Controls Buttons -----------------//
    function addFunctionToControlsButtons() {
        const controlsButtons = document.querySelectorAll(".controls button");
        controlsButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                if(currentStatus === "moving") return;
                const floor = event.target.innerText.toLowerCase();
                event.target.classList.add("active");
                moveElevatorTo(floor, event.target);
            });
        });
    }

    function changeDisplay(floor) {
        const display = document.querySelector(".display");
        display.innerText = floor === "t" ? "Térreo" : floor + "º andar";
    }

    addFunctionToControlsButtons();
})();
