// CODIGO OPTIMIZADO

// Obtén el elemento select de la localidad y el de la fecha
const locationSelect = document.getElementById('location-pet');
const dateSelect = document.getElementById('date-available');

// Define un objeto con los rangos de fechas disponibles para cada localidad
const availableDates = {
  // LOCALIDADES  
  1: {days: [4]},  //Agronomia 
  2: {days: [5]},  //Aldo Bonzi
  3: {days: [3]},  //Almagro
  4: {days: [3]},  //Balvanera
  5: {days: [3]},  //Barraca
  6: {days: [4]},  //Belgrano
  7: {days: [3]},  //Boedo
  8: {days: [2]},  //Caballito
  9: {days: [1]},  //Caseros
  10: {days: [1]},  //Castelar
  11: {days: [4]},  //Chacarita
  12: {days: [1]},  //Churruca
  13: {days: [5]},  //Ciudad Evita
  14: {days: [1]},  //CJ Lomas del Palomar
  15: {days: [1]},  //Ciudadela
  16: {days: [4]},  //Colegiales
  17: {days: [3]},  //Constitución
  18: {days: [1]},  //El Libertador
  19: {days: [1]},  //El Palomar
  20: {days: [2]},  //Flores
  21: {days: [2]},  //Floresta
  22: {days: [5]},  //G. Laferrere
  23: {days: [1]},  //Haedo
  24: {days: [5]},  //Isidro Casanova
  25: {days: [1]},  //Jose Ingenieros
  26: {days: [3]},  //La Boca
  27: {days: [4]},  //La Paternal
  28: {days: [5]},  //La Matanza
  29: {days: [2]},  //Liniers
  30: {days: [1]},  //Loma Hermosa
  31: {days: [5]},  //Lomas del Mirador
  32: {days: [1]},  //Martín Coronado
  33: {days: [2]},  //Matadero
  34: {days: [3]},  //Monserrat
  35: {days: [2]},  //Monte castro
  36: {days: [4]},  //Nuñez
  37: {days: [1]},  //Once de Septiembre
  38: {days: [1]},  //Pablo Podestá
  39: {days: [3]},  //Palermo
  40: {days: [2]},  //Parque Avellaneda
  41: {days: [2]},  //Parque Chacabuco
  42: {days: [3]},  //Parque Patricio
  43: {days: [3]},  //Pompeya
  44: {days: [3]},  //Puerto Madero
  45: {days: [5]},  //Rafel Castillo
  46: {days: [5]},  //Ramos Mejias
  47: {days: [3]},  //Recoleta
  48: {days: [1]},  //Remedios de Escalada
  49: {days: [3]},  //Retiro
  50: {days: [2]},  //Riachuelo
  51: {days: [4]},  //Saavedra
  52: {days: [1]},  //Saenz Peña
  53: {days: [5]},  //San Justo
  54: {days: [3]},  //San Telmo
  55: {days: [1]},  //Santos Lugares
  56: {days: [5]},  //Tapiales
  57: {days: [2]},  //Velez Sarfiel
  58: {days: [2]},  //Versalles
  59: {days: [1]},  //Villa Bosch
  60: {days: [4]},  //Villa del Parque
  61: {days: [4]},  //Villa Devoto
  62: {days: [2]},  //Villa Lugano
  63: {days: [2]},  //Villa Luro
  64: {days: [5]},  //Villa Luzuriaga
  65: {days: [5]},  //Villa Madero
  66: {days: [2]},  //Villa Mitre
  67: {days: [4]},  //Villa Ortuzar
  68: {days: [4]},  //Villa Pueyrredón
  69: {days: [1]},  //Villa Raffo
  70: {days: [2]},  //Villa Real
  71: {days: [1]},  //Villa Sarmiento
  72: {days: [2]},  //Villa Soldati
  73: {days: [4]},  //Villa Urquiza
};

