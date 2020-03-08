import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";

interface ListProps {
  data: any[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: 400,
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper
    }
  })
);

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;

  const item = props.data[props.index];

  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={`Item ${item.title}`} />
    </ListItem>
  );
}

const VirtualizedList: React.FC<ListProps> = props => {
  const classes = useStyles();

  console.log("props.data.length");
  console.log(props.data.length);
  return (
    <div className={classes.root}>
      <FixedSizeList
        itemData={props.data}
        height={400}
        width={300}
        itemSize={46}
        itemCount={props.data.length}
      >
        {renderRow}
      </FixedSizeList>
    </div>
  );
};

export default VirtualizedList;
