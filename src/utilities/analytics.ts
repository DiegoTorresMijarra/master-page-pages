
// Utility para Google Analytics

// Esta función carga el script de Google Analytics en la página
export const loadGoogleAnalytics = (measurementId: string) => {
  if (typeof window === 'undefined') return; // No ejecutar en servidor

  // Verificar si el script ya está cargado
  if (document.querySelector(`script[src*="googletagmanager"]`)) {
    return;
  }

  // Crear el script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;

  // Añadir script al documento
  document.head.appendChild(script);

  // Inicializar gtag
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', measurementId);

  // Exponer gtag globalmente
  (window as any).gtag = gtag;
};

// Esta función envía un evento a Google Analytics
export const sendAnalyticsEvent = (
  eventName: string,
  eventParams: Record<string, any> = {}
) => {
  if (typeof window === 'undefined') return; // No ejecutar en servidor

  // Verificar si gtag está disponible
  if (!(window as any).gtag) {
    console.error('Google Analytics no está disponible');
    return;
  }

  // Enviar evento
  (window as any).gtag('event', eventName, eventParams);
};

// Esta función envía una vista de página a Google Analytics
export const sendPageView = (
  path: string,
  pageTitle: string = ''
) => {
  if (typeof window === 'undefined') return; // No ejecutar en servidor

  // Verificar si gtag está disponible
  if (!(window as any).gtag) {
    console.error('Google Analytics no está disponible');
    return;
  }

  // Enviar vista de página
  (window as any).gtag('config', process.env.GOOGLE_ANALYTICS_ID, {
    page_path: path,
    page_title: pageTitle || document.title,
  });
};
