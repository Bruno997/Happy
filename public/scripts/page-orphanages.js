// CREATE MAP  -8.8246433,13.3104238
const map = L.map('mapid').setView([-8.8246433,13.3104238], 14)

// CREATE AND ADD TITLELAYER
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

// CREATE ICON
const icon = L.icon({
  iconUrl: "/images/local.png",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
})

function addMarker({id, name, lat, lng}) {

// CREATE POPUP OVERLAY
const popup = L.popup({
  closeButton: false,
  className: "map-popup",
  minWidth: 240,
  minHeight: 240
}).setContent(`${name} <a href="/orphanage?id=${id}"> <img src="/images/arrow-white.svg" ></a>`)

// CREATE AND ADD MARKER
L
.marker([lat, lng], { icon })
.addTo(map)
.bindPopup(popup)

}

const orphanagesSpan = document.querySelectorAll('.orphanages span')

orphanagesSpan.forEach( span => {
      const orphanage = {
        id: span.dataset.id,
        name: span.dataset.name,
        lat: span.dataset.lat,
        lng: span.dataset.lng
      }

      addMarker(orphanage)
})