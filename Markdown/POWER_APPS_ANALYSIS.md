# Análisis de Compatibilidad Power Apps y Rediseño UI/UX
## CoE IA Sync App - React to Power Apps Migration

---

## 1. ANÁLISIS DE COMPATIBILIDAD CON POWER APPS

### ✅ CARACTERÍSTICAS NATIVAS EN POWER APPS (MANTENER)
1. **Navegación entre Screens** - `Navigate()` ✓ (ya implementado correctamente)
2. **Dropdowns / Combobox** - Nativos con `Filter()` y `SelectMultiple` ✓
3. **Botones básicos** - Appearance: primary, secondary ✓
4. **TextInput y Textarea** - Field validation ✓
5. **Cards/Contenedores** - Estructuras simples ✓
6. **Avatars** - Mostrar iniciales ✓
7. **Badges/Tags** - Con colores condicionales ✓
8. **Tablas de datos** - Gallery/Collections ✓
9. **Headers pegajosos** - Sticky headers ✓
10. **Conditional visibility** - `If(condition, visible, hidden)` ✓

### ⚠️ CARACTERÍSTICAS A LIMITAR/CAMBIAR
1. **Gradientes** ❌ → Colores sólidos (Power Apps no maneja gradientes SVG complejos)
   - LoginScreen: gradient #0078D4 → #005A9E → #004578 → **Cambiar a color sólido**
   
2. **Animaciones complejas** ❌ → Transiciones simples
   - Hover effects con `transform: translateY()` → Quitarlas (Power Apps usa temas básicos)
   - `transition: all 0.2s ease` → Remover
   
3. **Box-shadow múltiples** ❌ → Simplificar a 1-2 niveles
   - Power Apps usa `tokens.shadow2` / `tokens.shadow4` → Mantener simples
   
4. **CSS keyframes** ⚠️ → Cuidado con animaciones complejas
   - `slideIn` animation → OK si es simple, pero minimizar
   
5. **Estilos inline dinámicos complejos** ⚠️ → Mantener simples y predecibles

### ❌ NO IMPLEMENTAR EN POWER APPS (ELIMINAR)
1. **Degradados CSS avanzados**
2. **Blur/filtros visuales complejos**
3. **SVG complejos con transformaciones**
4. **Drag-and-drop nativo** (PowerAutomate o add-ins)
5. **Canvas drawing** (Power Apps tiene límites)

---

## 2. PALETA DE COLORES: MORADO + AMARILLO (MICROSOFT DESIGN)

### Primario: MORADO
**Basado en:** Microsoft 365 Purple (Office, Teams, Copilot)

| Tono | Hex | Uso |
|------|-----|-----|
| Morado 10 (Oscuro) | `#2B1B5E` | Backgrounds oscuros (no usar) |
| Morado 20 | `#402060` | Backgrounds secundarios |
| Morado 30 | `#553373` | Backgrounds terciarios |
| Morado 40 (Principal) | `#6B46B8` | **PRIMARY BRAND** - Botones, Headers |
| Morado 50 | `#7F5AC2` | Hover primary |
| Morado 60 (Claro) | `#9B7FCC` | Backgrounds suaves |
| Morado 70 | `#B8A3D8` | Backgrounds muy claros |
| Morado 80 (Muy claro) | `#E8DDF4` | Backgrounds de contenedores |

### Secundario: AMARILLO
**Basado en:** Microsoft Yellow (Accent, Warnings, Highlights)

| Tono | Hex | Uso |
|------|-----|-----|
| Amarillo 20 (Oscuro) | `#B88C00` | Dark accents |
| Amarillo 30 | `#C49C0D` | Warnings/In Progress |
| Amarillo 40 (Principal) | `#FFB900` | **ACCENT** - Highlights |
| Amarillo 50 | `#FFD461` | Hover accent |
| Amarillo 60 | `#FFE8B6` | Light backgrounds |
| Amarillo 70 | `#FFF4CE` | Very light backgrounds |

### Neutros: GRISES (Microsoft Neutral Gray)

| Tono | Hex | Uso |
|------|-----|-----|
| Gris 10 | `#FFFFFF` | Backgrounds claros |
| Gris 20 | `#F5F5F5` | Page backgrounds |
| Gris 30 | `#EDEBE9` | Borders light |
| Gris 40 | `#D0CCCB` | Borders medium |
| Gris 50 | `#A19F9D` | Text secondary |
| Gris 60 | `#605E5C` | Text muted |
| Gris 70 | `#323130` | Text primary |
| Gris 80 | `#000000` | Text dark |

### Estados: Mantenerse

| Estado | Hex | Uso |
|------|-----|-----|
| Error | `#D13438` | Errores, validación |
| Success | `#107C10` | Aprobado, completado |
| Info | `#0078D4` | Información (opcional, mantener) |
| Warning | `#FFB900` | En revisión, atención |

---

## 3. COMPONENTES A REFACTORIZAR

### LoginScreen
```
ANTES:
- Gradient background: linear-gradient(135deg, #0078D4 → #005A9E → #004578)

DESPUÉS:
- Fondo sólido: #6B46B8 (Morado 40)
- Card mantiene white
- Button primary: #6B46B8
- Accent: #FFB900
```

