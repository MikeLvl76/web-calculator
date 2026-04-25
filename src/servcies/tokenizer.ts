export class Tokenizer {
  static isToken(token: string): boolean {
    return token.length === 1;
  }

  static isDigit(token: string): boolean {
    return /^[0-9]$/.test(token);
  }

  static isNumber(token: string): boolean {
    return /^\d+(\.\d+)?$/.test(token);
  }

  static isDot(token: string): boolean {
    return token === ".";
  }

  static isOp(token: string): boolean {
    return /^(\+|-|x|\/)$/.test(token);
  }

  static tokenize(expression: string): string[] {
    let index = 0;
    const tokens: string[] = [];
    let prevType: "number" | "operator" | null = null;

    while (index < expression.length) {
      const token = expression[index];

      if (Tokenizer.isDigit(token) || Tokenizer.isDot(token)) {
        let str = "";
        let hasDot = false;
        let decimals = 0;

        while (
          index < expression.length &&
          (Tokenizer.isDigit(expression[index]) ||
            Tokenizer.isDot(expression[index]))
        ) {
          const current = expression[index];

          if (Tokenizer.isDot(current)) {
            if (hasDot) {
              throw new Error("invalid token: too much dots");
            }
            hasDot = true;
          } else if (hasDot) {
            decimals++;
            if (decimals > 3) {
              throw new Error("invalid token: too much decimals");
            }
          }

          str += current;
          index++;
        }

        if (!Tokenizer.isNumber(str)) {
          throw new Error(`invalid number '${str}'`);
        }

        tokens.push(str);
        prevType = "number";
        continue;
      }

      if (Tokenizer.isOp(token)) {
        if (prevType === "operator" || prevType === null) {
          throw new Error(`invalid operator sequence '${token}'`);
        }
        tokens.push(token);
        prevType = "operator";
        index++;
        continue;
      }

      throw new Error(`invalid token '${token}'`);
    }

    return tokens;
  }
}
