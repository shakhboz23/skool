<template>
  <apexchart
    v-if="is_mount"
    type="line"
    :height="height"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script setup>
const is_mount = ref(false);
defineProps({
  height: {
    type: [Number, String],
    default: 220,
  },
  chartOptions: {
    type: Object,
    default: () => ({
      chart: {
        // height: 170,
        // type: 'line',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#2A85FF"],
      yaxis: {
        tickAmount: 4,
        // labels: {
        //   formatter: function (value) {
        //     return value.toFixed(0); // Customize the y-axis labels
        //   },
        // },
      },
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      dataLabels: {
        enabled: false,
      },
      zoom: {
        enabled: false,
      },

      stroke: {
        curve: "straight",
        width: 2,
      },
      legend: {
        show: false,
      },
      tooltip: {
        style: {
          background: "transparent",
          boxShadow: "transparent",
          filter: "transparent",
        },
        theme: "custom-tooltip",
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          return `
            <div class="relative !-ml-5">
              <div class="bg-white dropdown_shadow space-y-3 py-3 px-4 -ml-[170px] -mt-14" width="140" height="75">
                <p class="text-sm _c07">February 08, 2024</p>
                <p class="text-xl font-bold _c2a">${series[0][dataPointIndex]}</p>
              </div>
            </div>`;
        },
      },
    }),
  },
  series: {
    type: Array,
    default: () => [
      {
        name: ["Members"],
        data: [5, 10, 10, 1, 2, 2, 3, 2, 4, 4, 5, 3, 4, 9, 3],
      },
    ],
  },
});

// <svg class="-ml-[150px] -mt-14" width="162" height="70" viewBox="0 0 162 70" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <mask id="path-1-inside-1_841_402" fill="white">
//       <path fill-rule="evenodd" clip-rule="evenodd"
//           d="M0 10C0 4.47715 4.47715 0 10 0H152C157.523 0 162 4.47715 162 10V47C162 52.5228 157.523 57 152 57H94C88.1898 57 86.9726 60.8275 85.8583 64.3313C84.9589 67.1594 84.1265 69.7767 81 70C78.0812 69.7755 77.078 67.1313 75.9984 64.2858C74.6738 60.7945 73.2341 57 68 57H10C4.47716 57 0 52.5228 0 47V10Z" />
//   </mask>
//   <path fill-rule="evenodd" clip-rule="evenodd"
//       d="M0 10C0 4.47715 4.47715 0 10 0H152C157.523 0 162 4.47715 162 10V47C162 52.5228 157.523 57 152 57H94C88.1898 57 86.9726 60.8275 85.8583 64.3313C84.9589 67.1594 84.1265 69.7767 81 70C78.0812 69.7755 77.078 67.1313 75.9984 64.2858C74.6738 60.7945 73.2341 57 68 57H10C4.47716 57 0 52.5228 0 47V10Z"
//       fill="#F9F9F9" />
//   <path
//       d="M85.8583 64.3313L84.9053 64.0282V64.0282L85.8583 64.3313ZM81 70L80.9233 70.9971L80.9973 71.0027L81.0713 70.9975L81 70ZM75.9984 64.2858L75.0635 64.6406L75.9984 64.2858ZM10 -1C3.92487 -1 -1 3.92487 -1 10H1C1 5.02944 5.02944 1 10 1V-1ZM152 -1H10V1H152V-1ZM163 10C163 3.92487 158.075 -1 152 -1V1C156.971 1 161 5.02944 161 10H163ZM163 47V10H161V47H163ZM152 58C158.075 58 163 53.0751 163 47H161C161 51.9706 156.971 56 152 56V58ZM94 58H152V56H94V58ZM94 56C90.8375 56 88.7851 57.06 87.402 58.7091C86.0827 60.2822 85.4496 62.3167 84.9053 64.0282L86.8113 64.6343C87.3813 62.842 87.914 61.2109 88.9344 59.9943C89.891 58.8538 91.3523 58 94 58V56ZM84.9053 64.0282C84.443 65.4819 84.0508 66.6869 83.44 67.5763C82.8813 68.3898 82.1554 68.9149 80.9287 69.0025L81.0713 70.9975C82.9711 70.8618 84.2246 69.9666 85.0886 68.7086C85.9005 67.5264 86.3742 66.0088 86.8113 64.6343L84.9053 64.0282ZM81.0767 69.0029C79.9724 68.918 79.2393 68.4021 78.6217 67.5423C77.9628 66.6251 77.4862 65.3882 76.9334 63.9311L75.0635 64.6406C75.5902 66.029 76.1551 67.5368 76.9974 68.7092C77.8809 69.9391 79.1088 70.8575 80.9233 70.9971L81.0767 69.0029ZM76.9334 63.9311C76.2847 62.2212 75.5389 60.2259 74.2265 58.6852C72.8554 57.0756 70.908 56 68 56V58C70.3261 58 71.7156 58.8217 72.704 59.9821C73.7512 61.2115 74.3876 62.8591 75.0635 64.6406L76.9334 63.9311ZM10 58H68V56H10V58ZM-1 47C-1 53.0751 3.92487 58 10 58V56C5.02944 56 1 51.9706 1 47H-1ZM-1 10V47H1V10H-1Z"
//       fill="#E6E6E6" mask="url(#path-1-inside-1_841_402)" />
// </svg>
// <div class="absolute top-0 left-0 space-y-[5px] -ml-[150px] -mt-16 w-[162px] py-[15px] overflow-hidden text-center">
//   <h1 class="text-xs text-[#088178] font-medium">${series[0][dataPointIndex]}+ buyurtma</h1>
//   <p class="text-sm font-bold">${series[0][dataPointIndex]} so‘m</p>
// </div>
onMounted(() => {
  nextTick(() => {
    window.dispatchEvent(new Event("resize"));
  });

  is_mount.value = true;
});
</script>
