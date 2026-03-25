import * as tshirtService from '../services/tshirt.service.js';

export function getAll(req, res) {
    // Define valid sort options.
    const validSorts = ["precio_asc", "precio_dec", "nombre_asc", "nombre_dec"];

    // Verify that received sort is included in valid options. If not, return 404.
    if (req.query.sort && !validSorts.includes(req.query.sort)) return res.status(404).json({ error: "Unrecognized sort option." });

    // Pass query as an argument.
    res.json(tshirtService.getAll(req.query));
}

export function getById(req, res) {
    const obtainedTshirt = tshirtService.getById(req.params.id);

    // Verify that t-shirt exists. If not, return 404.
    if (!obtainedTshirt) return res.status(404).json({ message: "Could not find entered ID." });
    
    res.json(obtainedTshirt);
}