import { FormControlLabel, Switch } from "@mui/material";
import { IS_ENABLED } from "../../feature/automaticTrading/constants";

type ToggleOrderSwitchProps = {
  field: {
    value: number;
    onChange: (value: number) => void;
  };
  label: string;
};
const ToggleOrderSwitch: React.FC<ToggleOrderSwitchProps> = ({
  field,
  label,
}) => {
  const handleSwitchButtonClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e.target.checked ? IS_ENABLED.TRUE : IS_ENABLED.FALSE);
  };
  return (
    <FormControlLabel
      control={
        <Switch
          checked={field.value === IS_ENABLED.TRUE}
          onChange={handleSwitchButtonClick}
          color="primary"
        />
      }
      label={label}
    />
  );
};
export default ToggleOrderSwitch;
