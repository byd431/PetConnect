// Header.tsx
import Link from 'next/link';
import Image from 'next/image';
import { HEADER_STYLES as styles } from './Header.styles';

export default function Header() {
  return (
    <header className={styles.container}>
      {/* Usamos el wrapper que definimos en los estilos para centrar el contenido */}
      <nav className={styles.wrapper}>
        
        {/* LADO IZQUIERDO: Logo */}
        <div className="flex items-center">
          <Link href="/" className={styles.logo}>
            {/* Aquí un ejemplo de cómo usar Image correctamente */}
            <Image 
              src="/images/logo.png" 
              alt="PetConnect Logo" 
              width={40} 
              height={40} 
            />
            <span>PetConnect</span>
          </Link>
        </div>

        {/* LADO DERECHO: Navegación */}
        <ul className={styles.nav}>
          <li>
            <Link href="/" className={styles.link}>Home</Link>
          </li>
          <li>
            <Link href="/tablon" className={styles.link}>Tablón</Link>
          </li>
          <li>
            <Link href="/mapa" className={styles.link}>Mapa</Link>
          </li>
          <li>
            <Link href="/perfil" className={styles.link}>Perfil</Link>
          </li>
          <li>
            <Link href="/login" className={styles.link}>Log In</Link>
          </li>
          {/* Un botón resaltado para el Sign Up */}
          <li>
            <Link href="/signup" className={styles.button}>
              Sign Up
            </Link>
          </li>
        </ul>

      </nav>
    </header>
  );
}