import { RuleService } from "../Services/RuleService";
import "./Modal.css";

interface DeleteRuleProps {
  id: string;
  closeModal: (val: boolean) => void;
}

export default function DeleteRule({ id, closeModal }: DeleteRuleProps){ 

   const handleDelete = (id:string) => {
         RuleService.DeleteRule(id);
         closeModal(false);
    }

    return(
        <>
        <div className="modalBackground">
     <div className="modalContainer">
         <h1>Are you sure that you want to delete rules?</h1>
         <button className = "btn btn-success" onClick = {() => handleDelete(id)} > Yes</button>
         <button className = "btn btn-danger"  onClick = {() => closeModal(false)}> No </button>
         </div>
         </div>
        </>
    )
}