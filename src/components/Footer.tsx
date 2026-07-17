// src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return ( 
    <footer className="main-footer"> 
      <div className="footer-container"> 
        
        {/* Derechos de autor a la derecha */}
        <div className="footer-copyright">
          <p>Copyright {currentYear} — <strong>ESPANA DEAL</strong>. ¡Todos los derechos reservados!</p>
        </div> 

      </div>
    </footer>
  );
}