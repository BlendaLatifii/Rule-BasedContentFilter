import { useState } from "react";
import { ActionType } from "../../Interfaces/Rule/ActionType";
import { MatchTypes } from "../../Interfaces/Rule/MatchTypes";
import type { AddRuleDto } from "../../Interfaces/Rule/AddRule";
import { RuleService } from "../../Services/RuleService";
import "../Modal.css";
import { RulePriority } from "../../Interfaces/Rule/RulePriority";

export default function AddRule({ closeModal }: any) {
  const [formData, setFormData] = useState<AddRuleDto>({
    keyword: "",
    matchType: MatchTypes.Contains,
    action: ActionType.Highlight,
    color: "#f7ed88",
    label: "",
    isEnable: false,
    priority: RulePriority.High,
  } as AddRuleDto);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    await RuleService.AddRule(formData);
    closeModal(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
      
    const val = name === "matchType" || name === "action" || name === "priority"
      ? Number(value)
      : name === "isEnable"
      ? (e.target as HTMLInputElement).checked
      : value;

    setFormData(prev => {
    const updated = { ...prev, [name]: val };

    if (name === "action") {
      const isHighlight = Number(value) === ActionType.Highlight;

      return {
        ...updated,
        color: isHighlight ? prev.color || "#f7ed88" : "",
        label: isHighlight ? "" : prev.label
      };
    }

    return updated;
  });
 };

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

  const rulePriority = Object.keys(RulePriority)
    .map((key, i) => ({
      key: i,
      value: i,
      text: RulePriority[+key],
    }))
    .filter((x) => x.text != "" && x.text != null);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="d-flex justify-content-between">
            <h4 className=" mx-auto">Add Rule</h4>
            <button
              className="btn btn-light mb-2"
              onClick={() => {
                closeModal(false);
              }}
            >
              X
            </button>
          </div>
          <div className="container">
            <div
              className="mx-auto p-4 border rounded shadow-sm bg-white"
              style={{ maxWidth: "500px" }}
            >
              <form onSubmit={handleSubmit}>
                <div className="row mb-3 align-items-center">
                  <label
                    htmlFor="keyword"
                    className="col-sm-4 col-form-label fw-bold text-secondary"
                  >
                    Keyword
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      id="keyword"
                      name="keyword"
                      value={formData.keyword}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mb-3 align-items-center">
                  <label
                    htmlFor="matchType"
                    className="col-sm-4 col-form-label fw-bold text-secondary"
                  >
                    Match Type
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="form-select"
                      id="matchType"
                      name="matchType"
                      value={formData.matchType}
                      onChange={handleChange}
                    >
                      {matchTypeOption.map((option) => (
                        <option key={option.key} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row mb-3 align-items-center">
                  <label
                    htmlFor="action"
                    className="col-sm-4 col-form-label fw-bold text-secondary"
                  >
                    Action
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="form-select"
                      id="action"
                      name="action"
                      value={formData.action}
                      onChange={handleChange}
                    >
                      {actionTypeOption.map((option) => (
                        <option key={option.key} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row mb-4 align-items-center">
                  <label
                    htmlFor="color"
                    className="col-sm-4 col-form-label fw-bold text-secondary"
                  >
                    {formData.action === ActionType.Highlight ? "Color" : "Tag"}
                  </label>
                  {formData.action === ActionType.Highlight ? (
                    <div className="col-sm-8 d-flex align-items-center">
                      <input
                        type="color"
                        className="form-control form-control-color border-0"
                        id="color"
                        name="color"
                        value={formData.color!}
                        onChange={handleChange}
                      />
                      <span className="ms-2 text-muted small"></span>
                    </div>
                  ) : (
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control form-control-color border-1 w-100"
                        id="label"
                        name="label"
                        value={formData.label!}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>

                <div className="row mb-3 d-flex align-items-center">
                  <label
                    htmlFor="isEnable"
                    className="col-sm-4 col-form-label fw-bold text-secondary"
                  >
                    {formData.isEnable ? "Enable" : "Disable"}
                  </label>
                  <div className=" form-check form-switch col-sm-8 ps-5">
                    <input
                      className="form-check-input "
                      type="checkbox"
                      name="isEnable"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      checked={formData.isEnable}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mb-3 align-items-center">
                  <label
                    htmlFor="priority"
                    className="col-sm-4 col-form-label fw-bold text-secondary"
                  >
                    Priority
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="form-select"
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                    >
                      {rulePriority.map((option) => (
                        <option key={option.key} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <hr className="text-muted" />

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary fw-bold py-2"
                  >
                    Save Rule
                  </button>
                  <button
                    onClick={() => closeModal(false)}
                    className="btn btn-danger fw-bold py-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
