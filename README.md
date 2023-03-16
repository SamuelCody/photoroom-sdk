# [Photoroom](https://www.photoroom.com/) API wrapper for Node.js

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Twitter Follow][twitter-image]][twitter-url]

[npm-image]: https://img.shields.io/npm/v/photoroom-sdk.svg
[npm-url]: https://npmjs.org/package/photoroom-sdk
[downloads-image]: http://img.shields.io/npm/dm/photoroom-sdk.svg
[twitter-image]: https://img.shields.io/twitter/follow/alakowe_dev.svg?style=social&label=Follow%20me
[twitter-url]: https://twitter.com/alakowe_dev

<img src="https://www.photoroom.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbatch-mode.ef0883b3.png&w=2048&q=75" width="600px" height="400px" />

The **Photoroom** API is quite easy to use, but it can always be easier with this package.

## Requirements

Get your API key from the [Photoroom website](https://www.photoroom.com).

## Installation

```bash
npm i photoroom-sdk
```

## API

```typescript
import Photoroom from "photoroom-sdk";

const photoroom = new Photoroom("INSERT PHOTOROOM API KEY");

photoroom.removeBgFromImage({...})
```

The **parameters** you can pass to the `removeBgFromImage` function are::

Only the `image_file_b64` property is mandatory.

| Property       | Type       | Description                                                          |
| -------------- | ---------- | -------------------------------------------------------------------- |
| image_file_b64 | `"string"` | The image you want to remove the background from, in base 64 format. |

| format | `"png"`, `"jpg"` | Format of the returned image. Can be `"png"` (default) or `"jpg"` (faster, no transparency). |

| channels | `"rgba"`, `"alpha"` | If `"rgba"` (default), a composed image is returned. If `"alpha"`, a black and white image is returned, where white is the foreground and black is the background. |

| bg_color | `"string"` | Can be a `"hex code"` (`"#FF00FF"`) or a `"HTML"` color (red, green, etc...). If provided, sets the background of the returned image to the specified color. |

| size | `"preview"`, `"medium"`, `"hd"`, `"full"` | Will resize the output to the specified size. Can be `"preview"` (0.25 Megapixels), `"medium"` (1.5 MP), `"hd"` (4 MP) or `"full"` (36 MP, can be slower for large images). Useful for mobile apps that need smaller images. Setting preview uses 0.25 credit. |

| crop | `"boolean"` | If `"true"`, the image returned is cropped to the cutout border. Transparent pixels are removed from the border. |

And the **output properties** are:

| Property   | Type     | Description                                          |
| ---------- | -------- | ---------------------------------------------------- |
| result_b64 | `string` | Base64 encoded representation of the returned image. |

### How to use `removeBgFromImage`

Remove the background from a local file.

```typescript
import Photoroom from "photoroom-sdk";
import fs from "fs";

const photoroom = new Photoroom("INSERT PHOTOROOM API KEY");

// convert your image file to base 64 format
const convertImgFileToBase64 = fs.readFileSync(
  `${__dirname}/image.jpg`,
  "base64"
);

// pass it through photoroom.removeBgFromImage
photoroom
  .removeBgFromImage({
    image_file_b64: convertImgFileToBase64,
    bg_color: "blue",
  })
  .then((res) => {
    // do whatever you want with the base64 image response
    // like saving into a file
    fs.writeFileSync(
      `${__dirname}/img-bg-removed.jpg`,
      res.result_b64.replace(/^data:image\/\w+;base64,/, ""),
      { encoding: "base64" }
    );
  });
```

Or have a cool `async/await` example:

```typescript
import Photoroom from "photoroom-sdk";
import fs from "fs";

const photoroom = new Photoroom("INSERT PHOTOROOM API KEY");

// convert your image file to base 64 format
const convertImgFileToBase64 = fs.readFileSync(
  `${__dirname}/image.jpg`,
  "base64"
);

// pass it through photoroom.removeBgFromImage
const response = await photoroom.removeBgFromImage({
  image_file_b64: convertImgFileToBase64,
  bg_color: "blue",
});

// do whatever you want with the base64 image response
// like saving into a file
fs.writeFileSync(
  `${__dirname}/img-bg-removed.jpg`,
  response.result_b64.replace(/^data:image\/\w+;base64,/, ""),
  { encoding: "base64" }
);
```
