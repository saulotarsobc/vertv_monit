var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const HOST = "http://provedorconect.com:3000";
const DATA = [];

const monits = document.querySelectorAll(".monit");

monits.forEach(element => {
    DATA.push({
        id: element.id,
        oid: element.dataset.oid,
    })
});

console.log(DATA);

function render() {
    DATA.forEach(el => {
        getData(el.oid, el.id);
    });
}

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

/* end */
setInterval(() => {
    render();
}, 5000);

render();