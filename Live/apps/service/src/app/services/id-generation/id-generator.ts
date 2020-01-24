import { injectable } from "inversify";
import generate from "nanoid/non-secure/generate";

@injectable()
export class IdGenerator {

  private readonly alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";

  public generateId(length = 10): string {
    return generate(this.alphabet, length);
  }
}
