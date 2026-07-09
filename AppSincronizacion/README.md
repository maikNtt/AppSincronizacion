# CoE IA Sync App (MVP)

Este proyecto es un prototipo desechable (MVP) diseñado para validar el flujo de usuario (UX) de una futura aplicación construida en **Power Apps Canvas App** + **SharePoint Lists**.

El objetivo de este prototipo es definir visualmente cada pantalla e iterar con usuarios reales antes de iniciar el desarrollo en la plataforma de Microsoft.

## Stack Tecnológico

- **React 18** + **Vite** (Simula el comportamiento interactivo de una Canvas App)
- **Fluent UI v9** (`@fluentui/react-components`) (Design System oficial de Microsoft 365 / Power Apps)
- **Datos mock en localStorage** (Simula las operaciones CRUD contra SharePoint Lists)
- **Context API** (Simula variables globales y navegación con `Navigate()` de Power Apps)

## Restricciones y Paridad

Para asegurar que todo lo diseñado aquí sea 100% replicable en Power Apps sin componentes pro-code (PCF):
- No se usan websockets.
- El kanban **no usa drag-and-drop**; se utilizan botones de "Mover a".
- La navegación sigue el patrón de Screens y no rutas anidadas de React Router.
- Los comentarios en el código incluyen la anotación `// PARIDAD POWER APPS:` detallando qué control nativo o función se utilizará en la versión final.

## Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo
npm run dev
```

> **Nota sobre los datos:** Al iniciar por primera vez, la aplicación cargará datos de prueba desde archivos JSON y los guardará en `localStorage`. Cualquier cambio realizado persistirá en el navegador. Puedes resetear los datos desde el botón en la barra superior.

## Perfiles de Prueba

La pantalla de inicio simula la función `User().Email`. Puedes seleccionar uno de estos perfiles para probar distintos niveles de acceso:

1. **Laura Sánchez (Desarrollo - admin - CoE IA):** Acceso total a todas las áreas y funciones.
2. **Ana García (Mantenimiento - admin):** Puede gestionar iniciativas y cambiar estados, pero solo ve su área.
3. **Juan Martínez (QA - miembro):** Solo lectura de kanban/backlog; puede registrar nuevas ideas.
