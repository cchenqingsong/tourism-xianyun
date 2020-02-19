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
      <h1>塞班贵？一定是你的打开方式不对！6000块玩转塞班</h1>
      <div class="strategy">
        <span>攻略：2019-05-22 10:57</span>
        &nbsp;&nbsp;&nbsp;
        <span>阅读：13695</span>
      </div>

      <!-- 攻略详情部分 -->
      <div>大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。</div>
      <img class="photo" src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90" alt="">
      <span class="img-detail">图：塞班岛。 by第5季旅游</span>
      <h2>一、怎样用6000块玩转塞班？</h2>
      <div>
        大多数出境游客人不做预算或最终花费远远超出预算，对预算的合理分配对控制我们旅行的花费就很重要了，如何只花6000块玩转塞班岛，对预算超支say no？下面从5个方面来为您一一解读：机票+酒店、岛上交通、玩乐项目、吃以及购买纪念品。
      </div>
      <p><br></p>
      <h3>1.怎样订机票+酒店性价比最高？</h3>
      <div>机票和酒店的花销往往会占据我们旅行大半的花销，假设机票酒店为塞班行预算的一半，剩下的吃行玩购为预算的另一半，如果能在机票酒店这部分省下钱，也就意味着在塞班岛用来吃行玩购的钱就增加了
        <img src="https://images.mafengwo.net/images/i/face/brands_v3/6@2x.png" alt="">
      </div>
      <img class="photo" src="https://p1-q.mafengwo.net/s10/M00/E9/33/wKgBZ1octwiAAKAoAAJ9ixcJc9M71.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90" alt="">
      <p>怎样去塞班？可以转机也可以直飞，转机大多会从韩国转，提前蹲守能买到韩国飞塞班的特价机票，2000以下就能入手，加上国内飞韩国的机票来回塞班得5000+，还没算上在塞班的住宿费用，转机还有中途等待的时间，光花在路途上的时间就比直飞要多上一倍甚至更多，转乘奔波劳累，非联程票还要担心行李托运问题，所以建议大家有直飞还是尽量选择直飞。</p>
      <p>在酒店上，旅途中我们呆在酒店的时间远比在外游玩的时间少，酒店干净整洁基本就能满足我们休息的需求，塞班不是个享受酒店的地方而且还真不能跟国内星级酒店等位比较，所以不建议大家花过多的钱在塞班的酒店体验上。</p>
      <p>怎样在机票酒店上获得最高性价比的体验？ 直飞塞班的航班一般和酒店一起打包成机票+酒店套餐，价格要比单定机票、酒店要更加便捷实惠，往往3千多就能把机票和酒店一键搞定。</p>
      <div class="post-ctrl" >
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
        <el-form class="form">
          <el-form-item style="flex:100%">
            <el-input></el-input>
          </el-form-item>
          <el-form-item style="flex:100%">
            <div class="list-button">
              <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <div><el-button type="primary" size="mini">提交</el-button></div>
            </div>
          </el-form-item>
        </el-form>

        <!-- 评论展示部分 -->
        <detailComments></detailComments>

        <!-- 底部分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
  </el-main>

  <!-- 右侧相关攻略部分 -->
  <el-aside width='280px'>
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
import detailComments from '@/components/post/detailComments'
export default {
  data() {
      return {
        currentPage: 1,
        total: 100
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
  },
  components: {
    detailComments
  }
}
</script>

<style lang='less' scoped>
  .el-container{
    width:1000px;
    margin:0 auto;
    justify-content: space-between;
      .el-main {
        padding: 20px 20px 20px 0;
        h1{
          padding: 20px 0px;
          border-bottom: 1px solid #ddd;
          font-size:2em
        };
        .strategy{
          padding: 20px 20px;
          color:#999;
          text-align: right;
        };
        .photo{
          width: 700px;
          margin: 10px 0
        }
        .img-detail{
          color: rgb(153, 153, 153)
        }
        .post-ctrl{
          display: flex;
          justify-content: center;
          padding: 50px 0 30px;
          .post-ctrl1{
            display: flex;
            flex-direction:column;
            align-items: center;
            height: 55px;
                margin: 0 20px;
                font-size: 20px;
                text-align: center;
                cursor: pointer;
            p{
              margin-top: 5px;
              font-size: 14px;
              color: #999;
            }
            .icons{
              width: 31px;
              font-size:40px;
              color: orange
            }
          }
        }
        .commit{
          .form{
            display: flex;
            flex-wrap: wrap;
            .list-button{
              display: flex;
              justify-content: space-between;
            }
          }
        }
      }
      .el-aside {
      padding: 20px 0;
      .aside-title{
        font-weight: 400;
        font-size: 18px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
      }
      .recommend-list{
        .recommend-item{
          display: block;
          .aside-text{
            height: 80px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 20px 0;
            border-bottom: 1px solid #ddd;
            div{
              font-size: 16px;
              line-height: 1.4em;
              height: 2.8em;
            }
            p{
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