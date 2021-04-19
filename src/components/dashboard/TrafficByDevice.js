/* eslint-disable */
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  useTheme
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import MoodIcon from '@material-ui/icons/Mood';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import { loadToday } from 'src/dataModel';
import { useState, useEffect } from 'react';

const TrafficByDevice = (props) => {
  const theme = useTheme();
  const [caseList, setCaseList] = useState([]);
  const [percentList, setPercentList] = useState([]);

  useEffect(() => {
    if (caseList.length == 0) {
      getJSON();
    }
  }, []);

  const getJSON = async () => {
    const jsonData = await loadToday();
    // console.log(jsonData);
    const active = jsonData.active;
    const recovered = jsonData.recovered;
    const deaths = jsonData.deaths;
    const cases = jsonData.cases;
    let l1 = [], l2 = [];
    l1.push(active);
    l1.push(recovered);
    l1.push(deaths);
    const p1 = Math.round(100 * active / cases);
    const p2 = Math.round(100 * recovered / cases);
    const p3 = Math.round(100 * deaths / cases);
    l2.push(p1);
    l2.push(p2);
    l2.push(p3);
    setCaseList(l1);
    setPercentList(l2);
  };

  const data = {
    datasets: [
      {
        data: caseList,
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Active', 'Recovered', 'Death']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Active',
      value: percentList[0],
      icon: FaceIcon,
      color: colors.indigo[500]
    },
    {
      title: 'Recovered',
      value: percentList[1],
      icon: MoodIcon,
      color: colors.red[600]
    },
    {
      title: 'Death',
      value: percentList[2],
      icon: MoodBadIcon,
      color: colors.orange[600]
    }
  ];

  return (
    <Card {...props}>
      <CardHeader title="General Statistic" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h2"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TrafficByDevice;
