/**
 * Creation Date: February 7, 2020
 * Author: Gillian Pierce
 * A component for toggling units, specifically for use with the Temperature dashboard
 */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const useStyles = makeStyles(theme => ({
  toggleContainer: {
    margin: theme.spacing(2, 0)
  }
}));

export default function ToggleButtons() {
  const [alignment, setAlignment] = React.useState<string | null>("left");
  const [formats, setFormats] = React.useState(() => ["bold"]);

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    setFormats(newFormats);
  };

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  const classes = useStyles();

  return (
    <div className={classes.toggleContainer}>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value="left" aria-label="celsius">
          ℃
        </ToggleButton>
        <ToggleButton value="center" aria-label="ferenheit">
          ℉
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
