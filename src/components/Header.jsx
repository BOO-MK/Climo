import React, { useState } from 'react';
import logoImg from '../assets/logo.png'; 

function Header() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-between items-center px-[40px] py-[20px] relative z-[100]">
      <div className="flex items-center gap-1">
        <img 
          src={logoImg} 
          alt="Climo Logo" 
          className="h-[40px] w-auto object-contain" 
        />
        <div className="text-[32px] tracking-tight">Climo</div>
      </div>

      {/* About 섹션 */}
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="text-[32px] text-[var(--color-text-about)] cursor-help opacity-80 hover:opacity-100 transition-opacity">
          About
        </div>

        {/* 설명 사각형 (200px * 300px) */}
        {isHovered && (
          <div className="
            absolute top-0 right-[110%] 
            w-[200px] h-[300px] 
            bg-white border border-gray-100 shadow-2xl rounded-2xl p-6
            text-gray-800 z-[110]
            animate-in fade-in slide-in-from-right-5 duration-200
            flex flex-col
          ">
            {/* 상단 설명 */}
            <div className="flex-grow">
              <h4 className="text-blue-600 font-bold text-lg mb-2">Service</h4>
              <p className="text-[13px] leading-relaxed text-gray-600">
                Climo는 라즈베리파이를 통해 실시간으로 환경 정보를 알려드리고 있습니다!
              </p>
            </div>

            {/* 구분선 */}
            <div className="h-[1px] bg-gray-100 my-4"></div>

            {/* 참여자 정보 */}
            <div>
              <h4 className="text-gray-400 text-[11px] font-bold uppercase mb-3 tracking-wider">TEAM Memders</h4>
              <ul className="text-[12px] space-y-2">
                <li className="flex justify-between">
                  <span className="font-semibold">이지원</span>
                  <span className="text-blue-500 font-medium text-[11px]">Lead & DB</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">김나영</span>
                  <span className="text-gray-500 text-[11px]">IoT Sensor</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">김민경</span>
                  <span className="text-gray-500 text-[11px]">Frontend</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">김홍준</span>
                  <span className="text-gray-500 text-[11px]">Flask Server</span>
                </li>
              </ul>
            </div>

            {/* 말풍선 꼬리 */}
            <div className="absolute right-[-6px] top-4 w-3 h-3 bg-white rotate-45 border-t border-r border-gray-100"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
