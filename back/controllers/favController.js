const model = require("../models/favModel");

class FavController {
  static add = async (req, res) => {
    try {
      const { name } =
        req.body;

      await model.add(
        name,
      );
      res.status(200).json({ message: "Le favori a bien été ajouté !" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  static delete = async (req, res) => {
    try {
      const { name } = req.params;
      await model.delete(name);
      res.status(200).json({ message: "Le favori a bien été supprimé !" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

module.exports = FavController;
