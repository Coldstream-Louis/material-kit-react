/* eslint-disable */
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import { loadToday } from 'src/dataModel';
import { useState, useEffect } from 'react';

const TotalCustomers = (props) => {
  const [cases, setCases] = useState(0);
  const [todayCases, setTodayCases] = useState(0);

  useEffect(() => {
    if (cases === 0) {
      getTodayCases();
    }
  }, []);

  const getTodayCases = async () => {
    const jsonData = await loadToday();
    setTodayCases(jsonData.todayCases);
    setCases(jsonData.cases);
  };

  return (
    <Card {...props}>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TOTAL CASES
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {cases}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: green[600],
                height: 56,
                width: 56
              }}
            >
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            pt: 2
          }}
        >
          <ArrowUpwardIcon sx={{ color: green[900] }} />
          <Typography
            variant="body2"
            sx={{
              color: green[900],
              mr: 1
            }}
          >
            {todayCases} New Cases
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since Yesterday
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
export default TotalCustomers;
