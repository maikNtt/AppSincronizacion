# Parte 3: Personas y Equipos — PowerFx Completo

> **IdeaHub IA** — Pantallas: `scrPeople`, `scrUserDetail`, `scrTeamDetail`, `scrUserForm`, `scrTeamForm`

---

## PANTALLA 9: `scrPeople`

```
scrPeople
├── conHeader       (lblBreadcrumb.Text = "Personas")
├── conNavRail      (btnNavPeople activo)
└── conMainPeople
    ├── lblPeopleTitle
    ├── lblPeopleSub
    ├── conPeopleHeaderRow   (título + botón contextual)
    ├── conPeopleTabs        (Usuarios | Equipos)
    ├── galUsers    (Visible: varPeopleTab = "users")
    └── galTeams    (Visible: varPeopleTab = "teams")
```

### `conMainPeople`

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

### Encabezado

```powerfx
lblPeopleTitle.Text:  "Personas y equipos"
lblPeopleTitle.Size:  23
lblPeopleTitle.FontWeight: FontWeight.Bold
lblPeopleTitle.Color: varStrong

lblPeopleSub.Text:  "Registro de las personas involucradas y los equipos que aportan a ideas e iniciativas."
lblPeopleSub.Size:  13
lblPeopleSub.Color: varMuted
```

### `conPeopleHeaderRow` (título + botón contextual)

```powerfx
LayoutDirection: LayoutDirection.Horizontal
AlignItems:      AlignItems.Center
Gap: 12

// Spacer flexible (varPeopleTitle ya está arriba)

// btnNewUser (Visible: varPeopleTab = "users")
Visible:      varPeopleTab = "users"
Text:         "+ Usuario"
Fill:         varAccent
Color:        varStrong
BorderRadius: 8
Height:       36
PaddingLeft:  16
PaddingRight: 16
OnSelect:     Set(varIsEditing, false); Navigate(scrUserForm, ScreenTransition.None)

// btnNewTeam (Visible: varPeopleTab = "teams")
Visible:      varPeopleTab = "teams"
Text:         "+ Equipo"
Fill:         varAccent
Color:        varStrong
BorderRadius: 8
Height:       36
PaddingLeft:  16
PaddingRight: 16
OnSelect:     Set(varIsEditing, false); Navigate(scrTeamForm, ScreenTransition.None)
```

### `conPeopleTabs`

```powerfx
LayoutDirection: LayoutDirection.Horizontal
Gap: 6

// btnTabUsers
Text:        "Usuarios"
Fill:        If(varPeopleTab = "users", RGBA(73,156,255,.15), Transparent())
Color:       If(varPeopleTab = "users", varAccent, varMuted)
BorderColor: If(varPeopleTab = "users", RGBA(73,156,255,.5), varBorder)
BorderThickness: 1
BorderRadius: 8
Height:      34
PaddingLeft: 16
PaddingRight: 16
FontWeight:  FontWeight.Semibold
OnSelect:    Set(varPeopleTab, "users")

// btnTabTeams
Text:        "Equipos"
// misma lógica para varPeopleTab = "teams"
OnSelect:    Set(varPeopleTab, "teams")
```

---

### Tab Usuarios: `galUsers`

```powerfx
Visible:       varPeopleTab = "users"
Items:         colUsers
WrapCount:     4
TemplateWidth: (Parent.Width - 64) / 4
TemplateHeight: 200
ShowScrollbar:  false
OnSelect:      Set(varSelectedUserId, ThisItem.ID); Navigate(scrUserDetail, ScreenTransition.None)
```

Template de tarjeta de usuario:

```powerfx
// conUserCard
Fill:        varBgCard
BorderColor: varBorder
BorderThickness: 1
BorderRadius: 12
PaddingTop:  20
PaddingLeft: 18
PaddingBottom: 18
PaddingRight: 18
LayoutDirection: LayoutDirection.Vertical
Gap: 8
AlignItems:  AlignItems.Center  // centrado vertical para el avatar

// conUserAvatar (42px circle, fondo degradado)
Width:        42
Height:       42
Fill:         RGBA(74,81,96,1)  // gris azulado
BorderRadius: 21
// lblUserInitials
Text:  Upper(Left(ThisItem.name,1) & If(!IsBlank(Find(" ",ThisItem.name)), Mid(ThisItem.name,Find(" ",ThisItem.name)+1,1), ""))
Color: varStrong
Size:  14
FontWeight: FontWeight.ExtraBold
Align: Align.Center

// conUserInfo (vertical, centrado)
// lblUserCardName
Text:       ThisItem.name
Size:       14
FontWeight: FontWeight.Bold
Color:      varStrong
Align:      Align.Center

// lblUserCardJob
Text:  ThisItem.job_title
Size:  12
Color: varMuted
Align: Align.Center

// conActiveIndicator (horizontal, AlignItems Center, Gap 5)
// rectActiveDot: Width 7, Height 7, BorderRadius 3.5
Fill: If(ThisItem.is_active, varSuccess, varMuted)
// lblActiveText: If(ThisItem.is_active, "Activo", "Inactivo")
Color: If(ThisItem.is_active, varSuccess, varMuted)
Size:  11.5
FontWeight: FontWeight.Semibold

// rectCardSep: Fill varBorder, Height 1, Width Parent.Width

// lblUserMicrosoft: ThisItem.microsoft_user
Color:      varAccent
Size:       11
FontFamily: "Consolas, monospace"

// lblUserEmail: ThisItem.email
Color: varMuted
Size:  11

// conTeamBadgesUser — galería de badges de equipos
// Usando Concat para mostrar una sola línea:
// lblUserTeams:
Concat(
    AddColumns(Filter(colUserTeam, user_id = ThisItem.ID),
        "teamName", LookUp(colTeams, ID=team_id).name,
        "allocPct", Text(Round(allocation*100, 0)) & "%"
    ),
    teamName & " " & allocPct,
    " · "
)
Color: varMuted
Size:  11
// (Si quieres badges individuales, usa una galería anidada con TemplateHeight 20)
```

