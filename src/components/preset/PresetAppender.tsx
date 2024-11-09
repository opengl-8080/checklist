import { useEffect, useState } from "react";
import PresetDto from "../../dto/preset/PresetDto";
import PresetService from "../../service/PresetService";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';

interface Props {
    onAppendPreset: (preset: PresetDto) => void
}

export default function PresetAppender(props: Props) {
    const [presets, setPresets] = useState<PresetDto[]>([]);
    const [presetId, setPresetId] = useState("");

    let initialized = false;
    useEffect(() => {
        if (initialized) {
            return;
        }

        const presets = PresetService.findAll();
        if (presets && 0 < presets.length) {
            setPresets(presets);
            setPresetId(presets[0].id);
        }

        initialized = true;
    }, []);

    function onClickAddPreset() {
        const preset = PresetService.find(presetId);
        props.onAppendPreset(preset);
    }

    return (
        <Form.Group className="mb-3">
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>プリセット</Accordion.Header>
                    <Accordion.Body>
                        <Form.Group className="mb-3">
                            <Form.Select value={presetId} onChange={e => setPresetId(e.target.value)}>
                                {
                                    presets.map((preset, index) => (
                                        <option key={index} value={preset.id} selected={index === 0}>{preset.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button onClick={onClickAddPreset} disabled={!presetId}>プリセットから追加</Button>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Form.Group>
    );
}
