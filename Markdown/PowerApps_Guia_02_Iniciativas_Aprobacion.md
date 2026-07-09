# Parte 2: Iniciativas + Aprobación — PowerFx Completo

> **IdeaHub IA** — Pantallas: `scrInitiatives`, `scrInitDetail`, `scrInitForm`, `scrApproval`

---

## PANTALLA 5: `scrInitiatives`

```
scrInitiatives
├── conHeader         (lblBreadcrumb.Text = "Iniciativas")
├── conNavRail        (btnNavInit activo)
└── conMainInits
    ├── lblInitTitle
    ├── lblInitSub
    ├── btnNewInit
    ├── conInitToolbar
    │   ├── conSearchInit
    │   ├── galInitChips
    │   └── conInitTabs
    ├── galInitCards   (Visible: varInitView = "cards")
    ├── conInitTable   (Visible: varInitView = "table")
    └── conInitKanban  (Visible: varInitView = "kanban")
```

### `conMainInits`

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

### Encabezado + Botón

```powerfx
lblInitTitle.Text:  "Iniciativas"
lblInitTitle.Size:  23
lblInitTitle.FontWeight: FontWeight.Bold
lblInitTitle.Color: varStrong

lblInitSub.Text:  "Casos de automatización con IA formalizados, con impacto y complejidad."
lblInitSub.Size:  13
lblInitSub.Color: varMuted

btnNewInit.Text:      "+ Nueva iniciativa"
btnNewInit.Fill:      varAccent
btnNewInit.Color:     varStrong
btnNewInit.BorderRadius: 8
btnNewInit.Height:    36
btnNewInit.OnSelect:  Set(varIsEditing, false); Set(varFromIdeaId, Blank()); Navigate(scrInitForm, ScreenTransition.None)
```

### `conInitToolbar`

```powerfx
LayoutDirection: LayoutDirection.Horizontal
AlignItems:      AlignItems.Center
Gap: 12
```

#### Buscador `conSearchInit`

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

// icoSearchInit
Icon:  Icon.Search
Color: varMuted

// txtInitSearch
Default:     varInitSearch
Placeholder: "Buscar por nombre o código..."
Fill:        Transparent()
BorderColor: Transparent()
Color:       varStrong
Size:        13
OnChange:    Set(varInitSearch, Self.Text)
```

#### Chips de filtro `galInitChips`

```powerfx
Items: Table(
    {label: "Todas",        count: CountRows(colInitiatives)},
    {label: "Idea",         count: CountRows(Filter(colInitiatives, status="Idea"))},
    {label: "Análisis",     count: CountRows(Filter(colInitiatives, status="Análisis"))},
    {label: "En Desarrollo",count: CountRows(Filter(colInitiatives, status="En Desarrollo"))},
    {label: "Listo",        count: CountRows(Filter(colInitiatives, status="Listo"))},
    {label: "Cancelada",    count: CountRows(Filter(colInitiatives, status="Cancelada"))}
)

Layout:        Layout.Horizontal
TemplateWidth: 110
TemplateHeight: 36
ShowScrollbar:  false
```

Template del chip:

```powerfx
// btnInitChip
Text:  ThisItem.label & " " & Text(ThisItem.count)
Size:  12
Fill:  If(varInitFilter = ThisItem.label,
           Switch(ThisItem.label,
               "Idea",         RGBA(138,147,162,.15),
               "Análisis",     RGBA(224,148,77,.15),
               "En Desarrollo",RGBA(73,156,255,.15),
               "Listo",        RGBA(104,161,107,.15),
               "Cancelada",    RGBA(205,92,92,.15),
               RGBA(73,156,255,.15)
           ),
           varBgCard
       )
Color: If(varInitFilter = ThisItem.label,
          Switch(ThisItem.label,
              "Idea",         ColorValue("#8A93A2"),
              "Análisis",     ColorValue("#E0944D"),
              "En Desarrollo",ColorValue("#499CFF"),
              "Listo",        ColorValue("#68A16B"),
              "Cancelada",    ColorValue("#CD5C5C"),
              varAccent
          ),
          varMuted
      )
BorderColor: If(varInitFilter = ThisItem.label,
                Switch(ThisItem.label,
                    "Idea",         RGBA(138,147,162,.5),
                    "Análisis",     RGBA(224,148,77,.5),
                    "En Desarrollo",RGBA(73,156,255,.5),
                    "Listo",        RGBA(104,161,107,.5),
                    "Cancelada",    RGBA(205,92,92,.5),
                    RGBA(73,156,255,.5)
                ),
                varBorder
            )
BorderThickness: 1
BorderRadius:    8
OnSelect: Set(varInitFilter, ThisItem.label)
```

#### Tabs de vista

```powerfx
// conInitTabs (horizontal, gap 4)
// btnInitViewCards:  Set(varInitView, "cards")
// btnInitViewTable:  Set(varInitView, "table")
// btnInitViewKanban: Set(varInitView, "kanban")
// Mismo estilo que tabs de Ideas (ver Guia_01)
```

### Fórmula de filtrado de iniciativas

```powerfx
// Definir en OnChange y OnSelect correspondientes:
Set(varFilteredInits,
    If(IsBlank(varInitSearch) || varInitSearch = "",
        If(varInitFilter = "Todas", colInitiatives, Filter(colInitiatives, status = varInitFilter)),
        Search(
            If(varInitFilter = "Todas", colInitiatives, Filter(colInitiatives, status = varInitFilter)),
            varInitSearch,
            "name", "code", "description"
        )
    )
)
```

---

### Vista Tarjetas: `galInitCards`

```powerfx
Visible:       varInitView = "cards"
Items:         varFilteredInits
WrapCount:     3
TemplateWidth: (Parent.Width - 48) / 3
TemplateHeight: 230
ShowScrollbar:  false
OnSelect:      Set(varSelectedInitId, ThisItem.ID); Navigate(scrInitDetail, ScreenTransition.None)
```

Template de tarjeta de iniciativa:

```powerfx
// conInitCard
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

