const db = require("../config/db");

class FavModel {
    static getAll = async (cb) => {
        console.log("getAll");
        const query = "SELECT * FROM fav";
        db.query(query, cb);
    };
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