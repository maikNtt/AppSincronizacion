# Parte 0: Configuración Inicial — Listas SharePoint + App.OnStart

> **IdeaHub IA** — Aplicación PowerApps Canvas para Gestión de Ideas e Iniciativas de IA  
> NTT DATA · CoE IA

---

## 1. Creación de Listas de SharePoint

Crea cada una de las siguientes **9 listas** en tu sitio de SharePoint. Para cada lista sigue estos pasos:
1. Ve a **Contenido del sitio** → **Nuevo** → **Lista**
2. Asigna el nombre indicado
3. Agrega las columnas con los tipos de datos especificados

> **Nota:** SharePoint crea automáticamente las columnas `ID`, `Title`, `Created`, `Modified`. Usaremos `Title` como campo principal y lo renombraremos según corresponda.

---

### 1.1 Lista: `Users`

| Columna | Tipo SharePoint | Configuración |
|---------|----------------|---------------|
| `Title` → **renombrar a `name`** | Single line of text | Requerido |
| `microsoft_user` | Single line of text | — |
| `email` | Single line of text | — |
| `job_title` | Single line of text | — |
| `is_active` | Yes/No | Default: **Yes** |

---

### 1.2 Lista: `Teams`

| Columna | Tipo SharePoint | Configuración |
|---------|----------------|---------------|
| `Title` → **renombrar a `name`** | Single line of text | Requerido |
| `description` | Multiple lines of text | Plain text, sin Rich Text |
| `is_active` | Yes/No | Default: **Yes** |

---

### 1.3 Lista: `Ideas`

| Columna | Tipo SharePoint | Configuración |
|---------|----------------|---------------|
| `Title` → **renombrar a `title`** | Single line of text | Requerido |
| `current_problem` | Multiple lines of text | Plain text |
| `proposed_solution` | Multiple lines of text | Plain text |
| `status` | Choice | Opciones: `Nueva`, `En Revisión`, `Aprobada`, `Rechazada` · Default: **Nueva** |
| `review_meeting_date` | Date and Time | Solo fecha |
| `review_notes` | Multiple lines of text | Plain text |

---

### 1.4 Lista: `Initiatives`

| Columna | Tipo SharePoint | Configuración |
|---------|----------------|---------------|
| `Title` → **renombrar a `name`** | Single line of text | Requerido |
| `code` | Single line of text | — |
| `description` | Multiple lines of text | Plain text |
| `pain_point` | Multiple lines of text | Plain text |
| `expected_value` | Multiple lines of text | Plain text |
| `status` | Choice | Opciones: `Idea`, `Análisis`, `En Desarrollo`, `Listo`, `Cancelada` · Default: **Idea** |
| `priority` | Choice | Opciones: `Baja`, `Media`, `Alta`, `Crítica` · Default: **Media** |
| `complexity` | Choice | Opciones: `Baja`, `Media`, `Alta` · Default: **Media** |
| `transaction_volume_monthly` | Number | Decimals: 0 |
| `estimated_fte_saved` | Number | Decimals: 1 |
| `systems_involved` | Choice (Multi-select ✓) | Opciones: `SAP`, `Salesforce`, `SonarQube`, `Splunk`, `Otros` |
| `ai_capabilities_required` | Choice (Multi-select ✓) | Opciones: `NLP`, `OCR`, `Visión`, `LLM`, `Agentes` |
| `handles_sensitive_data` | Yes/No | Default: **No** |
| `documentation_url` | Hyperlink or Picture | Formato: Hyperlink |

---

### 1.5 Lista: `UserIdea` (tabla intermedia N:M)

| Columna | Tipo SharePoint | Configuración |
|---------|----------------|---------------|
| `Title` | Single line of text | Dejar auto (no se usa activamente) |
| `user_id` | Number | Decimals: 0 |
| `idea_id` | Number | Decimals: 0 |
| `idea_role` | Choice | Opciones: `Autor Principal`, `Co-autor`, `Revisor Técnico`, `Aprobador` |

---

### 1.6 Lista: `UserTeam` (tabla intermedia N:M)

