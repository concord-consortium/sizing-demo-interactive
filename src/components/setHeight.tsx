import * as React from "react";

interface IProps {
  onHeightRequest: any;
}
interface IState {
  value: string;
}

export class SetHeight extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {value: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Height:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Request Height" />
      </form>
    );
  }

  private handleChange(event: any) {
    this.setState({value: event.target.value});
  }

  private handleSubmit(event: any) {
    this.props.onHeightRequest(this.state.value);
    event.preventDefault();
  }

}
