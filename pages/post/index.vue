<template>
  <el-row type="flex" justify="space-between" class="post">
    <!-- 左主体 -->
    <el-col :span="6">
      <!-- 左上导航栏 -->
      <el-row type="flex">
        <div style="width:260px">
          <el-row
            class="navs"
            :class="{yellow:index==indexs && isShow}"
            type="flex"
            justify="space-between"
            align="middle"
            @mouseover.native="handleMove(item.children,index)"
            @mouseout.native="handleOut"
            v-for="(item,index) in cityMenuList"
            :key="index"
          >
            <span>{{item.type}}</span>
            <i class="el-icon-arrow-right"></i>
          </el-row>
        </div>

        <!-- 隐藏的导航栏 -->
        <div class="yincang" v-show="isShow" @mouseover="isShow=true" @mouseout="isShow=false">
          <el-row class="hidden">
            <el-row class="ranking" v-for="(item,index) in citySubmenuList" :key="index">
              <span style="fontSize:20px">{{index+1}}</span>
              <span style="margin:0 10px;">{{item.city}}</span>
              <span>{{item.desc}}</span>
            </el-row>
          </el-row>
        </div>
      </el-row>
      <!-- 推荐城市 -->
      <el-row class="recommend" type="flex" justify="space-between" align="middle">
        <span>推荐城市</span>
      </el-row>
      <img src="/pic_sea.jpeg" alt style="width:100%" />
    </el-col>

    <!-- 右主体 -->
    <el-col :span="17">
      <!-- 搜索框 -->
      <el-row type="flex" align="middle">
        <el-input class="inputSearch" placeholder="请输入想去得地方，比如：‘广州’" v-model="city"></el-input>
        <el-button class="el-icon-search" @click="handleSearch">&nbsp;搜索</el-button>
      </el-row>

      <div class="hotlist">
        推荐：
        <el-button
          v-for="(item,index) in ['广州','上海','北京']"
          :key="index"
          @click="handleCelestSearch(item)"
        >{{item}}</el-button>
      </div>

      <el-row class="strategy" type="flex" justify="space-between">
        <span>推荐攻略</span>
        <el-button type="primary">
          <i class="el-icon-edit"></i>
          写游记
        </el-button>
      </el-row>
      <!-- 引入articleItem组件 -->
      <ArticleItem :data="articleList"></ArticleItem>
      <!-- 分页 -->
      <el-pagination
        v-if="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[3, 6, 9, 12]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <span>{{allArticle}}</span>
    </el-col>
  </el-row>
</template>

<script>
// 引入每篇文章的组件
import ArticleItem from "@/components/post/articleItem";
export default {
  data() {
    return {
      // 导航栏的状态
      isShow: false,
      // hover的样式
      indexs: 5,
      // 城市菜单列表
      cityMenuList: {},
      // 子菜单的列表
      citySubmenuList: {},
      // 文章列表
      articleList: [],
      // 每一页的文章数目
      pageSize: 3,
      // 当前的页面
      pageIndex: 1,
      // 文章总条数
      total: 0,
      // 绑定搜索框的valud
      city: ""
    };
  },
  methods: {
    // 鼠标移入显示导航栏
    handleMove(data, index) {
      this.citySubmenuList = data;
      this.indexs = index;
      this.isShow = true;
    },
    // 鼠标移出，隐藏导航栏
    handleOut() {
      this.isShow = false;
    },
    // 切换每页条数的函数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    // 切换页码的函数
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageIndex = val;
      // 给当前的路由添加参数
      this.$router.replace({
        url: this.$route.path,
        query: {
          start: (val - 1) * this.pageSize,
          limit: this.pageSize
        }
      });
    },
    // 封装  文章列表的请求
    getData(start, limit, city) {
      this.$axios({
        url: "/posts",
        params: {
          _start: start,
          _limit: limit,
          city: city
        }
      }).then(res => {
        // console.log(res);
        this.total = res.data.total;
        this.articleList = res.data.data;
      });
    },
    // 搜索文章的请求
    handleSearch(item) {
      if (!this.city) return;
      this.getData(
        (this.pageIndex - 1) * this.pageSize,
        this.pageSize,
        this.city
      );
    },
    // 点击文字搜索
    handleCelestSearch(item) {
      this.getData((this.pageIndex - 1) * this.pageSize, this.pageSize, item);
    }
  },
  computed: {
    allArticle() {
      this.getData((this.pageIndex - 1) * this.pageSize, this.pageSize);
      return "";
    }
  },
  components: {
    ArticleItem
  },
  mounted() {
    // 城市菜单列表的请求
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      // console.log(res);
      this.cityMenuList = res.data.data;
    });
    if (this.$route.query.start && this.$route.query.limit) {
      this.pageIndex = this.$route.query.start / this.$route.query.limit + 1;
      this.getData(
        (this.pageIndex - 1) * this.pageSize,
        this.pageSize,
        this.city
      );
    }
  }
};
</script>

<style lang="less" scoped>
.post {
  padding: 20px 0;
  margin: 0 auto;
  width: 1000px;
  .navs {
    z-index: 10;
    padding: 0 20px;
    font-size: 14px;
    width: 100%;
    height: 41px;
    line-height: 41px;
    border: 1px solid #ddd;
    i {
      font-size: 20px;
      opacity: 0.4;
    }
    &:nth-child(n + 2) {
      margin-top: -1px;
    }
  }
  .recommend {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    height: 41px;
    line-height: 41px;
    border-bottom: 1px solid #ddd;
  }

  /deep/.el-input__inner {
    outline: none;
    border: 2px solid #ffc900;
  }
  button {
    border: none;
    outline: none;
  }
  .el-icon-search {
    position: absolute;
    right: 0;
    padding: 0 15px;
    height: 36px;
    font-size: 20px;
    background-color: #ffc900;
  }
  .hotlist {
    padding: 10px 0;
    font-size: 12px;
    color: #666;
  }
  .strategy {
    span {
      font-size: 18px;
      color: #ffc900;
      height: 40px;
      border-bottom: 2px solid #ffc900;
    }
    button {
      width: 106px;
      height: 40px;
      border: none;
      border-radius: 5px;
    }
  }
  .hidden {
    // position: relative;
    padding: 10px 20px;
    // width: 500px;
    height: 200px;
    font-size: 14px;
    border: 1px solid #ddd;
    .ranking {
      padding: 4px 0;
      span {
        color: #ffc900;
        &:nth-child(3) {
          color: #666;
        }
      }
    }
  }
  .yincang {
    z-index: 5;
    position: absolute;
    background-color: #fff;
    width: 350px;
    margin-left: 249px;
  }
}
.post .yellow {
  color: #ffc900;
  border-right: 1px solid #fff;
}
/deep/.el-button--default {
  padding: 0;
}
</style>