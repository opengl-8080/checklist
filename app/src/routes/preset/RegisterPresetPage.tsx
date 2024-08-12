import { useState } from "react";
import NewCheckItem from "../../components/checklist/NewCheckItem";
import CheckItemDto from "../../dto/checklist/CheckItemDto";
import PresetDto from "../../dto/preset/PresetDto";
import CheckListEditTable from "../../components/checklist/CheckListEditTable";
import PresetService from "../../service/PresetService";
import { useNavigate } from "react-router-dom";
import PresetName from "../../components/preset/PresetName";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function RegisterPresetPage() {
    const navigate = useNavigate();

    const [preset, setPreset] = useState(new PresetDto());
    const [newCheckItem, setNewCheckItem] = useState(new CheckItemDto());

    function onClickRegisterButton() {
        preset.id = window.crypto.randomUUID();
        PresetService.register(preset);
        navigate("/presets");
    }

    return (
        <>
            <h2>プリセット登録</h2>

            <PresetName preset={preset} onChange={setPreset} />

            <NewCheckItem item={newCheckItem} onChangeItem={setNewCheckItem}
                    onAddCheckItem={(item) => setPreset({...preset, items: [...preset.items, item]})} />

            <CheckListEditTable items={preset.items} onChangeItems={items => setPreset({...preset, items: items})} />

            <Form.Group className="mb-3 d-grid gap-2">
                <Button onClick={onClickRegisterButton} variant="success"
                    disabled={!(preset.name && preset.items.length !== 0)}>
                    登録
                </Button>
            </Form.Group>
        </>
    );
}