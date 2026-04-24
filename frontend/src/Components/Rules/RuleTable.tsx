import { useEffect, useState } from "react";
import type { RuleDto } from "../../Interfaces/Rule/RuleDto";
import { RuleService } from "../../Services/RuleService";
import AddRule from "./AddRule";
import UpdateRule from "./UpdateRule";
import DeleteRule from "./DeleteRule";
import Header from "../Header";
import { ActionType } from "../../Interfaces/Rule/ActionType";
import "./RuleTable.css";

export default function RuleTable(){

   const[rules, setRules]= useState<RuleDto[]>([]);
   const[openModal, setOpenModal] = useState(false);
   const[openEditModal, setOpenEditModal] = useState(false);
   const[selectedId, setSelectedId] = useState<string | null>(null);
   const[openDeleteModal, setOpenDeleteModal] = useState(false);
   
   const fetchData = async() => {
    const result = await RuleService.GetAllRules();
    setRules(result);
   }

   useEffect(() => {
    fetchData();
  }, [openDeleteModal, openEditModal, openModal]);
  
  const handleEdit = (id : string) => {
    setSelectedId(id);
    setOpenEditModal(true);
  }

  const handleDelete = (id : string) => {
    setSelectedId(id);
    setOpenDeleteModal(true);
  }

   return(
        <>
        <Header/>
      <div className="card-body p-0">
        <div className="d-flex justify-content-between align-items-center">
            <h5 className="p-3 mb-0 fw-bold text-dark">Rule Management</h5>
            <button className="btn btn-success fw-bold" onClick ={() =>{setOpenModal(true)}}>+Add New Rule</button>
        </div>
      {openModal && <AddRule closeModal= {setOpenModal} />}
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th className="ps-4 py-3 text-secondary fw-semibold">Keyword</th>
            <th className="py-3 text-secondary fw-semibold">Match Type</th>
            <th className="py-3 text-secondary fw-semibold">Action</th>
            <th className="py-3 text-secondary fw-semibold">Color/Tag</th>
            <th className="py-3 text-secondary fw-semibold">Enable</th>
            <th className="py-3 text-secondary fw-semibold">Priority</th>
            <th className="py-3 text-secondary fw-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((item)=> (
            <tr key = {item.id} className={item.isEnable ? "" : "table-secondary"}>
                <td>{item.keyword}</td>
                <td>{item.matchType === 0 ?  "Contains" : item.matchType === 1 ? "StartsWith" : "Exact"}</td>
                <td>{item.action == 0 ? "Highlight" : "ToolTip"}</td>
                <td>{item.action === ActionType.Highlight ? 
                (<div className=" text-center color-box"
                  style = {{
                    backgroundColor: item.color ?? "#f7ed88"
                  }}
                />)  : (<span className ="label-box">
                 {item.label}
                </span>)}</td>
                <td>{item.isEnable === true ? "Enable" : "Disable"}</td>  
                <td>{item.priority === 0 ? "High" : item.priority === 1 ? "Medium" : "Low"}</td>
                <td>  
              <div className="dropdown">
             <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">⋮</button>
             <style>{`.dropdown-toggle::after {display: none !important;}`}</style>
             <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <button className="dropdown-item" onClick ={() => handleEdit(item.id)}>
                Edit
               </button>
              <button className="dropdown-item " onClick ={() => handleDelete(item.id)}>
                Delete
              </button>
            </div>
            </div>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openEditModal && selectedId && (
       <UpdateRule id={selectedId} closeModal={setOpenEditModal} />)}
      {openDeleteModal && selectedId && (
       <DeleteRule id={selectedId} closeModal={setOpenDeleteModal} />)}
    </div>
        </>
    );
}