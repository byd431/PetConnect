// 1. Importamos los estilos globales. 
// El '@' es un alias que apunta a 'src', definido en tsconfig.json.
import "@/core/styles/global.css";

/**
 * RootLayout: Es el componente "Base" de toda la aplicación.
 * En Next.js, este archivo envuelve a todas las páginas.
 */
export default function RootLayout({
  children, // 2. Desestructuramos 'children': representa la página actual que se va a renderizar.
}: Readonly<{
  // 3. 'Readonly': Un "utility type" de TypeScript que asegura que las 
  //    props no se modifiquen dentro del componente (inmutabilidad).
  
  children: React.ReactNode; 
  // 4. 'React.ReactNode': El "Tipo" de dato. Le dice a TS que children 
  //    puede ser cualquier cosa: un div, texto, otro componente o un array.
}>) {
  return (
    // 5. El lenguaje es importante para el SEO y lectores de pantalla.
    <html lang="es">
      {/* 6. 'flex flex-col min-h-screen': 
          Preparamos el body para que sea un contenedor flexible que ocupe 
          al menos el 100% de la altura de la pantalla (Viewport Height).
      */}
      <body className="flex flex-col min-h-screen">
        
        {/* Aquí iría tu <Header /> */}

        {/* 7. 'flex-grow': Esta clase hace que el contenido principal 
            empuje al Footer hacia abajo si la página está casi vacía.
        */}
        <main className="flex-grow">
          {children} 
        </main>

        {/* Aquí iría tu <Footer /> */}

      </body>
    </html>
  );
}