// conInitCardTop (horizontal, AlignItems Center, Gap 8)
// conCodeBadge (código monospace)
Text:  ThisItem.code
Color: varAccent
Fill:  RGBA(73,156,255,.12)
BorderColor: RGBA(73,156,255,.4)
BorderThickness: 1
BorderRadius: 6
PaddingLeft: 8
PaddingRight: 8
Height: 22
Size: 11
FontFamily: "Consolas, monospace"
FontWeight: FontWeight.Bold

// conStatusBadge (estado)
// mismo patrón que ideas, con colores de iniciativas
Text:  ThisItem.status
Color: Switch(ThisItem.status, "Idea",ColorValue("#8A93A2"), "Análisis",ColorValue("#E0944D"), "En Desarrollo",ColorValue("#499CFF"), "Listo",ColorValue("#68A16B"), "Cancelada",ColorValue("#CD5C5C"), varMuted)
Fill:  Switch(ThisItem.status, "Idea",RGBA(138,147,162,.13), "Análisis",RGBA(224,148,77,.13), "En Desarrollo",RGBA(73,156,255,.13), "Listo",RGBA(104,161,107,.13), "Cancelada",RGBA(205,92,92,.13), RGBA(138,147,162,.13))
BorderColor: Switch(ThisItem.status, "Idea",RGBA(138,147,162,.5), "Análisis",RGBA(224,148,77,.5), "En Desarrollo",RGBA(73,156,255,.5), "Listo",RGBA(104,161,107,.5), "Cancelada",RGBA(205,92,92,.5), RGBA(138,147,162,.5))
BorderThickness: 1
BorderRadius: 6
PaddingLeft: 8
PaddingRight: 8
Height: 22
Size: 11

// lblInitCardName
Text:       ThisItem.name
Size:       16
FontWeight: FontWeight.Bold
Color:      varStrong

// lblInitCardDesc
Text:  Left(ThisItem.description, 80) & If(Len(ThisItem.description) > 80, "...", "")
Size:  12.5
Color: varMuted

// conBadgesRow (horizontal, gap 6, wrap)
// conPrioBadge
Text:  ThisItem.priority
Color: Switch(ThisItem.priority, "Baja",ColorValue("#8A93A2"), "Media",ColorValue("#64B5F6"), "Alta",ColorValue("#E0944D"), "Crítica",ColorValue("#CD5C5C"), varMuted)
Fill:  Switch(ThisItem.priority, "Baja",RGBA(138,147,162,.13), "Media",RGBA(100,181,246,.13), "Alta",RGBA(224,148,77,.13), "Crítica",RGBA(205,92,92,.13), RGBA(138,147,162,.13))
BorderColor: Switch(ThisItem.priority, "Baja",RGBA(138,147,162,.4), "Media",RGBA(100,181,246,.4), "Alta",RGBA(224,148,77,.4), "Crítica",RGBA(205,92,92,.4), RGBA(138,147,162,.4))
BorderThickness: 1
BorderRadius: 5
PaddingLeft: 7
PaddingRight: 7
Size: 11

// conComplBadge (mismo estilo gris)
Text:  "Compl. " & ThisItem.complexity
Fill:  RGBA(138,147,162,.1)
Color: varMuted

// conSensitiveBadge (visible solo si handles_sensitive_data = true)
Visible: ThisItem.handles_sensitive_data
Text:    "🔒 Sensible"
Fill:    RGBA(205,92,92,.13)
Color:   varError
BorderColor: RGBA(205,92,92,.4)
BorderThickness: 1

// rectInitCardSep
Fill:   varBorder
Height: 1

// conInitCardMetrics (horizontal, gap 16)
// conFTEMetric (vertical)
//   lblFTEValue: Text(ThisItem.estimated_fte_saved, "0.0")  Size: 15  Bold  varStrong
//   lblFTELabel: "FTE/mes"  Size: 10.5  varMuted
// conVolMetric (vertical)
//   lblVolValue: If(ThisItem.transaction_volume_monthly>=1000, Text(ThisItem.transaction_volume_monthly/1000,"0.#")&"k", Text(ThisItem.transaction_volume_monthly))
//   lblVolLabel: "trans./mes"
// conAIText (vertical)
//   lblAIValue: ThisItem.ai_capabilities_required  Color: varPurple  Size: 11
//   lblAILabel: "Capacidades IA"
```

---

### Vista Tabla: `galInitTable`

```powerfx
Visible:       varInitView = "table"
Items:         varFilteredInits
Layout:        Layout.Vertical
TemplateHeight: 52
ShowScrollbar:  false
OnSelect:      Set(varSelectedInitId, ThisItem.ID); Navigate(scrInitDetail, ScreenTransition.None)
```

Header de columnas (misma estructura que en Ideas):

```powerfx
// Labels: CÓDIGO(110) | NOMBRE(Flexible) | ESTADO(120) | PRIORIDAD(100) | COMPL.(90) | FTE(70)
```

Template de fila:

```powerfx
lblFRowCode:   ThisItem.code  — monospace, varAccent, Width 110
lblFRowName:   ThisItem.name  — Bold, varStrong, Flexible
conFRowStatus: badge estado  — Width 120
conFRowPrio:   badge prioridad — Width 100
lblFRowCompl:  ThisItem.complexity — varMuted, Width 90
lblFRowFTE:    Text(ThisItem.estimated_fte_saved, "0.0") — Bold, varStrong, Width 70
```

---

### Vista Kanban: `conInitKanban`

```powerfx
Visible:         varInitView = "kanban"
LayoutDirection: LayoutDirection.Horizontal
Gap: 10
OverflowX:       OverflowX.Auto
```

5 columnas (misma lógica que Kanban de Ideas):

| Galería | Filter | Color encabezado |
|---------|--------|------------------|
| `galKanIdea` | `status = "Idea"` | `#8A93A2` |
| `galKanAnalisis` | `status = "Análisis"` | `#E0944D` |
| `galKanDesarrollo` | `status = "En Desarrollo"` | `#499CFF` |
| `galKanListo` | `status = "Listo"` | `#68A16B` |
| `galKanCancelada` | `status = "Cancelada"` | `#CD5C5C` |

