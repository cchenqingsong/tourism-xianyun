<template>
  <el-container>
    <!-- 主体展示部分 -->
    <el-main>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/" class="bread-crumbs">
        <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
        <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 攻略标题部分 -->
      <h1>{{ detailData.title }}</h1>
      <div class="strategy">
        <span>攻略：2019-05-22 10:57</span>
        &nbsp;&nbsp;&nbsp;
        <span>阅读：{{ detailData.watch }}</span>
      </div>

      <!-- 攻略详情内容渲染部分 -->
      <div v-html="detailData.content" class="content"></div>

      <!-- 分享和评论图标样式 -->
      <div class="post-ctrl">
        <div class="post-ctrl1">
          <i class="el-icon-edit-outline icons"></i>
          <p>评论(100)</p>
        </div>
        <div class="post-ctrl1">
          <i class="el-icon-share icons"></i>
          <p>分享</p>
        </div>
      </div>

      <!-- 评论部分 -->
      <div class="commit" ref="jumpTop">
        <!-- 发表评论部分 -->
        <div style="font-weight: 400;font-size: 18px;margin-bottom: 20px;">评论</div>
        <el-row type="flex" v-if="replyMan">
          <div class="replyTag">
            <span>回复&nbsp;&nbsp;@{{replyMan}}</span>&nbsp;&nbsp;
            <i class="el-icon-close" style="cursor: pointer;" @click="replyMan = ''"></i>
          </div>
        </el-row>
        <!-- 编辑文本和封面区域 -->
        <el-form class="form">
          <!-- 输入框 -->
          <el-form-item style="flex:100%">
            <el-input v-model="inputData" placeholder="说点什么吧..."></el-input>
          </el-form-item>
          <!-- 上传封面图片 -->
          <el-form-item style="flex:100%;">
            <div class="list-button" style="">
              <el-upload
                :action="$axios.defaults.baseURL+ '/upload'"
                list-type="picture-card"
                :on-success='handleSuccess'
                :on-remove="handleRemove"
                name="files">
                <i class="el-icon-plus"></i>
              </el-upload>
              <div>
                <el-button type="primary" size="mini" @click="submitComments">提交</el-button>
              </div>
            </div>
          </el-form-item>
        </el-form>

        <!-- 评论展示部分 -->
        <!-- 为了写样式  在这里把一第一层评论提取出来了-->
        <el-card v-for="(item,index) in commentsList" :key="index" >
          <el-row class="userinfo" type="flex">
            <!-- 用户小头像 -->
            <el-avatar size='small' :src="$axios.defaults.baseURL + item.account.defaultAvatar"></el-avatar>
            <!-- 用户名 -->
            <span>{{item.account.nickname}}</span>&nbsp;&nbsp;
            <!-- 评论时间 -->
            <span>2019-12-14 4:53</span>
          </el-row>

          <!-- 组件递归 -->
          <detailComments :data='item.parent' v-if="item.parent" @click="reply"></detailComments>

          <!-- 第一层评论的内容 -->
          <!-- 评论文本区域 -->
          <el-row class="comments-content" >
            <!-- 遍历图片 -->
            <img :src="$axios.defaults.baseURL + value.url" alt="" v-for="(value,index1) in item.pics" :key="index1" >
            <!-- 显示的文本 -->
            <p style="padding-top:10px;">{{item.content}}</p>
          </el-row>
          <!-- 回复按钮 -->
          <el-row type="flex" style="justify-content: space-between">
              <div></div>
              <a href="javascript:;" style="font-size:12px;padding-bottom:10px" @click="reply(item)">回复</a>
          </el-row>

        </el-card>

        <!-- 当没有评论的时候，提示用户 -->
        <el-row v-if="!total" style="border:1px dashed #ddd;margin:10px 0;">
            <div style="color:#999;padding:20px 0;text-align:center;font-size:14px;">暂无评论，赶紧抢占沙发！!</div>
        </el-row>

        <!-- 底部分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="2"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-main>

    <!-- 右侧相关攻略部分 -->
    <el-aside width="280px">
      <h4 class="aside-title">相关攻略</h4>
      <div class="recommend-list" v-for="(item,index) in relatedStrategy" :key="index" @click='jump(item)'>
        <a href="#" class="recommend-item" v-if='item.content'>
          <div class="aside-text">
            <div v-html="item.content" style="margin-bottom:10px;"></div>
            <p>2020-02-17 10:37 阅读 4</p>
          </div>
        </a>
      </div>
    </el-aside>
  </el-container>
</template>

