[![Playwright Tests](https://github.com/dj-luis198/Playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/dj-luis198/Playwright/actions/workflows/playwright.yml)

[Ver reporte](https://dj-luis198.github.io/Playwright/)

# 🚀 Proyecto de Automatización con Playwright

Este proyecto establece la **base de pruebas automatizadas** usando [Playwright](https://playwright.dev/) con el patrón **Page Object Model (POM)**, helpers reutilizables y bloqueo de anuncios para mayor estabilidad y velocidad.
Pagina de pruebas https://demoqa.com
---

## 📂 Estructura del proyecto

```bash
proyecto/
├── pages/                # Page Objects (POM)
│   ├── LoginPage.js       # Acciones y locators de la página de login
│   └── ProfilePage.js     # Acciones y locators de la página de perfil
│
├── tests/                # Carpeta de pruebas
│   └── login_test.spec.js # Test de login usando POM
│
├── utils/                # Helpers reutilizables
│   ├── adsBlocker.js      # Bloqueo de anuncios y trackers
│   └── helpers.js         # Validaciones para paginas lentas con muchos anuncios.
│
├── setup.js               # Extensión global de Playwright (bloqueo de anuncios en todos los tests)
├── playwright.config.js   # Configuración global de Playwright
├── .env                  # Variables de entorno (ej. credenciales de prueba)
└── README.md              # Documentación del proyecto

```
---

## 🧩 Componentes principales

### 1. **Page Objects (POM)**
- Encapsulan **locators** y **acciones** de cada página.
- Ejemplo: `LoginPage.js` contiene métodos como `goto()`, `login()`, `logout()`.
- Los tests solo llaman métodos de alto nivel y hacen validaciones con `expect`.

### 2. **Tests**
- Usan los Page Objects para describir flujos de negocio.
- Ejemplo: `login_test.spec.js` valida un login exitoso y logout correcto.
- `expect` se usa **solo en los tests**, no dentro de los POM.

### 3. **Helpers**
- Funciones reutilizables para lógica común.
- Ejemplo: `adsBlocker.js` intercepta requests y bloquea anuncios/trackers.

### 4. **Setup global**
- `setup.js` extiende Playwright para aplicar el bloqueo de anuncios en todos los tests automáticamente.
- Así no es necesario importar el helper en cada archivo.

### 5. **Configuración**
- `playwright.config.js` define opciones globales como `baseURL`, `navigationTimeout`, etc.
- `.env` guarda credenciales y datos sensibles para no hardcodearlos en los tests.

---

## 🚀 Flujo de ejecución

1. Playwright inicializa el entorno de pruebas.  
2. `setup.js` aplica el bloqueo de anuncios global.  
3. El test (`login_test.spec.js`) usa los Page Objects (`LoginPage`, `ProfilePage`).  
4. Se ejecutan las acciones (`goto`, `login`, `logout`).  
5. Se validan los resultados con `expect`.  
6. Playwright cierra automáticamente el contexto y el navegador al finalizar.

---

## ✅ Ventajas de esta base

- **Claridad**: separación entre acciones (POM) y validaciones (tests).  
- **Reutilización**: helpers centralizados para lógica común.  
- **Estabilidad**: bloqueo de anuncios y trackers evita flakiness.  
- **Escalabilidad**: fácil agregar nuevas páginas (`DashboardPage`, `SettingsPage`, etc.) y nuevos tests.  

---

## 📖 Cómo correr los tests

```bash
# Instalar dependencias
npm install

# Ejecutar todos los tests
npx playwright test

# Ejecutar un test específico
npx playwright test tests/login_test.spec.js

# Abrir el reporte HTML
npx playwright show-report

```
## Variables de entorno (formato correcto)

En la raíz del proyecto debe existir un archivo .env con las credenciales de prueba.
Ejemplo con credenciales por navegador:
```bash
# Credenciales para Chromium
CHROMIUM_USER=usuario_chrome
CHROMIUM_PASS=contraseña_chrome

# Credenciales para Firefox
FIREFOX_USER=usuario_firefox
FIREFOX_PASS=contraseña_firefox

# Credenciales para WebKit (Safari)
WEBKIT_USER=usuario_webkit
WEBKIT_PASS=contraseña_webkit

```
