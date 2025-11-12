import { db } from './index';

// Función para leer todos los documentos de una colección
export async function getAllDocuments(collectionName: string) {
    try {
        const snapshot = await db.collection(collectionName).get();
        const documents: any[] = [];
        
        snapshot.forEach((doc) => {
            documents.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return documents;
    } catch (error) {
        console.error('Error obteniendo documentos:', error);
        throw error;
    }
}

// Función para leer un documento específico por ID
export async function getDocumentById(collectionName: string, documentId: string) {
    try {
        const docRef = db.collection(collectionName).doc(documentId);
        const docSnap = await docRef.get();
        
        if (docSnap.exists) {
            return {
                id: docSnap.id,
                ...docSnap.data()
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error obteniendo documento:', error);
        throw error;
    }
}

// Función para agregar un nuevo documento
export async function addDocument(collectionName: string, data: any) {
    try {
        const docRef = await db.collection(collectionName).add(data);
        return {
            id: docRef.id,
            ...data
        };
    } catch (error) {
        console.error('Error agregando documento:', error);
        throw error;
    }
}

// Función para actualizar un documento
export async function updateDocument(collectionName: string, documentId: string, data: any) {
    try {
        const docRef = db.collection(collectionName).doc(documentId);
        await docRef.update(data);
        return {
            id: documentId,
            ...data
        };
    } catch (error) {
        console.error('Error actualizando documento:', error);
        throw error;
    }
}

// Función para eliminar un documento
export async function deleteDocument(collectionName: string, documentId: string) {
    try {
        const docRef = db.collection(collectionName).doc(documentId);
        await docRef.delete();
        return { id: documentId, deleted: true };
    } catch (error) {
        console.error('Error eliminando documento:', error);
        throw error;
    }
}
