(function () {
  const aeropuertoDireccion = "Carr. Miguel Alemán Km 24, 66600 Cdad. Apodaca, N.L.";

  // Elementos del DOM
  const origenTipo = document.getElementById("origenTipo");
  const destinoTipo = document.getElementById("destinoTipo");
  const origenDireccion = document.getElementById("origenDireccion");
  const destinoDireccion = document.getElementById("destinoDireccion");
  const form = document.getElementById("reservaForm");
  const confirmBox = document.getElementById("confirmacion");

  // Autocompletar aeropuerto si se selecciona en origen o destino
  origenTipo.addEventListener("change", () => {
    if (origenTipo.value === "Aeropuerto") {
      origenDireccion.value = aeropuertoDireccion;
    } else {
      if (origenDireccion.value === aeropuertoDireccion) origenDireccion.value = "";
    }
  });

  destinoTipo.addEventListener("change", () => {
    if (destinoTipo.value === "Aeropuerto") {
      destinoDireccion.value = aeropuertoDireccion;
    } else {
      if (destinoDireccion.value === aeropuertoDireccion) destinoDireccion.value = "";
    }
  });

  // Envío del formulario: generar mensaje con enlaces Maps y abrir WhatsApp
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener valores
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const origenTipoVal = origenTipo.value;
    const destinoTipoVal = destinoTipo.value;
    const origenDirVal = origenDireccion.value.trim();
    const destinoDirVal = destinoDireccion.value.trim();
    const vehiculo = document.getElementById("vehiculo").value;
    const personas = document.getElementById("personas").value;
    const maletas = document.getElementById("maletas").value;

    // Validación rápida
    if (!nombre || !telefono || !fecha || !hora || !origenTipoVal || !destinoTipoVal || !origenDirVal || !destinoDirVal || !vehiculo || !personas || maletas === "") {
      alert("Por favor completa todos los campos antes de enviar.");
      return;
    }

    // Crear links de Google Maps (URLs planas)
    const linkOrigen = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(origenDirVal)}`;
    const linkDestino = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destinoDirVal)}`;

    // Mensaje plano para WhatsApp (enlaces como URLs)
    const mensaje =
`🚘 NUEVA RESERVA - Transporte Ejecutivos
----------------------------------------
👤 Nombre: ${nombre}
📞 Teléfono: ${telefono}
📅 Fecha: ${fecha}
⏰ Hora: ${hora}

ORIGEN:
• Tipo: ${origenTipoVal}
• Dirección: ${origenDirVal}
• Ver en Maps: ${linkOrigen}

DESTINO:
• Tipo: ${destinoTipoVal}
• Dirección: ${destinoDirVal}
• Ver en Maps: ${linkDestino}

🚗 Vehículo: ${vehiculo}
👥 Pasajeros: ${personas}
🧳 Maletas: ${maletas}

*Solicitud enviada desde la página web*`;

    // Número destino WhatsApp (cámbialo si necesitas)
    const numeroWhatsApp = "528111750448";

    // Mostrar confirmación breve
    confirmBox.style.display = "block";

    // Abrir WhatsApp en nueva pestaña con mensaje
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");

    // Limpiar formulario después de delay corto para que se vea la confirmación
    setTimeout(() => {
      form.reset();
      confirmBox.style.display = "none";
    }, 1200);
  });
})();
