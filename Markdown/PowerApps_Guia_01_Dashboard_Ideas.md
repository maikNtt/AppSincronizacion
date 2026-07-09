# Parte 1: Dashboard + Ideas — PowerFx Completo

> **IdeaHub IA** — Pantallas: `scrDashboard`, `scrIdeas`, `scrIdeaDetail`, `scrIdeaForm`

---

## Componentes Reutilizables (Presentes en TODAS las pantallas)

### Header: `conHeader`

> Copiar este bloque en **todas** las pantallas. Solo cambia `lblBreadcrumb.Text`.

| Control | Tipo | Propiedad | Valor PowerFx |
|---------|------|-----------|---------------|
| `conHeader` | Container | Fill | `varBgPrincipal` |
| | | Width | `Parent.Width` |
| | | Height | `58` |
| | | LayoutDirection | `LayoutDirection.Horizontal` |
| | | AlignItems | `AlignItems.Center` |
| | | Gap | `12` |
| | | PaddingLeft | `16` |
| | | PaddingRight | `16` |
| | | BorderColor | `varBorder` |
| | | BorderThickness | `0` |
| | | Y | `0` |
| `rectHeaderBorder` | Rectangle | Fill | `varBorder` |
| | | Height | `1` |
| | | Width | `Parent.Width` |
| | | Y | `57` |
| `conLogo` | Container | Width | `34` |
| | | Height | `34` |
| | | Fill | `RGBA(73,156,255,0.18)` |
| | | BorderRadius | `8` |
| | | BorderColor | `RGBA(73,156,255,0.4)` |
| | | BorderThickness | `1` |
| `lblLogoIA` | Label | Text | `"IA"` |
| | | Color | `varAccent` |
| | | Size | `13` |
| | | FontWeight | `FontWeight.ExtraBold` |
| | | Align | `Align.Center` |
| `conAppTitle` | Container | LayoutDirection | `LayoutDirection.Vertical` |
| | | Gap | `1` |
| `lblAppName` | Label | Text | `"IdeaHub"` |
| | | Color | `varStrong` |
| | | Size | `15` |
| | | FontWeight | `FontWeight.Bold` |
| `lblAppSub` | Label | Text | `"Gestión de Ideas e Iniciativas"` |
| | | Color | `varMuted` |
| | | Size | `10.5` |
| `rectHeaderSep` | Rectangle | Fill | `varBorder` |
| | | Width | `1` |
| | | Height | `26` |
| `lblBreadcrumb` | Label | Text | *(ver por pantalla)* |
| | | Color | `varMuted` |
| | | Size | `12` |
| `conSpacer` | Container | Flexible | `true` |
| `conUserPill` | Container | LayoutDirection | `LayoutDirection.Horizontal` |
| | | AlignItems | `AlignItems.Center` |
| | | Gap | `8` |
| | | Fill | `RGBA(62,68,81,0.5)` |
| | | BorderRadius | `20` |
| | | PaddingLeft | `8` |
| | | PaddingRight | `12` |
| | | Height | `34` |
| `conAvatar` | Container | Width | `26` |
| | | Height | `26` |
| | | Fill | `ColorValue("#3E4451")` |
| | | BorderRadius | `13` |
| `lblAvatarInitials` | Label | Text | `"GV"` |
| | | Color | `varAccent` |
| | | Size | `10.5` |
| | | FontWeight | `FontWeight.Bold` |
| | | Align | `Align.Center` |
| `conUserInfo` | Container | LayoutDirection | `LayoutDirection.Vertical` |
| `lblUserName` | Label | Text | `"Gabriel Vásconez"` |
| | | Color | `varStrong` |
| | | Size | `12` |
| | | FontWeight | `FontWeight.Semibold` |
| `lblUserRole` | Label | Text | `"CoE IA · Líder"` |
| | | Color | `varMuted` |
| | | Size | `10.5` |

---

### Nav Lateral: `conNavRail`

> Copiar en **todas** las pantallas. El `Fill` y `Color` de cada botón cambian según la pantalla activa.

| Control | Tipo | Propiedad | Valor PowerFx |
|---------|------|-----------|---------------|
| `conNavRail` | Container | Width | `84` |
| | | Height | `Parent.Height - 58` |
| | | Y | `58` |
| | | Fill | `varBgPrincipal` |
| | | LayoutDirection | `LayoutDirection.Vertical` |
| | | AlignItems | `AlignItems.Center` |
| | | Gap | `4` |
| | | PaddingTop | `12` |
| | | BorderColor | `varBorder` |
| | | BorderThickness | `0` |
| `rectNavBorder` | Rectangle | Fill | `varBorder` |
| | | Width | `1` |
| | | Height | `Parent.Height` |
| | | X | `83` |

#### Botón de Nav (patrón repetido × 5):

```powerfx
// ── btnNavPanel ──────────────────────────────────────
// Fill:
If(App.ActiveScreen.Name = "scrDashboard", varBgCard, Transparent())

// Color:
If(App.ActiveScreen.Name = "scrDashboard", varAccent, varMuted)

// BorderColor (franja izquierda activa — simular con Rectangle):
// Agrega rectNavAccent (Rectangle 3px, Height 40, X=0) con Visible:
Visible: App.ActiveScreen.Name = "scrDashboard"
Fill:    varAccent

// Text del Label debajo del icono:
"Panel"

// OnSelect:
Navigate(scrDashboard, ScreenTransition.None)
```

| Botón | Icono | Texto | Screen name | OnSelect |
|-------|-------|-------|-------------|----------|
| `btnNavPanel` | `Icon.GridFilled` | `"Panel"` | `scrDashboard` | `Navigate(scrDashboard)` |
| `btnNavApproval` | `Icon.Check` | `"Aprobar"` | `scrApproval` | `Navigate(scrApproval)` |
| `btnNavIdeas` | `Icon.Lightbulb` | `"Ideas"` | `scrIdeas` | `Navigate(scrIdeas)` |
| `btnNavInit` | `Icon.DocumentSet` | `"Iniciativas"` | `scrInitiatives` | `Navigate(scrInitiatives)` |
| `btnNavPeople` | `Icon.Group` | `"Personas"` | `scrPeople` | `Navigate(scrPeople)` |

**Badge de aprobación** en `btnNavApproval`:
```powerfx
// Círculo rojo sobre el ícono (Visible si hay pendientes)
Visible: CountRows(Filter(colIdeas, status = "En Revisión")) > 0
Fill:    varError
Width:   14
Height:  14
BorderRadius: 7
// Label dentro:
Text: Text(CountRows(Filter(colIdeas, status = "En Revisión")))
Color: varStrong
Size: 8.5
```

