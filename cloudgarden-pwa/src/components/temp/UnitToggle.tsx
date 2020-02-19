import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import Grid from "@material-ui/core/Grid";
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
