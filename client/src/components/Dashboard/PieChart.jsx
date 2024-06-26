import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import VerticalBarChart from "./VerticalBarChart";

const PieChart = (props) => {
  const [diseaseName, setDiseaseName] = useState([]);
  const [diseaseCount, setDiseaseCount] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState([]);
  const [borderColor, setBorderColor] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function generateRandomColor(props) {
    let maxVal = 0xffffff; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
  }

  function makeData(surveyData) {
    for (let i = 0; i < surveyData?.length; i++) {
      const a = surveyData[i].split(":");
      if (a.length > 1) {
        diseaseName.push(a[0]);
        diseaseCount.push(parseInt(a[1]));
        backgroundColor.push(generateRandomColor());
        borderColor.push(generateRandomColor());
      }
    }

    setDiseaseName(diseaseName);
    setDiseaseCount(diseaseCount);
    setBackgroundColor(backgroundColor);
    setBorderColor(borderColor);
    setIsLoading(false);
  }
  useEffect(() => {
    if (props?.chartData) makeData(props?.chartData.diagnosisCount);
  }, [props]);

  const data = {
    labels: diseaseName,
    datasets: [
      {
        label: "No of disease",
        data: diseaseCount,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="row mt-5 d-flex justify-content-center mb-5">
      <div className="col-lg-5 col-md-12 col-12">
        <h4 className="text-start">
          <b>Patient of this hospital according to Disease :{" "}</b>
        </h4>
        {isLoading ? null : (
          <div
            className=""
            style={{
              width: "800px",
              height: "400px",
            }}
          >
            <Pie data={data} />
          </div>
        )}
      </div>
      <div className="col-2"></div>
      <div className="col-lg-5 col-md-12 col-12">
        <h4 className="text-start"><b>Our Patient according to Location :</b> </h4>
        <VerticalBarChart
          style={{
            width: "80%",
            margin: "auto",
          }}
        ></VerticalBarChart>
      </div>
    </div>
  );
};

export default PieChart;
