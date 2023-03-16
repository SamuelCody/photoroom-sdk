export declare type RemoveBgFromImageOptions = {
  /**
   * The image you want to remove the background from, in base 64 format
   */
  image_file_b64: string;

  /**
   * Format of the returned image. Can be png (default) or jpg (faster, no transparency)
   */
  format?: "png" | "jpg";

  /**
   * If rgba (default), a composed image is returned. If alpha, a black and white image is returned,
   * where white is the foreground and black is the background
   */
  channels?: "rgba" | "alpha";

  /**
   * Can be a hex code (#FF00FF) or a HTML color (red, green, etc...). If provided, sets the
   * background of the returned image to the specified color
   */
  bg_color?: string;

  /**
   * Will resize the output to the specified size. Can be preview (0.25 Megapixels),
   * medium (1.5 MP), hd (4 MP) or full (36 MP, can be slower for large images).
   * Useful for mobile apps that need smaller images. Setting preview uses 0.25 credit
   */
  size?: "preview" | "medium" | "hd" | "full";

  /**
   * If true, the image returned is cropped to the cutout border. Transparent
   * pixels are removed from the border
   */
  crop?: boolean;
};

export declare type RemoveBgFromImageResult = { result_b64: string };
