import { useEffect, useState } from "react";
import PresetDto from "../../dto/preset/PresetDto";
import PresetService from "../../service/PresetService";
import { Link } from "react-router-dom";
import { Form, ListGroup, Stack } from "react-bootstrap";
import { Button } from "react-bootstrap";

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

            <Stack gap={3}>
                <ListGroup>
                    {presets.map((preset, index) => (
                        <ListGroup.Item key={index} action as={Link} to={`/preset/modify?id=${preset.id}`}>
                            {preset.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <Link to={`/preset/modify/order`}>
                    <Form.Group className="mb-3 d-grid gap-2">
                        <Button>並び順変更</Button>
                    </Form.Group>
                </Link>
            </Stack>
        </>
    );
}