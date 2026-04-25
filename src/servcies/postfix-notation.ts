import { Tokenizer } from "./tokenizer";

type OperatorName = "+" | "-" | "x" | "/";
type OperatorRules = {
  precedence: number;
  isLeftAssoc: boolean;
  isUnary: boolean;
  compute: (v1: number, v2: number) => number;
};

const operators: Record<OperatorName, OperatorRules> = {
  "+": {
    precedence: 2,
    isLeftAssoc: true,
    isUnary: false,
    compute: (v1, v2) => v1 + v2,
  },
  "-": {
    precedence: 2,
    isLeftAssoc: true,
    isUnary: false,
    compute: (v1, v2) => v1 - v2,
  },
  x: {
    precedence: 3,
    isLeftAssoc: true,
    isUnary: false,
    compute: (v1, v2) => v1 * v2,
  },
  "/": {
    precedence: 3,
    isLeftAssoc: true,
    isUnary: false,
    compute: (v1, v2) => (v2 !== 0 ? v1 / v2 : 0),
  },
};

const checkPrecedence = (n1: OperatorName, n2: OperatorName) => {
  const o1 = operators[n1];
  const o2 = operators[n2];

  if (!o1 || !o2) return false;

  return (
    o2.precedence > o1.precedence ||
    (o2.precedence === o1.precedence && o1.isLeftAssoc)
  );
};

export class PostfixNotation {
  static create(tokens: string[]): string[] {
    if (tokens.length === 0) {
      return [];
    }

    const stack: string[] = [];
    const output: string[] = [];

    for (const token of tokens) {
      if (Tokenizer.isNumber(token)) {
        output.push(token);
        continue;
      }

      if (Tokenizer.isOp(token)) {
        while (
          stack.length > 0 &&
          checkPrecedence(
            token as OperatorName,
            stack[stack.length - 1] as OperatorName
          )
        ) {
          output.push(stack.pop() as string);
        }

        stack.push(token);
        continue;
      }
    }

    while (stack.length > 0) {
      output.push(stack.pop() as string);
    }

    return output;
  }

  static evaluate(output: string[]): string {
    const stack: string[] = [];

    for (const token of output) {
      if (Tokenizer.isNumber(token)) {
        stack.push(token);
        continue;
      }

      if (Tokenizer.isOp(token)) {
        if (stack.length < 2) {
          throw new Error("stack must contain at least two values");
        }

        const [left, right] = stack.splice(stack.length - 2, 2);
        const result = operators[token as OperatorName].compute(
          Number(left),
          Number(right)
        );

        stack.push(`${result}`);
        continue;
      }
      throw new Error("invalid token");
    }

    return stack[0];
  }
}
