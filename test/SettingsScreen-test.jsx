import SettingsScreen from "../Components/SettingsScreen";
import renderer from 'react-test-renderer';
import SettingsHelper from "../Helpers/SettingsHelper";
import React from "react";

describe("Description", () => {
    it('settings state test', () => {
        let SettingsScreenData = renderer.create(<SettingsScreen/>).getInstance();
        let options = SettingsHelper.getOrderOptions();
        let optionsTest = options[2];

        //Call tested Method
        SettingsScreenData.handleOrderChange(optionsTest.key);

        expect(SettingsScreenData.state.settings.order).toEqual(optionsTest);
    })
});

