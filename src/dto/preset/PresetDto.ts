import CheckItemDto from "../checklist/CheckItemDto"

export default class PresetDto {
    id: string = "";
    name: string = "";
    items: CheckItemDto[] = [];
}