Template de card en Kanban de iniciativas:

```powerfx
// conKanInitCard
Fill:        varBgCard
BorderColor: varBorder
BorderRadius: 10
PaddingTop:  10
PaddingLeft: 12
PaddingBottom: 10
PaddingRight: 12
LayoutDirection: LayoutDirection.Vertical
Gap: 6

// lblKanCode: ThisItem.code — monospace, varAccent, 10.5px
// lblKanName: ThisItem.name — Bold, varStrong, 12.5px
// conKanPrio: badge prioridad pequeño
```

---

## PANTALLA 6: `scrInitDetail`

```
scrInitDetail
├── conHeader       (lblBreadcrumb.Text = "Iniciativas › Detalle")
├── conNavRail      (btnNavInit activo)
└── conMainInitDet
    ├── btnBackInits
    ├── conInitDetHeader
    ├── conInitKPIs
    ├── conInitBodyGrid
    │   ├── conInitLeft
    │   │   ├── conInitDesc
    │   │   └── conInitTeam
    │   └── conInitRight
    │       ├── conInitTech
    │       ├── conInitOrigin  (Visible si tiene)
    │       └── lnkInitDoc
    └── (sin barra de acciones — las acciones están en el formulario)
```

```powerfx
btnBackInits.Text:     "← Volver a Iniciativas"
btnBackInits.OnSelect: Navigate(scrInitiatives, ScreenTransition.None)
```

### `conInitDetHeader`

```powerfx
LayoutDirection: LayoutDirection.Horizontal
AlignItems:      AlignItems.Center
Gap: 10

// conInitCodeBadge: monospace, varAccent, fondo RGBA(73,156,255,.12)
Text: LookUp(colInitiatives, ID=varSelectedInitId).code
FontFamily: "Consolas, monospace"
Size: 12
FontWeight: FontWeight.Bold

// conInitStatusBadge: estado con colores correspondientes
Text: LookUp(colInitiatives, ID=varSelectedInitId).status

// conInitPrioBadge: prioridad
Text: LookUp(colInitiatives, ID=varSelectedInitId).priority

// conSensitiveBadge (Visible si handles_sensitive_data = true)
Visible: LookUp(colInitiatives, ID=varSelectedInitId).handles_sensitive_data
Text:    "🔒 Datos sensibles"
Fill:    RGBA(205,92,92,.13)
Color:   varError
BorderColor: RGBA(205,92,92,.4)

// lblInitDetName
Text:       LookUp(colInitiatives, ID=varSelectedInitId).name
Size:       25
FontWeight: FontWeight.Bold
Color:      varStrong

// btnEditInit
Text:     "Editar iniciativa"
Fill:     varAccent
Color:    varStrong
BorderRadius: 8
OnSelect: Set(varIsEditing, true); Navigate(scrInitForm, ScreenTransition.None)
```

### KPIs de iniciativa: `conInitKPIs`

```powerfx
LayoutDirection: LayoutDirection.Horizontal
Gap: 14
```

4 KPIs (mismo patrón que Dashboard):

```powerfx
// KPI 1 — FTE
lblInitKpi1Label.Text: "FTE AHORRADO/MES"
lblInitKpi1Value.Text: Text(LookUp(colInitiatives, ID=varSelectedInitId).estimated_fte_saved, "0.0")
lblInitKpi1Value.Color: varPurple

// KPI 2 — Transacciones
lblInitKpi2Label.Text: "TRANSACCIONES/MES"
lblInitKpi2Value.Text: With({v: LookUp(colInitiatives, ID=varSelectedInitId).transaction_volume_monthly},
    If(v >= 1000, Text(v/1000, "0.#") & "k", Text(v))
)
lblInitKpi2Value.Color: varAccent

// KPI 3 — Complejidad
lblInitKpi3Label.Text: "COMPLEJIDAD"
lblInitKpi3Value.Text: LookUp(colInitiatives, ID=varSelectedInitId).complexity
lblInitKpi3Value.Color: varOrange

// KPI 4 — Personas
lblInitKpi4Label.Text: "PERSONAS ASIGNADAS"
lblInitKpi4Value.Text: Text(CountRows(Filter(colUserInitiative, initiative_id = varSelectedInitId)))
lblInitKpi4Value.Color: varStrong
```

### `conInitBodyGrid` (grid 60/40)

```powerfx
LayoutDirection: LayoutDirection.Horizontal
Gap: 16
```

#### Columna izquierda: `conInitLeft` (60%)

```powerfx
Width: (Parent.Width - 16) * 0.6
LayoutDirection: LayoutDirection.Vertical
Gap: 16
```

**Tarjeta Descripción: `conInitDesc`**

```powerfx
Fill:        varBgCard
BorderColor: varBorder
BorderRadius: 12
PaddingTop:  20
PaddingLeft: 20
PaddingBottom: 20
PaddingRight: 20
LayoutDirection: LayoutDirection.Vertical
Gap: 14

// DESCRIPCIÓN
// lblDescLabel.Text: "DESCRIPCIÓN"  Size: 11  Color: varMuted  FontWeight: Semibold
// lblDescText.Text:  LookUp(colInitiatives, ID=varSelectedInitId).description  Color: varText  Size: 13.5

// PUNTO DE DOLOR
// lblPainLabel.Text: "PUNTO DE DOLOR"  Color: varError
// lblPainText.Text:  LookUp(colInitiatives, ID=varSelectedInitId).pain_point

// VALOR ESPERADO
// lblValueLabel.Text: "VALOR ESPERADO"  Color: varSuccess
// lblValueText.Text:  LookUp(colInitiatives, ID=varSelectedInitId).expected_value
```

**Tarjeta Equipo: `conInitTeam`**

