<script setup lang="ts">
import QRCode from "qrcode";
import { onMounted, ref } from "vue";
import { useTimeDown } from "./hooks/useTimeDown";

const loading = ref(false);

const { remainingMinutes, remainingSeconds } = useTimeDown();

const empty = "";

const onRefresh = () => {
  setTimeout(() => {
    loading.value = false;
  }, 800);
};

const generateQRCode = async (text: string) => {
  await (QRCode as any).toCanvas(
    document.getElementById("code"),
    text,
    {
      width: 200,
      height: 200,
      margin: 0
    },
    (err: any) => {
      console.error(err);
    }
  );
};
onMounted(() => {
  generateQRCode("https://www.xieyezi.site/");
});
</script>

<template>
  <div class="container">
    <div class="container-header">
      <van-nav-bar title="预约结果" :border="false">
        <template #left>
          <van-icon name="arrow-left" size="24" style="color: black" />
        </template>
      </van-nav-bar>
      <div class="notice-bar">
        <van-icon name="volume-o" size="18" style="padding-right: 5px" />
        <p>请务必在预约时间段<span style="font-size: 18px; color: #eb9556">前5分钟</span>内进站</p>
      </div>
    </div>
    <van-pull-refresh class="pull-container" pulling-text="下拉刷新" loosing-text="下拉刷新" v-model="loading" @refresh="onRefresh">
      <template #loading>
        <van-loading type="spinner" size="14" />
      </template>
      <div class="content">
        <div class="time-cacel">失效时间：{{ remainingMinutes }}分{{ remainingSeconds }}秒</div>
        <canvas id="code"></canvas>
        <div class="description">请凭此二维码，前往地铁站指定预约通道扫码进站</div>
        <div><span>6号线</span><span class="special">光电园站</span></div>
        <div class="info">
          <span>2024-02-26</span>
          <span class="special">18:10~18:20</span>
        </div>
      </div>
    </van-pull-refresh>
    <div class="footer">
      <img src="/footer.png" alt="footer" />
    </div>
    <div class="floating">
      <van-icon name="qr" size="28" style="font-weight: 600" />
      <p class="goto">去乘车</p>
    </div>
  </div>
</template>

<style scoped>
body {
  overflow: hidden;
}
.container {
  height: 100%;
  width: 100%;
  color: #333;
}
.container-header {
  position: absolute;
  top: 0;
  width: 100%;
  .notice-bar {
    height: 40px;
    background: #fceec8;
    padding: 0 16px;
    display: flex;
    justify-content: start;
    align-items: center;
    font-size: 14px;
    color: #a67f41;
  }
}

.pull-container {
  position: absolute;
  top: calc(46px + 40px);
  width: 100%;
  height: calc(100% - 46px - 40px);
}

.content {
  /*height: 100%;*/
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 8px;
  padding-top: 48px;
  padding-bottom: 20px;
  box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .time-cacel {
    padding: 5px 0;
    width: 160px;
    background: rgba(236, 241, 254, 0.8);
    margin-bottom: 10px;
    border-radius: 4px;
    font-size: 14px;
    text-align: center;
  }

  .description {
    margin-top: 15px;
    margin-bottom: 15px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(246, 246, 246, 0.9);
    color: #c1c1c1;
    border-radius: 2px;
  }

  .special {
    padding-left: 20px;
    font-size: 24px;
    color: #54a77e;
  }
}

.floating {
  position: fixed;
  top: 30%;
  right: -20px;
  background-color: #d6e4fc;
  height: 40px;
  width: 60px;
  border-radius: 30px;
  z-index: 100;
  padding-left: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  color: #6290f1;

  .goto {
    font-size: 10px;
    line-height: 10px;
    color: #6290f1;
    margin-top: 1px;
    font-weight: 400;
  }
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  img {
    width: 100%;
  }
}
</style>
