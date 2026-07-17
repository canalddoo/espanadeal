"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de envío del formulario (API, Email, etc.)
    alert(`¡Muchas gracias ${formData.name}, su mensaje ha sido enviado correctamente!`);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="contact-page-container">
      {/* Encabezado de la página */}
      <div className="featured-hero">
        <span className="featured-subtitle">Contáctenos</span>
        <h1>¿Tiene alguna pregunta? Estamos aquí para ayudarle</h1>
        <p>Nuestro equipo de soporte le responderá lo antes posible para cualquier solicitud de información o seguimiento de su pedido.</p>
      </div>

      <div className="contact-content-grid">
        {/* Columna izquierda: Formulario de contacto */}
        <div className="contact-form-card">
          <h2>Envíenos un mensaje</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nombre completo</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Su nombre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="nombre@ejemplo.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Asunto</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Asunto de su mensaje"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Su mensaje</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="¿En qué podemos ayudarle?"
              ></textarea>
            </div>

            <button type="submit" className="btn-send-message">
              Enviar mensaje
            </button>
          </form>
        </div>

        {/* Columna derecha: Información práctica de contacto */}
        <div className="contact-info-column">
          <div className="info-status-card">
            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <div className="info-text">
                <h3>Teléfono</h3>
                <a href="tel:+34666754415" className="info-link">
                  +34 666 754 415
                </a>
                <p>Atención al cliente disponible de lunes a sábado.</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className="far fa-envelope"></i>
              </div>
              <div className="info-text">
                <h3>Soporte por Email</h3>
                <a href="mailto:contact@espanadeal.es" className="info-link">
                  contact@espanadeal.es
                </a>
                <p>Respuesta garantizada en menos de 24h laborables.</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="info-text">
                <h3>Nuestra Sede</h3>
                <p className="info-address">
                  Madrid, Espana
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className="far fa-clock"></i>
              </div>
              <div className="info-text">
                <h3>Horario de atención</h3>
                <p>Lunes - Viernes: 8:00 - 19:00</p>
                <p>Sábado: 9:00 - 17:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}