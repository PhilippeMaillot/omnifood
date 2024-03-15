const db = require("../config/db");

class FavModel {
    static add = async (name) => {
        const query = "INSERT INTO fav (name) VALUES (?)";
        await db.query(query, [name]);
    };
    static delete = async (name) => {
        const query = "DELETE FROM fav WHERE name = ?";
        await db.query(query, [name]);
    };
}

module.exports = FavModel;