```powerfx
Fill:        varBgCard
BorderColor: varBorder
BorderRadius: 12
PaddingTop:  18
PaddingLeft: 20
PaddingBottom: 18
PaddingRight: 20
LayoutDirection: LayoutDirection.Vertical
Gap: 12

// lblTeamSectionTitle.Text: "Equipo"  Size: 13  Bold  varStrong

// galInitPeople (personas asignadas)
Items: Filter(colUserInitiative, initiative_id = varSelectedInitId)
Layout: Layout.Vertical
TemplateHeight: 42
ShowScrollbar: false

// Template persona:
// conPersonRow (horizontal, AlignItems Center, Gap 10)
// conAvatar29 (29px circle, Fill #3E4451)
//   lblInitials: With({u: LookUp(colUsers, ID=ThisItem.user_id)},
//       Upper(Left(u.name,1) & If(!IsBlank(Find(" ",u.name)), Mid(u.name,Find(" ",u.name)+1,1),""))
//   )
// conPersonInfo (vertical)
//   lblPName: LookUp(colUsers, ID=ThisItem.user_id).name  Size: 13  Bold  varStrong
//   lblPRole: ThisItem.initiative_role  Size: 11  varMuted

// rectTeamDivider: Fill varBorder, Height 1

// galInitTeams (equipos asignados)
Items: Filter(colTeamInitiative, initiative_id = varSelectedInitId)
Layout: Layout.Vertical
TemplateHeight: 36
ShowScrollbar: false

// Template equipo:
// conTeamBadge (horizontal, gap 8)
//   lblTeamName: LookUp(colTeams, ID=ThisItem.team_id).name  Size: 12.5  Bold  varStrong
//   lblTeamImpact: "· " & ThisItem.impact_type  Size: 11.5  varMuted
```

#### Columna derecha: `conInitRight` (40%)

```powerfx
Width: (Parent.Width - 16) * 0.4
LayoutDirection: LayoutDirection.Vertical
Gap: 16
```

**Tarjeta Tecnología: `conInitTech`**

```powerfx
Fill:        varBgCard
BorderColor: varBorder
BorderRadius: 12
PaddingTop:  18
PaddingLeft: 20
PaddingBottom: 18
PaddingRight: 20
LayoutDirection: LayoutDirection.Vertical
Gap: 14

// CAPACIDADES DE IA
// lblAILabel.Text: "CAPACIDADES DE IA"  Size: 11  Color: varMuted  FontWeight: Semibold

// galAIBadges — galería horizontal con los valores de ai_capabilities_required
Items: ForAll(
    Split(LookUp(colInitiatives, ID=varSelectedInitId).ai_capabilities_required, ","),
    {cap: Trim(Value)}
)
Layout: Layout.Horizontal
TemplateWidth: 90
TemplateHeight: 28

// Template badge IA (morado):
Text:  ThisItem.cap
Fill:  RGBA(176,132,235,.14)
Color: ColorValue("#C9A8F0")
BorderColor: RGBA(176,132,235,.5)
BorderThickness: 1
BorderRadius: 6
Size: 11.5
FontWeight: FontWeight.Semibold
PaddingLeft: 8
PaddingRight: 8

// SISTEMAS INVOLUCRADOS
// lblSysLabel.Text: "SISTEMAS INVOLUCRADOS"  Size: 11  Color: varMuted

// galSysBadges — misma estructura, colores grises
Items: ForAll(
    Split(LookUp(colInitiatives, ID=varSelectedInitId).systems_involved, ","),
    {sys: Trim(Value)}
)
// Template badge Sistema (gris):
Text:  ThisItem.sys
Fill:  RGBA(62,68,81,.6)
Color: varText
BorderColor: varBorder
BorderRadius: 6
```

**Tarjeta Idea de Origen: `conInitOrigin`**

```powerfx
Visible: CountRows(Filter(colIdeaInitiative, initiative_id = varSelectedInitId)) > 0

Fill:        varBgCard
BorderColor: RGBA(73,156,255,.35)
BorderThickness: 1
BorderRadius: 12
PaddingTop:  16
PaddingLeft: 20
PaddingBottom: 16
PaddingRight: 20
LayoutDirection: LayoutDirection.Vertical
Gap: 10

// lblOriginTitle.Text: "💡 Idea de origen"  Color: varAccent  Bold  Size: 13

// galOriginIdeas
Items: Filter(colIdeaInitiative, initiative_id = varSelectedInitId)
Layout: Layout.Vertical
TemplateHeight: 36
ShowScrollbar: false

// Template:
// btnOriginIdea
Text:     With({idea: LookUp(colIdeas, ID=ThisItem.idea_id)}, "\"" & idea.title & "\"")
Fill:     RGBA(73,156,255,.1)
Color:    varAccent
BorderColor: RGBA(73,156,255,.4)
BorderThickness: 1
BorderRadius: 8
OnSelect: Set(varSelectedIdeaId, ThisItem.idea_id); Navigate(scrIdeaDetail, ScreenTransition.None)
```

**Link Documentación:**

```powerfx
// btnDocLink
Text:     "📄 Documentación en SharePoint ↗"
Fill:     Transparent()
Color:    varLink
Size:     13
HoverColor: varAccent
OnSelect: Launch(LookUp(colInitiatives, ID=varSelectedInitId).documentation_url)
```

---

## PANTALLA 7: `scrInitForm`

```
scrInitForm
├── conHeader     (lblBreadcrumb dinámico)
├── conNavRail    (btnNavInit activo)
└── conMainInitForm
    ├── btnCancelInit
    ├── lblInitFormTitle
    ├── conFromIdeaBanner  (Visible si viene de idea)
    └── conInitFields
        ├── txtInitCode
        ├── txtInitName
        ├── txtInitDesc
        ├── txtInitPain
        ├── txtInitValue
        ├── conStatusPrioRow (drpInitStatus + drpInitPriority + drpInitComplexity)
        ├── conMetricsRow    (txtInitVolume + txtInitFTE)
        ├── conSystems       (toggle buttons SAP, Salesforce, SonarQube, Splunk, Otros)
        ├── conAI            (toggle buttons NLP, OCR, Visión, LLM, Agentes)
        ├── txtInitDoc
        ├── btnSensitive
        └── conInitFormButtons
```

