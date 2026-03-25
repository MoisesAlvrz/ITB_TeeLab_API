import express from "express";                                          // Import Express from modules in package-lock.json
import tshirtRoutes from './routes/tshirt.route.js'
import orderRoutes from './routes/order.route.js';


const app = express();                                                  // Instance Express app
const PORT = 3000;                                                      // Define listening port

app.use(express.json());

// Define routes
app.use('/api/tshirts', tshirtRoutes);
app.use('/api/order', orderRoutes);

// Wake up server and listen on specified port
app.listen(PORT, () => {
console.log(`Servidor corriendo en http://localhost:${PORT}`);
});