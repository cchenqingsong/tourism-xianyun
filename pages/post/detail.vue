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

      <!-- 攻略详情部分 -->
      <div v-html="detailData.content" class="content"></div>

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
      <div class="commit">
        <!-- 发表评论部分 -->
        <div style="font-weight: 400;font-size: 18px;margin-bottom: 20px;">评论</div>
        <el-form class="form">
          <el-form-item style="flex:100%">
            <el-input v-model="form.inputData" placeholder="说点什么吧..."></el-input>
          </el-form-item>
          <el-form-item style="flex:100%">
            <div class="list-button">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <div>
                <el-button type="primary" size="mini">提交</el-button>
              </div>
            </div>
          </el-form-item>
        </el-form>

        <!-- 评论展示部分 -->
        <detailComments :data='commentsList' v-for="(item,index) in commentsList" :key="index"></detailComments>

        <!-- 底部分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="2"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-main>

    <!-- 右侧相关攻略部分 -->
    <el-aside width="280px">
      <h4 class="aside-title">相关攻略</h4>
      <div class="recommend-list">
        <a href="#" class="recommend-item">
          <div class="aside-text">
            <div>123</div>
            <p>2020-02-17 10:37 阅读 4</p>
          </div>
        </a>
        <a href="#" class="recommend-item">
          <div class="aside-text">
            <div>123</div>
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
      // 模拟的上个页面传过来的数据id
      id: 4,
      // 文章数据
      detailData: {},
      // 评论列表信息
      commentsList: [],

      // 分页时更新评论的列表
      updataComments: {
        // 当前文章id
        post: 4,
        // 需要提交的每页几个数据
        _limit: 2,
        // 当前页的数据从第几个开始
        _start: 0,
      },

      // 发表评论的数据
      form: {
        inputData: ""
      }
    };
  },
  methods: {
    // 封面图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    // 分页
    // 每页多少条
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.updataComments._limit = val;
      this.getDataList()
    },
    // 当前是第几页
    handleCurrentChange(val) {
      this.updataComments._start = (val - 1) * 2;
      this.getDataList()
    },
    // 获取评论列表
    getDataList(){
      console.log(this.updataComments)
        this.$axios({
        url: "/posts/comments",
        params: this.updataComments
      }).then(res => {
        console.log(res);
        this.commentsList = res.data.data;
        this.total = res.data.total;
      });
    }
  },
  mounted() {
    // 获取文章详情
    this.$axios({
      url: "/posts",
      params: {
        id: this.id
      }
    }).then(res => {
      console.log(res);
      this.detailData = res.data.data[0];
    });
    // 获取评论列表
    this.getDataList()
  },
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
    padding: 20px 0;
    .aside-title {
      font-weight: 400;
      font-size: 18px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
    }
    .recommend-list {
      .recommend-item {
        display: block;
        .aside-text {
          height: 80px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20px 0;
          border-bottom: 1px solid #ddd;
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
}
</style>
