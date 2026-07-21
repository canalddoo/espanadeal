import React from 'react';

export default function PoliticaPrivacidad() {
  return (
    <div className="cgv-container">
      <header className="cgv-header">
        <h1 className="cgv-title">Política de Privacidad</h1>
        <p className="cgv-subtitle">
          Última actualización: {new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
        </p>
      </header>

      <div className="cgv-content">
        <section className="cgv-section">
          <h2>1. Responsable del Tratamiento de Datos</h2>
          <p>
            En <strong>ESPANA DEAL</strong> nos tomamos muy en serio la protección de sus datos personales. De conformidad con el Reglamento General de Protección de Datos (RGPD) y las leyes locales aplicables, le informamos que sus datos serán tratados de forma transparente, confidencial y segura.
          </p>
        </section>

        <section className="cgv-section">
          <h2>2. Información que Recopilamos</h2>
          <p>
            Recopilamos la información personal imprescindible para prestarle nuestros servicios. Esto incluye:
          </p>
          <ul>
            <li><strong>Datos de contacto e identificación:</strong> nombre, apellidos, dirección de correo electrónico, teléfono y dirección de envío/facturación.</li>
            <li><strong>Información de pago:</strong> los datos de la transacción se procesan a través de pasarelas de pago cifradas y seguras. No almacenamos los datos completos de su tarjeta.</li>
            <li><strong>Datos de navegación:</strong> dirección IP, tipo de dispositivo, cookies e interacción dentro de nuestro sitio web.</li>
          </ul>
        </section>

        <section className="cgv-section">
          <h2>3. Finalidad del Tratamiento</h2>
          <p>Utilizamos sus datos personales con los siguientes fines:</p>
          <ul>
            <li>Procesar, enviar y hacer el seguimiento de sus pedidos.</li>
            <li>Gestionar las devoluciones, garantías y atención al cliente.</li>
            <li>Enviar comunicaciones operativas relacionadas con sus compras.</li>
            <li>Mejorar la experiencia de usuario y la seguridad de la plataforma.</li>
          </ul>
        </section>

        <section className="cgv-section">
          <h2>4. Legitimación para el Tratamiento</h2>
          <p>
            La base legal para el tratamiento de sus datos es la ejecución del contrato de compraventa al adquirir nuestros productos, así como el consentimiento explícito otorgado al utilizar nuestras herramientas y formularios.
          </p>
        </section>

        <section className="cgv-section">
          <h2>5. Conservación de los Datos</h2>
          <p>
            Los datos personales recopilados se conservarán durante el tiempo estrictamente necesario para cumplir con las obligaciones contractuales y legales (como requerimientos fiscales y contables), o hasta que el usuario solicite su supresión.
          </p>
        </section>

        <section className="cgv-section">
          <h2>6. Cesión de Datos a Terceros</h2>
          <p>
            No vendemos ni alquilamos sus datos personales a terceros. Sus datos únicamente se compartirán con proveedores de servicios esenciales para el funcionamiento de la tienda, tales como:
          </p>
          <ul>
            <li>Empresas de mensajería y transporte para la entrega de su pedido.</li>
            <li>Entidades financieras y pasarelas de pago seguras.</li>
            <li>Proveedores de servicios tecnológicos y alojamiento web.</li>
          </ul>
        </section>

        <section className="cgv-section">
          <h2>7. Sus Derechos (ARCO / RGPD)</h2>
          <p>Tiene derecho a acceder, rectificar, suprimir y limitar el tratamiento de sus datos personales, así como a oponerse al tratamiento o solicitar la portabilidad de los mismos.</p>
          <p>
            Para ejercer cualquiera de estos derechos, puede ponerse en contacto con nuestro equipo de soporte enviando una solicitud a través del canal de atención al cliente de la web.
          </p>
        </section>

        <section className="cgv-section">
          <h2>8. Uso de Cookies</h2>
          <p>
            Utilizamos cookies técnicas e analíticas estrictamente necesarias para garantizar el correcto funcionamiento del carrito de compras y personalizar su experiencia en la plataforma.
          </p>
        </section>
      </div>
    </div>
  );
}