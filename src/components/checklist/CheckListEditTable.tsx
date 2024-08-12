import CheckItemDto from "../../dto/checklist/CheckItemDto";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

interface Props {
    items: CheckItemDto[]
    onChangeItems: (items: CheckItemDto[]) => void
}

export default function CheckListEditTable(props: Props) {

    function moveCheckItem(targetIndex: number, up: boolean) {
        const toIndex = up ? targetIndex - 1 : targetIndex + 1;
        const toItem = props.items[toIndex];
        const targetItem = props.items[targetIndex];
        props.onChangeItems(props.items.map((item, index) => {
            if (index === toIndex) {
                return targetItem;
            } else if (index === targetIndex) {
                return toItem;
            } else {
                return item;
            }
        }));
        return false;
    }

    function removeCheckItem(targetIndex: number) {
        props.onChangeItems(props.items.filter((item, index) => index !== targetIndex));
        return false;
    }

    return (
        <Table striped bordered>
            <thead>
                <tr>
                    <th>項目</th>
                    <th>個数</th>
                    <th>順序</th>
                    <th>削除</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>
                                {item.quantityType === "fixed" ? `固定個数(${item.fixedQuantity})`
                                : item.quantityType === "stay" ? "宿泊個数"
                                : "要洗濯個数"}
                            </td>
                            <td>
                                <Stack direction="horizontal" gap={2}>
                                    <Button type="button" size="sm"
                                        onClick={() => moveCheckItem(index, true)} disabled={index === 0}>▲</Button>
                                    <Button type="button" size="sm"
                                        onClick={() => moveCheckItem(index, false)} disabled={index === props.items.length - 1}>▼</Button>
                                </Stack>
                            </td>
                            <td>
                                <Button type="button" variant="danger"
                                    onClick={() => removeCheckItem(index)}>削除</Button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
}