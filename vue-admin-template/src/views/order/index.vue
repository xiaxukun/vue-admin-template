<template>
    <div>
        <div style="padding:15px; margin-left: 70%; width: 350px;">
            <el-input clearable v-model="orderNo" suffix-icon="el-icon-search" placeholder="请输入查询订单号" style="width: 180px;" size="mini"></el-input>
            <el-button @click="search()" type="primary" icon="el-icon-search" style="margin-left: 15px; width: 80px;" size="mini">查询</el-button>
        </div>
        <div class="app-container">
            <el-table :data="tableData" @cell-dblclick="handle" :border=true :stripe=true max-height="450px">
                <!--这里的prop绑定的是数组中-->
                <el-table-column prop="eventCode" label="事件码">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">{{ scope.row.eventCode }}</div>
                        <div v-else>
                            <el-input v-model="scope.row.eventCode"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="customerId" label="客户编号">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">{{ scope.row.customerId }}</div>
                        <div v-else>
                            <el-input v-model="scope.row.customerId"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="orderType" label="订单类型">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">{{ scope.row.orderType }}</div>
                        <div v-else>
                            <el-input v-model="scope.row.orderType"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="amount" label="订单金额">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">{{ scope.row.amount }}</div>
                        <div v-else>
                            <el-input v-model="scope.row.amount"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="discount" label="订单折扣">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">{{ scope.row.discount }}</div>
                        <div v-else>
                            <el-input v-model="scope.row.discount"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="needAudit" label="是否需要审核" style="width: 100px;">
                    <template slot-scope="scope">
                        <div v-if="tableData.length === 0">{{ scope.row.needAudit }}</div>
                        <div>
                            <el-radio v-model="scope.row.needAudit" style="width: 20%;" :label=true>是</el-radio>
                            <el-radio v-model="scope.row.needAudit" style="width: 20%;" :label=false>否</el-radio>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="备注">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">{{ scope.row.description }}</div>
                        <div v-else>
                            <el-input v-model="scope.row.description"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="contractNo" label="合同编号">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">{{ scope.row.contractNo }}</div>
                        <div v-else>
                            <el-input v-model="scope.row.contractNo"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="contractTagType" label="合同类别">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">{{ scope.row.contractTagType }}</div>
                        <div v-else>
                            <el-input v-model="scope.row.contractTagType"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="contractTagNo" label="合同标的编号">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">{{ scope.row.contractTagNo }}</div>
                        <div v-else>
                            <el-input v-model="scope.row.contractTagNo"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="beginDate" label="合同开始日期">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">{{ scope.row.beginDate }}</div>
                        <div v-else>
                            <el-input v-model="scope.row.beginDate"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="endDate" label="合同结束日期">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">{{ scope.row.endDate }}</div>
                        <div v-else>
                            <el-input v-model="scope.row.endDate"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="goodsNum" label="商品数量">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">{{ scope.row.goodsNum }}</div>
                        <div v-else>
                            <el-input v-model="scope.row.goodsNum"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="bizOrderNo" label="业务订单号">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">{{ scope.row.bizOrderNo}}</div>
                        <div v-else>
                            <el-input v-model="scope.row.bizOrderNo"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="bizType" label="业务类型">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">{{ scope.row.bizType}}</div>
                        <div v-else>
                            <el-input v-model="scope.row.bizType"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="bizSource" label="业务来源">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">{{ scope.row.bizSource}}</div>
                        <div v-else>
                            <el-input v-model="scope.row.bizSource"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="submitTime" label="下单时间">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">{{ scope.row.submitTime}}</div>
                        <div v-else>
                            <el-input v-model="scope.row.submitTime"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="finishedTime" label="完成时间">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">{{ scope.row.finishedTime}}</div>
                        <div v-else>
                            <el-input v-model="scope.row.finishedTime"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="salesId" label="销售Id">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">{{ scope.row.salesId}}</div>
                        <div v-else>
                            <el-input v-model="scope.row.salesId"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="city" label="城市">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">{{ scope.row.city}}</div>
                        <div v-else>
                            <el-input v-model="scope.row.city"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="company" label="公司">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEdit">{{ scope.row.company}}</div>
                        <div v-else>
                            <el-input v-model="scope.row.company"></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button style="width: 20%;" size="mini" type="primary" @click="handleClick(scope.row)">{{ scope.row.isEdit ? '完成' : '编辑' }}</el-button>
                        <!--style中padding属性用于设置两个标签之间的间距-->
                        <el-popover placement="left" trigger="click" style="padding: 10px;">
                            <el-table :data="scope.row.orderGoodsList" style="width: 100%" :stripe=true>
                                <el-table-column prop="bizItemId" label="订单行id">
                                    <template slot-scope="scope">
                                        <div v-if="!scope.row.isEdit">{{ scope.row.bizItemId }}</div>
                                        <div v-else>
                                            <el-input v-model="scope.row.bizItemId"></el-input>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="goodsId" label="商品Id">
                                    <template slot-scope="scope">
                                        <div v-if="!scope.row.isEdit">{{ scope.row.goodsId }}</div>
                                        <div v-else>
                                            <el-input v-model="scope.row.goodsId"></el-input>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="quantity" label="数量">
                                    <template slot-scope="scope">
                                        <div v-if="!scope.row.isEdit">{{ scope.row.quantity }}</div>
                                        <div v-else>
                                            <el-input v-model="scope.row.quantity"></el-input>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="salesPrice" label="市场价">
                                    <template slot-scope="scope">
                                        <div v-if="!scope.row.isEdit">{{ scope.row.salesPrice }}</div>
                                        <div v-else>
                                            <el-input v-model="scope.row.salesPrice"></el-input>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="unit" label="单位">
                                    <template slot-scope="scope">
                                        <div v-if="!scope.row.isEdit">{{ scope.row.unit }}</div>
                                        <div v-else>
                                            <el-input v-model="scope.row.unit"></el-input>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="originPrice" label="刊例价">
                                    <template slot-scope="scope">
                                        <div v-if="!scope.row.isEdit">{{ scope.row.originPrice }}</div>
                                        <div v-else>
                                            <el-input v-model="scope.row.originPrice"></el-input>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="totalPrice" label="小计">
                                    <template slot-scope="scope">
                                        <div v-if="!scope.row.isEdit">{{ scope.row.totalPrice }}</div>
                                        <div v-else>
                                            <el-input v-model="scope.row.totalPrice"></el-input>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="costPrice" label="成本价">
                                    <template slot-scope="scope">
                                        <div v-if="!scope.row.isEdit">{{ scope.row.costPrice }}</div>
                                        <div v-else>
                                            <el-input v-model="scope.row.costPrice"></el-input>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="beginDate" label="开始时间">
                                    <template slot-scope="scope">
                                        <div v-if="!scope.row.isEdit">{{ scope.row.beginDate }}</div>
                                        <div v-else>
                                            <el-input v-model="scope.row.beginDate"></el-input>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="endDate" label="结束时间">
                                    <template slot-scope="scope">
                                        <div v-if="!scope.row.isEdit">{{ scope.row.endDate }}</div>
                                        <div v-else>
                                            <el-input v-model="scope.row.endDate"></el-input>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="300">
                                    <template slot-scope="lscope">
                                        <el-button type="primary" size="mini" style="width: 20%;" @click="handleClick(lscope.row)">{{ lscope.row.isEdit ? '完成' : '编辑' }}</el-button>
                                        <el-button type="danger" size="mini" style="width: 30%;" @click="addProduct(scope.$index)">添加产品</el-button>
                                        <el-button type="danger" size="mini" style="width: 30%;" @click="deleteProduct(scope.$index)">删除产品</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-button size="mini" type="info" slot="reference" style="width: 20%;">产品</el-button>
                        </el-popover>
                        <el-button size="mini" type="success" @click="sendMessage(scope.row)" style="width: 20%;">发送</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--通过class适配css样式-->
            <el-button class="button" type="danger" @click="addRecord()">添加记录</el-button>
            <el-button class="button2" type="danger" @click="deleteRecord()">删除记录</el-button>
            <!-- <el-button class="button3" type="danger" @click="test()">test</el-button> -->
            <el-pagination
                class="box"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                layout="total, prev, pager, next, jumper"
                next-text="下一页"
                prev-text="上一页"
                :total="totalPage"
                :pageSize="10"
                width="94%">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import request from '../../utils/new-request.js';
    import axios from 'axios'
    import Cookies from 'js-cookie'

    // const request = axios.create({
    //     //请求地址，不填默认与当前前台服务同源
    //     //baseURL: 'http://localhost:9533',
    //     //请求响应超时时间
    //     timeout: 5000
    // })

    export default {
        // data() {
        //     return {
        //         form: {
        //             name: '',
        //             region: '',
        //             date1: '',
        //             date3: '',
        //             delivery: false,
        //             type: [],
        //             resource: '',
        //             desc: ''
        //         }
        //     }
        data() {
            return {
                tableData: [{
                    eventCode: 'CHANGE',
                    customerId: '101',
                    orderType: 'crm',
                    amount: 100.00,
                    discount: 0.8,
                    needAudit: false,
                    description: '暂无',
                    contractNo: '202',
                    contractTagType: 1,
                    contractTagNo: '202',
                    beginDate: '2023-02-06',
                    endDate: '2023-03-09',
                    goodsNum: 1,
                    bizOrderNo: '404',
                    bizType: 1,
                    bizSource: 5,
                    submitTime: '2023-02-07 00:00:00',
                    finishedTime: '2023-03-10 00:00:00',
                    salesId: '505',
                    city: '上海',
                    company: '再惠',
                    orderGoodsList: [{
                        bizItemId: '101',
                        goodsId: '202',
                        quantity: 10,
                        salesPrice: 100.00,
                        unit: '元',
                        originPrice: 10,
                        totalPrice: 10.00,
                        costPrice: 80.00,
                        beginDate: '2023-02-06',
                        endDate: '2023-03-09'
                    }]
                    }],
                totalPage: 1,
                currentPage: 1,
                pageSize: 5,
                orderNo: undefined
        }
        },
        methods: {
            // onSubmit() {
            //     console.log('submit!');
            //     let sendInfo = JSON.stringify(this.form)
            //     //console.log(this.form.data)
            //     //console.log(this.form.data2)
            //     //console.log(sendInfo)
            //     request.post("/proxy/test").then((result) => {
            //         //let result = JSON.parse(res.data)
            //         //console.log(res.data)
            //         alert(result.data.code)
            //     }).catch((err) => {
            //         alert(err)
            //     })
            // },
            // getMessage() {
            //     request.post('/proxy/getMessage').then((result) => {
            //         console.log(result.data.message)
            //     }).catch((err) => {
            //         alert(err)
            //     })
            // }
            handleClick(row) {
                //index是行索引，row则为行数据
                if (row.isEdit) {
                    //通过$delete为表格行删除属性
                    this.$delete(row, 'isEdit');
                } else {
                    //通过$set为表格行添加属性
                    this.$set(row, 'isEdit', true);
                }
            },
            handle() {
            },
            sendMessage(row) {
                let param = new Object();
                param.date = row.date;
                param.name = row.name;
                param.orderNo = row.orderNo;
                param.product = row.product;
                //console.log(param)
                request.post('/proxy/orderInsert', param).then(result => {
                    alert(result.message)
                }).catch(err => {
                    alert(err)
                })
            },
            getOrderInfo(pageNum, pageSize) {
                let param = new Object();
                param.pageNum = pageNum;
                param.pageSize = pageSize;
                request.post('/proxy/qilin/order/list', param).then(result => {
                    console.log(result)
                    this.totalPage = result.data.totalCount;
                    this.tableData = result.data.items;
                }).catch(err => {
                    alert(err)
                })
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                //let param = new Object();
                //param.pageNum = val;
                //param.pageSize = this.pageSize;
                // request.post('/proxy/getOrderInfo', param).then(result => {
                //     console.log(result.message)
                //     this.totalPage = result.message.total;
                //     this.tableData = result.message.list;
                // }).catch(err => {
                //     alert(err)
                // })
                this.getOrderInfo(val, this.pageSize);
            },
            search() {
                if (this.orderNo === undefined || this.orderNo.trim() === '') {
                    alert("请输入正确订单号后查询");
                } else {
                    //这种方式是将请求参数拼接到请求的url中
                    //let param = new URLSearchParams();
                    let param = new Object();
                    param.orderNo = this.orderNo;
                    request.post('/proxy/search', param).then(result => {
                        this.totalPage = result.message.total;
                        this.tableData = result.message.list;
                    }, err => {
                        Promise.reject(err);
                    });
                }
                this.orderNo = undefined;
            },
            addRecord() {
                this.tableData.push({});
            },
            deleteRecord() {
                this.tableData.pop(1);
            },
            addProduct(index) {
                console.log(index);
                this.tableData[index].orderGoodsList.push({});
                //this.tableData[index].orderGoodsList.push({});
            },
            deleteProduct(index) {
                this.tableData[0].orderGoodsList.pop(1);
            },
            test() {
                window.location.replace("https://atlas-inter.kezaihui.com/#/login");
            }
        },
        //生命周期创建后节点
        created() {
            //加载后台数据页面展示
            //this.getOrderInfo(1, 5);
            //let param = new Object();
            //param.pageNum = 1;
            //param.pageSize = 5;
            this.getOrderInfo(this.currentPage, this.pageSize);
            // axios.post('http://localhost:8070/getOrderInfo', param).then(result => {
            //     console.log(result)
            // }).catch(error => {
            //     console.log(error)
            // })
        },
        //生命周期函数的挂载后节点
        mounted() {
        }
    }
</script>

<style scoped>
    .box {
        /*padding为元素间距，margin为外间距*/
        position: absolute;
        right: 0px;
        /*与其它元素标签之间的间隔*/
        padding: 30px;
    }

    .button {

        position: absolute;
        left: 0px;
            /*与其它元素标签之间的间隔*/
        margin: 20px;
    }

    .button2 {

        position: absolute;
        left: 120px;
            /*与其它元素标签之间的间隔*/
        margin: 20px;
    }

    .button3 {

        position: absolute;
        left: 240px;
            /*与其它元素标签之间的间隔*/
        margin: 20px;
    }
</style>
