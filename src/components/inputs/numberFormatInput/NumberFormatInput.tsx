import { forwardRef } from "react";
import NumberFormat, { NumberFormatProps } from "react-number-format";

interface INumberFormatInputProps
  extends Omit<
    NumberFormatProps<React.DOMAttributes<HTMLInputElement>>,
    "min" | "max"
  > {
  onChange: (...event: any[]) => void;
  name: string;
  min?: number;
  max?: number;
}

const NumberFormatInput = forwardRef<
  NumberFormat<React.DOMAttributes<HTMLInputElement>>,
  INumberFormatInputProps
>(function NumberFormatCustom(
  {
    onChange,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    ...rest
  },
  ref
) {
  const handleChange = (value: number = min) => {
    if (value <= min) value = min;
    else if (value >= max) value = max;
    onChange(value);
  };

  const keyDown = (e: any) => {
    if (e.key === "ArrowUp") handleChange(Number(rest.value) + 1);
    if (e.key === "ArrowDown") handleChange(Number(rest.value) - 1);
  };

  return (
    <NumberFormat
      {...rest}
      getInputRef={ref}
      isNumericString
      onValueChange={(e) => {
        handleChange(parseFloat(e.value));
      }}
      onKeyDown={keyDown}
    />
  );
});

export default NumberFormatInput;
