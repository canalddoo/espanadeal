export default function PoliticaEnvio() {
  return (
    <div
      className="legal-page-container"
      style={{
        padding: "40px 20px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1>Política de Envío</h1>
      <p>Última actualización: 2026</p>

      <h2>1. Zonas de Envío</h2>
      <p>
        <strong>ESPANA DEAL</strong> realiza envíos a toda España peninsular e
        Islas Baleares. Para envíos internacionales dentro de la Unión
        Europea, consulte previamente con nuestro equipo de atención al
        cliente.
      </p>

      {/* Añadir esta información únicamente si es verdadera:
      <p>
        Los pedidos se preparan y se envían desde nuestras instalaciones en
        España.
      </p>
      */}

      <h2>2. Plazos de Preparación y Entrega</h2>
      <ul>
        <li>
          <strong>Tiempo de procesamiento:</strong> Los pedidos realizados de
          lunes a viernes antes de las 14:00h se procesan el mismo día
          laborable. Los pedidos realizados después de las 14:00h se
          procesarán el siguiente día laborable.
        </li>

        <li>
          <strong>Tiempo de envío a España Peninsular:</strong> Entre{" "}
          <strong>24 y 48 horas laborables</strong> a través de agencias de
          transporte exprés.
        </li>

        <li>
          <strong>Tiempo de envío a Baleares:</strong> Entre 48 y 72 horas
          laborables.
        </li>

        <li>
          <strong>Días laborables:</strong> Los plazos de preparación y entrega
          no incluyen sábados, domingos ni días festivos.
        </li>
      </ul>

      <h2>3. Tarifas y Gastos de Envío</h2>

      <p>
        Los gastos de envío aplicables se mostrarán claramente antes de
        finalizar la compra.
      </p>

      <ul>
        <li>
          <strong>Envío Estándar Península:</strong> 4,99 € (Gratuito en
          compras superiores a 50 €).
        </li>

        <li>
          <strong>Envío Exprés 24h:</strong> 6,99 €.
        </li>

        {/* Añadir el precio real de Baleares o explicar cómo se calcula */}
        <li>
          <strong>Envío a Islas Baleares:</strong> Los gastos de envío se
          mostrarán antes de finalizar la compra.
        </li>
      </ul>

      <h2>4. Seguimiento del Pedido</h2>
      <p>
        Una vez que su paquete salga de nuestras instalaciones, recibirá un
        correo electrónico con el número de seguimiento (Tracking ID) y un
        enlace directo a la plataforma del transportista para rastrear su
        envío, cuando este servicio esté disponible.
      </p>

      <h2>5. Retrasos en la Entrega</h2>
      <p>
        Los plazos de entrega indicados son estimaciones y pueden verse
        afectados por circunstancias ajenas a ESPANA DEAL, como incidencias
        del transportista, condiciones meteorológicas adversas o situaciones
        de fuerza mayor. En caso de retraso significativo, nuestro equipo de
        atención al cliente estará disponible para ayudarle.
      </p>

      <h2>6. Incidencias o Paquetes Dañados</h2>
      <p>
        Si recibe un paquete con signos evidentes de deterioro o manipulación
        durante el transporte, le recomendamos que lo indique al transportista
        en el momento de la entrega, cuando sea posible, y que se ponga en
        contacto con nosotros lo antes posible en{" "}
        <strong>contact@espanadeal.es</strong> para que podamos gestionar la
        incidencia.
      </p>

      <h2>7. Contacto</h2>
      <p>
        Para cualquier consulta relacionada con los envíos, puede contactar
        con nuestro equipo de atención al cliente:
      </p>

      <p>
        <strong>Email:</strong> contact@espanadeal.es
        <br />
        <strong>Teléfono:</strong> +34 666 754 415
      </p>
    </div>
  );
}