### AppHeader
```
ANTES:
- Background: #0078D4 (Azul Microsoft)
- Hover effects con opacity

DESPUÉS:
- Background: #6B46B8 (Morado 40)
- Remover complejos hover effects
- Mantener simple: solo color change
```

### StatCard
```
ANTES:
- Hover con transform: translateY(-1px)
- box-shadow: tokens.shadow4

DESPUÉS:
- Eliminar transform
- Mantener shadow2 sin animación
- Dot color ahora en PALETA MORADO-AMARILLO
```

### QuickActionCard
```
ANTES:
- Hover con transform: translateY(-2px)
- Icon color: #0078D4
- Transition: all 0.2s ease

DESPUÉS:
- Eliminar transform y transition
- Icon color: #6B46B8 (morado)
- Hover: solo cambio de color + shadow
```

### InitiativeCard
```
ANTES:
- Hover con borderColor: #0078D4
- Transition: all 0.15s ease
- Move button primary: #0078D4

DESPUÉS:
- Eliminar transition
- Border hover: #6B46B8
- Button primary: #6B46B8 con accent amarillo
```

### KanbanBoard
```
ANTES:
- Posible grid-column complejas

DESPUÉS:
- Gallery simple: 4 columnas
- Cards fluyen naturalmente
- Drag-drop: evaluar si es necesario (Power Apps nativo limitado)
```

---

## 4. MAPEO POWER APPS COMPLETO

### Screens
| React Screen | Power Apps Screen | Tipo | Comentarios |
|---|---|---|---|
| LoginScreen | `LoginScreen` | Inicio | Navigate(DashboardScreen) |
| DashboardScreen | `DashboardScreen` | Contenedor | Header + ScreenContainer |
| NewIdeaScreen | `NewIdeaFormScreen` | Formulario | EditForm con Idea table |
| KanbanScreen | `InitiativesKanbanScreen` | Galería | 4 Gallery x estado |
| InitiativeDetailScreen | `InitiativeDetailScreen` | Detalle | DisplayForm + Timelines |
| BacklogScreen | `BacklogScreen` | Tabla | Gallery simplificada |

### Componentes
| Componente React | Power Apps Equivalente | Estado |
|---|---|---|
| StatCard | Container + Labels | ✓ Nativo |
| QuickActionCard | Container + Button (Icon) | ✓ Nativo |
| InitiativeCard | Gallery Template | ✓ Nativo |
| Badges | Container con formato condicional | ✓ Nativo |
| AreaSelector | Dropdown con visible condicional | ✓ Nativo |

### Contexto/Lógica
| Concepto React | Power Apps Equivalente | Notas |
|---|---|---|
| useAppContext | Global variables + Collections | Usar `Set()` y `ClearCollect()` |
| useDataContext | Data sources (SharePoint/SQL) | Conectar a real DB |
| useState | Local variables o Table edit |  |
| Filter/Map | Filter() y ForAll() en Power FX |  |

---

## 5. PLAN DE REFACTORIZACIÓN

### FASE 1: THEME & COLORS (CRÍTICO)
1. ✓ Crear nuevo `theme.js` con paleta morado-amarillo
2. ✓ Actualizar `constants.js` - STATUS_COLORS
3. ✓ Actualizar `index.css` - variables globales

### FASE 2: SIMPLIFICAR COMPONENTES
1. ✓ LoginScreen - remover gradient
2. ✓ AppHeader - cambiar color, remover animations
3. ✓ StatCard - remover transforms
4. ✓ QuickActionCard - remover transforms
5. ✓ InitiativeCard - remover transitions
6. ✓ Badges - actualizar colores

### FASE 3: LAYOUTS & SCREENS
1. ✓ DashboardScreen - grid update
2. ✓ NewIdeaScreen - form simplification
3. ✓ KanbanScreen - gallery template
4. ✓ InitiativeDetailScreen - layout
5. ✓ BacklogScreen - table

### FASE 4: DOCUMENTACIÓN FINAL
1. ✓ Crear mapa final de Power Apps
2. ✓ Documentar diferencias y migraciones
3. ✓ Listar features que requieren custom code

---

## 6. DIFERENCIAS CLAVE POWER APPS vs REACT

### No disponible en Power Apps nativo
- [ ] CSS gradients (usar colores sólidos)
- [ ] Animaciones complejas (solo transiciones de navegación)
- [ ] Hover effects con transform (usar solo color)
- [ ] Custom icons con transforms
- [ ] Drag-and-drop avanzado (requiere connector)

### Equivalencias directas
- [x] Dropdown → Dropdown control
- [x] Input → Text Input
- [x] Textarea → Multi-line Text Input
- [x] Button → Button
- [x] Card → Container (forma rectangulo)
- [x] Gallery → Gallery (horizontal/vertical)
- [x] Badge → Label con formato condicional

### Requiere diferente enfoque
- [ ] useContext → Global variables
- [ ] useState → Local variables
- [ ] useEffect → OnVisible/OnStart
- [ ] Validación → Validate() en Power Apps
- [ ] Toast → Notify() función

---

## 7. SIGUIENTE: IMPLEMENTACIÓN
Seguir el plan por fases, comenzando con theme.js y constants.js
