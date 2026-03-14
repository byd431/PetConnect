
/*
export const styles = {
  container: "...", // Aquí iría el fondo, altura, flexbox, etc.
  content: "...",   // Un contenedor interno para centrar el contenido (max-w-...)
  logo: "...",      // Estilos para 'PetConnect'
  nav: "...",       // Estilos para la lista de enlaces
  link: "...",      // Estilos para cada enlace individual (hover, transition)
  button: "..."     // Estilos para el botón de "Acceso"
}; */
// Header.styles.ts
export const HEADER_STYLES = {
  container: "w-full bg-white border-b border-gray-100 sticky top-0 z-50",
  wrapper: "max-w-7xl mx-auto px-4 h-20 flex justify-between items-center",
  logo: "text-2xl font-bold text-pet-blue flex items-center gap-2 cursor-pointer",
  nav: "hidden md:flex gap-8 items-center",
  link: "text-gray-600 hover:text-pet-orange transition-colors duration-200 font-medium",
  button: "bg-pet-orange text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-all shadow-md"
};