---

### Tab Equipos: `galTeams`

```powerfx
Visible:       varPeopleTab = "teams"
Items:         colTeams
WrapCount:     3
TemplateWidth: (Parent.Width - 48) / 3
TemplateHeight: 190
ShowScrollbar:  false
OnSelect:      Set(varSelectedTeamId, ThisItem.ID); Navigate(scrTeamDetail, ScreenTransition.None)
```

Template de tarjeta de equipo:

```powerfx
// conTeamCard
Fill:        varBgCard
BorderColor: varBorder
BorderThickness: 1
BorderRadius: 12
PaddingTop:  18
PaddingLeft: 18
PaddingBottom: 18
PaddingRight: 18
LayoutDirection: LayoutDirection.Vertical
Gap: 10

// conTeamIcon (40px cuadrado redondeado)
Width:        40
Height:       40
Fill:         RGBA(73,156,255,.14)
BorderRadius: 10
// lblTeamIconInitials
Text:  Upper(Left(ThisItem.name,1) & If(!IsBlank(Find(" ",ThisItem.name)), Mid(ThisItem.name,Find(" ",ThisItem.name)+1,1), ""))
Color: varAccent
Size:  14
FontWeight: FontWeight.ExtraBold
Align: Align.Center

// lblTeamCardName
Text:       ThisItem.name
Size:       15
FontWeight: FontWeight.Bold
Color:      varStrong

// lblTeamCardDesc
Text:  Left(ThisItem.description, 60) & If(Len(ThisItem.description)>60, "...", "")
Size:  12
Color: varMuted

// rectTeamCardSep: Fill varBorder, Height 1

// conTeamStats (horizontal, gap 16)
// conTeamMembersStat (vertical, AlignItems Center)
//   lblTeamMembersVal: Text(CountRows(Filter(colUserTeam, team_id=ThisItem.ID)))  Size: 15  Bold  varStrong
//   lblTeamMembersLabel: "miembros"  Size: 10.5  varMuted
// conTeamInitsStat (vertical)
//   lblTeamInitsVal: Text(CountRows(Filter(colTeamInitiative, team_id=ThisItem.ID)))  Bold
//   lblTeamInitsLabel: "iniciativas"

// conAvatarStack — avatares apilados (máximo 4)
// Usar ForAll con posición calculada:
// galAvatarStack
Items:         FirstN(Filter(colUserTeam, team_id=ThisItem.ID), 4)
Layout:        Layout.Horizontal
TemplateWidth: 20   // overlap negativo no es nativo, se aproxima con TemplateWidth pequeño
TemplateHeight: 26
ShowScrollbar:  false
// Template:
// conMiniAvatar (26px circle)
Fill:         ColorValue("#3E4451")
BorderRadius: 13
Width:        26
Height:       26
// borde para separar avatares apilados:
BorderColor:  varBgCard
BorderThickness: 2
// lblMiniInitials:
With({u: LookUp(colUsers, ID=ThisItem.user_id)},
    If(IsBlank(u), "?",
        Upper(Left(u.name,1) & If(!IsBlank(Find(" ",u.name)), Mid(u.name,Find(" ",u.name)+1,1),""))
    )
)
Color: varStrong
Size:  9
FontWeight: FontWeight.Bold
Align: Align.Center
```

---

## PANTALLA 10: `scrUserDetail`

```
scrUserDetail
├── conHeader       (lblBreadcrumb.Text = "Personas › Usuario")
├── conNavRail      (btnNavPeople activo)
└── conMainUserDet
    ├── btnBackPeople
    ├── conUserDetHeader
    ├── conUserBodyGrid
    │   ├── conUserInfo       (datos Microsoft + correo + equipos)
    │   └── conUserActivity   (Ideas + Iniciativas)
    └── (sin acciones globales — todo inline)
```

### `OnVisible` de `scrUserDetail`

```powerfx
Set(varSelUser, LookUp(colUsers, ID = varSelectedUserId))
```

### `conMainUserDet`

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

### Navegación y encabezado

```powerfx
btnBackPeople.Text:     "← Volver a Personas"
btnBackPeople.OnSelect: Navigate(scrPeople, ScreenTransition.None)
btnBackPeople.Color:    varMuted
btnBackPeople.Fill:     Transparent()
btnBackPeople.Size:     13
```

