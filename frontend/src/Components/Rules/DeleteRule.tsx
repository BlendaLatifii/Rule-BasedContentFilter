import { RuleService } from "../../Services/RuleService";
import "../Modal.css";

interface DeleteRuleProps {
  id: string;
  closeModal: (val: boolean) => void;
}

export default function DeleteRule({ id, closeModal }: DeleteRuleProps){ 
    const handleDelete = async (id:string) => {
       await RuleService.DeleteRule(id);
        closeModal(false);
    }

    return(
        <>
        <div className="modalBackground">
          <div className="modalContainer">
           <div className="d-flex justify-content-end">
            <button className = "btn btn-light mb-1" onClick={() => {closeModal(false)}}>X</button>
           </div>    
          <h3>Are you sure that you want to delete rules?</h3>
           <div className="d-flex justify-content-center gap-3 mt-4">
            <button className = "btn btn-success" onClick = {() => {handleDelete(id)}}>Yes</button>
            <button className = "btn btn-danger"  onClick = {() => closeModal(false)}>No</button>
          </div>
         </div>
        </div>
        </>
    )
}