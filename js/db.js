const DB_NAME = 'devconnect-db';
const DB_VERSION = 1;
const STORE_NAME = 'posts';

// Inicialización de la Base de Datos 
const dbPromise = idb.openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
    }
});

// Insertar o Actualizar un registro
async function guardarEnIndexedDB(tabla, objeto) {
    const db = await dbPromise;
    const tx = db.transaction(tabla, 'readwrite');
    const store = tx.objectStore(tabla);
    await store.put(objeto);
    await tx.done;
    return objeto;
}

// Obtener todos los registros de una tabla
async function obtenerDeIndexedDB(tabla) {
    const db = await dbPromise;
    return await db.getAll(tabla);
}

// Borrar un registro por su ID
async function borrarDeIndexedDB(tabla, id) {
    const db = await dbPromise;
    const tx = db.transaction(tabla, 'readwrite');
    const store = tx.objectStore(tabla);
    await store.delete(id);
    await tx.done;
}