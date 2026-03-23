import { tshirtCollection } from "../data/tshirt.data";

// Find and return T-Shirt in collection with matching ID.
function getById(enteredId) {
    return tshirtCollection.find(tshirt => tshirt.id == enteredId);
}

// Return collection.
function getAll() {
    return tshirtCollection;
}