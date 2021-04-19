/* eslint-disable */
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { loadStates } from 'src/dataModel';
import { useState, useEffect } from 'react';

const LatestOrders = (props) => {
  const [stateList, setStateList] = useState([]);

  useEffect(() => {
    if (stateList.length == 0) {
      getJSON();
    }
  }, []);

  const getJSON = async () => {
    const jsonData = await loadStates();
    let l1 = [];
    for(let i = 0; i < 6; i++) {
      let item = {
        key: i,
        state: jsonData[i].state,
        cases: jsonData[i].cases,
        todayCases: jsonData[i].todayCases,
        active: jsonData[i].active
      }
      l1.push(item);
    }
    setStateList(l1);
  };

  return (
    <Card {...props}>
      <CardHeader title="States Statistic" />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  State Name
                </TableCell>
                <TableCell>
                  Total Cases
                </TableCell>
                <TableCell>
                  New Cases
                </TableCell>
                <TableCell>
                  Active Cases
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stateList.map((state) => (
                <TableRow
                  hover
                  key={state.key}
                >
                  <TableCell>
                    {state.state}
                  </TableCell>
                  <TableCell>
                    {state.cases}
                  </TableCell>
                  <TableCell>
                    {state.todayCases}
                  </TableCell>
                  <TableCell>
                    {state.active}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          href='/app/customers'
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

export default LatestOrders;