---

## PANTALLA 1: `scrDashboard`

```
scrDashboard
├── conHeader          (ver arriba — lblBreadcrumb.Text = "Panel")
├── conNavRail         (ver arriba — btnNavPanel activo)
└── conMainDash        (área de contenido principal)
    ├── lblDashTitle
    ├── lblDashSub
    ├── conDashActions (botones Nueva idea / Nueva iniciativa)
    ├── conKPIs        (4 tarjetas KPI)
    ├── conChartRow    (gráfico de barras + embudo)
    └── conRecentTable (tabla iniciativas recientes)
```

### `conMainDash`

| Propiedad | Valor |
|-----------|-------|
| X | `84` |
| Y | `58` |
| Width | `Parent.Width - 84` |
| Height | `Parent.Height - 58` |
| Fill | `varBgPrincipal` |
| OverflowY | `OverflowY.Auto` |
| PaddingTop | `28` |
| PaddingLeft | `28` |
| PaddingRight | `28` |
| PaddingBottom | `28` |
| LayoutDirection | `LayoutDirection.Vertical` |
| Gap | `20` |

### Encabezado de sección

```powerfx
// lblDashTitle
Text:       "Panel de control"
Size:       23
FontWeight: FontWeight.Bold
Color:      varStrong

// lblDashSub
Text:  "Estado general del portafolio de ideas e iniciativas de IA."
Size:  13
Color: varMuted
```

### `conDashActions`

```powerfx
// Container horizontal con los 2 botones
LayoutDirection: LayoutDirection.Horizontal
Gap: 10
AlignItems: AlignItems.Center

// btnNewIdeaDash
Text:        "+ Idea"
Fill:        varBgCard
Color:       varText
BorderColor: varBorder
BorderThickness: 1
BorderRadius: 8
Height:      34
PaddingLeft: 14
PaddingRight: 14
OnSelect:    Set(varIsEditing, false); Navigate(scrIdeaForm, ScreenTransition.None)

// btnNewInitDash
Text:        "+ Iniciativa"
Fill:        varAccent
Color:       varStrong
BorderRadius: 8
Height:      34
PaddingLeft: 14
PaddingRight: 14
OnSelect:    Set(varIsEditing, false); Set(varFromIdeaId, Blank()); Navigate(scrInitForm, ScreenTransition.None)
```

---

### KPIs: `conKPIs`

```powerfx
LayoutDirection: LayoutDirection.Horizontal
Gap: 16
```

Genera 4 contenedores hijos con este patrón:

```powerfx
// Estructura de cada conKPI_X:
Fill:            varBgCard
BorderColor:     varBorder
BorderThickness: 1
BorderRadius:    12
PaddingTop:      18
PaddingLeft:     18
PaddingBottom:   18
PaddingRight:    18
LayoutDirection: LayoutDirection.Vertical
Gap:             6
Flexible:        true   // para que se repartan el ancho equitativamente
```

#### KPI 1 — Ideas Totales

```powerfx
lblKpi1Label.Text:  "IDEAS TOTALES"
lblKpi1Label.Color: varMuted
lblKpi1Label.Size:  11
lblKpi1Label.FontWeight: FontWeight.Semibold

lblKpi1Value.Text:  Text(CountRows(colIdeas))
lblKpi1Value.Color: varStrong
lblKpi1Value.Size:  30
lblKpi1Value.FontWeight: FontWeight.ExtraBold

lblKpi1Sub.Text:  Text(CountRows(Filter(colIdeas, status = "En Revisión"))) & " en revisión"
lblKpi1Sub.Color: varMuted
lblKpi1Sub.Size:  11.5
```

#### KPI 2 — Ideas Aprobadas

```powerfx
lblKpi2Label.Text:  "IDEAS APROBADAS"
lblKpi2Value.Text:  Text(CountRows(Filter(colIdeas, status = "Aprobada")))
lblKpi2Value.Color: varSuccess
lblKpi2Sub.Text:    "listas para iniciativa"
```

#### KPI 3 — Iniciativas Activas

```powerfx
lblKpi3Label.Text:  "INICIATIVAS ACTIVAS"
lblKpi3Value.Text:  Text(CountRows(Filter(colInitiatives, status <> "Listo" And status <> "Cancelada")))
lblKpi3Value.Color: varAccent
lblKpi3Sub.Text:    Text(CountRows(colInitiatives)) & " en total"
```

#### KPI 4 — FTE Ahorrado/Mes

```powerfx
lblKpi4Label.Text:  "FTE AHORRADO/MES"
lblKpi4Value.Text:  Text(Sum(colInitiatives, estimated_fte_saved), "0.0")
lblKpi4Value.Color: varPurple
lblKpi4Sub.Text:    With({total: Sum(colInitiatives, transaction_volume_monthly)},
                        If(total >= 1000, Text(total/1000, "0.#") & "k", Text(total))
                    ) & " transacciones/mes"
```

---

### Gráficos: `conChartRow`

```powerfx
LayoutDirection: LayoutDirection.Horizontal
Gap: 16
```

#### Gráfico de barras: `conInitChart` (60% del ancho)

```powerfx
Fill:        varBgCard
BorderColor: varBorder
BorderThickness: 1
BorderRadius: 12
PaddingTop:  20
PaddingLeft: 20
PaddingBottom: 20
PaddingRight: 20
LayoutDirection: LayoutDirection.Vertical
Gap: 14
Width: (Parent.Width - 16) * 0.6
```

```powerfx
// lblChartTitle
Text:  "Iniciativas por estado"
Size:  14
FontWeight: FontWeight.Bold
Color: varStrong

// lblChartSub
Text:  Text(CountRows(colInitiatives)) & " iniciativas"
Size:  11.5
Color: varMuted
```

**Galería `galInitChart`:**

```powerfx
Items: Table(
    {estado: "Idea",         conteo: CountRows(Filter(colInitiatives, status="Idea")),         color: RGBA(138,147,162,1)},
    {estado: "Análisis",     conteo: CountRows(Filter(colInitiatives, status="Análisis")),     color: RGBA(224,148,77,1)},
    {estado: "En Desarrollo",conteo: CountRows(Filter(colInitiatives, status="En Desarrollo")),color: RGBA(73,156,255,1)},
    {estado: "Listo",        conteo: CountRows(Filter(colInitiatives, status="Listo")),        color: RGBA(104,161,107,1)},
    {estado: "Cancelada",    conteo: CountRows(Filter(colInitiatives, status="Cancelada")),    color: RGBA(205,92,92,1)}
)

Layout:    Layout.Horizontal
TemplateWidth: (Parent.Width - 32) / 5
TemplateHeight: 180
ShowScrollbar: false
```

