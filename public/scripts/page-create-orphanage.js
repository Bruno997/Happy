// CREATE MAP
const map = L.map('mapid').setView([-8.8246433,13.3104238], 16)

// CREATE AND ADD TITLELAYER
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

// CREATE ICON
const icon = L.icon({
  iconUrl: "/images/logs.png",
  iconSize: [58, 68],
  iconAnchor: [29, 68]
})

let marker;

// CREATE AND ADD MARKER
map.on('click', (event) => {

  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector('[name="lat"]').value = lat;
  document.querySelector('[name="lng"]').value = lng;
  // REMOVE ICON
  marker && map.removeLayer(marker)

  // ADD ICON LAYER
  marker = L.marker([lat, lng], { icon })
  .addTo(map)
})

// ADD PHOTO FIELD
function addPhotoField() {
  // GET PHOTO CONTAINER
  const container = document.querySelector('#images')

   // GET CONTAINER WILL BE CLONED
  const fiedlsContainer = document.querySelectorAll('.new-upload')
   
  // CLONE
  const newFieldContainer = fiedlsContainer[fiedlsContainer.length - 1].cloneNode(true)
  
  // CHECK IF THE FIELD IS FILLED
  const input = newFieldContainer.children[0]

  if (input.value == "") {
    return
  }
  
  // CLEAR THE FIELD
  input.value = ""

   // ADD CLONED CONTAINER INTO PHOTO CONTAINER
  container.appendChild(newFieldContainer)
}

function deleteField(event) {
  const span = event.currentTarget
  const fiedlsContainer = document.querySelectorAll('.new-upload')

  if (fiedlsContainer.length < 2) {
    // CLEAR THE FIELD
    span.parentNode.children[0].value = ""
    return
  }

  // DELETE THE FIELD
  span.parentNode.remove()

}

// SELECT YES OR NO
 function toggleSelect(event) {
  // REMOVE .active CLASS
  document.querySelectorAll('.button-select button')
  .forEach((button) => button.classList.remove('active'))

  // ADD .active CLASS
  const button = event.currentTarget
  button.classList.add('active')

  // CHANGE VALUE
  const input = document.querySelector('[name="open_on_weekends"]')
  input.value = button.dataset.value

 }

function validate(event) {

  //validar se lat e lng estao preenchidos
  const needsLatAndLng = false;
  if (needsLatAndLng) {
     event.preventDefault()
  alert('Selecione um ponto no mapa')
  }
 
}