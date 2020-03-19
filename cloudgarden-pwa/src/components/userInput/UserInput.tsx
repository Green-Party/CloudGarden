import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Switch,
  TextField
} from "@material-ui/core";
import { KeyboardTimePicker } from "@material-ui/pickers";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";

type InputType = "MOISTURE" | "LIGHT";

interface InputProps {
  type: InputType;
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
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      "&:hover": {
        background: theme.palette.secondary.dark
      }
    },
    card: {
      transition: "0.3s",
      boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
      textAlign: "center",
      margin: 8,
      color: theme.palette.primary.dark,
      justifyContent: "center"
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      textAlign: "center"
    },
    gridList: {
      width: "100%",
      height: "100%"
    }
  })
);

const UserInput: React.FC<UserInputProps> = props => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const [inputState, setInputState]: [boolean, Function] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const handleNumberChange = (number: number | null) => {
    setSelectedNumber(number);
  };
  const onSwitchChanged = () => {
    setInputState((lastState: boolean) => {
      if (!lastState) props.onTurnOff();
      return !lastState;
    });
  };

  const Input: React.FC<InputProps> = props => {
    return (
      <>
        {props.type === "MOISTURE" ? (
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
            onChange={e => {
              handleNumberChange(+e.target.value);
            }}
          />
        ) : (
          <>
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
              onChange={e => {
                handleNumberChange(+e.target.value);
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
          </>
        )}
      </>
    );
  };

  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        <Typography variant={"overline"}>Light Control</Typography>
        <Typography variant={"h6"} gutterBottom>
          Light Off
        </Typography>
        <Switch
          checked={inputState}
          onChange={onSwitchChanged}
          color="secondary"
          size="medium"
        />
        {inputState ? <Input type={props.type} /> : null}
      </CardContent>
      <Button
        id="submit-button"
        className={clsx(styles.button)}
        onClick={() => props.onSubmit(selectedNumber, selectedDate)}
      >
        Water
      </Button>
    </Card>
  );
};

export default UserInput;