Dentro del template de `galInitChart`:

```powerfx
// lblBarValue (arriba de la barra)
Text:  Text(ThisItem.conteo)
Color: varStrong
Size:  12
FontWeight: FontWeight.Bold
Y:     0
Align: Align.Center
Width: Parent.Width

// rectBar (barra vertical)
Fill:        ThisItem.color
BorderRadius: 4
Width:       24
Height: Max(4,
    If(Max(galInitChart.AllItems.conteo) = 0, 4,
        ThisItem.conteo / Max(galInitChart.AllItems.conteo) * 100
    )
)
// Posicionar desde abajo: Y = 160 - Height
Y: 160 - Self.Height
X: (Parent.Width - 24) / 2

// lblBarLabel (debajo de la barra)
Text:  ThisItem.estado
Color: varMuted
Size:  10
Align: Align.Center
Y:     163
Width: Parent.Width
```

#### Embudo de ideas: `conIdeaFunnel` (40% del ancho)

```powerfx
Fill:        varBgCard
BorderColor: varBorder
BorderRadius: 12
PaddingTop:  20
PaddingLeft: 20
PaddingBottom: 20
PaddingRight: 20
LayoutDirection: LayoutDirection.Vertical
Gap: 16
Width: (Parent.Width - 16) * 0.4
```

```powerfx
// lblFunnelTitle
Text:  "Embudo de ideas"
Size:  14
FontWeight: FontWeight.Bold
Color: varStrong
```

**Galería `galIdeaFunnel`:**

```powerfx
Items: Table(
    {estado: "Nueva",       conteo: CountRows(Filter(colIdeas, status="Nueva")),       color: RGBA(100,181,246,1)},
    {estado: "En Revisión", conteo: CountRows(Filter(colIdeas, status="En Revisión")), color: RGBA(224,148,77,1)},
    {estado: "Aprobada",    conteo: CountRows(Filter(colIdeas, status="Aprobada")),    color: RGBA(104,161,107,1)},
    {estado: "Rechazada",   conteo: CountRows(Filter(colIdeas, status="Rechazada")),   color: RGBA(205,92,92,1)}
)

Layout:        Layout.Vertical
TemplateHeight: 48
ShowScrollbar:  false
```

Dentro del template:

```powerfx
// conFunnelRow (container horizontal)
LayoutDirection: LayoutDirection.Horizontal
AlignItems:      AlignItems.Center
Gap: 8

// lblFunnelLabel
Text:  ThisItem.estado
Color: varStrong
Size:  12.5
Width: 90

// lblFunnelCount (alineado a la derecha)
Text:  Text(ThisItem.conteo)
Color: ThisItem.color
Size:  13
FontWeight: FontWeight.Bold
Width: 24

// rectBgBar
Fill:        ColorValue("#2A2E35")
BorderRadius: 5
Height:      7
Width:       Parent.Width - 120

// rectFillBar
Fill:        ThisItem.color
BorderRadius: 5
Height:      7
Width: Max(4,
    If(Max(galIdeaFunnel.AllItems.conteo) = 0, 4,
        ThisItem.conteo / Max(galIdeaFunnel.AllItems.conteo) * (Parent.Width - 120)
    )
)
```

---

### Tabla Recientes: `conRecentTable`

```powerfx
Fill:        varBgCard
BorderColor: varBorder
BorderThickness: 1
BorderRadius: 12
PaddingTop:  20
PaddingLeft: 20
PaddingBottom: 20
PaddingRight: 20
LayoutDirection: LayoutDirection.Vertical
Gap: 0
```

```powerfx
// conRecentHeader (container horizontal)
LayoutDirection: LayoutDirection.Horizontal
AlignItems:      AlignItems.Center

// lblRecentTitle
Text:  "Iniciativas recientes"
Size:  14
FontWeight: FontWeight.Bold
Color: varStrong
Flexible: true

// btnVerTodas
Text:     "Ver todas →"
Fill:     Transparent()
Color:    varAccent
Size:     12.5
OnSelect: Navigate(scrInitiatives, ScreenTransition.None)

// rectTableDivider
Fill:   varBorder
Height: 1
Width:  Parent.Width

// conColHeaders (container horizontal)
PaddingTop: 10
PaddingBottom: 10

// Labels de columna (todos: Size 11, Color varMuted, FontWeight Semibold)
lblColCode.Text:   "CÓDIGO"     Width: 110
lblColName.Text:   "NOMBRE"     Flexible: true
lblColStatus.Text: "ESTADO"     Width: 110
lblColPrio.Text:   "PRIORIDAD"  Width: 90
lblColFTE.Text:    "FTE/MES"    Width: 70
```

**Galería `galRecentInits`:**

```powerfx
Items: FirstN(SortByColumns(colInitiatives, "ID", SortOrder.Descending), 5)

Layout:        Layout.Vertical
TemplateHeight: 52
ShowScrollbar:  false
OnSelect:      Set(varSelectedInitId, ThisItem.ID); Navigate(scrInitDetail, ScreenTransition.None)
```

Template de cada fila:

```powerfx
// rectRowHover — feedback visual en hover
Fill:        If(ThisItem.IsSelected, RGBA(73,156,255,0.07), RGBA(0,0,0,0))
BorderRadius: 8
Width:        Parent.Width
Height:       Parent.Height

// lblRCode
Text:  ThisItem.code
Size:  11.5
Color: varAccent
FontFamily: "Consolas, monospace"
Width: 110

// lblRName
Text:  ThisItem.name
Size:  13
Color: varStrong
FontWeight: FontWeight.Semibold
Flexible: true

// conRStatus (badge estado)
Fill:        Switch(ThisItem.status, "Idea",RGBA(138,147,162,.13), "Análisis",RGBA(224,148,77,.13), "En Desarrollo",RGBA(73,156,255,.13), "Listo",RGBA(104,161,107,.13), "Cancelada",RGBA(205,92,92,.13), RGBA(138,147,162,.13))
BorderColor: Switch(ThisItem.status, "Idea",RGBA(138,147,162,.5), "Análisis",RGBA(224,148,77,.5), "En Desarrollo",RGBA(73,156,255,.5), "Listo",RGBA(104,161,107,.5), "Cancelada",RGBA(205,92,92,.5), RGBA(138,147,162,.5))
BorderThickness: 1
BorderRadius: 6
PaddingLeft:  8
PaddingRight: 8
Width: 110
// lblRStatusText.Color = misma lógica Switch pero con .Color
// lblRStatusText.Text  = ThisItem.status

// conRPrio (badge prioridad)
// idéntica estructura a conRStatus con colores de prioridad
Width: 90

// lblRFTE
Text:  Text(ThisItem.estimated_fte_saved, "0.0")
Size:  13
Color: varStrong
FontWeight: FontWeight.Bold
Width: 70

// rectRowSep
Fill:   varBorder
Height: 1
Y:      51
Width:  Parent.Width
```

