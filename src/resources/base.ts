import fetch from "isomorphic-unfetch";
import { _arrayBufferToBase64 } from "src/utils";

type ApiKey = string;
type ResultOption = { base64?: boolean | false };

export abstract class Base {
  private apiKey: string;
  private baseUrl: string;
  private resultOption: ResultOption;

  constructor(apiKey: ApiKey, resultOption?: ResultOption) {
    this.apiKey = apiKey;
    this.baseUrl = "https://sdk.photoroom.com/v1";
    this.resultOption = resultOption;
  }

  protected async request<T>(
    endpoint: string,
    options?: RequestInit | any
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": this.apiKey,
    };

    if (this?.resultOption && this?.resultOption?.base64) {
      headers["Accept"] = "application/json";
    }

    const config = {
      ...options,
      headers,
    };

    return fetch(url, config).then(async (response) => {
      if (response.ok) {
        const body = JSON.parse(config.body);

        let res: any;

        if (this?.resultOption && this?.resultOption?.base64) {
          const jsonResponse = await response.json();
          res = {
            result_b64: `data:image/${
              !body?.format || body?.format === "png" ? "png" : "jpeg"
            };base64,${jsonResponse?.result_b64}`,
          };
        } else {
          const imgRes = _arrayBufferToBase64(await response.arrayBuffer());
          res = {
            result_b64: `data:image/${
              !body?.format || body?.format === "png" ? "png" : "jpeg"
            };base64,${imgRes}`,
          };
        }

        return res;
      }
      throw new Error(response.statusText);
    });
  }
}
