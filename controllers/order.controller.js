import * as orderService from '../services/order.service.js';

export function getAll(req, res) {
    const orders = orderService.getAll();
    res.json(orders);
}

export function create(req, res) {
    const result = orderService.createOrder(req.body);

    if (result.error) {
        const status = result.status || 400;
        return res.status(status).json({ message: result.error });
    }

    return res.status(201).json({ message: "Created", order: result.data });
}