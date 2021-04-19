/* eslint-disable */
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import { TableSortLabel } from '@material-ui/core';
import { loadStates } from 'src/dataModel';
import { useState, useEffect } from 'react';

const CustomerListResults = ({ customers, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [stateList, setStateList] = useState([]);

  useEffect(() => {
    if (stateList.length == 0) {
      getJSON();
    }
  }, []);

  const getJSON = async () => {
    const jsonData = await loadStates();
    let l1 = [];
    for(let i = 0; i < jsonData.length; i++) {
      let item = {
        key: i,
        state: jsonData[i].state,
        cases: jsonData[i].cases,
        todayCases: jsonData[i].todayCases,
        recovered: jsonData[i].recovered,
        deaths: jsonData[i].deaths,
        active: jsonData[i].active,
        tests: jsonData[i].active,
        casesPerOneMillion: jsonData[i].casesPerOneMillion
      }
      l1.push(item);
    }
    setStateList(l1);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel>
                    State
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel active={true} direction='desc'>
                    Total Cases
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  New Cases
                </TableCell>
                <TableCell>
                  Total Recovered
                </TableCell>
                <TableCell>
                  Total Deaths
                </TableCell>
                <TableCell>
                  Active
                </TableCell>
                <TableCell>
                  Tests
                </TableCell>
                <TableCell>
                  Cases Per Million
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stateList.slice(page*limit, (page+1)*limit).map((state) => (
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
                    {state.recovered}
                  </TableCell>
                  <TableCell>
                    {state.deaths}
                  </TableCell>
                  <TableCell>
                    {state.active}
                  </TableCell>
                  <TableCell>
                    {state.tests}
                  </TableCell>
                  <TableCell>
                    {state.casesPerOneMillion}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={stateList.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  stateList: PropTypes.array.isRequired
};

export default CustomerListResults;
