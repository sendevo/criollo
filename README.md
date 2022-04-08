# Criollo


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

  - [ ] Seccion parametros de pulverizacion.  
    - [ ] Vista con formulario.  
    - [ ] Calculo de resultados.  
    - [ ] Medidor de velocidad.  
    - [ ] Cargar resultados a reporte.  
  - [ ] Seccion verificacion de picos.  
    - [x] Vista con formulario.  
    - [x] Cálculo de resultados.  
    - [ ] Cargar resultados a reporte.  
  - [ ] Seccion calculo de mezclas.  
    - [ ] Vista con formulario.  
    - [ ] Cálculo de insumos.  
    - [ ] Capacitor GPS.  
    - [ ] Vista de resultados.  
    - [ ] Cargar resultados a reporte.  
  - [ ] Seccion reportes.  
    - [ ] Vista de listado de reportes.  
    - [ ] Gestion de reportes.  
    - [ ] Vista de presentación de reportes.  
    - [ ] Exportar reporte a PDF y compartir.  
  - [ ] Sección Información y ayuda.  
    - [x] Menu de enlaces.  
    - [x] Seccion acerca de.  
    - [x] Enlace informacion adicional.  
    - [ ] Recorrido por la app (modo ayuda).  


Progreso total: 5/24 = 20.83%