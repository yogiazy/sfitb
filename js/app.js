const host = "broker.hivemq.com";
const port = 8884;

const client = new Paho.MQTT.Client(host, port, "clientId_" + parseInt(Math.random() * 100, 10));

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({
    onSuccess: onConnect,
});


function onConnect() {
    console.log(`onConnect`);
    client.subscribe(`SFITB/IOT/DASHBOARD`);
    message = new Paho.MQTT.Message("CEK");
    message.destinationName = "SFITB/IOT/CEK";
    client.send(message);
}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
        location.reload();
    }
}

function onMessageArrived(message) {
    // console.log("onMessageArrived:" + message.payloadString);
    let data = JSON.parse(message.payloadString);
    // console.log(data);
    if (data.status === "cekdata") {
        setTimeout(function () {
            for (i = 1; i <= 9; i++) {
                document.getElementById(`pump_${i}`).value = data[`timer_v${i}`];
                document.getElementById(`inf_pump_${i}`).value = data[`timer_v${i}`];
                localStorage.setItem(`timer_v${i}`, data[`timer_v${i}`])
            }
        }, 500);
    } else if (data.status === "left-timer") {
        document.getElementById(data.id).value = data.value;
        let v = data.id.replace("inf", "item");
        let bs = data.id.replace("inf", "start");
        let bt = data.id.replace("inf", "stop");
        pumpON(v);
        document.getElementById(bs).classList.add("hidden");
        document.getElementById(bt).classList.remove("hidden");
        if (data.value === 0) {
            document.getElementById(data.id).value = localStorage.getItem(data.id.replace("inf_pump_", "timer_v"));
            pumpOFF(v);
            document.getElementById(bs).classList.remove("hidden");
            document.getElementById(bt).classList.add("hidden");
        }
    }
}

function btnSetup(id, topic, set) {
    const b = document.getElementById(id);
    const s = document.getElementById(set);
    const i = s.innerHTML;
    s.innerHTML = `<i class='bx bx-log-in-circle bx-tada'></i> Setting`;
    message = new Paho.MQTT.Message(b.value);
    message.destinationName = topic;
    client.send(message);
    setTimeout(function () {
        s.innerHTML = `<i class='bx bx-check-double'></i> Done`;
    }, 1000);
    setTimeout(function () {
        s.innerHTML = i;
    }, 1500);
}

function btnStart(id, topic, set) {
    const s = document.getElementById(set);
    const t = document.getElementById(set.replace("start", "stop"));
    message = new Paho.MQTT.Message(id);
    message.destinationName = topic;
    client.send(message);
    s.classList.add("hidden");
    t.classList.remove("hidden");
    pumpON(set.replace("start", "item"));
}

function btnStop(id, topic, set) {
    const s = document.getElementById(set);
    const t = document.getElementById(set.replace("stop", "start"));
    message = new Paho.MQTT.Message(id);
    message.destinationName = topic;
    client.send(message);
    s.classList.add("hidden");
    t.classList.remove("hidden");
    pumpOFF(set.replace("stop", "item"));
}

function btnStartAll() {
    let startButtons = document.querySelectorAll('#mypump [id^="start_"]');
    startButtons.forEach(function (button) {
        button.click();
    });
}

function btnStopAll() {
    let startButtons = document.querySelectorAll('#mypump [id^="stop_"]');
    startButtons.forEach(function (button) {
        button.click();
    });
}

function pumpON(id) {
    const y = document.getElementById(id);
    const m = y.querySelector("img:nth-child(1)");
    const n = y.querySelector("img:nth-child(2)");
    const z = y.querySelector("input");
    m.classList.add("hidden");
    n.classList.remove("hidden");
    z.style.border = "2px solid var(--primary)";
    z.style.backgroundColor = "var(--primary)";
}

function pumpOFF(id) {
    const y = document.getElementById(id);
    const m = y.querySelector("img:nth-child(1)");
    const n = y.querySelector("img:nth-child(2)");
    const z = y.querySelector("input");
    m.classList.remove("hidden");
    n.classList.add("hidden");
    z.style.border = "2px solid var(--outline-input)";
    z.style.backgroundColor = "var(--bg-input)";
}