| Columna | Tipo SharePoint | Configuración |
|---------|----------------|---------------|
| `Title` | Single line of text | Dejar auto |
| `user_id` | Number | Decimals: 0 |
| `team_id` | Number | Decimals: 0 |
| `team_role` | Choice | Opciones: `Líder`, `Miembro` |
| `allocation` | Number | Decimals: 2, Min: 0, Max: 1 |

---

### 1.7 Lista: `TeamInitiative` (tabla intermedia N:M)

| Columna | Tipo SharePoint | Configuración |
|---------|----------------|---------------|
| `Title` | Single line of text | Dejar auto |
| `team_id` | Number | Decimals: 0 |
| `initiative_id` | Number | Decimals: 0 |
| `impact_type` | Choice | Opciones: `Proponente`, `Área Impactada`, `Soporte Técnico` |

---

### 1.8 Lista: `UserInitiative` (tabla intermedia N:M)

| Columna | Tipo SharePoint | Configuración |
|---------|----------------|---------------|
| `Title` | Single line of text | Dejar auto |
| `user_id` | Number | Decimals: 0 |
| `initiative_id` | Number | Decimals: 0 |
| `initiative_role` | Choice | Opciones: `Co-autor`, `Revisor`, `Líder Técnico` |

---

### 1.9 Lista: `IdeaInitiative` (tabla intermedia N:M)

| Columna | Tipo SharePoint | Configuración |
|---------|----------------|---------------|
| `Title` | Single line of text | Dejar auto |
| `idea_id` | Number | Decimals: 0 |
| `initiative_id` | Number | Decimals: 0 |

---

## 2. App.OnStart — Variables de Tema

Pega este código completo en la propiedad **`App.OnStart`** de tu aplicación Canvas.

```powerfx
// =============================================
// SECCIÓN 1: VARIABLES DE TEMA (COLORES)
// =============================================
// Paleta oscura inspirada en JetBrains / axet
Set(varBgPrincipal, ColorValue("#282C34"));
Set(varBgCard,      ColorValue("#32373F"));
Set(varBgCard2,     ColorValue("#2D323A"));
Set(varBorder,      ColorValue("#3E4451"));
Set(varAccent,      ColorValue("#499CFF"));
Set(varText,        ColorValue("#CCCCCC"));
Set(varStrong,      ColorValue("#FFFFFF"));
Set(varMuted,       ColorValue("#8A93A2"));
Set(varSuccess,     ColorValue("#68A16B"));
Set(varError,       ColorValue("#CD5C5C"));
Set(varLink,        ColorValue("#64B5F6"));
Set(varPurple,      ColorValue("#B084EB"));
Set(varOrange,      ColorValue("#E0944D"));
```

---

## 3. App.OnStart — Variables de Navegación y Estado

```powerfx
// =============================================
// SECCIÓN 2: VARIABLES DE NAVEGACIÓN
// =============================================
Set(varSelectedIdeaId,  Blank());
Set(varSelectedInitId,  Blank());
Set(varSelectedUserId,  Blank());
Set(varSelectedTeamId,  Blank());
Set(varIsEditing,       false);
Set(varFromIdeaId,      Blank());

// Filtros y vistas
Set(varIdeaFilter,  "Todas");
Set(varInitFilter,  "Todas");
Set(varIdeaView,    "cards");
Set(varInitView,    "cards");
Set(varPeopleTab,   "users");
Set(varIdeaSearch,  "");
Set(varInitSearch,  "");

// Toggle states para formulario de iniciativa
Set(varSensitiveOn, false);
Set(varUserActive,  true);
Set(varTeamActive,  true);
```

---

## 4. App.OnStart — Colecciones de Datos de Prueba (ClearCollect)

> **Propósito:** Estas colecciones permiten probar toda la app sin conexión a SharePoint. Cuando conectes las listas reales, reemplaza cada `ClearCollect` por la conexión directa a SharePoint.

### 4.1 colUsers