### `conUserDetHeader`

```powerfx
LayoutDirection: LayoutDirection.Horizontal
AlignItems:      AlignItems.Center
Gap: 16

// conUserDetAvatar (56px circle)
Width:        56
Height:       56
Fill:         RGBA(62,68,81,.8)
BorderRadius: 28
// lblUserDetInitials
Text:  Upper(Left(varSelUser.name,1) & If(!IsBlank(Find(" ",varSelUser.name)), Mid(varSelUser.name,Find(" ",varSelUser.name)+1,1),""))
Color: varStrong
Size:  18
FontWeight: FontWeight.ExtraBold
Align: Align.Center

// conUserDetInfo (vertical)
// lblUserDetName: varSelUser.name  Size: 23  Bold  varStrong
// conUserDetMeta (horizontal, gap 10)
//   lblUserDetJob: varSelUser.job_title  Size: 13  varMuted
//   rectUserDetSep: Width 1, Height 14, Fill varBorder
//   conUserDetActive (horizontal, AlignItems Center, Gap 5)
//     rectActiveDot2: 7px circle, Fill If(varSelUser.is_active, varSuccess, varMuted)
//     lblUserDetActive: If(varSelUser.is_active, "Activo", "Inactivo")  Size: 12.5
//     Color: If(varSelUser.is_active, varSuccess, varMuted)

// Spacer

// btnEditUser
Text:     "Editar"
Fill:     Transparent()
Color:    varAccent
BorderColor: varAccent
BorderThickness: 1
BorderRadius: 8
Height:   34
PaddingLeft: 14
PaddingRight: 14
OnSelect: Set(varIsEditing, true); Navigate(scrUserForm, ScreenTransition.None)
```

### `conUserBodyGrid`

```powerfx
LayoutDirection: LayoutDirection.Horizontal
Gap: 16
```

#### Columna izquierda: `conUserInfoCol` (40%)

```powerfx
Width: (Parent.Width - 16) * 0.4
LayoutDirection: LayoutDirection.Vertical
Gap: 14

// ── Tarjeta Información ───────────────────────────────────
// conUserInfoCard
Fill:        varBgCard
BorderColor: varBorder
BorderRadius: 12
PaddingTop:  18
PaddingLeft: 20
PaddingBottom: 18
PaddingRight: 20
LayoutDirection: LayoutDirection.Vertical
Gap: 12

// "USUARIO MICROSOFT"
// lblMSLabel.Text: "USUARIO MICROSOFT"  Size: 11  Color: varMuted  FontWeight: Semibold
// lblMSValue: varSelUser.microsoft_user  Color: varAccent  FontFamily: "Consolas, monospace"  Size: 13  Bold

// rectUserInfoSep: Height 1, Fill varBorder

// "CORREO ELECTRÓNICO"
// lblEmailLabel.Text: "CORREO ELECTRÓNICO"
// lblEmailValue: varSelUser.email  Color: varText  Size: 13

// ── Tarjeta Equipos ───────────────────────────────────────
// conUserTeamsCard
Fill:        varBgCard
BorderColor: varBorder
BorderRadius: 12
PaddingTop:  18
PaddingLeft: 20
PaddingBottom: 18
PaddingRight: 20
LayoutDirection: LayoutDirection.Vertical
Gap: 12

// lblUserTeamsTitle.Text: "Equipos"  Size: 13  Bold  varStrong

// galUserTeams
Items:         Filter(colUserTeam, user_id = varSelectedUserId)
Layout:        Layout.Vertical
TemplateHeight: 44
ShowScrollbar:  false

// Template fila de equipo:
// conTeamRow (horizontal, AlignItems Center, Gap 10)
// conTeamNameInfo (vertical, Flexible)
//   lblUTName: LookUp(colTeams, ID=ThisItem.team_id).name  Size: 13  Bold  varStrong
//   lblUTAlloc: Text(Round(ThisItem.allocation*100,0)) & "% de dedicación"  Size: 11  varMuted
// conRoleBadge
Text:     ThisItem.team_role
Fill:     If(ThisItem.team_role="Líder", RGBA(73,156,255,.13), RGBA(138,147,162,.13))
Color:    If(ThisItem.team_role="Líder", varAccent, varMuted)
BorderColor: If(ThisItem.team_role="Líder", RGBA(73,156,255,.4), RGBA(138,147,162,.4))
BorderThickness: 1
BorderRadius: 6
PaddingLeft: 8
PaddingRight: 8
Size: 11.5
FontWeight: FontWeight.Semibold
Height: 22

// Mensaje si no tiene equipos:
// lblNoTeams.Text: "Sin equipos asignados."
// Visible: CountRows(Filter(colUserTeam, user_id=varSelectedUserId)) = 0
// Color: varMuted  Size: 12.5  Italic
```

#### Columna derecha: `conUserActivityCol` (60%)

```powerfx
Width: (Parent.Width - 16) * 0.6
LayoutDirection: LayoutDirection.Vertical
Gap: 14
```

