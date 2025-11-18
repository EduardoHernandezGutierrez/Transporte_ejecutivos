/* ================== BANNER SLIDER + 3D TILT + SHINE ================== */
(function bannerModule() {
  const slides = Array.from(document.querySelectorAll(".hero-slider .slide"));
  const dotsContainer = document.querySelector(".hero-slider .dots");
  const prevBtn = document.querySelector(".hero-slider .prev");
  const nextBtn = document.querySelector(".hero-slider .next");
  let current = 0;
  let interval = null;
  const INTERVAL_MS = 4500;

  // create dots
  slides.forEach((s, i) => {
    const btn = document.createElement("button");
    if (i === 0) btn.classList.add("active");
    btn.addEventListener("click", () => goTo(i));
    dotsContainer.appendChild(btn);
  });

  const dots = Array.from(dotsContainer.querySelectorAll("button"));

  function setActive(idx) {
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));
    slides[idx].classList.add("active");
    dots[idx].classList.add("active");
    current = idx;
  }

  function goTo(idx) {
    setActive(idx);
    resetInterval();
  }
  function next() {
    goTo((current + 1) % slides.length);
  }
  function prev() {
    goTo((current - 1 + slides.length) % slides.length);
  }

  // autoplay
  function startInterval() {
    interval = setInterval(next, INTERVAL_MS);
  }
  function stopInterval() {
    clearInterval(interval);
    interval = null;
  }
  function resetInterval() {
    stopInterval();
    startInterval();
  }

  // controls
  nextBtn.addEventListener("click", () => { next(); });
  prevBtn.addEventListener("click", () => { prev(); });

  // pause on hover for entire slider
  const slider = document.querySelector(".hero-slider");
  slider.addEventListener("mouseenter", stopInterval);
  slider.addEventListener("mouseleave", startInterval);

  // 3D tilt effect for product image and shine
  slides.forEach(slide => {
    const img = slide.querySelector(".product-img");
    const circle = slide.querySelector(".circle");
    const shine = slide.querySelector(".shine");
    slide.addEventListener("mousemove", (e) => {
      const rect = slide.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height; // 0..1
      const rotateY = (px - 0.5) * 14; // +/- degrees
      const rotateX = (0.5 - py) * 8; // +/- degrees

      // image tilt
      img.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(8px)`;
      img.style.transition = "transform 0.08s linear";

      // circle parallax
      circle.style.transform = `translate(${(px-0.5)*20}px, ${(py-0.5)*18}px) scale(1.02)`;

      // shine position
      shine.style.transform = `rotate(-20deg) translateX(${(px - 0.5) * 160}%)`;
      shine.style.opacity = 0.5 + Math.abs(px-0.5)*0.6;
    });

    slide.addEventListener("mouseleave", () => {
      img.style.transform = `rotateY(0deg) rotateX(0deg)`;
      circle.style.transform = `translate(0,0) scale(1)`;
      shine.style.transform = `rotate(-20deg) translateX(-220%)`;
      shine.style.opacity = 0.35;
    });

    // slightly pop the image on click / touch
    img.addEventListener("touchstart", () => img.style.transform += " scale(1.02)");
    img.addEventListener("touchend", () => img.style.transform = `rotateY(0deg) rotateX(0deg)`);
  });

  // start autoplay
  startInterval();

})();

/* ================== FORM HANDLING (autofill aeropuerto + WhatsApp) ================== */
(function formModule() {
  const aeropuertoDireccion = "Carr. Miguel Alemán Km 24, 66600 Cdad. Apodaca, N.L.";

  // DOM
  const origenTipo = document.getElementById("origenTipo");
  const destinoTipo = document.getElementById("destinoTipo");
  const origenDireccion = document.getElementById("origenDireccion");
  const destinoDireccion = document.getElementById("destinoDireccion");
  const form = document.getElementById("reservaForm");
  const confirmBox = document.getElementById("confirmacion");

  // Autocomplete airport
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

  // Submit form -> WhatsApp
  form.addEventListener("submit", function (e) {
    e.preventDefault();

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

    if (!nombre || !telefono || !fecha || !hora || !origenTipoVal || !destinoTipoVal || !origenDirVal || !destinoDirVal || !vehiculo || !personas || maletas === "") {
      alert("Por favor completa todos los campos antes de enviar.");
      return;
    }

    const linkOrigen = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(origenDirVal)}`;
    const linkDestino = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destinoDirVal)}`;

    const mensaje =
`🚘 NUEVA RESERVA - Transporte Ejecutivo E.H.M 2000
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

    const numeroWhatsApp = "528111750448";

    // show confirm
    confirmBox.style.display = "block";

    // open whatsapp
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");

    // reset after a short delay
    setTimeout(() => {
      form.reset();
      confirmBox.style.display = "none";
    }, 1200);
  });

})();
