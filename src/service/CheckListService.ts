import CheckListDto from "../dto/checklist/CheckListDto";

const LOCAL_STORAGE_KEY = "opengl-8080.checklist.checklists";

class CheckListService {
    private checkLists: CheckListDto[];

    constructor() {
        const json = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        this.checkLists = window.JSON.parse(json ? json : "[]");
    }

    findAll(): CheckListDto[] {
        return this.checkLists;
    }

    find(id: string): CheckListDto {
        return this.checkLists.find(checkList => checkList.id === id)!;
    }

    update(checkList: CheckListDto) {
        this.checkLists = this.checkLists.map(it => it.id === checkList.id ? checkList : it);
        this.flush();
    }

    updateAll(checkLists: CheckListDto[]) {
        this.checkLists = checkLists;
        this.flush();
    }

    register(checkList: CheckListDto) {
        this.checkLists.push(checkList);
        this.flush();
    }

    remove(id: string) {
        this.checkLists = this.checkLists.filter(checkList => checkList.id !== id);
        this.flush();
    }

    private flush() {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, window.JSON.stringify(this.checkLists));
    }
}

export default new CheckListService();
