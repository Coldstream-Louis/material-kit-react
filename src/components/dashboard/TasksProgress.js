/* eslint-disable */
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import { loadToday } from 'src/dataModel';
import { useState, useEffect } from 'react';

const TasksProgress = (props) => {
  const [rate, setRate] = useState(0);
  const [tests, setTests] = useState(0);

  useEffect(() => {
    if (rate === 0) {
      getTodayCases();
    }
  }, []);

  const getTodayCases = async () => {
    const jsonData = await loadToday();
    setTests(jsonData.tests);
    setRate(Math.round(1000 * (jsonData.cases / jsonData.tests)) / 10);
  };

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
              TOTAL POSITIVE RATE
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {rate}%
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: orange[600],
                height: 56,
                width: 56
              }}
            >
              <TrendingDownIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <LinearProgress
            value={rate}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TasksProgress;
