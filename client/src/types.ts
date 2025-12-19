export interface Control {
    id: string;
    type: string;
    code: string;
    name: string;
    description: string;
    measures: string;
    lastAudited: string;
    status: string;

    framework?: string
}

export interface Risk {
    id: string
    description: string
    category: string
    score: string
    owner: string
    status: string
}