### `OnVisible` de `scrInitForm`

```powerfx
// Inicializar colecciones de multi-select
ClearCollect(colSelectedSystems, {Value: ""});
Remove(colSelectedSystems, First(colSelectedSystems));
ClearCollect(colSelectedAI, {Value: ""});
Remove(colSelectedAI, First(colSelectedAI));

Set(varSensitiveOn, false);

If(!IsBlank(varFromIdeaId),
    // Desde idea aprobada — pre-rellenar
    With({idea: LookUp(colIdeas, ID = varFromIdeaId)},
        Set(varInitDraftName, idea.title);
        Set(varInitDraftDesc, idea.proposed_solution);
        Set(varInitDraftPain, idea.current_problem)
    ),
    If(varIsEditing,
        With({init: LookUp(colInitiatives, ID = varSelectedInitId)},
            Set(varInitDraftName, init.name);
            Set(varInitDraftDesc, init.description);
            Set(varInitDraftPain, init.pain_point);
            // Cargar sistemas en colSelectedSystems
            ForAll(Split(init.systems_involved, ","),
                If(!IsBlank(Trim(Value)), Collect(colSelectedSystems, {Value: Trim(Value)}))
            );
            // Cargar AI en colSelectedAI
            ForAll(Split(init.ai_capabilities_required, ","),
                If(!IsBlank(Trim(Value)), Collect(colSelectedAI, {Value: Trim(Value)}))
            );
            Set(varSensitiveOn, init.handles_sensitive_data)
        ),
        Set(varInitDraftName, "");
        Set(varInitDraftDesc, "");
        Set(varInitDraftPain, "")
    )
)
```

### Encabezado

```powerfx
btnCancelInit.Text:     "← Cancelar"
btnCancelInit.OnSelect: If(varIsEditing, Navigate(scrInitDetail), Navigate(scrInitiatives))
btnCancelInit.Fill:     Transparent()
btnCancelInit.Color:    varMuted

lblInitFormTitle.Text:       If(varIsEditing, "Editar iniciativa", "Nueva iniciativa")
lblInitFormTitle.Size:       23
lblInitFormTitle.FontWeight: FontWeight.Bold
lblInitFormTitle.Color:      varStrong
```

### Banner "Desde idea"

```powerfx
// conFromIdeaBanner
Visible:     !IsBlank(varFromIdeaId)
Fill:        RGBA(104,161,107,.13)
BorderColor: RGBA(104,161,107,.5)
BorderThickness: 1
BorderRadius: 10
PaddingTop:  12
PaddingLeft: 16
PaddingBottom: 12
PaddingRight: 16
LayoutDirection: LayoutDirection.Horizontal
AlignItems:  AlignItems.Center
Gap: 10

// lblFromIdeaIcon.Text: "✓"  Color: varSuccess  Size: 16
// lblFromIdeaText.Text: "Desde idea aprobada · campos pre-rellenados, completa el impacto y métricas."
// Color: varSuccess  Size: 13
```

### Campos del formulario

```powerfx
// Estilos de input (mismos que IdeaForm):
// Fill: varBgCard, BorderColor: varBorder, Color: varStrong, BorderRadius: 8, FocusedBorderColor: varAccent

// 1. CÓDIGO (auto-generado, solo lectura visual)
// lblInitCodeLbl.Text: "CÓDIGO"
// txtInitCode
Default: If(varIsEditing,
    LookUp(colInitiatives, ID=varSelectedInitId).code,
    "IA-2026-" & Text(Max(colInitiatives, ID) + 1, "000")
)
Fill:       varBgCard2
Color:      varAccent
FontFamily: "Consolas, monospace"
FontWeight: FontWeight.Bold
Size:       14

// 2. NOMBRE
// lblInitNameLbl.Text: "NOMBRE DE LA INICIATIVA"
// txtInitName
Default:  If(varIsEditing, LookUp(colInitiatives, ID=varSelectedInitId).name, varInitDraftName)
HintText: "Nombre descriptivo de la iniciativa"

// 3. DESCRIPCIÓN
// lblInitDescLbl.Text: "DESCRIPCIÓN (ACTUAL VS. FUTURO)"
// txtInitDesc
Mode:     TextMode.MultiLine
Height:   100
Default:  If(varIsEditing, LookUp(colInitiatives, ID=varSelectedInitId).description, varInitDraftDesc)
HintText: "¿Qué pasa hoy? ¿Cómo será después?"

// 4. PUNTO DE DOLOR
// lblInitPainLbl.Text: "PUNTO DE DOLOR"  Color: varError
// txtInitPain
Mode:     TextMode.MultiLine
Height:   80
Default:  If(varIsEditing, LookUp(colInitiatives, ID=varSelectedInitId).pain_point, varInitDraftPain)
HintText: "¿Qué proceso manual o ineficiencia existe?"

// 5. VALOR ESPERADO
// lblInitValueLbl.Text: "VALOR ESPERADO"  Color: varSuccess
// txtInitValue
Mode:     TextMode.MultiLine
Height:   80
Default:  If(varIsEditing, LookUp(colInitiatives, ID=varSelectedInitId).expected_value, "")
HintText: "¿Qué se logra al implementarse?"
```

### Fila Status / Prioridad / Complejidad

```powerfx
// conStatusPrioRow (horizontal, gap 12)

// drpInitStatus
Items:   ["Idea", "Análisis", "En Desarrollo", "Listo", "Cancelada"]
Default: If(varIsEditing, LookUp(colInitiatives, ID=varSelectedInitId).status, "Idea")

// drpInitPriority
Items:   ["Baja", "Media", "Alta", "Crítica"]
Default: If(varIsEditing, LookUp(colInitiatives, ID=varSelectedInitId).priority, "Media")

// drpInitComplexity
Items:   ["Baja", "Media", "Alta"]
Default: If(varIsEditing, LookUp(colInitiatives, ID=varSelectedInitId).complexity, "Media")
```

### Métricas

