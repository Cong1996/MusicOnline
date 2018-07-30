        let oDate = new Date(),
            year =  oDate.getFullYear(),
            month =  oDate.getMonth(), 
            date =  oDate.getDate(),
            firstDay = (new Date(year, month, 1)).getDay(),
            monthDaysArr = [31, 28+isLeapYear(), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            rows =  Math.ceil((monthDaysArr[month] + firstDay) / 7),
            calendar=document.getElementById('calendar'); 

        // 判断是否是闰年(29) 平年(28)
        function isLeapYear() {
            if(((year % 4)==0) && ((year % 100)!=0) || ((year % 400)==0)) {
                return 1;
            } else {
                return 0;
            }
        }

        // 打印表头
        let str=`<table>
                                <caption>${year+'&nbsp;年'}&nbsp; ${(month+1)+'&nbsp;月'}</caption>
                                <tr>
                                <td>日</td>
                                <td>一</td>
                                <td>二</td>
                                <td>三</td>
                                <td>四</td>
                                <td>五</td>
                                <td>六</td>
                                </tr>
                                `;

        for(var i=0; i<rows; i++) { //表格的行
           str.innerHTML+="<tr>";
            // 表格每行的单元格填充
            for(var j=0; j<7; j++) {

                // 单元格自然序列号
                tdIndex = i*7+j;  

                // 计算日期
                fillDate = tdIndex-firstDay+1; 

                // 过滤无效日期（小于等于零的、大于月总天数的）
                if(fillDate<=0 || fillDate>monthDaysArr[month]) {
                   fillDate="&nbsp;"; 
                } else {
                    fillDate = tdIndex-firstDay+1; 
                }

                // 打印日期，并把今天底色设为红色
                if(fillDate == date) {
                    str+="<td class='active'>" + fillDate + "</td>";
                } else {
                    str+="<td>" + fillDate + "</td>";
                }
            }

            str+="</tr>"; //表格的行结束
        }

        str+="</table>"; // 表格结束
        calendar.innerHTML=str;