import { inject, observer } from "mobx-react";
import * as React from "react";
import { BaseComponent, IBaseProps } from "./base";
import { Text } from "./text";
import { SetHeight } from "./setHeight";
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
        <Text text={ui.sampleText} />
        <SetHeight onHeightRequest={this.requestHeight}/>
      </div>
    );
  }

  private requestHeight(height: number) {
    this.phone.post("height", height);
  }

  private initInteractive(data: any) {
    this.phone.post("supportedFeatures", {
      apiVersion: 1,
      features: {
        authoredState: false,
        interactiveState: false
      }
    });
  }
}
