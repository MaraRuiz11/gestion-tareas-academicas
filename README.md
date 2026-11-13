# 📚 Sistema de Gestión de Tareas Académicas

<p align="center">
  <img src="assets/img/logo.png" alt="Logo del proyecto" width="120">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
  <img src="https://img.shields.io/badge/LocalStorage-4F46E5?style=for-the-badge&logo=databricks&logoColor=white">
</p>

---

## 🧾 Descripción general

El **Sistema de Gestión de Tareas Académicas** es una aplicación web que permite a los estudiantes de SENATI organizar sus actividades académicas (tareas, cursos, fechas de entrega y prioridades) de manera sencilla, moderna y completamente en el navegador.

Toda la información se guarda localmente en el navegador mediante **LocalStorage**, por lo que no requiere servidor ni base de datos.

---

## ❓ Planteamiento del problema

Los estudiantes de segundo ciclo suelen manejar múltiples cursos y entregas simultáneas. La falta de una herramienta centralizada provoca:

- Olvido de fechas de entrega.
- Desorganización en las prioridades.
- Baja visibilidad del avance real de sus tareas.

No todos los estudiantes cuentan con herramientas pagas o con conexión permanente a internet.

---

## 💡 Justificación

Se propone una aplicación web **ligera, gratuita y offline** que:

- Se ejecuta directamente en el navegador.
- No requiere instalación ni servidor.
- Usa tecnologías vistas en clase (HTML5, CSS3, JS, Bootstrap 5).
- Refuerza conceptos de programación modular, validación y persistencia con LocalStorage.

---

## 🎯 Objetivo general

Desarrollar una aplicación web para la gestión de tareas académicas que permita registrar, editar, eliminar, clasificar y filtrar actividades, aplicando buenas prácticas de desarrollo frontend.

### Objetivos específicos

1. Diseñar una interfaz moderna y responsive con Bootstrap 5.
2. Implementar operaciones CRUD de tareas.
3. Clasificar tareas por curso, prioridad y estado.
4. Filtrar tareas por curso, prioridad, estado y fecha.
5. Persistir los datos mediante LocalStorage.
6. Generar estadísticas visuales del progreso académico.
7. Documentar el proyecto con un README profesional.

---

## 📦 Alcance del proyecto

**Incluye:**
- Dashboard con contadores y próximas entregas.
- Registro y edición de tareas.
- Eliminación con confirmación.
- Filtros combinados.
- Estadísticas por curso y prioridad.
- Persistencia local (LocalStorage).

**No incluye:**
- Autenticación de usuarios.
- Sincronización en la nube.
- Notificaciones push.
- Backend o base de datos remota.

---

## 🛠️ Tecnologías utilizadas

| Tecnología     | Uso                                    |
|----------------|----------------------------------------|
| HTML5          | Estructura del contenido               |
| CSS3           | Estilos personalizados                 |
| JavaScript     | Lógica de la aplicación (ES6)          |
| Bootstrap 5    | Diseño responsive y componentes        |
| Bootstrap Icons| Iconografía                            |
| LocalStorage   | Persistencia de datos en el navegador  |

---

## ⚙️ Requisitos de instalación

- Un navegador moderno (Chrome, Firefox, Edge).
- Editor de código recomendado: **Visual Studio Code**.
- Extensión opcional: **Live Server**.
- No requiere Node.js ni servidores.

---

## 🗂️ Estructura de carpetas

```
gestion-tareas-academicas/
├── index.html
├── tareas.html
├── estadisticas.html
├── README.md
├── .gitignore
├── assets/
│   └── img/
├── css/
│   └── styles.css
└── js/
    ├── storage.js
    ├── validaciones.js
    ├── tareas.js
    ├── dashboard.js
    └── estadisticas.js
```

---

## 🚀 Instalación y ejecución paso a paso

### Opción 1: Abrir directamente

1. Descarga o clona el repositorio.
2. Abre la carpeta `gestion-tareas-academicas`.
3. Haz doble clic en `index.html`.
4. La aplicación se abrirá en tu navegador.

