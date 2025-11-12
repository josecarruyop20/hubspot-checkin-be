import { Client } from '@hubspot/api-client';

// Configuración del cliente HubSpot
const hubspotClient = new Client({
    accessToken: process.env.HUBSPOT_API_KEY
});

export { hubspotClient };