```powerfx
// =============================================
// SECCIÓN 3: DATOS DE PRUEBA
// =============================================

ClearCollect(colUsers,
    {ID: 1, name: "Gabriel Vásconez",  microsoft_user: "AD-001", email: "gabriel@empresa.com",  job_title: "Junior Engineer",   is_active: true},
    {ID: 2, name: "Michael",           microsoft_user: "AD-002", email: "michael@empresa.com",  job_title: "Student",           is_active: true},
    {ID: 3, name: "Anthony",           microsoft_user: "AD-003", email: "anthony@empresa.com",  job_title: "Junior Engineer",   is_active: true},
    {ID: 4, name: "Maykel Astudillo",  microsoft_user: "AD-004", email: "maykel@empresa.com",   job_title: "Software Engineer", is_active: true}
);
```

### 4.2 colTeams

```powerfx
ClearCollect(colTeams,
    {ID: 1, name: "CoE IA",         description: "Centro de Excelencia de Inteligencia Artificial", is_active: true},
    {ID: 2, name: "Mantenimiento",  description: "Mantenimiento Operativo",                        is_active: true},
    {ID: 3, name: "QA",             description: "Aseguramiento de Calidad",                       is_active: true}
);
```

### 4.3 colIdeas

```powerfx
ClearCollect(colIdeas,
    {
        ID: 1,
        title: "Robot para leer logs de Mantenimiento",
        current_problem: "Perdemos mucho tiempo buscando errores a mano en los archivos txt.",
        proposed_solution: "Un bot que nos avise por Teams cuando detecte un error grave.",
        status: "Aprobada",
        review_meeting_date: Date(2026, 6, 19),
        review_notes: "Excelente caso de uso. Se aprueba para integrarlo al pipeline de iniciativas formales usando NLP."
    },
    {
        ID: 2,
        title: "Asistente de clasificación de tickets QA",
        current_problem: "Los tickets de QA se etiquetan a mano y se acumulan en el backlog.",
        proposed_solution: "Un modelo que sugiera categoría y prioridad automáticamente al crearse.",
        status: "En Revisión",
        review_meeting_date: Date(2026, 6, 27),
        review_notes: ""
    },
    {
        ID: 3,
        title: "Resumen automático de reuniones",
        current_problem: "Casi nadie toma minutas y se pierden los acuerdos importantes.",
        proposed_solution: "Un LLM que genere un resumen y la lista de tareas desde la transcripción.",
        status: "Nueva",
        review_meeting_date: Blank(),
        review_notes: ""
    },
    {
        ID: 4,
        title: "Detección de duplicados en SAP",
        current_problem: "Se crean proveedores duplicados en SAP por errores de captura.",
        proposed_solution: "Validar similitud de texto y avisar antes de guardar el registro.",
        status: "Nueva",
        review_meeting_date: Blank(),
        review_notes: ""
    },
    {
        ID: 5,
        title: "Auto-respuesta de correos de soporte",
        current_problem: "Muchos correos repetidos saturan a la mesa de soporte.",
        proposed_solution: "Generar borradores de respuesta para las preguntas frecuentes.",
        status: "Rechazada",
        review_meeting_date: Date(2026, 6, 15),
        review_notes: "Riesgo de enviar respuestas incorrectas a clientes. No se aprueba por ahora."
    }
);
```

### 4.4 colInitiatives

```powerfx
ClearCollect(colInitiatives,
    {
        ID: 1, code: "IA-2026-001",
        name: "Eliminador de Vulnerabilidades",
        description: "Sanear el código eliminando falsos positivos de seguridad de forma automática.",
        pain_point: "Revisión manual y lenta de falsos positivos reportados por SonarQube.",
        expected_value: "Reducción de horas de revisión del equipo de seguridad.",
        status: "Listo", priority: "Alta", complexity: "Alta",
        transaction_volume_monthly: 500, estimated_fte_saved: 0.5,
        systems_involved: "SonarQube", ai_capabilities_required: "Agentes",
        handles_sensitive_data: false,
        documentation_url: "https://nttdata.sharepoint.com/doc1"
    },
    {
        ID: 2, code: "IA-2026-002",
        name: "Automatización de Logs",
        description: "Analizar automáticamente los logs de Mantenimiento para detectar errores graves.",
        pain_point: "Lectura lenta y manual de logs dispersos en archivos txt.",
        expected_value: "Detección temprana de incidentes y menor tiempo de respuesta.",
        status: "Análisis", priority: "Media", complexity: "Media",
        transaction_volume_monthly: 10000, estimated_fte_saved: 1.2,
        systems_involved: "Splunk", ai_capabilities_required: "NLP",
        handles_sensitive_data: true,
        documentation_url: "https://nttdata.sharepoint.com/doc2"
    },
    {
        ID: 3, code: "IA-2026-003",
        name: "Clasificador de Tickets QA",
        description: "Sugerir categoría y prioridad de los tickets de QA al momento de crearse.",
        pain_point: "El etiquetado manual genera retrasos y un backlog desordenado.",
        expected_value: "Menor tiempo de triage y un backlog más limpio y priorizado.",
        status: "En Desarrollo", priority: "Alta", complexity: "Media",
        transaction_volume_monthly: 3200, estimated_fte_saved: 0.8,
        systems_involved: "Salesforce,SonarQube", ai_capabilities_required: "LLM",
        handles_sensitive_data: false,
        documentation_url: "https://nttdata.sharepoint.com/doc3"
    }
);
```

