/*
################################################
##### MINIMAL EXPRESS SERVER CONFIGURATION #####
################################################
*/

import express from "express";                                          // Import Express from modules in package-lock.json

const app = express();                                                  // Instance Express app
const PORT = 3000;                                                      // Define listening port

// Define endpoint
app.get("/", (req, res) => {
res.send("Hola Express");
});

// Wake up server and listen on specified port
app.listen(PORT, () => {
console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


// Define routes
app.use('/t-shirts', tshirtsRouter);
