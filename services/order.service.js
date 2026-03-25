import { orderCollection } from "../data/order.data.js";
import { getById as getTshirtById } from "./tshirt.service.js";

function validateOrder(enteredOrder) {
    // Validate client data.
    if (!enteredOrder.client || !enteredOrder.client.name || enteredOrder.client.name.length < 2) return "Error: client.name must have at least 2 characters.";

    if (!enteredOrder.client.email || !/\S+@\S+\.\S+/.test(enteredOrder.client.email)) return "Error: client.email must have a valid address.";

    if (!enteredOrder.items || enteredOrder.items.length === 0) return "Error: items must contain at least one item.";

    // Validate each item from order.
    for (let i = 0; i < enteredOrder.items.length; i++) {
        // Store current item.
        let currentItem = enteredOrder.items[i];
        let tshirtInCatalog = getTshirtById(currentItem.tshirtId);

        if (!tshirtInCatalog) return `Error: t-shirt ${currentItem.tshirtId} could not be found.`;

        if (!currentItem.quantity || currentItem.quantity < 1) return "Error: quantity must be at least 1 for all items.";

        if (!tshirtInCatalog.sizes.includes(currentItem.size)) return `Error: size ${currentItem.size} is not available for ${tshirtInCatalog.name}.`;

        let availableColors = []
        tshirtInCatalog.colors.forEach( color => availableColors.push(color.toLowerCase()))
        if (!availableColors.includes(currentItem.color.toLowerCase())) return `Error: color ${currentItem.color} is not available for ${tshirtInCatalog.name}.`;
    }

    return null;
}

export function getAll() {
    return orderCollection;
}

export function getOrderById(enteredId) {
    return orderCollection.find( order => order.id === enteredId);
}

export function createOrder(enteredOrder) {
    // Validate order before creation.
    const validationMsg = validateOrder(enteredOrder);

    if (validationMsg) return { error: validationMsg };

    // If passed, begin creation.
    let totalPrice = 0;
    let processedItems = []

    for (let i = 0; i < enteredOrder.items.length; i++) {
        // Store current item
        let currentItem = enteredOrder.items[i];
        
        // Find item in catalog.
        let tshirtInCatalog = getTshirtById(currentItem.tshirtId);
        
        // Calculate item's subtotal.
        let currentItemSubtotal = tshirtInCatalog.basePrice * currentItem.quantity;
        
        // Add subtotal to total.
        totalPrice = totalPrice + currentItemSubtotal;

        // Create new object for ticket.
        let newOrderItem = {
            tshirtId: currentItem.tshirtId,
            name: tshirtInCatalog.name,
            size: currentItem.size,
            color: currentItem.color,
            quantity: currentItem.quantity,
            unitPrice: tshirtInCatalog.basePrice,
            subtotal: Number(currentItemSubtotal.toFixed(2)) // Rounded to 2 decimals
        };

        // Add to list of processed items.
        processedItems.push(newOrderItem);
    }

    // Create final object for order.
    const newOrder = {
        id: "ORD-" + Date.now(),
        date: new Date().toISOString(),
        status: "received",
        client: enteredOrder.client,
        address: enteredOrder.address,
        items: processedItems,
        total: Number(totalPrice.toFixed(2)) // Rounded to 2 decimals
    };

    // Store new order in local file.
    orderCollection.push(newOrder);

    // Return new order created.
    return { data: newOrder };
}