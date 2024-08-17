import CheckListService from "../../service/CheckListService";
import { useEffect, useState } from "react";
import CheckListDto from "../../dto/checklist/CheckListDto";
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Stack from 'react-bootstrap/Stack';
import "./CheckListPage.css";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


function CheckListPage() {
    const [checkList, setCheckList] = useState<CheckListDto>(new CheckListDto());
    const [showCheckedItem, setShowCheckedItem] = useState(false);

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

    useEffect(() => {
        CheckListService.update(checkList);
    }, [checkList]);

    function isCompleted() {
        return checkList.items.find(item => !item.checked);
    }

    return (
        <Stack gap={3} className={isCompleted() ? "incompleted" : "completed"}>
            <h1>チェックリスト</h1>
            <h2>{checkList.name}</h2>

            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>個数パラメータ</Accordion.Header>
                    <Accordion.Body>
                        <Form>
                        {
                            checkList.items.find(item => item.quantityType !== "fixed") ? (
                                <>
                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Label>宿泊日数</Form.Label>
                                        <Form.Control type="number" placeholder="宿泊日数" min={0}
                                            value={checkList.stayCount}
                                            onChange={e => setCheckList({
                                                ...checkList,
                                                stayCount: Number(e.target.value),
                                                items: checkList.items.map(item => {
                                                    if (item.quantityType === "fixed") {
                                                        return item;
                                                    } else if (item.quantityType === "stay") {
                                                        return {...item, fixedQuantity: Number(e.target.value)};
                                                    } else {
                                                        return {...item, fixedQuantity: Number(e.target.value) - checkList.washableCount};
                                                    }
                                                })
                                            })} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Label>洗濯可能日数</Form.Label>
                                        <Form.Control type="number" placeholder="洗濯可能日数" min={0} 
                                            value={checkList.washableCount}
                                            onChange={e => setCheckList({
                                                ...checkList,
                                                washableCount: Number(e.target.value),
                                                items: checkList.items.map(item => {
                                                    if (item.quantityType === "washing") {
                                                        return {...item, fixedQuantity: checkList.stayCount - Number(e.target.value)};
                                                    } else {
                                                        return item;
                                                    }
                                                })
                                            })} />
                                    </Form.Group>
                                </>
                            ):(<></>)
                        }
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Form.Group className="d-grid gap-2">
                <ToggleButton
                    id="showCheckItem1"
                    value="showCheckItem1"
                    variant="outline-success"
                    checked={showCheckedItem}
                    type="checkbox"
                    onChange={e => setShowCheckedItem(e.target.checked)}
                    >
                    {showCheckedItem ? "チェック済みを表示" : "チェック済みを非表示"}
                </ToggleButton>
            </Form.Group>

            <Table striped bordered>
                <thead>
                    <tr>
                        <th style={{width: "60%"}}>項目</th>
                        <th style={{width: "15%"}}>個数</th>
                        <th style={{width: "25%"}}>チェック</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        checkList.items.map((item, index) => (
                            showCheckedItem || !item.checked ?
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.fixedQuantity}</td>
                                <td>
                                    <ToggleButton
                                          id={String(index)}
                                          type="checkbox"
                                          checked={item.checked}
                                          value="1"
                                          variant="outline-success"
                                          onChange={e => setCheckList({
                                            ...checkList,
                                            items: checkList.items.map((it, idx) => idx === index ? {...it, checked: e.target.checked} : it)
                                        })}
                                        >
                                          {item.checked ? "確認済" : "未確認"}
                                        </ToggleButton>
                                </td>
                            </tr>
                            : <></>
                        ))
                    }
                </tbody>
            </Table>

            <Form.Group className="d-grid gap-2">
                <ToggleButton
                    id="showCheckItem2"
                    value="showCheckItem2"
                    variant="outline-success"
                    checked={showCheckedItem}
                    type="checkbox"
                    >
                    {showCheckedItem ? "チェック済みを非表示" : "チェック済みを表示"}
                </ToggleButton>
            </Form.Group>

            <Form.Group className="d-grid gap-2">
                <Button onClick={() => setCheckList({
                    ...checkList,
                    items: checkList.items.map(item => ({...item, checked: false}))
                })} variant="secondary">リセット</Button>
            </Form.Group>

            <Link to={`/checklist/modify?id=${checkList.id}`}>
                <Form.Group className="mb-3 d-grid gap-2">
                    <Button>編集</Button>
                </Form.Group>
            </Link>
        </Stack>
    );
}

export default CheckListPage;
