import { buildDriver } from "./config.js";
import { By, until } from "selenium-webdriver";
import fs from "fs";

describe("Pruebas de Login", function () {
  this.timeout(20000);
  let driver;

  before(async () => {
    driver = await buildDriver();
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it("Camino feliz: iniciar sesión correctamente", async () => {
    await driver.get("http://localhost:3000/login");

    await driver.findElement(By.name("username")).sendKeys("admin1");
    await driver.findElement(By.name("password")).sendKeys("1234567");

    await driver.findElement(By.css("button[type=submit]")).click();

    await driver.wait(until.urlIs("http://localhost:3000/"), 5000);

    const image = await driver.takeScreenshot();
    fs.writeFileSync("./tests/screenshots/login_ok.png", image, "base64");
  });

  it("Prueba negativa: contraseña incorrecta", async () => {
    await driver.get("http://localhost:3000/logout");
    await driver.get("http://localhost:3000/login");

    await driver.findElement(By.name("username")).sendKeys("admin1");
    await driver.findElement(By.name("password")).sendKeys("wrongpass");

    await driver.findElement(By.css("button[type=submit]")).click();

    // 🔥 Esperar a que exista el div.alert
    const alert = await driver.wait(
      until.elementLocated(By.css(".alert")),
      10000 // más tiempo
    );

    // 🔥 Esperar que alert tenga texto (render completo)
    await driver.wait(async () => {
      const txt = await alert.getText();
      return txt.trim().length > 0;
    }, 5000);

    const text = await alert.getText();

    if (!text.includes("incorrecta") && !text.includes("no encontrado")) {
      throw new Error("Mensaje incorrecto");
    }

    const image = await driver.takeScreenshot();
    fs.writeFileSync("./tests/screenshots/login_fail.png", image, "base64");
  });
});
