// Import t-shirt collection.
import { tshirtCollection } from "../data/tshirt.data.js";

// Find and return t-shirt in collection with matching ID.
export function getById(enteredId) {
    return tshirtCollection.find(tshirt => tshirt.id == enteredId);
}

// Return full collection.
export function getAll() {
    return tshirtCollection;
}