const express = require("express");
const app = express();
const cors = require("cors");
const pool = require('./db');
const multer = require("multer");
const bodyParser = require("body-parser");
const port = 8181;


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Middleware

app.use(cors());
app.use(bodyParser.json());



app.post("/senddata", upload.array("images", 3), (req, res) => {
    const files = req.files;
   
  
    const { name, price, size, details, Gender, Product_Type } = req.body;
  
    if (!files || files.length === 0) {
      return res.status(400).send("No images provided");
    }
  
    const imageDatas = files.map((file) => file.buffer);
  
    // Insert data into the database
    const query =
      "INSERT INTO product (name, price, size, details, images, Gender, Product_Type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;";
    const values = [
      name,
      price,
      size,
      details,
      imageDatas,
      Gender,
      Product_Type,
      
    ];
  
    pool
      .query(query, values)
      .then((result) => {
        const insertedproduct= result.rows[0];
        console.log("Data sent");
        res.send(insertedproduct); // Send the inserted product data to the client
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
        res.status(500).send("Error inserting data");
      });
  });

  app.get("/getcoach", (req, res) => {
    const query = 'SELECT * FROM coach;';
    pool
        .query(query)
        .then((result) => {
            const data = result.rows;
            res.json(data);
        })
        .catch((error) => {
            console.error("Error retrieving data:", error);
            res.status(500).send("Error retrieving data");
        });
});

app.put("/coach/:id/:isDeleted", async (req, res) => {
  const { id, isDeleted } = req.params;

  try {
      const client = await pool.connect();
      await client.query("BEGIN");

      const updateQuery = "UPDATE coach SET deleted = $1 WHERE id = $2";
      await client.query(updateQuery, [isDeleted, id]);

      await client.query("COMMIT");
      res.status(200).json({ message: "Update successful" });
  } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error updating coach:", error);
      res
          .status(500)
          .json({ error: "An error occurred while updating the coach" });
  }
});


app.put('/deleteUser/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Instead of deleting the user, update the 'deleted' column to indicate it's soft deleted
        await pool.query("UPDATE users SET deleted = true WHERE user_id = $1", [id]);
        res.json('Your user has been soft deleted.');
    } catch (err) {
        console.error(err.message);
        res.status(500).json('An error occurred while soft deleting the user.');
    }
});
app.get('/usersData', async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.put('/changerole/:user_id', async function (req, res) {
    try {
        const { user_id } = req.params;
        let id0 = req.body.id;
        let role = req.body.role;
        console.log(id0)
        if (role == "coach") {
            role = "user"
        } else { role = "coach" }

        const record = await pool.query("UPDATE users SET role = $1 WHERE user_id = $2",
            [role, id0]);
        res.send("Updated Successfully");
    }
    catch (err) { console.log(err.message); }
});




app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
