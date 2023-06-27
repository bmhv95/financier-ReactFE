import { ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function EnvelopeBar(props) {
  const { spent, allocated, budget, envelopeID, name } = props;
  const navigate = useNavigate();
  let spentBar = (spent / budget) * 100;
  let allocatedBar = (allocated / budget) * 100 - spentBar;
  let budgetBar = 100 - allocatedBar - spentBar;
  let extraBar = 0;
  let overspent = 0;
  let remaining = allocated - spent;

  function handleLabelClick() {
    navigate("#");
  }

  let MainBar = (
    <ProgressBar className="envelope-mainbar" style={{ height: "99px" }}>
      <ProgressBar striped animated variant="primary" now={spentBar} />
      <ProgressBar striped animated variant="secondary" now={allocatedBar} />
      <ProgressBar striped animated variant="dark" now={budgetBar} />
    </ProgressBar>
  );

  let insideBudgetBar = (
    <div className="inside-bar budget" onClick={props.onBudgetBarClick}>
      <ProgressBar
        striped
        variant="dark"
        style={{ height: "33px" }}
        animated
        now={100}
        label={"Budget: " + budget}
      />
    </div>
  );

  let insideAllocatedBar = (
    <div className="inside-bar allocated" onClick={() => alert("Allocate Edit")}>
      <ProgressBar
        striped
        variant="secondary"
        style={{ height: "33px" }}
        animated
        now={(allocated / budget) * 100}
        label={"Allocated: " + allocated}
      />
    </div>
  );

  let insideSpentBar = (
    <div className="inside-bar spent" onClick={() => alert("New Transaction")}>
      <ProgressBar
        striped
        variant="primary"
        style={{ height: "33px" }}
        animated
        now={(spent / budget) * 100}
        label={"Spent: " + spent}
      />
    </div>
  );

  if (spent > allocated) {
    allocatedBar = (allocated / budget) * 100;
    spentBar = (spent / budget) * 100 - allocatedBar;
    budgetBar = 100 - allocatedBar - spentBar;
    MainBar = (
      <ProgressBar className="envelope-mainbar" style={{ height: "99px" }}>
        <ProgressBar striped animated variant="warning" now={allocatedBar} />
        <ProgressBar striped animated variant="primary" now={spentBar} />
        <ProgressBar striped animated variant="dark" now={budgetBar} />
      </ProgressBar>
    );
  }

  if (spent > budget) {
    extraBar = (spent / budget) * 100 - 100;
    spentBar = 100 - extraBar;
    overspent = spent - budget;
    MainBar = (
      <ProgressBar className="envelope-mainbar" style={{ height: "99px" }}>
        <ProgressBar striped animated variant="danger" now={extraBar} />
        <ProgressBar striped animated variant="primary" now={spentBar} />
      </ProgressBar>
    );

    insideSpentBar = (
      <div className="inside-bar spent" onClick={() => alert("New Transaction")}>
        <ProgressBar style={{ height: "33px" }}>
          <ProgressBar
            striped
            variant="danger"
            animated
            now={extraBar}
            label={"Overspent: " + overspent}
          />
          <ProgressBar
            striped
            variant="primary"
            animated
            now={spentBar}
            label={"Spent: " + budget}
          />
        </ProgressBar>
      </div>
    );
  }

  return (
    <div className="envelope-bar">
      <div className="label-container">
        <p>
          {remaining}
        </p>
      </div>
      {MainBar}
      <div className="bar-content">
        {insideBudgetBar}
        {insideAllocatedBar}
        {insideSpentBar}
      </div>
    </div>
  );
}
