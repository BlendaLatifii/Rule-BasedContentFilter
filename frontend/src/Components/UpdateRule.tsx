import "./Modal.css";
import type { UpdateRuleDto } from "../Interfaces/UpdateRule";
import { useEffect, useState } from "react";
import { MatchTypes } from "../Interfaces/MatchTypes";
import { ActionType } from "../Interfaces/ActionType";
import { RuleService } from "../Services/RuleService";

interface UpdateRuleProps {
  id: string;
  closeModal: (val: boolean) => void;
}

export default function UpdateRule({ id, closeModal }: UpdateRuleProps){

  const [formData, setFormData] = useState<UpdateRuleDto>({
            keyword:"",
            matchType:MatchTypes.Contains,
            action:ActionType.Highlight,
            color:"",
      }as UpdateRuleDto);

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            console.log(formData);
            await RuleService.UpdateRule(id!, formData);

            closeModal(false)
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
         const {name, value} = e.target;
         setFormData({...formData,  [name]:
          name === "matchType" || name === "action"
            ? Number(value)   
            : value
        });
    }

    const matchTypeOption = Object.keys(MatchTypes)
    .map((key, i) => ({
      key: i,
      value: i,
      text: MatchTypes[+key],
    }))
    .filter((x) => x.text != "" && x.text != null);

    const actionTypeOption = Object.keys(ActionType)
    .map((key, i) => ({
      key: i,
      value: i,
      text: ActionType[+key],
    }))
    .filter((x) => x.text != "" && x.text != null);
    
    useEffect(() => {
         if (!id) return;

    const fetchRules = async () => {
      try {
        const rule = await RuleService.GetRuleDetail(id);
        setFormData({
           keyword: rule.keyword,
           matchType: rule.matchType,
           action: rule.action,
           color: rule.color
           });
      } catch (err) {
        console.error(err);
      }
    };

    fetchRules();
  }, [id]);
    return (
        <>
        <div className="modalBackground">
     <div className="modalContainer">
     <div className="container">
      <div className="mx-auto p-4 border rounded shadow-sm bg-white" style={{ maxWidth: '500px' }}>
        <form onSubmit={handleSubmit}>
          
          <div className="row mb-3 align-items-center">
            <label htmlFor="keyword" className="col-sm-4 col-form-label fw-bold text-secondary">Keyword</label>
            <div className="col-sm-8">
              <input 
                type="text" 
                className="form-control" 
                id="keyword" 
                name="keyword"
                value={formData.keyword!}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <label htmlFor="matchType" className="col-sm-4 col-form-label fw-bold text-secondary">Match Type</label>
            <div className="col-sm-8">
              <select 
                className="form-select" 
                id="matchType"
                name="matchType"
                value={formData.matchType!}
                onChange={handleChange}
              >
                {matchTypeOption.map((option)=> (
                     <option key = {option.key} value={option.value}>
                        {option.text}
                        </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <label htmlFor="action" className="col-sm-4 col-form-label fw-bold text-secondary">Action</label>
            <div className="col-sm-8">
              <select 
                className="form-select" 
                id="action"
                name="action"
                value={formData.action!}
                onChange={handleChange}
              >
                {actionTypeOption.map((option)=> (
                     <option key = {option.key} value={option.value}>
                        {option.text}
                        </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row mb-4 align-items-center">
            <label htmlFor="color" className="col-sm-4 col-form-label fw-bold text-secondary">Color</label>
            <div className="col-sm-8 d-flex align-items-center">
              <input 
                type="color" 
                className="form-control form-control-color border-0" 
                id="color" 
                name="color"
                value={formData.color!}
                onChange={handleChange}
                title="Zgjidh ngjyrën"
              />
              <span className="ms-2 text-muted small"></span>
            </div>
          </div>

          <hr className="text-muted" />

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary fw-bold py-2" style={{ backgroundColor: '#2563eb' }}>
              Save Rule
            </button>
            <button onClick= {() => closeModal(false)} className="btn btn-primary fw-bold py-2" style={{ backgroundColor: '#dd3214' }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
    </div>
    </div>
        </>
    );
}