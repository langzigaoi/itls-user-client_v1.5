<template>
  <div>
    <div id="vditor" name="description" ></div>
<!--    <el-button @click="submit">a</el-button>-->
  </div>
</template>
<script>
import Vditor from "vditor";
import 'vditor/dist/index.css';
//import "vditor/src/assets/scss/index.scss";

export default {

  data(){
    return{
      contentEditor: {},
      ruleForm: {
        title: '',
        tags: [],
        content: ''

    },
      question:{description:"loading..."},
    }
  },
  mounted(){

    this.renderMarkdown(this.question.description),

    this.contentEditor = new Vditor('vditor', {
      height: 500,
      placeholder: '此处为话题内容……',
      theme: 'classic',
      counter: {
        enable: true,
        type: 'markdown'
      },
      preview: {
        delay: 0,
        hljs: {
          style: 'monokai',
          lineNumber: true
        }
      },
      tab: '\t',
      typewriterMode: true,
      toolbarConfig: {
        pin: true
      },
      cache: {
        enable: false
      },
      mode: 'sv',
      toolbar: [
        'emoji',
        'headings',
        'bold',
        'italic',
        'strike',
        'link',
        '|',
        'list',
        'ordered-list',
        'check',
        'outdent',
        'indent',
        '|',
        'quote',
        'line',
        'code',
        'inline-code',
        'insert-before',
        'insert-after',
        '|',
        // 'record',
        'table',
        '|',
        'undo',
        'redo',
        '|',
        'edit-mode',
        // 'content-theme',
        'code-theme',
        'export',
        {
          name: 'more',
          toolbar: [
            'fullscreen',
            'both',
            'preview',
            'info',
            'help',
          ],
        }],
    })
  },

  methods: {
    // 获取值
    getValue(){

      return this.contentEditor.getValue();
    },
    // 我的提交表单代码大致如下,这段代码核心是this.ruleForm.content = this.contentEditor.getValue()
    submitForm() {
      this.$refs["formName"].validate((valid) => {
        if (valid) {
          if (
              this.contentEditor.getValue().length === 1 ||
              this.contentEditor.getValue() == null ||
              this.contentEditor.getValue() === ''
          ) {
            alert('话题内容不可为空')
            return false
          }

          //通过this.contentEditor.getValue()获取编辑器内容
          // this.ruleForm.content = this.contentEditor.getValue()

          //调用api把this.ruleForm传给后端

        }

      })
    },

    renderMarkdown(md) {
      //console.log("开始渲染")
      Vditor.preview(document.getElementById("preview"), md, {
        hljs: {style: "github"},
      });
    },
    watch: {
      question(question) {
        //console.log("监听到数据改变")
        this.renderMarkdown(question.description);
      }
    }
  }

}
</script>
