import React, {useEffect, useState} from 'react'
import TableComp from "../components/TableComp";
import axios from 'axios';
import moment from 'moment';
import SearchInput from "../components/SearchInput";

const columns = [
    {
        title: 'Etkinlik Adı',
        dataIndex: 'name',
        sortable: true
    },
    {
        title: 'Durum',
        render: (record) => (
            <span>
              {record.dates.status.code}
            </span>
        )
    },
    {
        title: 'Tarih',
        render: (record) => (
            <span>
                {moment(record.sales?.public?.startDateTime).format('DD.MM.YYYY')}
                <span> - </span>
                {moment(record.sales?.public?.endDateTime).format('DD.MM.YYYY')}
            </span>
        )
    },

]
function HomePage() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);

    const search = (query) => {
        if(query){
            setLoading(true);
            axios.get(`/discovery/v2/events.json?keyword=${query}`)
                .then(resp => {
                    if(resp.data._embedded?.events){
                        setData(resp.data._embedded?.events);
                    }
                }).catch(err => {
            }).finally(() => setLoading(false));
        }else{
            setData([])
        }

    }

    const onClickRow = (row) => {
        window.open(`event-detail/${row.id}`, '_blank')
    }

    return (
        <div className="App">
            <img src="https://tarfin.com/img/logo.svg" alt="Tarfin Logo" width={200} />
            <p className="my-1">Front End Task</p>
            <div className="search-box">
                <SearchInput onSearch={search} loading={loading} />
            </div>
            <div className="container">
                <TableComp
                    bordered={true}
                    hover={true}
                    dataList={data}
                    columns={columns}
                    pageSize={4}
                    onClickRow={onClickRow}
                />
            </div>
        </div>
    )
}

export default HomePage
