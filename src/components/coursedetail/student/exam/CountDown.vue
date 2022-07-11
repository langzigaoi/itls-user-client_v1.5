<template>
  <div class="CountDown">

    <h3> {{ minute }}:{{ second }}</h3>
  </div>
</template>
    
<script type="text/ecmascript-6">

export default {
  name: 'CountDown',
  data() {
    return {
      minutes: 70,
      seconds: 10
    }
  },
  props: {
    countTime: {
      type: Object,
      default: () => { }
    }
  },
  mounted() {
    this.add()
  },
  methods: {
    num: function (n) {
      return n < 10 ? '0' + n : '' + n
    },
    add: function () {
      var _this = this
      var time = window.setInterval(function () {
        if (_this.seconds === 0 && _this.minutes !== 0) {
          _this.seconds = 59
          _this.minutes -= 1
        } else if (_this.minutes === 0 && _this.seconds === 0) {
          _this.handleTimeout();
          _this.seconds = 0
          window.clearInterval(time)
          // this.$emit("handleTimeout");
          
        } 
        // else if (condition) {
          
        // } 
        else {
          _this.seconds -= 1
        }
      }, 1000)
    },
    handleTimeout: function() {
      this.$emit("handleTimeout");
    },
  },
  watch: {
    countTime: {
      deep: true,
      immediate: true,
      handler: function (newVal) {
        this.minutes = newVal.minute;
        this.seconds = newVal.second;

      }
    },
    second: {
      handler(newVal) {
        this.num(newVal)
      }
    },
    minute: {
      handler(newVal) {
        this.num(newVal)
      }
    }
  },
  computed: {
    second: function () { 
      return this.num(this.seconds)
    },
    minute: function () {
      return this.num(this.minutes)
    }
  }
}
</script>
    
<style scoped>
.CountDown {
  color: rgb(19, 17, 17);
  background-color: white;
}
</style>