// Función para llenar el select de fechas con los días habilitados dentro del rango
function fillDateSelect(days) {
  dateSelect.innerHTML = ''; // Limpia el select

  const options = [];
  const currentDate = new Date();
  const endDate = new Date(currentDate.getTime() + 60 * 24 * 60 * 60 * 1000); // 60 días posteriores
  const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };

  const minDate = new Date(currentDate);
  minDate.setDate(minDate.getDate() + 2);

  while (currentDate <= endDate) {
    if (days.includes(currentDate.getDay()) && currentDate >= minDate) {
      const formattedDate = `${currentDate.toLocaleDateString('es-AR', { weekday: 'long' })}: ${currentDate.toLocaleDateString('es-AR', dateOptions)}`;
      const option = document.createElement('option');
      option.value = currentDate.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
      option.text = formattedDate;
      options.push(option);
    }
    currentDate.setDate(currentDate.getDate() + 1); // Avanza un día
  }

  options.forEach((option) => dateSelect.appendChild(option));
}

// Evento que se dispara al cambiar la localidad seleccionada
locationSelect.addEventListener('change', () => {
  const selectedLocation = parseInt(locationSelect.value);
  const days = availableDates[selectedLocation]?.days || [];

  if (days.length > 0) {
    fillDateSelect(days);
  } else {
    dateSelect.innerHTML = '<option value="0">Seleccione una fecha</option>';
  }
});

// Dispara el evento para cargar las fechas iniciales
locationSelect.dispatchEvent(new Event('change'));


// Obtener referencias a los elementos HTML del modal
const radioYes = document.getElementById('pregnant-yes');
const radioNo = document.getElementById('pregnant-no');
const modal = document.getElementById('modal');

// Escuchar cambios en el radio button 'Si'
radioYes.addEventListener('change', function () {
  if (this.checked) {
    // Mostrar el modal
    modal.style.display = 'block';
  }
});

// Función para cerrar el modal y mantener marcado el radio button 'No'
function closeModal() {
  modal.style.display = 'none';
  radioNo.checked = true;
}

// Validaciones de formulario
const formSections = document.querySelectorAll('.grid-column article');

formSections.forEach(section => {
  const input = section.querySelector('input');
  const span = section.querySelector('.error-message');

  // Escuchar el evento input en los campos y realizar validaciones
  input.addEventListener('input', function () {
    const isValid = input.checkValidity();
    span.style.color = isValid ? '#14AB28' : '#14192D';
  });
});

// Validaciones específicas
const validations = [
  { input: document.getElementById('name'), span: '.span-name .error-message', pattern: /^[A-Za-z\s#,.:ñÑ'áéíóúÁÉÍÓÚ]{5,30}$/ },
  { input: document.getElementById('tel'), span: '.span-telephone .error-message', pattern: /^\d{10}$/ },
  { input: document.getElementById('email'), span: '.span-email .error-message', pattern: /\S+@\S+\.\S{2,}/ },
  { input: document.getElementById('address'), span: '.span-address .error-message', pattern: /^[A-Za-z0-9\s#,.:ñÑ'áéíóúÁÉÍÓÚ\-/*]{15,50}$/ },
  { input: document.getElementById('zip'), span: '.span-code .error-message', pattern: /^[0-9]{4}$/ }
];

// Validación que no existan campos vacíos y otras validaciones
function validateForm() {
  var caninoCantidad = document.getElementById('caninoCantidad').value;
  var felinoCantidad = document.getElementById('felinoCantidad').value;
  var weight = document.getElementById('weight-pet').value;
  var age = document.getElementById('age-pet').value;
  var location = document.getElementById('location-pet').value;
  var date = document.getElementById('date-available').value;

  // Realiza las validaciones según tus necesidades

  if (caninoCantidad === "0" || felinoCantidad === "0" || weight === "0" || age === "0" || location === "0" || date === "0") {
    alert("Debe completar todos los campos antes de enviar el formulario.");
    return false;
  }

  // Otras validaciones...

  return true;
}

// Además, agrega la validación al enviar el formulario
document.querySelector('.contact-form').addEventListener('submit', function (event) {
  const isSpecificValidationsPass = validations.every(validation => {
    const input = validation.input;
    const value = input.value;
    return validation.pattern.test(value);
  });

  // Evita que el formulario se envíe si alguna de las validaciones no se cumple
  if (!isSpecificValidationsPass) {
    event.preventDefault();
    // Puedes mostrar un mensaje adicional al usuario si lo deseas
    alert('Por favor, complete todos los campos correctamente.');
  }
});



