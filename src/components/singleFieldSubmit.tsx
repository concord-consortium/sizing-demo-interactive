import * as React from "react";

interface IProps {
  onSubmit: any;
  label: string;
  buttonText: string;
}
interface IState {
  value: string;
}

export class SingleFieldSubmit extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {value: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // set props.lable to "Height"
  // set props.buttonText to "Request Height"
  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {this.props.label}:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value={this.props.buttonText} />
      </form>
    );
  }

  private handleChange(event: any) {
    this.setState({value: event.target.value});
  }

  private handleSubmit(event: any) {
    this.props.onSubmit(this.state.value);
    event.preventDefault();
  }

}
