import { useNavigate } from "react-router-dom";
import CheckListName from "../../components/checklist/CheckListName";
import { useEffect, useState } from "react";
import CheckListService from "../../service/CheckListService";
import CheckListDto from "../../dto/checklist/CheckListDto";
import CheckItemDto from "../../dto/checklist/CheckItemDto";
import NewCheckItem from "../../components/checklist/NewCheckItem";
import CheckListEditTable from "../../components/checklist/CheckListEditTable";
import PresetAppender from "../../components/preset/PresetAppender";
import PresetDto from "../../dto/preset/PresetDto";
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function ModifyCheckListPage() {
    const navigate = useNavigate();
    
    const [checkList, setCheckList] = useState(new CheckListDto());
    const [newCheckItem, setNewCheckItem] = useState(new CheckItemDto());

    let initialized = false;
    useEffect(() => {
        if (initialized) {
            return;
        }

        let id = window.location.search.substring(1).split("=")[1];
        let checkList = CheckListService.find(id);
        setCheckList(checkList);

        initialized = true;
    }, []);

    function save() {
        CheckListService.update(checkList);
        navigate(`/checklist?id=${checkList.id}`);
    }

    function remove() {
        if (!window.confirm("削除します。よろしいですか？")) {
            return;
        }

        CheckListService.remove(checkList.id);
        navigate("/");
    }

    function onAppendPreset(preset: PresetDto) {
        setCheckList({
            ...checkList,
            items: [...checkList.items, ...preset.items]
        });
    }

    return (
        <Stack gap={3}>
            <h1>チェックリスト編集</h1>

            <Form>
                <CheckListName checkList={checkList} onChange={setCheckList} />

                <NewCheckItem item={newCheckItem} onChangeItem={setNewCheckItem}
                            onAddCheckItem={item => setCheckList({...checkList, items: [...checkList.items, item]})} />

                <PresetAppender onAppendPreset={onAppendPreset} />

                <CheckListEditTable items={checkList.items}
                    onChangeItems={items => setCheckList({...checkList, items: items})} />

                <Form.Group className="mb-3 d-grid gap-2">
                    <Button onClick={save} variant="success">保存</Button>
                </Form.Group>

                <Form.Group className="mb-3 d-grid gap-2">
                    <Button onClick={remove} variant="danger">チェックリストを削除</Button>
                </Form.Group>
            </Form>
        </Stack>
    );
}

export default ModifyCheckListPage;
