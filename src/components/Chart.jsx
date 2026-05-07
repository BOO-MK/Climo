import React, { useState, useEffect, useMemo } from 'react';
import { useToast } from '../components/ToastProvider';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// 1. ChartJS 플러그인 등록 (컴포넌트 외부에서 한 번만 실행)
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// 2. 고정 통계 데이터 (컴포넌트 외부로 빼서 렌더링 시마다 재생성 방지)
const MOCK_DATA = {
    day: { labels: ['00:00', '06:00', '12:00', '18:00'], temp: [20, 25, 28, 22], humi: [50, 45, 40, 55] },
    week: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], temp: [22, 24, 23, 25, 24], humi: [45, 48, 50, 44, 46] },
    month: { labels: ['1st', '10th', '20th', '30th'], temp: [21, 24, 25, 22], humi: [40, 50, 48, 42] },
};

const fetchSensorData = async () => {
    try {
        const response = await fetch('https://vividly-mud-riverboat.ngrok-free.dev/data', {
            headers: { 'ngrok-skip-browser-warning': 'true' } // Ngrok 에러 방지 헤더
        });
        if (!response.ok) throw new Error(`서버 에러: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("데이터 연동 실패:", error);
        return null;
    }
};

const Chart = () => {
    const showToast = useToast();
    const [viewType, setViewType] = useState('realtime');

    // 실시간 데이터 상태 (초기값)
    const [realtimeData, setRealtimeData] = useState({
        labels: ['12:00', '12:01', '12:02', '12:03', '12:04'],
        temp: [22, 23, 22, 24, 25],
        humi: [45, 47, 46, 48, 50],
    });

    // 알림 로직 분리 및 메모이제이션 (불필요한 재생성 방지)
    const checkAlerts = React.useCallback((temp, humi) => {
        const messages = [];
        if (temp < 10 || temp > 30) messages.push(`온도 이상: ${temp}°C`);
        if (humi < 40 || humi > 60) messages.push(`습도 이상: ${humi}%`);
        if (messages.length > 0) showToast(messages.join(' | '));
    }, [showToast]);

    // 실시간 데이터 업데이트 로직
    useEffect(() => {
        const updateChart = async () => {
            const data = await fetchSensorData(); // 서버 데이터 호출!

            if (data) {
                const now = new Date();
                const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
                
                // 1. 랜덤 값 대신 서버에서 온 진짜 온도, 습도 연결
                const newTemp = data.temperature;
                const newHumi = data.humidity;

                // 2. 알림 동기화: 웹에서 자체 계산하지 않고 서버의 status를 그대로 사용
                if (data.status === "경고" || data.status === "주의") {
                    showToast(data.alert_message); // 서버가 준 메시지를 바로 토스트로!
                }

                // 3. 차트 데이터 업데이트
                setRealtimeData(prev => ({
                    labels: [...prev.labels.slice(-9), timeStr],
                    temp: [...prev.temp.slice(-9), newTemp],
                    humi: [...prev.humi.slice(-9), newHumi],
                }));
            }
        };

        updateChart(); // 화면 로딩 시 즉시 1번 실행
        const interval = setInterval(updateChart, 60000); // 60초 주기로 변경 (서버 DB 저장 주기가 60초라서 맞춤)

        return () => clearInterval(interval);
    }, [showToast]);

    // 데이터 선택 로직 (표현식 간소화)
    const displayData = useMemo(() => 
        viewType === 'realtime' ? realtimeData : MOCK_DATA[viewType]
    , [viewType, realtimeData]);

    // 차트 데이터 구성
    const chartConfig = {
        labels: displayData.labels,
        datasets: [
            {
                label: '온도 (°C)',
                data: displayData.temp,
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                yAxisID: 'y_temp',
                tension: 0.4,
                fill: true,
            },
            {
                label: '습도 (%)',
                data: displayData.humi,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                yAxisID: 'y_humi',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: {
            y_temp: { position: 'left', min: 0, max: 50, title: { display: true, text: '온도 (°C)', color: '#ef4444' } },
            y_humi: { position: 'right', min: 20, max: 90, title: { display: true, text: '습도 (%)', color: '#3b82f6' } },
            x: { grid: { display: false } },
        },
        plugins: {
            legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } },
        },
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex justify-end gap-2 mb-4">
                {['realtime', 'day', 'week', 'month'].map((type) => (
                    <button
                        key={type}
                        onClick={() => setViewType(type)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition
                            ${viewType === type 
                                ? (type === 'realtime' ? 'bg-red-500 text-white' : 'bg-blue-600 text-white') 
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                        {type === 'realtime' ? '● LIVE' : type.toUpperCase()}
                    </button>
                ))}
            </div>
            <div className="flex-grow">
                {/* key를 통해 viewType 변경 시 캔버스를 클린업하고 새로 그림 */}
                <Line key={viewType} data={chartConfig} options={options} />
            </div>
        </div>
    );
};

export default Chart;