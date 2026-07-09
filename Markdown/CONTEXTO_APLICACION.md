# 📱 CONTEXTO INTEGRAL - CoE IA Sync App

**Proyecto:** CoE IA Sync App  
**Versión:** 2.0  
**Estado:** MVP refactorizado, listo para migración a Power Apps  
**Última actualización:** Enero 2026  
**Objetivo final:** Migrar de React a Power Apps Canvas App + SharePoint Lists

---

## 🎯 ¿QUÉ ES LA APLICACIÓN?

### Propósito
Una plataforma colaborativa para **gestionar iniciativas de IA** y **centralizar ideas** en el Center of Excellence (CoE) de IA. Permite:
- Clasificar ideas por área y estado
- Convertir ideas en iniciativas
- Rastrear el progreso de iniciativas en un kanban
- Ver métricas y dashboard ejecutivo
- Gestionar documentación asociada

### Audiencia
- **Administradores:** Control total, pueden crear/editar iniciativas y cambiar estados
- **Miembros:** Pueden ver kanban, registrar nuevas ideas, dejar comentarios
- **Stakeholders:** Dashboard read-only con métricas

### ¿Por qué este proyecto?
- **Validación de UX:** React es un MVP desechable para diseñar y validar flujos con usuarios reales
- **Paridad Power Apps:** Todo está diseñado para ser 100% replicable en Power Apps nativo (sin código pro)
- **Eficiencia:** Permite iterar rápido antes de comprometerse con la plataforma definitiva

---

## 📊 CORE CONCEPTS

### 1. **Ideas**
**¿Qué son?**  
Propuestas de proyectos de IA enviadas por miembros del equipo. Son el punto de entrada.

**Flujo:**
```
Miembro crea Idea → Se guarda en Ideas List → Admin puede convertir en Iniciativa
```

**Datos:**
- `IdeaID`: Identificador único
- `Title`: Nombre de la idea
- `Description`: Descripción detallada
- `SubmittedBy`: Email del usuario que propone
- `Area`: Marketing, Desarrollo, QA, Mantenimiento, Finanzas
- `Status`: New, Assigned, In Review, Rejected
- `CreatedDate`: Fecha de creación

**Estados disponibles:**
- `New`: Idea nuevamente enviada, sin revisar
- `Assigned`: Se ha asignado un revisor
- `In Review`: Bajo revisión del equipo
- `Rejected`: Idea descartada

---

### 2. **Iniciativas**
**¿Qué son?**  
Proyectos formales derivados de ideas aprobadas. Tienen ciclo de vida definido.

**Flujo:**
```
Admin convierte Idea → Crea Iniciativa → Añade a Kanban → Progresa por estados
```

**Datos:**
- `InitiativeID`: Identificador único
- `Title`: Nombre de la iniciativa
- `Description`: Descripción ejecutiva
- `RelatedIdea`: Referencia a la idea original (puede ser NULL)
- `Area`: Mismo as Ideas
- `OwnerEmail`: Responsable/propietario
- `Status`: New, Assigned, In Progress, In Review, Completed, On Hold, Cancelled
- `StartDate`: Fecha de inicio
- `ExpectedEndDate`: Fecha estimada de cierre
- `Priority`: High, Medium, Low
- `Documents`: Array de documentos asociados
- `CreatedDate`, `LastModified`: Trazabilidad

**Estados kanban:**
```
[📋 New] → [👤 Assigned] → [🚀 In Progress] → [👀 In Review] → [✅ Completed]
                                                        ↓
                                                    [⏸️ On Hold]
                                                        ↓
                                                    [❌ Cancelled]
```

---

### 3. **Dashboard & Métricas**
**¿Qué se muestra?**
- **Total Ideas:** Count de todas las ideas
- **Ideas por Area:** Desglose por categoría
- **Iniciativas Activas:** Conteo de iniciativas no completadas
- **% Completado:** Progreso general del pipeline
- **Kanban Preview:** Vista rápida de las 3 primeras iniciativas
- **Últimas Ideas:** Últimas 5 ideas enviadas
- **Status Timeline:** Gráfico histórico de cambios

