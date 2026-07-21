// src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return ( 
    <footer className="main-footer"> 
      <div className="footer-container"> 
        
        {/* Liens de navegación / Legal */}
        <div className="footer-links">
          <Link href="/cgv">
            Términos y Condiciones (CGV)
          </Link>
          <Link href="/politica-de-privacidad">
            Política de Privacidad
          </Link>
        </div>

        {/* Derechos de autor a la derecha */}
        <div className="footer-copyright">
          <p>Copyright {currentYear} — <strong>ESPANA DEAL</strong>. ¡Todos los derechos reservados!</p>
        </div> 

      </div>
    </footer>
  );
}