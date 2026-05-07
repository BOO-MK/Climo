import Card from "../components/Card"
import Chart from "../components/Chart"

function Dashboard() {

  const cards = [
    { title: "Now Temp", value: "24.3", unit: "°C" },
    { title: "Now RH", value: "41", unit: "%" },
    { title: "Max Temp", value: "24.3", unit: "°C" },
    { title: "Max Temp", value: "41", unit: "%" }
  ]

  return (
    <div className="flex-grow flex flex-col items-center pb-[100px] relative min-h-full">

      {/* 배경 디자인 */}
      <div className="
        absolute 
        top-[90px]
        left-[25px]
        right-[25px]
        bottom-0
        bg-[color:var(--color-bgs)] 
        rounded-t-[40px] 
        -z-10
      "></div>

      {/* 메인 */}
      <div className="
        grid 
        gap-6 
        mt-[115px] 
        w-full 
        max-w-[1200px] 
        px-[50px] 
        justify-center
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
        z-10
      ">

        {/* 카드 */}
        {cards.map((card, i) => (
          <Card
            key={i}
            title={card.title}
            value={card.value}
            unit={card.unit}
          />
        ))}

        {/* 차트 영역 */}
        <div className="
          min-[0px]:col-span-1 
          grid-column: 1 / -1; 
          w-full
          bg-[var(--color-bg)]
          rounded-2xl shadow-xl 
          p-6
          h-[600px]
          flex items-center justify-center
        "
        style={{ gridColumn: "1 / -1" }} /* 모든 열을 다 차지하도록 강제 */
        >
          <Chart />
        </div>

      </div>
      
    </div>
  )
}

export default Dashboard