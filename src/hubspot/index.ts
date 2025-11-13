import { Client } from '@hubspot/api-client';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.HUBSPOT_API_KEY)
// Configuración del cliente HubSpot
const hubspotClient = new Client({
    accessToken: process.env.HUBSPOT_API_KEY
});

// Función para actualizar la propiedad qr_url de un contacto
type UpdateContactQRUrlParams = {
    recordId: string;
    qrUrl: string;
    registration_id: string;
}

export const updateContactQRUrl = async ({recordId, qrUrl, registration_id}: UpdateContactQRUrlParams) => {
    const object = {
        id: recordId,
        properties: {
            qr_url: qrUrl,
            registration_id: registration_id,
            checkin_status: 'pending'
        }
    }
    try {
        const response = await hubspotClient.crm.contacts.basicApi.update(recordId, object);
        
        console.log(`✅ Contacto ${recordId} actualizado con QR URL: ${qrUrl}`);
        return response;
    } catch (error) {
        console.error('❌ Error actualizando contacto en HubSpot:', error);
        throw error;
    }
};

export { hubspotClient };
