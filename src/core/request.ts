import { defaultFetcher, type Fetcher, type Request as FetcherRequest, type Response, setCookiesArrayToRequest, setHeaderToRequest } from "@literate.ink/utilities";

import type { Session } from "~/models";

import { BASE_URL, SESSION_COOKIE } from "./constants";

export class Request {
  private readonly request: FetcherRequest;

  public constructor (path: string) {
    this.request = {
      redirect: "manual",
      url: new URL(BASE_URL + path)
    };
  }

  public send (fetcher: Fetcher = defaultFetcher): Promise<Response> {
    return fetcher(this.request);
  }

  public setFormData (data: URLSearchParams): void {
    this.request.method = "POST";
    this.request.content = data.toString();
    setHeaderToRequest(this.request, "Content-Type", "application/x-www-form-urlencoded");
  }

  public useSession (session: Session): void {
    setCookiesArrayToRequest(this.request, [`${SESSION_COOKIE}=${session.phpSessId}`]);
  }
}
