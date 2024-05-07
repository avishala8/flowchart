import React from "react";
import { useImmerReducer } from "use-immer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ReactFlowProvider } from "reactflow";
import { Canvas } from "./components/Canvas/Canvas";
import StagesPage from "./components/Pages/StagesPage";
import { FlowchartEditorPage } from "./components/FlowchartEditorPage";
import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

function App() {
  const initialState = {
    imgType: "",
    state: [],
  };
  function reducerfn(draft, action) {
    switch (action.type) {
      case "circle":
        draft.imgType = "circle";
        draft.state = action.data;
        // console.log("in APP.jsx");
        break;
      case "square":
        draft.imgType = "square";
        break;
      case "end":
        draft.imgType = "end";
        break;
      case "diamond":
        draft.imgType = "diamond";
        break;
      case "subprocess":
        draft.imgType = "subprocess";
        break;
    }
  }
  const [state, dispatch] = useImmerReducer(reducerfn, initialState);
  console.log(state);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <ReactFlowProvider>
          <Router>
            <>
              <div>
                {/* Define the routes */}
                <Routes>
                  <Route exact path="/" element={<StagesPage />} />{" "}
                  {/* Stages page route */}
                  <Route path="/canvas" element={<Canvas />} />{" "}
                  {/* Flowchart page route */}
                  <Route path="/editor" component={FlowchartEditorPage} />
                </Routes>
              </div>
            </>
          </Router>
        </ReactFlowProvider>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
