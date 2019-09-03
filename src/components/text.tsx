import * as React from "react";

interface IProps {
  text: string;
}
interface IState {}

export class Text extends React.Component<IProps, IState> {
  public render() {
    const aspectRatio = ( window.innerWidth / window.innerHeight ).toFixed(3);
    const { text } = this.props;
    return (
      <div>
        Width: {window.innerWidth}px<br/>
        Height: {window.innerHeight}px<br/>
        Aspect Ratio (width /height): {aspectRatio}
      </div>
    );
  }

  public componentDidMount() {
    window.addEventListener("resize", this.updateSizeText.bind(this));
  }

  private updateSizeText(event: UIEvent) {
    this.forceUpdate();
  }
}