### 4.5 colUserIdea

```powerfx
ClearCollect(colUserIdea,
    {ID: 1, user_id: 3, idea_id: 1, idea_role: "Autor Principal"},
    {ID: 2, user_id: 4, idea_id: 1, idea_role: "Revisor Técnico"},
    {ID: 3, user_id: 2, idea_id: 2, idea_role: "Autor Principal"},
    {ID: 4, user_id: 1, idea_id: 3, idea_role: "Autor Principal"},
    {ID: 5, user_id: 3, idea_id: 4, idea_role: "Autor Principal"},
    {ID: 6, user_id: 1, idea_id: 5, idea_role: "Autor Principal"}
);
```

### 4.6 colUserTeam

```powerfx
ClearCollect(colUserTeam,
    {ID: 1, user_id: 1, team_id: 1, team_role: "Líder",   allocation: 1.0},
    {ID: 2, user_id: 2, team_id: 1, team_role: "Miembro", allocation: 1.0},
    {ID: 3, user_id: 3, team_id: 1, team_role: "Miembro", allocation: 0.5},
    {ID: 4, user_id: 3, team_id: 2, team_role: "Miembro", allocation: 0.5}
);
```

### 4.7 colTeamInitiative

```powerfx
ClearCollect(colTeamInitiative,
    {ID: 1, team_id: 1, initiative_id: 1, impact_type: "Proponente"},
    {ID: 2, team_id: 2, initiative_id: 2, impact_type: "Proponente"},
    {ID: 3, team_id: 1, initiative_id: 2, impact_type: "Soporte Técnico"},
    {ID: 4, team_id: 3, initiative_id: 3, impact_type: "Proponente"}
);
```

### 4.8 colUserInitiative

```powerfx
ClearCollect(colUserInitiative,
    {ID: 1, user_id: 4, initiative_id: 1, initiative_role: "Líder Técnico"},
    {ID: 2, user_id: 3, initiative_id: 2, initiative_role: "Co-autor"},
    {ID: 3, user_id: 2, initiative_id: 2, initiative_role: "Co-autor"},
    {ID: 4, user_id: 1, initiative_id: 2, initiative_role: "Revisor"},
    {ID: 5, user_id: 3, initiative_id: 3, initiative_role: "Co-autor"}
);
```

### 4.9 colIdeaInitiative

```powerfx
ClearCollect(colIdeaInitiative,
    {ID: 1, idea_id: 1, initiative_id: 2}
);
```

---

## 5. Fórmulas Helper Reutilizables

Estas fórmulas se usan repetidamente en controles de toda la app. Cópialas directamente en las propiedades correspondientes.

### 5.1 Obtener iniciales de un nombre

Úsala en la propiedad `Text` de avatares circulares:

```powerfx
// Para un campo ThisItem.name
Upper(
    Left(ThisItem.name, 1) &
    If(
        !IsBlank(Find(" ", ThisItem.name)),
        Mid(ThisItem.name, Find(" ", ThisItem.name) + 1, 1),
        ""
    )
)
```

### 5.2 Formatear fecha

