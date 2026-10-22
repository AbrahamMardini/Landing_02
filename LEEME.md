# Landing 2 "Raspa, gana y llévate a Neki" · Mr. Sushi

Landing page hecha con **HTML, CSS y JavaScript**, sin instalar nada. Es lo que GitHub Pages publica directamente.

## Qué hay en la carpeta

| Archivo | Para qué sirve |
|---|---|
| `index.html` | El contenido de la página (textos, secciones, enlaces) |
| `styles.css` | El diseño: colores, tamaños, versión de celular |
| `script.js` | Lo interactivo: aparición suave de secciones y la tarjeta para raspar |
| `assets/svg/` | Titulares, logo e íconos exportados del prototipo de Figma (tipografía exacta) |
| `assets/img/` | Fotos de Neki, fondos y olas decorativas (en WebP, livianas) |

Para verla en tu compu: abre `index.html` con doble clic.

## Publicar en GitHub Pages (desde el navegador)

1. Entra a <https://github.com> e inicia sesión (o crea tu cuenta).
2. Arriba a la derecha: **+ → New repository**.
   - Nombre: por ejemplo `raspa-y-gana-neki-2`
   - Marca **Public**
   - Clic en **Create repository**.
3. En la página del repositorio, haz clic en **uploading an existing file**.
4. Arrastra **todo el contenido** de esta carpeta (`index.html`, `styles.css`, `script.js`, `LEEME.md` y la carpeta `assets`). Ojo: arrastra lo que hay *dentro* de la carpeta, no la carpeta misma, para que `index.html` quede en la raíz.
5. Abajo, clic en **Commit changes**.
6. Ve a **Settings → Pages**. En *Branch* elige **main** y carpeta **/ (root)**. Clic en **Save**.
7. Espera 1 o 2 minutos y recarga. Aparecerá tu enlace, algo como:
   `https://TU-USUARIO.github.io/raspa-y-gana-neki-2/`

## Cómo probar la tarjeta para raspar en clase

En la sección **¿Ya hiciste tu pedido?** (botón ACTIVAR):
- Escribe **64DU2J**: raspas y **ganas a Neki**.
- Escribe cualquier otro código de 6 caracteres (ej. `ABC123`): raspas y sale **¡TRANQUIIII!** con la invitación a volver a intentarlo.
- Si escribes menos de 6 caracteres, aparece un mensaje de error.

Es una demo: no se guarda nada ni se valida contra un servidor real.

Para cambiar el código ganador, abre `script.js` y edita esta línea:

```js
var CODIGO_GANADOR = '64DU2J';
```

## Animaciones (todas suaves)

- Las secciones aparecen con un leve desplazamiento al hacer scroll.
- El Neki del inicio flota muy despacio.
- Tarjetas y botones se elevan un poco al pasar el mouse.
- Si la computadora o el celular tiene activado "reducir movimiento", todas se desactivan.

## Enlaces que conviene revisar

Usé las direcciones reales que conocemos de Mr. Sushi. Estas tres no tenían una dirección exacta, así que llevan a la web principal. Cámbialas en `index.html` si encuentras la correcta:
- Nosotros
- ¡Se parte del grupo!
- Libro de Reclamaciones Virtual
