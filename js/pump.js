function createPumpElement(pumpNumber) {
    let pumpDiv = document.createElement('div');
    pumpDiv.className = 'data-sensor';

    let pumpHeading = document.createElement('h3');
    pumpHeading.textContent = 'Pump ' + pumpNumber;

    let dataSetupDiv = document.createElement('div');
    dataSetupDiv.className = 'data-setup';

    let inputElement = document.createElement('input');
    inputElement.type = 'number';
    inputElement.id = 'pump_' + pumpNumber;
    inputElement.className = 'col-data';
    inputElement.value = '0';

    let setButton = document.createElement('button');
    setButton.id = 'set_pump_' + pumpNumber;
    setButton.type = 'button';
    setButton.className = 'btn-upload';
    setButton.innerHTML = "<i class='bx bxs-chevron-right'></i> Timer";
    setButton.setAttribute('onclick', "btnSetup('pump_" + pumpNumber + "', 'SFITB/IOT/PUMP" + pumpNumber + "', 'set_pump_" + pumpNumber + "')");

    let startButton = document.createElement('button');
    startButton.id = 'start_pump_' + pumpNumber;
    startButton.type = 'button';
    startButton.className = 'btn-start';
    startButton.innerHTML = "<i class='bx bxs-zap'></i> Start";
    startButton.setAttribute('onclick', "btnStart('1', 'SFITB/IOT/PUMP_ON" + pumpNumber + "', 'start_pump_" + pumpNumber + "')");

    let stopButton = document.createElement('button');
    stopButton.id = 'stop_pump_' + pumpNumber;
    stopButton.type = 'button';
    stopButton.className = 'btn-stop hidden';
    stopButton.innerHTML = "<i class='bx bx-stop-circle'></i> Stop";
    stopButton.setAttribute('onclick', "btnStop('0', 'SFITB/IOT/PUMP_OFF" + pumpNumber + "', 'stop_pump_" + pumpNumber + "')");

    dataSetupDiv.appendChild(inputElement);
    dataSetupDiv.appendChild(setButton);
    dataSetupDiv.appendChild(startButton);
    dataSetupDiv.appendChild(stopButton);

    pumpDiv.appendChild(pumpHeading);
    pumpDiv.appendChild(dataSetupDiv);

    return pumpDiv;
}

let myPumpElement = document.getElementById('mypump');
for (let i = 1; i <= 9; i++) {
    let pumpElement = createPumpElement(i);
    myPumpElement.appendChild(pumpElement);
}

function createPumpInterface() {
    let pumpInterface = document.getElementById('pump_interface');
    let gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';

    for (let i = 1; i <= 9; i++) {
        let item = document.createElement('div');
        item.id = 'item_pump_' + i;
        item.className = 'item';

        let img = document.createElement('img');
        img.src = 'img/frame_1.png';
        img.height = '140';
        img.alt = '';

        let img2 = document.createElement('img');
        img2.src = 'img/my-water-22.gif';
        img2.height = '140';
        img2.alt = '';
        img2.className = "hidden";

        let label = document.createElement('label');
        label.htmlFor = 'inf_pump_' + i;
        label.textContent = 'Pump ' + i;

        let input = document.createElement('input');
        input.type = 'number';
        input.id = 'inf_pump_' + i;
        input.className = 'col-data';
        input.readOnly = true;

        item.appendChild(img);
        item.appendChild(img2);
        item.appendChild(label);
        item.appendChild(input);

        gridContainer.appendChild(item);
    }
    pumpInterface.appendChild(gridContainer);
}

createPumpInterface();

