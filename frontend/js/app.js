var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const HOST = "http://192.168.101.220:3000";

async function getData(oid, id) {
    const raw = JSON.stringify({
        "cm": "10l15p130A_verti",
        "ip": "192.168.155.2",
        "port": 161,
        oid,
        "params": "-Oqv"
    });

    const requestOptions = { method: 'POST', headers: myHeaders, body: raw, redirect: 'follow' };

    fetch(HOST + "/snmp/snmpget", requestOptions)
        .then(response => response.json())
        .then(result => { document.getElementById(id).value = (result * 0.001).toFixed(2) })
        .catch(error => console.log('error', error));
}

const data = [
    { id: "ret1", oid: "1.3.6.1.4.1.6302.2.1.2.11.4.1.6.3" },
    { id: "ret2", oid: "1.3.6.1.4.1.6302.2.1.2.11.4.1.6.4" },
]

function render() {
    data.forEach(el => {
        getData(el.oid, el.id);
    });
}

/* end */
setInterval(() => {
    render();
}, 5000);

render();