import type { Fetcher } from "@literate.ink/utilities";

export type Session = Readonly<{
  /**
     * Content of PHPSESSID cookie.
     */
  id: string

  fetcher: Fetcher
}>;
