import { Link } from "react-router-dom";
import CheckListService from "../../service/CheckListService";
import { useEffect, useState } from "react";
import CheckListDto from "../../dto/checklist/CheckListDto";
import ListGroup from 'react-bootstrap/ListGroup';
import { Form, Stack } from "react-bootstrap";
import { Button } from "react-bootstrap";

function CheckListList() {
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
            <h1>チェックリスト一覧</h1>

            <Stack gap={3}>
                <ListGroup>
                    {checkLists.map((checkList, index) => (
                        <ListGroup.Item key={index} action as={Link} to={`/checklist?id=${checkList.id}`}>
                            {checkList.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <Link to={`/checklist/modify/order`}>
                    <Form.Group className="mb-3 d-grid gap-2">
                        <Button>並び順変更</Button>
                    </Form.Group>
                </Link>
            </Stack>
        </>
    );
}

export default CheckListList;
