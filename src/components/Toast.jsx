import React, { useEffect } from 'react';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 6000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    /* 1. 최상위 컨테이너: 전체 화면 너비를 차지하며 하단에 고정 */
    <div className="fixed inset-x-0 bottom-[50px] z-[99999] flex justify-center pointer-events-none">

      {/* 2. 실제 토스트 박스: 여기서 디자인과 애니메이션 처리 */}
      <div className="
      w-[calc(100%-40px)] max-w-[1200px] h-[70px]
      rounded-full 
      style-bgs-color /* 배경색 변수 적용 */
      text-white shadow-2xl backdrop-blur-md border border-white/20
      flex items-center justify-center 
      animate-simple-up pointer-events-auto
      relative
    "
      >
        {/* 중앙 텍스트 내용 */}
        <div className="flex items-center gap-6">
          <span className="text-3xl">⚠️</span>
          <div className="flex flex-col items-center">
            <h4 className="text-red-300 text-[10px] font-bold tracking-[0.2em] uppercase leading-none mb-1">Sensor Alert</h4>
            <p className="text-xl font-bold tracking-tight leading-none">{message}</p>
          </div>
        </div>

        {/* 우측 닫기 버튼: 텍스트 정렬에 방해 안 되게 absolute 처리 */}
        <button
          onClick={onClose}
          className="absolute right-10 top-1/2 -translate-y-1/2 text-2xl text-black hover:opacity-70 transition-all p-2"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;