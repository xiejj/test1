<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
<link rel="stylesheet" type="text/css" href="${themePath}/css/validator02.css"/>
<link rel="stylesheet" type="text/css" href="${themePath}/css/global.css" />
<link rel="stylesheet" type="text/css" href="${themePath}/css/layout.css" />
<link rel="stylesheet" type="text/css" href="${themePath}/css/base.css" />
<link rel="stylesheet" type="text/css" href="${themePath}/css/opendiv.css" />
<link rel="stylesheet" type="text/css" href="${themePath}/css/button.css"/>
<link rel="stylesheet" type="text/css" href="${themePath}/css/ssms.css"/>
<link rel="stylesheet" type="text/css" href="${themePath}/css/colorbox/colorbox.css" />
<link rel="stylesheet" type="text/css" href="${themePath}/css/grid/ui.jqgrid.css" />
<link rel="stylesheet" type="text/css" href="${themePath}/css/grid/jquery-ui-1.8.17.custom.css" />
<link rel="stylesheet" type="text/css" href="${themePath}/css/msgbox/jbox.css" />
<link rel="stylesheet" type="text/css"  href="${themePath}/css/ztree3.4/zTreeStyle.css"/>

<script type="text/javascript" src="${jsPath}/jquery/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="${jsPath}/grid/grid.locale-cn.js"></script>
<script type="text/javascript" src="${jsPath}/grid/jquery.jqGrid.min.js"></script>
<script type="text/javascript" src="${jsPath}/ztree3.4/jquery.ztree.all-3.4.min.js"></script>

<script type="text/javascript" src="${jsPath}/cleditor/jquery.cleditor.min.js"></script>
<script type="text/javascript" src="${jsPath}/msgbox/jquery.jBox-2.3.min.js"></script>
<script type="text/javascript" src="${jsPath}/msgbox/i18n/jquery.jBox-zh-CN.js"></script>
<script type="text/javascript" src="${jsPath}/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="${jsPath}/localComponent.js"></script>
<script type="text/javascript" src="${jsPath}/workflow.js"></script>
<script type="text/javascript" src="${jsPath}/base/ajax.js"></script>
<script type="text/javascript" src="${jsPath}/base/json2.js"></script>
<script type="text/javascript" src="${jsPath}/wst-common.js"></script>
<script type="text/javascript" src="${jsPath}/util.js"></script>
<script type="text/javascript" src="${jsPath}/base/utility.js"></script>
<script type="text/javascript" src="${jsPath}/base/block.js"></script>
<script type="text/javascript" src="${jsPath}/base/date.js"></script>
<script type="text/javascript" src="${jsPath}/base/global.js"></script>
<script type="text/javascript" src="${jsPath}/validate/validate_v02.js"></script>
<script type="text/javascript" src="${jsPath}/ssms/common.js"></script>
<script type="text/javascript" src="${jsPath}/ssms/rk.js"></script>
<script type="text/javascript" src="${jsPath}/ssms/ck.js"></script>
<script type="text/javascript" src="${jsPath}/ssms/yw.js"></script>
<script type="text/javascript" src="${jsPath}/common.js"></script>


<script type="text/javascript">


//初始化仓库id
var cangkuId = '${ckid}';
//存放一行需要的数据
var label = null;
//选择的行
var selectedArray = new Array();
var qyidS = "";

