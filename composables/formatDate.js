import { useI18n } from "vue-i18n";

export const useFormatDate = () => {
  const { t } = useI18n();

  function formatFullDate(date, type) {
    try {
      date = new Date(date);
      if (type == "string") {
        const options = {
          // weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        };
        date = new Intl.DateTimeFormat("en-US", options).format(date);
      } else {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        date = date.toLocaleDateString("en-GB", options); // or 'en-US' for mm/dd/yyyy
      }
      return date;
    } catch (_) {}
  }

  function formatDate(uploadedDate) {
    const now = new Date();
    const uploaded = new Date(uploadedDate);

    const diffInSeconds = Math.floor((now - uploaded) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30); // approximate month calculation

    if (diffInMinutes < 60) {
      return t("community.justnow");
    } else if (diffInHours < 24) {
      return `${diffInHours + t("community.hago")}`;
    } else if (diffInDays < 30) {
      return `${diffInDays + t("community.dago")}`;
    } else {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return uploaded.toLocaleDateString("en-US", options);
    }
  }

  // Example usage:
  //   const uploadedDate = "2024-06-26T14:00:00Z"; // replace with your date

  return {
    formatDate,
    formatFullDate,
  };
};
