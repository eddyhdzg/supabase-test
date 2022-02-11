import { useState, useEffect } from "react";
import { InputAdornment, InputBaseProps, TextField } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MUITimePicker, { TimePickerProps } from "@mui/lab/TimePicker";
import DateAdapter from "@mui/lab/AdapterDayjs";
import { Dayjs } from "dayjs";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { convertSecondsToHMS } from "utils";

interface ITimePickerProps extends Omit<TimePickerProps, "renderInput"> {
  error?: boolean;
  onBlur?: InputBaseProps["onBlur"];
}

export default function TimePicker({
  label,
  error,
  value,
  onChange,
  onBlur,
}: ITimePickerProps) {
  const now = new Date();

  const [date, setDate] = useState<Date | null>(
    new Date(now.getFullYear(), now.getMonth(), now.getDay(), 0, 0, 0)
  );

  useEffect(() => {
    const { h, m, s } = convertSecondsToHMS(value as number);
    setDate(new Date(now.getFullYear(), now.getMonth(), now.getDay(), h, m, s));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <MUITimePicker
        label={label}
        value={date}
        // @ts-ignore
        onChange={(e: Dayjs) => {
          const h = e?.hour() || 0;
          const m = e?.minute() || 0;
          const s = e?.second() || 0;
          const seconds = h * 3600 + m * 60 + s;
          onChange(seconds);
        }}
        disableOpenPicker
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            error={error}
            onBlur={onBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" disablePointerEvents>
                  <AccessTimeIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
        ampm={false}
        openTo="hours"
        views={["hours", "minutes", "seconds"]}
        inputFormat="HH:mm:ss"
        mask="__:__:__"
      />
    </LocalizationProvider>
  );
}