var finalData = new Array();
var path = '${path}';
//存放最终传递到后台的数据
var rowData = new Array();
var colmodel = [ {name : 'pdmxid', index : 'pdmxid', sortable : false, hidden : true},
				 {name : 'wz.wzid', index : 'wz.wzid', sortable : false, hidden : true},
                 {name : 'wz.wzbh', index : 'wz.wzbh', sortable : false, width : "2%", align : "center", formatter : function(cellvalue) {
						return htmlEncode(cellvalue);}},
				 {name : 'wz.wzmc', index : 'wz.wzmc', sortable : false, width : "2%", align : "center", formatter : function(cellvalue) {
						return htmlEncode(cellvalue);}},
                 {name : 'wz.wzgg', index :'wz.wzgg', sortable : false, width : "2%", align : "center", formatter : function(cellvalue) {
						return htmlEncode(cellvalue);}},
                 {name : "wz.wzdw.zdnr", index : "wz.wzdw.zdnr", sortable : false, width : "1%", align : "center"}, 
            	 {name : 'wzsl', index : 'wzsl', sortable : false, width : "3%", align : "center"},
            	 {name : 'dshsl', index : 'dshsl', hidden : true, formatter : getDshsl},
            	 {name : 'dshrksl', index : 'dshrksl', hidden : true, formatter : getDshrksl},
            	 {name : 'hw.hwid', index : 'hw.hwid', hidden : true}
               ];        	 
var colNames = ['', '', '物资编号 ', '物资名称', '物资规格', '单位 ', '库存数量', '', '待审核数量','']; 
//当页面加载完成
$(document).ready(function(){
	var url = "${path}/ssms/inventory/pd!getPdmxInputList.action?pddid=${pddid}";
	var param = {
			parentId : "gridDiv",
			tableId : "pdmxInputList",
			pagerId : "pagesize",
			colNames : colNames,
			colModel : colmodel,
			width : 0.99,
			url : url,
			multiselect : true,
			onSelectRow : onSelectRow,
			onSelectAll : onSelectAll,
			loadComplete : loadComplete
		};
		createJqGrid(param);
		//qyidS = getQyS();
});

/*当行选择状态改变*/
function onSelectRow(rowId, status, e) {
	//获取当前选择行
	var line = $("#pdmxInputList").jqGrid('getRowData', rowId);
	//如果为选中
	if (status) {
		//确保数组中没有该行数据,加入选中数组中
		if (!isWzidExists(line['wz.wzid'], selectedArray)) {
			rowData = new Object();
			rowData['pdmxid'] = line.pdmxid;
			rowData['wz.wzid'] = line['wz.wzid'];
			rowData['wz.wzbh'] = line['wz.wzbh'];
			rowData['wz.wzmc'] = line['wz.wzmc'];
			rowData['wz.wzgg'] = line['wz.wzgg'];
			rowData['wz.wzdw.zdnr'] = line['wz.wzdw.zdnr'];
			rowData['wzsl'] = line['wzsl'];
			rowData['dshsl'] = line['dshsl'];
			rowData['dshrksl'] = line['dshrksl'];
			
			selectedArray.push(rowData);
		} 
	} else { //如果为取消选中，从selectedArray数组中删除该行
		for (var i = 0; i < selectedArray.length; i++) {
			if (selectedArray[i].wzid == line.wzid) {
				selectedArray.splice(i, 1);
				break;
			}
		}
		
		//从最终数据数组中(finalData)删除该行
		for (var i = 0; i < finalData.length; i++) {
			if (finalData[i].id == line.wzid) {
				finalData.splice(i, 1);
				break;
			}
		}
		
		if (selectedArray.length == 0) {
			finalData = [];
			cancel();
		}
	}
}

/*全选数据项*/
function onSelectAll(rowIdS, status, e) {
	selectedArray = [];
	if (status) {
		for (var i = 0; i < rowIdS.length; i++) {
			var line = $("#pdmxInputList").jqGrid('getRowData', rowIdS[i]);
			rowData = new Object();
			rowData['pdmxid'] = line.pdmxid;
			rowData['wz.wzid'] = line['wz.wzid'];
			rowData['wz.wzbh'] = line['wz.wzbh'];
			rowData['wz.wzmc'] = line['wz.wzmc'];
			rowData['wz.wzgg'] = line['wz.wzgg'];
			rowData['wz.wzdw.zdnr'] = line['wz.wzdw.zdnr'];
			rowData['wzsl'] = line['wzsl'];
			rowData['dshsl'] = line['dshsl'];
			rowData['dshrksl'] = line['dshrksl'];
			
			selectedArray.push(rowData);
		}
	} else {
		finalData = [];
		cancel();
	}
}

