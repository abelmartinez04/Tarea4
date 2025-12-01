import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import * as chromedriver from "chromedriver";

export async function buildDriver() {

    // Usar el chromedriver descargado por npm
    process.env.PATH += ";" + chromedriver.path;

    const options = new chrome.Options();
    options.addArguments("--start-maximized");

    return await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
}