```powerfx
// Formato dd/mm/yyyy
If(
    IsBlank(ThisItem.review_meeting_date),
    "—",
    Text(ThisItem.review_meeting_date, "dd/mm/yyyy")
)
```

### 5.3 Color de badge por estado de idea

Usa en `Fill` del badge (con transparencia) y en `Color` del texto:

```powerfx
// COLOR del texto del badge
Switch(ThisItem.status,
    "Nueva",       ColorValue("#64B5F6"),
    "En Revisión", ColorValue("#E0944D"),
    "Aprobada",    ColorValue("#68A16B"),
    "Rechazada",   ColorValue("#CD5C5C"),
    varMuted
)

// FILL del badge (fondo semitransparente) — usar RGBA
Switch(ThisItem.status,
    "Nueva",       RGBA(100, 181, 246, 0.13),
    "En Revisión", RGBA(224, 148, 77,  0.13),
    "Aprobada",    RGBA(104, 161, 107, 0.13),
    "Rechazada",   RGBA(205, 92,  92,  0.13),
    RGBA(138, 147, 162, 0.13)
)

// BORDERCOLOR del badge (semi-opaco)
Switch(ThisItem.status,
    "Nueva",       RGBA(100, 181, 246, 0.5),
    "En Revisión", RGBA(224, 148, 77,  0.5),
    "Aprobada",    RGBA(104, 161, 107, 0.5),
    "Rechazada",   RGBA(205, 92,  92,  0.5),
    RGBA(138, 147, 162, 0.5)
)
```

### 5.4 Color de badge por estado de iniciativa

```powerfx
// COLOR del texto
Switch(ThisItem.status,
    "Idea",          ColorValue("#8A93A2"),
    "Análisis",      ColorValue("#E0944D"),
    "En Desarrollo", ColorValue("#499CFF"),
    "Listo",         ColorValue("#68A16B"),
    "Cancelada",     ColorValue("#CD5C5C"),
    varMuted
)

// FILL del badge (fondo semitransparente)
Switch(ThisItem.status,
    "Idea",          RGBA(138, 147, 162, 0.13),
    "Análisis",      RGBA(224, 148, 77,  0.13),
    "En Desarrollo", RGBA(73,  156, 255, 0.13),
    "Listo",         RGBA(104, 161, 107, 0.13),
    "Cancelada",     RGBA(205, 92,  92,  0.13),
    RGBA(138, 147, 162, 0.13)
)
```

### 5.5 Color de badge por prioridad

```powerfx
// COLOR del texto
Switch(ThisItem.priority,
    "Baja",    ColorValue("#8A93A2"),
    "Media",   ColorValue("#64B5F6"),
    "Alta",    ColorValue("#E0944D"),
    "Crítica", ColorValue("#CD5C5C"),
    varMuted
)

// FILL semitransparente
Switch(ThisItem.priority,
    "Baja",    RGBA(138, 147, 162, 0.13),
    "Media",   RGBA(100, 181, 246, 0.13),
    "Alta",    RGBA(224, 148, 77,  0.13),
    "Crítica", RGBA(205, 92,  92,  0.13),
    RGBA(138, 147, 162, 0.13)
)
```

### 5.6 Generar siguiente código de iniciativa

```powerfx
// Usar como Default del campo txtInitCode
"IA-2026-" & Text(Max(colInitiatives, ID) + 1, "000")
// Resultado ejemplo: "IA-2026-004"
```

### 5.7 Obtener autor principal de una idea

```powerfx
// Nombre del autor
LookUp(
    colUsers,
    ID = LookUp(colUserIdea, idea_id = ThisItem.ID && idea_role = "Autor Principal").user_id
).name

// Iniciales del autor
With(
    {autor: LookUp(colUsers, ID = LookUp(colUserIdea, idea_id = ThisItem.ID && idea_role = "Autor Principal").user_id)},
    If(IsBlank(autor), "?",
        Upper(Left(autor.name, 1) & If(!IsBlank(Find(" ", autor.name)), Mid(autor.name, Find(" ", autor.name) + 1, 1), ""))
    )
)
```

### 5.8 Formatear número grande (1000 → 1k)

