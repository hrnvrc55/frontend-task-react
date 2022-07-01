import React, {useEffect, useState} from 'react'
import {Table, Pagination} from "react-bootstrap";

function TableComp({dataList, columns, bordered, striped, hover, pageSize, onClickRow}){
    const [data, setData] = useState(dataList)
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginate, setPaginate] = useState(0);
    const [paginateRender, setPaginateRender] = useState([])
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        setData(dataList);

        if(dataList && dataList.length > 0 && pageSize){
            setPaginate(Math.ceil(dataList.length / pageSize)); // dataList olması durumunda ve pageSize belirtildiğinde kaç sayfa olacağı belirlenir
        }else{
            setPaginate(0)     // haricinde paginete ve şuanki sayfa numarası resetlenir
            setCurrentPage(1)
        }
    },[dataList])

    useEffect(() => {
        if(pageSize && data){
            setFilteredData(doPaginate(currentPage)) //gelen data paginate işlemine sokulur ve sonuç filteredData hook'una gönderilir
        }else{
            setFilteredData(data)
        }
    },[pageSize, data])

    //Sayfalama işlemi yapan fonksiyon
    function doPaginate(pageNum) {
        setCurrentPage(pageNum);
        return data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    }

    // paginate oluşması durumunda sayfa numaralarını oluşturan kısım
    useEffect(() => {
        let items = [];
        for (let number = 1; number <= paginate; number++) {
            items.push(
                <Pagination.Item onClick={() => setFilteredData(doPaginate(number))} key={number} active={number === currentPage}>
                    {number}
                </Pagination.Item>,
            );
        }
        setPaginateRender(items);
    },[paginate, currentPage])

    // Table üzerindeki veriler için sıralama yapmayı sağlayan fonksion. key olarak dataIndex değeri gönderiliyor ve sıralama işlemine sokuluyor
    // direction değerine göre her sıralama işleminde tersini alıp sıralıyor(ascendig/descending)
    const onSorting = (key) => {
        if(key){
            let sortedData = [...data];
            let direction = sortDirection === 'asc' ? 'desc' : 'asc';
            sortedData.sort((a,b) => {
                if(a[key] < b[key]){
                    return direction === 'asc' ? -1 : 1
                }

                if(a[key] > b[key]){
                    return direction === 'asc' ? 1 : -1
                }
                return 0;
            })
            setData(sortedData)
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        }
    }

    //Table data listesi render edilirken verilen column props'u içindeki dataIndex değerine karşılık gelen array elemanını bularak table cell içine yazdırır
    return (
        <>
            <Table
                bordered={bordered}
                striped={striped}
                hover={hover}
                className={`table-component ${hover && 'hoverable'}`}
            >
                <thead>
                  <tr>
                      {columns && columns.map((item, idx) => (
                          <th key={`header-${idx}`}>
                              {item.title}
                              {item.sortable && (
                                  <button className="sort-button" onClick={() => onSorting(item.dataIndex)}>{sortDirection === 'asc' ? <span>&#8593;</span> : <span>&#8595;</span>}</button>
                              )}
                          </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                {filteredData && filteredData.map((item, idx) => (
                    <tr onClick={() => onClickRow(item)} key={`table-row-${idx}`}>
                        {columns && columns.map((c, idx) => {
                            if(c.dataIndex){
                                return <td key={`cell-${idx}`} width="auto">{item[c.dataIndex]}</td>
                            }else if(c.render){
                                return <td key={`cell-${idx}`}>{c.render(item)}</td>
                            }else{
                                return <td key={`cell-${idx}`}>-</td>
                            }
                        })}
                    </tr>
                ))}
                </tbody>

            </Table>

            <div className="d-flex justify-content-center">
                <Pagination>{paginateRender}</Pagination>
            </div>
        </>
    )
}

export default TableComp