**Tarjeta Ideas: `conUserIdeasCard`**

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

// conUserIdeasHeader (horizontal, AlignItems Center)
// lblUserIdeasTitle.Text: "Ideas aportadas"  Size: 13  Bold  varStrong  Flexible: true
// lblUserIdeasCount:
Text:  "(" & Text(CountRows(Filter(colUserIdea, user_id=varSelectedUserId))) & ")"
Color: varMuted  Size: 12.5

// galUserIdeas
Items:         Filter(colUserIdea, user_id = varSelectedUserId)
Layout:        Layout.Vertical
TemplateHeight: 56
ShowScrollbar:  false

// Template fila de idea:
// conIdeaItem
Fill:        varBgPrincipal
BorderColor: varBorder
BorderThickness: 1
BorderRadius: 8
PaddingTop:  10
PaddingLeft: 14
PaddingBottom: 10
PaddingRight: 14
LayoutDirection: LayoutDirection.Vertical
Gap: 3
OnSelect: Set(varSelectedIdeaId, ThisItem.idea_id); Navigate(scrIdeaDetail, ScreenTransition.None)

// lblUIdeaTitle: LookUp(colIdeas, ID=ThisItem.idea_id).title  Size: 12.5  Bold  varStrong
// lblUIdeaRole: ThisItem.idea_role  Size: 11  varMuted

// Mensaje si no tiene ideas:
// conNoIdeas
Visible: CountRows(Filter(colUserIdea, user_id=varSelectedUserId)) = 0
// lblNoIdeas.Text: "Sin ideas registradas."  Color: varMuted  Size: 12.5
```

**Tarjeta Iniciativas: `conUserInitsCard`**

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

// conUserInitsHeader
// lblUserInitsTitle.Text: "Iniciativas"  Size: 13  Bold  varStrong
// lblUserInitsCount: "(" & CountRows(...) & ")"

// galUserInits
Items:         Filter(colUserInitiative, user_id = varSelectedUserId)
Layout:        Layout.Vertical
TemplateHeight: 56
ShowScrollbar:  false

// Template fila de iniciativa:
// conInitItem
Fill:        varBgPrincipal
BorderColor: varBorder
BorderRadius: 8
PaddingTop:  10
PaddingLeft: 14
PaddingBottom: 10
PaddingRight: 14
LayoutDirection: LayoutDirection.Vertical
Gap: 3
OnSelect: Set(varSelectedInitId, ThisItem.initiative_id); Navigate(scrInitDetail, ScreenTransition.None)

// conInitItemTop (horizontal, gap 8)
// lblUInitCode: LookUp(colInitiatives, ID=ThisItem.initiative_id).code
//   FontFamily: "Consolas, monospace"  Color: varAccent  Size: 10.5
// lblUInitName: LookUp(colInitiatives, ID=ThisItem.initiative_id).name  Size: 12.5  Bold  varStrong
// lblUInitRole: ThisItem.initiative_role  Size: 11  varMuted

// Mensaje vacío:
Visible: CountRows(Filter(colUserInitiative, user_id=varSelectedUserId)) = 0
// lblNoInits.Text: "Sin iniciativas asignadas."  Color: varMuted
```

---

## PANTALLA 11: `scrTeamDetail`

```
scrTeamDetail
├── conHeader       (lblBreadcrumb.Text = "Personas › Equipo")
├── conNavRail      (btnNavPeople activo)
└── conMainTeamDet
    ├── btnBackPeople2
    ├── conTeamDetHeader
    ├── conTeamBodyGrid
    │   ├── conTeamMembersCard
    │   │   ├── galTeamMembers
    │   │   └── conAddMember
    │   └── conTeamInitsCard
```

### `OnVisible` de `scrTeamDetail`

```powerfx
Set(varSelTeam, LookUp(colTeams, ID = varSelectedTeamId))
```

### Encabezado

```powerfx
btnBackPeople2.Text:     "← Volver a Personas"
btnBackPeople2.OnSelect: Navigate(scrPeople, ScreenTransition.None)

// conTeamDetHeader (horizontal, AlignItems Center, Gap 16)

// conTeamDetIcon (52px cuadrado redondeado)
Width:        52
Height:       52
Fill:         RGBA(73,156,255,.14)
BorderRadius: 13
// lblTeamDetIconInitials
Text:  Upper(Left(varSelTeam.name,1) & If(!IsBlank(Find(" ",varSelTeam.name)), Mid(varSelTeam.name,Find(" ",varSelTeam.name)+1,1),""))
Color: varAccent
Size:  17
FontWeight: FontWeight.ExtraBold
Align: Align.Center

// conTeamDetInfo (vertical, Flexible)
// lblTeamDetName: varSelTeam.name  Size: 23  Bold  varStrong
// lblTeamDetDesc: varSelTeam.description  Size: 13  varMuted

// btnEditTeam
Text:     "Editar"
Fill:     Transparent()
Color:    varAccent
BorderColor: varAccent
BorderRadius: 8
Height:   34
OnSelect: Set(varIsEditing, true); Navigate(scrTeamForm, ScreenTransition.None)
```

### `conTeamBodyGrid`

