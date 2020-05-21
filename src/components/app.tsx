import { inject, observer } from "mobx-react";
import * as React from "react";
import { BaseComponent, IBaseProps } from "./base";
import { Text } from "./text";
import { SingleFieldSubmit } from "./singleFieldSubmit";
import * as iframePhone from "iframe-phone";

import "./app.sass";

interface IProps extends IBaseProps {}
interface IState {}

// declare global {
//     interface Window { phone: any; }
// }

@inject("stores")
@observer
export class AppComponent extends BaseComponent<IProps, IState> {
  private phone: any;

  constructor(props: IProps) {
    super(props);
    this.requestHeight = this.requestHeight.bind(this);
    this.requestAspectRatio = this.requestAspectRatio.bind(this);

    this.phone = iframePhone.getIFrameEndpoint();
    // window.phone = this.phone
    this.phone.addListener("initInteractive", this.initInteractive.bind(this));
    // Initialize connection after all message listeners are added!
    this.phone.initialize();
  }

  public render() {
    const {ui} = this.stores;
    return (
      <div className="app">
        <h2>Current Interactive Size</h2>
        <Text text={ui.sampleText} />
        <h2>Dynamic Sizing</h2>
        <SingleFieldSubmit
          onSubmit={this.requestHeight}
          label="Height" buttonText="Request Height"/>
        <SingleFieldSubmit
          onSubmit={this.requestAspectRatio}
          label="Aspect Ratio" buttonText="Request Aspect Ratio"/>
      </div>
    );
  }

  private requestHeight(height: number) {
    this.phone.post("height", height);
  }

  private requestAspectRatio(aspectRatio: number) {
    this.sendSupportedFeatures({aspectRatio});
  }

  private initInteractive(data: any) {
    this.sendSupportedFeatures();
  }

  private sendSupportedFeatures({aspectRatio}: {aspectRatio?: number} = {}) {
    const config = {
      apiVersion: 1,
      features: {
        authoredState: false,
        interactiveState: false,
        aspectRatio
      }
    };
    this.phone.post("supportedFeatures", config);
  }
}
