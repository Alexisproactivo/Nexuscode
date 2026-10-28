/**
 * @file main.js
 * @description Inicializador principal de la web comercial de Nexus Code Systems (Arequipa, Perú).
 */

import './style.css';
import { HomeView } from './views/pages/HomeView.js';
import { HeroCanvas3D } from './views/components/HeroCanvas3D.js';
import { UIController } from './controllers/UIController.js';
import { ContactController } from './controllers/ContactController.js';

function bootstrapNexusApplication() {
  const appRoot = document.getElementById('app');
  if (!appRoot) return;

  // 1. Datos de negocio local para buscadores
  HomeView.injectSchemaOrg();

  // 2. Renderizar la página comercial completa
  appRoot.innerHTML = HomeView.render();

  // 3. Montar la estructura geométrica 3D interactiva en el Hero
  HeroCanvas3D.mount('hero-3d-stage');

  // 4. Activar menús, modales y envío a WhatsApp
  UIController.init();
  ContactController.init();

  // 5. Instrucciones en consola para colocar las fotos de los socios fundadores
  console.info(
    '%c[Nexus Code Systems] Guía de Fotografías de Socios Fundadores:\n' +
      '• Carpeta exacta donde pegar las fotos: C:\\Users\\USER\\OneDrive\\Desktop\\Nexuscode\\public\\\n' +
      '  1) public/rodrigo.jpg  (Rodrigo Apaza Valle)\n' +
      '  2) public/alex.jpg     (Alex Darwin Colque)\n' +
      '• Dimensiones sugeridas: 400x500 px (o 800x1000 px) en proporción vertical 4:5 para evitar deformaciones.',
    'color: #d4af37; font-weight: bold;'
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapNexusApplication);
} else {
  bootstrapNexusApplication();
}
