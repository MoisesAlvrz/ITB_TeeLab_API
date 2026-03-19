import { tshirtCollection } from "../data/tshirt.data";

// Minimal object validation
function validateTshirt(object) {
    if (!object || typeof object !== "object") return "Invalid body";
    if (!object.id || !object.name || !object.)
}


// Valida campos mínimos
function validateStudent(obj) {
    if (!obj || typeof obj !== "object") return "Body inválido";
    if (!obj.id || !obj.nombre || !obj.curso) return "Faltan campos: id, nombre, curso";
    return null;
}
// Comprueba si el id ya existe
const existsId = (id) => students.some(s => s.id === id);
export function getAll() {
    return students;
}
export function getById(id) {
    return students.find(s => s.id === id);
}
export function create(alumnoNew) {
    const validationMsg = validateStudent(alumnoNew);
    if (validationMsg) return { error: validationMsg };

    if (existsId(alumnoNew.id)) return { error: "id ya existe", status: 409 };

    students.push({ id: alumnoNew.id, nombre: alumnoNew.nombre, curso: alumnoNew.curso });
    return { data: alumnoNew };
}
