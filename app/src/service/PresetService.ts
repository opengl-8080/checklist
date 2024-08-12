import PresetDto from "../dto/preset/PresetDto";

const LOCAL_STORAGE_KEY = "opengl-8080.checklist.presets";

class PresetService {
    private presets: PresetDto[]

    constructor() {
        const json = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        this.presets = window.JSON.parse(json ? json : "[]");
    }

    findAll(): PresetDto[] {
        return this.presets;
    }

    find(id: string): PresetDto {
        return this.presets.find(preset => preset.id === id)!;
    }

    register(preset: PresetDto) {
        this.presets.push(preset);
        this.flush();
    }

    update(preset: PresetDto) {
        this.presets = this.presets.map(it => it.id === preset.id ? preset : it);
        this.flush();
    }

    remove(id: string) {
        this.presets = this.presets.filter(it => it.id !== id);
        this.flush();
    }

    flush() {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, window.JSON.stringify(this.presets));
    }
}

export default new PresetService();
