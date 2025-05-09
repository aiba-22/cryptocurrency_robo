import { FormControlLabel, Switch } from "@mui/material";
import { IS_ENABLED } from "../../feature/automaticTrading/constants";

function ToggleOrderSwitch({
  field,
  label,
}: {
  field: {
    value: number;
    onChange: (value: number) => void;
  };
  label: string;
}) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={field.value === IS_ENABLED.TRUE}
          onChange={(e) =>
            field.onChange(
              e.target.checked ? IS_ENABLED.TRUE : IS_ENABLED.FALSE
            )
          }
          color="primary"
        />
      }
      label={label}
    />
  );
}
export default ToggleOrderSwitch;
