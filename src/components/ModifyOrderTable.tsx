import { Button, Stack, Table } from "react-bootstrap";

interface ListItem {
    name: string,
}

interface Props<T extends ListItem> {
    list: T[],
    onChangeOrder: (list: T[]) => void,
}

export default function ModifyOrderTable<T extends ListItem>(props: Props<T>) {

    function moveCheckItem(targetIndex: number, up: boolean) {
        const toIndex = up ? targetIndex - 1 : targetIndex + 1;
        const toItem = props.list[toIndex];
        const targetItem = props.list[targetIndex];
        const newCheckList = props.list.map((item, index) => {
            if (index === toIndex) {
                return targetItem;
            } else if (index === targetIndex) {
                return toItem;
            } else {
                return item;
            }
        });
        props.onChangeOrder(newCheckList);
    }

    return (
        <Table striped bordered>
            <thead>
                <tr>
                    <th style={{width: "70%"}}>名前</th>
                    <th>順序</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.list.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>
                                <Stack direction="horizontal" gap={2}>
                                    <Button type="button" size="sm"
                                        onClick={() => moveCheckItem(index, true)} disabled={index === 0}>▲</Button>
                                    <Button type="button" size="sm"
                                        onClick={() => moveCheckItem(index, false)} disabled={index === props.list.length - 1}>▼</Button>
                                </Stack>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
}