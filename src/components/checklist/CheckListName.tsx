import CheckListDto from "../../dto/checklist/CheckListDto";
import Form from 'react-bootstrap/Form';

interface Props {
    checkList: CheckListDto,
    onChange: (checkList: CheckListDto) => void,
}

function CheckListName(props: Props) {
    return (
        <Form.Group className="mb-3" controlId="checkListName">
            <Form.Label>名前</Form.Label>
            <Form.Control type="text" placeholder="名前" min={0}
                value={props.checkList.name}
                onChange={e => props.onChange({...props.checkList, name: e.target.value})} />
        </Form.Group>
    );
}

export default CheckListName;
