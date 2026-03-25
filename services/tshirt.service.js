// Import t-shirt collection.
import { tshirtCollection } from "../data/tshirt.data.js";

// Find and return t-shirt in collection with matching ID.
export function getById(enteredId) {
    return tshirtCollection.find(tshirt => tshirt.id == enteredId);
}

// Return full collection or filtered collection.
export function getAll(query = {}) {
    // Store copy of data that can be worked on.
    let result = [...tshirtCollection];

    // Define filters
    if (query.size) {
        result = result.filter( tshirt => tshirt.sizes.includes(query.size) );
    }

    if (query.color) {
        // Store color in constant to avoid executing toLowerCase() multiple times.
        const searchColor = query.color.toLowerCase();

        // As t-shirt colors aren't stored in lowercase, comparison can't be made with includes().
        result = result.filter( tshirt =>
            tshirt.colors.some( color => color.toLowerCase() === searchColor)
        );
    }

    if (query.tag) {
        const searchTag = query.tag.toLowerCase();

        result = result.filter( tshirt => 
            tshirt.tags.some( tag => tag.toLowerCase() === searchTag)
        );
    }

    if (query.q) {
        const searchText = query.q.toLowerCase();

        result = result.filter( tshirt =>
            tshirt.name.toLowerCase().includes(searchText) ||
            tshirt.description.toLowerCase().includes(searchText)
        );
    }

    // Define sorts
    if (query.sort) {
        switch (query.sort) {
            case "precio_asc":
                result.sort((a, b) => a.basePrice - b.basePrice);
                break;
            case "precio_desc":
                result.sort((a, b) => b.basePrice - a.basePrice);
                break;
            case "nombre_asc":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "nombre_desc":
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }
    }

    return result
}