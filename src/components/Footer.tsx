// src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-container">
        
        {/* Colonne 1 : Entreprise et adresse complète */}
        <div className="footer-col">
          <h3>ESPANA DEAL</h3>
          <p className="footer-company-info">
            Calle Gran Vía 28, Planta 4<br />
            28013 Madrid, España
          </p>
          <p className="footer-contact-info">
            <strong>Teléfono:</strong> <a href="tel:+34666754415">+34 666 754 415</a><br />
            <strong>Email:</strong> <a href="mailto:contact@espanadeal.es">contact@espanadeal.es</a><br />
            <strong>CIF / NIF:</strong> B-88765432
          </p>
        </div>

        {/* Colonne 2 : Politiques légales */}
        <div className="footer-col">
          <h4>Políticas Legales</h4>
          <ul className="footer-links-list">
            <li>
              <Link href="/politica-de-devoluciones">
                Política de Devoluciones y Reembolso
              </Link>
            </li>
            <li>
              <Link href="/politica-de-envio">
                Política de Envío
              </Link>
            </li>
            <li>
              <Link href="/cgv">
                Términos y Condiciones (CGV)
              </Link>
            </li>
            <li>
              <Link href="/politica-de-privacidad">
                Política de Privacidad
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 3 : Support & Contact */}
        <div className="footer-col">
          <h4>Atención al Cliente</h4>
          <ul className="footer-links-list">
            <li>
              <Link href="/contact">
                Contáctenos
              </Link>
            </li>
            <li>
              <span>Horarios: Lun - Vie: 8:00 - 19:00</span>
            </li>
            <li>
              <span>Envíos rápidos a toda España</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="footer-copyright">
          <p>Copyright {currentYear} — <strong>ESPANA DEAL</strong>. ¡Todos los derechos reservados!</p>
        </div>
      </div>
    </footer>
  );
}