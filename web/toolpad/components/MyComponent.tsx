import * as React from "react";
import { createComponent } from "@toolpad/studio/browser";

export interface MyComponentProps {
  msg: string;
}

function MyComponent({ msg }: MyComponentProps) {
  return <div>{msg}</div>;
}

export default createComponent(MyComponent, {
  argTypes: {
    msg: {
      type: "string",
      default: "Hello world!",
    },
  },
});
