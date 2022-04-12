# Criollo

Criollo es una aplicación utilitaria para tablets y smartphones que permite calcular los principales parámetros de operación de pulverizadoras terrestres de botalón y realizar la verificación estática correspondiente.  
Al usar la aplicación es posible calcular alternativamente la velocidad de avance del equipo, la presión de trabajo y el volumen de pulverización para un tamaño de pico y una distancia entre picos determinada. También es posible realizar la verificación de los picos y obtener el diagnóstico rápido del estado de los mismos.  
La información generada a partir del ingreso de los datos y los cálculos realizados se compila en un reporte que puede ser guardado en formato PDF y compartido mediante correo electrónico y/o WhatsApp.  
Una vez instalada, la utilización de Criollo no requiere disponibilidad de señal ni acceso a la red. Estos servicios sólo son necesarios si se desea compartir los reportes generados.         


### Migración nativo -> híbrido
  - Nueva presentación. Mejoras en control y validación de campos.  
  - Se pierde el control de volumen en la vista de verificación. En lugar de forzar el volumen al máximo, se avisa al usuario de que suba el volumen para que las alertas sean audibles. El control de "keep awake" se realiza con un plugin CapacitorJS.  
  - Los reportes se generan secuencialmente como en Campero y Campero Fertilizadoras.  
  - Los formularios tienen almacenamiento persistente de datos, no se pierden al cambiar de vistas.  
  - El almacenamiento de los datos se realiza en LocalStorage.  

## Instalación y despliegue

Descargar codigo fuente e instalar dependencias
```bash
$ git clone https://github.com/sendevo/criollo
$ cd criollo
$ npm install
```

Correr versión web para debug
```bash
$ npm start
```

Compilar versión web optimizada
```bash
$ npm run build:react
```

Compilar apk (android)
```bash
$ npm run build && npx cap sync
$ npx cap open android
$ adb logcat chromium:I
```

Lo anterior puede requerir variables de entorno:
```bash
export CAPACITOR_ANDROID_STUDIO_PATH="..../android-studio/bin/studio.sh"
export PATH=~/.npm-global/bin:$PATH  
```


Compilar release apk (android)
```bash
cd android && 
./gradlew assembleRelease && 
cd app/build/outputs/apk/release &&
jarsigner -keystore $KEYSTORE_PATH -storepass $KEYSTORE_PASS app-release-unsigned.apk $KEYSTORE_ALIAS && 
zipalign 4 app-release-unsigned.apk app-release.apk
```


### Backlog

  - [x] Seccion parametros de pulverizacion.  
    - [x] Vista con formulario.  
    - [x] Seleccion de picos.  
    - [x] Calculo de resultados.  
    - [x] Medidor de velocidad.  
    - [x] Control de campos.  
    - [x] Cargar resultados a reporte.  
  - [x] Seccion verificacion de picos.  
    - [x] Vista con formulario.  
    - [x] Cálculo de resultados.  
    - [x] Control de campos.  
    - [x] Cargar resultados a reporte.  
  - [x] Seccion calculo de mezclas.  
    - [x] Vista con formulario.  
    - [x] Cálculo de insumos.  
    - [x] Navigator/Capacitor GPS.  
    - [x] Vista de resultados.  
    - [x] Control de campos.  
    - [x] Cargar resultados a reporte.  
  - [x] Seccion reportes.  
    - [x] Vista de listado de reportes.  
    - [x] Gestion de reportes.  
    - [x] Vista de presentación de reportes.  
    - [x] Exportar reporte a PDF y compartir.  
  - [ ] Sección Información y ayuda.  
    - [x] Menu de enlaces.  
    - [x] Seccion acerca de.  
    - [x] Enlace informacion adicional.  
    - [ ] Recorrido por la app (modo ayuda).  


Progreso total: 23/24 = 97%