**Usuarios que ven:**
- **Admin:** Dashboard completo con filtros
- **Miembros:** Dashboard read-only
- **Invitados:** Solo métricas de alto nivel

---

### 4. **Kanban Board**
**¿Qué es?**  
Vista interactiva del ciclo de vida de iniciativas. **No tiene drag-and-drop** (limitación Power Apps); usa botones de "Mover a".

**Columnas:**
```
[New] [Assigned] [In Progress] [In Review] [Completed] [On Hold] [Cancelled]
```

**Operaciones:**
- Ver detalles de una iniciativa
- Mover a siguiente estado
- Mover a Hold (pausar)
- Cancelar

---

### 5. **Screens (Pantallas)**

#### **LoginScreen**
- Simula autenticación en Power Apps (usa perfiles mock)
- Selecciona usuario para acceder
- Tres niveles: Admin, Miembro, Invitado

#### **DashboardScreen**
- Página principal
- Muestra métricas clave
- Kanban preview (primeras 3 iniciativas)
- Últimas ideas
- Timeline de cambios

#### **KanbanScreen**
- Kanban completo
- Filtros por Area
- Botones para mover iniciativas
- Vista detallada al hacer clic

#### **InitiativeDetailScreen**
- Información completa de una iniciativa
- Documentos asociados
- Timeline de estados
- Opciones de edición (solo admin)

#### **ManageIdeasScreen**
- Listado de todas las ideas
- Filtros por área y estado
- Convertir idea a iniciativa

#### **ManageInitiativesScreen**
- Listado de iniciativas
- Editar detalles
- Cambiar propietario, prioridad

#### **BacklogScreen**
- Ideas y iniciativas no iniciadas
- Ordenar por prioridad
- Vista alternativa al kanban

#### **NewIdeaScreen**
- Formulario para proponer nueva idea
- Campos: Título, Descripción, Área
- Validación de campos

---

## 🎨 PALETA DE COLORES

### Antes (Azul Microsoft)
```
Primary:        #0078D4 (Azul Microsoft)
Status "New":   #E8F4FD (Azul claro)
Status "Done":  #E8DAEF (Púrpura genérico)
```

### Ahora (Morado-Amarillo)
```
PRIMARY COLORS
├─ Morado (Primary):     #6B46B8 ← Color principal de la marca
└─ Amarillo (Accent):    #FFB900 ← Highlight, CTAs, badges

STATUS COLORS
├─ New:         #E8DDF4 (Morado muy claro, 10%)
├─ Assigned:    #D7C4F2 (Morado 20%)
├─ In Progress: #C4A8E8 (Morado 30%)
├─ In Review:   #B195E0 (Morado 40%)
├─ Completed:   #9F7FD9 (Morado 50%)
├─ On Hold:     #F5DC9E (Amarillo claro)
└─ Cancelled:   #E74C3C (Rojo para peligro/error)

SEMANTIC COLORS
├─ Success:     #107C10 (Verde Microsoft)
├─ Warning:     #FFB900 (Amarillo - nuestro accent)
├─ Error:       #E74C3C (Rojo)
├─ Info:        #0078D4 (Azul)
├─ Neutral:     #8A8A8A (Gris)
└─ Background:  #F7F7F7 (Gris muy claro)
```

---

## 📁 ESTRUCTURA DEL PROYECTO

