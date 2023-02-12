<template>
    <div>
        <div style="padding:15px; margin-left: 70%; width: 350px;">
            <el-input clearable v-model="orderNo" suffix-icon="el-icon-search" placeholder="请输入查询订单号" style="width: 180px;" size="mini"></el-input>
            <el-button @click="search()" type="primary" icon="el-icon-search" style="margin-left: 15px; width: 80px;" size="mini">查询</el-button>
        </div>
        <div class="app-container">
            <el-table :data="tableData" style="width: 100%" :border=true :stripe=true @cell-dblclick="handle" max-height="450px">
                <el-table-column prop="eventCode" label="事件码">
                </el-table-column>
                <el-table-column prop="bizOrderNo" label="订单号">
                </el-table-column>
                <el-table-column prop="bizType" label="订单类型">
                </el-table-column>
                <el-table-column prop="collectionAmount" label="回款金额">
                </el-table-column>
                <el-table-column prop="payType" label="支付类型">
                </el-table-column>
                <el-table-column prop="transTime" label="交易时间">
                </el-table-column>
                <el-table-column prop="customerId" label="客户Id">
                </el-table-column>
                <el-table-column prop="payer" label="打款人">
                </el-table-column>
                <el-table-column prop="payTime" label="打款时间">
                </el-table-column>
                <el-table-column prop="isOvercharge" label="是否多收待退">
                    <template slot-scope="scope">
                        <div v-if="tableData.length === 0">{{ isOvercharge }}</div>
                        <div>
                            <el-radio v-model="scope.row.isOvercharge" style="width: 20%;" :label=true>是</el-radio>
                            <el-radio v-model="scope.row.isOvercharge" style="width: 20%;" :label=false>否</el-radio>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="备注">
                </el-table-column>
                <el-table-column prop="operator" label="操作人">
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" @click="sendMessage(scope.row)" style="width: 60%;">发送</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button class="button" type="danger" @click="addRecord()">添加记录</el-button>
            <el-button class="button2" type="danger" @click="deleteRecord()">删除记录</el-button>
            <el-pagination
                class="box"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                layout="total, prev, pager, next, jumper"
                next-text="下一页"
                prev-text="上一页"
                :total="totalPage"
                :pageSize="pageSize"
                width="94%">
            </el-pagination>
        </div>
    </div>
</template>

<script>

    import request from '@/utils/test-request'
    import axios from 'axios'

    export default {
        data() {
            return {
                tableData: [{
                    eventCode: 'PAY',
                    bizOrderNo: '110',
                    bizType: 1,
                    bizSource: 2,
                    collectionAmount: 20.00,
                    payType: 1,
                    transTime: '2023-02-08',
                    customerId: '12',
                    payer: '张三',
                    payTime: '2023-02-09',
                    isOvercharge: false,
                    description: '暂无',
                    operator: '燕六'
                }],
                orderNo: undefined,
                currentPage: 1,
                totalPage: 10,
                pageSize: 5
            }
        },
        methods: {
            queryMessage() {
                // axios({
                //     method: 'post',
                //     url: 'http://localhost:9533/proxy/littleTest',
                //     //如果参数为data，那么请求参数在body中，如果为params，请求参数会拼接到请求url中
                //     data: {
                //         "pageNum": 1,
                //         "pageSize": 1
                //     }
                // })
                
            },
            getRefundInfo(pageNum, pageSize) {
                let param = new Object();
                param.pageNum = pageNum;
                param.pageSize = pageSize;
                request.post('/proxy/getOrderInfo', param).then(result => {
                    console.log(result.message)
                    this.totalPage = result.message.total;
                    this.tableData = result.message.list;
                }).catch(err => {
                    alert(err)
                })
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
            sendMessage(row) {
                console.log(row);
                axios({
                    method: 'post',
                    url: 'http://localhost:8070/test',
                    timeout: 5000,
                    data: row
                }).then(result => {
                    console.log(result);
                }).catch(error => {
                    console.err(error);
                })
            },
            handle(row, column, cell, event) {
                if (event.target.toString().includes('Input')) {
                    return;
                }
                if (column.property === 'isOvercharge' || column.property === undefined) {
                    return;
                }
                let cellInput = document.createElement("input");
                if (event.target.toString().includes('Div')) {
                    event.target.innerText = "";
                    cellInput.value = row[column.property];
                } else {
                    event.target.innerHTML = "";
                }
                cellInput.setAttribute("type", "text");
                cellInput.style.width = "80%";
                cellInput.style.height = "80%"
                cellInput.style.marginLeft = "10%";
                cellInput.style.paddingLeft = "5px"
                cellInput.style.border = "grayscale 0.1px solid"
                cellInput.placeholder="请输入需要修改的值"
                cell.appendChild(cellInput);

                //输入框聚焦
                cellInput.focus();

                //失去焦点事件
                cellInput.onblur = function () {
                    cell.removeChild(cellInput);
                    if (event.target.toString().includes('Div')) {
                        event.target.innerText = cellInput.value;
                        row[column.property] = cellInput.value;
                    } else {
                        let div = "<div class=\"cell\">"+cellInput.value+"</div>"
                        event.target.innerHTML = div;
                        row[column.property] = cellInput.value;
                    }
                };
                //console.log(this.tableDate);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getRefundInfo(val, this.pageSize);
            },
            addRecord() {
                this.tableData.push({});
            },
            deleteRecord() {
                this.tableData.pop(1);
            }
        },
        //生命周期创建前
        created(){
            //this.getRefundInfo(this.currentPage, this.pageSize)
        }
    }
</script>

<style>
input{outline:none;}

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
</style>