```powerfx
LayoutDirection: LayoutDirection.Horizontal
Gap: 16
```

#### Tarjeta Miembros: `conTeamMembersCard` (60%)

```powerfx
Width: (Parent.Width - 16) * 0.6
Fill:        varBgCard
BorderColor: varBorder
BorderRadius: 12
PaddingTop:  18
PaddingLeft: 20
PaddingBottom: 18
PaddingRight: 20
LayoutDirection: LayoutDirection.Vertical
Gap: 14

// conMembersHeader (horizontal, AlignItems Center)
// lblMembersTitle.Text: "Miembros del equipo"  Size: 13  Bold  varStrong
// lblMembersCount: "(" & CountRows(Filter(colUserTeam, team_id=varSelectedTeamId)) & " personas)"  varMuted  Size: 12
```

**Galería `galTeamMembers`:**

```powerfx
Items:         Filter(colUserTeam, team_id = varSelectedTeamId)
Layout:        Layout.Vertical
TemplateHeight: 54
ShowScrollbar:  false
```

Template de fila de miembro:

```powerfx
// conMemberRow (horizontal, AlignItems Center, Gap 12)
// rectMemberDivider (separador): Height 1, Fill varBorder, Y 53, Width Parent.Width

// conMemberAvatar (32px circle)
Width:        32
Height:       32
Fill:         RGBA(62,68,81,.8)
BorderRadius: 16
// lblMemberInitials
With({u: LookUp(colUsers, ID=ThisItem.user_id)},
    If(IsBlank(u), "?",
        Upper(Left(u.name,1) & If(!IsBlank(Find(" ",u.name)), Mid(u.name,Find(" ",u.name)+1,1),""))
    )
)
Color: varStrong  Size: 10.5  FontWeight: FontWeight.Bold  Align: Align.Center

// conMemberInfo (vertical, Flexible)
// lblMemberName: LookUp(colUsers, ID=ThisItem.user_id).name  Size: 13  Bold  varStrong
// lblMemberJob:  LookUp(colUsers, ID=ThisItem.user_id).job_title  Size: 11  varMuted

// conMemberRoleBadge
Text:     ThisItem.team_role
Fill:     If(ThisItem.team_role="Líder", RGBA(73,156,255,.13), RGBA(138,147,162,.13))
Color:    If(ThisItem.team_role="Líder", varAccent, varMuted)
BorderColor: If(ThisItem.team_role="Líder", RGBA(73,156,255,.4), RGBA(138,147,162,.4))
BorderThickness: 1
BorderRadius: 6
PaddingLeft: 8
PaddingRight: 8
Height: 22
Size: 11.5

// lblMemberAlloc: Text(Round(ThisItem.allocation*100,0)) & "%"  Size: 12  varMuted  Width: 40

// btnRemoveMember (botón ×)
Text:  "×"
Fill:  Transparent()
Color: varMuted
HoverColor: varError
Size:  16
Width: 28
Height: 28
OnSelect:
    Remove(colUserTeam, ThisItem);
    Notify("Miembro removido del equipo")
```

**Sección Agregar Miembro: `conAddMember`**

```powerfx
// conAddMember (Visible si hay usuarios disponibles para agregar)
Visible: CountRows(Filter(colUsers,
    IsBlank(LookUp(colUserTeam, team_id = varSelectedTeamId && user_id = ID))
)) > 0

Fill:        varBgCard2
BorderColor: varBorder
BorderThickness: 1
BorderRadius: 10
PaddingTop:  14
PaddingLeft: 16
PaddingBottom: 14
PaddingRight: 16
LayoutDirection: LayoutDirection.Vertical
Gap: 10

// lblAddMemberTitle.Text: "Agregar miembro"  Size: 12.5  FontWeight: Bold  varStrong

// conAddMemberRow (horizontal, AlignItems Flex-End, Gap 10)

// drpMemberUser — Dropdown selector de usuario
Items:   Filter(colUsers, IsBlank(LookUp(colUserTeam, team_id = varSelectedTeamId && user_id = ID)))
Value:   "name"
Placeholder: "Selecciona usuario…"
Fill:    varBgCard
BorderColor: varBorder
Color:   varStrong
Width:   220
Height:  36

// drpMemberRole — Dropdown rol
Items:   ["Líder", "Miembro"]
Default: "Miembro"
Width:   110
Height:  36
Fill:    varBgCard
BorderColor: varBorder
Color:   varStrong

// conAllocInput (vertical)
// lblAllocLabel.Text: "Dedic. %"  Size: 11  varMuted
// txtMemberAlloc
Default: "100"
Mode:    TextMode.SingleLine
Width:   70
Height:  36
Fill:    varBgCard
BorderColor: varBorder
Color:   varStrong

// btnAddMember
Text:     "Agregar"
Fill:     varAccent
Color:    varStrong
BorderRadius: 8
Width:    90
Height:   36
OnSelect:
    If(IsBlank(drpMemberUser.Selected),
        Notify("Selecciona un usuario", NotificationType.Error),
        Collect(colUserTeam, {
            ID:        Max(colUserTeam, ID) + 1,
            user_id:   drpMemberUser.Selected.ID,
            team_id:   varSelectedTeamId,
            team_role: drpMemberRole.Selected.Value,
            allocation: Value(txtMemberAlloc.Text) / 100
        });
        Reset(drpMemberUser);
        Reset(txtMemberAlloc);
        Notify("Miembro agregado al equipo ✓", NotificationType.Success)
    )
```

