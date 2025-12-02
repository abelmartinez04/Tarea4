import { buildDriver } from "./config.js";
import { By, until } from "selenium-webdriver";
import fs from "fs";

describe("Pruebas CRUD de Cursos", function () {
  this.timeout(40000);
  let driver;

  before(async () => {
    driver = await buildDriver();

    // Login antes de trabajar CRUD
    await driver.get("http://localhost:3000/login");

    await driver.findElement(By.name("username")).sendKeys("admin1");
    await driver.findElement(By.name("password")).sendKeys("1234567");

    await driver.findElement(By.css("button[type=submit]")).click();

    await driver.wait(until.urlIs("http://localhost:3000/"), 5000);
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  // 1. CAMINO FELIZ → CREAR CURSO
  it("Crear curso correctamente", async () => {
    await driver.get("http://localhost:3000/cursos");

    await driver.findElement(By.id("btn-nuevo")).click();

    await driver.sleep(500);

    await driver.findElement(By.name("nombre")).sendKeys("Curso Selenium");
    await driver.findElement(By.name("duracion")).sendKeys("10");
    await driver.findElement(By.name("instructor")).sendKeys("Profesor X");
    await driver.findElement(By.name("precio")).sendKeys("1200");

    // Guardar
    await driver.findElement(By.id("btn-guardar-curso")).click();

    await driver.sleep(1500);

    const image = await driver.takeScreenshot();
    fs.writeFileSync(
      "./tests/screenshots/cursos_create_ok.png",
      image,
      "base64"
    );
  });

  // 2️. PRUEBA NEGATIVA → CREAR CURSO CON PRECIO INVÁLIDO
  it("Crear curso con precio inválido (prueba negativa)", async () => {
    await driver.get("http://localhost:3000/cursos");

    await driver.findElement(By.id("btn-nuevo")).click();
    await driver.sleep(500);

    await driver.findElement(By.name("nombre")).sendKeys("Curso Error");
    await driver.findElement(By.name("duracion")).sendKeys("5");
    await driver.findElement(By.name("instructor")).sendKeys("Instructor Y");
    await driver.findElement(By.name("precio")).sendKeys("abc");

    await driver.findElement(By.id("btn-guardar-curso")).click();

    await driver.sleep(1200);

    const image = await driver.takeScreenshot();
    fs.writeFileSync(
      "./tests/screenshots/cursos_invalid_price.png",
      image,
      "base64"
    );
  });

  // 3️. EDITAR CURSO
  it("Editar curso correctamente", async () => {
    await driver.get("http://localhost:3000/cursos");

    // Tomamos el primer botón de editar
    const botonEditar = await driver.findElement(By.css("button.btn-warning"));
    botonEditar.click();

    await driver.sleep(500);

    const inputNombre = await driver.findElement(By.name("nombre"));
    await inputNombre.clear();
    await inputNombre.sendKeys("Curso Editado");

    await driver.findElement(By.id("btn-guardar-curso")).click();

    await driver.sleep(1200);

    const image = await driver.takeScreenshot();
    fs.writeFileSync("./tests/screenshots/cursos_edit_ok.png", image, "base64");
  });

  // -----------------------------------------------------------
  // 4️⃣ ELIMINAR CURSO
  // -----------------------------------------------------------
  it("Eliminar curso correctamente", async () => {
  await driver.get("http://localhost:3000/cursos");

  // Esperar a que la tabla cargue
  await driver.wait(
    until.elementLocated(By.css("#tabla-cursos button.btn-danger")),
    5000
  );

  const botonEliminar = await driver.findElement(
    By.css("#tabla-cursos button.btn-danger")
  );

  botonEliminar.click();
  await driver.sleep(800);

  const confirmBtn = await driver.findElement(By.css(".ajs-ok"));
  confirmBtn.click();

  await driver.sleep(1200);

  const image = await driver.takeScreenshot();
  fs.writeFileSync("./tests/screenshots/cursos_delete_ok.png", image, "base64");
});


  // -----------------------------------------------------------
  // 5️⃣ PRUEBA DE LÍMITE → NOMBRE VACÍO
  // -----------------------------------------------------------
  it("No debe permitir nombre vacío (límite)", async () => {
    await driver.get("http://localhost:3000/cursos");

    await driver.findElement(By.id("btn-nuevo")).click();
    await driver.sleep(500);

    // NO llenamos el nombre
    await driver.findElement(By.name("duracion")).sendKeys("3");
    await driver.findElement(By.name("instructor")).sendKeys("Profesor Z");
    await driver.findElement(By.name("precio")).sendKeys("150");

    await driver.findElement(By.id("btn-guardar-curso")).click();

    await driver.sleep(1200);

    const image = await driver.takeScreenshot();
    fs.writeFileSync(
      "./tests/screenshots/cursos_limit_fail.png",
      image,
      "base64"
    );
  });
});