```powerfx
// Usar para volumen de transacciones
If(
    ThisItem.transaction_volume_monthly >= 1000,
    Text(ThisItem.transaction_volume_monthly / 1000, "0.#") & "k",
    Text(ThisItem.transaction_volume_monthly)
)
```

### 5.9 Breadcrumb dinámico

Usa en `lblBreadcrumb.Text` del header de cada pantalla:

```powerfx
Switch(App.ActiveScreen.Name,
    "scrDashboard",   "Panel",
    "scrApproval",    "Aprobación",
    "scrIdeas",       "Ideas",
    "scrIdeaDetail",  "Ideas › Detalle",
    "scrIdeaForm",    If(varIsEditing, "Ideas › Editar", "Ideas › Nueva"),
    "scrInitiatives", "Iniciativas",
    "scrInitDetail",  "Iniciativas › Detalle",
    "scrInitForm",    If(varIsEditing, "Iniciativas › Editar", "Iniciativas › Nueva"),
    "scrPeople",      "Personas",
    "scrUserDetail",  "Personas › Usuario",
    "scrTeamDetail",  "Personas › Equipo",
    "scrUserForm",    If(varIsEditing, "Personas › Editar usuario", "Personas › Nuevo usuario"),
    "scrTeamForm",    If(varIsEditing, "Personas › Editar equipo", "Personas › Nuevo equipo"),
    ""
)
```

---

## 6. Migración de Colecciones a SharePoint

Cuando estés listo para conectar las listas reales de SharePoint:

1. **Agrega las conexiones** a cada lista de SharePoint desde el panel de Datos de PowerApps
2. **Reemplaza cada `ClearCollect`** por una carga desde SharePoint:

```powerfx
// ANTES (datos de prueba):
ClearCollect(colUsers, {ID: 1, name: "Gabriel", ...});

// DESPUÉS (SharePoint real):
ClearCollect(colUsers, Users);
// Donde "Users" es el nombre de la lista SharePoint conectada
```

3. **Reemplaza cada `Patch(colXxx, ...)`** por:

```powerfx
// ANTES (colección local):
Patch(colIdeas, LookUp(colIdeas, ID = varSelectedIdeaId), {status: "Aprobada"});

// DESPUÉS (SharePoint):
Patch(Ideas, LookUp(Ideas, ID = varSelectedIdeaId), {status: {Value: "Aprobada"}});
// Nota: Para columnas Choice de SharePoint, usar {Value: "texto"}
```

4. **Reemplaza `Collect`** por:

```powerfx
// ANTES:
Collect(colIdeas, {ID: newId, title: "...", ...});

// DESPUÉS:
Patch(Ideas, Defaults(Ideas), {title: "...", ...});
// SharePoint genera el ID automáticamente
```

> **Importante:** Las columnas Choice de SharePoint requieren el formato `{Value: "opción"}` en vez de un string plano.

---

## 7. Lista de Pantallas de la App

| # | Nombre Pantalla | Archivo de Guía | Descripción |
|---|----------------|-----------------|-------------|
| 1 | `scrDashboard` | `Guia_01` | Panel de control con KPIs y gráficos |
| 2 | `scrIdeas` | `Guia_01` | Galería de ideas (Tarjetas/Tabla/Kanban) |
| 3 | `scrIdeaDetail` | `Guia_01` | Detalle de una idea |
| 4 | `scrIdeaForm` | `Guia_01` | Formulario crear/editar idea |
| 5 | `scrInitiatives` | `Guia_02` | Galería de iniciativas |
| 6 | `scrInitDetail` | `Guia_02` | Detalle de una iniciativa |
| 7 | `scrInitForm` | `Guia_02` | Formulario crear/editar iniciativa |
| 8 | `scrApproval` | `Guia_02` | Aprobación de ideas |
| 9 | `scrPeople` | `Guia_03` | Personas (tab Usuarios / tab Equipos) |
| 10 | `scrUserDetail` | `Guia_03` | Detalle de usuario |
| 11 | `scrTeamDetail` | `Guia_03` | Detalle de equipo |
| 12 | `scrUserForm` | `Guia_03` | Formulario crear/editar usuario |
| 13 | `scrTeamForm` | `Guia_03` | Formulario crear/editar equipo |
