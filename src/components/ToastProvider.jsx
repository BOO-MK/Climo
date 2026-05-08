import React, { createContext, useContext, useState, useCallback } from "react";
import Toast from "../components/Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  // 메시지가 중복으로 계속 뜨는 것을 방지하기 위해 간단한 로직 포함
  const showToast = useCallback((message) => {
    setToast(message);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {/* 토스트 렌더링 영역 - children(앱 전체)보다 뒤에 작성하여 위에 덮어씀 */}
      {toast && <Toast message={toast} onClose={hideToast} />}
    </ToastContext.Provider>
  );
};

// 커스텀 훅: 이제 어떤 파일에서든 const alert = useToast()로 사용 가능
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
