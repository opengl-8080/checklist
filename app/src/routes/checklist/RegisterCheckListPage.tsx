import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckListService from "../../service/CheckListService";
import CheckListName from "../../components/checklist/CheckListName";
import NewCheckItem from "../../components/checklist/NewCheckItem";
import CheckListEditTable from "../../components/checklist/CheckListEditTable";
import CheckListDto from "../../dto/checklist/CheckListDto";
import CheckItemDto from "../../dto/checklist/CheckItemDto";
import PresetDto from "../../dto/preset/PresetDto";
import PresetAppender from "../../components/preset/PresetAppender";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

function RegisterCheckList() {
    const navigate = useNavigate();
    
    const [checkList, setCheckList] = useState(new CheckListDto());
    const [newCheckItem, setNewCheckItem] = useState(new CheckItemDto());

    function register() {
        checkList.id = window.crypto.randomUUID();
        CheckListService.register(checkList);
        navigate("/");
    }

    function onAppendPreset(preset: PresetDto) {
        setCheckList({
            ...checkList,
            items: [...checkList.items, ...preset.items]
        });
    }

    return (
        <>
            <h1>チェックリスト登録</h1>

            <CheckListName checkList={checkList} onChange={setCheckList} />

            <NewCheckItem item={newCheckItem} onChangeItem={setNewCheckItem}
                    onAddCheckItem={(item) => setCheckList({...checkList, items: [...checkList.items, item]})} />

            <PresetAppender onAppendPreset={onAppendPreset} />

            <CheckListEditTable items={checkList.items}
                onChangeItems={items => setCheckList({...checkList, items: items})} />

            <Form.Group className="mb-3 d-grid gap-2">
                <Button onClick={register} variant="success"
                     disabled={!(checkList.name && 0 < checkList.items.length)}>
                    登録
                </Button>
            </Form.Group>
        </>
    );
}

export default RegisterCheckList;
