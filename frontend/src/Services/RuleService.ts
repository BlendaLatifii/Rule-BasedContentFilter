import axios from "axios";
import type { AddRuleDto } from "../Interfaces/AddRule";
import type { RuleDto } from "../Interfaces/RuleDto";
import type { UpdateRuleDto } from "../Interfaces/UpdateRule";

export class RuleService {
    private static baseUrl = "https://localhost:44375/api/Rule";
    
    public static async AddRule(model: AddRuleDto): Promise<void> {
      await axios.post(`${RuleService.baseUrl}`, model);
    } 

    public static async GetAllRules(): Promise<RuleDto[]> {
      const result = await axios.get(RuleService.baseUrl);
      return result.data;
    }

    public static async GetRuleDetail(id: string): Promise<RuleDto> {
      const result = await axios.get(`${RuleService.baseUrl}/${id}`);
      return result.data;
    }

    public static async UpdateRule(id: string, model: UpdateRuleDto): Promise<void> {
       await axios.put(`${RuleService.baseUrl}/${id}`, model);
    }

    public static async DeleteRule(id: string): Promise<void> {
       await axios.delete(`${RuleService.baseUrl}/${id}`);
    }
}