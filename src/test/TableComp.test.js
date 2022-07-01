import renderer from 'react-test-renderer';
import TableComp from "../components/TableComp";

it('different data on TableComp',async () => {
    const component = renderer.create(
        <TableComp
          dataList={[
              {
                  id: 1,
                  name: 'Harun',
                  age: 25
              },
              {
                  id: 2,
                  name: 'Veli',
                  age: 20
              }
          ]}
          columns={[
              {
                  title: 'Adı',
                  dataIndex: 'name',
                  sortable: true
              },
              {
                  title: 'Yaş',
                  dataIndex: 'age',
                  sortable: false
              }
          ]}
          bordered={true}
          striped={true}
          pageSize={4}
          hover={true}
          onClickRow={(row) => console.log(row)}
        />
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()
})