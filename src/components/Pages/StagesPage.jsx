import React, { useState, useContext, useEffect } from "react";
import { Button, Dropdown } from "react-bootstrap";
import DispatchContext from "../../DispatchContext";
import { Link } from "react-router-dom";

function App() {
  const [stages, setStages] = useState([]);
  const appDispatch = useContext(DispatchContext);

  //   Fetch JSON data when component mounts
  //   useEffect(() => {
  //     fetchJSONData();
  //   }, []);

  //   // Fetch JSON data function
  //   const fetchJSONData = async () => {
  //     try {
  //       // Replace 'sample-data.json' with your JSON file path
  //       const response = await fetch("sampleData.json");
  //       const data = await response.json();
  //       setStages(data.stages);
  //     } catch (error) {
  //       console.error("Error fetching JSON data:", error);
  //     }
  //   };

  // Function to add a new stage
  const addStage = () => {
    setStages([
      ...stages,
      {
        stageName: `Stage ${stages.length + 1}`,
        processes: [],
      },
    ]);
  };

  // Function to delete a stage
  const deleteStage = (index) => {
    setStages(stages.filter((_, i) => i !== index));
  };

  // Function to add a new process to a stage
  const addProcess = (index) => {
    const updatedStages = [...stages];
    updatedStages[index].processes.push({
      processName: `Process ${updatedStages[index].processes.length + 1}`,
      steps: [],
    });
    setStages(updatedStages);
  };

  // Function to delete a process from a stage
  const deleteProcess = (stageIndex, processIndex) => {
    const updatedStages = [...stages];
    updatedStages[stageIndex].processes.splice(processIndex, 1);
    setStages(updatedStages);
  };

  // Function to add a new step to a process
  const addStep = (stageIndex, processIndex, type) => {
    const updatedStages = [...stages];
    updatedStages[stageIndex].processes[processIndex].steps.push({
      stepName: `Step ${
        updatedStages[stageIndex].processes[processIndex].steps.length + 1
      }`,
    });

    setStages(updatedStages);
    appDispatch({ type: type });
  };

  // Function to delete a step from a process
  const deleteStep = (stageIndex, processIndex, stepIndex) => {
    const updatedStages = [...stages];
    updatedStages[stageIndex].processes[processIndex].steps.splice(
      stepIndex,
      1
    );
    setStages(updatedStages);
  };

  // Function to handle stage name change
  const handleStageNameChange = (index, newName) => {
    const updatedStages = [...stages];
    updatedStages[index].stageName = newName;
    setStages(updatedStages);
  };

  // Function to handle process name change
  const handleProcessNameChange = (stageIndex, processIndex, newName) => {
    const updatedStages = [...stages];
    updatedStages[stageIndex].processes[processIndex].processName = newName;
    setStages(updatedStages);
  };

  return (
    <div className="p-4">
      <div className="float-right">
        <button className="btn btn-primary mr-2">Save</button>
        <button onClick={addStage} className="btn btn-success mr-2">
          + Stage
        </button>{" "}
        <button className="btn btn-secondary mr-2">
          <Link to="/canvas">Canvas</Link>
        </button>
      </div>

      {stages.map((stage, stageIndex) => (
        <div
          key={stageIndex}
          className="box-container bg-white shadow-md border border-dark rounded-lg p-2 max-w-sm mt-4 float-left relative"
        >
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={stage.stageName}
              onChange={(e) =>
                handleStageNameChange(stageIndex, e.target.value)
              }
              className="form-control mr-2"
            />
            <button
              onClick={() => deleteStage(stageIndex)}
              className="btn btn-danger"
            >
              Delete Stage
            </button>
          </div>
          <div className="mt-2">
            <button
              onClick={() => addProcess(stageIndex)}
              className="btn btn-secondary mr-2"
            >
              + Process
            </button>
          </div>

          {stage.processes.map((process, processIndex) => (
            <div key={processIndex} className="mt-2">
              <input
                type="text"
                value={process.processName}
                onChange={(e) =>
                  handleProcessNameChange(
                    stageIndex,
                    processIndex,
                    e.target.value
                  )
                }
                className="form-control mr-2"
              />
              <button
                onClick={() => deleteProcess(stageIndex, processIndex)}
                className="btn btn-danger"
              >
                Delete Process
              </button>
              <div className="mt-2">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    id={`dropdownMenu${stageIndex}${processIndex}`}
                  >
                    + Add Step
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() =>
                        addStep(stageIndex, processIndex, "circle")
                      }
                    >
                      Circle
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        addStep(stageIndex, processIndex, "square")
                      }
                    >
                      Square
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              {process.steps.map((step, stepIndex) => (
                <div key={stepIndex} className="mt-2">
                  <p>{step.stepName}</p>
                  <button
                    onClick={() =>
                      deleteStep(stageIndex, processIndex, stepIndex)
                    }
                    className="btn btn-danger"
                  >
                    Delete Step
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