---

## PANTALLA 2: `scrIdeas`

```
scrIdeas
├── conHeader         (lblBreadcrumb.Text = "Ideas")
├── conNavRail        (btnNavIdeas activo)
└── conMainIdeas
    ├── lblIdeasTitle
    ├── lblIdeasSub
    ├── btnNewIdea
    ├── conIdeaToolbar
    │   ├── conSearchIdea (búsqueda)
    │   ├── galIdeaChips  (filtros)
    │   └── conIdeaTabs   (Tarjetas/Tabla/Kanban)
    ├── galIdeaCards   (Visible: varIdeaView = "cards")
    ├── conIdeaTable   (Visible: varIdeaView = "table")
    └── conIdeaKanban  (Visible: varIdeaView = "kanban")
```

### `conMainIdeas`

```powerfx
X: 84
Y: 58
Width:  Parent.Width - 84
Height: Parent.Height - 58
Fill:   varBgPrincipal
OverflowY: OverflowY.Auto
PaddingTop: 28
PaddingLeft: 28
PaddingRight: 28
PaddingBottom: 28
LayoutDirection: LayoutDirection.Vertical
Gap: 20
```

### Encabezado + Botón

```powerfx
lblIdeasTitle.Text:  "Ideas"
lblIdeasTitle.Size:  23
lblIdeasTitle.FontWeight: FontWeight.Bold
lblIdeasTitle.Color: varStrong

lblIdeasSub.Text:  "Captura, revisión y aprobación de propuestas antes de volverse iniciativas."
lblIdeasSub.Size:  13
lblIdeasSub.Color: varMuted

btnNewIdea.Text:      "+ Nueva idea"
btnNewIdea.Fill:      varAccent
btnNewIdea.Color:     varStrong
btnNewIdea.BorderRadius: 8
btnNewIdea.Height:    36
btnNewIdea.OnSelect:  Set(varIsEditing, false); Navigate(scrIdeaForm, ScreenTransition.None)
```

### `conIdeaToolbar`

```powerfx
LayoutDirection: LayoutDirection.Horizontal
AlignItems:      AlignItems.Center
Gap: 12
```

#### Buscador `conSearchIdea`

```powerfx
Fill:        varBgCard
BorderColor: varBorder
BorderThickness: 1
BorderRadius: 8
Height: 36
Width:  240
PaddingLeft: 10
PaddingRight: 10
LayoutDirection: LayoutDirection.Horizontal
AlignItems: AlignItems.Center
Gap: 6

// icoSearch
Icon:  Icon.Search
Color: varMuted
Width: 16
Height: 16

// txtIdeaSearch
Default:     varIdeaSearch
Placeholder: "Buscar idea..."
Fill:        Transparent()
BorderColor: Transparent()
Color:       varStrong
Size:        13
OnChange:    Set(varIdeaSearch, Self.Text)
```

#### Chips de filtro `galIdeaChips`

```powerfx
Items: Table(
    {label: "Todas",       count: CountRows(colIdeas)},
    {label: "Nueva",       count: CountRows(Filter(colIdeas, status="Nueva"))},
    {label: "En Revisión", count: CountRows(Filter(colIdeas, status="En Revisión"))},
    {label: "Aprobada",    count: CountRows(Filter(colIdeas, status="Aprobada"))},
    {label: "Rechazada",   count: CountRows(Filter(colIdeas, status="Rechazada"))}
)

Layout:        Layout.Horizontal
TemplateWidth: 105
TemplateHeight: 36
ShowScrollbar:  false
```

Template del chip:

```powerfx
// btnChip
Text:  ThisItem.label & " " & Text(ThisItem.count)
Fill:  If(varIdeaFilter = ThisItem.label,
           Switch(ThisItem.label,
               "Nueva",       RGBA(100,181,246,.15),
               "En Revisión", RGBA(224,148,77,.15),
               "Aprobada",    RGBA(104,161,107,.15),
               "Rechazada",   RGBA(205,92,92,.15),
               RGBA(73,156,255,.15)
           ),
           varBgCard
       )
Color: If(varIdeaFilter = ThisItem.label,
          Switch(ThisItem.label,
              "Nueva",       ColorValue("#64B5F6"),
              "En Revisión", ColorValue("#E0944D"),
              "Aprobada",    ColorValue("#68A16B"),
              "Rechazada",   ColorValue("#CD5C5C"),
              varAccent
          ),
          varMuted
      )
BorderColor: If(varIdeaFilter = ThisItem.label,
                Switch(ThisItem.label,
                    "Nueva",       RGBA(100,181,246,.5),
                    "En Revisión", RGBA(224,148,77,.5),
                    "Aprobada",    RGBA(104,161,107,.5),
                    "Rechazada",   RGBA(205,92,92,.5),
                    RGBA(73,156,255,.5)
                ),
                varBorder
            )
BorderThickness: 1
BorderRadius: 8
Size: 12
OnSelect: Set(varIdeaFilter, ThisItem.label)
```

#### Tabs de vista

```powerfx
// conIdeaTabs (container horizontal, gap 4)

// btnViewCards
Text:        "Tarjetas"
Fill:        If(varIdeaView = "cards", RGBA(73,156,255,.15), Transparent())
Color:       If(varIdeaView = "cards", varAccent, varMuted)
BorderColor: If(varIdeaView = "cards", RGBA(73,156,255,.5), varBorder)
BorderThickness: 1
BorderRadius: 8
Height: 34
OnSelect: Set(varIdeaView, "cards")

// btnViewTable
Text:    "Tabla"
// misma lógica con varIdeaView = "table"
OnSelect: Set(varIdeaView, "table")

// btnViewKanban
Text:    "Kanban"
// misma lógica con varIdeaView = "kanban"
OnSelect: Set(varIdeaView, "kanban")
```

### Fórmula de filtrado (reutilizable)

Define en `App.OnStart` o usa directamente en `Items` de cada galería:

```powerfx
// Variable con resultado del filtro (puede definirse en OnChange del buscador y OnSelect de chips)
Set(varFilteredIdeas,
    If(IsBlank(varIdeaSearch) || varIdeaSearch = "",
        If(varIdeaFilter = "Todas", colIdeas, Filter(colIdeas, status = varIdeaFilter)),
        Search(
            If(varIdeaFilter = "Todas", colIdeas, Filter(colIdeas, status = varIdeaFilter)),
            varIdeaSearch,
            "title", "current_problem"
        )
    )
)
```

