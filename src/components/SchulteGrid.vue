<template>
  <div id="schulte-grid">
    <van-circle v-model="currentRate" :color="circleColor" size="150px">
      <img alt="Grid logo" src="../assets/grid.png" class="logo"/>
    </van-circle>
    <van-grid :column-num="5" :gutter="5" :square="true" class="grid-wrapper">
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
  </div>
</template>

<script>
import { Grid, GridItem, Dialog, Circle } from "vant";
import Cell from "./Cell";

export default {
  name: "schulte-grid",
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    Cell: Cell,
    [Circle.name]: Circle
  },
  data() {
    return {
      playing: false,
      time_in_ms: 0,
      last_number: 0,
      grid_data: [],
      expected: 1,
      startTime: null,
      endTime: null,
      reset: false,
      currentRate: 0,
      circleColor: "whilte"
    };
  },
  methods: {
    shuffle() {
      let hub = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25
      ];
      // eslint-disable-next-line
      hub.sort((a, b) => (Math.random() > 0.5 ? -1 : 1));
      this.grid_data = hub;
    },
    stopAndShowErrorMsg(payload) {
      this.circleColor = "#ec407a";
      Dialog.alert({
        title: "Wrong",
        message: `expect ${payload.expected}, but got ${payload.num}.\n\nGo play again!`
      }).then(() => {
        this.expected = 1;
        this.shuffle();
        this.reset = !this.reset;
        this.circleColor = "white";
      });
    },
    increaseExpected() {
      this.circleColor = "#00897b";
      if (this.expected === 1) {
        // first time,start to timer
        this.startTime = Date.now();
      }
      this.expected += 1;
      this.currentRate = (this.expected - 1) * 4;
      if (this.expected === 26) {
        this.endTime = Date.now();
        let duration = (this.endTime - this.startTime) / 1000;
        // finished success
        Dialog.alert({
          title: "Congratulations!!!",
          message: `It takes you ${duration}s, you can do better!`
        }).then(() => {
          this.expected = 1;
          this.shuffle();
          this.reset = !this.reset;
        });
      }
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
