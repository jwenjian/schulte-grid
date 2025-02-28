<template>
  <div id="schulte-grid">
    <van-circle v-model="currentRate" :color="circleColor" size="150px">
      <img alt="Grid logo" src="../assets/grid.png" class="logo"/>
    </van-circle>
    <van-grid :column-num="6" :gutter="5" :square="true" class="grid-wrapper">
      <template v-for="cell_data in grid_data">
        <van-grid-item :key="cell_data">
          <Cell
            :num="cell_data"
            :expected="expected"
            @wrong="stopAndShowErrorMsg"
            @correct="increaseExpected"
            :reset-flag="reset"
          />
        </van-grid-item>
      </template>
    </van-grid>
    <van-dialog v-model="successDialogVisible" title="Congratulations!!!" @confirm="handleSuccessConfirm">
      <img src="/cup.gif" style="width: 100%;"/>
    </van-dialog>
    <van-dialog v-model="failedDialogVisible" title="Aww Ooo..!!!" @confirm="handleFailedConfirm">
      <img src="/cry.gif" style="width: 100%;"/>
    </van-dialog>
  </div>
</template>

<script>
import { Grid, GridItem, Dialog, Circle } from "vant";
import Cell from "./Cell";
import confetti from "canvas-confetti";
import { Howl, Howler } from "howler";

const successSound = new Howl({
  src: ["/success.mp3"]
});

const failSound = new Howl({
  src: ["/fail.mp3"]
});

const clickSound = new Howl({
  src: ["/click.mp3"],
  volume: 0.5
});

const original = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ];

const hub = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ];

export default {
  name: "schulte-grid",
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    Cell: Cell,
    [Circle.name]: Circle,
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      playing: false,
      time_in_ms: 0,
      last_number: 0,
      grid_data: [],
      expected: 'A',
      startTime: null,
      endTime: null,
      reset: false,
      currentRate: 0,
      circleColor: "white",
      successDialogVisible: false,
      failedDialogVisible: false,
      idx: 0
    };
  },
  methods: {
    shuffle() {
      // eslint-disable-next-line
      hub.sort((a, b) => (Math.random() > 0.5 ? -1 : 1));
      this.grid_data = hub;
    },
    stopAndShowErrorMsg(payload) {
      this.circleColor = "#ec407a";
      failSound.play();
      this.failedDialogVisible = true;
    },
    increaseExpected() {
      this.circleColor = "#00897b";
      if (this.expected === 'A') {
        // first time,start to timer
        this.startTime = Date.now();
      }
      this.idx += 1;
      this.expected = original[this.idx];
      clickSound.play();
      this.currentRate = (this.idx) * 4;
      if (this.idx === 26) {
        this.endTime = Date.now();
        let duration = (this.endTime - this.startTime) / 1000;
        // finished success
        successSound.play();
        this.successDialogVisible = true;
        this.showConfetti();
      }
    },
    showConfetti() {
      for (let i = 0; i < 3; i++) {
        confetti({
          particleCount: 100,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: Math.random() * 0.5 + 0.25,
            // since they fall down, start a bit higher than random
            y: 0.3
          }
      });
      }
    },
    handleSuccessConfirm() {
      this.successDialogVisible = false;
      this.idx = 0;
      this.expected = original[this.idx];
      this.shuffle();
      this.reset = !this.reset;
      this.circleColor = "white";
    },
    handleFailedConfirm() {
      this.failedDialogVisible = false;
      this.idx = 0
      this.expected = original[this.idx];
      this.shuffle();
      this.reset = !this.reset;
      this.circleColor = "white";
    }
  },
  mounted() {
    this.shuffle();
    this.reset = !this.reset;
  }
};
</script>

<style>
.van-grid-item__content {
  padding: 0;
}
.cell {
  background-color: #ffe0b2;
  max-height: 100px;
  border: 1px solid black;
  vertical-align: center;
  align-content: center;
}
.num {
  display: inline-block;
  margin: auto auto;
}
.logo {
    padding-top: 23px;
    width: 100px;
    height: 100px;
}
.grid-wrapper {
    padding-top: 10px;
}
</style>
