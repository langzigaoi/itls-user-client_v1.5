<template>
  <div  class="analysisTask" >
    <Echarts ref="echarts"
             v-if="echartsData != null"
             :datas="echartsData"
             :links="echartsLinks"
             :categories="echartscategory"
    >
    </Echarts>
  </div>
</template>

<script>
import Echarts from "@/components/Echarts/index";
  export default {
    components: {

      Echarts,
    },

    data() {
      return {
        courseId: null,
        // 知识图谱相关变量：节点数据与边数据
        echartsData: [
          // {id: '3', name: '基本初等函数', category: 0 },
          // {id: '6', name: '三角函数', category: 1 },
        ],
        echartsLinks: [
          // {source:"6",target: "3" },
        ],
        echartscategory: [
          // { types: ['熟练', '掌握', '理解', '了解'], }
        ]

      };
    },

    mounted(){
      this.courseId = this.$store.state.course.courseId;
      this.getKnowledgeGraph(this.courseId).then(()=>{
        this.rerender()
      });
    },
    methods: {
      rerender(){
        // 图谱模式，重新渲染echarts
        if (this.courseId != null){
          // 调用echarts组件中的rerender方法；父组件调子组件方法
          this.$refs.echarts.rerender();
        }
      },

      async getKnowledgeGraph(params) {
        console.log(params);
        await this.$api.knowledge.knowledge
            .findList({ courseId: params })
            .then((res) => {
              console.log(res);
              let data = res.data;

              //处理echarts数据
              if(res.code == '200') {
                let datas = [];
                let links = [];
                let categories = [];

                for (let index = 0; index < data.length; index++) {

                  if (data[index].deep == 1) {
                    datas.push({
                      id: data[index].id + '',
                      name: data[index].name,
                      category: data[index].deep - 1,
                    });
                    links.push({
                      source: data[index].id + '',
                      target: data[index].parentId + '',
                      name: data[index].name,
                    });
                    categories.push({
                      value: data[index].deep - 1,
                    });

                  }else if (data[index].deep == 2) {
                    datas.push({
                      id: data[index].id + '',
                      name: data[index].name,
                      category: data[index].deep - 1,
                    });
                    links.push({
                      source: data[index].id + '',
                      target: data[index].parentId + '',
                    });
                    categories.push({
                      value: data[index].deep - 1,
                    });
                  }else if (data[index].deep == 3) {
                    datas.push({
                      id: data[index].id + '',
                      name: data[index].name,
                      category: data[index].deep - 1,
                    });
                    links.push({
                      source: data[index].id + '',
                      target: data[index].parentId + '',
                    });
                    categories.push({
                      value: data[index].deep - 1,
                    });
                  }else if (data[index].deep == 4) {
                    datas.push({
                      id: data[index].id + '',
                      name: data[index].name,
                      category: data[index].deep - 1,
                    });
                    links.push({
                      source: data[index].id + '',
                      target: data[index].parentId + '',
                    });
                    categories.push({
                      value: data[index].deep - 1,
                    });
                  }else if (data[index].deep == 5) {
                    datas.push({
                      id: data[index].id + '',
                      name: data[index].name,
                      category: data[index].deep - 1,
                    });
                    links.push({
                      source: data[index].id + '',
                      target: data[index].parentId + '',
                    });
                    categories.push({
                      value: data[index].deep - 1,
                    });
                  }

                }
                this.echartsData = datas;
                this.echartsLinks = links;
                this.echartscategory = categories;

              }
            })
      },

    }
  };

</script>

<style scoped>

</style>
