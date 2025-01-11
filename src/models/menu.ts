export type Dishes = Readonly<{
  entry: string[],
  side: string[],
  main: string[],
  dairy: string[],
  dessert: string[]
}>;

export type Menu = Readonly<{
  name: string,
  url: string
}>;
