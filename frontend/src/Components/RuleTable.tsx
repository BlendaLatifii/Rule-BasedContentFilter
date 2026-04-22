import { useEffect, useState } from "react";
import type { RuleDto } from "../Interfaces/RuleDto";
import { RuleService } from "../Services/RuleService";
import AddRule from "./AddRule";
import UpdateRule from "./UpdateRule";
import DeleteRule from "./DeleteRule";

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
  }, [openModal, openEditModal, openDeleteModal]);
  
  const handleEdit = (id: string) => {
    setSelectedId(id);
    setOpenEditModal(true);
  };

   const handleDelete = (id: string) => {
    setSelectedId(id);
    setOpenDeleteModal(true);
  };
   return(
        <>
      <div className="card-body p-0">
        <div className="d-flex justify-content-between align-items-center">
            <h5 className="p-3 mb-0 fw-bold text-dark">Rule Management</h5>
            <button className="btn btn-success fw-bold" style={{ backgroundColor: '#0a8314' }} onClick ={() =>{setOpenModal(true)}}>+Add New Rule</button>
        </div>
      {openModal && <AddRule closeModal= {setOpenModal}/>}
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th className="ps-4 py-3 text-secondary fw-semibold">Keyword</th>
            <th className="py-3 text-secondary fw-semibold">Match Type</th>
            <th className="py-3 text-secondary fw-semibold">Action</th>
            <th className="py-3 text-secondary fw-semibold">Color/Tag</th>
            <th className="py-3 text-secondary fw-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((item)=> (
            <tr key = {item.id}>
                <td>{item.keyword}</td>
                <td>{item.matchType === 0 ?  "Contains" : item.matchType === 1 ? "StartsWith" : "Exact"}</td>
                <td>{item.action == 0 ? "Highlight" : "ToolTip"}</td>
                <td>{item.color}</td>
                <td>
                    <div className="d-flex ">
                       <button 
                        className="btn btn-primary fw-bold" 
                        onClick={() => handleEdit(item.id)}
                        >
                           Edit
                        </button>
                        <button
                        className="btn btn-danger fw-bold" 
                        onClick={() => handleDelete(item.id)}
                        >
                            Delete
                        </button>
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