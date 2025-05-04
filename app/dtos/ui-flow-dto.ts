export class UIFlowDto {
    public id: string;
    public projectId: string;
    public name: string;
    public nodes: UIAgentNodeDto[];
    public connections: UIAgentNodeConnectionDto[];
}

export class UIAgentNodeDto {
    public id: string;
    public name: string;
    public positionX: number;
    public positionY: number;
}

export class UIAgentNodeConnectionDto {
    public id: string;
    public name: string;
    public sourceNodeId: string;
    public targetNodeId: string;
    public inputAgentNode: UIAgentNodeDto;
    public outputAgentNode: UIAgentNodeDto;
}

