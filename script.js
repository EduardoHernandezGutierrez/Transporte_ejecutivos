document.getElementById("formReserva").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const origen = document.getElementById("origen").value;
  const destino = document.getElementById("destino").value;
  const direccion = document.getElementById("direccion").value.trim();
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const vehiculo = document.getElementById("vehiculo").value;

  if (!nombre || !telefono || !origen || !destino || !direccion || !fecha || !hora || !vehiculo) {
    alert("Por favor completa todos los campos antes de enviar.");
    return;
  }

  // Generar enlace de Google Maps
  const direccionMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;

  const mensaje = 
`🚘 *Nueva Reserva de Transportes Ejecutivos* 🚘
---------------------------------------
👤 *Nombre:* ${nombre}
📞 *Teléfono:* ${telefono}
📍 *Origen:* ${origen}
🏁 *Destino:* ${destino}
🏠 *Dirección:* ${direccion}
🗺️ *Ver ubicación:* ${direccionMaps}
📅 *Fecha:* ${fecha}
⏰ *Hora:* ${hora}
🚗 *Vehículo:* ${vehiculo}

✅ *Solicitud enviada desde la página web*`;

  const numeroWhatsApp = "528111750448";
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

  // Abrir en nueva pestaña
  window.open(url, "_blank");

  // Limpiar formulario
  document.getElementById("formReserva").reset();
});
