/**
 * Creation Date: March 8, 2020
 * Author: Gillian Pierce
 * Adapted from TestNotificationView to hold notifications
 */

import React from "react";
import List from "./List";
import { useSensorData, REMOVE_NOTIFICATION_DATA } from "../../contexts";
import { Grid } from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from "@material-ui/core/styles";
import axios from "axios";
import { Notification } from "../../types";

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

// axios configs
const apiBaseUrl = "https://db-to-signalr-service.azurewebsites.net/";

const NotificationView: React.FC = () => {
  const styles = useStyles(useTheme());
  const [state, dispatch] = useSensorData();
  const { notifications } = state;

  async function deleteNotification(id: string) {
    try {
      const resp = await axios.post(
        `${apiBaseUrl}api/DeleteNotification`,
        null,
        {
          params: {
            id
          }
        }
      );
      const updatedNotification = notifications.find(
        (n: Notification) => n.id === id
      );
      if (updatedNotification) {
        dispatch({
          type: REMOVE_NOTIFICATION_DATA,
          payload: { updatedNotification }
        });
      } else {
        console.log(`Can't find the notification to delete id: ${id}`);
      }
      return resp.data;
    } catch (e) {
      console.log(e);
      return {};
    }
  }

  const dataSorter = (a: Notification, b: Notification) => {
    return a._ts - b._ts;
  };

  return (
    <Grid
      container
      className={styles.root}
      alignItems="center"
      justify="center"
      direction="column"
    >
      <List
        className={styles.list}
        data={notifications}
        onClickDelete={deleteNotification}
        dataSorter={dataSorter}
      />
    </Grid>
  );
};

export default NotificationView;
