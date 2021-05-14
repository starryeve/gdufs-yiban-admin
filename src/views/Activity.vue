<template>
  <div class="content">
    <!-- 卡片视图 -->
    <el-card>
      <!-- 头部 -->
      <div slot="header"
           class="clearfix">
        <span> </span>
        <el-button style="float: right; padding: 3px 0"
                   type="text">操作按钮</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="activityLists.slice((currentPage-1)*pageSize, currentPage*pageSize)"
                style="width: 100%"
                :show-header="false">
        <el-table-column prop="title"
                         label="标题"
                         width="180">
        </el-table-column>
        <el-table-column prop="created"
                         label="日期"
                         width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="small">详情</el-button>
            <el-button type="warning"
                       size="small">编辑</el-button>
            <el-button type="danger"
                       size="small">删除</el-button>
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
      activityLists: [],
      total: 0,
      pageSize: 5, //每页多少条
      currentPage: 1, // 当前页
    }
  },
  created () {
    this.getActivities()
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
    async getActivities () {
      const { data: res } = await this.$http({
        url: 'getActivities',
        method: 'get'
      })
      if (res.status !== 1) return this.$message.error("获取失败");
      this.activityLists = res.data
      this.total = res.total
    }

  }
}
</script>

<style lang="less" scoped>
  .content {
    height: 100%;
  }
  .el-breadcrumb {
    display: flex;
    font-size: 10px;
    padding: 10px 10px;
    margin: 20px 10px;
  }
  .el-card {
    margin: 10px;
  }
  .el-pagination {
    text-align: center;
  }
</style>