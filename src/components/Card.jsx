function Card({ title, value, unit }) {
  return (
    <div className="
      flex flex-col
      w-full 
      max-w-[265px]
      mx-auto 
      h-[180px]
      bg-[color:var(--color-bg)]
      rounded-2xl shadow-xl
      p-6
      relative
    ">

      {/* 제목 */}
      <p className="absolute top-[27px] left-[39px]">
        {title}
      </p>

      {/* 값 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-6xl">
          {value}
          <span className="text-xl ml-1">
            {unit}
          </span>
        </p>
      </div>

    </div>
  )
}

export default Card