/*当表格加载完成*/
function loadComplete() {
	var rowNums = $("#pdmxInputList").jqGrid('getDataIDs');
	for (var i = 0; i < rowNums.length; i++) {
		var line = $("#pdmxInputList").jqGrid('getRowData', rowNums[i]);
		if (isWzidExists(line['wz.wzid'], selectedArray)) {
			$("#pdmxInputList").jqGrid('setSelection', rowNums[i], true);
		}
	}
}

/*判断wzid是否在数组中存在*/
function isWzidExists(id, array) {
	for(var index = 0; index < array.length; index ++) {
		if (array[index]['wz.wzid'] == id) 
			return true;
	}
	return false;
}

/*清空临时表格，div隐藏*/
function cancel() {
	//将物资表选中项取消选中		
	var ids = $("#pdmxInputList").jqGrid('getDataIDs');
	for (var i = 0; i < ids.length; i++) {
		if ($("#jqg_pdmxInputList_" + ids[i]).attr("checked") == "checked") {
			$("#pdmxInputList").jqGrid('setSelection', ids[i], false);
		}
	} 
	//清空选中数组
	selectedArray = [];
}

	
	
	/*格式化待移位审核数量*/
	function getDshsl(cellvalue, options, rowObject) {
		var url = "${path}/ssms/stock/ck!getPrepareAduditCount.action";
		$.ajax({
			url : url,
			type : "post",
			async : false,
			data : {
				wzid : rowObject["wz.wzid"],
				hwid : rowObject["hw.hwid"]
			},
			success : function(data) {
					cellvalue = data;
			},
			error : function(data) {
				alert("系统异常，请与管理员联系！");
			}
		});
		
		return cellvalue;
	}
	/*格式化待移位审核数量*/
	function getDshrksl(cellvalue, options, rowObject) {
		var url = "${path}/ssms/stock/rk!getRkAduditCount.action";
		$.ajax({
			url : url,
			type : "post",
			async : false,
			data : {
				wzid : rowObject["wz.wzid"],
				hwid : rowObject["hw.hwid"]
			},
			success : function(data) {
					cellvalue = data;
			},
			error : function(data) {
				alert("系统异常，请与管理员联系！");
			}
		});
		
		return cellvalue;
	}
	
	
	//所有选中的物资id
	function allWzIds(){
		
		//如果没有选物资，提示
		if (selectedArray.length == 0) {
			alert("请选择物资");
			return;
		}
		/* ids = $("#pdmxInputList").jqGrid('getDataIDs');
		for(var i=0;i<ids.length;i++){
			var RowObject = $("#pdmxInputList").jqGrid('getRowData', ids[i]);
			if(RowObject.dshsl != 0){
				alert("物资存在待审核数量，无法盘点！");
				return;
			}
		} */
		for (var i = 0; i < selectedArray.length; i++) {
			if(selectedArray[i].dshsl != 0){
				alert("物资存在出库待审核数量，无法盘点！");
				return;
			}
		}
		for (var i = 0; i < selectedArray.length; i++) {
			if(selectedArray[i].dshrksl != 0){
				alert("物资存在入库待审核数量，无法盘点！");
				return;
			}
		}
		
		parent.selectWzInfo(selectedArray,"pdmxInputList",cangkuId);
		parent.$.fn.colorbox.close();
	}

</script>
</head>
<body>
<div id="content">
	<form method="post" id="infoInputForm" name="infoInputForm" >
		<div id="gridDiv">
			<table id="pdmxInputList" ></table>
			<div id="pagesize"></div>
		</div>
    </form>
    <div class="submit_div">
		<input type="button" id="rk" class="btn_submit_2" value="添加" onclick="allWzIds()"/>
	</div>
	</div>
</body>
</html>