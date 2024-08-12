import { useEffect, useState } from "react";
import PresetDto from "../../dto/preset/PresetDto";
import PresetService from "../../service/PresetService";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

export default function PresetsPage() {
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
            <h2>プリセット一覧</h2>

            <ListGroup>
                {presets.map((preset, index) => (
                    <ListGroup.Item key={index} action href={`/preset/modify?id=${preset.id}`}>
                        {preset.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
}