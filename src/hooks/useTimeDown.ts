import { startOfDay, addMinutes, addHours, differenceInMinutes, differenceInSeconds, format } from "date-fns";
import { onMounted, onUnmounted, ref } from "vue";

function disablePageScroll() {
  document.body.style.overflow = "hidden";
}

export function useTimeDown() {
  let intervalId: any = null;
  const currentTime = ref(new Date());

  const today = startOfDay(currentTime.value);
  const targetTime = addMinutes(addHours(today, 18), 20);
  const formatToday = format(today, "yyyy-MM-dd");

  const remainingMinutes = ref(differenceInMinutes(targetTime, currentTime.value));
  const remainingSeconds = ref(differenceInSeconds(targetTime, currentTime.value) % 60);

  const updateRemainingTime = () => {
    remainingMinutes.value = differenceInMinutes(targetTime, currentTime.value);
    remainingSeconds.value = differenceInSeconds(targetTime, currentTime.value) % 60;
  };

  onMounted(() => {
    window.addEventListener("load", disablePageScroll);
    intervalId = setInterval(() => {
      currentTime.value = new Date();
      updateRemainingTime();
    }, 1000);
  });

  onUnmounted(() => clearInterval(intervalId));

  return {
    formatToday,
    remainingMinutes,
    remainingSeconds
  };
}
