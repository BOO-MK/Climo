import { useEffect, useState } from "react";
import Card from "../components/Card";
import Chart from "../components/Chart";

function Dashboard() {
  const [sensorData, setSensorData] = useState({
    temperature: "-",
    humidity: "-",
    avg_10min_humidity: "-",
    temp_diff_5min: "-",
    humidity_diff_5min: "-",
    status: "-",
  });

  const fetchSensorData = async () => {
    try {
      const response = await fetch("/data");

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      const data = await response.json();
      console.log("실제 센서 데이터:", data);

      setSensorData({
        temperature: data.temperature ?? "-",
        humidity: data.humidity ?? "-",
        avg_10min_humidity: data.avg_10min_humidity ?? "-",
        temp_diff_5min: data.temp_diff_5min ?? "-",
        humidity_diff_5min: data.humidity_diff_5min ?? "-",
        status: data.status ?? "-",
      });
    } catch (error) {
      console.error("센서 데이터 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchSensorData();

    const interval = setInterval(fetchSensorData, 60000);

    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      title: "Now Temp",
      value: sensorData.temperature,
      unit: "°C",
    },
    {
      title: "Now Humi",
      value: sensorData.humidity,
      unit: "%",
    },
    {
      title: "10min Avg Humi",
      value: sensorData.avg_10min_humidity,
      unit: "%",
    },
    {
      title: "Status",
      value: sensorData.status,
      unit: "",
    },
  ];

  return (
    <div className="flex-grow flex flex-col items-center pb-[100px] relative min-h-full">
      <div
        className="
        absolute 
        top-[90px]
        left-[25px]
        right-[25px]
        bottom-0
        bg-[color:var(--color-bgs)] 
        rounded-t-[40px] 
        -z-10
      "
      ></div>

      <div
        className="
        grid 
        gap-6 
        mt-[115px] 
        w-full 
        max-w-[1200px] 
        px-[50px] 
        justify-center
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
        z-10
      "
      >
        {cards.map((card, i) => (
          <Card
            key={i}
            title={card.title}
            value={card.value}
            unit={card.unit}
          />
        ))}

        <div
          className="
            w-full
            bg-[var(--color-bg)]
            rounded-2xl shadow-xl 
            p-6
            h-[600px]
            flex items-center justify-center
          "
          style={{ gridColumn: "1 / -1" }}
        >
          <Chart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
