-- PetConnect v5 Data Seeding (Mock Data Realista)

-- 1. Actualizar roles y planes en perfiles existentes o insertar nuevos
-- Nota: En un entorno real auth.users debería existir. Usamos un ID de ejemplo o UUID genérico.
INSERT INTO profiles (id, full_name, telefono, role, plan, avatar_url)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Usuario Free', '600000001', 'OWNER', 'FREE', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'),
  ('22222222-2222-2222-2222-222222222222', 'Usuaria Premium', '600000002', 'OWNER', 'PREMIUM', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'),
  ('33333333-3333-3333-3333-333333333333', 'Dr. Veterinario', '600000003', 'VET', 'FREE', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&q=80')
ON CONFLICT (id) DO UPDATE SET 
  role = EXCLUDED.role,
  plan = EXCLUDED.plan,
  avatar_url = EXCLUDED.avatar_url;

-- 2. Mascotas hiperrealistas
INSERT INTO pets (id, owner_id, nombre, especie, raza, color, peso, chip, foto_url)
VALUES
  (1, '11111111-1111-1111-1111-111111111111', 'Rex', 'Perro', 'Pastor Alemán', 'Negro/Fuego', 32, '100000000000001', 'https://images.unsplash.com/photo-1589965716319-4aa044b610c6?auto=format&fit=crop&w=500&q=80'),
  (2, '11111111-1111-1111-1111-111111111111', 'Misi', 'Gato', 'Siamés', 'Crema/Marrón', 4.5, '100000000000002', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=500&q=80'),
  (3, '22222222-2222-2222-2222-222222222222', 'Luna', 'Perro', 'Golden Retriever', 'Dorado', 28, '200000000000001', 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=80'),
  (4, '22222222-2222-2222-2222-222222222222', 'Coco', 'Ave', 'Loro Yaco', 'Gris/Rojo', 0.4, '200000000000002', 'https://images.unsplash.com/photo-1552728089-57168da2e5f5?auto=format&fit=crop&w=500&q=80'),
  (5, '22222222-2222-2222-2222-222222222222', 'Otti', 'Nutria', 'Nutria de río', 'Marrón oscuro', 8, '200000000000003', 'https://images.unsplash.com/photo-1581452410887-3532ab51ebc4?auto=format&fit=crop&w=500&q=80')
ON CONFLICT (id) DO UPDATE SET
  owner_id = EXCLUDED.owner_id,
  especie = EXCLUDED.especie,
  foto_url = EXCLUDED.foto_url;
