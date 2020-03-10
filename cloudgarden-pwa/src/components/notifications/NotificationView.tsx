/**
 * Creation Date: March 7, 2020
 * Author: Luke Slevinsky
 * A test page for notifications
 */

import React from "react";
import List from "./List";
import { useSensorDataState } from "../../contexts";
import { Grid } from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "80vh",
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    list: {
      position: "absolute",
      top: 0,
      left: 0,
      margin: theme.spacing(2)
    }
  })
);

const NotificationView: React.FC = () => {
  const styles = useStyles(useTheme());
  const { notifications } = useSensorDataState();
  console.log("notifications");
  console.log(notifications);
  console.log(notifications.length);

  return (
    <Grid
      container
      className={styles.root}
      alignItems="center"
      justify="center"
      direction="column"
    >
      <List className={styles.list} data={notifications} />
    </Grid>
  );
};

export default NotificationView;
