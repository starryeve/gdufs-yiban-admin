<template>
  <!-- 分割线 -->
  <div class="content">
    <!-- 卡片视图 -->
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <span> </span>
        <el-button style="float: right; padding: 3px 0"
                   type="text"
                   @click="gotoUploadVideo">
          上传视频
        </el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="videoLists.slice((currentPage-1)*pageSize, currentPage*pageSize)"
                style="width: 100%"
                :show-header="false">
        <el-table-column prop="cover"
                         label="封面"
                         width="300">
          <!-- 图片的显示 -->
          <template slot-scope="scope">
            <img :src="scope.row.cover"
                 width="140"
                 height="86" />
          </template>
        </el-table-column>
        <el-table-column prop="title"
                         label="标题">
        </el-table-column>
        <el-table-column prop="time"
                         label="日期">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="primary" size="small">详情</el-button> -->
            <el-button type="warning"
                       size="small"
                       @click="gotoEdit(scope.row.id)">
              编辑
            </el-button>
            <el-button type="danger"
                       size="small"
                       @click="confirmDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-size=5
                     background
                     layout="prev, pager, next"
                     :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      videoLists: [],
      total: 0,
      pageSize: 5, //每页多少条
      currentPage: 1, // 当前页
      vid: 0, //视频id
    }
  },
  created () {
    this.getVideos()
  },
  methods: {
    // 每页多少条
    handleSizeChange (val) {
      this.pageSize = val;
    },
    // 当前页
    handleCurrentChange (val) {
      this.currentPage = val;
    },
    async getVideos () {
      const { data: res } = await this.$http.get('/getVideos')
      console.log(res.data[0])
      if (res.status !== 1) return this.$message.error("获取失败");
      this.videoLists = res.data
      this.total = res.total
      // console.log(res)
    },
    gotoUploadVideo () {
      // 指定跳转地址
      this.$router.replace('/addVid')
    },
    gotoEdit (vid) {
      //跳转到编辑页码
      // console.log(vid);
      this.$router.replace('/modifyVid/' + vid)
    },
    async confirmDelete (id) {
      console.log(id);
      // var id = id;
      this.$dialog({
        title: '删除视频',
        message: '请确认是否删除该视频'
      }).then(async () => {
        console.log('是');
        try {
          const { data: { status, data } } = await this.$http({
            method: 'delete',
            url: '/deleteVideo/' + id,

          })
          if (status === 1) {
            this.$message.success('删除成功')
            this.getVideos()
          } else {
            this.$message.error('删除失败')
          }

        } catch (err) {
          console.log('网络错误');
        }
        // console.log(res)
      }, () => {
        console.log('否');
      })
    }
  },

}
</script>

<style lang="less" scoped>
  .content {
    height: 100%;
  }

  .el-card {
    margin: 10px;
  }
  .el-pagination {
    text-align: center;
  }
</style>