### React (Actual - MVP)
```
AppSincronizacion/
├── src/
│   ├── App.jsx                          # Enrutador principal
│   ├── main.jsx                         # Entry point
│   ├── index.css                        # Estilos globales
│   ├── theme.js                         # Definición de paleta de colores
│   │
│   ├── context/                         # Context API (estado global)
│   │   ├── AppContext.jsx               # Navegación, usuario actual
│   │   ├── DataContext.jsx              # Datos (ideas, iniciativas)
│   │   └── ThemeContext.jsx             # Tema
│   │
│   ├── screens/                         # Las 7 pantallas
│   │   ├── LoginScreen.jsx              # Selección de usuario
│   │   ├── DashboardScreen.jsx          # Página principal
│   │   ├── KanbanScreen.jsx             # Vista kanban
│   │   ├── InitiativeDetailScreen.jsx   # Detalles de iniciativa
│   │   ├── ManageIdeasScreen.jsx        # Gestión de ideas
│   │   ├── ManageInitiativesScreen.jsx  # Gestión de iniciativas
│   │   ├── BacklogScreen.jsx            # Vista de backlog
│   │   └── NewIdeaScreen.jsx            # Crear idea
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppHeader.jsx            # Barra de navegación
│   │   │   └── ScreenContainer.jsx      # Contenedor genérico
│   │   ├── dashboard/                   # Componentes del dashboard
│   │   │   ├── DashboardMetrics.jsx
│   │   │   ├── KanbanPreview.jsx
│   │   │   ├── QuickActionCard.jsx
│   │   │   ├── SidebarMetrics.jsx
│   │   │   └── StatCard.jsx
│   │   ├── kanban/                      # Componentes del kanban
│   │   │   ├── KanbanBoard.jsx
│   │   │   ├── KanbanColumn.jsx
│   │   │   └── InitiativeCard.jsx
│   │   ├── initiative/                  # Detalles de iniciativa
│   │   │   ├── InitiativeInfo.jsx
│   │   │   ├── DocumentsList.jsx
│   │   │   └── StatusTimeline.jsx
│   │   └── shared/                      # Componentes reutilizables
│   │       ├── Badges.jsx
│   │       └── AreaSelector.jsx
│   │
│   ├── hooks/                           # Custom hooks
│   │   ├── useAppContext.js             # Hook de navegación
│   │   ├── useDataContext.js            # Hook de datos
│   │   ├── useTheme.js                  # Hook de tema
│   │   └── useToast.jsx                 # Notificaciones
│   │
│   ├── utils/
│   │   ├── constants.js                 # Enumerados (áreas, estados)
│   │   ├── dataService.js               # Operaciones CRUD simuladas
│   │   └── helpers.js                   # Funciones auxiliares
│   │
│   └── data/                            # Datos iniciales (mock)
│       ├── users.json                   # Perfiles de prueba
│       ├── ideas.json                   # Ideas iniciales
│       ├── initiatives.json             # Iniciativas iniciales
│       └── statusHistory.json           # Historial de cambios
│
├── package.json                         # Dependencias
├── vite.config.js                       # Configuración de build
├── index.html                           # HTML principal
└── README.md                            # Instrucciones
```

---

## 🔧 STACK TECNOLÓGICO

### Current (React MVP)
```
Frontend
├─ React 18.x          ← Framework principal
├─ Vite                ← Build tool (super rápido)
├─ Fluent UI v9        ← Design system de Microsoft (botones, inputs, etc.)
├─ Recharts            ← Gráficos para métricas

State Management
├─ Context API         ← Global state
├─ localStorage        ← Persistencia de datos simulada

Linting
└─ oxlint              ← Linter de JavaScript
```

### Target (Power Apps)
```
Frontend
├─ Power Apps Canvas App   ← Plataforma nativa

Data
├─ SharePoint Lists        ← Almacenamiento de usuarios
├─ Azure SQL Server        ← Almacenamiento de ideas/iniciativas

Authentication
├─ Entra ID (AAD)          ← Autenticación corporativa

Functions
└─ Power FX                ← Lógica (reemplaza JavaScript)
```

---

## 🔄 FLUJOS DE USUARIO