### Opción 2: Con Live Server (recomendado)

1. Abre la carpeta en **Visual Studio Code**.
2. Instala la extensión **Live Server**.
3. Clic derecho sobre `index.html` → *Open with Live Server*.

### Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/gestion-tareas-academicas.git
cd gestion-tareas-academicas
```

---

## 🧩 Funcionamiento de los módulos

### 1. Dashboard (`index.html`)
Muestra contadores (total, pendientes, completadas, vencidas) y las próximas 5 entregas.

### 2. Registro de tareas (`tareas.html`)
Formulario validado con título, curso, fecha, prioridad, estado y descripción.

### 3. Edición y eliminación
- Botón ✏️ carga la tarea en el formulario.
- Botón 🗑️ abre un modal de confirmación.

### 4. Clasificación por cursos
Cada tarea pertenece a un curso seleccionable.

### 5. Control de pendientes y completadas
Botón 🔁 alterna el estado con un clic.

### 6. Filtros
Combinables por curso, prioridad, estado y fecha.

### 7. Estadísticas (`estadisticas.html`)
Barras de progreso por curso y prioridad, además del progreso general.

---

## 📸 Capturas de pantalla

| Dashboard | Tareas | Estadísticas |
|-----------|--------|--------------|
| ![](assets/img/screenshots/dashboard.png) | ![](assets/img/screenshots/tareas.png) | ![](assets/img/screenshots/estadisticas.png) |

> Reemplaza estos archivos con capturas reales de tu aplicación.

---

## 🧪 Pruebas realizadas

| N° | Prueba | Resultado |
|----|--------|-----------|
| 1 | Registrar tarea con campos vacíos | ❌ Validación bloquea |
| 2 | Registrar tarea completa | ✅ Se guarda en LocalStorage |
| 3 | Editar tarea existente | ✅ Se actualiza correctamente |
| 4 | Eliminar tarea | ✅ Se elimina con confirmación |
| 5 | Filtrar por curso | ✅ Filtra correctamente |
| 6 | Filtrar por prioridad | ✅ Filtra correctamente |
| 7 | Combinar filtros | ✅ Funciona en conjunto |
| 8 | Recargar la página | ✅ Los datos persisten |
| 9 | Ver estadísticas | ✅ Se reflejan los cambios |
| 10 | Uso en móvil | ✅ Diseño responsive |

---

## 📊 Resultados obtenidos

- CRUD de tareas 100% funcional.
- Datos persistentes entre sesiones.
- Interfaz responsiva en móviles y escritorio.
- Estadísticas en tiempo real.
- Código modular y reutilizable.

---

## ✅ Conclusiones

- Se aplicaron los conceptos de HTML5, CSS3, JavaScript, Bootstrap 5 y LocalStorage.
- Se reforzó la programación modular separando `storage`, `validaciones`, `tareas`, `dashboard` y `estadisticas`.
- LocalStorage es una excelente solución para proyectos pequeños sin backend.
- El proyecto es escalable: podría migrarse a Firebase o Node.js en el futuro.

---

## 👤 Autor

**Nombre:** [Tu Nombre Completo]  
**Carrera:** Ingeniería de Software con Inteligencia Artificial  
**Institución:** SENATI – Segundo Ciclo  
**Año:** 2025

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Puedes usarlo, modificarlo y compartirlo libremente citando al autor.

---

## 📤 Cómo publicar en GitHub

```bash
# 1. Inicializar repositorio
git init

# 2. Agregar archivos
git add .

# 3. Primer commit
git commit -m "feat: primera versión del sistema de tareas"

# 4. Cambiar rama a main
git branch -M main

# 5. Conectar con GitHub (crea antes el repo vacío)
git remote add origin https://github.com/tu-usuario/gestion-tareas-academicas.git

# 6. Subir
git push -u origin main
```

Luego entra a **GitHub → Settings → Pages** para activar GitHub Pages si quieres publicarlo online.