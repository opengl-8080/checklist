import { useEffect, useState } from "react";
import ModifyOrderTable from "../../components/ModifyOrderTable";
import PresetService from "../../service/PresetService";
import PresetDto from "../../dto/preset/PresetDto";

export default function ModifyPresetOrderPage() {
    const [presets, setPresets] = useState<PresetDto[]>([]);

    let initialized = false;
    useEffect(() => {
        if (initialized) {
            return;
        }

        setPresets(PresetService.findAll());

        initialized = true;
    }, []);

    return (
        <>
            <h2>プリセット順序変更</h2>

            <ModifyOrderTable list={presets} onChangeOrder={newList => {
                setPresets(newList);
                PresetService.updateAll(newList);
            }} />
        </>
    );
}