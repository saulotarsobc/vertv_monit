var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const HOST = "http://provedorconect.com:3000";
const DATA = [];

const monits = document.querySelectorAll(".monit");

monits.forEach(element => {
    DATA.push({
        id: element.id,
        oid: element.dataset.oid,
        fixed: element.dataset.fixed,
    })
});

console.log(DATA);

function render() {
    DATA.forEach(el => {
        getData(el.oid, el.id, el.fixed);
    });
}

async function getData(oid, id, fixed) {
    const raw = JSON.stringify({
        "cm": "10l15p130A_verti",
        "ip": "192.168.155.2",
        "port": 161,
        oid,
        "params": "-Oqv"
    });

    const requestOptions = { method: 'POST', headers: myHeaders, body: raw, redirect: 'follow' };

    fetch(HOST + "/snmp/snmpget", requestOptions)
        .then(response => response.text())
        .then(result => { document.getElementById(id).value = (result * 0.001).toFixed(fixed) })
        .catch(error => console.log('error', error));
}

/* end */
setInterval(() => {
    render();
}, 5000);

render();