import express, { Response } from 'express';
import { errorHandler } from './middlewares/errorHandler';
import { v4 as uuidv4 } from 'uuid';
import * as QRCode from 'qrcode';
import { hubspotClient, updateContactQRUrl } from './hubspot';
import { getAllDocuments, getDocumentById, addDocument, updateDocument, deleteDocument } from './firebase/firestore';
import { uploadQRCode } from './firebase/storage';
const app = express();

app.use(express.json());

app.post('/register', async (req, res: Response) => {
    
    if(!req.body){
        return res.status(400).json({
            status: 'error',
            message: 'No se proporciono un body'
        })
    }
    
    if(!req.body.recordId){
        return res.status(400).json({
            status: 'error',
            message: 'No se proporciono un recordId'
        })
    }

    const recordId = req.body.recordId
    const registration_id = uuidv4()

    try {
       
        // Generar QR code como buffer
        const qrCodeBuffer = await QRCode.toBuffer(registration_id, {
            type: 'png',
            width: 300,
            margin: 2
        });
        
        // Subir QR code a Firebase Storage
        const uploadResult = await uploadQRCode(qrCodeBuffer, registration_id);
        
        // Actualizar contacto en HubSpot con la URL del QR
        await updateContactQRUrl({
            recordId,
            qrUrl: uploadResult.url,
            registration_id
        });
        
        res.json({
            status: 'success',
            recordId: recordId,
            registration_id: registration_id,
            storage: {
                url: uploadResult.url,     // URL pública del QR en Firebase
                path: uploadResult.path    // Ruta del archivo en Storage
            },
            hubspot: {
                updated: true,
                message: 'Contacto actualizado con QR URL'
            }
        })

        
    } catch (error) {
        console.error('Error en el proceso de registro:', error);
        
        // Determinar el tipo de error para dar una respuesta más específica
        if (error && error instanceof Error && error.message.includes('HubSpot')) {
            res.status(500).json({
                status: 'error',
                message: 'Error actualizando contacto en HubSpot',
                details: error.message
            });
        } else {
            res.status(500).json({
                status: 'error',
                message: 'Error en el proceso de registro',
                details: (error as Error).message
            });
        }
    }
})

app.use('/document/:collectionName', async (req, res:Response) => {
    
    try {
        const collectionName = req.params.collectionName
        const documents = await getAllDocuments(collectionName)
        res.json({
            status: 'success',
            documents
        })
    } catch (error) {
        console.error('Error obteniendo documentos:', error);
        res.status(500).json({
            message: 'Error obteniendo documentos'
        });
    }
    
})

export default app
