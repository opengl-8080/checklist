import { useNavigate } from "react-router-dom";
import CheckListEditTable from "../../components/checklist/CheckListEditTable";
import NewCheckItem from "../../components/checklist/NewCheckItem";
import PresetName from "../../components/preset/PresetName";
import { useEffect, useState } from "react";
import PresetDto from "../../dto/preset/PresetDto";
import CheckItemDto from "../../dto/checklist/CheckItemDto";
import PresetService from "../../service/PresetService";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function ModifyPresetPage() {
    const navigate = useNavigate();

    const [preset, setPreset] = useState(new PresetDto());
    const [newCheckItem, setNewCheckItem] = useState(new CheckItemDto());

    let initialized = false;
    useEffect(() => {
        if (initialized) {
            return;
        }

        const id = window.location.search.substring(1).split("=")[1];
        setPreset(PresetService.find(id));

        initialized = true;
    }, []);

    function onClickUpdateButton() {
        PresetService.update(preset);
        navigate("/presets");
    }

    function onClickRemoveButton() {
        if (!window.confirm("削除します。よろしいですか？")) {
            return;
        }
        PresetService.remove(preset.id);
        navigate("/presets");
    }

    return (
        <>
            <h2>プリセット編集</h2>

            <PresetName preset={preset} onChange={setPreset} />

            <NewCheckItem item={newCheckItem} onChangeItem={setNewCheckItem}
                    onAddCheckItem={(item) => setPreset({...preset, items: [...preset.items, item]})} />

            <CheckListEditTable items={preset.items} onChangeItems={items => setPreset({...preset, items: items})} />

            <Form.Group className="mb-3 d-grid gap-2">
                <Button onClick={onClickUpdateButton} variant="success"
                    disabled={!(preset.items.length !== 0)}>
                    保存
                </Button>
            </Form.Group>
            
            <Form.Group className="mb-3 d-grid gap-2">
                <Button onClick={onClickRemoveButton} variant="danger">
                プリセットを削除
                </Button>
            </Form.Group>
        </>
    );
}
