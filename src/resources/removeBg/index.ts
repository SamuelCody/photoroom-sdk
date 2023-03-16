import { Base } from "../base";
import { RemoveBgFromImageOptions, RemoveBgFromImageResult } from "./types";

const appendToUrl = "segment";

export class RemoveBgFromImage extends Base {
  removeBgFromImage(
    options: RemoveBgFromImageOptions
  ): Promise<RemoveBgFromImageResult> {
    return this.request(`/${appendToUrl}`, {
      method: "POST",
      body: JSON.stringify(options),
    });
  }
}