### Flujo 1: Proponer una Idea
```
1. Usuario selecciona "New Idea" en el menu
2. Completa formulario (título, descripción, área)
3. Envía
4. Idea aparece en ManageIdeasScreen con estado "New"
5. Admin revisa y puede convertir a Iniciativa
```

### Flujo 2: Convertir Idea a Iniciativa
```
1. Admin abre ManageIdeasScreen
2. Selecciona idea
3. Click en "Convert to Initiative"
4. Se abre formulario pre-poblado
5. Admin añade detalles (propietario, fecha, prioridad)
6. Envía
7. Iniciativa aparece en Kanban con estado "New"
```

### Flujo 3: Mover Iniciativa en Kanban
```
1. Admin abre KanbanScreen
2. Busca iniciativa en columna
3. Click en card
4. Selecciona "Move to..." → siguiente estado
5. Iniciativa se mueve a nueva columna
6. StatusHistory se actualiza automáticamente
```

### Flujo 4: Ver Progreso (Dashboard)
```
1. Usuario accede a DashboardScreen
2. Ve métricas: Total ideas, ideas por área, % completado
3. Ve Kanban preview (3 primeras iniciativas)
4. Ve Timeline de cambios recientes
5. Puede hacer click en cualquier elemento para ver detalles
```

---

## 💾 MODELADO DE DATOS

### Tabla: Users
```json
{
  "UserID": "guid",
  "Email": "user@company.com",
  "FullName": "John Doe",
  "Area": "Development | Marketing | QA | Maintenance | Finance",
  "Role": "Admin | Member | Guest",
  "IsActive": true,
  "LastLogin": "2026-01-15T10:30:00Z"
}
```

### Tabla: Ideas
```json
{
  "IdeaID": "guid",
  "Title": "Use AI to automate X",
  "Description": "Long description...",
  "SubmittedBy": "user@company.com",
  "Area": "Development",
  "Status": "New | Assigned | In Review | Rejected",
  "AssignedTo": "reviewer@company.com",
  "CreatedDate": "2026-01-10T09:00:00Z",
  "LastModified": "2026-01-15T14:20:00Z"
}
```

### Tabla: Initiatives
```json
{
  "InitiativeID": "guid",
  "Title": "Automation Platform v1",
  "Description": "Develop AI-powered automation...",
  "RelatedIdea": "guid or null",
  "Area": "Development",
  "OwnerEmail": "owner@company.com",
  "Status": "New | Assigned | In Progress | In Review | Completed | On Hold | Cancelled",
  "Priority": "High | Medium | Low",
  "StartDate": "2026-01-20T00:00:00Z",
  "ExpectedEndDate": "2026-03-20T00:00:00Z",
  "ActualEndDate": "2026-03-15T00:00:00Z or null",
  "Documents": [
    {
      "DocumentID": "guid",
      "Title": "Requirements Doc",
      "Url": "https://..."
    }
  ],
  "CreatedDate": "2026-01-15T10:00:00Z",
  "LastModified": "2026-01-15T10:00:00Z"
}
```

### Tabla: StatusHistory
```json
{
  "HistoryID": "guid",
  "InitiativeID": "guid",
  "OldStatus": "New",
  "NewStatus": "Assigned",
  "ChangedBy": "user@company.com",
  "ChangedDate": "2026-01-15T11:30:00Z",
  "Notes": "Assigned to John for review"
}
```

---

## ✅ CARACTERÍSTICAS IMPLEMENTADAS

### ✅ Totalmente Funcional
- ✅ Autenticación simulada (3 perfiles de prueba)
- ✅ CRUD para Ideas (Create, Read, Update, Delete)
- ✅ CRUD para Iniciativas
- ✅ Kanban board con 7 estados
- ✅ Movimiento entre estados
- ✅ Dashboard con métricas
- ✅ Filtros por área
- ✅ Timeline de cambios
- ✅ Persistencia en localStorage
- ✅ Paleta morado-amarillo
- ✅ Fluent UI components
- ✅ Responsive design