```powerfx
// conMetricsRow (horizontal, gap 16)

// txtInitVolume
Default:  If(varIsEditing, Text(LookUp(colInitiatives, ID=varSelectedInitId).transaction_volume_monthly), "0")
HintText: "Ej. 5000"
Mode:     TextMode.SingleLine
// lblInitVolLbl.Text: "VOLUMEN MENSUAL (TRANSACCIONES)"

// txtInitFTE
Default:  If(varIsEditing, Text(LookUp(colInitiatives, ID=varSelectedInitId).estimated_fte_saved), "0.0")
HintText: "Ej. 1.5"
Mode:     TextMode.SingleLine
// lblInitFTELbl.Text: "FTE AHORRADO/MES"
```

### Toggle de Sistemas

```powerfx
// conSystems (vertical)
// lblSystemsLbl.Text: "SISTEMAS INVOLUCRADOS"

// Genera 5 botones toggle: SAP, Salesforce, SonarQube, Splunk, Otros
// Patrón para btnSysSAP:
Text:        "SAP"
Fill:        If("SAP" in colSelectedSystems.Value, RGBA(73,156,255,.15), varBgPrincipal)
Color:       If("SAP" in colSelectedSystems.Value, varAccent, varMuted)
BorderColor: If("SAP" in colSelectedSystems.Value, RGBA(73,156,255,.5), varBorder)
BorderThickness: 1
BorderRadius: 8
Height: 34
PaddingLeft: 14
PaddingRight: 14
OnSelect:
    If("SAP" in colSelectedSystems.Value,
        Remove(colSelectedSystems, LookUp(colSelectedSystems, Value = "SAP")),
        Collect(colSelectedSystems, {Value: "SAP"})
    )

// Repetir para: Salesforce, SonarQube, Splunk, Otros
```

### Toggle de Capacidades IA

```powerfx
// conAI (vertical)
// lblAILbl.Text: "CAPACIDADES DE IA REQUERIDAS"

// Patrón para btnAINLP:
Text:        "NLP"
Fill:        If("NLP" in colSelectedAI.Value, RGBA(176,132,235,.15), varBgPrincipal)
Color:       If("NLP" in colSelectedAI.Value, ColorValue("#C9A8F0"), varMuted)
BorderColor: If("NLP" in colSelectedAI.Value, RGBA(176,132,235,.5), varBorder)
BorderThickness: 1
BorderRadius: 8
OnSelect:
    If("NLP" in colSelectedAI.Value,
        Remove(colSelectedAI, LookUp(colSelectedAI, Value = "NLP")),
        Collect(colSelectedAI, {Value: "NLP"})
    )

// Repetir para: OCR, Visión, LLM, Agentes
```

### Campos adicionales y botón sensible

```powerfx
// txtInitDoc
// lblInitDocLbl.Text: "URL DE DOCUMENTACIÓN"
Default:  If(varIsEditing, LookUp(colInitiatives, ID=varSelectedInitId).documentation_url, "")
HintText: "https://nttdata.sharepoint.com/..."

// btnSensitive — Toggle datos sensibles
Text:        If(varSensitiveOn, "🔒 Datos sensibles: Sí", "Datos sensibles: No")
Fill:        If(varSensitiveOn, RGBA(205,92,92,.14), varBgPrincipal)
Color:       If(varSensitiveOn, varError, varMuted)
BorderColor: If(varSensitiveOn, varError, varBorder)
BorderThickness: 1
BorderRadius: 8
Height: 36
PaddingLeft: 14
PaddingRight: 14
FontWeight: FontWeight.Semibold
OnSelect: Set(varSensitiveOn, !varSensitiveOn)
```

### Botones de acción

```powerfx
// conInitFormButtons (horizontal, gap 10, JustifyContent End)

// btnCancelInit2
Text:     "Cancelar"
Fill:     Transparent()
Color:    varMuted
BorderColor: varBorder
BorderRadius: 8
OnSelect: If(varIsEditing, Navigate(scrInitDetail), Navigate(scrInitiatives))

// btnSaveInit
Text:     If(varIsEditing, "Guardar cambios", "Crear iniciativa")
Fill:     varAccent
Color:    varStrong
BorderRadius: 8
Height:   38
OnSelect:
    If(IsBlank(txtInitName.Text),
        Notify("Falta el nombre de la iniciativa", NotificationType.Error),
        If(varIsEditing,
            // ─── EDITAR ──────────────────────────────────
            Patch(colInitiatives, LookUp(colInitiatives, ID = varSelectedInitId), {
                code:                        txtInitCode.Text,
                name:                        txtInitName.Text,
                description:                 txtInitDesc.Text,
                pain_point:                  txtInitPain.Text,
                expected_value:              txtInitValue.Text,
                status:                      drpInitStatus.Selected.Value,
                priority:                    drpInitPriority.Selected.Value,
                complexity:                  drpInitComplexity.Selected.Value,
                transaction_volume_monthly:  Value(txtInitVolume.Text),
                estimated_fte_saved:         Value(txtInitFTE.Text),
                systems_involved:            Concat(colSelectedSystems, Value, ","),
                ai_capabilities_required:    Concat(colSelectedAI, Value, ","),
                handles_sensitive_data:      varSensitiveOn,
                documentation_url:           txtInitDoc.Text
            });
            Navigate(scrInitDetail, ScreenTransition.None);
            Notify("Iniciativa guardada en SharePoint ✓", NotificationType.Success),
            // ─── CREAR NUEVA ─────────────────────────────
            Set(varNewInitId, Max(colInitiatives, ID) + 1);
            Collect(colInitiatives, {
                ID:                          varNewInitId,
                code:                        txtInitCode.Text,
                name:                        txtInitName.Text,
                description:                 txtInitDesc.Text,
                pain_point:                  txtInitPain.Text,
                expected_value:              txtInitValue.Text,
                status:                      drpInitStatus.Selected.Value,
                priority:                    drpInitPriority.Selected.Value,
                complexity:                  drpInitComplexity.Selected.Value,
                transaction_volume_monthly:  Value(txtInitVolume.Text),
                estimated_fte_saved:         Value(txtInitFTE.Text),
                systems_involved:            Concat(colSelectedSystems, Value, ","),
                ai_capabilities_required:    Concat(colSelectedAI, Value, ","),
                handles_sensitive_data:      varSensitiveOn,
                documentation_url:           txtInitDoc.Text
            });
            // Crear relación con idea de origen si aplica
            If(!IsBlank(varFromIdeaId),
                Collect(colIdeaInitiative, {
                    ID:             Max(colIdeaInitiative, ID) + 1,
                    idea_id:        varFromIdeaId,
                    initiative_id:  varNewInitId
                })
            );
            Set(varSelectedInitId, varNewInitId);
            Set(varFromIdeaId, Blank());
            Navigate(scrInitDetail, ScreenTransition.None);
            Notify("Iniciativa creada en SharePoint ✓", NotificationType.Success)
        )
    )
```

