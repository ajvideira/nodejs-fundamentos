const fs = require('fs').promises;
const path = require('path');

class Service {

  static async listAll() {
    try {
      const favoritosRaw = await fs.readFile(path.join(__dirname, "db.json"));
      const favoritos = JSON.parse(String(favoritosRaw));
      return favoritos;
    } catch(err) {
      return [];
    }
  }

  static async add(favorito) {
    const favoritos = await this.listAll();
    favoritos.push(favorito);

    return fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(favoritos, null, 2));
  }

  static async remove(id) {
    const favoritos = await this.listAll();
    favoritos.splice((id),1)
    return fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(favoritos, null, 2));
  }

}

module.exports = Service;