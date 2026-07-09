# User Flow: IdeaHub IA 
**Centro de Excelencia (CoE) IA · NTT DATA**

Este documento describe el ciclo de vida completo de una propuesta dentro de la plataforma IdeaHub IA, desde su concepción como "Idea" hasta su consolidación como "Iniciativa" de automatización formal.

---

## Fase 1: Ideación y Registro
* **Actor Principal:** Cualquier usuario con rol de *Miembro*.
* **Pantallas Involucradas:** `scrDashboard` / `scrIdeas` ➔ `scrIdeaForm`.

**Flujo de pasos:**
1. El usuario ingresa a la aplicación y navega al panel de Ideas o al Dashboard.
2. Selecciona la acción **"+ Nueva idea"**.
3. Completa el formulario registrando:
   * Título corto.
   * "Qué es lo que duele hoy" (Descripción del problema actual).
   * "Cómo se lo imaginan resuelto" (Solución propuesta).
4. Al guardar, la idea ingresa al sistema y se almacena en SharePoint con el estado por defecto: **`Nueva`**.

---

## Fase 2: Triage y Agendamiento de Sesión
* **Actor Principal:** Sistema Automático + *Revisor de Ideas*.
* **Pantallas Involucradas:** `scrApproval` / Notificaciones externas (Teams/Outlook).

**Flujo de pasos:**
1. El sistema automatizado (Power Automate) detecta la idea nueva y notifica al equipo de revisores del CoE IA.
2. Un *Revisor de Ideas* disponible toma el caso y actualiza el estado de la idea a **`En Revisión`**.
3. El revisor pacta una fecha y hora (`review_meeting_date`) para reunirse con el autor (o autores) con el objetivo de indagar y recolectar mayor información técnica y de negocio.

---

## Fase 3: Evaluación y Veredicto
* **Actor Principal:** *Revisor de Ideas*.
* **Pantallas Involucradas:** `scrApproval` o `scrIdeaDetail`.

**Flujo de pasos:**
1. Se ejecuta la reunión de evaluación entre el autor y el revisor.
2. El revisor ingresa al módulo de Aprobación de la aplicación.
3. Redacta las conclusiones de la sesión en el campo de notas (`review_notes`).
4. Toma la decisión final:
   * **No factible:** Rechaza la idea (el estado cambia a **`Rechazada`**).
   * **Factible:** Aprueba la idea (el estado cambia a **`Aprobada`**).

---

## Fase 4: Formalización a Iniciativa
* **Actor Principal:** *Revisor de Ideas*.
* **Pantallas Involucradas:** `scrIdeaDetail` ➔ `scrInitForm`.

**Flujo de pasos:**
1. Dado que el revisor posee el contexto completo tras la sesión, es el único encargado de formalizar la idea en una Iniciativa de automatización.
2. Desde el detalle de la idea aprobada, ejecuta la acción **"Convertir en iniciativa"**.
3. La aplicación abre el formulario de iniciativa pre-llenando la descripción y el problema base.
4. El revisor enriquece el registro con información técnica y métricas de impacto:
   * Volumen de transacciones manuales al mes.
   * FTE (Full-Time Equivalent) estimado a ahorrar.
   * Nivel de complejidad y prioridad.
   * Sistemas involucrados (ej. SAP, Salesforce, Splunk).
   * Capacidades de IA requeridas (NLP, LLM, OCR, Agentes, etc.).
5. Al guardar, se crea la Iniciativa y el sistema registra automáticamente el vínculo de trazabilidad (tabla `idea_initiative`) entre la Idea original y esta nueva Iniciativa.

---

## Fase 5: Asignación de Recursos (Staffing)
* **Actor Principal:** *Líder* o *Revisor de Ideas*.
* **Pantallas Involucradas:** `scrInitDetail` ➔ Módulos relacionales.

**Flujo de pasos:**
1. Con la iniciativa formalizada, se procede a estructurar el equipo de trabajo.
2. **Asignación de Equipos (`team_initiative`):** Se asocian las áreas involucradas asignándoles roles macro como `Beneficiario`, `Equipo Desarrollador` o `Soporte`.
3. **Asignación de Personas (`user_initiative`):** Se seleccionan usuarios específicos para ejecutar el proyecto, otorgándoles roles operativos precisos: `Dueño del Proceso`, `Validador Interno`, `Validador Externo`, `Analista Funcional`, `Líder Técnico` y `Desarrollador`.

---

## Fase 6: Ciclo de Vida y Monitoreo
* **Actor Principal:** Todos los roles / Líderes del CoE IA.
* **Pantallas Involucradas:** `scrDashboard`, `scrInitiatives`, `scrPeople`.

**Flujo de pasos:**
1. A medida que el proyecto avanza, los estados de la iniciativa se actualizan a lo largo de su ciclo de vida: **`Análisis`**, **`En Desarrollo`**, **`Listo`**, o **`Cancelada`**.
2. El tablero de control principal refleja en tiempo real el progreso del portafolio, mostrando gráficas de embudo de ideas, total de iniciativas activas y el cálculo dinámico del impacto proyectado en el negocio (ej. FTE total ahorrado).