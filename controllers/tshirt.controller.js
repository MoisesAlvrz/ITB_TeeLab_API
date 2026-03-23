import * as tshirtService from '../services/tshirt.service.js';

export function getAll(req, res) {
    res.json(tshirtService.getAll());
}

export function getById(req, res) {
    const obtainedTshirt = tshirtService.getById(req.params.id);

    if (!obtainedTshirt) return res.status(404).json({ message: "Not Found" });
    res.json(obtainedTshirt);
}