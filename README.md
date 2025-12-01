# Tarea 4

## Plataforma de Gestión de Cursos Cortos
Este proyecto es una plataforma web para administrar cursos cortos, desarrollada con:
- Node.js
- Express
- MySQL
- EJS
- Selenium WebDriver
- AlertifyJS
- Mochawesome

El sistema permite gestionar cursos mediante un panel sencillo y validado mediante pruebas automatizadas end-to-end.

--- 
### Requisitos Previos
Antes de ejecutar el proyecto debes tener instalado:

- Node.js 16+
- MySQL
- Google Chrome
- Chromedrive
---

## **1.** Inicializar el Proyecto
```
npm init -y
```

## **2.** Instalar Dependencias del Servidor
``` 
npm install express ejs mysql2 dotenv bcrypt express-session nodemailer
```
> ⚠️En ```package.json``` revisar esta linea (si aparece con 'commonjs' en vez de 'module'):
```"type": "commonjs",```
> cambiar por
```"type": "module",```

## **3.** Instalar Dependencias para Pruebas Automatizadas

Estas son las únicas necesarias para las pruebas con Selenium:
```
npm install selenium-webdriver chromedriver mocha mochawesome --save-dev
```

---
## **4.** Ejecutar el Proyecto
En la terminal:
```
npm start
```

## **5.** Ejecutar las Pruebas Automatizadas
Abre una nueva terminal (dejar la que esta corriendo el proyecto)
Y ejecutar lo siguiente
```
npm test
```

Esto generará:

- Capturas dentro de:
```
/tests/screenshots/
```
- Un reporte HTML en:

```
/mochawesome-report/mochawesome.html
```