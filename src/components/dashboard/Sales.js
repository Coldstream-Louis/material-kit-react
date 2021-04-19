/* eslint-disable */
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { loadMonth } from 'src/dataModel';
import { useState, useEffect } from 'react';

const Sales = (props) => {
  const theme = useTheme();
  const [caseList, setCaseList] = useState([]);
  const [dateList, setDateList] = useState([]);
  const [newList, setNewList] = useState([]);

  useEffect(() => {
    if (caseList.length == 0) {
      getJSON();
    }
  }, []);

  const getJSON = async () => {
    const jsonData = await loadMonth();
    // console.log(jsonData);
    const cases = jsonData.timeline.cases;
    let l1 = [], l2 = [], l3 = [];
    for(let key in cases) {
      l1.push(key);
      l2.push(cases[key]);
    }
    for(let i = 0; i < l2.length-1; i++) {
      l3.push(l2[i+1] - l2[i]);
    }
    l1.shift();
    l2.shift();
    setDateList(l1);
    setNewList(l3);
    setCaseList(l2);
  };

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: newList,
        label: 'New Cases'
      },
      /*
      {
        backgroundColor: colors.grey[200],
        data: [11, 20, 12, 29, 30, 25, 13],
        label: 'Death'
      }*/
    ],
    labels: dateList
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
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

  return (
    <Card {...props}>
      <CardHeader
        action={(
          <Button
            size="small"
            variant="text"
          >
            Last 30 days
          </Button>
        )}
        title="Cases for Last 30 Days"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
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
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};

export default Sales;
