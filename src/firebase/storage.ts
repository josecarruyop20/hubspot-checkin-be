import { bucket } from './index';
import { v4 as uuidv4 } from 'uuid';

// Función para subir un QR code generado
export async function uploadQRCode(
  qrBuffer: Buffer, 
  registerId: string,
  folder: string = 'qr-codes'
): Promise<{ url: string; path: string }> {
  try {
    // Generar nombre único para el archivo QR
    const fileName = `${folder}/${registerId}.png`;
    
    // Crear referencia al archivo en Storage
    const fileRef = bucket.file(fileName);
    
    // Subir el archivo
    await fileRef.save(qrBuffer, {
      metadata: {
        contentType: 'image/png',
        metadata: {
          registerId: registerId,
          uploadedAt: new Date().toISOString(),
          type: 'qr-code'
        }
      }
    });
    
    // Hacer el archivo público
    await fileRef.makePublic();
    
    // Obtener URL pública
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    
    return {
      url: publicUrl,
      path: fileName
    };
  } catch (error) {
    console.error('Error subiendo QR code:', error);
    throw error;
  }
}

// Función para eliminar un QR code
export async function deleteQRCode(registerId: string, folder: string = 'qr-codes'): Promise<boolean> {
  try {
    const fileName = `${folder}/${registerId}.png`;
    const fileRef = bucket.file(fileName);
    await fileRef.delete();
    return true;
  } catch (error) {
    console.error('Error eliminando QR code:', error);
    throw error;
  }
}

// Función para obtener URL de un QR code existente
export async function getQRCodeUrl(registerId: string, folder: string = 'qr-codes'): Promise<string | null> {
  try {
    const fileName = `${folder}/${registerId}.png`;
    const fileRef = bucket.file(fileName);
    
    // Verificar si existe
    const [exists] = await fileRef.exists();
    if (!exists) {
      return null;
    }
    
    // Retornar URL pública
    return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
  } catch (error) {
    console.error('Error obteniendo URL del QR code:', error);
    throw error;
  }
}

// Función para listar todos los QR codes
export async function listQRCodes(folder: string = 'qr-codes'): Promise<string[]> {
  try {
    const [files] = await bucket.getFiles({
      prefix: folder + '/'
    });
    
    return files.map(file => file.name);
  } catch (error) {
    console.error('Error listando QR codes:', error);
    throw error;
  }
}