#### Tarjeta Iniciativas del Equipo: `conTeamInitsCard` (40%)

```powerfx
Width: (Parent.Width - 16) * 0.4
Fill:        varBgCard
BorderColor: varBorder
BorderRadius: 12
PaddingTop:  18
PaddingLeft: 20
PaddingBottom: 18
PaddingRight: 20
LayoutDirection: LayoutDirection.Vertical
Gap: 12

// lblTeamInitsTitle.Text: "Iniciativas del equipo"  Size: 13  Bold  varStrong

// Mensaje vacío:
Visible: CountRows(Filter(colTeamInitiative, team_id=varSelectedTeamId)) = 0
// lblNoTeamInits.Text: "Sin iniciativas asignadas a este equipo."  varMuted  Size: 12.5

// galTeamInits
Items:         Filter(colTeamInitiative, team_id = varSelectedTeamId)
Layout:        Layout.Vertical
TemplateHeight: 60
ShowScrollbar:  false
OnSelect:      Set(varSelectedInitId, ThisItem.initiative_id); Navigate(scrInitDetail, ScreenTransition.None)

// Template fila de iniciativa:
// conTInitItem
Fill:        varBgPrincipal
BorderColor: varBorder
BorderRadius: 8
PaddingTop:  10
PaddingLeft: 14
PaddingBottom: 10
PaddingRight: 14
LayoutDirection: LayoutDirection.Vertical
Gap: 4

// conTInitTop (horizontal, AlignItems Center, Gap 8)
// lblTInitCode: LookUp(colInitiatives, ID=ThisItem.initiative_id).code  FontFamily: Consolas  varAccent  Size: 10.5
// conImpactBadge
Text:  ThisItem.impact_type
Fill:  RGBA(138,147,162,.1)
Color: varMuted
BorderColor: RGBA(138,147,162,.35)
BorderRadius: 5
PaddingLeft: 6
PaddingRight: 6
Size: 10.5

// lblTInitName: LookUp(colInitiatives, ID=ThisItem.initiative_id).name  Bold  varStrong  Size: 12.5
```

---

## PANTALLA 12: `scrUserForm`

```
scrUserForm
├── conHeader   (lblBreadcrumb dinámico: "Nuevo usuario" / "Editar usuario")
├── conNavRail  (btnNavPeople activo)
└── conMainUserForm
    ├── btnCancelUser
    ├── lblUserFormTitle
    ├── lblUserFormSub
    └── conUserFields
        ├── txtUserName
        ├── txtUserMicrosoft
        ├── txtUserJob
        ├── txtUserEmail
        ├── btnUserActive
        └── conUserFormButtons
```

### `OnVisible` de `scrUserForm`

```powerfx
Set(varUserActive,
    If(varIsEditing,
        LookUp(colUsers, ID=varSelectedUserId).is_active,
        true
    )
)
```

### `conMainUserForm`

```powerfx
X: 84  Y: 58
Width:  Min(Parent.Width - 84, 680)
X:      84 + ((Parent.Width - 84 - Self.Width) / 2)
Height: Parent.Height - 58
OverflowY: OverflowY.Auto
PaddingTop: 36
PaddingLeft: 40
PaddingRight: 40
PaddingBottom: 40
LayoutDirection: LayoutDirection.Vertical
Gap: 8
```

### Encabezado

```powerfx
btnCancelUser.Text:     "← Cancelar"
btnCancelUser.OnSelect: If(varIsEditing, Navigate(scrUserDetail), Navigate(scrPeople))
btnCancelUser.Fill:     Transparent()
btnCancelUser.Color:    varMuted
btnCancelUser.Size:     13

lblUserFormTitle.Text:  If(varIsEditing, "Editar usuario", "Nuevo usuario")
lblUserFormTitle.Size:  23
lblUserFormTitle.FontWeight: FontWeight.Bold
lblUserFormTitle.Color: varStrong

lblUserFormSub.Text:  "Los datos se guardan en la lista Usuarios de SharePoint."
lblUserFormSub.Color: varMuted
lblUserFormSub.Size:  13
```

### Campos del formulario