<script>
import detailComments from "@/components/post/detailComments";
export default {
  data() {
    return {
      // 评论总条数
      total: 1,
      // 文章数据
      detailData: {},
      // 评论列表信息
      commentsList: [],
      // 相关攻略数据
      relatedStrategy: [],
      // 需要提交的每页几个数据
      limit: 2,
      // 当前页的数据从第几个开始
      start: 0,
      // 发表评论输入框的数据
      inputData: '',
      // 封面图片的数组
      pictureList:[],
      follow: '',
      replyMan: '',
    };
  },
  methods: {
    // 移出封面图片
    handleRemove(file, fileList) {
      this.pictureList = fileList.map(value=>{
        return value.response[0]
      })
    },
    // 添加封面图片成功时
    handleSuccess(response, file, fileList){
      this.pictureList = fileList.map(value=>{
        return value.response[0]
      })
    },
    // 分页
    // 每页多少条
    handleSizeChange(val) {
      this.limit = val;
      this.getDataList()
    },
    // 当前是第几页
    handleCurrentChange(val) {
      this.start = (val - 1) * this.limit;
      this.getDataList()
    },
    // 封装获取文章详情的方法
    getArticle(){
        this.$axios({
        url: "/posts",
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        this.detailData = res.data.data[0];
      });
    },
    // 封装获取评论列表的方法
    getDataList(){
        this.$axios({
        url: "/posts/comments",
        params: {
          post: this.$route.query.id,
          _limit: this.limit,
          _start: this.start,
        }
      }).then(res => {
        this.commentsList = res.data.data;
        this.total = res.data.total;
      });
    },
    // 封装获取右侧推荐文章的方法
    getAnni(){
        this.$axios({
        url: '/posts/recommend',
        params: {
          id: this.$route.query.id
        }
      }).then(res=>{
        this.relatedStrategy = res.data.data
      })
    },
    // 封装提交或者回复的按钮方法
    submit(data){
      this.$axios({
        url: '/comments',
        method: 'POST',
        headers: {
                    // 必须要做token前面加上`Bearer `字符串，后面有一个空格的
                    Authorization: `Bearer ` + this.$store.state.user.userInfo.token
                },
        data
      }).then(res=>{
        this.getDataList()
        this.inputData = ''
        this.replyMan = ''
        this.$message.success('提交成功')
      })
    },
    // 点击右侧相关攻略跳转
    jump(item){
      // 获取点击的文章的id，实现文章的跳转
      this.$router.push({
          path: '/post/detail',
          query: {
            id: item.id
          }
      })
    },
    // 提交评论
    submitComments(){
      if(!this.inputData){
         this.$message.error('输入不能为空')
         return;
      }
      // 判断是直接评论还是回复
      if(!this.follow){
        // 如果是提交评论的话，只需要传入3个字段
        this.submit({
          // 当前文章id
          post: this.$route.query.id,
          content: this.inputData,
          pics: this.pictureList
        })
      }else{
        // 如果是提交评论的话，要多传一个字段
        this.submit({
            // 当前文章id
            post: this.$route.query.id,
            content: this.inputData,
            pics: this.pictureList,
            follow: this.follow
        })
      }
      // 评论完成后，将输入框、等等清零
        this.inputData = ''
        this.replyMan = ''
        this.follow = ''
    },
    // 回复评论
    reply(item){
      // 获取评论区域距离页面顶部的距离
      // 调用window的方法，将窗口滚动到该坐标
      window.scrollTo(0,this.$refs.jumpTop.offsetTop)
      this.replyMan = item.account.nickname
      this.follow = item.id
    },
  },
  // 导航守卫,当路由更新的时候触发
  beforeRouteUpdate (to, from, next){
    // 先将路由更改，跳转，再调用方法将页面重新渲染一遍
    next()
      // 获取文章详情
    this.getArticle()
    // 获取评论列表
    this.getDataList()
    // 获取推荐文章
    this.getAnni()
  },
  // 钩子
  mounted() {
    // 获取文章详情
    this.getArticle()
    // 获取评论列表
    this.getDataList()
    // 获取推荐文章
    this.getAnni()
  },
  // 组件注册
  components: {
    detailComments
  }
};
</script>

<style lang="less" scoped>
.el-container {
  width: 1000px;
  margin: 0 auto;
  justify-content: space-between;
  .el-main {
    padding: 20px 20px 20px 0;
    .content {
      line-height: 1.5em;
      /deep/img {
        max-width: 700px !important;
      }
    }
    h1 {
      padding: 20px 0px;
      border-bottom: 1px solid #ddd;
      font-size: 2em;
    }
    .strategy {
      padding: 20px 20px;
      color: #999;
      text-align: right;
    }
    .img-detail {
      color: rgb(153, 153, 153);
    }
    .post-ctrl {
      display: flex;
      justify-content: center;
      padding: 50px 0 30px;
      .post-ctrl1 {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 55px;
        margin: 0 20px;
        font-size: 20px;
        text-align: center;
        cursor: pointer;
        p {
          margin-top: 5px;
          font-size: 14px;
          color: #999;
        }
        .icons {
          width: 31px;
          font-size: 40px;
          color: orange;
        }
      }
    }
    .commit {
      .form {
        display: flex;
        flex-wrap: wrap;
        .list-button {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
  .el-aside {
    padding-top: 20px;
    .aside-title {
      font-weight: 400;
      font-size: 18px;
      padding-bottom: 20px;
      border-bottom: 1px solid #ddd;
    }
    .recommend-list {
      padding: 10px 0;
      .recommend-item {
        display: block;
        .aside-text {
          height: 80px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-bottom: 1px solid #ddd;
          /deep/img{
            width: 60px;
            height: 60px;
          }
          div {
            font-size: 16px;
            line-height: 1.4em;
            height: 2.8em;
          }
          p {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  /deep/.replyTag{
    margin-bottom: 10px;
    background-color: rgba(144,147,153,.1);
    border-color: rgba(144,147,153,.2);

    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(64,158,255,.2);
    white-space: nowrap;
    
  }
}
</style>
