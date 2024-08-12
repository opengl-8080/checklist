import { Form } from "react-bootstrap";
import PresetDto from "../../dto/preset/PresetDto";

interface Props {
    preset: PresetDto,
    onChange: (preset: PresetDto) => void,
}

export default function PresetName(props: Props) {
    return (
        <Form.Group className="mb-3">
            <Form.Label>名前</Form.Label>
            <Form.Control type="text" placeholder="名前" min={0}
                value={props.preset.name}
                onChange={e => props.onChange({...props.preset, name: e.target.value})} />
        </Form.Group>
    );
}
