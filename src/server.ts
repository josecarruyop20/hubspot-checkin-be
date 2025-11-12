import app from './app';
import config from './config/config';

app.listen(config.port, () => {
  console.log(`🌐 Server running on http://localhost:${config.port}`);
  console.log(`📋 Webhook endpoint: http://localhost:${config.port}/register`);
  console.log(`🏠 Home: http://localhost:${config.port}/`);
  console.log(`\n🚀 Para exponer con HTTPS usa: npm run tunnel`);
});




