/* eslint-disable */
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import TodayIcon from '@material-ui/icons/Today';
import { red } from '@material-ui/core/colors';
import { loadToday, loadYesterday } from 'src/dataModel';
import { useState, useEffect } from 'react';

const Budget = (props) => {
  const [todayCases, setTodayCases] = useState(0);
  const [yesterdayCases, setYesterdayCases] = useState(0);
  const [percent, setPercent] = useState(0);

  const getTodayCases = async () => {
    const jsonData = await loadToday();
    setTodayCases(jsonData.todayCases);
    await getYesterdayCases(jsonData.todayCases);
  };

  const getYesterdayCases = async (todayCases) => {
    const jsonData = await loadYesterday();
    await setYesterdayCases(jsonData.todayCases);
    setPercent(Math.round(100 * (jsonData.todayCases - todayCases) / jsonData.todayCases));
  };

  useEffect(() => {
    if (todayCases === 0) {
      getTodayCases();
    }
  }, []);

  return (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
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
            TODAY CASES
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            {todayCases}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: red[600],
              height: 56,
              width: 56
            }}
          >
            <TodayIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowDownwardIcon sx={{ color: red[900] }} />
        <Typography
          sx={{
            color: red[900],
            mr: 1
          }}
          variant="body2"
        >
          {percent}%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Compare to Yesterday Cases: {yesterdayCases}
        </Typography>
      </Box>
    </CardContent>
  </Card>
  );
};

export default Budget;
