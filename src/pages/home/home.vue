<template>
  <div>
    <div id="main"></div>
  </div>
</template>
  <script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),
  },
  watch: {
    list: {
      handler() {
        if(this.list.length>0){
          var myChart = require("echarts").init(document.getElementById("main"));
        var option = {
          title: {
            text: "分类列表",
          },
          tooltip: {},
          legend: {
            data: ["数量"],
          },
          xAxis: {
            data: this.list.map((item) => item.catename),
          },
          yAxis: {},
          series: [
            {
              name: "子类",
              type: "line",
              data: this.list.map((item) =>
                item.children ? item.children.length : 0
              ),
            },
          ],
        };
        myChart.setOption(option);
        }
      },
      deep:true
    },
  },
  mounted() {
    this.reqList();
    console.log(this.list);
  },
};
</script>

  <style scoped>
#main {
  width: 80%;
  height: 500px;
  margin-top: 10px;
  /* border: 1px solid olivedrab; */
}
</style>