import React from 'react';

export default function CGV() {
  return (
    <div className="cgv-container">
      <header className="cgv-header">
        <h1 className="cgv-title">Condiciones Generales de Venta</h1>
        <p className="cgv-subtitle">
          Última actualización: {new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
        </p>
      </header>

      <div className="cgv-content">
        <section className="cgv-section">
          <h2>1. Objeto y Ámbito de Aplicación</h2>
          <p>
            Las presentes Condiciones Generales de Venta (en adelante, "CGV") regulan la compraventa de productos e-commerce a través de nuestro sitio web. Al realizar un pedido en nuestra plataforma, el usuario acepta de manera íntegra e incondicional los términos aquí expuestos.
          </p>
        </section>

        <section className="cgv-section">
          <h2>2. Productos y Precios</h2>
          <p>
            Todos los productos mostrados en la tienda están sujetos a disponibilidad. Nos reservamos el derecho de modificar la oferta de productos y los precios en cualquier momento sin previo aviso.
          </p>
          <p>
            Los precios se indican en euros (€) e incluyen los impuestos aplicables. Los gastos de envío no están incluidos en el precio base y se calcularán de forma transparente antes de confirmar el pedido.
          </p>
        </section>

        <section className="cgv-section">
          <h2>3. Pedidos y Confirmación</h2>
          <p>
            Para realizar un pedido, el cliente debe seleccionar los productos deseados y completar el proceso de pago habilitado en la plataforma. Una vez procesada la transacción, se enviará una confirmación automática por correo electrónico con los detalles de la compra.
          </p>
        </section>

        <section className="cgv-section">
          <h2>4. Métodos de Pago</h2>
          <p>
            Aceptamos los principales métodos de pago seguros, incluyendo tarjetas de crédito/débito y plataformas de pago electrónicas autorizadas. Las transacciones se procesan mediante protocolos de cifrado seguro para garantizamos la máxima protección de sus datos.
          </p>
        </section>

        <section className="cgv-section">
          <h2>5. Envíos y Entregas</h2>
          <p>
            Los plazos de entrega son orientativos y se estiman durante el proceso de compra. No asumimos responsabilidad por retrasos ocasionados por agencias de transporte externas o causas de fuerza mayor.
          </p>
        </section>

        <section className="cgv-section">
          <h2>6. Derecho de Desistimiento y Devoluciones</h2>
          <p>
            El cliente dispone de un plazo legal de <strong>14 días naturales</strong> desde la recepción del producto para ejercer su derecho de desistimiento, siempre que el producto se encuentre en su estado original y empaque intacto.
          </p>
          <p>
            Para gestionar una devolución, el usuario deberá ponerse en contacto con nuestro equipo de soporte técnico o atención al cliente a través del canal oficial habilitado en la web.
          </p>
        </section>

        <section className="cgv-section">
          <h2>7. Garantía y Atención al Cliente</h2>
          <p>
            Todos nuestros productos electrónicos y artículos disponen de la garantía legal correspondiente contra defectos de fabricación. Ante cualquier incidencia o consulta, puede contactar con nuestro equipo a través de la sección de soporte.
          </p>
        </section>

        <section className="cgv-section">
          <h2>8. Ley Aplicable y Jurisdicción</h2>
          <p>
            Las presentes condiciones se rigen por la legislación vigente. En caso de controversia o disputa, las partes se someterán a los juzgados y tribunales competentes establecidos por la normativa aplicable.
          </p>
        </section>
      </div>
    </div>
  );
}