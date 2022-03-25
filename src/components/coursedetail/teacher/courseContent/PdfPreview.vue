<template>
  <div>
    <!-- <pdf src="https://dakaname.oss-cn-hangzhou.aliyuncs.com/file/2018-12-28/1546003237411.pdf"></pdf> -->
    <!-- <pdf
      src="http://localhost:8080/itls/cInstanceResource/download?path=D%3A%2FrjlmFile%2FC%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A112%2F1%2F%E6%96%B0%E5%BB%BA%E6%96%87%E6%9C%AC%E6%96%87%E6%A1%A3%20(2).txt1607820200066"
    ></pdf> -->
    <el-button-group>
      <el-button
        type="primary"
        icon="el-icon-arrow-left"
        size="mini"
        @click="prePage"
        >上一页</el-button
      >
      <el-button type="primary" size="mini" @click="nextPage"
        >下一页<i class="el-icon-arrow-right el-icon--right"></i
      ></el-button>
    </el-button-group>
    <div style="margintop: 10px; color: #409eff">
      {{ pageNum }} / {{ pageTotalNum }}
    </div>
    <pdf
      :page="currentPage" 
      :src="url"
      @progress="loadedRatio = $event"
      @num-pages="pageTotalNum = $event"
      @page-loaded ="currentPage = $event"
    ></pdf>
  </div>
</template>
<script>
import pdf from "vue-pdf";
export default {
  components: {
    pdf,
  },
  data() {
    return {
      url:" https://cdn.mozilla.net/pdfjs/tracemonkey.pdf ",
      pageTotalNum: 1, //总页数
      loadedRatio: 0, //当前页面的加载进度，范围是0-1 ，等于1的时候代表当前页已经完全加载完成了
      currentPage: 1, // 当前加载的页面
    };
  },
  methods:{
     // 上一页
    prePage() {
      let page = this.currentPage
      page = page > 1 ? page - 1 : this.pageTotalNum
      this.currentPage = page
    },

    // 下一页
    nextPage() {
      let page = this.currentPage
      page = page < this.pageTotalNum ? page + 1 : 1
      this.currentPage = page
    }
  }
};
</script>