/**
 * Creation Date: March 19, 2020
 * Author: Luke Slevinsky
 * Component for custom user inputs
 */

import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import _ from "lodash";

type InputType = "MOISTURE" | "LIGHT";

interface InputProps {
  type: InputType;
  disabled: boolean;
}
interface UserInputProps {
  type: InputType;
  onSubmit: Function;
  onTurnOff: Function;
}

const useStyles = makeStyles(theme =>
  createStyles({
    button: {
      background: theme.palette.secondary.main,
      border: 0,
      borderRadius: 8,
      color: "white",
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      "&:hover": {
        background: theme.palette.secondary.dark
      },
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    card: {
      transition: "0.3s",
      boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      margin: 8,
      color: theme.palette.primary.dark,
      height: "100%"
    },
    cardContent: {
      display: "flex",
      position: "relative",
      flexDirection: "column",
      alignItems: "stretch",
      height: "100%"
    },
    gridList: {
      width: "100%",
      height: "100%"
    },
    formControl: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      minWidth: 250
    },
    helperText: {
      color: theme.palette.primary.dark
    },
    switch: {
      alignSelf: "flex-end"
    },
    actions: {
      display: "flex",
      justifyContent: "space-around",
      width: "100%",
      alignItems: "center"
    },
    disabled: {
      color: "rgba(0, 0, 0, 0.38)"
    }
  })
);

const UserInput: React.FC<UserInputProps> = props => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const [inputState, setInputState]: [boolean, Function] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState<Date | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<Date | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<string>("");
  const { onSubmit } = props;

  const handleStartTimeChange = (date: Date | null) => {
    setSelectedStartTime(date);
  };
  const handleEndTimeChange = (date: Date | null) => {
    setSelectedEndTime(date);
  };
  const handleNumberChange = (number: string) => {
    setSelectedNumber(number);
  };
  const onSwitchChanged = () => {
    setInputState((lastState: boolean) => {
      if (lastState) props.onTurnOff();
      return !lastState;
    });
  };

  const Input: React.FC<InputProps> = props => {
    return (
      <>
        <CardContent className={styles.cardContent}>
          {props.type === "MOISTURE" ? (
            <FormControl
              className={styles.formControl}
              disabled={!props.disabled}
            >
              <InputLabel classes={{ root: styles.helperText }}>
                Ideal moisture level
              </InputLabel>
              <Select
                autoWidth
                id="moisture-select"
                value={selectedNumber}
                onChange={e => {
                  handleNumberChange(e.target.value as string);
                }}
              >
                {_.range(1, 11).map((i: number) => (
                  <MenuItem value={i}>{i}</MenuItem>
                ))}
                }
              </Select>
            </FormControl>
          ) : (
            <>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <InputLabel
                  className={
                    !props.disabled ? styles.disabled : styles.helperText
                  }
                >
                  Turn on light at
                </InputLabel>
                <KeyboardTimePicker
                  disabled={!props.disabled}
                  margin="normal"
                  id="time-picker"
                  mask="__:__ _M"
                  value={selectedStartTime}
                  onChange={handleStartTimeChange}
                  KeyboardButtonProps={{
                    "aria-label": "change start time"
                  }}
                  className={styles.helperText}
                  placeholder="8:00 AM"
                />
                <InputLabel
                  className={
                    !props.disabled ? styles.disabled : styles.helperText
                  }
                >
                  Turn off light at
                </InputLabel>
                <KeyboardTimePicker
                  disabled={!props.disabled}
                  margin="normal"
                  id="time-picker"
                  mask="__:__ _M"
                  value={selectedEndTime}
                  onChange={handleEndTimeChange}
                  KeyboardButtonProps={{
                    "aria-label": "change end time"
                  }}
                  className={styles.helperText}
                  placeholder="8:00 AM"
                />
              </MuiPickersUtilsProvider>
            </>
          )}
        </CardContent>
        <CardActions className={styles.actions}>
          <Button
            disabled={
              !props.disabled ||
              (selectedNumber == "" && props.type == "MOISTURE") ||
              ((selectedStartTime == null || selectedEndTime == null) &&
                props.type == "LIGHT")
            }
            id="submit-button"
            className={styles.button}
            onClick={() =>
              onSubmit(+selectedNumber, selectedStartTime, selectedEndTime)
            }
          >
            Submit Update
          </Button>
        </CardActions>
      </>
    );
  };

  return (
    <Card className={styles.card}>
      <CardHeader
        classes={{ action: styles.switch }}
        action={
          <Switch
            checked={inputState}
            onChange={onSwitchChanged}
            color="secondary"
            size="medium"
          />
        }
        title={
          <Typography variant={"overline"}>Automatic Sensor Control</Typography>
        }
        subheader={
          <Typography variant={"h6"}>{_.capitalize(props.type)}</Typography>
        }
      />
      <Input type={props.type} disabled={inputState} />
    </Card>
  );
};

export default UserInput;