```powerfx
// Estilos de input:
// Fill: varBgCard, BorderColor: varBorder, BorderRadius: 8, Color: varStrong, Size: 13.5
// FocusedBorderColor: varAccent, FocusedBorderThickness: 2

// 1. NOMBRE COMPLETO
// lblUserNameLbl.Text: "NOMBRE COMPLETO"
// txtUserName
Default:  If(varIsEditing, LookUp(colUsers, ID=varSelectedUserId).name, "")
HintText: "Nombre y apellido completo"
Mode:     TextMode.SingleLine

// 2. USUARIO MICROSOFT
// lblUserMicrosoftLbl.Text: "USUARIO MICROSOFT"
// txtUserMicrosoft
Default:  If(varIsEditing, LookUp(colUsers, ID=varSelectedUserId).microsoft_user, "")
HintText: "Auto (AD-00X) si se deja vacío"
FontFamily: "Consolas, monospace"
Color:    varAccent

// 3. CARGO
// lblUserJobLbl.Text: "CARGO"
// txtUserJob
Default:  If(varIsEditing, LookUp(colUsers, ID=varSelectedUserId).job_title, "")
HintText: "Ej. Software Engineer"

// 4. CORREO ELECTRÓNICO
// lblUserEmailLbl.Text: "CORREO ELECTRÓNICO"
// txtUserEmail
Default:  If(varIsEditing, LookUp(colUsers, ID=varSelectedUserId).email, "")
HintText: "persona@empresa.com"

// 5. ESTADO ACTIVO (Toggle button)
// lblUserActiveLbl.Text: "ESTADO DEL USUARIO"
// btnUserActive
Text:        If(varUserActive, "✓ Activo", "Inactivo")
Fill:        If(varUserActive, RGBA(104,161,107,.16), varBgPrincipal)
Color:       If(varUserActive, varSuccess, varMuted)
BorderColor: If(varUserActive, varSuccess, varBorder)
BorderThickness: 1
BorderRadius: 8
Height:      36
PaddingLeft: 16
PaddingRight: 16
FontWeight:  FontWeight.Semibold
OnSelect:    Set(varUserActive, !varUserActive)
```

### Botones de acción

```powerfx
// conUserFormButtons (horizontal, gap 10, JustifyContent End, PaddingTop 16)

// btnCancelUser2
Text:         "Cancelar"
Fill:         Transparent()
Color:        varMuted
BorderColor:  varBorder
BorderRadius: 8
Height:       38
PaddingLeft:  18
PaddingRight: 18
OnSelect:     If(varIsEditing, Navigate(scrUserDetail), Navigate(scrPeople))

// btnSaveUser
Text:     If(varIsEditing, "Guardar cambios", "Crear usuario")
Fill:     varAccent
Color:    varStrong
BorderRadius: 8
Height:   38
PaddingLeft: 20
PaddingRight: 20
OnSelect:
    If(IsBlank(txtUserName.Text),
        Notify("Falta el nombre del usuario", NotificationType.Error),
        If(varIsEditing,
            // ─── EDITAR ──────────────────────────────────
            Patch(colUsers, LookUp(colUsers, ID = varSelectedUserId), {
                name:           txtUserName.Text,
                microsoft_user: txtUserMicrosoft.Text,
                job_title:      txtUserJob.Text,
                email:          txtUserEmail.Text,
                is_active:      varUserActive
            });
            Navigate(scrUserDetail, ScreenTransition.None);
            Notify("Usuario guardado en SharePoint ✓", NotificationType.Success),
            // ─── CREAR NUEVO ─────────────────────────────
            Set(varNewUserId, Max(colUsers, ID) + 1);
            Collect(colUsers, {
                ID:             varNewUserId,
                name:           txtUserName.Text,
                microsoft_user: If(
                    IsBlank(txtUserMicrosoft.Text),
                    "AD-" & Text(varNewUserId, "000"),
                    txtUserMicrosoft.Text
                ),
                job_title:  txtUserJob.Text,
                email:      txtUserEmail.Text,
                is_active:  varUserActive
            });
            Set(varSelectedUserId, varNewUserId);
            Navigate(scrUserDetail, ScreenTransition.None);
            Notify("Usuario creado en SharePoint ✓", NotificationType.Success)
        )
    )
```

---

## PANTALLA 13: `scrTeamForm`

```
scrTeamForm
├── conHeader   (lblBreadcrumb dinámico)
├── conNavRail  (btnNavPeople activo)
└── conMainTeamForm
    ├── btnCancelTeam
    ├── lblTeamFormTitle
    ├── lblTeamFormSub
    └── conTeamFields
        ├── txtTeamName
        ├── txtTeamDesc
        ├── btnTeamActive
        └── conTeamFormButtons
```

### `OnVisible` de `scrTeamForm`

```powerfx
Set(varTeamActive,
    If(varIsEditing,
        LookUp(colTeams, ID=varSelectedTeamId).is_active,
        true
    )
)
```

### `conMainTeamForm`

```powerfx
X: 84  Y: 58
Width:  Min(Parent.Width - 84, 680)
X:      84 + ((Parent.Width - 84 - Self.Width) / 2)
Height: Parent.Height - 58
OverflowY: OverflowY.Auto
PaddingTop: 36
PaddingLeft: 40
PaddingRight: 40
PaddingBottom: 40
LayoutDirection: LayoutDirection.Vertical
Gap: 8
```

### Encabezado

```powerfx
btnCancelTeam.Text:     "← Cancelar"
btnCancelTeam.OnSelect: If(varIsEditing, Navigate(scrTeamDetail), Navigate(scrPeople))
btnCancelTeam.Fill:     Transparent()
btnCancelTeam.Color:    varMuted

lblTeamFormTitle.Text:  If(varIsEditing, "Editar equipo", "Nuevo equipo")
lblTeamFormTitle.Size:  23
lblTeamFormTitle.FontWeight: FontWeight.Bold
lblTeamFormTitle.Color: varStrong

lblTeamFormSub.Text:  "Los datos se guardan en la lista Equipos de SharePoint."
lblTeamFormSub.Color: varMuted
lblTeamFormSub.Size:  13
```

