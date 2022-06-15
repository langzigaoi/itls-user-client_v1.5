import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)



const routes = [
  // {
  //   path:'/',
  //   name:'/',
  //   component: () => import ('@/components/test.vue'),
  // },
  {
    path: '/',
    redirect: "/login"
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/components/login/Register'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/login/Login'),
  },

  // 教师教授课程、学生教师个人中心等
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/components/home/Home'),
    // redirect: '/home/',
    children: [
      // 教师个人中心
      {
        path: 'teacherselfcenter',
        name: 'TeacherSelfCenter',
        component: () => import('@/components/home/selfCenter/TeacherSelfCenter'),
      },
      // 学生个人中心
      {
        path: 'studentselfcenter',
        name: 'StudentSelfCenter',
        component: () => import('@/components/home/selfCenter/StudentSelfCenter'),
      },

      // 教师教授课程页面（课程实例列表、添加课程实例、编辑课程实例、添加课程等）
      {
        path: 'teacherCourse',
        name: 'TeacherCourse',
        component: () => import('@/components/home/teacherCourse/TeacherCourse'),
        // children: [
        //   {
        //     path: 'knowledge',
        //     name: 'Knowledge',
        //     component: () => import('@/components/home/teacherCourse/Knowledge'),
        //   }
        // ]
      },
      // 学生 学习课程页面（课程实例列表、选课等）
      {
        path: 'studentCourse',
        name: 'StudentCourse',
        component: () => import('@/components/home/studentCourse/StudentCourse'),
      },

    ]
  },


  
  
  // 教师 课程实例内的内容
  {
    path: '/course',
    name: 'course',
    redirect: '/course/courseintroduce',
    component: () => import('@/components/coursedetail/teacher/home'),
    // redirect:'/course/student',
    children: [

      {
        path: 'studentList',
        name: 'studentList',
        component: () =>
          import('@/components/coursedetail/teacher/dashboard/StudentList'),
        meta: { title: '学生列表' }
      },
      {
        path: 'courseintroduce',
        name: 'courseintroduce',
        component: () =>
          import('@/components/coursedetail/teacher/courseIntroduce/CourseIntroduce'),
        meta: { title: '课程介绍' }
      },
      {
        path: 'coursetarget',
        name: 'coursetargete',
        component: () =>
          import('@/components/coursedetail/teacher/courseIntroduce/CourseTarget'),
        meta: { title: '课程目标' }
      },
      {
        path: 'examineevaluate',
        name: 'examineevaluate',
        component: () =>
          import('@/components/coursedetail/teacher/courseIntroduce/ExamineEvaluate'),
        meta: { title: '考核评价' }
      },
      {
        path: 'atlasAnalyze',
        name: 'atlasAnalyze',
        component: () =>
          import('@/components/coursedetail/teacher/atlasAnalyze/SelectKnowledge'),
        meta: { title: '图谱分析' }
      },
      {
        path: 'teachingTeam',
        name: 'teachingTeam',
        component: () =>
          import('@/components/coursedetail/teacher/teachingTeam/TeachingTeam'),
        meta: { title: '教学团队' }
      },
      {
        path: 'courseContent',
        name: 'courseContent',
        component: () =>
          import('@/components/coursedetail/teacher/courseContent/CourseContent'),
        meta: { title: '课程内容' }
      },

      {
        path: 'examList',
        name: 'examList',
        component: () =>
          import('@/components/coursedetail/teacher/exam/ExamList'),
        meta: { title: '考试列表' }
      },

      {
        path: 'choiceList',
        name: 'choiceList',
        component: () =>
          import('@/components/coursedetail/teacher/problemBank/choice/ChoiceList'),
        meta: { title: '题库-选择题列表' }
      },
      {
        path: 'programList',
        name: 'programList',
        component: () =>
          import('@/components/coursedetail/teacher/problemBank/prog/ProgramList'),
        meta: { title: '题库-编程题列表' }
      },
      {
        path: 'problemjudge',
        name: 'problemjudge',
        component: () =>
          import('@/components/coursedetail/teacher/problemBank/judge/judge'),
        meta: { title: '判断题' }
      },





      {
        path: 'problemFilling',
        name: 'problemFilling',
        component: () =>
          import('@/components/coursedetail/teacher/problemBank/filling/FillingProblemView'),
        meta: { title: '填空题' }
      },
      
      {
        path: 'JudgmentExcel',
        name: 'JudgmentExcel',
        component: () =>
          import('@/components/coursedetail/teacher/problemBank/judgment/JudgmentProblemUploadExcel'),
        meta: { title: '判断题导入' }
      },
      
      {
        path: 'problemApplication',
        name: 'problemApplication',
        component: () =>
          import('@/components/coursedetail/teacher/problemBank/application/ApplicationProblemView'),
        meta: { title: '应用题' }
      },
      {
        path: 'problemProgram',
        name: 'problemProgram',
        component: () =>
          import('@/components/coursedetail/teacher/problemBank/program/ProgramProblemView'),
        meta: { title: '编程题lgy' }
      },
      {
        path: 'programDetails',
        name: 'programDetails',
        component: () =>
          import('@/components/coursedetail/teacher/problemBank/program/ProgramDetails')
      },

      {
        path: 'teacherCourse',
        name: 'TeacherCourse',
        component: () => import('@/components/home/teacherCourse/TeacherCourse'),
        children: [
          {
            path: 'knowledge',
            name: 'Knowledge',
            component: () => import('@/components/home/teacherCourse/Knowledge'),
          }
        ]
      },
      
      
      {
        path: 'teachingAnalyze',
        name: 'teachingAnalyze',
        component: () =>
          import('@/components/coursedetail/teacher/teachingAnalyze/TeachingAnalyze'),
        meta: { title: '教学分析' }
      },
      
      
      {
        path: 'searchExperiment',
        name: 'SearchExperiment',
        component: () =>
          import('@/components/coursedetail/teacher/experiment/SearchExperiment'),
        meta: { title: '查看课程实验' }
      },
      {
        path: 'addExperiment',
        name: 'AddExperiment',
        component: () =>
          import('@/components/coursedetail/teacher/experiment/AddExperiment'),
        meta: { title: '添加课程实验' }
      },
      {
        path: 'updateExperiment',
        name: 'UpdateExperiment',
        component: () =>
          import('@/components/coursedetail/teacher/experiment/UpdateExperiment'),
        meta: { title: '修改课程实验' }
      },
      {
        path: 'viewExperiment',
        name: 'ViewExperiment',
        component: () =>
          import('@/components/coursedetail/teacher/experiment/ViewExperiment'),
        meta: { title: '实验详情' }
      },
      {
        path: 'experimentCompletion',
        name: 'ExperimentCompletion',
        component: () =>
          import('@/components/coursedetail/teacher/experiment/ExperimentCompletion'),
        meta: { title: '完成情况' }
      },
      {
        path: 'studentAnswer',
        name: 'StudentAnswer',
        component: () =>
          import('@/components/coursedetail/teacher/experiment/StudentAnswer'),
        meta: { title: '学生实验详情' }
      },
      
      {
        path: 'AddCourseHomework',
        name: 'AddCourseHomework',
        component: () =>
          import('@/components/coursedetail/teacher/courseContent/courseHomework/AddCourseHomework'),
        meta: { title: '发布作业' }
      },
      {
        path: 'alterCourseHomework',
        name: 'alterCourseHomework',
        component: () =>
          import('@/components/coursedetail/teacher/courseContent/courseHomework/AlterCourseHomework'),
        meta: { title: '作业详情' }
      },
      {
        path: 'addCourseTest',
        name: 'AddCourseTest',
        component: () =>
          import('@/components/coursedetail/teacher/courseContent/courseTest/AddCourseTest'),
        meta: { title: '发布测验' }
      },
      {
        path: 'alterCourseTest',
        name: 'alterCourseTest',
        component: () =>
          import('@/components/coursedetail/teacher/courseContent/courseTest/AlterCourseTest'),
        meta: { title: '测验详情' }
      }
    ]
  },




  // 学生 课程实例内容
  {
    path: '/studycourse',
    name: 'studycourse',
    redirect: '/studycourse/courseintroduce',

    component: () => import('@/components/coursedetail/student/home'),
    // redirect:'/course/student',
    children: [
      {
        path: 'taskanalysis',
        name: 'TaskAnalysis',
        component: () =>
          import('@/components/coursedetail/student/dashBoard/TaskAnalysis'),
        meta: { title: '作业统计分析' }
      },
      {
        path: 'testanalysis',
        name: 'TestAnalysis',
        component: () =>
          import('@/components/coursedetail/student/dashBoard/TestAnalysis'),
        meta: { title: '测验统计分析' }
      },
      {
        path: 'experimentanalysis',
        name: 'ExperimentAnalysis',
        component: () =>
          import('@/components/coursedetail/student/dashBoard/ExperimentAnalysis'),
        meta: { title: '实验统计分析' }
      },
      {
        path: 'courseintroduce',
        name: 'courseintroduce',
        component: () =>
          import('@/components/coursedetail/student/courseIntroduce/CourseIntroduce'),
        meta: { title: '课程介绍' }
      },
      {
        path: 'coursetarget',
        name: 'coursetargete',
        component: () =>
          import('@/components/coursedetail/student/courseIntroduce/CourseTarget'),
        meta: { title: '课程目标' }
      },
      {
        path: 'examineevaluate',
        name: 'examineevaluate',
        component: () =>
          import('@/components/coursedetail/student/courseIntroduce/ExamineEvaluate'),
        meta: { title: '考核评价' }
      },
      {
        path: 'teachingteam',
        name: 'teachingteam',
        component: () =>
          import('@/components/coursedetail/student/teachingTeam/TeachingTeam'),
        meta: { title: '教学团队' }
      },
      {
        path: 'coursecontent',
        name: 'coursecontent',
        component: () =>
          import('@/components/coursedetail/student/courseContent/CourseContent'),
        meta: { title: '课程内容' }
      },

      {
        path: 'examlist',
        name: 'examList',
        component: () =>
          import('@/components/coursedetail/student/exam/ExamList'),
        meta: { title: '课程考试' }
      },
      // {
      //   path: 'startexam',
      //   name: 'startexam',
      //   component: () =>
      //     import('@/components/coursedetail/student/exam/StartExam'),
      //   meta: { title: '开始考试' }
      // },










      // {
      //   path: 'students',
      //   name: 'students',
      //   component: () =>
      //     import('@/components/coursedetail/student/choseStudent/CinstanceStudentView'),
      //   meta: { title: '选课学生' }
      // },
      
      
      {
        path: 'courseExperiment',
        name: 'CourseExperiment',
        component: () =>
          import('@/components/coursedetail/student/courseExperiment/CourseExperiment'),
        meta: { title: '课程实验' }
      },
      {

        path: 'viewExperiment',
        name: 'ViewExperiment',
        component: () =>
          import('@/components/coursedetail/student/courseExperiment/ViewExperiment'),
        meta: { title: '实验内容' }
      },
      {
        path: 'coursehomework',
        name: 'coursehomework',
        component: () =>
          import('@/components/coursedetail/student/courseHomework/CourseHomework'),
        meta: { title: '作业' }
      },
      {
        path: 'homeworkdetail',
        name: 'homeworkdetail',
        component: () =>
          import('@/components/coursedetail/student/courseHomework/HomeworkDetail'),
        meta: { title: '作业题目详情' }
      },
      {
        path: 'coursestudenttest',
        name: 'coursestudenttest',
        component: () =>
          import('@/components/coursedetail/student/courseTest/CourseStudentTest'),
        meta: { title: '测验' }
      },
      {
        path: 'begintest',
        name: 'begintest',
        component: () =>
          import('@/components/coursedetail/student/courseTest/BeginTest'),
        meta: { title: '开始测验' }
      },
      

      {
        path: 'courseitem',
        name: 'courseitem',
        component: () =>
          import('@/components/coursedetail/student/courseItem/CourseItem'),
        meta: { title: '课程项目' }
      },
      {
        path: 'commentstu',
        name: 'commentstu',
        component: () =>
          import('@/components/coursedetail/student/commentStu/CommentHome'),
        meta: { title: '讨论区' }
      },
      {
        path: 'messagelogging',
        name: 'messagelogging',
        component: () =>
          import('@/components/coursedetail/student/commentStu/MessageLogging'),
        meta: { title: '评论消息记录' }
      },
      {
        path: 'stutoteacher',
        name: 'stutoteacher',
        component: () =>
          import('@/components/coursedetail/student/commentStu/StuToTeacher'),
        meta: { title: '老师答疑区' }
      },
      {
        path: 'commentgrade',
        name: 'commentgrade',
        component: () =>
          import('@/components/coursedetail/student/commentStu/CommentGrade'),
        meta: { title: '课程评论信息' }

      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