---

## PANTALLA 8: `scrApproval`

```
scrApproval
├── conHeader        (lblBreadcrumb.Text = "Aprobación")
├── conNavRail       (btnNavApproval activo)
└── conMainApproval
    ├── lblApprovalTitle
    ├── lblApprovalSub
    ├── conPendingSection
    │   ├── conPendingHeader
    │   └── galPending
    ├── conNewSection    (Visible si hay nuevas)
    │   ├── conNewHeader
    │   └── galNew
    └── conDecidedSection (Visible si hay decididas)
        ├── conDecidedHeader
        └── galDecided
```

### `conMainApproval`

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
Gap: 28
```

### Encabezado

```powerfx
lblApprovalTitle.Text:  "Aprobación de ideas"
lblApprovalTitle.Size:  23
lblApprovalTitle.FontWeight: FontWeight.Bold
lblApprovalTitle.Color: varStrong

lblApprovalSub.Text:  "Revisa las ideas en sesión, registra las conclusiones y decide si avanzan a iniciativa."
lblApprovalSub.Size:  13
lblApprovalSub.Color: varMuted
```

---

### Sección Pendientes: `conPendingSection`

#### Encabezado `conPendingHeader`

```powerfx
LayoutDirection: LayoutDirection.Horizontal
AlignItems:      AlignItems.Center
Gap: 10
PaddingBottom: 12

// rectPendingDot (9px circle, naranja)
Fill:         ColorValue("#E0944D")
Width:        9
Height:       9
BorderRadius: 4.5

// lblPendingTitle.Text: "Pendientes de revisión"
Size: 14  FontWeight: FontWeight.Bold  Color: varStrong

// conPendingCount (badge conteo)
Fill:        RGBA(224,148,77,.15)
BorderColor: RGBA(224,148,77,.4)
BorderRadius: 10
PaddingLeft: 8
PaddingRight: 8
Height: 22

// lblPendingCount.Text: Text(CountRows(Filter(colIdeas, status = "En Revisión")))
Color: ColorValue("#E0944D")
Size:  12
FontWeight: FontWeight.Bold
```

#### Galería `galPending`

```powerfx
Items:         Filter(colIdeas, status = "En Revisión")
Layout:        Layout.Vertical
TemplateHeight: 300   // altura aproximada — ajustar según contenido
ShowScrollbar:  false
```

Template de card pendiente:

```powerfx
// conPendingCard
Fill:        varBgCard
BorderColor: varBorder
BorderThickness: 1
BorderRadius: 12
// Borde izquierdo naranja (simular con rectOrangeBar):
// rectOrangeBar: Width 4, Height Parent.Height, Fill #E0944D, X 0, BorderRadius {TopLeft:12, BottomLeft:12}
PaddingTop:  18
PaddingLeft: 22   // (4px extra para compensar la barra)
PaddingBottom: 18
PaddingRight: 20
LayoutDirection: LayoutDirection.Vertical
Gap: 14

// ── Fila superior ──────────────────────────────────────
// conCardTop (horizontal, AlignItems Center, Gap 10)
// lblPCardTitle: ThisItem.title  Size: 16  FontWeight: Bold  Color: varStrong  Flexible: true
// btnViewIdea: "Ver idea →"
//   Fill: Transparent()  Color: varAccent  BorderColor: RGBA(73,156,255,.5)  BorderRadius: 7
//   OnSelect: Set(varSelectedIdeaId, ThisItem.ID); Navigate(scrIdeaDetail)

// ── Meta (autor + sesión) ───────────────────────────────
// conCardMeta (horizontal, gap 12)
// lblPCardAuthor:
"Autor: " & LookUp(colUsers,
    ID = LookUp(colUserIdea, idea_id = ThisItem.ID && idea_role = "Autor Principal").user_id
).name
Color: varMuted  Size: 12.5

// lblPCardDate:
"Sesión: " & If(IsBlank(ThisItem.review_meeting_date), "Sin fecha", Text(ThisItem.review_meeting_date, "dd/mm/yyyy"))
Color: varMuted  Size: 12.5

// ── Grid Problema / Solución ────────────────────────────
// conProbSolGrid (horizontal, gap 12)

// conProbBox (izquierda)
Fill:        varBgPrincipal
BorderColor: varBorder
BorderRadius: 8
PaddingTop: 12
PaddingLeft: 14
PaddingBottom: 12
PaddingRight: 14
LayoutDirection: LayoutDirection.Vertical
Gap: 6
Flexible: true

// lblProbBoxLabel.Text: "PROBLEMA"  Color: varError  Size: 11  FontWeight: Semibold
// lblProbBoxText.Text:  ThisItem.current_problem  Color: varText  Size: 12.5
// Limitar texto: Left(ThisItem.current_problem, 200) & If(Len(...)>200, "...", "")

// conSolBox (derecha) — misma estructura pero "SOLUCIÓN" varSuccess