### Campos del formulario

```powerfx
// 1. NOMBRE DEL EQUIPO
// lblTeamNameLbl.Text: "NOMBRE DEL EQUIPO"
// txtTeamName
Default:  If(varIsEditing, LookUp(colTeams, ID=varSelectedTeamId).name, "")
HintText: "Ej. CoE IA"
Mode:     TextMode.SingleLine
Fill:     varBgCard
BorderColor: varBorder
Color:    varStrong
BorderRadius: 8

// 2. DESCRIPCIÓN
// lblTeamDescLbl.Text: "DESCRIPCIÓN"
// txtTeamDesc
Mode:     TextMode.MultiLine
Height:   100
Default:  If(varIsEditing, LookUp(colTeams, ID=varSelectedTeamId).description, "")
HintText: "Propósito del equipo"
Fill:     varBgCard
BorderColor: varBorder

// 3. ESTADO ACTIVO (Toggle)
// btnTeamActive
Text:        If(varTeamActive, "✓ Activo", "Inactivo")
Fill:        If(varTeamActive, RGBA(104,161,107,.16), varBgPrincipal)
Color:       If(varTeamActive, varSuccess, varMuted)
BorderColor: If(varTeamActive, varSuccess, varBorder)
BorderThickness: 1
BorderRadius: 8
Height:      36
PaddingLeft: 16
PaddingRight: 16
FontWeight:  FontWeight.Semibold
OnSelect:    Set(varTeamActive, !varTeamActive)
```

### Botones de acción

```powerfx
// conTeamFormButtons (horizontal, gap 10, JustifyContent End)

// btnCancelTeam2
Text:         "Cancelar"
Fill:         Transparent()
Color:        varMuted
BorderColor:  varBorder
BorderRadius: 8
Height:       38
OnSelect:     If(varIsEditing, Navigate(scrTeamDetail), Navigate(scrPeople))

// btnSaveTeam
Text:     If(varIsEditing, "Guardar cambios", "Crear equipo")
Fill:     varAccent
Color:    varStrong
BorderRadius: 8
Height:   38
PaddingLeft: 20
PaddingRight: 20
OnSelect:
    If(IsBlank(txtTeamName.Text),
        Notify("Falta el nombre del equipo", NotificationType.Error),
        If(varIsEditing,
            // ─── EDITAR ──────────────────────────────────
            Patch(colTeams, LookUp(colTeams, ID = varSelectedTeamId), {
                name:        txtTeamName.Text,
                description: txtTeamDesc.Text,
                is_active:   varTeamActive
            });
            Navigate(scrTeamDetail, ScreenTransition.None);
            Notify("Equipo guardado en SharePoint ✓", NotificationType.Success),
            // ─── CREAR NUEVO ─────────────────────────────
            Set(varNewTeamId, Max(colTeams, ID) + 1);
            Collect(colTeams, {
                ID:          varNewTeamId,
                name:        txtTeamName.Text,
                description: txtTeamDesc.Text,
                is_active:   varTeamActive
            });
            Set(varSelectedTeamId, varNewTeamId);
            Navigate(scrTeamDetail, ScreenTransition.None);
            Notify("Equipo creado en SharePoint ✓", NotificationType.Success)
        )
    )
```

---

## Resumen de Pantallas Generadas

| # | Pantalla | Archivo | Estado |
|---|----------|---------|--------|
| — | Listas SharePoint + App.OnStart + Datos de prueba | `Guia_00_Setup.md` | ✅ |
| 1 | `scrDashboard` | `Guia_01_Dashboard_Ideas.md` | ✅ |
| 2 | `scrIdeas` | `Guia_01_Dashboard_Ideas.md` | ✅ |
| 3 | `scrIdeaDetail` | `Guia_01_Dashboard_Ideas.md` | ✅ |
| 4 | `scrIdeaForm` | `Guia_01_Dashboard_Ideas.md` | ✅ |
| 5 | `scrInitiatives` | `Guia_02_Iniciativas_Aprobacion.md` | ✅ |
| 6 | `scrInitDetail` | `Guia_02_Iniciativas_Aprobacion.md` | ✅ |
| 7 | `scrInitForm` | `Guia_02_Iniciativas_Aprobacion.md` | ✅ |
| 8 | `scrApproval` | `Guia_02_Iniciativas_Aprobacion.md` | ✅ |
| 9 | `scrPeople` | `Guia_03_Personas.md` | ✅ |
| 10 | `scrUserDetail` | `Guia_03_Personas.md` | ✅ |
| 11 | `scrTeamDetail` | `Guia_03_Personas.md` | ✅ |
| 12 | `scrUserForm` | `Guia_03_Personas.md` | ✅ |
| 13 | `scrTeamForm` | `Guia_03_Personas.md` | ✅ |
