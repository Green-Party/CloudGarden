/**
 * Creation Date: March 7, 2020
 * Author: Luke Slevinsky
 * A generic list component using material UIs virtual list components
 */
import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Slide
} from "@material-ui/core";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";
import theme from "../../styles/Theme";
interface ListProps {
  data: any[];
  className: string;
  onClickDelete: Function;
  dataSorter?: (a: any, b: any) => number;
}

interface AutosizerProps {
  height: number;
  width: number;
}

interface RowRenderprops {
  props: ListChildComponentProps;
  onClick: Function;
}

const StyledListItem = styled(ListItem)`
  background-color: ${theme.palette.secondary.light};
  &:hover {
    background-color: ${theme.palette.primary.light};
  }
  button {
    padding: 8px;
    color: ${theme.palette.secondary.main};
    &:hover {
      color: ${theme.palette.primary.dark};
    }
  }
`;

const RenderRow: React.FC<RowRenderprops> = ({
  props,
  onClick
}: RowRenderprops) => {
  const { index, style } = props;
  const [deleted, setDeleted] = useState(false);
  const item = props.data[props.index];

  return (
    <Slide in={!deleted} direction="right">
      <StyledListItem
        button
        divider
        align-items="flex-start"
        style={style}
        key={index}
      >
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="overline" color="textPrimary">
                {new Date(item._ts * 1000).toLocaleString()}
              </Typography>
              <Typography variant="h5" color="textPrimary">
                {item.title}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <Typography variant="body2" color="textPrimary">
              {item.body}
            </Typography>
          }
        />
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            onClick(item.id);
            setDeleted(true);
          }}
        >
          <DeleteIcon fontSize="large" />
        </IconButton>
      </StyledListItem>
    </Slide>
  );
};

const VirtualizedList: React.FC<ListProps> = props => {
  if (props.dataSorter) {
    props.data.sort(props.dataSorter);
  }
  return (
    <AutoSizer className={props.className}>
      {({ height, width }: AutosizerProps) => (
        <FixedSizeList
          itemData={props.data.reverse()}
          itemSize={150}
          itemCount={props.data.length}
          height={height}
          width={width}
        >
          {(renderProps: ListChildComponentProps) =>
            RenderRow({ props: renderProps, onClick: props.onClickDelete })
          }
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};

export default VirtualizedList;
