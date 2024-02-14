// ******Código optimizado

document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);

  const getValueFromOptionKey = (param, prefix) => {
    for (let i = 1; i <= 10; i++) {
      const optionKey = `${prefix}-item-${i}`;
      if (param === optionKey) return i;
    }
    return 0;
  };

  const nombreApellido = urlParams.get('name') || '-';
  const telefono = urlParams.get('tel') || '-';14
  const email = urlParams.get('email') || '-';
  const direccion = urlParams.get('address') || '-';
  const codigoPostal = urlParams.get('codigoPostal') || '-';

  const caninoCantidad = getValueFromOptionKey(urlParams.get('caninoCantidad'), 'canino');
  const felinoCantidad = getValueFromOptionKey(urlParams.get('felinoCantidad'), 'felino');

  const peso = urlParams.get('weight') === 'weight-item-1' ? '3 a 10 kg' : (urlParams.get('weight') === 'weight-item-2' ? '+ 10 kg' : '-');
  const edad = urlParams.get('age') === 'age-item-1' ? '6 meses/6 años' : '-';
  const localidadValue = urlParams.get('location') || '-';
  const fecha = urlParams.get('date') || '-';
  const prenada = urlParams.get('pregnant') || '-';

  function getLocalidadName(localidadValue) {
    const localidades = {
      "1": "Agronomía", "2": "Aldo Bonzi", "3": "Almagro", "4": "Balvanera", "5": "Barracas", "6": "Belgrano",
      "7": "Boedo", "8": "Caballito", "9": "Caseros", "10": "Castelar", "11": "Chacarita", "12": "Churruca",
      "13": "Ciudad Evita", "14": "Ciudad Jardín Lomas del Palomar", "15": "Ciudadela", "16": "Colegiales", "17": "Constitución",
      "18": "El Libertador", "19": "El Palomar", "20": "Flores", "21": "Floresta", "22": "Gregorio de Laferrere",
      "23": "Haedo", "24": "Isidro Casanova", "25": "José Ingenieros", "26": "La Boca", "27": "La Paternal",
      "28": "La Tablada", "29": "Liniers", "30": "Loma Hermosa", "31": "Lomas del Mirador", "32": "Martín Coronado",
      "33": "Mataderos", "34": "Monserrat", "35": "Monte Castro", "36": "Núñez", "37": "Once de Septiembre",
      "38": "Pablo Podestá", "39": "Palermo", "40": "Parque Avellaneda", "41": "Parque Chacabuco", "42": "Parque Patricios",
      "43": "Pompeya", "44": "Puerto Madero", "45": "Rafael Castillo", "46": "Ramos Mejía", "47": "Recoleta",
      "48": "Remedios de Escalada", "49": "Retiro", "50": "Riachuelo", "51": "Saavedra", "52": "Sáenz Peña",
      "53": "San Justo", "54": "San Telmo", "55": "Santos Lugares", "56": "Tapiales", "57": "Velez Sarfield",
      "58": "Versalles", "59": "Villa Bosch", "60": "Villa del Parque", "61": "Villa Devoto", "62": "Villa Lugano",
      "63": "Villa Luro", "64": "Villa Luzuriaga", "65": "Villa Madero", "66": "Villa Mitre", "67": "Villa Ortuzar",
      "68": "Villa Pueyrredón", "69": "Villa Raffo", "70": "Villa Real", "71": "Villa Sarmiento", "72": "Villa Soldati",
      "73": "Villa Urquiza"
    };
    return localidades[localidadValue] || '-';
  }

  const nombreApellidoElement = document.getElementById('nombreApellido');
  const telefonoElement = document.getElementById('telefono');
  const emailElement = document.getElementById('email');
  const direccionElement = document.getElementById('direccion');
  const codigoPostalElement = document.getElementById('codigoPostal');
  const felinoCantidadElement = document.getElementById('felinoCantidad');
  const caninoCantidadElement = document.getElementById('caninoCantidad');
  const pesoElement = document.getElementById('peso');
  const edadElement = document.getElementById('edad');
  const localidadElement = document.getElementById('localidad');
  const fechaElement = document.getElementById('fecha');
  const prenadaElement = document.getElementById('preñada');

  nombreApellidoElement.textContent = nombreApellido;
  telefonoElement.textContent = telefono;
  emailElement.textContent = email;
  direccionElement.textContent = direccion;
  codigoPostalElement.textContent = codigoPostal;
  felinoCantidadElement.textContent = felinoCantidad > 0 ? felinoCantidad.toString() : '-';
  caninoCantidadElement.textContent = caninoCantidad > 0 ? caninoCantidad.toString() : '-';
  pesoElement.textContent = peso;
  edadElement.textContent = edad;
  localidadElement.textContent = getLocalidadName(localidadValue);
  fechaElement.textContent = fecha;
  prenadaElement.textContent = prenada;

  const costoTotalElement = document.getElementById('costoTotal');

  function calcularImporteTotal() {
    const costoFelino = 15000;
    const costoCanino = 18000;
    const importeTotal = felinoCantidad * costoFelino + caninoCantidad * costoCanino;

    const importeFormateado = importeTotal.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    window.importeTotal = importeTotal;

    costoTotalElement.textContent = `ABONAR: ${importeFormateado} pesos AR`;
  }

  calcularImporteTotal();

  // ACTUALIZACIÓN DEL CÓDIGO DE LOS INPUT PARA OCULTAR LA DIV DEL BOTÓN DE MERCADO PAGO




  const wayPayRadios = document.querySelectorAll('input[name="paymentMethod"]');
  const mercadoPagoDiv = document.getElementById('checkout-btn');
  const mercadoPagoTarjetasImg = document.querySelector('.mercadopago-tarjetas');
  const walletContainerDiv = document.getElementById('wallet_container');
  const transferenciaBancariaQrSection = document.getElementById('transferencia-bancaria-qr');
  
  // Ocultar las etiquetas al inicio
  mercadoPagoTarjetasImg.style.display = 'none';
  walletContainerDiv.style.display = 'none';
  transferenciaBancariaQrSection.style.display = 'none';
  
  wayPayRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (radio.value === 'mercado-pago' && radio.checked) {
        // Mostrar las etiquetas de Mercado Pago si el usuario selecciona Mercado Pago
        mercadoPagoTarjetasImg.style.display = 'block';
        walletContainerDiv.style.display = 'block';
        transferenciaBancariaQrSection.style.display = 'none'; // Ocultar las etiquetas de Transferencia Bancaria
      } else if (radio.value === 'transferencia-bancaria' && radio.checked) {
        // Mostrar las etiquetas de Transferencia Bancaria si el usuario selecciona Transferencia Bancaria
        mercadoPagoTarjetasImg.style.display = 'none'; // Ocultar las etiquetas de Mercado Pago
        walletContainerDiv.style.display = 'none'; // Ocultar las etiquetas de Mercado Pago
        transferenciaBancariaQrSection.style.display = 'block';
      } else {
        // Ocultar todas las etiquetas si el usuario selecciona otra opción
        mercadoPagoTarjetasImg.style.display = 'none';
        walletContainerDiv.style.display = 'none';
        transferenciaBancariaQrSection.style.display = 'none';
      }
    });
  });
  
  // Verificar el estado inicial al cargar la página
  const radioSeleccionado = Array.from(wayPayRadios).find(radio => radio.checked);
  
  if (radioSeleccionado) {
    if (radioSeleccionado.value === 'mercado-pago') {
      // Mostrar las etiquetas de Mercado Pago si la opción inicial es Mercado Pago
      mercadoPagoTarjetasImg.style.display = 'block';
      walletContainerDiv.style.display = 'block';
      transferenciaBancariaQrSection.style.display = 'none'; // Ocultar las etiquetas de Transferencia Bancaria
    } else if (radioSeleccionado.value === 'transferencia-bancaria') {
      // Mostrar las etiquetas de Transferencia Bancaria si la opción inicial es Transferencia Bancaria
      mercadoPagoTarjetasImg.style.display = 'none'; // Ocultar las etiquetas de Mercado Pago
      walletContainerDiv.style.display = 'none'; // Ocultar las etiquetas de Mercado Pago
      transferenciaBancariaQrSection.style.display = 'block';
    } else {
      // Ocultar todas las etiquetas si la opción inicial es otra
      mercadoPagoTarjetasImg.style.display = 'none';
      walletContainerDiv.style.display = 'none';
      transferenciaBancariaQrSection.style.display = 'none';
    }
  }
  

  // *** Script del modal términos y condiciones****

  document.getElementById('showModalCheckbox').addEventListener('change', function() {
    // Marcas el checkbox y, si está marcado, muestras el modal; si está desmarcado, ocultas el modal
    document.getElementById('showModalCheckbox').checked = this.checked;
    document.getElementById('termsModal').style.display = this.checked ? 'block' : 'none';
  });

  window.marcarAcuerdo = function() {
    // Marcas el checkbox y muestras el modal
    document.getElementById('showModalCheckbox').checked = true;
    document.getElementById('termsModal').style.display = 'block';
  };

  // Código adicional para mostrar el modal al cargar la página si el checkbox está marcado
  window.onload = function() {
    if (document.getElementById('showModalCheckbox').checked) {
      document.getElementById('termsModal').style.display = 'block';
    }
  };
});

 const form = document.getElementById('form-resumen');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const tableData = getTableData();
  const paymentMethod = getSelectedPaymentMethod();
  const costoTotal = getCostoTotal();

  const message = `¡Hola! Quiero confirmar mi turno con los siguientes detalles:\n\n` +
    `Método de pago: ${paymentMethod}\n` +
    `Nombre y Apellido: ${tableData.nombreApellido}\n` +
    `Teléfono: ${tableData.telefono}\n` +
    `Email: ${tableData.email}\n` +
    `Dirección: ${tableData.direccion}\n` +
    `Código Postal: ${tableData.codigoPostal}\n` +
    `Canino (Cantidad): ${tableData.caninoCantidad}\n` +
    `Felino (Cantidad): ${tableData.felinoCantidad}\n` +
    `Peso: ${tableData.peso}\n` +
    `Edad: ${tableData.edad}\n` +
    `Localidad: ${tableData.localidad}\n` +
    `Fecha: ${tableData.fecha}\n` +
    `¿Mascota gestante o pesa +10kg?: ${tableData.preñada}\n` +
    `\nCosto Total: ${costoTotal}`;

  const whatsappLink = `https://wa.me/5491122553332?text=${encodeURIComponent(message)}`;

  // Abrir enlace de WhatsApp directamente
  window.open(whatsappLink, '_blank');

