import { defaultFetcher, type Fetcher } from "@literate.ink/utilities";

export class Session {
  public constructor (
    public phpSessId: string,
    public fetcher: Fetcher = defaultFetcher
  ) {}
}
