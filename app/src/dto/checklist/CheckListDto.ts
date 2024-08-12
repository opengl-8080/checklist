import CheckItemDto from "./CheckItemDto";

export default class CheckListDto {
    id: string = ""
    name: string = ""
    stayCount: number = 1
    washableCount: number = 0
    items: CheckItemDto[] = []
}