// Llamar a la función para resetear la página después de 1 minuto
resetearPagina();
});

// Función para resetear la página después de 1 minuto
function resetearPagina() {
  setTimeout(() => {
    window.location.href = 'https://mascotasplus.netlify.app'; // Cambia 'index.html' con la URL de tu página de inicio
  }, 60000); // 60000 milisegundos equivalen a 1 minuto
}

function getTableData() {
  const elements = ['nombreApellido', 'telefono', 'email', 'direccion', 'codigoPostal', 'felinoCantidad', 'caninoCantidad', 'peso', 'edad', 'localidad', 'fecha', 'preñada'];
  const tableData = {};

  elements.forEach(element => {
    const elementValue = document.getElementById(element).textContent || '-';
    tableData[element] = elementValue;
  });

  return tableData;
}

function getSelectedPaymentMethod() {
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
  return paymentMethod;
}

function getCostoTotal() {
  const costoTotal = document.getElementById('costoTotal').textContent;
  return costoTotal;
}

function copyToClipboard(elementId) {
  const el = document.getElementById(elementId);
  const icon = el.querySelector('i');

  const textarea = document.createElement('textarea');
  textarea.value = el.innerText.trim();
  document.body.appendChild(textarea);

  textarea.select();
  document.execCommand('copy');

  document.body.removeChild(textarea);

  // Cambiar el ícono a un ícono de check después de copiar
  icon.className = 'fas fa-check';

  // Resetear el ícono después de 5 segundos
  setTimeout(() => {
      icon.className = 'fas fa-copy';
  }, 5000);
}   
