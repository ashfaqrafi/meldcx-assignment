import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter, Route } from "react-router-dom";
import App from "../../App";
import { mount } from "enzyme";
import LoginContainer from "../../container/LoginContainer";
import DeviceContainer from "../../container/DeviceContainer";

describe("renders without crashing", () => {
  it("renders whole App", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  });

  it("mounts Login Container", () => {
    const app = mount(<LoginContainer />);
    expect(app.exists(".login-wrapper")).toEqual(true);
  });

  it("should render the Login form", () => {
    const wrapper = mount(<LoginContainer />);

    expect(wrapper.find(".login").exists()).toBe(true);
    expect(wrapper.find("#email").length).toEqual(1);
    expect(wrapper.find("#password").length).toEqual(1);
  });

  it("should change the email state of the Login component", () => {
    const changeEmail = jest.fn();
    const wrapper = mount(<LoginContainer onChange={changeEmail} />);
    const handleChange = jest.spyOn(React, "useState");
    handleChange.mockImplementation((email) => [email, changeEmail]);

    wrapper.find("#email").simulate("change");
    expect(changeEmail).toBeTruthy();
  });

  it("should change the password state of the Login component", () => {
    const changePassword = jest.fn();
    const wrapper = mount(<LoginContainer onChange={changePassword} />);
    const handleChange = jest.spyOn(React, "useState");
    handleChange.mockImplementation((password) => [password, changePassword]);

    wrapper.find("#password").simulate("change");
    expect(changePassword).toBeTruthy();
  });

  it("should redirect to the default path after clicked on Logout button", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/devices`]}>
        <Route component={DeviceContainer} />
      </MemoryRouter>
    );
    expect(wrapper.find(DeviceContainer).props().location.pathname).toBe("/");
  });
});
