import React from "react";
import {
  ListItem,
  ListItemText,
  Typography,
  IconButton
} from "@material-ui/core";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import theme from "../../styles/Theme";
interface ListProps {
  data: any[];
  className: string;
}

const StyledListItem = styled(ListItem)`
  background-color: ${theme.palette.secondary.light};
  &:hover {
    background-color: ${theme.palette.primary.light};
  }
  button {
    color: white;
    background-color: ${theme.palette.secondary.dark};
  }
`;

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;

  const item = props.data[props.index];

  return (
    <StyledListItem
      button
      divider
      align-items="flex-start"
      style={style}
      key={index}
    >
      <ListItemText
        primary={
          <Typography variant="h5" color="textPrimary">
            {item.title}
          </Typography>
        }
        secondary={
          <Typography variant="body2" color="textPrimary">
            {item.body}
          </Typography>
        }
      />
      <IconButton edge="end" aria-label="delete" size="small">
        <CloseIcon fontSize="large" />
      </IconButton>
    </StyledListItem>
  );
}

const VirtualizedList: React.FC<ListProps> = props => {
  console.log("props.data.length");
  console.log(props.data.length);
  return (
    <AutoSizer className={props.className}>
      {({ height, width }) => (
        <FixedSizeList
          itemData={props.data}
          itemSize={90}
          itemCount={props.data.length}
          height={height}
          width={width}
        >
          {renderRow}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};

export default VirtualizedList;
