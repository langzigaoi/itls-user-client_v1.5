<template>
  <div>
    <div id="vditor" name="description" ></div>
  </div>
</template>
<script>
import Vditor from "vditor";
import 'vditor/dist/index.css';
//import "vditor/src/assets/scss/index.scss";

export default {

  data(){
    return{
      contentEditor: {
        value: ""
      },
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
        after: () => {
          // this.setValue(0)
        },
    })
  },
  watch: {
    question(question) {
      //console.log("监听到数据改变")
      this.renderMarkdown(question.description);
    }
  },
  methods: {
    // 获取值
    getValue(){
      return this.contentEditor.getValue();
    },
    setValue(value){
      return this.contentEditor.setValue(value);
    },

    renderMarkdown(md) {
      //console.log("开始渲染")
      Vditor.preview(document.getElementById("preview"), md, {
        hljs: {style: "github"},
      });
    },
    
  }

}
</script>