---

### Vista Tarjetas: `galIdeaCards`

```powerfx
Visible:       varIdeaView = "cards"
Items:         varFilteredIdeas
WrapCount:     3   // ajustar según tamaño de pantalla
Layout:        Layout.Vertical  // (usar galería con WrapCount para grid)
TemplateWidth: (Parent.Width - 48) / 3
TemplateHeight: 200
ShowScrollbar:  false
OnSelect:      Set(varSelectedIdeaId, ThisItem.ID); Navigate(scrIdeaDetail, ScreenTransition.None)
```

Template de tarjeta:

```powerfx
// conIdeaCard
Fill:        varBgCard
BorderColor: varBorder
BorderThickness: 1
BorderRadius: 12
PaddingTop:  14
PaddingLeft: 16
PaddingBottom: 14
PaddingRight: 16
LayoutDirection: LayoutDirection.Vertical
Gap: 8

// conCardTop (horizontal — badge + fecha)
// lblCardBadge
Text:  ThisItem.status
Size:  11
FontWeight: FontWeight.Semibold
Color: Switch(ThisItem.status, "Nueva",ColorValue("#64B5F6"), "En Revisión",ColorValue("#E0944D"), "Aprobada",ColorValue("#68A16B"), "Rechazada",ColorValue("#CD5C5C"), varMuted)
Fill: Switch(ThisItem.status, "Nueva",RGBA(100,181,246,.13), "En Revisión",RGBA(224,148,77,.13), "Aprobada",RGBA(104,161,107,.13), "Rechazada",RGBA(205,92,92,.13), RGBA(138,147,162,.13))
BorderColor: Switch(ThisItem.status, "Nueva",RGBA(100,181,246,.5), "En Revisión",RGBA(224,148,77,.5), "Aprobada",RGBA(104,161,107,.5), "Rechazada",RGBA(205,92,92,.5), RGBA(138,147,162,.5))
BorderThickness: 1
BorderRadius: 6
PaddingLeft: 8
PaddingRight: 8
Height: 22

// lblCardDate
Text:  If(IsBlank(ThisItem.review_meeting_date), Text(Now(), "dd/mm/yyyy"), Text(ThisItem.review_meeting_date, "dd/mm/yyyy"))
Size:  10.5
Color: varMuted

// lblCardTitle
Text:  ThisItem.title
Size:  15
Color: varStrong
FontWeight: FontWeight.Bold

// lblCardProblem
Text:  Left(ThisItem.current_problem, 90) & If(Len(ThisItem.current_problem) > 90, "...", "")
Size:  12.5
Color: varMuted

// rectCardSep
Fill:   varBorder
Height: 1
Width:  Parent.Width

// conCardAuthor (horizontal)
// conAuthorAvatar (26px circle)
Fill:   ColorValue("#3E4451")
BorderRadius: 13
Width: 26
Height: 26
// lblAuthorInitials.Text:
With({autor: LookUp(colUsers, ID = LookUp(colUserIdea, idea_id = ThisItem.ID && idea_role = "Autor Principal").user_id)},
    If(IsBlank(autor), "?",
        Upper(Left(autor.name, 1) & If(!IsBlank(Find(" ", autor.name)), Mid(autor.name, Find(" ", autor.name)+1,1), ""))
    )
)

// lblAuthorName.Text:
LookUp(colUsers, ID = LookUp(colUserIdea, idea_id = ThisItem.ID && idea_role = "Autor Principal").user_id).name
Color: varMuted
Size: 11.5
```

---

### Vista Tabla: `conIdeaTable`

```powerfx
Visible: varIdeaView = "table"
Fill:    varBgCard
BorderColor: varBorder
BorderThickness: 1
BorderRadius: 12
PaddingTop: 0
PaddingBottom: 16
LayoutDirection: LayoutDirection.Vertical
```

```powerfx
// conTableColHeaders (horizontal, gap 8, PaddingTop 12, PaddingBottom 12, PaddingLeft 16, PaddingRight 16)
lblTColIdea.Text:   "IDEA"       Width: Flexible  Color: varMuted  Size: 11  FontWeight: FontWeight.Semibold
lblTColStatus.Text: "ESTADO"     Width: 120       Color: varMuted  Size: 11
lblTColAuthor.Text: "AUTOR"      Width: 150       Color: varMuted  Size: 11
lblTColDate.Text:   "CREADA"     Width: 100       Color: varMuted  Size: 11
```

```powerfx
// galIdeaTable
Items:         varFilteredIdeas
Layout:        Layout.Vertical
TemplateHeight: 50
ShowScrollbar:  false

// Template:
// rectRowSep: Fill varBorder, Height 1, Y 49
// lblRowTitle: ThisItem.title — Size 13, FontWeight Bold, Color varStrong, Flexible
// conRowStatus: badge igual que en tarjetas — Width 120
// lblRowAuthor: LookUp(...).name — Size 12.5, Color varMuted, Width 150
// lblRowDate: Text(ThisItem.Created, "dd/mm/yyyy") — Size 12.5, Color varMuted, Width 100
OnSelect: Set(varSelectedIdeaId, ThisItem.ID); Navigate(scrIdeaDetail, ScreenTransition.None)
```

---

### Vista Kanban: `conIdeaKanban`

```powerfx
Visible:         varIdeaView = "kanban"
LayoutDirection: LayoutDirection.Horizontal
Gap: 12
```

Genera **4 contenedores** side-by-side (uno por estado):

```powerfx
// Patrón para cada columna Kanban (ejemplo: conKanNueva)
Fill:        varBgCard
BorderColor: varBorder
BorderThickness: 1
BorderRadius: 12
PaddingTop:  14
PaddingLeft: 14
PaddingRight: 14
PaddingBottom: 14
LayoutDirection: LayoutDirection.Vertical
Gap: 10
Flexible: true  // 4 columnas iguales

// conKanHeader (horizontal, AlignItems Center, Gap 8)
// rectKanDot (8px circle, Fill: color del estado)
// lblKanStatus.Text:  "Nueva"  Color: varStrong  Size: 13  FontWeight: Bold  Flexible: true
// conKanCount (badge con conteo)
//   Fill: RGBA del color con .15 opacidad
//   lblKanCount.Text: Text(CountRows(Filter(varFilteredIdeas, status = "Nueva")))

// galKanNueva
Items:         Filter(varFilteredIdeas, status = "Nueva")
Layout:        Layout.Vertical
TemplateHeight: 80
ShowScrollbar:  false
OnSelect:      Set(varSelectedIdeaId, ThisItem.ID); Navigate(scrIdeaDetail, ScreenTransition.None)

// Template: mini-tarjeta
// lblKanTitle: ThisItem.title — Size 12.5, Bold, varStrong, overflow ellipsis
// lblKanAuthor: LookUp(...).name — Size 11, varMuted

// Mensaje si vacía:
// lblKanEmpty.Text:  "Sin ideas en este estado"
// Visible: CountRows(Filter(varFilteredIdeas, status = "Nueva")) = 0
// Color: varMuted  Size: 12  Italic: true
```

