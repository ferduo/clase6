const fs = require("fs");
const productos = require("./productos.js");

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  async save(obj) {
    const content = await this.getAll();
    const contentParsed = JSON.parse(content);
    const newId = contentParsed[contentParsed.length-1].id+1;
    obj.id = newId;

    const newContent = contentParsed.push(obj);

    await this.write(JSON.stringify(contentParsed));
    return newId;
  }

  async write(obj) {
    try {
      const content = await fs.promises.writeFile(this.file, obj);
      return content;
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      let content = await fs.promises.readFile(this.file, "utf-8");
      return JSON.parse(content);
    } catch (err) {
      throw new Error(err);
    }
  }

  async getById(id) {
    try {
      const content = await this.getAll();
      const parsed = JSON.parse(content);
      const el = parsed.filter((e) => e.id === id);
      return el;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.file, "[]");
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteById(id) {
    try {
      const content = await this.getAll();
      const parsed = JSON.parse(content);

      const el = parsed.filter((e) => e.id !== id);
      await this.write(JSON.stringify(el));
      const newContent = await this.getAll();
      return newContent;
    } catch (err) {
      throw new Error(err);
    }
  }
}

let contenedor = new Contenedor("./productos.txt");

module.exports = contenedor;




