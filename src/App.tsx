import { useState } from "react";
import "./App.css";

function App() {
  const [toEvaluate, setToEvaluate] = useState<any[]>([]);
  const [operand, setOperand] = useState<number | string>(0);
  const [lastOperator, setLastOperator] = useState<string>();
  const [displayCharacter, setDisplayCharacter] = useState<string[]>([]);
  const [result, setResult] = useState(0);

  const buttonHandler = (value: string) => {
    if (displayCharacter.length === 1 && displayCharacter[0] === "0") {
      setDisplayCharacter([value]);
    } else {
      setDisplayCharacter([...displayCharacter, value]);
    }
    const newOperand =
      operand !== undefined && operand !== 0
        ? operand.toString() + value
        : value;
    setOperand(Number(newOperand));
  };

  const evaluateExpression = () => {
    try {
      setDisplayCharacter([...displayCharacter, " = "]);
      const total = eval(displayCharacter.join(""));
      if (Number.isInteger(total)) {
        setResult(total);
      } else {
        setResult(Math.round(total * 10000) / 10000);
      }
    } catch (err) {
      setResult(0);
    }
    return;
  };

  const symbolHandler = (currentOperator: string) => {
    if (lastOperator === "." && currentOperator === ".") {
      return;
    }
    if (currentOperator === ".") {
      if (!operand) {
        setOperand("0.");
      } else {
        setOperand(operand.toString() + currentOperator);
        setDisplayCharacter([...displayCharacter, currentOperator]);
        setLastOperator(currentOperator);
      }
      return;
    }
    // if (!operand) {
    //   return;
    // }
    setDisplayCharacter([...displayCharacter, " " + currentOperator + " "]);
    if (operand) {
      setToEvaluate([...toEvaluate, operand]);
      setOperand(0);
      if (
        (lastOperator === "+" || lastOperator === "-") &&
        (currentOperator === "*" || currentOperator === "/")
      ) {
        const newToEvaluate = toEvaluate.splice(-1);
        newToEvaluate.push(currentOperator);
        setToEvaluate(newToEvaluate);
      }
      setToEvaluate([...toEvaluate, currentOperator]);
      setLastOperator(currentOperator);
    }
  };

  const clear = () => {
    setToEvaluate([]);
    setDisplayCharacter(["0"]);
    setResult(0);
    setLastOperator(undefined);
  };
  return (
    <div className="flex items-center justify-center min-h-screen min-w-full  bg-[#c2c2d6] ">
      <div className="bg-black h-96 w-72 p-1">
        <div
          className="h-10 font-normal text-right text-orange-300 text-md leading-1"
          id="display"
        >
          {displayCharacter}
        </div>
        <div
          className="h-12 text-white font-bold text-right text-lg leading-1"
        >
          {result}
        </div>
        <div className="grid grid-cols-4 gap-0.5 bg-[black] border-black-200">
          <button
            className="col-span-2 bg-[#993333] text-center text-white px-3 py-4"
            onClick={clear}
            id="clear"
          >
            AC
          </button>
          <button
            className="bg-[#666666] px-3 py-4 text-center text-white"
            value="/"
            id="divide"
            onClick={(e) => symbolHandler((e.target as HTMLInputElement).value)}
          >
            /
          </button>
          <button
            className="bg-[#666666] px-3 py-4 text-center text-white"
            value="*"
            id="multiply"
            onClick={(e) => symbolHandler((e.target as HTMLInputElement).value)}
          >
            X
          </button>
          <button
            className="bg-[#4d4d4d] px-3 py-4 text-center text-white"
            value="7"
            id="seven"
            onClick={(e) => buttonHandler((e.target as HTMLInputElement).value)}
          >
            7
          </button>
          <button
            className="bg-[#4d4d4d] px-3 py-4 text-center text-white"
            value="8"
            id="eight"
            onClick={(e) => buttonHandler((e.target as HTMLInputElement).value)}
          >
            8
          </button>
          <button
            className="bg-[#4d4d4d] px-3 py-4 text-center text-white"
            value="9"
            id="nine"
            onClick={(e) => buttonHandler((e.target as HTMLInputElement).value)}
          >
            9
          </button>
          <button
            className="bg-[#666666] px-3 py-4 text-center text-white"
            value="-"
            id="subtract"
            onClick={(e) => symbolHandler((e.target as HTMLInputElement).value)}
          >
            -
          </button>
          <button
            className="bg-[#4d4d4d] px-3 py-4 text-center text-white"
            value="4"
            id="four"
            onClick={(e) => buttonHandler((e.target as HTMLInputElement).value)}
          >
            4
          </button>
          <button
            className="bg-[#4d4d4d] px-3 py-4 text-center text-white"
            value="5"
            id="five"
            onClick={(e) => buttonHandler((e.target as HTMLInputElement).value)}
          >
            5
          </button>
          <button
            className="bg-[#4d4d4d] px-3 py-4 text-center text-white"
            value="6"
            id="six"
            onClick={(e) => buttonHandler((e.target as HTMLInputElement).value)}
          >
            6
          </button>
          <button
            className="bg-[#666666] px-3 py-4 text-center text-white"
            value="+"
            id="add"
            onClick={(e) => symbolHandler((e.target as HTMLInputElement).value)}
          >
            +
          </button>
          <button
            className="bg-[#4d4d4d] px-3 py-4 text-center text-white"
            value="1"
            id="one"
            onClick={(e) => buttonHandler((e.target as HTMLInputElement).value)}
          >
            1
          </button>
          <button
            className="bg-[#4d4d4d] px-3 py-4 text-center text-white"
            value="2"
            id="two"
            onClick={(e) => buttonHandler((e.target as HTMLInputElement).value)}
          >
            2
          </button>
          <button
            className="bg-[#4d4d4d] px-3 py-4 text-center text-white"
            value="3"
            id="three"
            onClick={(e) => buttonHandler((e.target as HTMLInputElement).value)}
          >
            3
          </button>
          <button
            className="bg-[#003366] px-3 py-4 text-center text-white row-span-2"
            id="equals"
            value="="
            onClick={evaluateExpression}
          >
            =
          </button>
          <button
            className="col-span-2 bg-[#4d4d4d] px-3 py-4 text-center text-white"
            value="0"
            id="zero"
            onClick={(e) => buttonHandler((e.target as HTMLInputElement).value)}
          >
            0
          </button>
          <button
            className="bg-[#4d4d4d] px-3 py-4 text-center text-white"
            value="."
            id="decimal"
            onClick={(e) => symbolHandler((e.target as HTMLInputElement).value)}
          >
            .
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
