import { ElNotification } from "element-plus";

export const useNotification = () => {
  const key = "updatable";

  const showMessage = (message) => {
    ElNotification({
      message: message,
      position: "bottom-left",
    });
  };

  return {
    showMessage,
  };
};