// ── Notas del revisor ────────────────────────────────────
// lblNotesLabel.Text: "NOTAS DE REVISIÓN"  Color: varMuted  Size: 11  FontWeight: Semibold
// IMPORTANTE: En una galería, no se puede usar un TextInput nativo para edición
// Alternativa 1: Usar un TextInput fuera de la galería que se llena al seleccionar un item
// Alternativa 2: Usar la variable varReviewNote[ID] (no nativo en PowerApps)
//
// SOLUCIÓN RECOMENDADA: Usar un Input global con variable
// Cuando el usuario hace clic en "Aprobar/Rechazar", se usa la variable varCurrentReviewNote

// En scrApproval.OnVisible: Set(varCurrentPendingId, Blank()); Set(varCurrentReviewNote, "")
// Cuando la galería hace OnSelect: Set(varCurrentPendingId, ThisItem.ID)
// txtGlobalReviewNote (fuera de la galería):
Visible: !IsBlank(varCurrentPendingId)
Default: LookUp(colIdeas, ID=varCurrentPendingId).review_notes
HintText: "¿Por qué se aprueba o rechaza?"
// etc.

// ALTERNATIVA SIMPLIFICADA (si se usa una pantalla de decisión separada):
// Al hacer click en "Aprobar" o "Rechazar", navegar a una pantalla de decisión
// donde se ingresa la nota y se confirma la acción.
// Esta es la mejor práctica en PowerApps Canvas.

// ── Botones Aprobar / Rechazar ───────────────────────────
// conActionButtons (horizontal, gap 10, JustifyContent End)

// btnRejectIdea
Text:        "Rechazar"
Fill:        Transparent()
Color:       varError
BorderColor: varError
BorderThickness: 1
BorderRadius: 8
Height:      36
PaddingLeft: 16
PaddingRight: 16
OnSelect:
    Patch(colIdeas, ThisItem, {
        status:               "Rechazada",
        review_meeting_date:  If(IsBlank(ThisItem.review_meeting_date), Today(), ThisItem.review_meeting_date)
    });
    Notify("Idea rechazada")

// btnApproveIdea
Text:     "✓ Aprobar"
Fill:     varSuccess
Color:    varStrong
BorderRadius: 8
Height:   36
PaddingLeft: 16
PaddingRight: 16
OnSelect:
    Patch(colIdeas, ThisItem, {
        status:               "Aprobada",
        review_meeting_date:  If(IsBlank(ThisItem.review_meeting_date), Today(), ThisItem.review_meeting_date)
    });
    Notify("¡Idea aprobada! ✓", NotificationType.Success)
```

---

### Sección Nuevas: `conNewSection`

```powerfx
Visible: CountRows(Filter(colIdeas, status = "Nueva")) > 0
LayoutDirection: LayoutDirection.Vertical
Gap: 12

// conNewHeader (horizontal, AlignItems Center, Gap 10)
// rectNewDot: Fill ColorValue("#64B5F6"), 9px circle
// lblNewTitle.Text: "Nuevas · por enviar a revisión"  Size: 14  Bold  varStrong
// conNewCount badge (azul)
```

```powerfx
// galNew
Items:         Filter(colIdeas, status = "Nueva")
Layout:        Layout.Vertical
TemplateHeight: 62
ShowScrollbar:  false
```

Template fila nueva:

```powerfx
// conNewRow (horizontal, AlignItems Center, Gap 12)
Fill:        varBgCard
BorderColor: varBorder
BorderRadius: 10
PaddingTop:  12
PaddingLeft: 16
PaddingBottom: 12
PaddingRight: 16

// lblNewTitle: ThisItem.title  Size: 13  Bold  varStrong  Flexible: true
// OnSelect (de conNewRow): Set(varSelectedIdeaId, ThisItem.ID); Navigate(scrIdeaDetail)

// lblNewAuthor:
"Autor: " & LookUp(colUsers, ID = LookUp(colUserIdea, idea_id=ThisItem.ID && idea_role="Autor Principal").user_id).name
Color: varMuted  Size: 12

// btnSendToReview: "Enviar a revisión"
Fill:        RGBA(73,156,255,.15)
Color:       varAccent
BorderColor: RGBA(73,156,255,.4)
BorderRadius: 8
Height:      32
PaddingLeft: 12
PaddingRight: 12
Size:        12
OnSelect:
    Patch(colIdeas, ThisItem, {
        status:               "En Revisión",
        review_meeting_date:  Today()
    });
    Notify("Idea enviada a revisión")
```

---

### Sección Decididas: `conDecidedSection`

```powerfx
Visible: CountRows(Filter(colIdeas, status = "Aprobada" || status = "Rechazada")) > 0
LayoutDirection: LayoutDirection.Vertical
Gap: 12

// conDecidedHeader
// rectDecidedDot: Fill varMuted, 9px
// lblDecidedTitle.Text: "Decididas recientemente"  Size: 14  Bold  varStrong
```

```powerfx
// galDecided
Items:         Filter(colIdeas, status = "Aprobada" || status = "Rechazada")
Layout:        Layout.Vertical
TemplateHeight: 72
ShowScrollbar:  false
OnSelect:      Set(varSelectedIdeaId, ThisItem.ID); Navigate(scrIdeaDetail, ScreenTransition.None)
```

Template fila decidida:

```powerfx
// conDecidedCard (horizontal, AlignItems Center, Gap 14)
Fill:        varBgCard
BorderColor: varBorder
BorderRadius: 10
PaddingTop:  12
PaddingLeft: 16
PaddingBottom: 12
PaddingRight: 16

// conDecidedStatus: badge Aprobada (verde) / Rechazada (rojo)
Width: 100

// conDecidedInfo (vertical, Flexible)
// lblDecidedTitle: ThisItem.title  Size: 13  Bold  varStrong
// lblDecidedNotes: If(IsBlank(ThisItem.review_notes)||ThisItem.review_notes="", "Sin notas.", ThisItem.review_notes)
//   Color: varMuted  Size: 11.5  (truncado a 80 caracteres)

// lblDecidedDate:
Text(ThisItem.review_meeting_date, "dd/mm/yyyy")
Color: varMuted  Size: 11.5  Width: 100  Align: Align.Right
```