| Galería | Filter |
|---------|--------|
| `galKanNueva` | `status = "Nueva"` |
| `galKanRevision` | `status = "En Revisión"` |
| `galKanAprobada` | `status = "Aprobada"` |
| `galKanRechazada` | `status = "Rechazada"` |

---

## PANTALLA 3: `scrIdeaDetail`

```
scrIdeaDetail
├── conHeader        (lblBreadcrumb.Text = "Ideas › Detalle")
├── conNavRail       (btnNavIdeas activo)
└── conMainIdeaDet
    ├── btnBackIdeas
    ├── conIdeaDetHeader
    ├── conProbSolGrid
    ├── conPeopleReview
    ├── conLinkedInits  (Visible si tiene)
    └── conIdeaActions
```

### `conMainIdeaDet`

```powerfx
X: 84  Y: 58
Width:  Parent.Width - 84
Height: Parent.Height - 58
Fill:   varBgPrincipal
OverflowY: OverflowY.Auto
PaddingTop: 28
PaddingLeft: 28
PaddingRight: 28
PaddingBottom: 28
LayoutDirection: LayoutDirection.Vertical
Gap: 20
```

```powerfx
// btnBackIdeas
Text:     "← Volver a Ideas"
Fill:     Transparent()
Color:    varMuted
Size:     13
OnSelect: Navigate(scrIdeas, ScreenTransition.None)
```

### `conIdeaDetHeader`

```powerfx
LayoutDirection: LayoutDirection.Horizontal
AlignItems:      AlignItems.Center
Gap: 14

// conIdeaStatusBadge
// Igual que badge de estado de tarjeta pero más grande
Text:  LookUp(colIdeas, ID = varSelectedIdeaId).status
Color: Switch(LookUp(colIdeas, ID=varSelectedIdeaId).status, "Nueva",ColorValue("#64B5F6"), "En Revisión",ColorValue("#E0944D"), "Aprobada",ColorValue("#68A16B"), "Rechazada",ColorValue("#CD5C5C"), varMuted)
Fill:  Switch(LookUp(colIdeas, ID=varSelectedIdeaId).status, "Nueva",RGBA(100,181,246,.13), "En Revisión",RGBA(224,148,77,.13), "Aprobada",RGBA(104,161,107,.13), "Rechazada",RGBA(205,92,92,.13), RGBA(138,147,162,.13))
BorderColor: Switch(LookUp(colIdeas, ID=varSelectedIdeaId).status, "Nueva",RGBA(100,181,246,.5), "En Revisión",RGBA(224,148,77,.5), "Aprobada",RGBA(104,161,107,.5), "Rechazada",RGBA(205,92,92,.5), RGBA(138,147,162,.5))
BorderThickness: 1
BorderRadius: 7
PaddingLeft: 10
PaddingRight: 10
Height: 26
Size: 12
FontWeight: FontWeight.Semibold

// lblIdeaDetTitle
Text:       LookUp(colIdeas, ID = varSelectedIdeaId).title
Size:       24
FontWeight: FontWeight.Bold
Color:      varStrong
Flexible:   true

// btnEditIdea
Text:     "Editar"
Fill:     Transparent()
Color:    varAccent
BorderColor: varAccent
BorderThickness: 1
BorderRadius: 8
Height:   34
PaddingLeft: 14
PaddingRight: 14
OnSelect: Set(varIsEditing, true); Navigate(scrIdeaForm, ScreenTransition.None)
```

```powerfx
// lblIdeaDetMeta
Text:  "Idea #" & varSelectedIdeaId & " · Creada el " &
       Text(LookUp(colIdeas, ID = varSelectedIdeaId).review_meeting_date, "dd/mm/yyyy")
Color: varMuted
Size:  12.5
```

### `conProbSolGrid` (grid 2 columnas)

```powerfx
LayoutDirection: LayoutDirection.Horizontal
Gap: 16

// conProblem (izquierda)
Fill:        varBgCard
BorderColor: varBorder
BorderThickness: 1
BorderRadius: 12
PaddingTop:  18
PaddingLeft: 20
PaddingBottom: 18
PaddingRight: 20
LayoutDirection: LayoutDirection.Vertical
Gap: 10
Flexible: true

// conProbHeader (horizontal, AlignItems Center, Gap 8)
// rectProbDot: Width 8, Height 8, Fill varError, BorderRadius 4
// lblProbLabel.Text: "EL PROBLEMA HOY"  Color: varError  Size: 11  FontWeight: Semibold  Uppercase via text transform

// lblProbText
Text:  LookUp(colIdeas, ID = varSelectedIdeaId).current_problem
Color: varText
Size:  13.5

// conSolution (derecha — misma estructura)
// rectSolDot: Fill varSuccess
// lblSolLabel.Text: "SOLUCIÓN PROPUESTA"  Color: varSuccess
// lblSolText: LookUp(...).proposed_solution
```

### `conPeopleReview`

```powerfx
Fill:        varBgCard
BorderColor: varBorder
BorderRadius: 12
PaddingTop:  18
PaddingLeft: 20
PaddingBottom: 18
PaddingRight: 20
LayoutDirection: LayoutDirection.Horizontal
Gap: 24

// === Columna izquierda: Personas ===
// lblPeopleTitle.Text: "Personas involucradas"  Bold, varStrong, 13px

// galIdeaPeople
Items: Filter(colUserIdea, idea_id = varSelectedIdeaId)
Layout: Layout.Vertical
TemplateHeight: 42
ShowScrollbar: false

// Template:
// conPersonRow (horizontal, AlignItems Center, Gap 10)
// conPersonAvatar (30px circle, Fill #3E4451, BorderRadius 15)
//   lblPersonInitials: Upper(Left(nom,1) & Mid(nom,Find(" ",nom)+1,1))
//   nom = LookUp(colUsers, ID=ThisItem.user_id).name
// conPersonInfo (vertical)
//   lblPersonName: LookUp(colUsers, ID=ThisItem.user_id).name — Size 13, Bold, varStrong
//   lblPersonRole: ThisItem.idea_role — Size 11, varMuted

// === Columna derecha: Revisión ===
// rectDivider (1px vertical)
// lblRevTitle.Text: "Sesión de revisión"  Bold, varStrong, 13px
// lblRevDate.Text:
If(IsBlank(LookUp(colIdeas, ID=varSelectedIdeaId).review_meeting_date),
    "No programada",
    Text(LookUp(colIdeas, ID=varSelectedIdeaId).review_meeting_date, "dd/mm/yyyy")
)
Color: varMuted
// lblRevNotesTitle.Text: "Notas del revisor"  Bold varStrong 12px  (margin top 12)
// lblRevNotes.Text:
If(IsBlank(LookUp(colIdeas, ID=varSelectedIdeaId).review_notes) || LookUp(colIdeas, ID=varSelectedIdeaId).review_notes = "",
    "Sin notas todavía.",
    LookUp(colIdeas, ID=varSelectedIdeaId).review_notes
)
Color: varText  Size: 13
```

