<template>
  <div class="ProblemChoiceItem">
    <div>
      <span class="itemindex">{{itemindex + 1}}</span>
      <!-- 分值 -->
      <span class="itemtitle">{{problemgrades}}分 </span>
      <!-- title -->
      <span class="itemtitle">{{ problemitem[0].title }}</span>
  
    </div>
    <!-- 选项 -->
    <div>
      <el-radio-group v-model="radio">
        <div class="racss" v-for="(option,index) in JSON.parse(problemitem[0].options)" :key="index"><el-radio :label=index >
          {{String.fromCharCode(index+65)}}<span style="font-weight:700">: </span>{{option.option}}</el-radio>
          </div>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProblemChoiceItem",
  data(){
    return{
      radio:null,
      grades:0,
      currentradio:null
    }
  },
  props:{
    problemitem:{
      type:Array,
      default:null
    },
    itemindex:0,
    compute:0, // 是否计算
    problemgrades:0, // 题目的分数
  },
  watch:{
    compute(newVal, oldVal){
      if(newVal == 1){
        console.log("compute为1");
         if(this.radio == this.problemitem[0].answer){
         this.grades = this.problemgrades;
        }else{
          this.grades = 0;
        }
        switch(this.radio){
           case 0:
          this.currentradio = "A";
          break;
        case 1:
          this.currentradio = "B";
          break;
        case 2:
          this.currentradio = "C";
          break;
         case 3:
          this.currentradio = "D";
          break;
        }
        this.$emit("isProblem",this.grades,this.itemindex,this.currentradio);
      }
    }
  },
  mounted(){
  },
  methods:{
  }
  
};
</script>

<style>
.racss{
  margin:20px 10px;
}

.ProblemChoiceItem{
  margin: 30px 0;
}
.itemindex{
  margin-right: 20px;
}
.itemtitle{
  font-size: 16px;
}
</style>