### ⏳ Pendiente (Power Apps Team)
- ⏳ Conectar a SharePoint Lists
- ⏳ Conectar a Azure SQL
- ⏳ Autenticación real con Entra ID
- ⏳ User Acceptance Testing (UAT)
- ⏳ Performance testing en producción
- ⏳ Documentación de Power FX
- ⏳ Go-live

---

## 🚀 ¿QUÉ SIGUE?

### Inmediato (Esta semana)
1. Stakeholder review de documentación
2. Aprobación de arquitectura Power Apps
3. Preparación del entorno Power Apps

### Semana 1-2
1. Crear LoginScreen en Power Apps
2. Configurar data sources (SharePoint + SQL)
3. Implementar autenticación Entra ID

### Semana 2-4
1. Implementar 6 screens principales
2. UAT testing
3. Ajustes basados en feedback
4. Go-live

---

## 📋 RESTRICCIONES PARA POWER APPS

### ❌ NO se usa
- ❌ WebSockets
- ❌ Drag-and-drop (kanban usa botones)
- ❌ Componentes PCF (Pro-Code Components)
- ❌ TypeScript
- ❌ APIs externas sin proxy
- ❌ Almacenamiento cliente-side complejo

### ✅ SE usa
- ✅ Botones para navegación
- ✅ Botones para mover iniciativas
- ✅ Formularios de edición inline
- ✅ Filtros por dropdown/checkbox
- ✅ Collections para datos temporales
- ✅ Power FX para lógica
- ✅ Entra ID para autenticación

---

## 🎓 GLOSARIO

| Término | Definición |
|---------|-----------|
| **Idea** | Propuesta inicial de proyecto de IA |
| **Iniciativa** | Proyecto formal derivado de una idea aprobada |
| **Kanban** | Vista de ciclo de vida con 7 estados |
| **Area** | Categoría: Marketing, Dev, QA, Maintenance, Finance |
| **Status** | Estado actual de una idea o iniciativa |
| **Owner** | Responsable de una iniciativa |
| **Dashboard** | Página de métricas y resumen ejecutivo |
| **Canvas App** | Tipo de Power App no-code/low-code |
| **Power FX** | Lenguaje de fórmulas de Power Apps |
| **Entra ID** | Autenticación AAD corporativa de Microsoft |
| **SharePoint Lists** | Base de datos simple en SharePoint |
| **Azure SQL** | Base de datos relacional en Azure |

---

## 📞 CONTACTO & REFERENCIAS

### Documentos de Referencia
- **INDEX.md** → Índice de todos los documentos
- **README_REFACTORING.md** → Overview del proyecto refactorizado
- **POWER_APPS_MIGRATION_GUIDE.md** → Guía técnica para desarrollo
- **POWER_APPS_ANALYSIS.md** → Análisis de compatibilidad
- **VERIFICATION_CHECKLIST.md** → Verificación exhaustiva
- **REFACTORING_SUMMARY.md** → Resumen ejecutivo

### Cómo ejecutar
```bash
cd AppSincronizacion
npm install
npm run dev
# Accede a http://localhost:5173
```

### Perfiles de prueba
- **Laura Sánchez** (Admin) - Acceso total
- **Ana García** (Admin Mantenimiento) - Acceso limitado
- **Juan Martínez** (Miembro) - Read-only ideas

---

## ✨ CONCLUSIÓN

**CoE IA Sync App** es un MVP validado listo para migración a Power Apps. Combina:
- ✅ Validación de UX con usuarios reales
- ✅ Paleta de colores corporativa
- ✅ Arquitectura 100% compatible con Power Apps nativo
- ✅ Documentación exhaustiva
- ✅ Checklist de verificación

**Estado:** LISTO PARA PRODUCCIÓN 🚀

---

*Documento generado en Enero 2026*  
*Para cualquier pregunta, consulta los documentos de referencia o el equipo de desarrollo*