### `conLinkedInits` (Visible si hay iniciativas generadas)

```powerfx
Visible: CountRows(Filter(colIdeaInitiative, idea_id = varSelectedIdeaId)) > 0

Fill:        varBgCard
BorderColor: RGBA(73,156,255,.4)
BorderThickness: 1
BorderRadius: 12
PaddingTop:  16
PaddingLeft: 20
PaddingBottom: 16
PaddingRight: 20
LayoutDirection: LayoutDirection.Vertical
Gap: 12

// lblLinkedTitle.Text: "⚡ Iniciativas generadas desde esta idea"  Color: varAccent  Bold

// galLinkedInits
Items: Filter(colIdeaInitiative, idea_id = varSelectedIdeaId)
Layout: Layout.Vertical
TemplateHeight: 36
ShowScrollbar: false

// Template:
// btnLinkedInit
Text: With({init: LookUp(colInitiatives, ID=ThisItem.initiative_id)},
          init.code & " · " & init.name)
Fill:        RGBA(73,156,255,.1)
Color:       varAccent
BorderColor: RGBA(73,156,255,.4)
BorderRadius: 8
OnSelect:    Set(varSelectedInitId, ThisItem.initiative_id); Navigate(scrInitDetail, ScreenTransition.None)
```

### `conIdeaActions` (barra de acciones)

```powerfx
Fill:        varBgCard2
BorderColor: varBorder
BorderThickness: 1
BorderRadius: 12
PaddingTop:  16
PaddingLeft: 20
PaddingBottom: 16
PaddingRight: 20
LayoutDirection: LayoutDirection.Horizontal
Gap: 10
AlignItems:  AlignItems.Center
```

Cada botón tiene `Visible` condicional:

```powerfx
// btnSendReview — Enviar a revisión (solo cuando status = "Nueva")
Visible:  LookUp(colIdeas, ID = varSelectedIdeaId).status = "Nueva"
Text:     "Enviar a revisión"
Fill:     varAccent
Color:    varStrong
BorderRadius: 8
Height:   36
OnSelect:
    Patch(colIdeas, LookUp(colIdeas, ID = varSelectedIdeaId), {status: "En Revisión"});
    Notify("Estado actualizado a En Revisión", NotificationType.Success)

// btnApprove — solo cuando status = "En Revisión"
Visible:  LookUp(colIdeas, ID = varSelectedIdeaId).status = "En Revisión"
Text:     "✓ Aprobar"
Fill:     varSuccess
Color:    varStrong
BorderRadius: 8
OnSelect:
    Patch(colIdeas, LookUp(colIdeas, ID = varSelectedIdeaId), {status: "Aprobada"});
    Notify("¡Idea aprobada! ✓", NotificationType.Success)

// btnReject — solo cuando status = "En Revisión"
Visible:  LookUp(colIdeas, ID = varSelectedIdeaId).status = "En Revisión"
Text:     "Rechazar"
Fill:     Transparent()
Color:    varError
BorderColor: varError
BorderThickness: 1
BorderRadius: 8
OnSelect:
    Patch(colIdeas, LookUp(colIdeas, ID = varSelectedIdeaId), {status: "Rechazada"});
    Notify("Idea rechazada")

// btnConvert — solo cuando status = "Aprobada"
Visible:  LookUp(colIdeas, ID = varSelectedIdeaId).status = "Aprobada"
Text:     "⚡ Convertir en iniciativa"
Fill:     varAccent
Color:    varStrong
BorderRadius: 8
OnSelect:
    Set(varFromIdeaId, varSelectedIdeaId);
    Set(varIsEditing, false);
    Navigate(scrInitForm, ScreenTransition.None)

// btnReopen — solo cuando status = "Rechazada"
Visible:  LookUp(colIdeas, ID = varSelectedIdeaId).status = "Rechazada"
Text:     "Reabrir idea"
Fill:     Transparent()
Color:    varMuted
BorderColor: varBorder
BorderThickness: 1
BorderRadius: 8
OnSelect:
    Patch(colIdeas, LookUp(colIdeas, ID = varSelectedIdeaId), {status: "Nueva"});
    Notify("Idea reabierta")
```

---

## PANTALLA 4: `scrIdeaForm`

```
scrIdeaForm
├── conHeader   (lblBreadcrumb dinámico)
├── conNavRail  (btnNavIdeas activo)
└── conMainIdeaForm
    ├── btnCancelIdea
    ├── lblIdeaFormTitle
    ├── lblIdeaFormSub
    └── conFormFields
        ├── txtIdeaTitle
        ├── txtIdeaProblem
        ├── txtIdeaSolution
        ├── drpIdeaAuthor
        ├── drpIdeaStatus
        ├── dpIdeaMeeting
        ├── txtIdeaNotes
        └── conFormButtons
```

### `conMainIdeaForm`

```powerfx
X: 84  Y: 58
Width:  Min(Parent.Width - 84, 740)  // Formulario centrado con ancho máximo
X:      84 + ((Parent.Width - 84 - Self.Width) / 2)  // centrado horizontal
Height: Parent.Height - 58
OverflowY: OverflowY.Auto
PaddingTop: 36
PaddingLeft: 40
PaddingRight: 40
PaddingBottom: 40
LayoutDirection: LayoutDirection.Vertical
Gap: 8
```

```powerfx
// btnCancelIdea
Text:     "← Cancelar"
Fill:     Transparent()
Color:    varMuted
Size:     13
OnSelect: If(varIsEditing, Navigate(scrIdeaDetail, ScreenTransition.None), Navigate(scrIdeas, ScreenTransition.None))

// lblIdeaFormTitle
Text:       If(varIsEditing, "Editar idea", "Nueva idea")
Size:       23
FontWeight: FontWeight.Bold
Color:      varStrong

// lblIdeaFormSub
Text:  "Los campos se guardan en la lista Ideas de SharePoint."
Color: varMuted
Size:  13
```

