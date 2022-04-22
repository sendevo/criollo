# Criollo 4.0 

Criollo es una aplicación utilitaria para tablets y smartphones que permite calcular los principales parámetros de operación de pulverizadoras terrestres de botalón y realizar la verificación estática correspondiente.  
Al usar la aplicación es posible calcular alternativamente la velocidad de avance del equipo, la presión de trabajo y el volumen de pulverización para un tamaño de pico y una distancia entre picos determinada. También es posible realizar la verificación de los picos y obtener el diagnóstico rápido del estado de los mismos.  
La información generada a partir del ingreso de los datos y los cálculos realizados se compila en un reporte que puede ser guardado en formato PDF y compartido mediante correo electrónico y/o WhatsApp.  
Una vez instalada, la utilización de Criollo no requiere disponibilidad de señal ni acceso a la red. Estos servicios sólo son necesarios si se desea compartir los reportes generados.         

### [Disponible en Google Play!](https://play.google.com/store/apps/details?id=com.inta.criollo2)  

![criollo](doc/promo_criollo.jpg)

### Versión 4.0 (Migración nativo -> híbrido)
  - Implementación ReactJS + Framework7 + Capacitor
  - Nueva presentación. Mejoras en control y validación de campos.  
  - Se pierde el control de volumen en la vista de verificación. En lugar de forzar el volumen al máximo, se avisa al usuario de que suba el volumen para que las alertas sean audibles. El control de "keep awake" se realiza con un plugin CapacitorJS.  
  - Los reportes se generan secuencialmente como en Campero y Campero Fertilizadoras.  
  - Los formularios tienen almacenamiento persistente de datos, no se pierden al cambiar de vistas o si la app queda en segundo plano, pero se borran al salir (previo confirmacion del usuario).  
  - El almacenamiento de los datos se realiza en LocalStorage o Storage de Capacitor (que se supone tiene mejor persistencia que localStorage).  

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
$ npm run build
```

### Compilar apk (android) primera vez:
1.- Instalar android studio y ubicar carpeta de instalación

2.- Agregar plataforma con capacitor y generar proyecto android-studio

```bash
$ export CAPACITOR_ANDROID_STUDIO_PATH="..../android-studio/bin/studio.sh"
$ export PATH=~/.npm-global/bin:$PATH  
$ npx cap add android
$ npm run build && npx cap sync
```

3.- Agregar permisos en android/app/src/main/AndroidManifest.xml

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

4.- Definir iconos y splashcreens en android/app/src/main/res


### Actualizar apk (android):
```bash
$ npm run build && npx cap sync
$ npx cap open android
$ adb logcat chromium:I
```


Para compilar release apk (android) usar android-studio, o por consola:
```bash
cd android && 
./gradlew assembleRelease && 
cd app/build/outputs/apk/release &&
jarsigner -keystore $KEYSTORE_PATH -storepass $KEYSTORE_PASS app-release-unsigned.apk $KEYSTORE_ALIAS && 
zipalign 4 app-release-unsigned.apk app-release.apk
```


### Backlog
#### Progreso: 100%

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
  - [x] Sección Información y ayuda.  
    - [x] Menu de enlaces.  
    - [x] Seccion acerca de.  
    - [x] Enlace informacion adicional.  
    - [x] Recorrido por la app (modo ayuda).  
