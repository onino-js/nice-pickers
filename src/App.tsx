import React from "react";
import Button from "./components/Button/Button";
import AzimuthPicker  from "./components/AzimuthPicker/AzimuthPicker";
import CircularPicker from "./components/CircularPicker/CircularPicker";

interface Props {}

interface State {
  azimuth: number;
  showModal: boolean;
  showDrawer: boolean;
}

class App extends React.Component<Props, State> {
  public state = {
    azimuth: 10,
    showModal:false,
    showDrawer:false
  };

  private changeAzimuth = (n:number) => {
    this.setState({
      azimuth:n
    })
  }

  render() {
    return (
      <div>
        <div style={{width:"200px"}}>
          <CircularPicker value={this.state.azimuth} onChange={this.changeAzimuth}  />
          <CircularPicker value={this.state.azimuth} onChange={this.changeAzimuth}  />
        </div>
      </div>
    );
  }
}

export default App;
