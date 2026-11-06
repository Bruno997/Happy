const option = {
  dragging: false,
  touchZoom: false,
  doubleClickZoom: false,
  scrollWheelZoom: false,
  zoomControl: false
}

// GET ORPHANAGE COORDINATES
const mapElement = document.querySelector('#mapid')
const lat = mapElement.dataset.lat
const lng = mapElement.dataset.lng

// CREATE MAP
const map = L.map('mapid', option).setView([lat, lng], 16)

// CREATE AND ADD TITLELAYER
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

// CREATE ICON
const icon = L.icon({
  iconUrl: "/images/logs.png",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
})

// CREATE AND ADD MARKER
L.marker([lat, lng], { icon })
  .addTo(map)

// IMAGE GALLERY

function selectImage(event) {
  const button = event.currentTarget

  // REMOVE ALL .active CLASS
  const buttons = document.querySelectorAll('.images button')
  buttons.forEach((button) => {
    button.classList.remove("active")
  })

  // SELECT THE CLIKED IMAGE
  const image = button.children[0]
  const imageContainer = document.querySelector(".orphanage-details > img")
  
  // REFRESH THE IMAGE CONTAINER
  imageContainer.src = image.src;

  // ADD .active CLASS TO THE BUTTON
  button.classList.add('active')
}