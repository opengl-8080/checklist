import { Link } from "react-router-dom";
import CheckListService from "../../service/CheckListService";
import { useEffect, useState } from "react";
import CheckListDto from "../../dto/checklist/CheckListDto";
import ListGroup from 'react-bootstrap/ListGroup';

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

            <ListGroup>
                {checkLists.map((checkList, index) => (
                    <ListGroup.Item key={index} action as={Link} to={`/checklist?id=${checkList.id}`}>
                        {checkList.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
}

export default CheckListList;
