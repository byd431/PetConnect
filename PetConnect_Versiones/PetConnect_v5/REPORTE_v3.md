# VERSIÓN 3: Perfiles, Tienda, Comunidad y SOS

## Nuevas Rutas Creadas

| Ruta           | Componente        | Descripción                                   |
| -------------- | ----------------- | --------------------------------------------- |
| `/`            | `HomeMap.tsx`     | Mapa interactivo (ya existente de v2)         |
| `/profile`     | `UserProfile.tsx` | Perfil del usuario autenticado + sus mascotas |
| `/pet/:id`     | `PetProfile.tsx`  | Ficha detallada de una mascota                |
| `/store`       | `NfcStore.tsx`    | Tienda de collares NFC (e-commerce simulado)  |
| `/sos/:nfc_id` | `SosScanner.tsx`  | Vista pública de emergencia (sin login)       |
| `/social`      | `SocialFeed.tsx`  | Tablón de la comunidad con posts filtrables   |

## Nuevas Implementaciones

### UserProfile.tsx

- **Dos secciones**: tarjeta de usuario (avatar, nombre, DNI, teléfono, email) + grid de mascotas.
- **Supabase query**: `SELECT * FROM pets WHERE owner_id = usuario_actual`.
- Si no hay mascotas, muestra texto gris (#666666) y botón azul (#4682ca) "Añadir Mascota".
- Las cards de mascota son clickables → redirigen a `/pet/:id`.

### PetProfile.tsx

- **Cabecera hero** con foto grande del animal y overlay degradado.
- **Datos físicos**: Chip (DNI), Color, Peso, F. Nacimiento en grid de tarjetas.
- **Observaciones médicas** en banner amarillo de alerta.
- **Botones de acción**:
  - "Editar Datos" (borde gris, texto negro).
  - "Vincular Collar NFC" (fondo Teal #2faaaf) → genera un UUID y hace `upsert` en `nfc_tags`.

### NfcStore.tsx

- **Catálogo e-commerce** con 2 productos mockeados:
  - Collar PetConnect Azul (#4682ca) — 14,99€.
  - Collar PetConnect Naranja (#f29933) — 14,99€.
- **Botón "Comprar"** (#f29933) → toast verde (#41b7a1): _"¡Compra simulada con éxito! Recibirás tu collar pronto."_

### SosScanner.tsx (Vista Pública — NO requiere login)

- **Ruta fuera del MainLayout** (pantalla completa propia).
- **Fondo rojo pastel** (#FADBD8) con banner pulsante "🚨 ALERTA: MASCOTA ENCONTRADA 🚨".
- **Supabase query**: JOIN de `nfc_tags` + `pets` + `profiles` usando `nfc_uuid` de la URL.
- **Foto grande** del animal en círculo, nombre, color, observaciones/alergias.
- **Botón 1 — LLAMAR**: Fondo azul (#4682ca), usa `href="tel:telefono_del_dueño"` → abre app de llamadas.
- **Botón 2 — UBICACIÓN**: Fondo naranja (#f29933) → alerta "📍 Ubicación GPS enviada al dueño".
- Si el NFC ID no existe, muestra pantalla de error con enlace al 112.

### SocialFeed.tsx

- **Pestañas de filtro**: Todos, 📅 Eventos, ❤️ Adopción, 🔍 Perdidos.
- **Supabase query**: `SELECT * FROM posts` con filtro dinámico por `tipo`.
- **Cards** con título, badge de color por tipo, contenido, autor y fecha.
- **FAB (+)** azul (#4682ca) fijo abajo-derecha → abre modal con formulario (título, tipo, contenido).
- **Crear publicación**: Inserta en Supabase y recarga el feed.

### MainLayout.tsx (Actualizado)

- Navbar ahora muestra: **Mapa**, **Comunidad**, **Tienda NFC**, **Mi Perfil** (si hay sesión) y **Salir**.
- Logo con emoji 🐾.

## Errores Encontrados y Solucionados

| Error                                                            | Causa                                                             | Solución                                         |
| ---------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------ |
| Lint warnings: `'React' is declared but its value is never read` | React 17+ con JSX transform no necesita import explícito de React | Eliminados los `import React` innecesarios en v3 |
| Build exitoso sin errores                                        | El `import type` de v2 sigue correctamente aplicado               | N/A                                              |

## Resultados del Testeo

- ✅ **TypeScript**: Compilación limpia — `tsc --noEmit` sin errores.
- ✅ **Build de producción**: `vite build` exitoso (exit code 0), ~165 kB gzipped.
- ✅ **Servidor de desarrollo**: `npm run dev` arranca correctamente en `localhost:5173`.
- ⚠️ **QA Visual Automatizado**: El subagente de navegador no estuvo disponible (Error 503 — capacidad del servidor AI agotada). Se recomienda verificación manual abriendo:
  - `http://localhost:5173` → Mapa
  - `http://localhost:5173/store` → Tienda (clic en "Comprar" para ver toast)
  - `http://localhost:5173/sos/12345` → Pantalla SOS (fondo rojo pastel, botón `tel:`)
  - `http://localhost:5173/social` → Comunidad
  - `http://localhost:5173/profile` → Mi Perfil

### Verificación del botón SOS `tel:`

- El botón "LLAMAR AL DUEÑO" usa etiqueta `<a href="tel:{telefono}">` lo cual abre la aplicación de llamadas nativa en dispositivos móviles automáticamente.
- Si el dueño no tiene teléfono registrado, se usa "112" como fallback.

## Tablas de Supabase Necesarias

Para que las vistas funcionen completamente, estas tablas deben existir en Supabase:

- `pets` (id, nombre, especie, raza, color, peso, fecha_nacimiento, chip, observaciones, foto_url, owner_id)
- `nfc_tags` (pet_id, nfc_uuid, linked_at)
- `posts` (id, titulo, tipo, contenido, autor, created_at, latitud, longitud)
- `profiles` (id, full_name, telefono)
- `clinics` (id, nombre, direccion, telefono, latitud, longitud, es_urgencia24h)
