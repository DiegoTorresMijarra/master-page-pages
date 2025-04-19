
// Utility para manejar reCAPTCHA

// Esta función carga el script de reCAPTCHA en la página
export const loadRecaptchaScript = (siteKey: string, callback?: () => void) => {
  if (typeof window === 'undefined') return; // No ejecutar en servidor

  // Verificar si el script ya está cargado
  if (document.querySelector(`script[src*="recaptcha"]`)) {
    if (callback) callback();
    return;
  }

  // Crear el script
  const script = document.createElement('script');
  script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
  script.async = true;
  script.defer = true;

  // Ejecutar callback cuando el script esté cargado
  if (callback) {
    script.onload = callback;
  }

  // Añadir script al documento
  document.head.appendChild(script);
};

// Esta función ejecuta reCAPTCHA y devuelve un token
export const executeRecaptcha = async (siteKey: string, action: string = 'submit'): Promise<string> => {
  if (typeof window === 'undefined') return ''; // No ejecutar en servidor

  // Asegurarse de que la API de reCAPTCHA está disponible
  if (!(window as any).grecaptcha || !(window as any).grecaptcha.ready) {
    console.error('reCAPTCHA no está disponible');
    return '';
  }

  try {
    return await new Promise((resolve, reject) => {
      (window as any).grecaptcha.ready(async () => {
        try {
          const token = await (window as any).grecaptcha.execute(siteKey, { action });
          resolve(token);
        } catch (error) {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error al ejecutar reCAPTCHA:', error);
    return '';
  }
};
