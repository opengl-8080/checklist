import { useEffect, useState } from "react";
import CheckItemDto from "../../dto/checklist/CheckItemDto";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";

interface Props {
    item: CheckItemDto,
    onChangeItem: (item: CheckItemDto) => void,

    onAddCheckItem: (item: CheckItemDto) => void,
}

export default function NewCheckItem(props: Props) {

    const [addButtonEnable, setAddButtonEnable] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        setName(props.item.name);
    }, [props.item.name]);

    useEffect(() => {
        setAddButtonEnable(
            props.item.name !== "" &&
            (
                props.item.quantityType !== "fixed"
                || Number(props.item.fixedQuantity) > 0
            )
        );
    }, [props.item.name, props.item.quantityType, props.item.fixedQuantity]);

    function onClickAddButton() {
        setName("");
        props.onAddCheckItem({...props.item});
    }

    return (
        <Form.Group className="mb-3">
            <h3>
                新規項目
            </h3>
            <Form.Group className="mb-3">
                <Form.Label>項目名</Form.Label>
                <Form.Control type="text" placeholder="項目名" min={0}
                    value={name}
                    onChange={e => {
                        setName(e.target.value);
                        props.onChangeItem({...props.item, name: e.target.value});
                    }} />
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>個数</Form.Label>

                <Form.Select aria-label="個数種別"
                     value={props.item.quantityType}
                     onChange={e => props.onChangeItem({...props.item, quantityType: e.target.value})}>
                    <option value="fixed">固定個数</option>
                    <option value="washing">要洗濯個数</option>
                    <option value="stay">宿泊個数</option>
                </Form.Select>

                {
                    props.item.quantityType === "fixed" ? (
                        <Form.Control type="number" placeholder="固定個数" min={1}
                            value={props.item.fixedQuantity}
                            onChange={e => props.onChangeItem({...props.item, fixedQuantity: Number(e.target.value)})} />
                    ) : (<></>)
                }
            </Form.Group>

            <div className="d-grid gap-2">
                <Button disabled={!addButtonEnable} onClick={onClickAddButton}>項目を追加</Button>
            </div>
        </Form.Group>
    );
}
