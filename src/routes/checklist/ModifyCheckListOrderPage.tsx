import { useEffect, useState } from "react";
import CheckListDto from "../../dto/checklist/CheckListDto";
import CheckListService from "../../service/CheckListService";
import ModifyOrderTable from "../../components/ModifyOrderTable";

export default function ModifyCheckListOrderPage() {
    let initialized = false;
    const [checkLists, setCheckLists] = useState<CheckListDto[]>([]);

    useEffect(() => {
        if (initialized) {
            return;
        }
        setCheckLists(CheckListService.findAll());
        initialized = true;
    }, []);

    return (
        <>
            <h2>チェックリスト順序変更</h2>

            <ModifyOrderTable list={checkLists} onChangeOrder={newList => {
                setCheckLists(newList);
                CheckListService.updateAll(newList);
            }} />
        </>
    );
}
