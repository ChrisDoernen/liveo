import { HslColor } from "./hsl-color.entity";

export class ThemeEntity {
  constructor(
    public color: HslColor,
    public logo: string
  ) {
  }
}
