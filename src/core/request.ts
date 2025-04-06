import { type Request as FetcherRequest, setHeaderToRequest, type Response, type Fetcher, setCookiesArrayToRequest, defaultFetcher } from "@literate.ink/utilities";
import type { Session } from "~/models";
import { BASE_URL, SESSION_COOKIE } from "./constants";

export class Request {
  private readonly request: FetcherRequest;

  public constructor (path: string) {
    this.request = {
      url: new URL(BASE_URL + path),
      redirect: "manual"
    };
  }

  public setFormData (data: URLSearchParams): void {
    this.request.method = "POST";
    this.request.content = data.toString();
    setHeaderToRequest(this.request, "Content-Type", "application/x-www-form-urlencoded");
  }

  public useSession (session: Session): void {
    setCookiesArrayToRequest(this.request, [`${SESSION_COOKIE}=${session.phpSessId}`]);
  }

  public send (fetcher: Fetcher = defaultFetcher): Promise<Response> {
    return fetcher(this.request);
  }
}
