import { UIAgentNodeConnectionDto, UIAgentNodeDto } from "./ui-flow-dto";

export class FlowTemplateDto {
    public id: string;
    public name: string;
    public description: string;
    public category: string;
    public dataConverted: any;
    // public nodes: UIAgentNodeDto[];
    // public connections: UIAgentNodeConnectionDto[];
}