### Estilos reutilizables de campos

```powerfx
// LABEL de campo:
Size:       11.5
Color:      varText
FontWeight: FontWeight.Semibold
// (Para campos especiales: lblIdeaProblemLbl.Color = varError, lblIdeaSolutionLbl.Color = varSuccess)

// INPUT de campo:
Fill:             varBgCard
BorderColor:      varBorder
BorderThickness:  1
Color:            varStrong
Size:             13.5
BorderRadius:     8
FocusedBorderColor: varAccent
FocusedBorderThickness: 2
PaddingLeft:      12
PaddingRight:     12
PaddingTop:       10
PaddingBottom:    10
```

### Campos del formulario

```powerfx
// 1. TÍTULO
// lblIdeaTitleLbl.Text: "TÍTULO DE LA IDEA"
// txtIdeaTitle
Mode:    TextMode.SingleLine
Default: If(varIsEditing, LookUp(colIdeas, ID=varSelectedIdeaId).title, "")
HintText: "Título corto y claro"

// 2. PROBLEMA HOY
// lblIdeaProblemLbl.Text: "EL PROBLEMA HOY"  Color: varError
// txtIdeaProblem
Mode:    TextMode.MultiLine
Height:  110
Default: If(varIsEditing, LookUp(colIdeas, ID=varSelectedIdeaId).current_problem, "")
HintText: "¿Qué duele hoy? (formato libre)"

// 3. SOLUCIÓN PROPUESTA
// lblIdeaSolutionLbl.Text: "SOLUCIÓN PROPUESTA"  Color: varSuccess
// txtIdeaSolution
Mode:    TextMode.MultiLine
Height:  110
Default: If(varIsEditing, LookUp(colIdeas, ID=varSelectedIdeaId).proposed_solution, "")
HintText: "¿Cómo se imaginan resuelto?"

// 4. AUTOR PRINCIPAL
// lblIdeaAuthorLbl.Text: "AUTOR PRINCIPAL"
// drpIdeaAuthor
Items:  colUsers
Value:  "name"
Default: If(varIsEditing,
            LookUp(colUsers, ID = LookUp(colUserIdea, idea_id=varSelectedIdeaId && idea_role="Autor Principal").user_id),
            First(colUsers))
ChevronFill: varMuted
SelectionColor: RGBA(73,156,255,.15)
HoverFill:    RGBA(73,156,255,.08)
Fill:         varBgCard
BorderColor:  varBorder
Color:        varStrong

// 5. ESTADO
// lblIdeaStatusLbl.Text: "ESTADO"
// drpIdeaStatus
Items:   ["Nueva", "En Revisión", "Aprobada", "Rechazada"]
Default: If(varIsEditing, LookUp(colIdeas, ID=varSelectedIdeaId).status, "Nueva")

// 6. FECHA DE REVISIÓN
// lblIdeaMeetingLbl.Text: "FECHA DE REVISIÓN"
// dpIdeaMeeting
Default:        If(varIsEditing, LookUp(colIdeas, ID=varSelectedIdeaId).review_meeting_date, Blank())
DateTimeFormat: DateTimeFormat.ShortDate

// 7. NOTAS DEL REVISOR
// lblIdeaNotesLbl.Text: "NOTAS DEL REVISOR"
// txtIdeaNotes
Mode:    TextMode.MultiLine
Height:  80
Default: If(varIsEditing, LookUp(colIdeas, ID=varSelectedIdeaId).review_notes, "")
HintText: "Conclusiones de la sesión"
```

### `conFormButtons`

```powerfx
LayoutDirection: LayoutDirection.Horizontal
Gap: 10
JustifyContent: LayoutJustify.End
PaddingTop: 16

// btnCancelIdea2
Text:         "Cancelar"
Fill:         Transparent()
Color:        varMuted
BorderColor:  varBorder
BorderThickness: 1
BorderRadius: 8
Height:       38
PaddingLeft:  18
PaddingRight: 18
OnSelect:     If(varIsEditing, Navigate(scrIdeaDetail, ScreenTransition.None), Navigate(scrIdeas, ScreenTransition.None))

// btnSaveIdea
Text:         If(varIsEditing, "Guardar cambios", "Crear idea")
Fill:         varAccent
Color:        varStrong
BorderRadius: 8
Height:       38
PaddingLeft:  20
PaddingRight: 20
OnSelect:
    If(IsBlank(txtIdeaTitle.Text) || txtIdeaTitle.Text = "",
        Notify("Falta el título de la idea", NotificationType.Error),
        If(varIsEditing,
            Patch(colIdeas, LookUp(colIdeas, ID = varSelectedIdeaId),
                {
                    title:                txtIdeaTitle.Text,
                    current_problem:      txtIdeaProblem.Text,
                    proposed_solution:    txtIdeaSolution.Text,
                    status:               drpIdeaStatus.Selected.Value,
                    review_meeting_date:  dpIdeaMeeting.SelectedDate,
                    review_notes:         txtIdeaNotes.Text
                }
            );
            Remove(colUserIdea, LookUp(colUserIdea, idea_id = varSelectedIdeaId && idea_role = "Autor Principal"));
            Collect(colUserIdea, {
                ID:        Max(colUserIdea, ID) + 1,
                user_id:   drpIdeaAuthor.Selected.ID,
                idea_id:   varSelectedIdeaId,
                idea_role: "Autor Principal"
            });
            Navigate(scrIdeaDetail, ScreenTransition.None);
            Notify("Idea guardada ✓", NotificationType.Success),
            // ─── CREAR NUEVA ───────────────────────────────
            Set(varNewIdeaId, Max(colIdeas, ID) + 1);
            Collect(colIdeas, {
                ID:                  varNewIdeaId,
                title:               txtIdeaTitle.Text,
                current_problem:     txtIdeaProblem.Text,
                proposed_solution:   txtIdeaSolution.Text,
                status:              drpIdeaStatus.Selected.Value,
                review_meeting_date: dpIdeaMeeting.SelectedDate,
                review_notes:        txtIdeaNotes.Text
            });
            Collect(colUserIdea, {
                ID:        Max(colUserIdea, ID) + 1,
                user_id:   drpIdeaAuthor.Selected.ID,
                idea_id:   varNewIdeaId,
                idea_role: "Autor Principal"
            });
            Set(varSelectedIdeaId, varNewIdeaId);
            Navigate(scrIdeaDetail, ScreenTransition.None);
            Notify("Idea creada en SharePoint ✓", NotificationType.Success)
        )
    )
```
