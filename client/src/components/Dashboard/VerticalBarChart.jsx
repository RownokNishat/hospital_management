import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Bar } from "react-chartjs-2";

const VerticalBarChart = () => {
  const [surveyData, setSurveyData] = useState(null);
  const [district, setDistrict] = useState([]);
  const [districtCount, setDistrictCount] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState([]);
  const [borderColor, setBorderColor] = useState([]);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const auth = useSelector((state) => state.AuthReducer);

  function generateRandomColor() {
    let maxVal = 0xffffff; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
  }

  function makeData(surveyData) {
    
    for (let i = 0; i < surveyData?.length; i++) {
      if (surveyData[i].district && surveyData[i].count) {
        district.push(surveyData[i].district);
        districtCount.push(parseInt(surveyData[i].count));
        backgroundColor.push(generateRandomColor());
        borderColor.push(generateRandomColor());
      }
    }
    setDistrict(district);
    setDistrictCount(districtCount);
    setBackgroundColor(backgroundColor);
    setBorderColor(borderColor);
    setIsLoading(false);
  }

  
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
    };
    
    Axios.get(`api/service/serveyonLocation`, { headers })
      .then((res) => {
        setSurveyData(res?.data);
        makeData(res?.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const data = {
    // datasets: dataSets,
    labels: district,
    datasets: [
      {
        label: "Location",
        data: districtCount,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            display: true,
            drawBorder: false,
            borderDash: [3, 3],
            zeroLineColor: "blue",
          },
          categoryPercentage: 0.7,
          barPercentage: 0.9,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      yAxes: [
        {
          display: true,
          gridLines: {
            display: false,
            zeroLineColor: "transparent",
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div className="">
      {isLoading ? (
        <></>
      ) : (
        <div className=" mx-auto">
          <Bar width="500px" height="400px" options={options} data={data} />
        </div>
      )}
    </div>
  );
};

export default VerticalBarChart;
