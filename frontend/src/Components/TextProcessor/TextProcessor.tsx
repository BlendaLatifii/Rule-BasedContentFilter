import { useState } from "react";
import Header from "../Header";
import type { MatchedTextDto } from "../../Interfaces/TextProcesing/MatchedTextDto";
import { RuleService } from "../../Services/RuleService";
import type { TextDto } from "../../Interfaces/TextProcesing/TextDto";
import { ActionType } from "../../Interfaces/Rule/ActionType";
import "./TextProcessor.css";

export default function TextProcessor() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [matches, setMatches] = useState<MatchedTextDto[]>([]);

  const handleProcess = async () => {
    setLoading(true);
    setHasProcessed(false);
    const result = await RuleService.ProcessText({ text: text } as TextDto);
    setMatches(result);
    setLoading(false);
    setHasProcessed(true);
  };

  const renderHighlightedText = () => {
    if (!matches.length) return text;

    const words = text.split(" ");

    const matchMap = new Map(matches.map((m) => [Number(m.wordIndex), m]));

    return words.map((word, i) => {
      const match = matchMap.get(i);

      if (!match) {
        return <span key={i}>{word} </span>;
      }

      return (
        <span
          key={i}
          className={
            match.action === ActionType.Highlight ? "highlighted-text" : undefined}
          style={
            match.action === ActionType.Highlight ? { backgroundColor: match.color ?? "transparent" } : undefined }
          >
          {word}
          {match.action == ActionType.ToolTip && <span> [{match.label}] </span>}
        </span>
      );
    });
  };

  return (
    <>
      <Header />
      <div>
        <h4 className="d-flex justify-content-start mt-4 mb-4 px-3">
          Text Processing
        </h4>
        <hr />

        <div className="d-flex flex-column col">
          <div className="input-group px-3 mb-3">
            <textarea
              className="form-control"
              aria-label="With textarea"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setHasProcessed(false);
              }}
            />
          </div>

          <div className="d-flex justify-content-center">
            <button
              disabled={loading}
              className="btn btn-primary w-25"
              onClick={handleProcess}
            >
              {loading ? "Processing..." : "Process Text"}
            </button>
          </div>
        </div>

        {loading && (
          <div className="d-flex justify-content-center mt-4">
            <div className="spinner-border text-primary" role="status" />
          </div>
        )}

        {!loading && hasProcessed && (
          <div className="mt-4 px-3">
            <h5 className="d-flex justify-content-start">Processed Output:</h5>
            <div className="form-control mt-2 processedOutput">
              {renderHighlightedText()}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
