export class UIFlowDto {
    public id: string;
    public userId: string;
    public projectId: string;
    public name: string;
    public nodes: UIAgentNodeDto[];
    public connections: UIAgentNodeConnectionDto[];
}

export class UIAgentNodeDto {
    public id: string;
    public name: string;
    public type: string;
    public positionX: number;
    public positionY: number;
    public parameters: any;
    public output: string;
}

export class UIAgentNodeConnectionDto {
    public id: string;
    public name: string;
    public sourceNodeId: string;
    public targetNodeId: string;
    public inputAgentNode: UIAgentNodeDto;
    public outputAgentNode: UIAgentNodeDto;
}

