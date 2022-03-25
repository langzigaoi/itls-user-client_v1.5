<template>
    <div style="">
        <!-- <router-link to="/home">主页</router-link>
        <router-link to="/home/studentmanage">学生管理</router-link> -->
        <span v-for="item in routes" :key="item.id">
            <router-link :to="item.path">{{item.name}}></router-link>
        </span>
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            //在这里添加url中对应的导航的功能中文
            names:[
                {
                    path:"home",
                    name:'主页',
                },
                {
                    path:"studentmanage",
                    name:'学生管理',
                },
                
                {
                    path:"addstudent",
                    name:'添加学生',
                },
                {
                    path:"alterstudent",
                    name:'编辑学生',
                },
                {
                    path:"teacherManage",
                    name:'教师管理',
                },
                {
                    path:"addteacher",
                    name:'添加教师',
                },
                {
                    path:"alterteacher",
                    name:'编辑教师',
                },
            ],
            routes:[
                {
                    path:"/home",
                    name:'主页',
                },
                // {
                //     path:"/studentmanage",
                //     name:'学生管理',
                // },
            ]
        }
    },
    watch: {
      $route(to, from) {
          this.routes = [];
        // console.log(to.path);
         let routearr = to.path.split("/"); //分割后数组第一个元素为空，所以循环从1开始
        // console.log(routearr)
         let path = '',name='';
         for(let i=1; i<routearr.length; i++){
             path = '';
             for(let j=1; j<=i; j++){  //拼接path
                 path = path + "/" +routearr[j];
             }
            //寻找path对应的name
            name="";
            for(let t=0;t<this.names.length; t++){
                if(this.names[t].path == routearr[i])
                name = this.names[t].name;
                //console.log(this.names[t].path,routearr[i])
                
            }          
            //没有获取到path对应的name可能是作为参数在url里面
            if(name == '') 
                continue
                
            //console.log("获取到的name：",name)
             let route = {path:path,name:name};  //构造一个route
             this.routes.push(route);  //添加到routes中
             // console.log(path,i)
         }

      }
    },
}
</script>