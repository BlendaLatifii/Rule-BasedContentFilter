import axios from "axios";
import type { AddRuleDto } from "../Interfaces/Rule/AddRule";
import type { RuleDto } from "../Interfaces/Rule/RuleDto";
import type { UpdateRuleDto } from "../Interfaces/Rule/UpdateRule";
import type { MatchedTextDto } from "../Interfaces/TextProcesing/MatchedTextDto";
import type { TextDto } from "../Interfaces/TextProcesing/TextDto";

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

    public static async ProcessText(textDto: TextDto): Promise<MatchedTextDto[]> {
      const result = await axios.post(`${RuleService.baseUrl}/ProcessText`,textDto);
      return result.data;
    }
}